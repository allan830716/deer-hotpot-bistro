# 初衷小鹿 Deer's Hotpot Bistro — 官網完整技術文件

> 最後更新：2026-06-19
> 適用對象：接手維護的工程師、品牌總監 AJ

---

## 一、官網概覽

| 項目 | 內容 |
|------|------|
| **網站名稱** | 初衷小鹿 Deer's Hotpot Bistro |
| **正式網址** | https://deersbistro.tw |
| **備用網址** | https://deer-hotpot-bistro.vercel.app |
| **技術框架** | React 19 + Vite 6 + Tailwind CSS 4 |
| **部署平台** | Vercel（免費 Hobby Plan） |
| **程式碼倉庫** | https://github.com/allan830716/deer-hotpot-bistro（Private） |
| **部署分支** | standalone（非 main） |
| **DNS 管理** | 中華電信 HiNet（https://domain.hinet.net） |
| **網域商** | 中華電信 HiNet |

---

## 二、所有資料的存放位置

### 2.1 程式碼（100% 在雲端）

所有程式碼存放在 GitHub Private Repo：
https://github.com/allan830716/deer-hotpot-bistro
分支：standalone（這是正式版本，Vercel 從這裡部署）
分支：main（舊的 Manus 版本，已不使用）

工程師取得程式碼的方式：
git clone https://github.com/allan830716/deer-hotpot-bistro.git
git checkout standalone
pnpm install
pnpm dev

### 2.2 圖片與靜態資源（100% 在 GitHub）

所有圖片都存放在 GitHub repo 的 client/public/images/ 目錄中，共 88 張，包含：

| 類別 | 數量 | 說明 |
|------|------|------|
| 菜單頁面 | 33 張 | page-01.png ~ page-33.png |
| 空間照片 | 4 張 | 餐廳實景照片 |
| 品牌圖片 | 6 張 | Logo、Hero 圖 |
| 菜品照片 | 10 張 | 肉品、湯底等 |
| 媒體報導 | 4 張 | Vogue、Elle、中時等 |
| 獎項圖片 | 4 張 | 台北米其林、台灣30強等 |
| CREM 甜點 | 5 張 | 副品牌頁面用 |
| 其他 | 22 張 | 節慶套餐等 |

注意：部分菜品照片（熟成肉、湯底、甜點）使用外部 CDN 連結（d2xsxph8kpxj0f.cloudfront.net），這些是 AI 生成圖，不在 GitHub 內。

### 2.3 部署（自動化）

每次 push 到 standalone 分支，Vercel 會自動重新部署，約 1-2 分鐘上線。

---

## 三、網站頁面結構

| 路由 | 頁面 | 檔案 |
|------|------|------|
| / | 首頁 | client/src/pages/Home.tsx |
| /menu | 菜單 | client/src/pages/Menu.tsx |
| /space | 空間 | client/src/pages/Space.tsx |
| /experience | 體驗 | client/src/pages/Experience.tsx |
| /brand | 品牌故事 | client/src/pages/Brand.tsx |
| /crem | CREM 甜點 | client/src/pages/Crem.tsx |
| /awards | 獎項媒體 | client/src/pages/Awards.tsx |
| /reservation | 訂位 | client/src/pages/Reservation.tsx |
| /transport | 交通 | client/src/pages/Transport.tsx |

---

## 四、重要外部連結（硬編碼在程式碼中）

| 功能 | 連結 | 位置 |
|------|------|------|
| 線上訂位 | https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw | 多個頁面 |
| Google Maps | 嵌入 iframe（不需 API Key） | Space.tsx |
| LINE 客服 | 需確認 LINE ID | Home.tsx |

---

## 五、設計系統

### 色彩

| 變數名稱 | 色碼 | 用途 |
|---------|------|------|
| --deer-bg | #F5F3EF | 主背景（暖灰） |
| --deer-bg-dark | #EDE9E3 | 次要背景 |
| --deer-dark | #1A1210 | 深色背景區塊 |
| --deer-text | #1A1210 | 主要文字 |
| --deer-sub | #6B5B4E | 次要文字 |
| --deer-gold | #C5976D | 金色強調色 |
| --deer-dark-text | #F0E9DF | 深色背景上的文字 |

### 字體

| 字體 | 用途 |
|------|------|
| Noto Serif TC weight 200-300 | 中文主要字體 |
| Cormorant Garamond weight 300 | 英文標題字體 |

全域 CSS 位於 client/src/index.css，包含所有 CSS 變數、.fade-up 動畫、.btn-deer-* 按鈕樣式。

---

## 六、如何修改網站內容

修改文字內容：直接編輯對應頁面的 .tsx 檔案
- 修改首頁文字 → client/src/pages/Home.tsx
- 修改菜單 → client/src/pages/Menu.tsx

更換圖片：
1. 將新圖片放到 client/public/images/ 目錄
2. 在程式碼中更新路徑，例如：/images/new-image.jpg
3. Push 到 standalone 分支，Vercel 自動部署

修改訂位連結：搜尋 inline.app/booking 關鍵字，找到所有使用訂位連結的地方統一更換。

修改菜單圖片（33 張 PNG）：
菜單圖片命名規則：page-01_[hash].png ~ page-33_[hash].png
在 Menu.tsx 中找到 MENU_PAGES 陣列，替換對應的圖片路徑。

---

## 七、部署流程

正常更新流程：
1. git clone https://github.com/allan830716/deer-hotpot-bistro.git
2. git checkout standalone
3. pnpm install
4. pnpm dev（本機測試）
5. git add . && git commit -m "描述修改內容"
6. git push origin standalone
Vercel 會自動在 1-2 分鐘內重新部署。

Vercel 管理後台：
- 網址：https://vercel.com/deer-s-hotpot-bistro/deer-hotpot-bistro
- 帳號：allan830716（GitHub 登入）
- Production Branch：standalone

---

## 八、DNS 設定記錄

| 類型 | 主機名稱 | 值 | 說明 |
|------|---------|-----|------|
| A | deersbistro.tw | 76.76.21.21 | 指向 Vercel |
| CNAME | www.deersbistro.tw | cname.vercel-dns.com | www 子網域 |

DNS 管理：https://dnmgt.hinet.net（中華電信 HiNet 帳號登入）

---

## 九、換電腦或換工程師的風險評估

完全安全（不受影響）：
- 所有程式碼 → GitHub（雲端）
- 所有圖片 → GitHub（雲端）
- 網站運行 → Vercel（雲端，自動運行）
- 網域 → HiNet（雲端，與電腦無關）

需要帳號才能操作：
| 帳號 | 用途 | 備注 |
|------|------|------|
| GitHub allan830716 | 修改程式碼 | 需要帳號密碼 |
| Vercel allan830716 | 管理部署 | 用 GitHub 登入 |
| HiNet | 管理 DNS/網域 | 需要帳號密碼 |

重要：請確保以上三個帳號的密碼安全保存（建議用密碼管理器）。

不需要備份的東西：程式碼（GitHub 已有）、圖片（GitHub 已有）、部署設定（Vercel 已有）

建議備份的東西：HiNet 帳號密碼、GitHub 帳號密碼

---

## 十、常見問題 FAQ

Q: 網站改了但沒有更新？
A: 確認是否 push 到 standalone 分支（不是 main）。到 Vercel 後台查看最新部署狀態。

Q: 圖片顯示不出來？
A: 確認圖片路徑是 /images/filename.png（相對於 public 目錄）。

Q: 如何新增頁面？
A: 在 client/src/pages/ 建立新的 .tsx 檔案，然後在 client/src/App.tsx 的 Router 函式中新增路由。

Q: 訂位系統在哪裡管理？
A: 訂位系統是外部服務（inline.app），需要到 inline.app 後台管理，與官網程式碼無關。

---

文件由 Manus AI 協助建立，2026-06-19
