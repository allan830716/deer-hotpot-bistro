import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

function AdminNav() {
  return (
    <nav className="admin-nav">
      <div className="admin-nav-brand">
        <span className="admin-nav-logo">初衷小鹿</span>
        <span className="admin-nav-sub">管理後台</span>
      </div>
      <div className="admin-nav-links">
        <Link href="/admin"><span className="admin-nav-link">儀表板</span></Link>
        <Link href="/admin/products"><span className="admin-nav-link">商品管理</span></Link>
        <Link href="/admin/orders"><span className="admin-nav-link active">訂單管理</span></Link>
        <Link href="/admin/members"><span className="admin-nav-link">會員資料</span></Link>
      </div>
      <Link href="/"><span className="admin-nav-link admin-nav-link-back">← 回官網</span></Link>
    </nav>
  );
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "待付款", color: "#C5976D" },
  paid: { label: "已付款", color: "#4CAF50" },
  processing: { label: "處理中", color: "#2196F3" },
  shipped: { label: "已出貨", color: "#9C27B0" },
  delivered: { label: "已送達", color: "#4CAF50" },
  cancelled: { label: "已取消", color: "#F44336" },
  refunded: { label: "已退款", color: "#FF9800" },
};

export default function AdminOrders() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const { data: orders, isLoading } = trpc.orders.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });
  const updateStatus = trpc.orders.updateStatus.useMutation({
    onSuccess: () => utils.orders.list.invalidate(),
  });

  if (loading) return <div className="admin-loading">載入中...</div>;
  if (!user) return (
    <div className="admin-auth-gate">
      <h2>請先登入</h2>
      <button onClick={() => { window.location.href = getLoginUrl(); }} className="btn-deer-dark">登入</button>
    </div>
  );
  if (user.role !== "admin") return (
    <div className="admin-auth-gate">
      <h2>權限不足</h2>
      <Link href="/"><button className="btn-deer-outline">回首頁</button></Link>
    </div>
  );

  return (
    <div className="admin-page">
      <AdminNav />
      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-title">訂單管理</h1>
        </div>

        {isLoading ? (
          <div className="admin-loading">載入訂單中...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>客戶</th>
                  <th>金額</th>
                  <th>狀態</th>
                  <th>建立時間</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map(order => {
                  const statusInfo = STATUS_MAP[order.status] ?? { label: order.status, color: "#888" };
                  return (
                    <tr key={order.id}>
                      <td className="admin-order-number">{order.orderNumber}</td>
                      <td>
                        <div>
                          <p style={{ fontWeight: 500 }}>{order.customerName ?? "—"}</p>
                          <p style={{ fontSize: "0.75rem", color: "var(--deer-sub)" }}>{order.customerEmail ?? ""}</p>
                        </div>
                      </td>
                      <td>NT$ {parseFloat(order.totalAmount).toLocaleString()}</td>
                      <td>
                        <span className="admin-order-status" style={{ color: statusInfo.color, borderColor: statusInfo.color }}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "var(--deer-sub)" }}>
                        {new Date(order.createdAt).toLocaleDateString("zh-TW")}
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={e => updateStatus.mutate({ id: order.id, status: e.target.value as any })}
                          className="admin-status-select"
                        >
                          {Object.entries(STATUS_MAP).map(([val, info]) => (
                            <option key={val} value={val}>{info.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {(!orders || orders.length === 0) && (
              <div className="admin-empty">尚無訂單記錄。</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
