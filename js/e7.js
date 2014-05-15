// 7号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var cover = 'e7.jpg';

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data, i, len, cx, cy, angle, beginAngle = 0, total,
    len = analyser.getFftSize() / 16, r = 50,
    twoPI = 2 * Math.PI,
    angleGap = twoPI / 3,
    color = 'rgba(186, 135, 72, 0.5)';
    initOrNot = false;

function draw() {
    ctx.save();
    data = analyser.getData();
    angle = beginAngle;
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    total = 0;
    for (i = 12; i < len; i += 2) {
        angle += 0.2;
        ctx.beginPath();
        ctx.moveTo(cx + data[i] * Math.sin(angle), cy + data[i] * Math.cos(angle));
        ctx.lineTo(cx + data[i] * Math.sin(angle + angleGap), cy + data[i] * Math.cos(angle + angleGap));
        ctx.lineTo(cx + data[i] * Math.sin(angle + angleGap * 2), cy + data[i] * Math.cos(angle + angleGap * 2));
        ctx.closePath();
        ctx.stroke();
        total += data[i];
    }
    beginAngle = (beginAngle + 0.00001 * total) % twoPI;
    ctx.restore();
}

function init() {
    util.setBg(7);
    initOrNot = true;
}

function isInit() {
    return initOrNot;
}

return {
    draw: draw,
    init: init,
    isInit: isInit,
    cover: cover
}

});