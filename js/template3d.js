// 6号可视化效果
define(['analyser', 'util', 'renderer'], function (analyser, util, renderer) {

var cover = '',
    data,
    initOrNot = false;

function draw() {
    data = analyser.getData();
}

function init() {
    initOrNot = true;
}

function isInit() {
    return initOrNot;
}

function enable() {
    renderer.show();
}

function disable() {
    renderer.hide();
}

return {
    draw: draw,
    init: init,
    isInit: isInit,
    cover: cover,
    enable: enable,
    disable: disable
}

});