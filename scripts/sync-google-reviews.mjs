// 每日自動同步 Google 評分/評論數。
//
// 背景：網站上的 Google 評分數字原本是建站當天寫死的快照，從沒真的接過
// Google 的資料，導致評論數卡在舊數字不會變。這支腳本改成用 Google
// Places API 查詢最新的評分與評論則數，寫回 client/src/data/googleReviews.json，
// 由 GitHub Actions 排程每天執行一次；若數字有變動才會 commit，觸發 Vercel
// 重新部署。API 金鑰只存在 GitHub Actions 的加密機密裡，不會出現在瀏覽器端。

import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "../client/src/data/googleReviews.json");

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error("缺少 GOOGLE_PLACES_API_KEY 環境變數");
  process.exit(1);
}

const QUERY = "初衷小鹿 Deer's Hotpot Bistro 台北市信義區忠孝東路四段553巷6弄15號";

async function findPlaceId() {
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", QUERY);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,name");
  url.searchParams.set("key", API_KEY);

  const resp = await fetch(url);
  const data = await resp.json();
  if (data.status !== "OK" || !data.candidates?.[0]?.place_id) {
    throw new Error(`找不到店家 Place ID: ${JSON.stringify(data)}`);
  }
  return data.candidates[0].place_id;
}

async function fetchRatingByPlaceId(placeId) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total");
  url.searchParams.set("key", API_KEY);

  const resp = await fetch(url);
  const data = await resp.json();
  if (data.status !== "OK" || typeof data.result?.rating !== "number") {
    throw new Error(`查詢評分失敗: ${JSON.stringify(data)}`);
  }
  return { rating: data.result.rating, totalRatings: data.result.user_ratings_total ?? 0 };
}

async function main() {
  const placeId = await findPlaceId();
  const { rating, totalRatings } = await fetchRatingByPlaceId(placeId);

  const current = JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
  if (current.rating === rating && current.totalRatings === totalRatings) {
    console.log(`評分沒有變動（${rating} / ${totalRatings} 則），不需要更新`);
    return;
  }

  const next = { rating, totalRatings, updatedAt: new Date().toISOString() };
  writeFileSync(OUTPUT_PATH, JSON.stringify(next, null, 2) + "\n");
  console.log(`已更新：${current.rating}/${current.totalRatings} → ${rating}/${totalRatings}`);
}

main().catch((err) => {
  console.error("同步失敗:", err.message);
  process.exit(1);
});
