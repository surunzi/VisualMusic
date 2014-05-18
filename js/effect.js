// 效果
define(['util', 'e0', 'e1', 'e2', 'e3', 'e4', 'e5',
    'e6', 'e7', 'e8', 'e9'], function (util) {

var canvas = util.getById('visual-canvas'),
    $effectList = $('#effect-list'),
    effectListHtml = '',
    currentEffect = 0, // 当前可视化效果
    effect = null,
    effects = [],
    i = 0,
    interval = 30,
    isStopped = true, // 是否停止
    len = 0, 
    requestAnimationFrame = webkitRequestAnimationFrame,
    cancelAnimationFrame = webkitCancelAnimationFrame,
    timer = null; // 触发器

// 加载设置
if (localStorage.effect) {
    currentEffect = +localStorage.effect;
}

// 开始绘制
function beginDraw() {
    isStopped = false;
    if (!effect) {
        setCurrentEffect(currentEffect);
    }
    draw();
}

// 保存设置
function saveSetting() {
    localStorage.effect = currentEffect;
}

// 设置当前效果
function setCurrentEffect(num) {
    if (effect) {
        effect.disable();
    }
    currentEffect = num;
    effect = effects[num];
    effect.enable();
}

// 停止绘制
function stopDraw() {
    if (timer) {
        cancelAnimationFrame(timer);
    }
    isStopped = true;
}

// 效果初始化
for (i = 1, len = arguments.length; i < len; i++) {
    effects[i - 1] = arguments[i];
    effectListHtml += '<li><img  num="' + (i - 1) + '" src="img/' + effects[i - 1].cover + '"></li>';
}
$effectList.html(effectListHtml);
$effectList.on('click', 'li img', function () {
    setCurrentEffect($(this).attr('num'));
    util.setBg(currentEffect);
});

function draw() {
    if (isStopped != true) {
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(draw);
    }
    if (effect.isInit() === false) {
        effect.init();
    }
    effect.draw();
}

function next() {
    currentEffect ++;
    currentEffect = currentEffect % effects.length;
    setCurrentEffect(currentEffect);
    util.setBg(currentEffect);
}

function pre() {
    currentEffect--;
    if (currentEffect == -1) {
        currentEffect = effects.length - 1;
    }
    setCurrentEffect(currentEffect);
    util.setBg(currentEffect);
}

function windowResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

windowResize();
$(window).on('resize', function() {
    windowResize();
});

return {
    beginDraw: beginDraw,
    next: next,
    pre: pre,
    saveSetting: saveSetting,
    stopDraw: stopDraw
}

});