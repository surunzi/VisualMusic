// 4号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    currentColor, // 当前颜色
    speed = 20, // 扩散速度
    addCount = 0, // 增加次数
    lastAvarage = 0,
    circleEnd = 2 * Math.PI,
    colors = ['#fd2700', '#64d700', 'fdfb00', '#8314fd', '#b8009c',
        '#fa60fd', '#fa0000', '#e64200', '#0093f0', '#fda0c0'],
    circles = [],
    initOrNot = false;
    
// 绘制
function draw() {
    ctx.save();
    var avarage = 0,
        total = 0,
        center = {
            x: Math.floor(canvas.width / 2),
            y: Math.floor(canvas.height / 2)
        };
    data = analyser.getData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0, len = data.length; i < len; i += 10) {
        total += data[i];
    }
    avarage = total / len * 10;
    // 中心圆
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(center.x, center.y, avarage, 0, circleEnd, true);
    ctx.closePath();
    ctx.fill();
    // 圆圈
    ctx.lineWidth = 4;
    for (var i = 0, len = circles.length, maxWidth = canvas.width / 1.5; i < len; i++) {
        var c = circles[i];
        if (c.a == 0) {
            continue;
        }
        ctx.strokeStyle = c.c;
        ctx.beginPath();
        ctx.arc(center.x, center.y, c.r, 0, circleEnd, true);
        ctx.closePath();
        ctx.stroke();
        c.r += speed;
        if (c.r > maxWidth) {
            c.a = 0;
        }
    }
    if (avarage < lastAvarage) {
        if (addCount > 2) {
            for (var i = 0, len = circles.length; i < len; i++) {
                if (circles[i].a == 0) {
                    circles[i].c = currentColor;
                    circles[i].r = avarage;
                    circles[i].a = 1;
                    break;
                }
            }
        } else if (addCount > 0) {
            currentColor = colors[util.intRandom(0, colors.length)];
        }
        addCount = 0;
    } else {
        addCount++;
    }
    lastAvarage = avarage;
    ctx.restore();
}

function init() {
    util.setBg(4);
    currentColor = colors[util.intRandom(0, colors.length)];
    for (var i = 0; i < 10; i++) {
        circles[i] = {
            c: '',
            r: 0,
            a: 0
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
    isInit: isInit
}

});