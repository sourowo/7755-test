// 使用 navigator.clipboard 來複製文本
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        // 顯示「已複製」訊息
        const copyMessage = document.getElementById('copy-message');
        copyMessage.style.display = 'block';  // 顯示訊息
        setTimeout(() => {
            copyMessage.style.display = 'none';  // 隱藏訊息
        }, 1500);  // 1.5 秒後隱藏
    }).catch(err => {
        console.error('複製失敗', err);
    });
}

// 設定輸入框內容，這次改為將選項文字添加到現有內容後面並換行
function setInputValue(value) {
    const inputField = document.getElementById('input-field');
    inputField.value += value + '\n';  // 把選項文字追加到現有內容並換行
}

// 複製輸入框的內容
function copyInputValue() {
    const inputField = document.getElementById('input-field');
    navigator.clipboard.writeText(inputField.value).then(() => {
        // 顯示「已複製」訊息
        const copyMessage = document.getElementById('copy-message');
        copyMessage.style.display = 'block';  // 顯示訊息
        setTimeout(() => {
            copyMessage.style.display = 'none';  // 隱藏訊息
        }, 1500);  // 1.5 秒後隱藏
    }).catch(err => {
        console.error('複製失敗', err);
    });
}

// 新增自定義選項
function addCustomOption() {
    const customText = document.getElementById('custom-option').value;
    if (customText) {
        // 儲存自定義選項到 localStorage
        let userOptions = JSON.parse(localStorage.getItem('userOptions')) || [];
        userOptions.push(customText);
        localStorage.setItem('userOptions', JSON.stringify(userOptions));

        // 創建並顯示按鈕
        createCustomButton(customText);

        document.getElementById('custom-option').value = ''; // 清空輸入框
    } else {
        alert('請輸入自定義選項');
    }
}

// 從 localStorage 中加載自定義選項
function loadCustomOptions() {
    let userOptions = JSON.parse(localStorage.getItem('userOptions')) || [];
    userOptions.forEach(option => {
        createCustomButton(option);
    });
}

// 創建並顯示自定義按鈕
function createCustomButton(optionText) {
    const customOption = document.createElement('button');
    customOption.className = 'option-btn';
    customOption.textContent = optionText;
    customOption.onclick = function() {
        setInputValue(optionText);
    };
    document.getElementById('user-options').appendChild(customOption);
}

// 在頁面加載時加載自定義選項
window.onload = loadCustomOptions;
