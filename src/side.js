let longPressTimer;
const longPressDuration = 500; // 長押しとみなす時間 (ミリ秒)
let longPressedButton; // 長押しされたボタンを記録
const buttonSounds = {}; // ボタンに対応する音声を記録するオブジェクト

// ボタンにイベントリスナーを追加
document.querySelectorAll('.button-grid button').forEach(button => {
    // 通常のクリックで音声再生
    button.addEventListener('click', (event) => {
        const soundText = localStorage.getItem(`soundText_${button.className}`);
        console.log(soundText);
        if (soundText) {
            const utterance = new SpeechSynthesisUtterance(soundText);
            // console.log(utterance);
            speechSynthesis.speak(utterance);
        }
    });

    // 長押しのイベントリスナー
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);
    button.addEventListener('mouseleave', handleMouseUp);
    button.addEventListener('touchstart', handleTouchStart);
    button.addEventListener('touchend', handleTouchEnd);
    button.addEventListener('touchcancel', handleTouchEnd);
});

function handleMouseDown(event) {
    longPressedButton = event.target.closest('button'); // closest()を使用してbutton要素を取得
    longPressTimer = setTimeout(() => {
        showPopup();
    }, longPressDuration);
}

function handleMouseUp() {
    clearTimeout(longPressTimer);
}

function handleTouchStart(event) {
    longPressedButton = event.target.closest('button'); // closest()を使用してbutton要素を取得
    longPressTimer = setTimeout(() => {
        showPopup();
    }, longPressDuration);
}

function handleTouchEnd() {
    clearTimeout(longPressTimer);
}

// ポップアップを表示する関数
function showPopup() {
    // 長押しされたボタンの背景色を取得してcolor-inputのvalueに設定
    const currentColor = window.getComputedStyle(longPressedButton).backgroundColor;
    document.getElementById('color-input').value = rgbToHex(currentColor);

    // 長押しされたボタンのアイコンを取得してicon-selectorのvalueに設定
    const currentIcon = longPressedButton.querySelector('.material-icons').innerText;
    document.getElementById('icon-selector').value = currentIcon;

    // 長押しされたボタンのテキストを設定
    const soundInput = document.getElementById('sound-text');
    document.getElementById('popup').style.display = 'flex';
}

// RGBをHexに変換する関数
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    return `#${result}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const iconList = JSON.parse(localStorage.getItem('iconList'));
    const iconSelector = document.getElementById('icon-selector');

    if (iconList && iconSelector) {
        iconList.forEach(icon => {
            const option = document.createElement('option');
            option.value = icon.value;
            option.textContent = icon.text;
            iconSelector.appendChild(option);
        });
    }
});

// チェックボタンが押された時の処理
document.querySelectorAll('.btn-change').forEach(button => {
    button.addEventListener('click', () => {
    const newColor = document.getElementById('color-input').value;
    const newIcon = document.getElementById('icon-selector').value;
    const newSoundText = document.getElementById('sound-text').value;

    if (longPressedButton) {
        // 背景色の変更
        longPressedButton.style.backgroundColor = newColor;
        localStorage.setItem(`bgColor_${longPressedButton.className}`, newColor);

        // アイコンの変更
        const iconElement = longPressedButton.querySelector('.material-icons');
        iconElement.innerText = newIcon;
        localStorage.setItem(`icon_${longPressedButton.className}`, newIcon);

        // テキストの保存
        localStorage.setItem(`soundText_${longPressedButton.className}`, newSoundText);
        alert('設定が保存されました');
    }
    });
});

// ポップアップを表示する関数の中で、Local Storageからテキストを取得して表示
function showPopup() {
    // 長押しされたボタンの背景色を取得してcolor-inputのvalueに設定
    const currentColor = window.getComputedStyle(longPressedButton).backgroundColor;
    document.getElementById('color-input').value = rgbToHex(currentColor);

    // 長押しされたボタンのアイコンを取得してicon-selectorのvalueに設定
    const currentIcon = longPressedButton.querySelector('.material-icons').innerText;
    document.getElementById('icon-selector').value = currentIcon;

    // 長押しされたボタンのテキストを取得してsound-textのvalueに設定
    const savedText = localStorage.getItem(`soundText_${longPressedButton.className}`);
    document.getElementById('sound-text').value = savedText || '';

    document.getElementById('popup').style.display = 'flex';
}

// キャンセルボタンの処理
document.querySelector('.btn-cancel').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

// ページ読み込み時にボタンの背景色とアイコンを設定
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.button-grid button').forEach(button => {
    const savedColor = localStorage.getItem(`bgColor_${button.className}`);
    if (savedColor) {
        button.style.backgroundColor = savedColor;
    }
    const savedIcon = localStorage.getItem(`icon_${button.className}`);
    if (savedIcon) {
        button.querySelector('.material-icons').innerText = savedIcon;
    }
    });
});
