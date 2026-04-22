/*
 * 初衷小鹿 — 菜單 Menu.tsx
 * 升級版：支援手機拖動切換、下拉分類選單、滑動動畫、放大鏡圖示
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
        style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", cursor: "pointer", color: "rgba(240,233,223,0.5)", fontSize: "1.5rem", lineHeight: 1, zIndex: 100000, transition: "color 0.2s ease", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em" }}
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
        <ChevronDown
          size={14}
          style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown panel */}
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

/* ── 主元件 ────────────────────────────────────────────────────────────── */
export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  // slide direction: "left" = next, "right" = prev
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Touch/drag state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const filtered = activeCategory === "all"
    ? MENU_PAGES
    : MENU_PAGES.filter((p) => p.category === activeCategory);

  const safeIndex = Math.min(currentIndex, filtered.length - 1);

  const goTo = useCallback((newIndex: number, dir: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDir(dir);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setSlideDir(null);
      setIsAnimating(false);
    }, 320);
  }, [isAnimating]);

  const prev = useCallback(() => {
    const newIndex = (safeIndex - 1 + filtered.length) % filtered.length;
    goTo(newIndex, "right");
  }, [safeIndex, filtered.length, goTo]);

  const next = useCallback(() => {
    const newIndex = (safeIndex + 1) % filtered.length;
    goTo(newIndex, "left");
  }, [safeIndex, filtered.length, goTo]);

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setCurrentIndex(0);
    setSlideDir(null);
    setIsAnimating(false);
  };

  /* ── 鍵盤方向鍵 ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxSrc) { if (e.key === "Escape") setLightboxSrc(null); return; }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, lightboxSrc]);

  /* ── Touch / Drag 手勢 ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // Only mark as horizontal drag if horizontal movement dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (isDragging.current && Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  // Mouse drag (desktop)
  const mouseStartX = useRef<number | null>(null);
  const isMouseDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isMouseDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    if (Math.abs(e.clientX - mouseStartX.current) > 8) isMouseDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    if (isMouseDragging.current && Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    mouseStartX.current = null;
    isMouseDragging.current = false;
  };

  const current = filtered[safeIndex];

  /* ── Slide animation CSS ── */
  const slideStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: "640px",
    cursor: "grab",
    position: "relative",
    userSelect: "none",
    overflow: "hidden",
  };

  const imgWrapStyle: React.CSSProperties = {
    width: "100%",
    animation: slideDir === "left"
      ? "slideInFromRight 0.32s cubic-bezier(0.4,0,0.2,1) forwards"
      : slideDir === "right"
      ? "slideInFromLeft 0.32s cubic-bezier(0.4,0,0.2,1) forwards"
      : "none",
  };

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)", minHeight: "100vh" }}>
      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(60px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-60px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes categoryFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
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

      {/* ── 下拉分類選單 ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", paddingBottom: "2rem" }}>
        <div className="container">
          <CategoryDropdown activeCategory={activeCategory} onChange={handleCategoryChange} />
        </div>
      </section>

      {/* ── 輪播主體 ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>

            {/* 上一頁 */}
            <button
              onClick={prev}
              disabled={filtered.length <= 1}
              aria-label="上一頁"
              style={{
                flexShrink: 0, width: "44px", height: "44px",
                border: "1px solid rgba(197,151,109,0.3)",
                backgroundColor: "transparent",
                color: "rgba(197,151,109,0.7)",
                cursor: filtered.length <= 1 ? "default" : "pointer",
                fontSize: "1.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                opacity: filtered.length <= 1 ? 0.3 : 1,
              }}
              onMouseEnter={(e) => { if (filtered.length > 1) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              ‹
            </button>

            {/* 圖片主體 — 支援觸控拖動 */}
            {current && (
              <div
                style={slideStyle}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => { mouseStartX.current = null; isMouseDragging.current = false; }}
              >
                <div style={imgWrapStyle}>
                  <img
                    key={current.src}
                    src={current.src}
                    alt={current.label}
                    style={{
                      width: "100%", height: "auto", display: "block",
                      boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                  />
                </div>

                {/* 放大鏡圖示（右下角） */}
                <button
                  onClick={() => { if (!isMouseDragging.current) setLightboxSrc(current.src); }}
                  style={{
                    position: "absolute", bottom: "0.75rem", right: "0.75rem",
                    width: "32px", height: "32px",
                    backgroundColor: "rgba(26,18,16,0.75)",
                    border: "1px solid rgba(197,151,109,0.3)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "zoom-in",
                    transition: "all 0.2s ease",
                    color: "rgba(197,151,109,0.8)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.2)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.7)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(26,18,16,0.75)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.3)"; }}
                  aria-label="放大查看"
                >
                  <Search size={13} />
                </button>
              </div>
            )}

            {/* 下一頁 */}
            <button
              onClick={next}
              disabled={filtered.length <= 1}
              aria-label="下一頁"
              style={{
                flexShrink: 0, width: "44px", height: "44px",
                border: "1px solid rgba(197,151,109,0.3)",
                backgroundColor: "transparent",
                color: "rgba(197,151,109,0.7)",
                cursor: filtered.length <= 1 ? "default" : "pointer",
                fontSize: "1.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                opacity: filtered.length <= 1 ? 0.3 : 1,
              }}
              onMouseEnter={(e) => { if (filtered.length > 1) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              ›
            </button>
          </div>

          {/* 頁碼與縮圖 */}
          {current && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", letterSpacing: "0.08em", marginBottom: "1rem" }}>
                {current.label} &nbsp;·&nbsp; {safeIndex + 1} / {filtered.length}
              </p>

              {/* 縮圖列 */}
              <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
                {filtered.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const dir = i > safeIndex ? "left" : "right";
                      goTo(i, dir);
                    }}
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
