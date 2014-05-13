// 6号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    initOrNot = false;

function draw() {
    ctx.save();
    data = analyser.getData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    


    ctx.restore();
}

function init() {
    util.setBg(6);
    
    initOrNot = true;
}

function isInit() {
    return initOrNot;
}

return {
    draw: draw,
    init: init,
    isInit: isInit
}

});