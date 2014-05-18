// 2号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var cover = 'e2.jpg';

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    lastValue = [], // 上次值 
    seperate = [], // 间隙
    seperateTimer = 0, // 间隙转换计时
    shadowBlur = 0, // 线模糊值
    avarage = 0, // 平均值
    color = null,
    choice,
    initOrNot = false;

/** 改变颜色 */
function changeColor() {
    choice = util.intRandom(0, 9);
    if (choice < 3) {
        color.r = color.r + color.rS * color.rD;
        if (color.r > 225) {
            color.rD = -1;
        } else if (color.r < 100) {
            color.rD = 1;
        }
    } else if (choice < 6) {
        color.g = color.g + color.gS * color.gD;
        if (color.g > 225) {
            color.gD = -1;
        } else if (color.g < 100) {
            color.gD = 1;
        }
    } else {
        color.b = color.b + color.bS * color.bD;
        if (color.b > 225) {
            color.bD = -1;
        } else if (color.b < 100) {
            color.bD = 1;
        }
    }
}
    
// 绘制
function draw() {
    var width = canvas.width / 128,
        x = 0,
        y = 0,
        direction = 1,
        middle = canvas.height / 2,
        seperateLength = 0,
        seperateNum = 0,
        total = 0,
        lastAvarage = avarage;
        data = analyser.getData();
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        changeColor();
        var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
            r = color.r,
            g = color.g,
            b = color.b;
        ctx.shadowColor = 'rgba(' + (r + 70) + ', ' + (g + 70) + ', ' + (b + 70) + ', 1)';
        ctx.shadowBlur = shadowBlur;
        ctx.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
        ctx.lineWidth = 5;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 100;
        ctx.beginPath();
        ctx.moveTo(0, middle);
        if (seperateTimer == 0) {
            seperateTimer = Math.floor(Math.random() * 50) + 20;
            for (var i = 0; i < 128; i++) {
                seperate[i] = 0;
            }
            seperateNum = Math.floor(Math.random() * 15);
            for (var i = 0; i < seperateNum; i++) {
                seperateLength = Math.floor(Math.random() * 15);
                var temp = Math.floor(Math.random() * 128);
                seperate[temp] = 1;
                for (var j = 1; j < seperateLength; j++) {
                    seperate[temp + j] = 1;
                }
            }
        } else {
            seperateTimer--;
        }
        for (var i = 0; i < 128; i++) {
            y = data[i] - (100 - i) * 0.5;
            y = (y - 80) < 0 ? 0 : y - 80;
            if (y > middle) {
                y = middle;
            }
            if (seperate[i] == 1) {
                lastValue[i] -= 20;
                if (lastValue[i] < 0) {
                    lastValue[i] = 0;
                }
                y = lastValue[i];
            } else {
                if (y - lastValue[i] > 20) {
                    lastValue[i] += 20;
                    y = lastValue[i];
                } else {
                    lastValue[i] = y;
                }
            }
            y = y * direction + middle;
            ctx.lineTo(x, y);
            total += y;
            direction = -direction;
            x = x + width;
        }
        avarage = total / 128;
        if (lastAvarage > avarage) {
            shadowBlur--;
        } else {
            shadowBlur++;
        }
        ctx.lineTo(canvas.width, middle);
        ctx.stroke();
        ctx.restore();
}

function init() {
    util.setBg(2);
    for (var i = 0; i < 256; i++) {
        lastValue[i] = 0;
    }
    color = {
        r: 100,
        g: 100,
        b: 100,
        rS: util.intRandom(1, 3),
        gS: util.intRandom(1, 3),
        bS: util.intRandom(1, 3),
        rD: 1,
        gD: 1,
        bD: 1,
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