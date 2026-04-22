import { Link, useSearch } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle } from "lucide-react";

export default function ShopSuccess() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const stripeSessionId = params.get("session_id");

  const { data } = trpc.checkout.verifySession.useQuery(
    { stripeSessionId: stripeSessionId! },
    { enabled: !!stripeSessionId }
  );

  return (
    <div className="cart-page">
      <div className="order-success">
        <CheckCircle size={64} style={{ color: "var(--deer-gold)", marginBottom: "1.5rem" }} />
        <h2 className="order-success-title">感謝您的訂購</h2>
        {data?.customerEmail && (
          <p className="order-success-note">確認信已發送至 {data.customerEmail}</p>
        )}
        <p className="order-success-note">我們將盡快處理您的訂單，並與您聯繫確認配送資訊。</p>
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
