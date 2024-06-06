const initialButtonCount = 9; // Default to 9 buttons
let buttonCount = initialButtonCount;

document.addEventListener("DOMContentLoaded", function() {
    const buttonContainer = document.getElementById('button-container');
    const settingModal = document.getElementById('setting-modal');
    const closeModal = document.querySelector('.close');
    const saveSettingsButton = document.getElementById('save-settings');
    let currentButton = null;

    function createButtonGrid(count) {
        buttonContainer.style.gridTemplateColumns = `repeat(${Math.sqrt(count)}, 1fr)`;
        buttonContainer.style.gridTemplateRows = `repeat(${Math.sqrt(count)}, 1fr)`;
        buttonContainer.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const button = document.createElement('button');
            button.className = 'button';
            button.innerHTML = '<span class="material-icons">face</span>';
            button.addEventListener('click', () => playSound(button));
            button.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                openSettings(button);
            });
            buttonContainer.appendChild(button);
        }
    }

    function playSound(button) {
        const audio = new Audio(button.dataset.audio || 'default-sound.mp3');
        audio.play();
    }

    function openSettings(button) {
        currentButton = button;
        document.getElementById('icon-input').value = button.querySelector('.material-icons').innerText;
        document.getElementById('color-input').value = button.style.backgroundColor || '#f0f0f0';
        document.getElementById('audio-input').value = button.dataset.audio || '';
        settingModal.style.display = "block";
    }

    closeModal.onclick = function() {
        settingModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == settingModal) {
            settingModal.style.display = "none";
        }
    }

    saveSettingsButton.onclick = function() {
        const icon = document.getElementById('icon-input').value;
        const color = document.getElementById('color-input').value;
        const audio = document.getElementById('audio-input').value;

        if (currentButton) {
            currentButton.querySelector('.material-icons').innerText = icon;
            currentButton.style.backgroundColor = color;
            currentButton.dataset.audio = audio;
        }
        settingModal.style.display = "none";
    }

    createButtonGrid(buttonCount);
});
