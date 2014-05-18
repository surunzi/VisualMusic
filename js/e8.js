// 8号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var cover = 'e8.jpg';

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data, w, h, i, x, gap, halfH, xc, yc,
    sinAngle = [],
    line = [],
    len = analyser.getFftSize() / 2 - 20,
    color,
    initOrNot = false;

$(window).resize(function () {
    initColor();
});

function draw() {
    ctx.save();
    data = analyser.getData();
    w = canvas.width,
    h = canvas.height,
    halfH = h / 2,
    ctx.clearRect(0, 0, w, h);
    for (i = 0; i < len; i++) {
        line[i] = data[i] * sinAngle[i];
    }

    ctx.shadowColor = '#fffa47';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    x = 0;
    gap = Math.ceil(w / len);
    ctx.moveTo(x, halfH);
    for (i = 1; i < len - 2; i ++) {
        xc = (x + x + gap) / 2;
        yc = halfH - (line[i] + line[i + 1]) / 2;
        ctx.quadraticCurveTo(x, halfH - line[i], xc, yc);
        x += gap;
    }
    ctx.quadraticCurveTo(x, halfH - line[i], x + gap, halfH - line[i + 1]);
    ctx.stroke();

    ctx.restore();
}

function init() {
    util.setBg(8);
    var angleGap = Math.random() * 0.1 + 0.05,
        angle = 0, angle2 = 0;
    sinAngle[0] = Math.sin(angle);
    for (i = 1; i < len; i++) {
        sinAngle[i] = Math.sin(angle);
        if (sinAngle[i - 1] > 0 && sinAngle[i] < 0 ||  sinAngle[i - 1] < 0 && sinAngle[i] > 0) {
            angleGap = Math.random() * 0.1 + 0.05;
        }
        angle += angleGap;
    }
    initColor();
    initOrNot = true;
}

function initColor() {
    color = ctx.createLinearGradient(0, 0, 0, canvas.height);
    color.addColorStop(0.1, '#ff5614');
    color.addColorStop(0.3, '#fffa47');
    color.addColorStop(0.4, '#f93b04');
    color.addColorStop(0.5, '#f93b04');
    color.addColorStop(0.6, '#fffa47');
    color.addColorStop(0.7, '#f93b04');
    color.addColorStop(0.75, '#f01800');
    color.addColorStop(0.8, '#fb7220');
    color.addColorStop(0.9, '#f93b04');
    color.addColorStop(1, '#f01800');
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