// 興味があったのでAIに出力させてみたもの..あとで使い方を理解する時間を作る..

// YouTube IFrame API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let isMinimized = false;

// YouTube Player APIの準備完了時に呼ばれる関数
function onYouTubeIframeAPIReady() {
    const playerContainer = document.getElementById('player-container');
    playerContainer.classList.add('maximized');

    player = new YT.Player('player', {
        videoId: 'EsRgUwimQ0s',
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
}

// プレーヤーの準備完了時に呼ばれる関数
function onPlayerReady(event) {
    const toggleButton = document.getElementById('toggle-pip');
    toggleButton.addEventListener('click', togglePlayerSize);
}

// プレーヤーのサイズを切り替える関数
function togglePlayerSize() {
    const playerContainer = document.getElementById('player-container');
    const toggleButton = document.getElementById('toggle-pip');

    if (isMinimized) {
        playerContainer.classList.remove('minimized');
        playerContainer.classList.add('maximized');
        toggleButton.textContent = '最小化';
    } else {
        playerContainer.classList.remove('maximized');
        playerContainer.classList.add('minimized');
        toggleButton.textContent = '最大化';
    }

    isMinimized = !isMinimized;
}