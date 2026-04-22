import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star } from "lucide-react";

function AdminNav() {
  return (
    <nav className="admin-nav">
      <div className="admin-nav-brand">
        <span className="admin-nav-logo">初衷小鹿</span>
        <span className="admin-nav-sub">管理後台</span>
      </div>
      <div className="admin-nav-links">
        <Link href="/admin"><span className="admin-nav-link">儀表板</span></Link>
        <Link href="/admin/products"><span className="admin-nav-link active">商品管理</span></Link>
        <Link href="/admin/orders"><span className="admin-nav-link">訂單管理</span></Link>
        <Link href="/admin/members"><span className="admin-nav-link">會員資料</span></Link>
      </div>
      <Link href="/"><span className="admin-nav-link admin-nav-link-back">← 回官網</span></Link>
    </nav>
  );
}

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string;
  sortOrder: number;
  categoryId: number | undefined;
};

const emptyForm: ProductFormData = {
  name: "", description: "", price: "", originalPrice: "",
  imageUrl: "", stock: 99, isActive: true, isFeatured: false,
  tags: "", sortOrder: 0, categoryId: undefined,
};

export default function AdminProducts() {
  const { user, loading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);

  const utils = trpc.useUtils();
  const { data: products, isLoading } = trpc.products.list.useQuery({ activeOnly: false }, {
    enabled: !!user && user.role === "admin",
  });
  const { data: categories } = trpc.categories.list.useQuery();

  const createProduct = trpc.products.create.useMutation({
    onSuccess: () => { utils.products.list.invalidate(); setShowForm(false); setForm(emptyForm); },
  });
  const updateProduct = trpc.products.update.useMutation({
    onSuccess: () => { utils.products.list.invalidate(); setShowForm(false); setEditId(null); setForm(emptyForm); },
  });
  const deleteProduct = trpc.products.delete.useMutation({
    onSuccess: () => utils.products.list.invalidate(),
  });
  const toggleActive = trpc.products.update.useMutation({
    onSuccess: () => utils.products.list.invalidate(),
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

  const handleSubmit = () => {
    const data = {
      name: form.name,
      description: form.description || undefined,
      price: form.price,
      originalPrice: form.originalPrice || undefined,
      imageUrl: form.imageUrl || undefined,
      stock: form.stock,
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : undefined,
      sortOrder: form.sortOrder,
      categoryId: form.categoryId,
    };
    if (editId) {
      updateProduct.mutate({ id: editId, ...data });
    } else {
      createProduct.mutate(data);
    }
  };

  const handleEdit = (p: any) => {
    setEditId(p.id);
    setForm({
      name: p.name, description: p.description ?? "", price: p.price,
      originalPrice: p.originalPrice ?? "", imageUrl: p.imageUrl ?? "",
      stock: p.stock, isActive: p.isActive, isFeatured: p.isFeatured,
      tags: (p.tags ?? []).join(", "), sortOrder: p.sortOrder,
      categoryId: p.categoryId ?? undefined,
    });
    setShowForm(true);
  };

  return (
    <div className="admin-page">
      <AdminNav />
      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-title">商品管理</h1>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }} className="admin-add-btn">
            <Plus size={16} /> 新增商品
          </button>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <h2 className="admin-modal-title">{editId ? "編輯商品" : "新增商品"}</h2>
              <div className="admin-form-grid">
                <div className="admin-form-group admin-form-full">
                  <label>商品名稱 *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="admin-input" placeholder="商品名稱" />
                </div>
                <div className="admin-form-group admin-form-full">
                  <label>商品描述</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="admin-input admin-textarea" placeholder="商品描述" rows={3} />
                </div>
                <div className="admin-form-group">
                  <label>售價 (NT$) *</label>
                  <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="admin-input" placeholder="例：1980" type="number" />
                </div>
                <div className="admin-form-group">
                  <label>原價 (NT$)</label>
                  <input value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} className="admin-input" placeholder="例：2500" type="number" />
                </div>
                <div className="admin-form-group admin-form-full">
                  <label>圖片 URL</label>
                  <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} className="admin-input" placeholder="https://..." />
                </div>
                <div className="admin-form-group">
                  <label>庫存</label>
                  <input value={form.stock} onChange={e => setForm(f => ({ ...f, stock: parseInt(e.target.value) || 0 }))} className="admin-input" type="number" />
                </div>
                <div className="admin-form-group">
                  <label>排序</label>
                  <input value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} className="admin-input" type="number" />
                </div>
                <div className="admin-form-group">
                  <label>分類</label>
                  <select value={form.categoryId ?? ""} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value ? parseInt(e.target.value) : undefined }))} className="admin-input">
                    <option value="">無分類</option>
                    {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="admin-form-group admin-form-full">
                  <label>標籤（逗號分隔）</label>
                  <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="admin-input" placeholder="母親節, 套餐, 龍蝦" />
                </div>
                <div className="admin-form-group admin-form-full admin-form-checks">
                  <label className="admin-check-label">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                    上架中
                  </label>
                  <label className="admin-check-label">
                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} />
                    精選商品
                  </label>
                </div>
              </div>
              <div className="admin-modal-actions">
                <button onClick={() => setShowForm(false)} className="btn-deer-outline">取消</button>
                <button onClick={handleSubmit} disabled={!form.name || !form.price} className="btn-deer-dark">
                  {editId ? "儲存" : "新增"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        {isLoading ? (
          <div className="admin-loading">載入商品中...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>商品名稱</th>
                  <th>售價</th>
                  <th>庫存</th>
                  <th>狀態</th>
                  <th>精選</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {products?.map(p => (
                  <tr key={p.id} className={!p.isActive ? "admin-row-inactive" : ""}>
                    <td>
                      <div className="admin-product-cell">
                        {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="admin-product-thumb" />}
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td>NT$ {parseFloat(p.price).toLocaleString()}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button
                        onClick={() => toggleActive.mutate({ id: p.id, isActive: !p.isActive })}
                        className={`admin-status-btn ${p.isActive ? "active" : "inactive"}`}
                      >
                        {p.isActive ? <><Eye size={12} /> 上架</> : <><EyeOff size={12} /> 下架</>}
                      </button>
                    </td>
                    <td>
                      {p.isFeatured && <Star size={14} style={{ color: "var(--deer-gold)" }} />}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button onClick={() => handleEdit(p)} className="admin-action-btn edit"><Edit2 size={14} /></button>
                        <button onClick={() => { if (confirm("確定刪除此商品？")) deleteProduct.mutate({ id: p.id }); }} className="admin-action-btn delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!products || products.length === 0) && (
              <div className="admin-empty">尚無商品，點擊「新增商品」開始建立。</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
