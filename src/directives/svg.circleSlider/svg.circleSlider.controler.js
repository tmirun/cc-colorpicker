angular.module("colorCloud")
.controller("svgCircleSliderVController", svgCircleSliderVController);

function svgCircleSliderVController($scope, $log, $element, lineDeg){
    var vm = this;

    // //init values
    vm.cx           = (vm.cx == undefined)          ? 250 : parseInt(vm.cx);
    vm.cy           = (vm.cy == undefined)          ? 250 : parseInt(vm.cy);
    vm.deg          = (vm.deg == undefined)         ? 360 : parseInt(vm.deg);
    vm.r            = (vm.r == undefined)           ? 150 : parseInt(vm.r);
    vm.width        = (vm.width == undefined)       ? 10 : parseInt(vm.width);
    vm.segmentNum   = (vm.segmentNum == undefined)  ? 12 : parseInt(vm.segmentNum);
    vm.value        = (vm.value == undefined)       ? 0 : parseInt(vm.value);
    vm.colors       = (vm.colors == undefined)      ? [] : vm.colors;
    vm.isDigital    = (vm.isDigital == undefined || vm.isDigital != "true") ? false : true;
    vm.initRotate   = (vm.initRotate == undefined)  ? 0 : parseInt(vm.initRotate);

    vm.selectPositions   = (vm.sPositions == undefined)  ? [] : vm.selectPositions;
    vm.selectR       = (vm.selectR == undefined)      ? 10 : parseInt(vm.selectR);
    vm.selectColor   = (vm.selectColor == undefined)  ? "blue" : vm.selectColor;

    vm.selectCx = vm.cx;
    vm.selectCy = vm.cy - vm.r - vm.width/2;

    vm.segments = [];
    vm.segmentDeg = vm.deg / vm.segmentNum;
    initSegments();

    function initSegments(){
        vm.segments = [];
        var segmentDeg, path;
        for(var i=0; i < vm.segmentNum; i++){
            path = customArc(vm.cx, vm.cy, vm.segmentDeg+0.2, vm.r, vm.width);
            vm.segments.push({path:path, color:vm.colors[i]});
        }
    }

    vm.segmentRotate = function(index){
        return (index*vm.segmentDeg)+parseInt(vm.initRotate);
    }

    vm.dragCallback = function (svg_relativeX, svg_relativeY){
        var digitalStep = (vm.isDigital) ? 360/vm.segmentNum : 0;
        var deg = lineDeg(vm.cx, vm.cy, svg_relativeX, svg_relativeY, digitalStep);
        deg = parseInt(deg);
        if(deg > vm.deg) deg = vm.deg;
        if(vm.value != deg){
            vm.value = deg;
            $scope.$apply();
        }
    }

    var selector = d3.select($element[0].querySelector("circle"));

    //watch
    $scope.$watch("vm.value", function(){
        //call onChange callback
        if(typeof vm.onChange === "function"){
            vm.onChange(vm.value);
        }
        selector.attr("transform", "rotate(" + vm.value + "," + vm.cx + "," + vm.cy + ")")
    });
}
