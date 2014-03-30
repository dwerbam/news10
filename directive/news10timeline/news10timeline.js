angular.module('news10').directive('news10timeline', ['$http', '$rootScope',
    function($http, $rootScope) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'directive/news10timeline/news10timeline.html',
            link: function(scope, element, attrs, fn) {

                scope.searchpattern = '';
                scope.filteredsize = -1;

                scope.filtered = function() {
                    if (typeof scope.news === "undefined") {
                        return;
                    }

                    var ret = [];
                    var it;
                    var lowerpattern = scope.searchpattern.toLowerCase();
                    for (var i = 0; i < scope.news.length; i++) {
                        it = scope.news[i];
                        if (scope.searchpattern === '' ||
                            it.description.toLowerCase().indexOf(lowerpattern) >= 0 ||
                            it.title.toLowerCase().indexOf(lowerpattern) >= 0
                        ) {
                            ret.push(it);
                        }
                    }

                    scope.filteredsize = ret.length;
                    return ret;

                };

                scope.loadfeed = function() {


                    scope.processing = true;
                    $rootScope.safeApply(scope);

                    $http.jsonp('http://pipes.yahoo.com/pipes/pipe.run?_id=DqsF_ZG72xGLbes9l7okhQ&_render=json&_callback=JSON_CALLBACK')
                        .success(function(data) {

                            var news = data.value.items;

                            // keep only first 10 elements
                            if (news.length > 10) {
                                news.splice(10, news.length - 10);
                            }

                            scope.news = news;

                            scope.processing = false;
                            $rootScope.safeApply(scope);
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