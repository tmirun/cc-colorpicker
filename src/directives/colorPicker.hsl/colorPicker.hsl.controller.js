angular.module("colorCloud")
.controller("ColorPickerHslController", ColorPickerHslController);

function ColorPickerHslController($log, $scope, $element, lineDeg, $interval){
    "use strict";

    var vm = this;
    var element = d3.select($element[0]);
    var gradient = new GradientManager(element);
    vm.hueSegmentNum = 24;
    vm.hueDig1SegmentNum = 36;
    vm.hueDig2SegmentNum = 12;

    vm.color ={h:0,s:100,l:50};
    vm.selectColor;

    vm.hueDig1Colors=[];
    vm.hueDig2Colors=[];
    vm.hueGradients=[];
    vm.satColor;
    vm.ligColor;

    vm.selectColor;
    vm.hueSelectColor;
    vm.satSelectColor;
    vm.ligSelectColor;

    vm.value = 10;
    setSelectColor();

    $scope.$watch("vm.color.h", function(){
        setSatColor();
        setLigColor();
        setSelectColor();
    });

    $scope.$watch("vm.color.l", function(){
        setHueGradient();
        setSatColor();
        setSelectColor();
    });

    $scope.$watch("vm.color.s", function(){
        setHueGradient();
        setLigColor();
        setSelectColor();
    });

    setHueDig1Colors();
    setHueDig2Colors();

    function setHueDig1Colors(){
        var color = new aColor(vm.color);

        var colorSeparation = 360 / vm.hueDig1SegmentNum;
        var colors = []; //return array of gradients id ["url(#id)"]

        for(var i = 0; i < vm.hueDig1SegmentNum; i++){
            colors.push(color.setHue(i*colorSeparation).toHslCss());
        }
        return vm.hueDig1Colors=colors;
    }

    function setHueDig2Colors(){
        var color = new aColor(vm.color);

        var colorSeparation = 360 / vm.hueDig2SegmentNum;
        var colors = []; //return array of gradients id ["url(#id)"]

        for(var i = 0; i < vm.hueDig2SegmentNum; i++){
            colors.push(color.setHue(i*colorSeparation).toHslCss());
        }
        return vm.hueDig2Colors=colors;
    }

    function setHueGradient(){
        var color = new aColor(vm.color);

        var colorSeparation = 360 / vm.hueSegmentNum;
        var gradientUrl = []; //return array of gradients id ["url(#id)"]
        var startColor;
        var endColor;
        var gradientId;
        var stops;

        for(var i = 0; i < vm.hueSegmentNum; i++){
            startColor = color.setHue(i * colorSeparation).clone();
            endColor = color.setHue((i+1) * colorSeparation);
            gradientId = 'hueGradient'+i;
            stops = [
                {
                    offset: "0%",
                    style: "stop-color:"+startColor.toHslCss()
                },
                {
                    offset: "100%",
                    style: "stop-color:"+endColor.toHslCss()
                }
            ];

            gradient.linearGradient(gradientId,0);

            gradient.gradientStop(gradientId, stops)

            gradientUrl.push("url(#"+gradientId+")");
        }
        return vm.hueGradients=gradientUrl;
    }


    function setSatColor(){
        var color = new aColor(vm.color);

        var initColor = color.setSaturation(100).toHslCss();
        var endColor = color.setSaturation(0).toHslCss();

        var stops = [
            {
                offset: "0%",
                style: "stop-color:" + initColor
            },
            {
                 offset: "100%",
                 style: "stop-color:" + endColor
            }
        ];

        gradient.linearGradient("satGradient", 90);
        gradient.gradientStop('satGradient', stops);
        vm.satColor = "url(#satGradient)";
    }

    function setLigColor(){
        var color = new aColor(vm.color);

        var initColor = color.setLightness(100).toHslCss();
        var midColor = color.setLightness(50).toHslCss();
        var endColor = color.setLightness(0).toHslCss();

        var stops = [
            {
                offset: "0%",
                style: "stop-color:" + initColor
            },
            {
                offset: "50%",
                style: "stop-color:" + midColor
            },
            {
                 offset: "100%",
                 style: "stop-color:" + endColor
            }
        ];
        gradient.linearGradient("ligGradient", 90);
        gradient.gradientStop('ligGradient', stops);
        vm.ligColor = "url(#ligGradient)";
    }

    function setSelectColor(){
        var color = new aColor(vm.color);
        vm.selectColor = color.toHslCss();
    }
}
