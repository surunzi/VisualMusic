// 5号可视化效果
// 参考：http://codepen.io/pixelgrid/pen/ECrKd
define(['analyser', 'util'], function (analyser, util) {

var cover = 'e5.jpg';

var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    particles = [],
    particleNum = analyser.getFftSize() / 4,
    colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'],
    p, p2, i, j, len, factor, total, avg,
    initOrNot = false;

// 粒子生成函数
function Particle() {
    this.x = Math.round(Math.random() * canvas.width);
    this.y = Math.round(Math.random() * canvas.height);
    this.rad = Math.round(Math.random() * 10) + 15;
    this.rgba = colors[util.intRandom(0, 5)];
    this.vx = Math.round(Math.random() * 3) - 1.5;
    this.vy = Math.round(Math.random() * 3) - 1.5;
}

// 获取两点间距离
function findDistance(p1, p2){  
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
    
// 绘制
function draw() {
    ctx.save();
    data = analyser.getData();
    len = data.length / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.linewidth = 0.5;

    for (i = 0, total = 0; i < len; i++) {
        total += data[i];
    }
    avg = total / len;

    for(i = 0; i < len; i++){
        p = particles[i];
        factor = 1;
        for(j = 0; j < len; j++){
           p2 = particles[j];
           if(p.rgba == p2.rgba && findDistance(p, p2) < avg){
              ctx.strokeStyle = p.rgba;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              factor += 0.6;
           }
        }

        ctx.fillStyle = p.rgba;
        ctx.strokeStyle = p.rgba;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.rad * factor, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, (p.rad + 5) * factor, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();

        p.x += p.vx;
        p.y += p.vy;
        
        if(p.x > canvas.width + p.rad) p.x = 0;
        if(p.x < -p.rad) p.x = canvas.width;
        if(p.y > canvas.height + p.rad) p.y = 0;
        if(p.y < -p.rad) p.y = canvas.height;
    }
    ctx.restore();
}

function init() {
    util.setBg(5);
    for(var i = 0; i < particleNum; i++){
        particles.push(new Particle());
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