import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";

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

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (id: number) => void }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;

  return (
    <div className="product-card group">
      <div className="product-img-wrap">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="product-img" />
        ) : (
          <div className="product-img-placeholder">
            <span style={{ color: "var(--deer-gold)", fontSize: "2rem" }}>鹿</span>
          </div>
        )}
        {product.isFeatured && (
          <span className="product-badge">精選</span>
        )}
        {originalPrice && originalPrice > price && (
          <span className="product-badge product-badge-sale">特惠</span>
        )}
      </div>
      <div className="product-info">
        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="product-tag">{tag}</span>
            ))}
          </div>
        )}
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}
        <div className="product-price-row">
          <span className="product-price">NT$ {price.toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <span className="product-price-original">NT$ {originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className={`product-add-btn ${added ? "added" : ""}`}
        >
          {product.stock === 0 ? (
            "已售完"
          ) : added ? (
            <><Check size={14} /> 已加入</>
          ) : (
            <><Plus size={14} /> 加入購物車</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
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

  return (
    <div className="shop-page">
      {/* Hero */}
      <div className="shop-hero">
        <div className="shop-hero-content">
          <p className="font-label" style={{ color: "var(--deer-gold)", marginBottom: "1rem" }}>
            Deer's Selection
          </p>
          <h1 className="shop-hero-title">精選商品</h1>
          <p className="shop-hero-sub">母親節套餐 · 生鮮肉品 · 節令禮盒</p>
        </div>
        <Link href="/cart">
          <button className="cart-float-btn">
            <ShoppingCart size={20} />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
        </Link>
      </div>

      {/* Category Filter */}
      {categories && categories.length > 0 && (
        <div className="shop-filter">
          <button
            className={`filter-btn ${!selectedCategory ? "active" : ""}`}
            onClick={() => setSelectedCategory(undefined)}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="shop-container">
        {isLoading ? (
          <div className="shop-loading">
            <div className="loading-spinner" />
            <p>載入中...</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product as Product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="shop-empty">
            <p>目前尚無商品，敬請期待。</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="shop-cta">
        <p className="font-label" style={{ color: "var(--deer-gold)" }}>Reservation</p>
        <h2 className="shop-cta-title">或者，來店享用</h2>
        <p className="shop-cta-sub">把最好的，留給餐桌上的時刻。</p>
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
