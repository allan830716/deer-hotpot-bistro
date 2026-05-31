/**
 * Menu.tsx v5 — i18n
 * ─────────────────────────────────────────────────────────────
 * 分類選單：點擊後直接跳到該分類的第一張圖（不篩選，全部菜單保持完整）
 * 酒水子分類：只在主分類為「酒水飲品」時顯示，點擊後跳到對應第一張
 * 主圖輪播：移除 categoryKey 重新 mount 機制，改為直接更新 currentIndex
 * 語言切換：所有文字透過 useLanguage() 的 t() 動態翻譯
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── 菜單圖片清單（完整，不篩選）——labelKey 固定供 t() 翻譯 ──────────── */
const MENU_PAGES = [
  { src: "/manus-storage/page-01_bef4323d.png", category: "intro",   labelKey: "menu.label.intro" },
  { src: "/manus-storage/page-02_a9de4819.png", category: "surf",    labelKey: "menu.label.surf" },
  { src: "/manus-storage/page-03_74b58762.png", category: "surf",    labelKey: "menu.label.surf" },
  { src: "/manus-storage/page-04_6e06670a.png", category: "beef",    labelKey: "menu.label.beef" },
  { src: "/manus-storage/page-05_772abf8d.png", category: "beef",    labelKey: "menu.label.beef" },
  { src: "/manus-storage/page-06_d02f8bb1.png", category: "pork",    labelKey: "menu.label.pork" },
  { src: "/manus-storage/page-07_8b77586f.png", category: "pork",    labelKey: "menu.label.pork" },
  { src: "/manus-storage/page-08_3695aaea.png", category: "chicken", labelKey: "menu.label.chicken" },
  { src: "/manus-storage/page-09_e69ca65d.png", category: "lamb",    labelKey: "menu.label.lamb" },
  { src: "/manus-storage/page-10_13f273e1.png", category: "seafood", labelKey: "menu.label.seafood" },
  { src: "/manus-storage/page-11_697f8090.png", category: "sides",   labelKey: "menu.label.sides1" },
  { src: "/manus-storage/page-12_41a2a990.png", category: "sides",   labelKey: "menu.label.sides2" },
  { src: "/manus-storage/page-13_62ae10ea.png", category: "sides",   labelKey: "menu.label.sides3" },
  { src: "/manus-storage/page-14_47575a67.png", category: "sides",   labelKey: "menu.label.sides4" },
  { src: "/manus-storage/page-15_486fa73e.png", category: "sides",   labelKey: "menu.label.sides5" },
  { src: "/manus-storage/page-16_1505e770.png", category: "sides",   labelKey: "menu.label.sides6" },
  { src: "/manus-storage/page-17_19d0c08d.png", category: "lunch",   labelKey: "menu.label.lunch1" },
  { src: "/manus-storage/page-18_b35f2783.png", category: "lunch",   labelKey: "menu.label.lunch2" },
  { src: "/manus-storage/page-19_1f896c81.png", category: "lunch",   labelKey: "menu.label.lunch3" },
  { src: "/manus-storage/page-20_a1a42445.png", category: "lunch",   labelKey: "menu.label.lunch4" },
  { src: "/manus-storage/page-21_2a6fa9ed.png", category: "lunch",   labelKey: "menu.label.lunch5" },
  { src: "/manus-storage/page-22_a42bc05e.png", category: "quote",   labelKey: "menu.label.quote" },
  { src: "/manus-storage/page-23_0ae97577.png", category: "drinks",  labelKey: "menu.drink.glass" },
  { src: "/manus-storage/page-24_06676fb8.png", category: "drinks",  labelKey: "menu.drink.glass" },
  { src: "/manus-storage/page-25_37e1d0db.png", category: "drinks",  labelKey: "menu.drink.red" },
  { src: "/manus-storage/page-26_5b15c01a.png", category: "drinks",  labelKey: "menu.drink.red" },
  { src: "/manus-storage/page-27_c7eccdb7.png", category: "drinks",  labelKey: "menu.drink.white" },
  { src: "/manus-storage/page-28_57493c1f.png", category: "drinks",  labelKey: "menu.drink.white" },
  { src: "/manus-storage/page-29_3d6336ab.png", category: "drinks",  labelKey: "menu.drink.sparkling" },
  { src: "/manus-storage/page-30_f33c8ee8.png", category: "drinks",  labelKey: "menu.drink.beer" },
  { src: "/manus-storage/page-31_7725aadd.png", category: "drinks",  labelKey: "menu.drink.beer" },
  { src: "/manus-storage/page-32_4c71d5d1.png", category: "drinks",  labelKey: "menu.drink.juice" },
  { src: "/manus-storage/page-33_af515ec5.png", category: "drinks",  labelKey: "menu.drink.juice" },
];

/* ── 主分類（key 固定，tKey 供 t() 翻譯） ─────────────────────────────── */
const CATEGORY_KEYS = [
  { key: "all",     tKey: "menu.cat.all" },
  { key: "surf",    tKey: "menu.cat.surf" },
  { key: "beef",    tKey: "menu.cat.beef" },
  { key: "pork",    tKey: "menu.cat.pork" },
  { key: "lamb",    tKey: "menu.cat.lamb" },
  { key: "seafood", tKey: "menu.cat.seafood" },
  { key: "chicken", tKey: "menu.cat.chicken" },
  { key: "sides",   tKey: "menu.cat.sides" },
  { key: "lunch",   tKey: "menu.cat.lunch" },
];

/* ── 酒水子分類（key 固定，pageIndex 固定，tKey 供 t() 翻譯） ──────────── */
const DRINK_SUBCAT_KEYS = [
  { key: "glass",     tKey: "menu.drink.glass",     pageIndex: 24 },  // 紅白氣泡酒 → 第25頁（0-based: 24）
  { key: "red",       tKey: "menu.drink.red",        pageIndex: 25 },  // 紅酒/瓶 → 第26頁（0-based: 25）
  { key: "white",     tKey: "menu.drink.white",      pageIndex: 27 },  // 白酒/瓶 → 第28頁（0-based: 27）
  { key: "sparkling", tKey: "menu.drink.sparkling",  pageIndex: 29 },  // 氣泡酒/瓶 → 第30頁（0-based: 29）
  { key: "beer",      tKey: "menu.drink.beer",       pageIndex: 30 },  // 瓶酒 → 第31頁（0-based: 30）
  { key: "juice",     tKey: "menu.drink.juice",      pageIndex: 32 },  // 果汁 → 第33頁（0-based: 32）
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
        alt="Menu"
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

/* ── 主分類下拉選單 ─────────────────────────────────────────────────────── */
function CategoryDropdown({
  currentCategory,
  onJumpTo,
}: {
  currentCategory: string;
  onJumpTo: (key: string) => void;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeCat = CATEGORY_KEYS.find(c => c.key === currentCategory);
  const activeLabel = activeCat ? t(activeCat.tKey) : t("menu.cat.all");
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
          border: "1px solid rgba(197,151,109,0.35)",
          backgroundColor: "rgba(197,151,109,0.06)",
          color: "rgba(197,151,109,0.85)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          minWidth: "140px", justifyContent: "space-between",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.12)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.06)"; }}
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
        maxHeight: open ? "500px" : "0px",
        opacity: open ? 1 : 0,
        transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
        pointerEvents: open ? "auto" : "none",
      }}>
        {CATEGORY_KEYS.map((cat) => (
          <button
            key={cat.key}
            onClick={() => { onJumpTo(cat.key); setOpen(false); }}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "0.65rem 1.25rem",
              fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
              fontSize: "0.8rem", letterSpacing: "0.08em",
              color: currentCategory === cat.key ? "var(--deer-gold)" : "rgba(240,233,223,0.55)",
              backgroundColor: currentCategory === cat.key ? "rgba(197,151,109,0.1)" : "transparent",
              border: "none", cursor: "pointer",
              borderBottom: "1px solid rgba(197,151,109,0.06)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--deer-gold)"; }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = currentCategory === cat.key ? "rgba(197,151,109,0.1)" : "transparent";
              (e.currentTarget as HTMLElement).style.color = currentCategory === cat.key ? "var(--deer-gold)" : "rgba(240,233,223,0.55)";
            }}
          >
            {t(cat.tKey)}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 酒水母分類下拉選單（含子分類） ─────────────────────────────────────── */
function DrinkParentDropdown({
  currentCategory,
  currentDrinkKey,
  onJumpToDrinks,
  onJumpToDrink,
}: {
  currentCategory: string;
  currentDrinkKey: string;
  onJumpToDrinks: () => void;
  onJumpToDrink: (key: string) => void;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isDrinks = currentCategory === "drinks";
  const activeSub = DRINK_SUBCAT_KEYS.find(c => c.key === currentDrinkKey);
  const activeLabel = isDrinks
    ? (activeSub ? t(activeSub.tKey) : t("menu.cat.drinks"))
    : t("menu.cat.drinks");
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
          border: isDrinks ? "1px solid rgba(197,151,109,0.6)" : "1px solid rgba(197,151,109,0.35)",
          backgroundColor: isDrinks ? "rgba(197,151,109,0.1)" : "rgba(197,151,109,0.06)",
          color: isDrinks ? "var(--deer-gold)" : "rgba(197,151,109,0.85)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          minWidth: "140px", justifyContent: "space-between",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.15)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = isDrinks ? "rgba(197,151,109,0.1)" : "rgba(197,151,109,0.06)"; }}
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
        maxHeight: open ? "500px" : "0px",
        opacity: open ? 1 : 0,
        transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
        pointerEvents: open ? "auto" : "none",
      }}>
        {/* 全部酒水（跳到酒水第一頁） */}
        <button
          onClick={() => { onJumpToDrinks(); setOpen(false); }}
          style={{
            display: "block", width: "100%", textAlign: "left",
            padding: "0.65rem 1.25rem",
            fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
            fontSize: "0.8rem", letterSpacing: "0.08em",
            color: isDrinks && !currentDrinkKey ? "var(--deer-gold)" : "rgba(240,233,223,0.55)",
            backgroundColor: isDrinks && !currentDrinkKey ? "rgba(197,151,109,0.1)" : "transparent",
            border: "none", cursor: "pointer",
            borderBottom: "1px solid rgba(197,151,109,0.12)",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--deer-gold)"; }}
          onMouseLeave={(e) => {
            const active = isDrinks && !currentDrinkKey;
            (e.currentTarget as HTMLElement).style.backgroundColor = active ? "rgba(197,151,109,0.1)" : "transparent";
            (e.currentTarget as HTMLElement).style.color = active ? "var(--deer-gold)" : "rgba(240,233,223,0.55)";
          }}
        >
          {t("menu.cat.drinks")}
        </button>
        {/* 酒水子分類 */}
        {DRINK_SUBCAT_KEYS.map((cat) => (
          <button
            key={cat.key}
            onClick={() => { onJumpToDrink(cat.key); setOpen(false); }}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "0.65rem 1.25rem",
              fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
              fontSize: "0.8rem", letterSpacing: "0.08em",
              color: isDrinks && currentDrinkKey === cat.key ? "var(--deer-gold)" : "rgba(240,233,223,0.55)",
              backgroundColor: isDrinks && currentDrinkKey === cat.key ? "rgba(197,151,109,0.1)" : "transparent",
              border: "none", cursor: "pointer",
              borderBottom: "1px solid rgba(197,151,109,0.06)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--deer-gold)"; }}
            onMouseLeave={(e) => {
              const active = isDrinks && currentDrinkKey === cat.key;
              (e.currentTarget as HTMLElement).style.backgroundColor = active ? "rgba(197,151,109,0.1)" : "transparent";
              (e.currentTarget as HTMLElement).style.color = active ? "var(--deer-gold)" : "rgba(240,233,223,0.55)";
            }}
          >
            {t(cat.tKey)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Menu() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontal = useRef<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDragging = useRef(false);
  const [containerWidth, setContainerWidth] = useState(0);
  // 使用者主動選擇的酒水子分類 key（固定 key，不受語言影響）
  const [selectedDrinkKey, setSelectedDrinkKey] = useState("");

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

  const total = MENU_PAGES.length;
  const safeIndex = Math.max(0, Math.min(currentIndex, total - 1));
  const current = MENU_PAGES[safeIndex];
  const currentCategory = current?.category ?? "";

  const goTo = useCallback((newIndex: number) => {
    setCurrentIndex(Math.max(0, Math.min(newIndex, total - 1)));
    setDragDelta(0);
  }, [total]);

  const prev = useCallback(() => {
    goTo((safeIndex - 1 + total) % total);
  }, [safeIndex, total, goTo]);

  const next = useCallback(() => {
    goTo((safeIndex + 1) % total);
  }, [safeIndex, total, goTo]);

  // 點擊主分類：跳到該分類第一張
  const handleCategoryJump = (key: string) => {
    if (key === "all") { goTo(0); return; }
    const idx = MENU_PAGES.findIndex(p => p.category === key);
    if (idx >= 0) goTo(idx);
  };

  // 點擊「全部酒水」母分類：跳到酒水第一頁
  const handleDrinksJump = () => {
    setSelectedDrinkKey("");
    const idx = MENU_PAGES.findIndex(p => p.category === "drinks");
    if (idx >= 0) goTo(idx);
  };

  // 點擊酒水子分類：使用固定 pageIndex 跳頁
  const handleDrinkJump = (key: string) => {
    setSelectedDrinkKey(key);
    const sub = DRINK_SUBCAT_KEYS.find(c => c.key === key);
    if (sub) goTo(sub.pageIndex);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxSrc) { if (e.key === "Escape") setLightboxSrc(null); return; }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, lightboxSrc]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontal.current = null;
    setDragDelta(0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (isHorizontal.current === null) {
      if (Math.abs(dx) > Math.abs(dy) + 5) { isHorizontal.current = true; }
      else if (Math.abs(dy) > Math.abs(dx) + 5) { isHorizontal.current = false; }
    }
    if (isHorizontal.current) {
      e.preventDefault();
      setDragDelta(dx);
      setIsDragging(true);
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (isHorizontal.current && Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    } else { setDragDelta(0); }
    setIsDragging(false);
    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontal.current = null;
  };
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
      setDragDelta(dx);
      setIsDragging(true);
    }
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    if (isMouseDragging.current && Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    } else { setDragDelta(0); }
    setIsDragging(false);
    mouseStartX.current = null;
    isMouseDragging.current = false;
  };

  const offsetPx = containerWidth > 0 ? -(safeIndex * containerWidth) + dragDelta : 0;
  const trackTranslate = `translateX(${offsetPx}px)`;

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)", minHeight: "100vh" }}>
      <style>{`.menu-img-wrap { touch-action: pan-y; }`}</style>
      {lightboxSrc && (
        <LightboxViewer src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "5rem 0 3rem" }}>
        <div className="container">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.7)", marginBottom: "1rem" }}>
            {t("menu.hero.label")}
          </p>
          <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--deer-dark-text)", letterSpacing: "0.08em", marginBottom: "1rem" }}>
            {t("menu.hero.h1")}
          </h1>
          <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.5)", marginBottom: "1.5rem" }} />
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(240,233,223,0.45)", letterSpacing: "0.06em" }}>
            {t("menu.hint")}
          </p>
        </div>
      </section>
      {/* ── 分類選單（快速跳頁，sticky 固定） ── */}
      <div style={{
        position: "sticky", top: "80px", zIndex: 50,
        backgroundColor: "rgba(18,12,10,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(197,151,109,0.1)",
        padding: "0.75rem 0",
      }}>
        <div className="container">
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <CategoryDropdown currentCategory={currentCategory} onJumpTo={handleCategoryJump} />
            <DrinkParentDropdown
              currentCategory={currentCategory}
              currentDrinkKey={selectedDrinkKey}
              onJumpToDrinks={handleDrinksJump}
              onJumpToDrink={handleDrinkJump}
            />
          </div>
        </div>
      </div>
      {/* ── 輪播主體 ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", gap: "0" }}>
            {/* 左箭頭區塊 */}
            <button
              onClick={prev}
              aria-label="prev"
              style={{
                flexShrink: 0,
                width: "48px",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(197,151,109,0.3)",
                fontSize: "1.75rem",
                transition: "color 0.25s ease",
                padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(197,151,109,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(197,151,109,0.3)")}
            >
              <svg width="20" height="36" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4 L4 18 L14 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {current && (
              <div style={{ position: "relative", flex: 1, maxWidth: "640px" }}>
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
                  <div
                    style={{
                      display: "flex",
                      width: `${total * 100}%`,
                      transform: trackTranslate,
                      transition: isDragging ? "none" : "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    {MENU_PAGES.map((page, i) => (
                      <div
                        key={i}
                        style={{ width: `${100 / total}%`, flexShrink: 0, position: "relative" }}
                        onClick={() => { if (!isMouseDragging.current && window.innerWidth < 768) setLightboxSrc(page.src); }}
                      >
                        <img
                          src={page.src}
                          alt={t(page.labelKey)}
                          loading={Math.abs(i - safeIndex) <= 2 ? "eager" : "lazy"}
                          style={{ width: "100%", display: "block", userSelect: "none", pointerEvents: "none" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* 右笭頭區塊 */}
            <button
              onClick={next}
              aria-label="next"
              style={{
                flexShrink: 0,
                width: "48px",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(197,151,109,0.3)",
                fontSize: "1.75rem",
                transition: "color 0.25s ease",
                padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(197,151,109,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(197,151,109,0.3)")}
            >
              <svg width="20" height="36" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4 L16 18 L6 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {current && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
                {t(current.labelKey)} &nbsp;·&nbsp; {safeIndex + 1} / {total}
              </p>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", alignItems: "center", marginBottom: "1.5rem" }}>
                {[-2, -1, 0, 1, 2].map((offset) => {
                  const idx = safeIndex + offset;
                  if (idx < 0 || idx >= total) return <span key={offset} style={{ width: "7px" }} />;
                  return (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      style={{
                        width: offset === 0 ? "20px" : "7px", height: "7px",
                        borderRadius: "4px", border: "none", cursor: "pointer", padding: 0,
                        backgroundColor: offset === 0 ? "rgba(197,151,109,0.9)" : "rgba(255,255,255,0.3)",
                        transition: "all 0.3s ease", flexShrink: 0,
                      }}
                    />
                  );
                })}
              </div>
              {/* 分頁指示器：顯示目前頁碼 + 前後各 2 頁的跳頁點 */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                {/* 上一頁 */}
                <button
                  onClick={prev}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(197,151,109,0.5)", fontSize: "1.1rem", padding: "0.25rem 0.5rem", lineHeight: 1, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(197,151,109,1)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(197,151,109,0.5)")}
                >‹</button>
                {/* 頁碼點 */}
                {Array.from({ length: total }, (_, i) => {
                  const dist = Math.abs(i - safeIndex);
                  if (dist > 2 && i !== 0 && i !== total - 1) {
                    if (dist === 3) return <span key={i} style={{ color: "rgba(197,151,109,0.25)", fontSize: "0.5rem", lineHeight: 1 }}>·</span>;
                    return null;
                  }
                  const isActive = i === safeIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`第 ${i + 1} 頁`}
                      style={{
                        width: isActive ? "24px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        flexShrink: 0,
                        backgroundColor: isActive ? "rgba(197,151,109,0.9)" : dist === 1 ? "rgba(197,151,109,0.35)" : "rgba(197,151,109,0.15)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  );
                })}
                {/* 下一頁 */}
                <button
                  onClick={next}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(197,151,109,0.5)", fontSize: "1.1rem", padding: "0.25rem 0.5rem", lineHeight: 1, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(197,151,109,1)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(197,151,109,0.5)")}
                >›</button>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* ── 備注 ── */}
      <section style={{ backgroundColor: "rgba(26,18,16,0.6)", borderTop: "1px solid rgba(197,151,109,0.08)", padding: "3rem 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.3)", lineHeight: 2, letterSpacing: "0.04em" }}>
            {t("menu.note")}
          </p>
        </div>
      </section>
    </main>
  );
}
