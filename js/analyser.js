// 音频分析器
define(['util'], function (util) {

var audio = util.getById('music'),
    audioContext = new AudioContext(),
    analyser = audioContext.createAnalyser(),
    audioSource = audioContext.createMediaElementSource(audio);

analyser.fftSize = 512;
var freqByteData = new Uint8Array(analyser.frequencyBinCount);

// 连接音频源跟分析器
audioSource.connect(analyser);
analyser.connect(audioContext.destination);

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