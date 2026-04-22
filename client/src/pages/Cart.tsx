import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

export default function Cart() {
  const [, navigate] = useLocation();
  const { sessionId, refetchCart } = useCart();
  const [checkoutForm, setCheckoutForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    notes: "",
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderResult, setOrderResult] = useState<{ orderId: number; orderNumber: string; totalAmount: number } | null>(null);

  const { data: cartItems, refetch } = trpc.cart.getCart.useQuery(
    { sessionId },
    { refetchOnWindowFocus: false }
  );

  const updateQty = trpc.cart.updateQuantity.useMutation({
    onSuccess: () => { refetch(); refetchCart(); },
  });

  const removeItem = trpc.cart.removeItem.useMutation({
    onSuccess: () => { refetch(); refetchCart(); },
  });

  const createSession = trpc.checkout.createSession.useMutation({
    onSuccess: (data) => {
      setIsCheckingOut(false);
      if (data.mode === "stripe" && data.url) {
        window.open(data.url, "_blank");
      } else if (data.mode === "demo") {
        setOrderResult({ orderId: data.orderId, orderNumber: data.orderNumber, totalAmount: data.totalAmount });
        refetch();
        refetchCart();
      }
    },
    onError: (err) => {
      setIsCheckingOut(false);
      alert("結帳失敗：" + err.message);
    },
  });

  const total = cartItems?.reduce((sum, item) => {
    const price = item.product ? parseFloat(item.product.price) : 0;
    return sum + price * item.quantity;
  }, 0) ?? 0;

  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) return;
    setIsCheckingOut(true);
    createSession.mutate({
      sessionId,
      ...checkoutForm,
      origin: window.location.origin,
    });
  };

  if (orderResult) {
    return (
      <div className="cart-page">
        <div className="order-success">
          <div className="order-success-icon">✓</div>
          <h2 className="order-success-title">訂單已建立</h2>
          <p className="order-success-number">訂單編號：{orderResult.orderNumber}</p>
          <p className="order-success-amount">金額：NT$ {orderResult.totalAmount.toLocaleString()}</p>
          <p className="order-success-note">我們將盡快與您聯繫確認訂單。</p>
          <div className="order-success-actions">
            <Link href="/shop">
              <button className="btn-deer-outline">繼續購物</button>
            </Link>
            <Link href="/">
              <button className="btn-deer-dark">回首頁</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button onClick={() => navigate("/shop")} className="cart-back-btn">
          <ArrowLeft size={16} />
          <span>繼續購物</span>
        </button>
        <h1 className="cart-title">購物車</h1>
      </div>

      {!cartItems || cartItems.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={48} style={{ color: "var(--deer-muted)", marginBottom: "1.5rem" }} />
          <p>購物車是空的</p>
          <Link href="/shop">
            <button className="btn-deer-outline" style={{ marginTop: "1.5rem" }}>前往選購</button>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => {
              const price = item.product ? parseFloat(item.product.price) : 0;
              return (
                <div key={item.id} className="cart-item">
                  {item.product?.imageUrl && (
                    <img src={item.product.imageUrl} alt={item.product?.name} className="cart-item-img" />
                  )}
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.product?.name ?? "商品"}</h3>
                    <p className="cart-item-price">NT$ {price.toLocaleString()}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => updateQty.mutate({ id: item.id, quantity: item.quantity - 1 })} className="qty-btn">
                      <Minus size={12} />
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button onClick={() => updateQty.mutate({ id: item.id, quantity: item.quantity + 1 })} className="qty-btn">
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    NT$ {(price * item.quantity).toLocaleString()}
                  </div>
                  <button onClick={() => removeItem.mutate({ id: item.id })} className="cart-remove-btn">
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary & Checkout */}
          <div className="cart-summary">
            <h2 className="cart-summary-title">訂單摘要</h2>
            <div className="cart-summary-row">
              <span>小計</span>
              <span>NT$ {total.toLocaleString()}</span>
            </div>
            <div className="cart-summary-row">
              <span>運費</span>
              <span style={{ color: "var(--deer-gold)" }}>免費</span>
            </div>
            <div className="cart-summary-total">
              <span>總計</span>
              <span>NT$ {total.toLocaleString()}</span>
            </div>

            {/* Checkout Form */}
            <div className="checkout-form">
              <h3 className="checkout-form-title">聯絡資訊</h3>
              <input
                type="text"
                placeholder="姓名"
                value={checkoutForm.customerName}
                onChange={e => setCheckoutForm(f => ({ ...f, customerName: e.target.value }))}
                className="checkout-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={checkoutForm.customerEmail}
                onChange={e => setCheckoutForm(f => ({ ...f, customerEmail: e.target.value }))}
                className="checkout-input"
              />
              <input
                type="tel"
                placeholder="電話"
                value={checkoutForm.customerPhone}
                onChange={e => setCheckoutForm(f => ({ ...f, customerPhone: e.target.value }))}
                className="checkout-input"
              />
              <textarea
                placeholder="收件地址"
                value={checkoutForm.shippingAddress}
                onChange={e => setCheckoutForm(f => ({ ...f, shippingAddress: e.target.value }))}
                className="checkout-input checkout-textarea"
                rows={2}
              />
              <textarea
                placeholder="備註（選填）"
                value={checkoutForm.notes}
                onChange={e => setCheckoutForm(f => ({ ...f, notes: e.target.value }))}
                className="checkout-input checkout-textarea"
                rows={2}
              />
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
              className="checkout-btn"
            >
              {isCheckingOut ? "處理中..." : "確認結帳"}
            </button>
            <p className="checkout-note">示範模式：直接建立訂單，無需付款。如需啟用 Stripe 金流，請聯絡管理員。</p>
          </div>
        </div>
      )}
    </div>
  );
}
