// Load the icon list from local storage
function loadIconList() {
    const iconList = localStorage.getItem('iconList');
    if (iconList) {
    const icons = JSON.parse(iconList);
    const iconSelector = document.getElementById('icon-selector');
    iconSelector.innerHTML = '';
    icons.forEach(icon => {
        const newOption = document.createElement('option');
        newOption.value = icon.value;
        newOption.textContent = icon.text;
        iconSelector.appendChild(newOption);
    });
    } else if (!iconList) {
        const defaultIcons = [
        { "value": "radio_button_unchecked", "text": "○"},
        { "value": "close", "text": "✕" },
        { "value": "change_history", "text": "△" },
        { "value": "crop_square", "text": "□" },
        { "value": "star", "text": "☆" },
    ];
    localStorage.setItem('iconList', JSON.stringify(defaultIcons));
    defaultIcons.forEach(icon => {
        const newOption = document.createElement('option');
        newOption.value = icon.value;
        newOption.textContent = icon.text;
        document.getElementById('icon-selector').appendChild(newOption);
    });
    }
}
// Add event listeners to save the icon list whenever it changes
document.querySelector('.btn-change').addEventListener('click', function () {
    const iconValue = document.getElementById('icon-value').value;
    const iconDescription = document.getElementById('icon-description').value;

    if (iconValue && iconDescription) {
    const newOption = document.createElement('option');
    newOption.value = iconValue;
    newOption.textContent = iconDescription;
    document.getElementById('icon-selector').appendChild(newOption);
    alert(`アイコン "${iconDescription}" を追加しました。`);
    saveIconList();
    } else {
    alert('Icon nameと説明を入力してください。');
    }
});
function saveIconList() {
    const iconSelector = document.getElementById('icon-selector');
    const icons = [];
    for (let i = 0; i < iconSelector.options.length; i++) {
    icons.push({
        value: iconSelector.options[i].value,
        text: iconSelector.options[i].textContent
    });
    }
    localStorage.setItem('iconList', JSON.stringify(icons));
}

document.getElementById('delete-icon').addEventListener('click', function () {
    const selectedValue = document.getElementById('icon-selector').value;
    alert(`アイコン "${selectedValue}" を削除します。`);
    const iconSelector = document.getElementById('icon-selector');
    const selectedOption = iconSelector.options[iconSelector.selectedIndex];
    iconSelector.removeChild(selectedOption);
    saveIconList();
});

document.getElementById('clear-storage').addEventListener('click', function () {
    if (document.getElementById('delete-checkbox').checked) {
        localStorage.clear();
        alert('Local Storageのデータをすべて削除しました。');
        location.reload(); // Reload the page to reflect changes
    } else {
        alert('削除する場合はチェックしてください。');
    }
});

// make the clear button to clear the input fields
document.querySelector('.btn-change').addEventListener('click', function() {
    document.getElementById('icon-value').value = '';
    document.getElementById('icon-description').value = '';
});

// Load the icon list when the page loads
window.addEventListener('load', loadIconList);