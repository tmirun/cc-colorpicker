angular.module("colorCloud")
.directive("colorPickerHsl", function(){

    return {
        restrict: "E",
        replace: true,
        scope: {
            onChange:"=?"
        },
        controller: "ColorPickerHslController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl:"webapp/components/directives/colorPicker.hsl/colorPicker.hsl.html",
    };
});
