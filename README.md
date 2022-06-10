# thundercore fullstack test

## 使用套件

- react
- react-router
- styled-components

## 架構說明

- store 使用 react context 實作
- `src/components/Item.js`: assets 顯示元件
- `src/page/ListingPage.js`: listing 頁面
- `src/page/WatchingPage.js`: watching 頁面

## 部分調整說明

- opensea api 回傳 assets 有時會沒有圖片所以設定最小高度
- opensea api 回傳 assets 有時會沒有價格就會顯示 no sale
- opensea retrieve assets 沒辦法直接跳頁所以分頁部分只改成無限捲軸
