// 主程序
require(['util', 'effect'], function (util, effect) {

var $body = $('body'),
    $fileList = $('#file-list'),
    $fileListWrapper = $('#file-list-wrapper'),
    $effectListWrapper = $('#effect-list-wrapper'),
    $helpWrapper = $('#help-wrapper'),
    $inputFile = $('#input-file'),
    $music = $('#music'),
    $playMode = $('#play-mode'),
    $songName = $('#song-name'),
    songNameTimer = null,
    $title = $('#title'),
    audio = util.getById('music'), // 音频
    currentFile = -1, // 当前播放文件序号
    doc = document,
    fileList = [], // 文件列表
    fileNameList = {}, // 文件名列表
    inputFile = util.getById('input-file'), // 文件输入框
    playMode = 0, // 播放模式，0为顺序，1为随机，2为单曲循环
    reader = new FileReader(), // 文件读取器
    timer = null; // 触发器

function loadFile(file) {
    var data = URL.createObjectURL(file);
    $title.text('');
    $music.removeClass('hidden');
    $helpWrapper.addClass('hidden');
    audio.src = data;
    audio.play();
    effect.beginDraw();
};

// 增加文件
function appendFiles(files) {
    var length = files.length,
        listLength = fileList.length,
        appends = '',
        addNum = 0,
        lastExistSong = -1;
    for (var i = 0; i < length; i++) {
        if (files[i].type.indexOf('audio') == 0) {
            var fileName = util.getRidOfExtention(files[i].name);
            if (typeof fileNameList[fileName] == 'undefined') {
                fileNameList[fileName] = fileList.length;
                fileList.push(files[i]);
                appends += '<li num="' + (fileList.length - 1) + '">' + fileName + '</li>';
                addNum++;
            } else {
                lastExistSong = fileNameList[fileName];
            }
        }
    }
    if (addNum > 0) {
        $fileList.append(appends);
        setCurrentSong(listLength);
    } else if (lastExistSong != -1) {
        setCurrentSong(lastExistSong);
    }
}

// 改变播放模式
function changePlayMode() {
    playMode = (playMode + 1) % 3;
    $playMode.removeClass();
    switch (playMode) {
        case 0:
            break;
        case 1:
            $playMode.addClass('rand');
            break;
        case 2:
            $playMode.addClass('single');
            break;
    }
}

// 其它拖曳函数，防止冒泡和拖曳行为
function dragAndDropCommon(e) {
    e.stopPropagation();
    e.preventDefault();
}

// Drop事件处理函数
function onDocumentDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    appendFiles(e.dataTransfer.files);
}

// 音乐播放完触发
function onMusicEnded() {
    switch (playMode) {
        case 0:
            playNext();
            break;
        case 1:
            playSpecify(util.intRandom(0, fileList.length - 1));
            break;
        case 2:
            audio.play();
            break;
    }
}

// 播放下一曲
function playNext() {
    var length = fileList.length,
        current = currentFile;
    if (length != 0) {
        current++;
        current = current % length;
        setCurrentSong(current);
    }
}

// 播放上一曲
function playPre() {
    var length = fileList.length,
        current = currentFile;
    if (length != 0) {
        current--;
        if (current == -1) {
            current = length - 1;
        }
        setCurrentSong(current);
    }
}

/**
 * 播放指定曲目
 * @param {Number} num 歌曲序号
 */
function playSpecify(num) {
    setCurrentSong(num);
}

// 暂停和播放切换
function playToggle() {
    if (audio.paused == true) {
        audio.play();
    } else {
        audio.pause();
    }
}

// 保存设置
function saveSetting() {
    localStorage.playMode = playMode;
    effect.saveSetting();
}

// 加载设置
function loadSetting() {
    if (localStorage.playMode) {
        playMode = +localStorage.playMode;
        $playMode.removeClass();
        switch (playMode) {
            case 1:
            $playMode.addClass('rand');
                break;
            case 2:
            $playMode.addClass('single');
            break;
        }
    }
}

loadSetting();

/**
 * 设置当前播放曲目 
 * @param {Number} num 曲目序号
 */
function setCurrentSong(num) {
    if (currentFile != num) {
        stopPlay();
        currentFile = num;

        loadFile(fileList[currentFile]);
        $fileList.find('li').each(function() {
            if (+$(this).attr('num') == num) {
                $(this).addClass('playing');
                var songName = $(this).text();
                $('title').text(songName);
                $songName.text(songName);
                // CSS3动画效果
                if (songNameTimer !== null) {
                    clearTimeout(songNameTimer);
                    $songName.removeClass('showAndHide');
                    $songName[0].offsetWidth = $songName[0].offsetWidth;
                }
                $songName.addClass('showAndHide');
                songNameTimer = setTimeout(function () {
                    songNameTimer = null;
                    $songName.removeClass('showAndHide');
                }, 15000);
                // 3秒后显示歌曲名
                /*setTimeout(function () {
                    $songName.animate({
                        'opacity': '1',
                        'top': '0'
                    }, 600);
                    // 显示6秒后再次隐藏歌曲名
                    setTimeout(function () {
                        $songName.animate({
                            'opacity': '0',
                            'top': '-50'
                        }, 600);
                    }, 6000);
                }, 3000);*/
            } else {
                $(this).removeClass('playing');
            }
        });
    }
}

// 停止播放
function stopPlay() {
    effect.stopDraw();
    audio.pause();
}

$body.on('click', '#help-btn', function() {
    // 帮助渐隐渐入
    $('#help').fadeIn('fast');
    var $img = $('#help img').first(),
        src = $img.attr('data-src');
    $img.attr('src', src);
}).on('click', '#help', function() {
    $(this).fadeOut('fast');
}).on('click', '#title', function() {
    // 打开文件
    $inputFile.click();
}).on('click', '#play-mode', function() {
    // 改变播放模式
    changePlayMode();
}).on('click', '#fullscreen', function() {
    // 全屏切换
    util.fullscreenSwitch();
});

// 文件拖曳
doc.addEventListener('drop', function(e) {
    onDocumentDrop(e);
}, false);
doc.addEventListener("dragenter", dragAndDropCommon, false);
doc.addEventListener("dragexit", dragAndDropCommon, false);
doc.addEventListener("dragover", dragAndDropCommon, false);

audio.addEventListener('ended', function() {
    onMusicEnded();
}, false);

$body.on('click', '#file-list li', function() {
    var songNum = $(this).attr('num');
    playSpecify(+songNum);
}).on('contextmenu', function(e) {
    e.preventDefault();
    if ($fileListWrapper.css('left') != '0px') {
        $fileListWrapper.css({'left':'0'});
        $effectListWrapper.css({'right':'0'});
    } else {
        $fileListWrapper.css({'left':'-200px'});
        $effectListWrapper.css({'right':'-200px'});
    }
});

doc.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 32: // 空格
            playToggle();
            break;
        case 37: // 左箭头
            effect.pre();
            break;
        case 39: // 右箭头
            effect.next();
            break;
        case 38: // 上箭头
            playPre();
            break;
        case 40: // 下箭头
            playNext();
            break;
    }
}, false);

$(window).on('beforeunload', function() {
    saveSetting();
});

$inputFile.on('change', function(e) {
    appendFiles(inputFile.files);
});

});