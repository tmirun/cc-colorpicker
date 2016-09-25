angular.module("colorCloud")
.directive("svgCircleSlider", function(){

    return {
        restrict: "E",
        replace: true,
        scope: {
            cx:"@",
            cy:"@",
            deg:"@",
            r:"@",
            width:"@",
            segmentNum:"@",
            isDigital:"@",
            initRotate:"@",
            value:"=?",
            colors: "=?", //[]
            onChange: "=?",

            //selector
            selectR: "@",
            selectColor: "=?",
            selectPositions: "=?", //[0,30,60]
        },
        controller: "svgCircleSliderVController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl:"webapp/components/directives/svg.circleSlider/svg.circleSlider.html",
        templateNamespace: "svg"
    };
});
