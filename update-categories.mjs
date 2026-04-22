import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('Updating categories...');

// 更新現有分類並新增缺少的分類
const newCategories = [
  { id: 1, name: '推薦組合', slug: 'recommended-sets', description: '節令套餐與精選組合', sortOrder: 1 },
  { id: 2, name: '居家鍋底', slug: 'broth-base', description: '日本頂級乾貨上湯與鍋底', sortOrder: 2 },
  { id: 3, name: '牛 USDA Prime Beef', slug: 'beef', description: 'USDA Prime 頂級熟成牛肉', sortOrder: 3 },
  { id: 4, name: '豬 Black Pig', slug: 'pork', description: '伊比利黑豬與頂級豬肉', sortOrder: 4 },
  { id: 5, name: '雞 Chicken', slug: 'chicken', description: '放牧土雞與雞肉品項', sortOrder: 5 },
  { id: 6, name: '羊 Lamb', slug: 'lamb', description: '澳洲羔羊與羊肉品項', sortOrder: 6 },
  { id: 7, name: '海鮮 Seafood', slug: 'seafood', description: '波士頓龍蝦與新鮮海鮮', sortOrder: 7 },
];

// 先更新 id 1-4，再插入 5-7
for (const cat of newCategories) {
  if (cat.id <= 4) {
    await conn.execute(
      'UPDATE product_categories SET name=?, slug=?, description=?, sortOrder=? WHERE id=?',
      [cat.name, cat.slug, cat.description, cat.sortOrder, cat.id]
    );
    console.log(`Updated category id=${cat.id}: ${cat.name}`);
  } else {
    // Check if exists
    const [existing] = await conn.execute('SELECT id FROM product_categories WHERE id=?', [cat.id]);
    if (existing.length === 0) {
      await conn.execute(
        'INSERT INTO product_categories (id, name, slug, description, sortOrder) VALUES (?, ?, ?, ?, ?)',
        [cat.id, cat.name, cat.slug, cat.description, cat.sortOrder]
      );
      console.log(`Inserted category id=${cat.id}: ${cat.name}`);
    } else {
      await conn.execute(
        'UPDATE product_categories SET name=?, slug=?, description=?, sortOrder=? WHERE id=?',
        [cat.name, cat.slug, cat.description, cat.sortOrder, cat.id]
      );
      console.log(`Updated category id=${cat.id}: ${cat.name}`);
    }
  }
}

// 更新商品分類和圖片
const productUpdates = [
  // 推薦組合 (id=1) - 龍蝦雙人套餐先匹配龍蝦關鍵字，需特別處理
  { nameContains: '母親節龍蝦雙人套餐', categoryId: 1, imageUrl: '/manus-storage/mothers-day-lobster-set_0d8875fc.png' },
  { nameContains: '母親節四人', categoryId: 1, imageUrl: '/manus-storage/mothers-day-premium-set_32ef560b.png' },
  // 居家鍋底 (id=2)
  { nameContains: '乾貨', categoryId: 2, imageUrl: '/manus-storage/seafood-broth_e86723fc.png' },
  // 牛 (id=3)
  { nameContains: '牛五花', categoryId: 3, imageUrl: '/manus-storage/beef-short-rib_19311859.png' },
  { nameContains: '和牛', categoryId: 3, imageUrl: '/manus-storage/wagyu-snowflake_f89ad59b.png' },
  // 豬 (id=4)
  { nameContains: '伊比利', categoryId: 4, imageUrl: '/manus-storage/iberico-pork_76826d06.png' },
  // 羊 (id=6)
  { nameContains: '羔羊', categoryId: 6, imageUrl: '/manus-storage/lamb-slices_57a9036a.png' },
  // 雞 (id=5)
  { nameContains: '土雞', categoryId: 5, imageUrl: '/manus-storage/chicken-thigh_0bf49d4d.png' },
  // 海鮮 (id=7)
  { nameContains: '龍蝦', categoryId: 7, imageUrl: '/manus-storage/boston-lobster_044ef1b8.png' },
];

console.log('\nUpdating products...');
for (const update of productUpdates) {
  const [rows] = await conn.execute(
    'SELECT id, name FROM products WHERE name LIKE ?',
    [`%${update.nameContains}%`]
  );
  for (const row of rows) {
    await conn.execute(
      'UPDATE products SET categoryId=?, imageUrl=? WHERE id=?',
      [update.categoryId, update.imageUrl, row.id]
    );
    console.log(`Updated product "${row.name}": categoryId=${update.categoryId}`);
  }
}

// 查詢最終結果
const [cats] = await conn.execute('SELECT id, name FROM product_categories ORDER BY id');
console.log('\nFinal categories:', cats.map(c => `${c.id}:${c.name}`).join(', '));

const [prods] = await conn.execute('SELECT id, name, categoryId, imageUrl FROM products ORDER BY id');
console.log('\nFinal products:');
for (const p of prods) {
  console.log(`  [${p.id}] ${p.name} | cat=${p.categoryId} | img=${p.imageUrl ? '✓' : '✗'}`);
}

await conn.end();
console.log('\nDone!');
