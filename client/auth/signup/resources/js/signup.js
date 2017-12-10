var app = angular.module('signup', ['ui.bootstrap']);
app.controller('signupCtrl', function ($scope, $http, $location) {
    // var handle = 
    console.log("Exec");
    var url = $location.absUrl();
    var credentials = getParameterByName('credentials',url);
    
    credentials = JSON.parse(credentials);
    console.log(credentials);
    var split = url.split('/');
    var handle = split[split.indexOf('signup') + 1];
    var selectedProfessions = {};
    var selectedInterests = {};
    // a flag that marks that he has already completed signup
    $scope.done = false;

    $scope.states = [];
    $scope.fbFlag = 'profile';
    $scope.temp = {};
    $scope.stateSelected = false;
    $scope.influencer={};
    $scope.influencer.name = '';
    $scope.influencer.email = '';
    $scope.influencer.phone = '';
    $http.get('/api/signup/location/meta?state=').then(function (response) {
        var resData = response.data;
        if (resData.status) {
            resData.data.splice(resData.data.indexOf('NULL'), 1);
            for (var i = 0; i < resData.data.length; i++) {
                resData.data[i] = resData.data[i].toLowerCase();
            }
            $scope.states = resData.data;
            // console.log($scope.states);
            $scope.states.sort(function (a, b) {
                if (a > b) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }
    });
    // $scope.influencer={};
    // $scope.influencer.data = $scope.influencer.data || {};
    // $scope.influencer.gender = $scope.influencer.gender || 'male';
    // $scope.influencer.domains = $scope.influencer.domains || [];
    // make http call for the influencer (signup) data


    $http.get('/api/signup/?handle=' + handle+'&platform='+ credentials.platform).then(function (response) {
        var resData = response.data;
        if (!resData.status) {
            return;
        }
        console.log(resData,'resData');
        $scope.influencer = resData.data;
        $scope.temp.facebook = $scope.influencer.facebook.private_profile_link;
        // if all his basic data has been fetched

        // if ($scope.influencer.name && $scope.influencer.email && $scope.influencer.phone && $scope.influencer.domains.length > 0) {
        //     // $scope.done = true;
        //     // console.log($scope.done);
        // }
        $scope.influencer.data = $scope.influencer.data || {};
        $scope.influencer.gender = $scope.influencer.gender || 'male';
        $scope.influencer.domains = $scope.influencer.domains || [];
    });


    function getBasicDetails(){

        //make http call for the professionibutes data
        $http.get('/api/domains').then(function (response) {
            var resData = response.data;
            if (resData.status) {
                $scope.domains = resData.data;
            } else {
                // console.log(resData.message);
            }
        });
    
    
        // make http call for the professionibutes data
        $http.get('/api/professions').then(function (response) {
            var resData = response.data;
            if (resData.status) {
                $scope.professions = resData.data;
                // set selected professions - HACKY CODE ALERT- REASON - SANVARI
                for (var i in $scope.professions) {
                    var profession = $scope.professions[i];
                    for (var j in $scope.influencer.professions) {
                        var selected = $scope.influencer.professions[j];
                        if (profession._id === selected.main) {
                            selectedProfessions[profession.name] = { main: profession._id, sub_professions: [] };
                            for (var index in profession.sub_professions) {
                                var sub_profession = profession.sub_professions[index];
                                if ($scope.influencer.professions[j].sub_professions.indexOf(sub_profession._id) > -1) {
                                    selectedProfessions[profession.name].sub_professions.push(sub_profession._id);
                                }
                            }
                        }
                    }
                }
            } else {
            }
        });
    
        // make http call for the professionibutes data
        $http.get('/api/interests').then(function (response) {
            var resData = response.data;
            if (resData.status) {
                $scope.interests = resData.data;
                // iterate over all interests fetched from the server
                for (var i in $scope.interests) {
                    var interest = $scope.interests[i];
                    // iterate over all the influencers stored interests                
                    for (var j in $scope.influencer.interests) {
                        // the selected interest
                        var selected = $scope.influencer.interests[j];
                        // if the current interest is selected by the influencer
                        if (interest._id === selected.main) {
                            // in selecetedInterests, add the object with this interest name
                            selectedInterests[interest.name] = { main: interest._id, sub_interests: [] };
                            // iterate over the sub interests of the current interest in the iteration
                            for (var index in interest.sub_interests) {
                                var sub_interest = interest.sub_interests[index];
                                if (selected.sub_interests.indexOf(sub_interest._id) > -1) {
                                    selectedInterests[interest.name].sub_interests.push(sub_interest._id);
                                }
                            }
                        }
                    }
                }
            } else {
                // console.log(resData.message);
            }
        });
    }

    // initialized scope variables
    $scope.signupStage = 0;
    $scope.errors = {};
    $scope.selectedProfessionAccordion = -1;

    $scope.isValidState = function () {
        $scope.errors.location = null;
        if ($scope.states.indexOf($scope.influencer.state) < 0) {
            $scope.stateSelected = false;
            $scope.cities = [];
        }
    }

    $scope.selectState = function (state) {
        $scope.influencer.state = state;
        $scope.stateSelected = true;

        $http.get('/api/signup/location/meta?state=' + state).then(function (response) {
            if (response.data.status) {
                $scope.cities = response.data.data.cities;
                $scope.cities.sort(function (a, b) {
                    if (a > b) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                $scope.influencer.city = $scope.cities[0];
            }
        });
    }
    $scope.switchFbLink = function ($event, value) {
        $scope.fbFlag = value;
        delete $scope.errors.facebookLink;
        if (value === 'profile') {
            $scope.temp.facebook = $scope.influencer.facebook.private_profile_link;
        } else {
            $scope.temp.facebook = $scope.influencer.facebook.link;
        }
    };
    // validate the first view in the signup that takes name, phone, email
    $scope.updateContactDetails = function ($event) {
        delete $scope.errors.name;
        delete $scope.errors.phone;
        delete $scope.errors.email;
        // ensure that the name has been entered. Or basically not removed
        if (!$scope.influencer.name || $scope.influencer.name.length < 1) {
            $scope.errors.name = 'Please enter your name';
            return;
        }
        // validate phone number
        // var phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        var phonePattern = /\+?\d[\d -]{8,12}\d/;
        if (!phonePattern.test($scope.influencer.phone)) {
            $scope.errors.phone = 'Please enter a valid phone number';
            return;
        }
        //validate email
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test($scope.influencer.email)) {
            $scope.errors.email = 'Please enter a valid email address';
            return;
        }
       
        // findOrCreateInfluencer();
        findOrCreateInfluencer(credentials,function(response){
            // console.log(influencer,'_json');
            $scope.influencer = response.data;
            getBasicDetails();
            switchView($event, '#social-connect', 1);
        });
        //Call the function to send email notification
    };

    // validate the second stage that takes age, gender and location
    $scope.updateBasicDetails = function ($event) {
        // if($scope.states.indexOf($scope.influencer.state) < 0 || $scope.cities.indexOf($scope.influencer.city) < 0) {
        //     $scope.errors.location = 'Invalid Location entered. Please try again.';
        //     return;
        // }
        switchView($event, '#domains', 3);
        updateInfluencer('demographics');
    };
    $scope.updateSocialData = function ($event) {
        delete $scope.errors.facebookLink;
        delete $scope.errors.youtubeLink;
        delete $scope.errors.instagramLink;
        delete $scope.errors.blogLink;

        if ($scope.fbFlag === 'profile') {
            $scope.influencer.facebook.private_profile_link = $scope.temp.facebook;
        } else {
            $scope.influencer.facebook.link = $scope.temp.facebook;
        }

        if ($scope.temp.facebook) {
            if ($scope.temp.facebook.indexOf('http') < 0 || $scope.temp.facebook.indexOf('facebook.com') < 0) {
                $scope.errors.facebookLink = "please enter valid facebook link";
                return;
            }
        }

        if ($scope.influencer.instagram.link) {
            if ($scope.influencer.instagram.link.indexOf('http') < 0 || $scope.influencer.instagram.link.indexOf('instagram.com') < 0) {
                $scope.errors.instagramLink = "please enter valid instagram link";
                return;
            }
        }


        if ($scope.influencer.instagram.link) {
            if ($scope.influencer.instagram.link.indexOf('http') < 0 || $scope.influencer.instagram.link.indexOf('instagram.com') < 0) {
                $scope.errors.instagramLink = "please enter valid instagram link";
                return;
            }
        }

        if ($scope.influencer.youtube.link) {
            if ($scope.influencer.youtube.link.indexOf('http') < 0 || $scope.influencer.youtube.link.indexOf('youtube.com') < 0) {
                $scope.errors.youtubeLink = "please enter valid youtube link";
                return;
            }
        }

        if ($scope.influencer.blog.link) {
            if ($scope.influencer.blog.link.indexOf('http') < 0) {
                $scope.errors.blogLink = "please enter valid  link";
                return;
            }
        }

        switchView($event, '#age-gender', 2);
        updateInfluencer('social-data');
    };
    $scope.skipSocialData = function ($event) {
        delete $scope.errors.facebookLink;
        delete $scope.errors.youtubeLink;
        delete $scope.errors.instagramLink;
        delete $scope.errors.blogLink;
        switchView($event, '#age-gender', 2);
    };
    // update the domains he has entered
    $scope.updateDomains = function ($event) {
        if ($scope.influencer.domains.length <= 0) {
            $scope.errors.domain = 'Please choose atleast one domain that you post/talk about';
            return;
        }
        switchView($event, '#professions', 4);
        updateInfluencer('domains');
    };

    // update the professions he has chosen
    $scope.updateProfessions = function ($event) {
        // if(Object.keys(selectedProfessions).length < 1){
        //     $scope.errors.profession = 'Please choose atleast one profession that you are associated with';
        //     return;
        // }
        $scope.influencer.professions = [];
        for (var key in selectedProfessions) {
            var profession = selectedProfessions[key];
            $scope.influencer.professions.push(profession);
        }
        switchView($event, '#interests', 5);
        updateInfluencer('professions');
    };

    $scope.skipProfessions = function ($event) {
        switchView($event, '#interests', 5);
    };

    // the final view. just update influencer and navigate to the signup page
    $scope.updateInterests = function ($event) {
        $scope.influencer.interests = [];
        for (var key in selectedInterests) {
            var profession = selectedInterests[key];
            $scope.influencer.interests.push(profession);
        }
        switchView($event, '#thankyou', 6);
        // console.log('Completed');
        updateInfluencer('interests');
    };

    $scope.finish = function ($event) {
        $scope.influencer.interests = [];
        for (var key in selectedInterests) {
            var profession = selectedInterests[key];
            $scope.influencer.interests.push(profession);
        }
        switchView($event, '#thankyou', 6);
        updateInfluencer('interests', true);
    };

    $scope.skipInterests = function ($event) {
        switchView($event, '#thankyou', 6);
    };

    // handles domain selection/deselection
    $scope.toggleDomain = function (domain, $event) {
        $event.stopPropagation();
        var index = $scope.influencer.domains.indexOf(domain._id);
        if (index > -1) {
            $scope.influencer.domains.splice(index, 1);
        } else {
            $scope.influencer.domains.push(domain._id);
        }
    };

    $scope.isDomainSelected = function (domain) {
        return $scope.influencer.domains.indexOf(domain._id) > -1;
    };


    // toggle the selection of child professionibutes in the professionibute accordions
    $scope.toggleSubProfession = function (profession, subProfession) {
        var subProfessionData = selectedProfessions[profession.name];
        // if the parent professionibute is defined
        if (subProfessionData) {
            // check if the child is already added
            var index = subProfessionData.sub_professions.indexOf(subProfession._id);
            if (index > -1) { //if exists in the array, remove
                subProfessionData.sub_professions.splice(index, 1);
                if (subProfessionData.sub_professions.length < 1) {
                    delete selectedProfessions[profession.name];
                }
            } else { // else add to the array
                subProfessionData.sub_professions.push(subProfession._id);
            }
        } else {
            selectedProfessions[profession.name] = {
                main: profession._id,
                sub_professions: [subProfession._id]
            };
        }

        // console.log(selectedProfessions);
    };

    // toggle the selection of the main professionibute in the professionibute accordions
    $scope.toggleProfession = function (profession) {
        // $event.stopPropagation();
        if (!profession.sub_professions || profession.sub_professions.length > 0) {
            return;
        }
        // if the parent key has a value in the object  
        if (selectedProfessions[profession.name]) {
            // remove the parent from the object
            delete selectedProfessions[profession.name];
        } else { // create a new object that holds the data about the parent professionibute
            selectedProfessions[profession.name] = { main: profession._id, sub_professions: [] };
            // add all the children for the selected parent professionibute
            for (var i in profession.sub_professions) {
                var child = profession.sub_professions[i];
                selectedProfessions[profession.name].sub_professions.push(child._id);
            }
        }

        // console.log(selectedProfessions);
    };

    $scope.isProfessionSelected = function (profession) {
        // return false if in the selected professionibutes object, the profession.text key is undefined 
        return Boolean(selectedProfessions[profession.name]);
    };

    // checks if the input child is selected 
    $scope.isSubProfessionSelected = function (profession, subProfession) {
        var professionData = selectedProfessions[profession.name];
        if (professionData) {
            return professionData.sub_professions.indexOf(subProfession._id) > -1;
        }
        return false;
    };

    // $scope.deselectProfession = function (profession){
    //     if(profession.sub_professions && profession.sub_professions.length > 0){
    //         console.log(selectedProfessions);                
    //         delete selectedProfessions[profession.name];
    //         console.log(selectedProfessions);            
    //     }
    // };
    // ------------------------    

    // toggle the selection of child professionibutes in the professionibute accordions
    $scope.toggleSubInterest = function (interest, subInterest) {
        var subInterestData = selectedInterests[interest.name];
        // if the parent professionibute is defined
        if (subInterestData) {
            // check if the child is already added
            var index = subInterestData.sub_interests.indexOf(subInterest._id);
            if (index > -1) { //if exists in the array, remove
                subInterestData.sub_interests.splice(index, 1);
                if (subInterestData.sub_interests.length < 1) {
                    delete selectedInterests[interest.name];
                }
            } else { // else add to the array
                subInterestData.sub_interests.push(subInterest._id);
            }
        } else {
            selectedInterests[interest.name] = {
                main: interest._id,
                sub_interests: [subInterest._id]
            };
        }

        // console.log(selectedInterests);
    };

    // toggle the selection of the main professionibute in the professionibute accordions
    $scope.toggleInterest = function (interest) {
        // $event.stopPropagation();
        if (!interest.sub_interests || interest.sub_interests.length > 0) {
            return;
        }
        // if the parent key has a value in the object  
        if (selectedInterests[interest.name]) {
            // remove the parent from the object
            delete selectedInterests[interest.name];
        } else { // create a new object that holds the data about the parent professionibute
            selectedInterests[interest.name] = { main: interest._id, sub_interests: [] };
            // add all the children for the selected parent professionibute
            for (var i in interest.sub_interests) {
                var child = interest.sub_interests[i];
                selectedInterests[interest.name].sub_interests.push(child._id);
            }
        }
    };

    $scope.isInterestSelected = function (interest) {
        // return false if in the selected professionibutes object, the profession.text key is undefined 
        return Boolean(selectedInterests[interest.name]);
    };

    // checks if the input child is selected 
    $scope.isSubInterestSelected = function (interest, subInterest) {
        var subInterestData = selectedInterests[interest.name];
        if (subInterestData) {
            return subInterestData.sub_interests.indexOf(subInterest._id) > -1;
        }
        return false;
    };

    function getParameterByName(name, url) {
        if (!url){
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    function animate(selector, $event, pageIndex) {
        var height = 0;
        var offset = $(selector).offset();
        if (offset && offset.top && offset.top !== 0) {
            height = offset.top;
        } else {
            height = $(window).height() * pageIndex;
        }
        $('html, body').stop().animate({
            scrollTop: height,
        }, 1500, 'easeInOutExpo');
        $event.preventDefault();
    }

    // switches views on clicking the next button
    function switchView($event, viewId, viewNo) {
        $scope.signupStage = viewNo;
        animate(viewId, $event, viewNo);
    }

    // update the signup document (known as the influencer on this page) with the currently populated data
    function updateInfluencer(lastActionStatus, finish, callback) {
        if (lastActionStatus) {
            $scope.influencer.signup.track.action.last_action = lastActionStatus;
            $scope.influencer.signup.track.action.timestamp = Date.now();
        }
        $http.put('/api/signup/' + $scope.influencer._id + '/?finish=' + finish, $scope.influencer).then(function (response) {
            var resData = response.data;
            if (resData.status) {
                $scope.influencer = resData.data;
            } else {
                // console.log(resData.message);
            }
            // if a callback is specified, let the person handle what to do with the response in the callback
            if (callback) {
                return callback(resData);
            }
        });
    }

    function findOrCreateInfluencer(credentials,callback) {
        var dataToSend ={
            influencer : $scope.influencer,
            credentials : credentials
        };
        $http.post('/api/signup/findorcreate',dataToSend).then(function (response) {
            var resData = response.data;
            if (resData.status) {
                $scope.influencer = resData.data;
            } else {
                // console.log(resData.message);
            }
            // if a callback is specified, let the person handle what to do with the response in the callback
            if (callback) {
                return callback(resData);
            }
        });
    }

});

app.directive('capitalize', function () {
    var directive = {
        restrict: 'E',
        template: '{{ fText }}',
        scope: {
            text: '@'
        },
        link: function (scope) {
            if (scope.text) {
                scope.fText = scope.text.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
                // capitalize stuff inside brackets   
            }
        }
    };

    return directive;
});