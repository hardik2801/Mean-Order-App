define('app',['angular', 'angularAMD', 'routes', 'dirFactory'], function(angular, angularAMD, routes, dirFactory) {
    var app = angular.module('orderapp', ['ui.router', 'restangular', 'ui.bootstrap', 'ngCookies']);

    app.config(routes);

	app.service("mainCart", function() {
		
		return {
			// val : [],
			set: function(val) {
				this.val = val;
			},
			get: function() {
				console.log(this);
				return this.val;
			}
		};
	});

	return angularAMD.bootstrap(app);
	
});

require(['app']);
