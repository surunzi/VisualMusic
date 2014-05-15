// 1号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var cover = 'e1.jpg';

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    i,
    b,
    bars = [],
    dots = [],
    colors = ['157, 193, 243',
        '245, 232, 153',
        '226, 51, 110'
    ], // 颜色集
    initOrNot = false;
    
// 绘制
function draw() {
    var total = 0,
        avarage = 0;
    data = analyser.getData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < 64; i++) {
        b = bars[i];
        if (b.h == 0) {
            b.h = data[i];
        } else {
            if (b.h < data[i]) {
                b.h += Math.floor((data[i] - b.h) / 2);
            } else {
                b.h -= Math.floor((b.h - data[i]) / 1.2);
            }
        }
        ctx.fillStyle = 'rgba(' + b.color + ', 0.8)';
        b.h *= 1.8;
        ctx.fillRect(b.x, canvas.height - b.h, b.w, b.h);
        if (dots[i] < b.h) {
            dots[i] = b.h;
        } else {
            dots[i]--;
        };
        ctx.fillStyle = ctx.fillStyle.replace('0.8)', '0.5)');
        ctx.fillRect(b.x, canvas.height - dots[i] - b.w, b.w, b.w);
        total += data[i];
    }
    avarage = Math.floor(total / 64);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(0, canvas.height - avarage, canvas.width, avarage);
    ctx.fillRect(canvas.width - avarage, 0, avarage, canvas.height);
    ctx.fillRect(0, 0, canvas.width, avarage);
    ctx.fillRect(0, 0, avarage, canvas.height);
}

function init() {
    util.setBg(1);
    var width = canvas.width,
        height = canvas.height,
        colorNum = colors.length,
        barWidth = Math.ceil(width / 64);
    for (var i = 0; i < 64; i++) {
        dots[i] = 0;
        bars[i] = {
            x: i * barWidth,
            w: barWidth,
            h: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
        }
    }
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