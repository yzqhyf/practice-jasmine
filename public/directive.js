(function(window) {

    'use strict';
    window.angular.module('check', [])
        .directive('checkDirective', function($interval, $http){
            // we use this directive to check the health of our web site
            // the url will be /health, and this value can be configed
            // we only keep the last number of msg, e.g., we can only keep 5
            return {
                template: '<li ng-repeat="msg in msgs">{{msg.status}}: {{msg.time | date:"HH:mm:ss a"}}</li>',
                scope: {
                    url: '@',
                    interval: '@',
                    number: '@'
                },
                link: function(scope, element, attrs){
                    scope.opts = {
                        interval: parseInt(scope.interval || 10),
                        number: parseInt(scope.number || 5),
                        url: scope.url || '/check'
                    };                    
                    scope.msgs = [];

                    var updateMsg = function(status){
                        return function(){
                            // TODO, we didn't verify the number
                            // this point can trigger a fail in our test.
                            if(scope.msgs.length >= 5) {
                                scope.msgs.shift();
                            }
                            scope.msgs.push({
                                status: status ? 'OK' : 'Not Found'
                            });
                        };
                    };
                    $interval(function() {
                        // console.log('interval', scope.opts.interval);
                        $http.get(scope.opts.url).success(updateMsg(1)).error(updateMsg(0));
                    }, scope.opts.interval);
                }
            };   
        });
})(this);
