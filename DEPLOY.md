# 初衷小鹿官網 — Vercel 部署指南

## 專案說明

這是已從 Manus 平台完整遷出的純前端 React 專案，不依賴任何 Manus 服務。

**技術棧：** React 19 + Vite 7 + Tailwind CSS 4 + TypeScript

---

## 快速部署（推薦：Vercel + GitHub）

### 步驟一：建立 GitHub Repository

1. 前往 [github.com](https://github.com) 登入
2. 點擊右上角「+」→「New repository」
3. 名稱輸入 `deers-hotpot-bistro`，選擇 **Private**
4. 點擊「Create repository」
5. 在本機解壓縮 ZIP 後，執行以下指令：

```bash
cd deers-hotpot-bistro
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/你的帳號/deers-hotpot-bistro.git
git push -u origin main
```

### 步驟二：在 Vercel 部署

1. 前往 [vercel.com](https://vercel.com) 並用 GitHub 帳號登入
2. 點擊「Add New Project」
3. 選擇剛才建立的 `deers-hotpot-bistro` repository
4. **Build 設定（重要）：**

| 設定項目 | 值 |
|----------|-----|
| Framework Preset | **Vite** |
| Root Directory | `.`（保持預設） |
| Build Command | `npx vite build` |
| Output Directory | `dist` |
| Install Command | `pnpm install --no-frozen-lockfile` |

5. 點擊「Deploy」，等待約 1–2 分鐘完成

### 步驟三：綁定自訂網域 `deersbistro.tw`

1. 在 Vercel 專案頁面，進入「Settings」→「Domains」
2. 輸入 `deersbistro.tw` 並點擊「Add」
3. 同樣加入 `www.deersbistro.tw`
4. Vercel 會顯示 DNS 設定指示，前往你的網域商（例如 GoDaddy、Gandi、TWNIC）：
   - 新增 **A Record**：`@` → `76.76.21.21`
   - 新增 **CNAME Record**：`www` → `cname.vercel-dns.com`
5. DNS 傳播約 10–30 分鐘後，網站即可透過 `deersbistro.tw` 訪問

> **注意：** DNS 切換期間（約 10–30 分鐘）網站可能短暫無法訪問，但不會影響 Google 排名。

---

## 未來用 Claude 維護網站

遷移完成後，你可以直接在 Claude 繼續維護：

1. 把需要修改的檔案內容貼給 Claude（例如 `client/src/pages/Home.tsx`）
2. 請 Claude 修改後，把新的程式碼貼回對應檔案
3. 執行 `git add . && git commit -m "更新說明" && git push`
4. Vercel 會自動偵測 push 並重新部署（約 1 分鐘）

---

## 本機開發

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器（http://localhost:5173）
pnpm dev

# 打包正式版本
pnpm build
```

---

## 目錄結構

```
deers-hotpot-bistro/
├── client/
│   ├── public/
│   │   └── images/          ← 所有圖片（88 張）
│   └── src/
│       ├── pages/           ← 各頁面元件
│       ├── components/      ← 共用元件
│       ├── contexts/        ← React Context
│       ├── lib/             ← 工具函式、品牌資料
│       └── index.css        ← 全域樣式
├── dist/                    ← Build 輸出（自動生成）
├── vercel.json              ← Vercel SPA 路由設定
├── vite.config.ts           ← Vite 設定
├── package.json
└── tsconfig.json
```

---

## 常見問題

**Q：部署後頁面空白？**
確認 Vercel 的 Output Directory 設定為 `dist`，Build Command 為 `npx vite build`。

**Q：重新整理頁面出現 404？**
`vercel.json` 已設定 SPA rewrites，確認該檔案存在於根目錄。

**Q：圖片無法顯示？**
所有圖片已存放於 `client/public/images/`，路徑格式為 `/images/檔名.jpg`。

**Q：如何更新菜單圖片？**
將新的菜單圖片放入 `client/public/images/`，並在 `client/src/pages/Menu.tsx` 中更新對應的檔名。

---

## 技術支援

如需進一步協助，可將相關檔案內容提供給 Claude 請求協助。
