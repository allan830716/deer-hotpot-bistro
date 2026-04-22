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

  const handleQtyChange = (id: number, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return; // 最低數量為 1，不做任何事
    updateQty.mutate({ id, quantity: newQty });
  };

  if (orderResult) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0A0807", paddingTop: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "3rem 2rem", maxWidth: "480px" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            border: "2px solid var(--deer-gold)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem",
            fontSize: "2rem", color: "var(--deer-gold)",
          }}>✓</div>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "1.75rem", color: "#F0E9DF", letterSpacing: "0.1em", marginBottom: "1rem" }}>訂單已建立</h2>
          <p style={{ color: "var(--deer-gold)", fontSize: "0.875rem", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>訂單編號：{orderResult.orderNumber}</p>
          <p style={{ color: "rgba(240,233,223,0.6)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>金額：NT$ {orderResult.totalAmount.toLocaleString()}</p>
          <p style={{ color: "rgba(240,233,223,0.4)", fontSize: "0.8125rem", marginBottom: "2.5rem" }}>我們將盡快與您聯繫確認訂單。</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0807", paddingTop: "80px", paddingBottom: "4rem" }}>
      {/* Header */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "2rem 1.25rem 1.5rem",
        display: "flex", alignItems: "center", gap: "1rem",
        borderBottom: "1px solid rgba(197,151,109,0.12)",
      }}>
        <button
          onClick={() => navigate("/shop")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(240,233,223,0.5)", display: "flex", alignItems: "center", gap: "0.5rem",
            fontSize: "0.8125rem", letterSpacing: "0.06em",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--deer-gold)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,233,223,0.5)")}
        >
          <ArrowLeft size={14} />
          繼續購物
        </button>
        <h1 style={{
          fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
          fontSize: "1.25rem", color: "#F0E9DF", letterSpacing: "0.12em",
          margin: 0,
        }}>購物車</h1>
      </div>

      {!cartItems || cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "6rem 2rem", color: "rgba(240,233,223,0.4)" }}>
          <ShoppingBag size={48} style={{ color: "rgba(197,151,109,0.3)", marginBottom: "1.5rem", display: "block", margin: "0 auto 1.5rem" }} />
          <p style={{ fontSize: "0.9375rem", letterSpacing: "0.08em", marginBottom: "2rem" }}>購物車是空的</p>
          <Link href="/shop">
            <button className="btn-deer-outline">前往選購</button>
          </Link>
        </div>
      ) : (
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          padding: "2rem 1.25rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}
          className="cart-grid-layout"
        >
          {/* Cart Items */}
          <div>
            {cartItems.map((item) => {
              const price = item.product ? parseFloat(item.product.price) : 0;
              return (
                <div key={item.id} style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr auto",
                  gridTemplateRows: "auto auto",
                  gap: "0.5rem 1rem",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  alignItems: "center",
                }}>
                  {/* 圖片 */}
                  {item.product?.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product?.name}
                      style={{
                        width: "72px", height: "72px",
                        objectFit: "cover", borderRadius: "6px",
                        gridRow: "1 / 3",
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "72px", height: "72px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "6px", gridRow: "1 / 3",
                    }} />
                  )}

                  {/* 商品名稱 + 單價 */}
                  <div style={{ gridColumn: "2", gridRow: "1" }}>
                    <p style={{
                      fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
                      fontSize: "0.9375rem", color: "#F0E9DF",
                      letterSpacing: "0.06em", margin: 0, marginBottom: "0.25rem",
                    }}>{item.product?.name ?? "商品"}</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--deer-gold)", margin: 0 }}>
                      NT$ {price.toLocaleString()}
                    </p>
                  </div>

                  {/* 小計 + 刪除 */}
                  <div style={{
                    gridColumn: "3", gridRow: "1",
                    display: "flex", flexDirection: "column",
                    alignItems: "flex-end", gap: "0.5rem",
                  }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem", color: "#F0E9DF",
                      margin: 0, whiteSpace: "nowrap",
                    }}>
                      NT$ {(price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem.mutate({ id: item.id })}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(240,233,223,0.3)",
                        padding: "4px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#e57373")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,233,223,0.3)")}
                      aria-label="移除商品"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* 數量控制 */}
                  <div style={{
                    gridColumn: "2 / 4", gridRow: "2",
                    display: "flex", alignItems: "center", gap: "0.75rem",
                  }}>
                    <button
                      onClick={() => handleQtyChange(item.id, item.quantity, -1)}
                      disabled={item.quantity <= 1}
                      style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        border: "1px solid rgba(197,151,109,0.3)",
                        background: "none", cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                        color: item.quantity <= 1 ? "rgba(197,151,109,0.2)" : "var(--deer-gold)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      <Minus size={10} />
                    </button>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.125rem", color: "#F0E9DF",
                      minWidth: "24px", textAlign: "center",
                    }}>{item.quantity}</span>
                    <button
                      onClick={() => handleQtyChange(item.id, item.quantity, 1)}
                      style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        border: "1px solid rgba(197,151,109,0.3)",
                        background: "none", cursor: "pointer",
                        color: "var(--deer-gold)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.15)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      }}
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary & Checkout */}
          <div style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(197,151,109,0.12)",
            borderRadius: "8px",
            padding: "2rem",
          }}>
            <h2 style={{
              fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
              fontSize: "1.125rem", color: "#F0E9DF",
              letterSpacing: "0.12em", marginBottom: "1.5rem",
            }}>訂單摘要</h2>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.5)" }}>小計</span>
              <span style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.7)" }}>NT$ {total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.5)" }}>運費</span>
              <span style={{ fontSize: "0.875rem", color: "var(--deer-gold)" }}>免費</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              borderTop: "1px solid rgba(197,151,109,0.2)",
              paddingTop: "1rem", marginBottom: "2rem",
            }}>
              <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, color: "#F0E9DF", letterSpacing: "0.08em" }}>總計</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.375rem", color: "var(--deer-gold)" }}>
                NT$ {total.toLocaleString()}
              </span>
            </div>

            {/* Checkout Form */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                fontSize: "0.65rem", letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "var(--deer-gold)", marginBottom: "1rem",
              }}>聯絡資訊</p>
              {[
                { placeholder: "姓名", key: "customerName", type: "text" },
                { placeholder: "Email", key: "customerEmail", type: "email" },
                { placeholder: "電話", key: "customerPhone", type: "tel" },
              ].map(({ placeholder, key, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={checkoutForm[key as keyof typeof checkoutForm]}
                  onChange={e => setCheckoutForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: "100%", display: "block",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(197,151,109,0.18)",
                    borderRadius: "4px",
                    padding: "0.75rem 1rem",
                    color: "#F0E9DF",
                    fontSize: "0.875rem",
                    letterSpacing: "0.04em",
                    marginBottom: "0.75rem",
                    outline: "none",
                    boxSizing: "border-box" as const,
                  }}
                />
              ))}
              <textarea
                placeholder="收件地址"
                value={checkoutForm.shippingAddress}
                onChange={e => setCheckoutForm(f => ({ ...f, shippingAddress: e.target.value }))}
                rows={2}
                style={{
                  width: "100%", display: "block",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(197,151,109,0.18)",
                  borderRadius: "4px",
                  padding: "0.75rem 1rem",
                  color: "#F0E9DF",
                  fontSize: "0.875rem",
                  letterSpacing: "0.04em",
                  marginBottom: "0.75rem",
                  outline: "none",
                  resize: "none" as const,
                  boxSizing: "border-box" as const,
                }}
              />
              <textarea
                placeholder="備註（選填）"
                value={checkoutForm.notes}
                onChange={e => setCheckoutForm(f => ({ ...f, notes: e.target.value }))}
                rows={2}
                style={{
                  width: "100%", display: "block",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(197,151,109,0.18)",
                  borderRadius: "4px",
                  padding: "0.75rem 1rem",
                  color: "#F0E9DF",
                  fontSize: "0.875rem",
                  letterSpacing: "0.04em",
                  marginBottom: "0",
                  outline: "none",
                  resize: "none" as const,
                  boxSizing: "border-box" as const,
                }}
              />
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: isCheckingOut ? "rgba(197,151,109,0.4)" : "var(--deer-gold)",
                color: "#1A1210",
                border: "none",
                borderRadius: "4px",
                cursor: isCheckingOut ? "not-allowed" : "pointer",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.875rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                fontWeight: 500,
                transition: "all 0.25s ease",
                marginBottom: "0.75rem",
              }}
              onMouseEnter={e => {
                if (!isCheckingOut) (e.currentTarget as HTMLElement).style.backgroundColor = "#d4a96a";
              }}
              onMouseLeave={e => {
                if (!isCheckingOut) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--deer-gold)";
              }}
            >
              {isCheckingOut ? "處理中..." : "確認結帳"}
            </button>
            <p style={{
              fontSize: "0.75rem", color: "rgba(240,233,223,0.3)",
              textAlign: "center" as const, lineHeight: 1.6,
            }}>
              點擊結帳後將跳轉至 Stripe 安全付款頁面，支援信用卡付款。
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .cart-grid-layout {
            grid-template-columns: 1fr 380px !important;
          }
        }
      `}</style>
    </div>
  );
}
