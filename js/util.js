// 公共方法
define(function () {

var $background = $('#background'),
    $canvas = $('#visual-canvas'),
    doc = document;

// document.getElementById的缩写
function getById(id) {
    return doc.getElementById(id);
}

// 去除文件后缀名
function getRidOfExtention(str) {
    return str.replace(/\.[0-9a-z]+$/i, '');
}

/** 
 * 取得整数随机数
 * @param {Number} down 下限
 * @param {Number} up 上限
 * @returns {Number} 结果
 */
function intRandom(low, up) {
    return Math.floor(Math.random() * (up - low) + low);
}

// 全屏切换
function fullscreenSwitch() {
    var element = doc.documentElement;
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
        if(doc.cancelFullScreen) {
            doc.cancelFullScreen();
        } else if(doc.webkitCancelFullScreen) {
            doc.webkitCancelFullScreen();
        }
    } else {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if(element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }
}

// 设置背景
function setBg(num) {
    $background.removeClass();
    $background.addClass('bg' + num);
}

function showCanvas() {
    $canvas.removeClass('hidden');
}

function hideCanvas() {
    $canvas.addClass('hidden');
}

return {
    getById: getById,
    getRidOfExtention: getRidOfExtention,
    intRandom: intRandom,
    fullscreenSwitch: fullscreenSwitch,
    setBg: setBg,
    showCanvas: showCanvas,
    hideCanvas: hideCanvas
}

});