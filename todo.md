# 初衷小鹿 Deer's Hotpot Bistro — 專案 TODO

## 已完成

- [x] 全端版升級（tRPC + DB + 使用者認證）
- [x] 資料庫 schema：products、product_categories、cart_items、orders、order_items
- [x] 後端 tRPC routers：products、categories、cart、orders、admin、checkout
- [x] 商店頁面 /shop：商品列表、分類篩選、加入購物車
- [x] 購物車頁面 /cart：數量調整、刪除、結帳表單
- [x] 訂單成功頁面 /shop/success
- [x] 管理後台 /admin：儀表板（統計數字）
- [x] 管理後台 /admin/products：商品 CRUD
- [x] 管理後台 /admin/orders：訂單狀態管理
- [x] 管理後台 /admin/members：會員資料查看
- [x] 導覽列加入「商店」連結與購物車數量徽章
- [x] 示範產品資料種入（9 件商品、4 個分類）
- [x] Stripe 整合架構（無金鑰時自動切換示範模式）
- [x] 全站樣式：商店、購物車、管理後台 CSS

## 待辦（未來功能）

- [x] Stripe 金鑰設定（已完成）
- [ ] Logo 上傳至 CDN 並套用至導覽列
- [ ] 菜單頁：手機版拖動切換
- [ ] 菜單頁：分類改為下拉式選單
- [ ] 菜單頁：切換動畫（滑動）
- [ ] 菜單頁：移除 Zoom 文字，改為放大鏡圖示
- [ ] 首頁：加入 CRÈM 一條龍服務區塊（連結訂位）
- [ ] 首頁：加入甜點特色區塊
- [ ] 商店頁：重構分類（推薦組合/居家鍋底/牛/豬/雞/羊/海鮮）
- [ ] 商店頁：AI 生成商品圖片
- [ ] 商店頁：黑色背景、圓角圖片
- [ ] 商店頁：立即訂購按鈕
- [ ] 商品詳情頁 /shop/:id
- [ ] 全站按鈕動畫升級
- [ ] 後台操作說明文件
- [ ] 商品圖片上傳功能（S3 整合）
- [ ] 訂單通知信（Email）
- [ ] 會員訂單查詢頁面 /my-orders
- [ ] 優惠碼功能
- [ ] 庫存低量警告通知
