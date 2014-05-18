// 6号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var cover = 'e6.jpg';

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    bars = [],
    number = analyser.getFftSize() / 2,
    colors = ['rgba(217, 54, 57, 0.8)',
              'rgba(247, 209, 74, 0.8)',
              'rgba(166, 235, 54, 0.8)',
              'rgba(66, 215, 237, 0.8)',
              'rgba(44, 126, 225, 0.8)',
              'rgba(173, 81, 224, 0.8)'],
    i, len, addHeight = 300, h, w,
    initOrNot = false;

function Bar() {
    this.c = colors[util.intRandom(0, colors.length)];
    this.a = addHeight;
    if (addHeight > 0) {
        addHeight -= 4;
    }
}

function draw() {
    ctx.save();
    data = analyser.getData();
    len = data.length / 2 - 32;
    var adder = canvas.width / 12;
    w = adder;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (i = 16; i < len; i += 4) {
        ctx.fillStyle = bars[i].c;
        h = data[i] + bars[i].a;
        ctx.fillRect(0, canvas.height - h, w, h);
        if (w < canvas.width) {
            w += adder;
        }
    }

    ctx.restore();
}

function init() {
    util.setBg(6);
    for (i = 0; i < number; i++) {
        bars.push(new Bar());
    }
    initOrNot = true;
}

function isInit() {
    return initOrNot;
}

function enable() {

}

function disable() {

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