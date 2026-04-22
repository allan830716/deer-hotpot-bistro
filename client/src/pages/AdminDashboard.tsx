import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { ShoppingBag, Users, Package, TrendingUp, ChevronRight } from "lucide-react";

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
        <Link href="/admin/orders"><span className="admin-nav-link">訂單管理</span></Link>
        <Link href="/admin/members"><span className="admin-nav-link">會員資料</span></Link>
      </div>
      <Link href="/">
        <span className="admin-nav-link admin-nav-link-back">← 回官網</span>
      </Link>
    </nav>
  );
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const { data: stats } = trpc.admin.dashboard.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  if (loading) {
    return <div className="admin-loading">載入中...</div>;
  }

  if (!user) {
    return (
      <div className="admin-auth-gate">
        <h2>請先登入</h2>
        <button onClick={() => { window.location.href = getLoginUrl(); }} className="btn-deer-dark">
          登入
        </button>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="admin-auth-gate">
        <h2>權限不足</h2>
        <p>此頁面僅限管理員存取。</p>
        <Link href="/"><button className="btn-deer-outline">回首頁</button></Link>
      </div>
    );
  }

  const statCards = [
    { icon: ShoppingBag, label: "總訂單數", value: stats?.totalOrders ?? 0, color: "#C5976D" },
    { icon: TrendingUp, label: "總營收", value: `NT$ ${(stats?.totalRevenue ?? 0).toLocaleString()}`, color: "#8B6B4A" },
    { icon: Users, label: "會員人數", value: stats?.totalUsers ?? 0, color: "#6B4A32" },
    { icon: Package, label: "商品數量", value: stats?.totalProducts ?? 0, color: "#4A3020" },
  ];

  return (
    <div className="admin-page">
      <AdminNav />
      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-title">儀表板</h1>
          <p className="admin-subtitle">歡迎回來，{user.name ?? "管理員"}</p>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats-grid">
          {statCards.map((card, i) => (
            <div key={i} className="admin-stat-card">
              <div className="admin-stat-icon" style={{ backgroundColor: card.color + "20", color: card.color }}>
                <card.icon size={24} />
              </div>
              <div className="admin-stat-info">
                <p className="admin-stat-label">{card.label}</p>
                <p className="admin-stat-value">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="admin-quick-links">
          <h2 className="admin-section-title">快速操作</h2>
          <div className="admin-quick-grid">
            {[
              { href: "/admin/products", label: "管理商品", desc: "新增、編輯、下架商品" },
              { href: "/admin/orders", label: "查看訂單", desc: "處理與追蹤訂單狀態" },
              { href: "/admin/members", label: "會員資料", desc: "查看會員名單與資訊" },
              { href: "/shop", label: "前往商店", desc: "查看前台商品頁面" },
            ].map((link, i) => (
              <Link key={i} href={link.href}>
                <div className="admin-quick-card">
                  <div>
                    <p className="admin-quick-label">{link.label}</p>
                    <p className="admin-quick-desc">{link.desc}</p>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--deer-gold)" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
