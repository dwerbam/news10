angular.module('news10').directive('news10comp', ['$http',
    function($http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'directive/news10comp/news10comp.html',
            link: function(scope, element, attrs, fn) {


                scope.loadfeed = function() {
                    $http.jsonp('http://pipes.yahoo.com/pipes/pipe.run?_id=DqsF_ZG72xGLbes9l7okhQ&_render=json&_callback=JSON_CALLBACK')
                        .success(function(data) {

                            var news = data.value.items;

                            // keep only first 10 elements
                            if (news.length > 10) {
                                news.splice(10, news.length - 10);
                            }

                            scope.news = news;
                        })
                        .error(function(data, status, headers, config) {
                            console.log('ERROR!');
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });


                };

                //init
                scope.loadfeed();

            }
        };
    }
]);