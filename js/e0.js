// 0号可视化效果
define(['analyser', 'util'], function (analyser, util) {

var cover = 'e0.jpg';

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    len = 0,
    i = 0,
    initOrNot = false,
    p,
    particles = [], // 粒子
    colors = ['105, 210, 231',
        '27, 103, 107',
        '190, 242, 2',
        '235, 229, 77',
        '0, 205, 172',
        '22, 147, 165',
        '249, 212, 35',
        '255, 78, 80',
        '231, 32, 78',
        '12, 202, 186',
        '255, 0, 111'
    ]; // 颜色集
    
// 绘制
function draw() {
    ctx.save();
    data = analyser.getData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0, len = data.length; i < len; i = i + 5) {
        p = particles[i];
        if (p.size == 0 ) {
            p.size = data[i];
        } else {
            if (p.size < data[i]) {
                p.size += Math.floor((data[i] - p.size) / 5);
                p.opacity = p.opacity + 0.02;
                if (p.opacity > 1) {
                    p.opacity = 1;
                }
            } else {
                p.size -= Math.floor((p.size - data[i]) / 5);
                if (data[i] == 0) {
                    p.opacity = 0;
                } else {
                    p.opacity = p.opacity - 0.02;
                    if (p.opacity < 0) {
                        p.opacity = 0;
                        p.x = Math.random() * canvas.width;
                        p.y = Math.random() * canvas.height;
                    }
                }
            }
        }
        var color = p.color.replace('0)', p.opacity + ')');
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();
}

function init() {
    util.setBg(0);
    var i, len = analyser.getFftSize() / 2,
        width = canvas.width,
        height = canvas.height,
        colorNum = colors.length;
    for (i = 0; i < len; i++) {
        particles[i] = {
            x: Math.random() * width,
            y: Math.random() * height,
            color: 'rgba(' + colors[Math.floor(Math.random() * colorNum)] + ', 0)',
            size: 0,
            opacity: Math.random() + 0.2
        }
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