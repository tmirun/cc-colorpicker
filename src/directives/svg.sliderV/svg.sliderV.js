angular.module("colorCloud")
.directive("svgSliderV", function(){
    return {
        restrict: "E",
        replace: true,
        scope: {
            x:"@",
            y:"@",
            width:"@",
            height:"@",
            maxValue:"@",
            minValue:"@",
            inverse:"@", //inverse value
            value:"=?",
            onChange:"=?",
            color:"=?",

            selectR:"@",
            selectColor:"=?" //string format
        },
        controller: "svgSliderVController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl:"webapp/components/directives/svg.sliderV/svg.sliderV.html",
        templateNamespace: "svg"
    }
});//
