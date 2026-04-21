/*
 * 初衷小鹿 — 菜單 Menu.tsx
 * 圖片輪播版：PDF 菜單轉圖片，支援分類切換與 Lightbox 放大
 */
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";

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

function LightboxViewer({ src, onClose }: { src: string; onClose: () => void }) {
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        backgroundColor: "rgba(0,0,0,0.95)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      <img
        src={src}
        alt="菜單"
        style={{
          maxWidth: "min(90vw, 700px)",
          maxHeight: "92vh",
          objectFit: "contain",
          boxShadow: "0 0 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "1.5rem", right: "2rem",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(240,233,223,0.7)", fontSize: "2rem", lineHeight: 1,
          zIndex: 100000,
        }}
      >✕</button>
    </div>,
    document.body
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? MENU_PAGES
    : MENU_PAGES.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setCurrentIndex(0);
  };

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  const current = filtered[Math.min(currentIndex, filtered.length - 1)];

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)", minHeight: "100vh" }}>
      {lightboxSrc && (
        <LightboxViewer src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "5rem 0 3rem" }}>
        <div className="container">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "1rem" }}>
            Menu
          </p>
          <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--deer-dark-text)", letterSpacing: "0.08em", marginBottom: "1rem" }}>
            菜單
          </h1>
          <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.5)", marginBottom: "1.5rem" }} />
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(240,233,223,0.45)", letterSpacing: "0.06em" }}>
            點擊圖片可放大查看 · 價格均加收一成服務費
          </p>
        </div>
      </section>

      {/* ── 分類標籤 ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", paddingBottom: "2rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  padding: "0.4rem 1rem",
                  border: activeCategory === cat.key
                    ? "1px solid rgba(197,151,109,0.8)"
                    : "1px solid rgba(197,151,109,0.2)",
                  backgroundColor: activeCategory === cat.key
                    ? "rgba(197,151,109,0.12)"
                    : "transparent",
                  color: activeCategory === cat.key
                    ? "var(--deer-gold)"
                    : "rgba(240,233,223,0.4)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
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
              style={{
                flexShrink: 0,
                width: "44px", height: "44px",
                border: "1px solid rgba(197,151,109,0.3)",
                backgroundColor: "transparent",
                color: "rgba(197,151,109,0.7)",
                cursor: filtered.length <= 1 ? "default" : "pointer",
                fontSize: "1.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                opacity: filtered.length <= 1 ? 0.3 : 1,
              }}
            >
              ‹
            </button>

            {/* 圖片主體 */}
            {current && (
              <div
                style={{
                  flex: 1,
                  maxWidth: "640px",
                  cursor: "zoom-in",
                  position: "relative" as const,
                }}
                onClick={() => setLightboxSrc(current.src)}
              >
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.label}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                  }}
                />
                <div style={{
                  position: "absolute" as const, bottom: "1rem", right: "1rem",
                  backgroundColor: "rgba(26,18,16,0.75)",
                  border: "1px solid rgba(197,151,109,0.3)",
                  padding: "0.3rem 0.7rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  color: "rgba(197,151,109,0.8)",
                  pointerEvents: "none" as const,
                }}>
                  ZOOM
                </div>
              </div>
            )}

            {/* 下一頁 */}
            <button
              onClick={next}
              disabled={filtered.length <= 1}
              style={{
                flexShrink: 0,
                width: "44px", height: "44px",
                border: "1px solid rgba(197,151,109,0.3)",
                backgroundColor: "transparent",
                color: "rgba(197,151,109,0.7)",
                cursor: filtered.length <= 1 ? "default" : "pointer",
                fontSize: "1.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                opacity: filtered.length <= 1 ? 0.3 : 1,
              }}
            >
              ›
            </button>
          </div>

          {/* 頁碼與縮圖 */}
          {current && (
            <div style={{ textAlign: "center" as const, marginTop: "1.5rem" }}>
              <p style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 300,
                fontSize: "0.8125rem",
                color: "rgba(240,233,223,0.4)",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}>
                {current.label} &nbsp;·&nbsp; {currentIndex + 1} / {filtered.length}
              </p>

              {/* 縮圖列 */}
              <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" as const }}>
                {filtered.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      width: "36px", height: "36px",
                      padding: 0,
                      border: i === currentIndex
                        ? "1px solid rgba(197,151,109,0.8)"
                        : "1px solid rgba(197,151,109,0.15)",
                      cursor: "pointer",
                      overflow: "hidden",
                      opacity: i === currentIndex ? 1 : 0.45,
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                      backgroundColor: "transparent",
                    }}
                  >
                    <img
                      src={page.src}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" as const, display: "block" }}
                    />
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
          <p style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 300,
            fontSize: "0.8125rem",
            color: "rgba(240,233,223,0.3)",
            lineHeight: 2,
            letterSpacing: "0.04em",
          }}>
            本餐廳僅提供 NATURA 微礦水或微礦氣泡水。每份套餐均含一份前菜、綜合菜盤、副餐及甜點。
            低消一人為 600 元（以單人獨立計算），以上價格均加收一成服務費。
            部分餐點可能會因供貨短缺及品質等因素而無法正常供應。
            本餐廳禁止飲用烈酒，自備酒水酌收開瓶費葡萄酒每瓶 200 元。
          </p>
        </div>
      </section>
    </main>
  );
}
