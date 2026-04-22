import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Crown } from "lucide-react";

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
        <Link href="/admin/members"><span className="admin-nav-link active">會員資料</span></Link>
      </div>
      <Link href="/"><span className="admin-nav-link admin-nav-link-back">← 回官網</span></Link>
    </nav>
  );
}

export default function AdminMembers() {
  const { user, loading } = useAuth();
  const { data: members, isLoading } = trpc.admin.users.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
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
          <h1 className="admin-title">會員資料</h1>
          <p className="admin-subtitle">共 {members?.length ?? 0} 位會員</p>
        </div>

        {isLoading ? (
          <div className="admin-loading">載入會員中...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>Email</th>
                  <th>身份</th>
                  <th>登入方式</th>
                  <th>最後登入</th>
                  <th>加入時間</th>
                </tr>
              </thead>
              <tbody>
                {members?.map(member => (
                  <tr key={member.id}>
                    <td>
                      <div className="admin-member-name">
                        {member.role === "admin" && <Crown size={12} style={{ color: "var(--deer-gold)" }} />}
                        {member.name ?? "—"}
                      </div>
                    </td>
                    <td style={{ fontSize: "0.85rem" }}>{member.email ?? "—"}</td>
                    <td>
                      <span className={`admin-role-badge ${member.role}`}>
                        {member.role === "admin" ? "管理員" : "會員"}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--deer-sub)" }}>{member.loginMethod ?? "—"}</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--deer-sub)" }}>
                      {new Date(member.lastSignedIn).toLocaleDateString("zh-TW")}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--deer-sub)" }}>
                      {new Date(member.createdAt).toLocaleDateString("zh-TW")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!members || members.length === 0) && (
              <div className="admin-empty">尚無會員資料。</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
