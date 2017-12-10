define([
    'restConfig',
], function (restConfig) {

    function loginSrv(Restangular) {
     Restangular = restConfig(Restangular);

     var loginHelper = Restangular.all('users');

     function authenticateUser(email, passwd) {
        //  console.log(email, "mail");
        //  console.log(passwd, "pass");
         return loginHelper.one('login').customGET('', {email: email, password: passwd});
     }



     return {
        authenticateUser : authenticateUser
     };
       
    }

    return loginSrv;
});