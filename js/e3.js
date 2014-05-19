// 3号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var cover = 'e3.jpg';

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    particles = [],
    angle = 0,
    avarage = 0,
    colors = ['105, 210, 231',
        '255, 255, 255',
        '248, 37, 77',
        '248, 225, 16'
    ],
    initOrNot = false;
    
// 绘制
function draw() {
    ctx.save();
    var total = 0,
        lastAvarage = avarage;
    data = analyser.getData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < data.length; i++) {
        total += data[i];
    }
    avarage = total / data.length;
    var dif = avarage - lastAvarage,
        absDif = Math.abs(dif);
    for (var i = 0, len = particles.length; i < len; i = i + 2) {
        var p = particles[i];
        // 更新
        if (dif > 0) {
            p.r += absDif / 10;
            if (p.r > p.maxR) {
                p.r -= (p.r - p.maxR) / 5;
            }
            p.o += 0.05;
            if (p.o > 1) {
                p.o = 1;
            }
        } else {
            p.r -= absDif / 5;
            if (p.r < 0) {
                p.r = 0.01;
            }
            if (p.r < p.minR) {
                p.r += (p.minR - p.r) / 10;
            }
            p.o -= 0.05;
            if (p.o < p.minO) {
                p.o = p.minO;
            }
        }
        angle += 0.0001;
        p.y += Math.cos(angle + p.d) - 2;
        p.x += Math.sin(angle + p.d);
        if (p.x > canvas.width + 5) {
            p.x = -5;
            p.d = Math.random() * 50;
        } else if (p.x < -5) {
            p.x = canvas.width + 5;
            p.d = Math.random() * 50;
        } else if (p.y < 0) {
            p.y = canvas.height + 5;
            p.d = Math.random() * 50;
        }
        // 绘制
        var grd = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, p.r + 3);
        grd.addColorStop(0, 'rgba(255, 255, 255, '+ p.o +')');
        grd.addColorStop(1, 'rgba(' + p.c + ', 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r + 3, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    var x = canvas.width / 2,
        y = canvas.height,
        r = avarage * 5;
    grd = ctx.createRadialGradient(x, y, r / 8, x, y, r);
    grd.addColorStop(0, 'rgba(175, 221, 255, 0.5)');
    grd.addColorStop(1, 'rgba(76, 159, 219, 0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function init() {
    util.setBg(3);
    var len = analyser.getFftSize() / 2;
    var width = canvas.width,
        height = canvas.height,
        colorNum = colors.length;
    for (var i = 0; i < len; i++) {
        particles[i] = {
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 5,
            minR: Math.random() * 5 + 1,
            maxR: Math.random() * 12 + 5,
            d: Math.random() * 50,
            c: colors[util.intRandom(0, colorNum)]
        }
        particles[i].minO = particles[i].o = Math.random() * 0.8 + 0.2;
    }
    initOrNot = true;
}

function isInit() {
    return initOrNot;
}

function enable() {
    util.showCanvas();
}

function disable() {
    util.hideCanvas();
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