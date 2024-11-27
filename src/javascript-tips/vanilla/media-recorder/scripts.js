// MDN: https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia
const preview = document.getElementById('preview');
const recordingVideo = document.getElementById('recordingVideo');
const audioPlayer = document.getElementById('audioPlayer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const downloadButton = document.getElementById('downloadButton');
const errorElement = document.getElementById('error');
const modeSelect = document.getElementById('modeSelect');
const videoContainer = document.getElementById('videoContainer');
const audioContainer = document.getElementById('audioContainer');

let mediaRecorder;
let recordedChunks = [];
let isAudioMode = false;

modeSelect.addEventListener('change', function () {
    isAudioMode = this.value === 'audio';
    videoContainer.style.display = isAudioMode ? 'none' : 'block';
    audioContainer.style.display = isAudioMode ? 'block' : 'none';
    startButton.textContent = isAudioMode ? '録音開始' : '録画開始';
    stopButton.textContent = isAudioMode ? '録音停止' : '録画停止';
    if (preview.srcObject) {
        preview.srcObject.getTracks().forEach(track => track.stop());
    }
    resetUI();
});

async function setupStream() {
    try {
        const constraints = isAudioMode
            ? { audio: true }
            : { video: true, audio: true };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!isAudioMode) {
            preview.srcObject = stream;
        }
        return stream;
    } catch (err) {
        errorElement.textContent = `メディアデバイスのアクセスエラー: ${err.message}`;
        throw err;
    }
}

function startRecording(stream) {
    recordedChunks = [];
    const mimeType = isAudioMode ? 'audio/webm' : 'video/webm';

    mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType
    });

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, {
            type: mimeType
        });
        const url = URL.createObjectURL(blob);

        if (isAudioMode) {
            audioPlayer.src = url;
        } else {
            recordingVideo.src = url;
        }

        downloadButton.disabled = false;
    };

    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
}

function resetUI() {
    startButton.disabled = false;
    stopButton.disabled = true;
    downloadButton.disabled = true;
    recordedChunks = [];
    if (!isAudioMode) {
        recordingVideo.src = '';
    } else {
        audioPlayer.src = '';
    }
    errorElement.textContent = '';
}

startButton.addEventListener('click', async () => {
    try {
        const stream = await setupStream();
        startRecording(stream);
    } catch (err) {
        console.error('録画/録音開始エラー:', err);
        errorElement.textContent = `録画/録音開始エラー: ${err.message}`;
    }
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    preview.srcObject?.getTracks().forEach(track => track.stop());
    startButton.disabled = false;
    stopButton.disabled = true;
});

downloadButton.addEventListener('click', () => {
    const mimeType = isAudioMode ? 'audio/webm' : 'video/webm';
    const blob = new Blob(recordedChunks, {
        type: mimeType
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    const timestamp = new Date().toISOString();
    const extension = isAudioMode ? 'webm' : 'webm';
    a.download = `recording-${timestamp}.${extension}`;
    a.click();
    window.URL.revokeObjectURL(url);
});