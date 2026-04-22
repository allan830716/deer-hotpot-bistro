import { useState } from "react";
import { useParams, useLocation, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Star,
} from "lucide-react";

// ── 商品圖片對照表（同 Shop.tsx）──────────────────────────────────────────
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

export default function ShopProduct() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { sessionId, refetchCart } = useCart();

  const productId = parseInt(id ?? "0", 10);

  const { data: product, isLoading } = trpc.products.getById.useQuery(
    { id: productId },
    { enabled: !!productId }
  );

  const addToCart = trpc.cart.addItem.useMutation({
    onSuccess: () => refetchCart(),
  });

  const handleAddToCart = () => {
    if (!product) return;
    addToCart.mutate({ sessionId, productId: product.id, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart.mutate(
      { sessionId, productId: product.id, quantity: qty },
      { onSuccess: () => navigate("/cart") }
    );
  };

  if (isLoading) {
    return (
      <div className="product-detail-loading">
        <div className="shop-loading-spinner" />
        <p>載入中...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-notfound">
        <p>找不到此商品。</p>
        <Link href="/shop">
          <button className="btn-deer-outline">返回商店</button>
        </Link>
      </div>
    );
  }

  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice
    ? parseFloat(product.originalPrice)
    : null;
  const discount =
    originalPrice && originalPrice > price
      ? Math.round((1 - price / originalPrice) * 100)
      : null;
  const imgSrc = getProductImage(product.name, product.imageUrl ?? null);

  return (
    <div className="product-detail-page">
      {/* 返回按鈕 */}
      <div className="product-detail-back">
        <button
          onClick={() => navigate("/shop")}
          className="product-detail-back-btn"
        >
          <ArrowLeft size={16} />
          返回商店
        </button>
      </div>

      <div className="product-detail-layout">
        {/* 左側：圖片 */}
        <div className="product-detail-img-col">
          <div className="product-detail-img-wrap">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={product.name}
                className="product-detail-img"
              />
            ) : (
              <div className="product-detail-img-placeholder">
                <span>鹿</span>
              </div>
            )}
            {discount && (
              <span className="product-detail-badge-sale">-{discount}%</span>
            )}
            {product.isFeatured && (
              <span className="product-detail-badge-featured">精選</span>
            )}
          </div>
        </div>

        {/* 右側：資訊 */}
        <div className="product-detail-info-col">
          {/* 分類標籤 */}
          {product.tags && product.tags.length > 0 && (
            <div className="product-detail-tags">
              {product.tags.map((tag, i) => (
                <span key={i} className="shop-card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="product-detail-name">{product.name}</h1>

          {/* 星評裝飾 */}
          <div className="product-detail-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < 4 ? "var(--deer-gold)" : "none"}
                color={i < 4 ? "var(--deer-gold)" : "rgba(197,151,109,0.3)"}
              />
            ))}
            <span className="product-detail-stars-label">初衷小鹿嚴選</span>
          </div>

          {/* 價格 */}
          <div className="product-detail-price-row">
            <span className="product-detail-price">
              NT$ {price.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="product-detail-price-original">
                NT$ {originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* 分隔線 */}
          <div className="product-detail-divider" />

          {/* 描述 */}
          {product.description && (
            <p className="product-detail-desc">{product.description}</p>
          )}

          {/* 庫存 */}
          {product.stock > 0 ? (
            <p className="product-detail-stock-ok">
              ✓ 現貨供應（剩餘 {product.stock} 份）
            </p>
          ) : (
            <p className="product-detail-stock-out">✗ 已售完</p>
          )}

          {/* 數量選擇 */}
          {product.stock > 0 && (
            <div className="product-detail-qty-row">
              <span className="product-detail-qty-label">數量</span>
              <div className="product-detail-qty-ctrl">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="product-detail-qty-btn"
                >
                  <Minus size={14} />
                </button>
                <span className="product-detail-qty-num">{qty}</span>
                <button
                  onClick={() =>
                    setQty((q) => Math.min(product.stock, q + 1))
                  }
                  className="product-detail-qty-btn"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          {/* 按鈕組 */}
          <div className="product-detail-actions">
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="product-detail-btn-buy"
            >
              立即訂購
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`product-detail-btn-cart ${added ? "added" : ""}`}
            >
              {added ? (
                <>
                  <Check size={16} /> 已加入購物車
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> 加入購物車
                </>
              )}
            </button>
          </div>

          {/* 備注 */}
          <div className="product-detail-note">
            <p>✦ 冷藏配送，請於收到後盡快使用</p>
            <p>✦ 訂單確認後 2–3 個工作天出貨</p>
            <p>✦ 如需大量採購，請聯繫門市</p>
          </div>
        </div>
      </div>
    </div>
  );
}
