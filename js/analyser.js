// 音频分析器
define(['util'], function (util) {

var audio = util.getById('music'),
    audioContext,
    analyser = {
        getByteFrequencyData: function () {
            return []
        },
        fftSize: 512
    },
    audioSource,
    freqByteData;

document.addEventListener('click', init, false)    

var isInit = false
function init() {
    if (isInit) return
    isInit = true
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    audioSource = audioContext.createMediaElementSource(audio);

    analyser.fftSize = 512;
    freqByteData = new Uint8Array(analyser.frequencyBinCount);

    // 连接音频源跟分析器
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
}

// 获取数据
function getData() {
    analyser.getByteFrequencyData(freqByteData);
    return freqByteData;
}

// 获取fftSize
function getFftSize() {
    return analyser.fftSize;
}

return {
    getData: getData,
    getFftSize: getFftSize
}

});