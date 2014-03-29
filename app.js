angular.module('news10', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate', 'ngSanitize']);

angular.module('news10').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({
        // redirectTo:'/home'
        templateUrl: 'partial/main/main.html',
        controller: 'MainCtrl'

    });

});

angular.module('news10').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});