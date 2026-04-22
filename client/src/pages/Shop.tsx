import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Check, Search, ChevronDown } from "lucide-react";

// ── 商品圖片對照表（依商品名稱關鍵字映射 CDN 圖片）──────────────────────────
const PRODUCT_IMAGES: Record<string, string> = {
  "母親節龍蝦雙人": "/manus-storage/mothers-day-lobster-set_0d8875fc.png",
  "母親節四人": "/manus-storage/mothers-day-premium-set_32ef560b.png",
  "牛五花": "/manus-storage/beef-short-rib_19311859.png",
  "和牛": "/manus-storage/wagyu-snowflake_f89ad59b.png",
  "伊比利": "/manus-storage/iberico-pork_76826d06.png",
  "羔羊": "/manus-storage/lamb-slices_57a9036a.png",
  "土雞": "/manus-storage/chicken-thigh_0bf49d4d.png",
  "龍蝦": "/manus-storage/boston-lobster_044ef1b8.png",
  "乾貨": "/manus-storage/seafood-broth_e86723fc.png",
  "湯底": "/manus-storage/seafood-broth_e86723fc.png",
  "餃子": "/manus-storage/pork-dumplings_6210019a.png",
  "蔬菜": "/manus-storage/assorted-vegetables_c4a84f8e.png",
  "甜點": "/manus-storage/crem-dessert_f37fd998.png",
};

function getProductImage(name: string, imageUrl: string | null): string {
  if (imageUrl) return imageUrl;
  for (const [key, url] of Object.entries(PRODUCT_IMAGES)) {
    if (name.includes(key)) return url;
  }
  return "";
}

// ── 分類定義（帶英文副標）──────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, { en: string; emoji: string }> = {
  "推薦組合": { en: "Recommended Sets", emoji: "🎁" },
  "居家鍋底": { en: "Broth & Base", emoji: "🍲" },
  "牛 USDA Prime Beef": { en: "USDA Prime Beef", emoji: "🥩" },
  "豬 Black Pig": { en: "Black Pig", emoji: "🐷" },
  "雞 Chicken": { en: "Chicken", emoji: "🐔" },
  "羊 Lamb": { en: "Lamb", emoji: "🐑" },
  "海鮮 Seafood": { en: "Seafood", emoji: "🦞" },
};

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  originalPrice: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  tags: string[] | null;
  categoryId: number | null;
  stock: number;
  isActive: boolean;
};

// ── 商品卡片 ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (id: number) => void;
}) {
  const [added, setAdded] = useState(false);
  const [, navigate] = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("shop-card-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
    navigate("/cart");
  };

  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice
    ? parseFloat(product.originalPrice)
    : null;
  const imgSrc = getProductImage(product.name, product.imageUrl);
  const discount =
    originalPrice && originalPrice > price
      ? Math.round((1 - price / originalPrice) * 100)
      : null;

  return (
    <div
      ref={cardRef}
      className="shop-card"
      onClick={() => navigate(`/shop/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* 圖片區 */}
      <div className="shop-card-img-wrap">
        {imgSrc ? (
          <img src={imgSrc} alt={product.name} className="shop-card-img" />
        ) : (
          <div className="shop-card-img-placeholder">
            <span>鹿</span>
          </div>
        )}
        {/* 放大鏡圖示 */}
        <div className="shop-card-zoom">
          <Search size={14} />
        </div>
        {/* 徽章 */}
        {product.isFeatured && (
          <span className="shop-card-badge shop-card-badge-featured">精選</span>
        )}
        {discount && (
          <span className="shop-card-badge shop-card-badge-sale">
            -{discount}%
          </span>
        )}
      </div>

      {/* 資訊區 */}
      <div className="shop-card-body">
        {product.tags && product.tags.length > 0 && (
          <div className="shop-card-tags">
            {product.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="shop-card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="shop-card-name">{product.name}</h3>
        {product.description && (
          <p className="shop-card-desc">{product.description}</p>
        )}
        <div className="shop-card-price-row">
          <span className="shop-card-price">NT$ {price.toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <span className="shop-card-price-original">
              NT$ {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* 按鈕組 */}
        <div className="shop-card-actions">
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="shop-card-btn-buy"
          >
            {product.stock === 0 ? "已售完" : "立即訂購"}
          </button>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`shop-card-btn-cart ${added ? "added" : ""}`}
            title="加入購物車"
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 主頁面 ────────────────────────────────────────────────────────────────
export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { sessionId, itemCount, refetchCart } = useCart();

  const { data: categories } = trpc.categories.list.useQuery();
  const { data: products, isLoading } = trpc.products.list.useQuery({
    categoryId: selectedCategory,
    activeOnly: true,
  });

  const addToCart = trpc.cart.addItem.useMutation({
    onSuccess: () => refetchCart(),
  });

  const handleAddToCart = (productId: number) => {
    addToCart.mutate({ sessionId, productId, quantity: 1 });
  };

  // 關閉下拉選單（點擊外部）
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategoryName =
    selectedCategory && categories
      ? categories.find((c) => c.id === selectedCategory)?.name ?? "全部商品"
      : "全部商品";

  return (
    <div className="shop-page-v2">
      {/* ── Hero ── */}
      <div className="shop-hero-v2">
        <div className="shop-hero-v2-content">
          <p
            className="font-label"
            style={{ color: "var(--deer-gold)", marginBottom: "1rem" }}
          >
            Deer's Selection
          </p>
          <h1 className="shop-hero-v2-title">精選商品</h1>
          <p className="shop-hero-v2-sub">
            母親節套餐 · 居家鍋底 · 頂級肉品 · 海鮮
          </p>
        </div>
        <Link href="/cart">
          <button className="shop-cart-float">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="shop-cart-badge">{itemCount}</span>
            )}
          </button>
        </Link>
      </div>

      {/* ── 分類下拉選單 ── */}
      <div className="shop-filter-v2">
        <div className="shop-filter-v2-inner">
          <div className="shop-dropdown-wrap" ref={dropdownRef}>
            <button
              className="shop-dropdown-btn"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              <span>{selectedCategoryName}</span>
              <ChevronDown
                size={16}
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
              />
            </button>
            {dropdownOpen && (
              <div className="shop-dropdown-menu">
                <button
                  className={`shop-dropdown-item ${!selectedCategory ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory(undefined);
                    setDropdownOpen(false);
                  }}
                >
                  <span className="shop-dropdown-emoji">🛍️</span>
                  <span>全部商品</span>
                </button>
                {categories?.map((cat) => {
                  const meta = CATEGORY_LABELS[cat.name] ?? {
                    en: "",
                    emoji: "•",
                  };
                  return (
                    <button
                      key={cat.id}
                      className={`shop-dropdown-item ${selectedCategory === cat.id ? "active" : ""}`}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setDropdownOpen(false);
                      }}
                    >
                      <span className="shop-dropdown-emoji">{meta.emoji}</span>
                      <span>{cat.name}</span>
                      {meta.en && (
                        <span className="shop-dropdown-en">{meta.en}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 商品數量提示 */}
          {products && (
            <p className="shop-count-hint">
              共 {products.length} 項商品
            </p>
          )}
        </div>
      </div>

      {/* ── 商品網格 ── */}
      <div className="shop-grid-section">
        {isLoading ? (
          <div className="shop-loading-v2">
            <div className="shop-loading-spinner" />
            <p>載入中...</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="shop-grid-v2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product as Product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="shop-empty-v2">
            <p>此分類目前尚無商品，敬請期待。</p>
          </div>
        )}
      </div>

      {/* ── 底部 CTA ── */}
      <div className="shop-cta-v2">
        <p
          className="font-label"
          style={{ color: "var(--deer-gold)", marginBottom: "1rem" }}
        >
          Reservation
        </p>
        <h2 className="shop-cta-v2-title">或者，來店享用</h2>
        <p className="shop-cta-v2-sub">把最好的，留給餐桌上的時刻。</p>
        <a
          href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-deer-outline"
        >
          立即訂位
        </a>
      </div>
    </div>
  );
}
