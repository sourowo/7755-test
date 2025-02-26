<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>選項複製工具</title>
    <style>
        /* 設定輸入框的大小和外觀 */
        textarea {
            width: 100%;
            height: 200px; /* 調整高度 */
            font-size: 16px;  /* 字體大小 */
            padding: 10px;    /* 內邊距 */
            border: 1px solid #ccc; /* 邊框 */
            border-radius: 5px; /* 邊角圓滑 */
            resize: none; /* 禁止調整大小 */
        }

        /* 設定按鈕樣式 */
        button {
            background-color: #4CAF50; /* 按鈕背景色 */
            color: white; /* 字體顏色 */
            padding: 10px 20px; /* 內邊距 */
            border: none; /* 去掉邊框 */
            border-radius: 5px; /* 圓角 */
            cursor: pointer; /* 鼠標懸停時顯示手形 */
            margin-top: 10px; /* 按鈕與其他元素的間距 */
        }

        button:hover {
            background-color: #45a049; /* 鼠標懸停時的背景色 */
        }

        /* 設定選項按鈕樣式 */
        .option-btn {
            background-color: #008CBA; /* 按鈕背景色 */
            color: white; /* 字體顏色 */
            padding: 10px 20px; /* 內邊距 */
            border: none; /* 去掉邊框 */
            border-radius: 5px; /* 圓角 */
            cursor: pointer; /* 鼠標懸停時顯示手形 */
            margin-right: 10px; /* 按鈕之間的間距 */
            margin-bottom: 10px; /* 按鈕與下一個按鈕的間距 */
        }

        .option-btn:hover {
            background-color: #007B8C; /* 鼠標懸停時的背景色 */
        }

        /* 設定訊息提示樣式 */
        #copy-message {
            color: green; /* 訊息顏色 */
            font-weight: bold; /* 字體加粗 */
            margin-top: 10px; /* 上邊距 */
            display: none; /* 初始隱藏 */
        }
    </style>
</head>
<body>

<div id="user-options">
    <button class="option-btn" onclick="setInputValue('選項一')">選項一</button>
    <button class="option-btn" onclick="setInputValue('選項二')">選項二</button>
    <button class="option-btn" onclick="setInputValue('選項三')">選項三</button>
</div>

<!-- 自定義選項輸入框區域 -->
<input type="text" id="custom-option" placeholder="輸入自定義選項">
<button onclick="addCustomOption()">新增自定義選項</button>

<!-- 輸入框放在這裡，自定義選項下方 -->
<textarea id="input-field" rows="10" cols="50" style="resize: none;"></textarea><br>

<!-- 複製內容按鈕放在輸入框下方 -->
<button onclick="copyInputValue()">複製內容</button>

<!-- 複製訊息提示 -->
<div id="copy-message" style="display: none; color: green;">已複製！</div>

<script>
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
</script>

</body>
</html>
