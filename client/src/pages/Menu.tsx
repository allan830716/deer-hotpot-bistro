/*
 * 初衷小鹿 — 菜單 Menu.tsx
 * v3：真實跟隨手指滑動、滑動時鎖定頁面滾動、分類切換 fade 動畫
 */
import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, ChevronDown } from "lucide-react";

const MENU_PAGES = [
  { src: "/manus-storage/menu-01_b93902b3.png", category: "intro",   label: "品牌理念" },
  { src: "/manus-storage/menu-02_14251abf.png", category: "surf",    label: "海陸套餐" },
  { src: "/manus-storage/menu-03_4120619c.png", category: "surf",    label: "海陸套餐" },
  { src: "/manus-storage/menu-04_9375e636.png", category: "beef",    label: "牛肉套餐" },
  { src: "/manus-storage/menu-05_89d4ef5b.png", category: "beef",    label: "牛肉套餐" },
  { src: "/manus-storage/menu-06_2e47c5c8.png", category: "pork",    label: "豬肉套餐" },
  { src: "/manus-storage/menu-07_6497a72d.png", category: "pork",    label: "豬肉套餐" },
  { src: "/manus-storage/menu-08_fb439fd7.png", category: "chicken", label: "雞肉 / 蔬食" },
  { src: "/manus-storage/menu-09_0b37a90a.png", category: "lamb",    label: "羊肉套餐" },
  { src: "/manus-storage/menu-10_a5cb0d0d.png", category: "seafood", label: "海鮮套餐" },
  { src: "/manus-storage/menu-11_a781fa3f.png", category: "sides",   label: "美味關係" },
  { src: "/manus-storage/menu-12_3206377d.png", category: "sides",   label: "手工漿 / 餃" },
  { src: "/manus-storage/menu-13_362300fa.png", category: "sides",   label: "雲吞 / 丸類" },
  { src: "/manus-storage/menu-14_d346d1dd.png", category: "sides",   label: "海鮮單點" },
  { src: "/manus-storage/menu-15_1181a977.png", category: "sides",   label: "魚類單點" },
  { src: "/manus-storage/menu-16_db54608f.png", category: "sides",   label: "蔬菜副餐" },
  { src: "/manus-storage/menu-17_1c0e3a01.png", category: "lunch",   label: "商業午餐" },
  { src: "/manus-storage/menu-18_01a3f7e2.png", category: "lunch",   label: "午餐牛肉" },
  { src: "/manus-storage/menu-19_3f2003c8.png", category: "lunch",   label: "午餐豬肉" },
  { src: "/manus-storage/menu-20_0c245cb0.png", category: "lunch",   label: "午餐羊 / 海鮮" },
  { src: "/manus-storage/menu-21_34e7b7f3.png", category: "lunch",   label: "午餐附餐甜點" },
  { src: "/manus-storage/menu-22_aebcd897.png", category: "quote",   label: "品牌語句" },
  { src: "/manus-storage/menu-23_55e5158c.png", category: "drinks",  label: "飲品" },
  { src: "/manus-storage/menu-24_59cd65b6.png", category: "drinks",  label: "飲品" },
  { src: "/manus-storage/menu-25_573ad6e1.png", category: "drinks",  label: "紅酒" },
  { src: "/manus-storage/menu-26_15343df0.png", category: "drinks",  label: "紅酒" },
  { src: "/manus-storage/menu-27_cf8a114d.png", category: "drinks",  label: "白酒" },
  { src: "/manus-storage/menu-28_b938af18.png", category: "drinks",  label: "白酒" },
  { src: "/manus-storage/menu-29_28a8f7d3.png", category: "drinks",  label: "氣泡酒" },
  { src: "/manus-storage/menu-30_fcc4dd16.png", category: "drinks",  label: "啤酒" },
  { src: "/manus-storage/menu-31_1aaca962.png", category: "drinks",  label: "啤酒" },
  { src: "/manus-storage/menu-32_353a9d59.png", category: "drinks",  label: "飲料" },
  { src: "/manus-storage/menu-33_92682d10.png", category: "drinks",  label: "飲料" },
];

const CATEGORIES = [
  { key: "all",     label: "全部菜單" },
  { key: "surf",    label: "海陸套餐" },
  { key: "beef",    label: "牛肉套餐" },
  { key: "pork",    label: "豬肉套餐" },
  { key: "lamb",    label: "羊肉套餐" },
  { key: "seafood", label: "海鮮套餐" },
  { key: "chicken", label: "雞肉 / 蔬食" },
  { key: "sides",   label: "單點配料" },
  { key: "lunch",   label: "商業午餐" },
  { key: "drinks",  label: "酒水飲品" },
];

// 酒水單子分類（對應 MENU_PAGES 中 category=drinks 的 label）
const DRINK_SUBCATEGORIES = [
  { key: "all",    label: "全部酒水" },
  { key: "飲品",  label: "飲品" },
  { key: "紅酒",  label: "紅酒" },
  { key: "白酒",  label: "白酒" },
  { key: "氣泡酒", label: "氣泡酒" },
  { key: "啤酒",  label: "啤酒" },
  { key: "飲料",  label: "飲料" },
];

/* ── Lightbox ──────────────────────────────────────────────────────────── */
function LightboxViewer({ src, onClose }: { src: string; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        backgroundColor: "rgba(10,8,7,0.97)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "zoom-out",
        animation: "lbFadeIn 0.25s ease forwards",
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbImgIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes spinnerRing { to { transform: rotate(360deg); } }
      `}</style>
      {!loaded && (
        <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ width: "40px", height: "40px", border: "1px solid rgba(197,151,109,0.15)", borderTop: "1px solid rgba(197,151,109,0.7)", borderRadius: "50%", animation: "spinnerRing 1.2s linear infinite" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,151,109,0.45)" }}>Loading</p>
        </div>
      )}
      <img
        src={src}
        alt="菜單"
        onLoad={() => setLoaded(true)}
        style={{ maxWidth: "min(90vw, 700px)", maxHeight: "92vh", objectFit: "contain", boxShadow: "0 0 80px rgba(0,0,0,0.7)", opacity: loaded ? 1 : 0, animation: loaded ? "lbImgIn 0.35s ease forwards" : "none" }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", cursor: "pointer", color: "rgba(240,233,223,0.5)", fontSize: "1.5rem", lineHeight: 1, zIndex: 100000, transition: "color 0.2s ease", fontFamily: "'Cormorant Garamond', serif" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(197,151,109,0.9)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,233,223,0.5)"; }}
      >✕</button>
      {loaded && (
        <p style={{ position: "absolute", bottom: "1.5rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(197,151,109,0.3)", pointerEvents: "none" }}>
          CLICK ANYWHERE TO CLOSE
        </p>
      )}
    </div>,
    document.body
  );
}

/* ── 下拉分類選單 ──────────────────────────────────────────────────────── */
function CategoryDropdown({ activeCategory, onChange }: { activeCategory: string; onChange: (key: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeLabel = CATEGORIES.find(c => c.key === activeCategory)?.label ?? "全部菜單";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
          fontSize: "0.8125rem", letterSpacing: "0.1em",
          padding: "0.55rem 1.25rem",
          border: "1px solid rgba(197,151,109,0.5)",
          backgroundColor: "rgba(197,151,109,0.08)",
          color: "var(--deer-gold)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          minWidth: "160px", justifyContent: "space-between",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.15)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.08)"; }}
      >
        <span>{activeLabel}</span>
        <ChevronDown size={14} style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      <div style={{
        position: "absolute", top: "calc(100% + 4px)", left: 0,
        minWidth: "160px", zIndex: 100,
        backgroundColor: "rgba(18,12,10,0.98)",
        border: "1px solid rgba(197,151,109,0.2)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        overflow: "hidden",
        maxHeight: open ? "400px" : "0px",
        opacity: open ? 1 : 0,
        transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
        pointerEvents: open ? "auto" : "none",
      }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => { onChange(cat.key); setOpen(false); }}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "0.65rem 1.25rem",
              fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
              fontSize: "0.8rem", letterSpacing: "0.08em",
              color: activeCategory === cat.key ? "var(--deer-gold)" : "rgba(240,233,223,0.55)",
              backgroundColor: activeCategory === cat.key ? "rgba(197,151,109,0.1)" : "transparent",
              border: "none", cursor: "pointer",
              borderBottom: "1px solid rgba(197,151,109,0.06)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--deer-gold)"; }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = activeCategory === cat.key ? "rgba(197,151,109,0.1)" : "transparent";
              (e.currentTarget as HTMLElement).style.color = activeCategory === cat.key ? "var(--deer-gold)" : "rgba(240,233,223,0.55)";
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 酒水单子分類下拉選單 ─────────────────────────────────────────────────────────── */
function DrinkDropdown({ activeDrink, onChange }: { activeDrink: string; onChange: (key: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeLabel = DRINK_SUBCATEGORIES.find(c => c.key === activeDrink)?.label ?? "全部酒水";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
          fontSize: "0.8125rem", letterSpacing: "0.1em",
          padding: "0.55rem 1.25rem",
          border: "1px solid rgba(197,151,109,0.5)",
          backgroundColor: "rgba(197,151,109,0.08)",
          color: "var(--deer-gold)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          minWidth: "140px", justifyContent: "space-between",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.15)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.08)"; }}
      >
        <span>{activeLabel}</span>
        <ChevronDown size={14} style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      <div style={{
        position: "absolute", top: "calc(100% + 4px)", left: 0,
        minWidth: "140px", zIndex: 100,
        backgroundColor: "rgba(18,12,10,0.98)",
        border: "1px solid rgba(197,151,109,0.2)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        overflow: "hidden",
        maxHeight: open ? "400px" : "0px",
        opacity: open ? 1 : 0,
        transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
        pointerEvents: open ? "auto" : "none",
      }}>
        {DRINK_SUBCATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => { onChange(cat.key); setOpen(false); }}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "0.65rem 1.25rem",
              fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
              fontSize: "0.8rem", letterSpacing: "0.08em",
              color: activeDrink === cat.key ? "var(--deer-gold)" : "rgba(240,233,223,0.55)",
              backgroundColor: activeDrink === cat.key ? "rgba(197,151,109,0.1)" : "transparent",
              border: "none", cursor: "pointer",
              borderBottom: "1px solid rgba(197,151,109,0.06)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--deer-gold)"; }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = activeDrink === cat.key ? "rgba(197,151,109,0.1)" : "transparent";
              (e.currentTarget as HTMLElement).style.color = activeDrink === cat.key ? "var(--deer-gold)" : "rgba(240,233,223,0.55)";
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 主元件 ──────────────────────────────────────────────────────────────────── */
export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDrink, setActiveDrink] = useState("all"); // 酒水单子分類
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  // 輪播 track 拖動偏移（像素）
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [categoryKey, setCategoryKey] = useState(0);

  // 觸控/滑鼠狀態
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontal = useRef<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDragging = useRef(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // 監聴容器寬度
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // 分類筛選：先用 activeCategory，再用 activeDrink 子分類
  const filtered = (() => {
    let pages = activeCategory === "all" ? MENU_PAGES : MENU_PAGES.filter((p) => p.category === activeCategory);
    // 如果目前分類包含 drinks，再用酒水子分類筛選
    if (activeDrink !== "all") {
      pages = pages.filter((p) => p.category === "drinks" && p.label === activeDrink);
    }
    return pages; // 無結果時回傳空陣列，由 UI 顯示空狀態
  })();

  const safeIndex = Math.min(currentIndex, filtered.length - 1);

  // 直接跳到指定索引（無動畫延遲，CSS transition 負責滑動感）
  const goTo = useCallback((newIndex: number) => {
    setCurrentIndex(Math.max(0, Math.min(newIndex, filtered.length - 1)));
    setDragDelta(0);
  }, [filtered.length]);

  const prev = useCallback(() => {
    goTo((safeIndex - 1 + filtered.length) % filtered.length);
  }, [safeIndex, filtered.length, goTo]);

  const next = useCallback(() => {
    goTo((safeIndex + 1) % filtered.length);
  }, [safeIndex, filtered.length, goTo]);

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setActiveDrink("all"); // 切換主分類時重置酒水子分類
    setCurrentIndex(0);
    setDragDelta(0);
    setIsDragging(false);
    setCategoryKey(k => k + 1);
  };

  const handleDrinkChange = (key: string) => {
    setActiveDrink(key);
    // 選擇酒水子分類時，自動切換主分類為 drinks（除非選全部）
    if (key !== "all") {
      setActiveCategory("drinks");
    }
    setCurrentIndex(0);
    setDragDelta(0);
    setIsDragging(false);
    setCategoryKey(k => k + 1);
  };

  // 鍵盤方向鍵
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxSrc) { if (e.key === "Escape") setLightboxSrc(null); return; }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, lightboxSrc]);

  // ── 觸控手勢 ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontal.current = null;
    setDragDelta(0);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (isHorizontal.current === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy);
      }
    }
    if (isHorizontal.current === true) {
      e.preventDefault();
      setIsDragging(true);
      setDragDelta(dx);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (isHorizontal.current === true && Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    } else {
      setDragDelta(0);
    }
    setIsDragging(false);
    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontal.current = null;
  };

  // ── 滑鼠拖動 ──
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isMouseDragging.current = false;
    setDragDelta(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    if (Math.abs(dx) > 8) {
      isMouseDragging.current = true;
      setIsDragging(true);
      setDragDelta(dx);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    if (isMouseDragging.current && Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    } else {
      setDragDelta(0);
    }
    setIsDragging(false);
    mouseStartX.current = null;
    isMouseDragging.current = false;
  };

  const current = filtered[safeIndex];

  // Track 偏移：用實際 px 寬度計算
  // track 寬度 = filtered.length * containerWidth
  // 每張圖片占 containerWidth px
  // 所以偏移 = -(safeIndex * containerWidth) + dragDelta
  const offsetPx = containerWidth > 0
    ? -(safeIndex * containerWidth) + dragDelta
    : 0;
  const trackTranslate = `translateX(${offsetPx}px)`;

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)", minHeight: "100vh" }}>
      <style>{`
        @keyframes categoryFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .menu-img-wrap {
          touch-action: pan-y;
        }
      `}</style>

      {lightboxSrc && (
        <LightboxViewer src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "5rem 0 3rem" }}>
        <div className="container">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.7)", marginBottom: "1rem" }}>
            Menu
          </p>
          <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--deer-dark-text)", letterSpacing: "0.08em", marginBottom: "1rem" }}>
            菜單
          </h1>
          <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.5)", marginBottom: "1.5rem" }} />
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(240,233,223,0.45)", letterSpacing: "0.06em" }}>
            點擊圖片可放大查看 · 左右滑動或使用 ← → 方向鍵翻頁 · 價格均加收一成服務費
          </p>
        </div>
      </section>

      {/* ── 下拉分類選單（主分類 + 酒水子分類） ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", paddingBottom: "2rem" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <CategoryDropdown activeCategory={activeCategory} onChange={handleCategoryChange} />
            <DrinkDropdown activeDrink={activeDrink} onChange={handleDrinkChange} />
          </div>
        </div>
      </section>

      {/* ── 輪播主體 ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "center" }}>

            {/* 圖片主體（包裹左右按鈕） */}
            {current && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "640px",
                }}
              >
                {/* 輪播圖片區域（左右按鈕在此容器內，top:50% 相對於圖片高度） */}
              <div
                ref={containerRef}
                className="menu-img-wrap"
                style={{
                  width: "100%",
                  cursor: isMouseDragging.current ? "grabbing" : "grab",
                  position: "relative",
                  userSelect: "none",
                  overflow: "hidden",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => {
                  if (mouseStartX.current !== null) {
                    setDragDelta(0);
                    setIsDragging(false);
                    mouseStartX.current = null;
                    isMouseDragging.current = false;
                  }
                }}
              >
                {/* 輪播 track — 所有圖片並排在同一行，用 translateX 滑動 */}
                <div
                  key={categoryKey}
                  style={{
                    display: "flex",
                    width: `${filtered.length * 100}%`,
                    transform: trackTranslate,
                    transition: isDragging ? "none" : "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    // trackTranslate 現在是 translateX(px)，跟圖片寬度正確對應
                    willChange: "transform",
                    animation: categoryKey > 0 ? "categoryFadeIn 0.55s ease forwards" : "none",
                  }}
                >
                  {filtered.map((page, i) => (
                    <div
                      key={i}
                      style={{ width: `${100 / filtered.length}%`, flexShrink: 0 }}
                    >
                      <img
                        src={page.src}
                        alt={page.label}
                        style={{
                          width: "100%", height: "auto", display: "block",
                          boxShadow: i === safeIndex ? "0 8px 48px rgba(0,0,0,0.5)" : "none",
                          pointerEvents: "auto",
                          cursor: "zoom-in",
                        }}
                        onClick={() => { if (!isMouseDragging.current) setLightboxSrc(page.src); }}
                        draggable={false}
                        loading={Math.abs(i - safeIndex) <= 1 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>

                {/* 上一頁按鈕（圖片左側置中） */}
                <button
                  onClick={prev}
                  disabled={filtered.length <= 1}
                  aria-label="上一頁"
                  style={{
                    position: "absolute", left: "0.75rem", top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 20,
                    width: "44px", height: "44px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(30,20,15,0.72)",
                    color: "#fff",
                    cursor: filtered.length <= 1 ? "default" : "pointer",
                    fontSize: "1.6rem",
                    lineHeight: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background-color 0.2s ease",
                    opacity: filtered.length <= 1 ? 0.3 : 1,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.45)",
                  }}
                  onMouseEnter={(e) => { if (filtered.length > 1) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.85)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(30,20,15,0.72)"; }}
                >
                  ‹
                </button>

                {/* 下一頁按鈕（圖片右側置中） */}
                <button
                  onClick={next}
                  disabled={filtered.length <= 1}
                  aria-label="下一張"
                  style={{
                    position: "absolute", right: "0.75rem", top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 20,
                    width: "44px", height: "44px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(30,20,15,0.72)",
                    color: "#fff",
                    cursor: filtered.length <= 1 ? "default" : "pointer",
                    fontSize: "1.6rem",
                    lineHeight: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background-color 0.2s ease",
                    opacity: filtered.length <= 1 ? 0.3 : 1,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.45)",
                  }}
                  onMouseEnter={(e) => { if (filtered.length > 1) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.85)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(30,20,15,0.72)"; }}
                >
                  ›
                </button>
              </div>
              </div>
            )}


          </div>

          {/* 頁碼與白色點點導覽 */}
          {current && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
                {current.label} &nbsp;·&nbsp; {safeIndex + 1} / {filtered.length}
              </p>

              {/* 點點導覽 */}
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", alignItems: "center", marginBottom: "1.5rem" }}>
                {filtered.length <= 15 ? (
                  filtered.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`第 ${i + 1} 頁`}
                      style={{
                        width: i === safeIndex ? "20px" : "7px",
                        height: "7px",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        backgroundColor: i === safeIndex ? "rgba(197,151,109,0.9)" : "rgba(255,255,255,0.3)",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}
                    />
                  ))
                ) : (
                  [-2, -1, 0, 1, 2].map((offset) => {
                    const idx = safeIndex + offset;
                    if (idx < 0 || idx >= filtered.length) return <span key={offset} style={{ width: "7px" }} />;
                    return (
                      <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        style={{
                          width: offset === 0 ? "20px" : "7px",
                          height: "7px",
                          borderRadius: "4px",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          backgroundColor: offset === 0 ? "rgba(197,151,109,0.9)" : "rgba(255,255,255,0.3)",
                          transition: "all 0.3s ease",
                          flexShrink: 0,
                        }}
                      />
                    );
                  })
                )}
              </div>

              {/* 縮圖列 */}
              <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
                {filtered.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`第 ${i + 1} 頁`}
                    style={{
                      width: "36px", height: "36px", padding: 0,
                      border: i === safeIndex ? "1px solid rgba(197,151,109,0.8)" : "1px solid rgba(197,151,109,0.15)",
                      cursor: "pointer", overflow: "hidden",
                      opacity: i === safeIndex ? 1 : 0.45,
                      transition: "all 0.2s ease", flexShrink: 0,
                      backgroundColor: "transparent",
                    }}
                  >
                    <img src={page.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 備注 ── */}
      <section style={{ backgroundColor: "rgba(26,18,16,0.6)", borderTop: "1px solid rgba(197,151,109,0.08)", padding: "3rem 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.3)", lineHeight: 2, letterSpacing: "0.04em" }}>
            本餐廳僅提供 NATURA 微礦水或微礦氣泡水。每份套餐均含一份前菜、綜合菜盤、副餐及甜點。
            低消一人為 600 元（以單人獨立計算），以上價格均加收一成服務費。
            部分餐點可能會因供貨短缺及品質等因素而無法正常供應。
            本餐廳禁止飲用烈酒，自備酒水酌收開瓶費葡萄酒每瓶 500 元。
          </p>
        </div>
      </section>
    </main>
  );
}
