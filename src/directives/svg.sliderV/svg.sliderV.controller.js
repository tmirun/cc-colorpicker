angular.module("colorCloud")
.controller("svgSliderVController", svgSliderVController);

function svgSliderVController($log, $scope, $element, $timeout){
    $log.debug("init svg slider", this);

    var vm = this;

    //init values

    vm.x        = (vm.x == undefined) ? 0 : parseInt(vm.x);
    vm.y        = (vm.y == undefined) ? 0 : parseInt(vm.y);
    vm.width    = (vm.width == undefined) ? 20 : parseInt(vm.width);
    vm.height   = (vm.height == undefined) ? 200 : parseInt(vm.height);
    vm.maxValue = (vm.maxValue == undefined) ? 100 : parseInt(vm.maxValue);
    vm.minValue = (vm.minValue == undefined) ? 0 : parseInt(vm.minValue);
    vm.value    = (vm.value == undefined) ? 0 : parseInt(vm.value);
    vm.inverse  = (vm.inverse == "true") ? true : false;
    vm.selectR  = (vm.selectR == undefined) ? (vm.width / 2 + 5) : parseInt(vm.selectR);

    vm.distanceAmount = vm.height/(vm.maxValue - vm.minValue)

    vm.selectX = vm.x + vm.width/2;
    vm.selectY = vm.y;

    vm.dragCallback = function (svg_relativeX, svg_relativeY){
        var minPos = parseInt(vm.y);
        var maxPos = parseInt(vm.y) + parseInt(vm.height);
        if(svg_relativeY < minPos){
            svg_relativeY = minPos;
        }
        if(svg_relativeY > maxPos){
            svg_relativeY = maxPos;
        }
        if(!vm.inverse)
             var value = parseInt((svg_relativeY - vm.y) / vm.distanceAmount);
        else
            var value = 100 - parseInt((svg_relativeY - vm.y) / vm.distanceAmount);
        if(vm.value != value){
            vm.value = value;
            $scope.$apply();
        }
    }

    //init elements
    var rect = d3.select($element[0].querySelector("rect"));
    var selector = d3.select($element[0].querySelector("circle"));

    //watch
    $scope.$watch("vm.value", function(){
        var translate
        if(typeof vm.onChange === "function"){
            vm.onChange(vm.value);
        }
        if(!vm.inverse)
            translate = ((vm.value) * vm.distanceAmount);
        else
            translate = ((100-vm.value) * vm.distanceAmount);
        selector.attr("transform", "translate( 0," +translate + ")")
    });

}
