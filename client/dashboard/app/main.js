define('app',['angular', 'angularAMD', 'routes', 'dirFactory'], function(angular, angularAMD, routes, dirFactory) {
    var app = angular.module('orderapp', ['ui.router', 'restangular', 'ui.bootstrap', 'ngCookies']);
    // var app = angular.module('orderapp', ['ui.router']);

    app.config(routes);

    // for(var i=0;i<dirFactory.length;i++) {
	// 	app.directive(dirFactory[i].name, dirFactory[i].directive);
	// }

	return angularAMD.bootstrap(app);
    // $.ajax({
	// 	url : '/api/user/loggedin',
	// 	type : 'GET',
	// 	success : function(response) {
	// 		if(!response.status || !response.data) {
	// 			return window.location.href = '/login';
	// 		}
	// 		var user = response.data;
			
	// 		return angularAMD.bootstrap(app);
	// 	}
	// });
});

require(['app']);
