angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo')
      .directive('validateValue', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {

                element.bind('keypress', function (event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            });

                 
                ngModelCtrl.$parsers.unshift(function(viewValue) {
                     if(viewValue == '') return;
                   var min = Number(eval(attrs.min));
                    var max = Number(eval(attrs.max));
                    var value = Number(viewValue);
                    var valid = (!isNaN(value) && value >= min && value <= max);
 
                    if (!valid) { 
                      var currentValue = "";
                        if(ngModelCtrl.$modelValue || value)
                          currentValue = ngModelCtrl.$modelValue.toString();
                        ngModelCtrl.$setViewValue(currentValue);
                        ngModelCtrl.$render();
                        return currentValue;
                    }
                    else {
                        return viewValue;
                    }
                        
                });
            }
        };
    })

    .controller('TimepickerDemoCtrl', function($scope, $log) {
        //$scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = !$scope.ismeridian;
        };


        $scope.update = function() {
            var d = new Date();
            d.setHours(14);
            d.setMinutes(0);
            $scope.mytime = d;
        };

        $scope.changed = function() {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };
    });