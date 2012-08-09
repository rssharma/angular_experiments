angular.module("ExperimentsModule", [])
    .directive("uiDatetime", function(){
        return {
            restrict: 'EA',
            replace: true,
            template: '<div class="ui-datetime">' +
                '<input type="text" ng-model="_date" class="date">' +
                '<input type="number" ng-model="_hours" min="0" max="23" class="hours">' +
                '<input type="number" ng-model="_minutes" min="0" max="59" class="minutes">' +
                '</div>',
            require: 'ngModel',
            scope: {
                _datetime: '=ngModel'
            },
            link: function(scope, element, attrs) {
                var elDate = element.find('input.date');

                scope.$watch('_datetime', function (newValue, oldValue) {
                    var date = new Date(newValue);
                    var fillNull = function(num) {
                        if (num < 10) return '0' + num;
                        return num;
                    };
                    scope._date = fillNull(date.getDate()) + '.' + fillNull(date.getMonth() + 1) + '.' + date.getFullYear();
                    scope._hours = date.getHours();
                    scope._minutes = date.getMinutes();
                }, true);

                elDate.datepicker({
                    dateFormat: 'dd.mm.yy',
                    onSelect: function(value, picker) {
                        scope._date = value;
                        scope.$apply();
                    }
                });

                var watchExpr = function() {
                    var res = scope._date.split('.');
                    if (res.length == 3) return new Date(res[2], res[1] - 1, res[0], scope._hours, scope._minutes);
                };
                scope.$watch(watchExpr, function (newValue, oldValue) {
                    scope._datetime = newValue;
                }, true);
            }
        };
    });
