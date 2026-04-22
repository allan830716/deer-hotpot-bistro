import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env") });

const conn = await createConnection(process.env.DATABASE_URL);

// ── 清除舊資料 ─────────────────────────────────────────────────────────────
await conn.execute("DELETE FROM cart_items");
await conn.execute("DELETE FROM order_items");
await conn.execute("DELETE FROM orders");
await conn.execute("DELETE FROM products");
await conn.execute("DELETE FROM product_categories");
console.log("Cleared existing data");

// ── 建立分類 ───────────────────────────────────────────────────────────────
const categories = [
  { name: "節令套餐", slug: "seasonal-sets", description: "限定節令精選套餐", sortOrder: 1 },
  { name: "生鮮肉品", slug: "fresh-meat", description: "嚴選熟成生鮮肉品", sortOrder: 2 },
  { name: "湯底", slug: "broth", description: "日本頂級乾貨上湯", sortOrder: 3 },
  { name: "海鮮", slug: "seafood", description: "新鮮海鮮食材", sortOrder: 4 },
];

for (const cat of categories) {
  await conn.execute(
    "INSERT INTO product_categories (name, slug, description, sortOrder) VALUES (?, ?, ?, ?)",
    [cat.name, cat.slug, cat.description, cat.sortOrder]
  );
}
console.log("Categories created");

// ── 取得分類 ID ────────────────────────────────────────────────────────────
const [catRows] = await conn.execute("SELECT id, slug FROM product_categories");
const catMap = {};
for (const row of catRows) catMap[row.slug] = row.id;

// ── 建立示範產品 ───────────────────────────────────────────────────────────
const products = [
  // 節令套餐
  {
    categoryId: catMap["seasonal-sets"],
    name: "母親節龍蝦雙人套餐",
    description: "精選波士頓龍蝦 × 熟成牛肉，搭配日本頂級乾貨上湯，附前菜、甜點與精選酒款一杯。限量供應，建議提前預訂。",
    price: "3980",
    originalPrice: "4800",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-meat-HfC4JKdjgVn8nhL3rfu43S.webp",
    stock: 20,
    isActive: true,
    isFeatured: true,
    tags: JSON.stringify(["母親節", "龍蝦", "雙人", "套餐", "限定"]),
    sortOrder: 1,
  },
  {
    categoryId: catMap["seasonal-sets"],
    name: "母親節四人豪華套餐",
    description: "波士頓龍蝦 × 熟成和牛 × 頂級豬五花，搭配乾貨上湯，附前菜拼盤、CRÈM 甜點、精選酒款兩瓶。最適合全家慶祝。",
    price: "7200",
    originalPrice: "8800",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-wine-3MQhsQo8oEws6VuohRtxHt.webp",
    stock: 10,
    isActive: true,
    isFeatured: true,
    tags: JSON.stringify(["母親節", "龍蝦", "四人", "套餐", "限定"]),
    sortOrder: 2,
  },
  // 生鮮肉品
  {
    categoryId: catMap["fresh-meat"],
    name: "頂級熟成牛五花（200g）",
    description: "經過 21 天濕式熟成，保留肉汁與脂肪香氣。適合火鍋短時間加熱，吃得到牛肉的原味與層次。",
    price: "680",
    originalPrice: null,
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-meat-HfC4JKdjgVn8nhL3rfu43S.webp",
    stock: 50,
    isActive: true,
    isFeatured: true,
    tags: JSON.stringify(["牛肉", "熟成", "五花"]),
    sortOrder: 3,
  },
  {
    categoryId: catMap["fresh-meat"],
    name: "和牛霜降肉片（150g）",
    description: "日本進口和牛，油花分布均勻，入口即化。每片精切 2mm，適合涮鍋 10–15 秒即可享用。",
    price: "1280",
    originalPrice: null,
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-meat-HfC4JKdjgVn8nhL3rfu43S.webp",
    stock: 30,
    isActive: true,
    isFeatured: false,
    tags: JSON.stringify(["和牛", "霜降", "日本進口"]),
    sortOrder: 4,
  },
  {
    categoryId: catMap["fresh-meat"],
    name: "伊比利豬梅花肉（200g）",
    description: "西班牙伊比利豬，以橡實飼養，油脂帶有堅果香氣。梅花部位肌肉與脂肪交錯，口感豐富。",
    price: "480",
    originalPrice: null,
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-meat-HfC4JKdjgVn8nhL3rfu43S.webp",
    stock: 40,
    isActive: true,
    isFeatured: false,
    tags: JSON.stringify(["豬肉", "伊比利", "梅花"]),
    sortOrder: 5,
  },
  {
    categoryId: catMap["fresh-meat"],
    name: "澳洲羔羊肉片（200g）",
    description: "澳洲草飼羔羊，肉質細嫩，膻味極低。適合喜愛羊肉風味卻不習慣重膻味的饕客。",
    price: "520",
    originalPrice: null,
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-meat-HfC4JKdjgVn8nhL3rfu43S.webp",
    stock: 35,
    isActive: true,
    isFeatured: false,
    tags: JSON.stringify(["羊肉", "澳洲", "草飼"]),
    sortOrder: 6,
  },
  {
    categoryId: catMap["fresh-meat"],
    name: "土雞腿肉片（200g）",
    description: "台灣本土放養土雞，腿肉部位，肉質Q彈有嚼勁。搭配乾貨上湯，越煮越鮮甜。",
    price: "320",
    originalPrice: null,
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-meat-HfC4JKdjgVn8nhL3rfu43S.webp",
    stock: 60,
    isActive: true,
    isFeatured: false,
    tags: JSON.stringify(["雞肉", "土雞", "台灣"]),
    sortOrder: 7,
  },
  // 湯底
  {
    categoryId: catMap["broth"],
    name: "日本頂級乾貨上湯（雙人份）",
    description: "鰹魚、昆布、椎茸長時間熬煮，金黃透亮。煙燻深度與溫潤菌香層層展開，越喝越鮮甜。",
    price: "380",
    originalPrice: null,
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-soup-kD9yMfeQhWitk7LSxi895N.webp",
    stock: 99,
    isActive: true,
    isFeatured: true,
    tags: JSON.stringify(["湯底", "乾貨", "日本", "上湯"]),
    sortOrder: 8,
  },
  // 海鮮
  {
    categoryId: catMap["seafood"],
    name: "波士頓龍蝦（約 600g）",
    description: "活體波士頓龍蝦，現點現殺。搭配乾貨上湯涮煮，鮮甜肉質完整保留。",
    price: "1580",
    originalPrice: null,
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-soup-kD9yMfeQhWitk7LSxi895N.webp",
    stock: 15,
    isActive: true,
    isFeatured: true,
    tags: JSON.stringify(["龍蝦", "海鮮", "活體"]),
    sortOrder: 9,
  },
];

for (const p of products) {
  await conn.execute(
    `INSERT INTO products (categoryId, name, description, price, originalPrice, imageUrl, stock, isActive, isFeatured, tags, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.categoryId, p.name, p.description, p.price, p.originalPrice ?? null, p.imageUrl, p.stock, p.isActive ? 1 : 0, p.isFeatured ? 1 : 0, p.tags, p.sortOrder]
  );
}
console.log(`Created ${products.length} products`);

await conn.end();
console.log("\nSeed data complete!");
