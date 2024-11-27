// script.js
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const pipButton = document.getElementById('pipButton');
    const playButton = document.getElementById('playButton');

    // ブラウザがPiPをサポートしているか確認
    if (!document.pictureInPictureEnabled) {
        pipButton.disabled = true;
        pipButton.textContent = 'PiPはサポートされていません';
    }

    // PiPボタンのクリックイベント
    pipButton.addEventListener('click', async () => {
        try {
            if (document.pictureInPictureElement) {
                // PiPモードを終了
                await document.exitPictureInPicture();
            } else {
                // PiPモードを開始
                await video.requestPictureInPicture();
            }
        } catch (error) {
            console.error('PiPモードの切り替えに失敗しました:', error);
        }
    });

    // 再生/一時停止ボタンのクリックイベント
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // PiPモードの状態変更を監視
    video.addEventListener('enterpictureinpicture', () => {
        pipButton.textContent = 'PiPモードを終了';
    });

    video.addEventListener('leavepictureinpicture', () => {
        pipButton.textContent = 'PiPモード';
    });

    // 再生状態の変更を監視
    video.addEventListener('play', () => {
        playButton.textContent = '一時停止';
    });

    video.addEventListener('pause', () => {
        playButton.textContent = '再生';
    });
});

