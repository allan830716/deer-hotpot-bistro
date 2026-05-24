/*
 * CRÈM 蛋糕上桌預訂頁面 (v7 — 輪播連續滑動版)
 * ─────────────────────────────────────────────
 * 修正項目：
 * 1. 輪播：採用菜單頁相同的 translateX track 連續滑動機制，放大輪播，箭頭移入圖片容器內
 * 2. 流程圖：箭頭垂直置中對齊圖示中心，圖示更新對應文字
 * 3. 手機版「慶祝蛋糕 × 餐廳」加 <br/> 避免斷句
 */
import { useCallback, useEffect, useRef, useState } from "react";

function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── 圖片 CDN 路徑 ──────────────────────────────────────────────────────────
const DEER_LOGO = "/manus-storage/deer-logo-white_a35020cd.webp";
const HERO_IMG = "/manus-storage/crem-hero-new_b5d70f72.jpg";
const CREM_LOGO = "/manus-storage/crem-logo-white_f9b62a3f.webp";
const HOW_TO_ORDER_HERO = "/manus-storage/crem-how-to-order-hero_9e446791.webp";
const STEP1_IMG = "/manus-storage/crem-step1-flavor_672c25e8.webp";
const STEP2_IMG = "/manus-storage/crem-step2-booking_7694680f.webp";
const STEP3_IMG = "/manus-storage/crem-step3-checkout_7f71404e.webp";
const STEP4_IMG = "/manus-storage/crem-step4-notes_160b6582.webp";
const STEP5_IMG = "/manus-storage/crem-step5-done2_2e613f78.png";

// ── 痛點資料 ────────────────────────────────────────────────────────────────
const PAIN_POINTS = [
  "壽星在旁，還要偷偷準備",
  "花費交通、時間取蛋糕",
  "怕蛋糕撞壞或融化變形",
  "取貨時間對不上，行程亂掉",
  "一邊吃飯還要偷偷協調",
  "製造驚喜卻變成最忙的人",
];

// ── 流程步驟 ────────────────────────────────────────────────────────────────
// 圖示：1=日曆(線上選口味) 2=冷藏箱(冷藏配送) 3=服務生(專人安排上桌) 4=愛心(把時間留給重要的人)
const FLOW_STEPS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <rect x="6" y="8" width="28" height="24" rx="2"/>
        <path d="M13 8V5M27 8V5M6 16h28" strokeLinecap="round"/>
        <circle cx="20" cy="26" r="3"/>
      </svg>
    ),
    zh: "線上選口味",
    sub: "4 / 6 / 8 吋\n快速預訂",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        {/* 冷藏箱：方形箱體 + 雪花 */}
        <rect x="6" y="10" width="28" height="22" rx="2"/>
        <path d="M6 18h28" strokeLinecap="round"/>
        <path d="M20 22v6M17 24l3-2 3 2M17 26l3 2 3-2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 10V7M27 10V7" strokeLinecap="round"/>
      </svg>
    ),
    zh: "冷藏配送",
    sub: "低溫冷藏\n省去取貨",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        {/* 服務生端盤：人形 + 托盤 */}
        <circle cx="20" cy="9" r="4"/>
        <path d="M12 34v-8a8 8 0 0116 0v8" strokeLinecap="round"/>
        <path d="M10 22h20" strokeLinecap="round"/>
        <circle cx="20" cy="22" r="2" fill="rgba(197,151,109,0.5)" stroke="none"/>
      </svg>
    ),
    zh: "專人安排上桌",
    sub: "蠟燭 / 擺盤\n時機提前安排",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        {/* 愛心 */}
        <path d="M20 33s-14-9-14-18a8 8 0 0114-5.2A8 8 0 0134 15c0 9-14 18-14 18z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    zh: "把時間留給重要的人",
    sub: "剩下的\n交給我們",
  },
];

// ── 訂購方式輪播資料 ─────────────────────────────────────────────────────────
const ORDER_STEPS = [
  {
    img: HOW_TO_ORDER_HERO,
    stepNum: null as number | null,
    title: "如何預訂慶祝一條龍服務？",
    titleEn: "HOW TO ORDER",
    desc: "只需簡單幾步，我們將為您安排專屬於您的慶祝時刻。",
    descEn: "CAKE × RESERVATION × CELEBRATION",
  },
  {
    img: STEP1_IMG,
    stepNum: 1 as number | null,
    title: "選擇口味",
    titleEn: "CHOOSE FLAVOR",
    desc: "挑選您喜歡的蛋糕口味與尺寸，開啟美好慶祝的第一步！",
    descEn: "Select your favorite cake flavor and size.",
  },
  {
    img: STEP2_IMG,
    stepNum: 2 as number | null,
    title: "點選「是否有訂位？」",
    titleEn: "CHECK BOOKING",
    desc: "在產品頁面中，點選「是否有訂位初衷小鹿？」選擇「有，下一頁結帳頁面備註填上訂位」",
    descEn: "Select whether you have a reservation.",
  },
  {
    img: STEP3_IMG,
    stepNum: 3 as number | null,
    title: "前往結帳頁面",
    titleEn: "GO TO CHECKOUT",
    desc: "確認商品與數量後，點選「立即購買」前往結帳頁面。",
    descEn: 'Click "立即購買" to proceed to checkout.',
  },
  {
    img: STEP4_IMG,
    stepNum: 4 as number | null,
    title: "填寫訂單備註",
    titleEn: "FILL IN ORDER NOTES",
    desc: "在結帳頁面的「訂單備註」中，填寫訂位大名 / 時間 / 電話，讓我們為您安排最完美的蛋糕！",
    descEn: "Name / Time / Phone Number",
  },
  {
    img: STEP5_IMG,
    stepNum: 5 as number | null,
    title: "預訂完成！",
    titleEn: "ALL SET",
    desc: "感謝您預訂「慶祝一條龍服務」！我們將用心為您打造專屬的完美時刻。",
    descEn: "Thank you for choosing our celebration service!",
  },
];

export default function Crem() {
  const refService = useFadeIn(0.08);
  const refCta = useFadeIn(0.1);

  // ── 輪播狀態（仿菜單頁機制）──────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontal = useRef<boolean | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDragging = useRef(false);

  const total = ORDER_STEPS.length;
  const safeIndex = Math.max(0, Math.min(currentIndex, total - 1));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback((newIndex: number) => {
    setCurrentIndex(Math.max(0, Math.min(newIndex, total - 1)));
    setDragDelta(0);
  }, [total]);

  const prev = useCallback(() => goTo((safeIndex - 1 + total) % total), [safeIndex, total, goTo]);
  const next = useCallback(() => goTo((safeIndex + 1) % total), [safeIndex, total, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

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
      if (Math.abs(dx) > Math.abs(dy) + 5) isHorizontal.current = true;
      else if (Math.abs(dy) > Math.abs(dx) + 5) isHorizontal.current = false;
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
    } else setDragDelta(0);
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
    } else setDragDelta(0);
    setIsDragging(false);
    mouseStartX.current = null;
    isMouseDragging.current = false;
  };

  const offsetPx = containerWidth > 0 ? -(safeIndex * containerWidth) + dragDelta : 0;
  const trackTranslate = `translateX(${offsetPx}px)`;

  const gold = "rgba(197,151,109,1)";
  const goldFaint = "rgba(197,151,109,0.5)";
  const textMain = "#F0E9DF";
  const textSub = "rgba(240,233,223,0.45)";

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "#0A0807", minHeight: "100vh" }}>

      {/* ══ 全域 CSS ══ */}
      <style>{`
        @media (max-width: 767px) {
          .crem-flow-desktop { display: none !important; }
          .crem-flow-mobile { display: flex !important; }
          .crem-pain-grid { grid-template-columns: 1fr !important; }
          .crem-step-tabs { gap: 0 !important; }
          .crem-step-tab { padding: 0.4rem 0.5rem !important; font-size: 0.62rem !important; }
          /* 手機版輪播：只顯示圖片，隱藏文字 */
          .crem-carousel-slide-inner { flex-direction: column !important; min-height: unset !important; }
          .crem-carousel-slide-text { display: none !important; }
          .crem-carousel-slide-img { flex: unset !important; width: 100% !important; min-height: 260px; display: flex; align-items: center; justify-content: center; }
          .crem-carousel-slide-img img { object-fit: contain !important; background-color: #111; width: 100% !important; height: auto !important; max-height: 320px; display: block; }
        }
        @media (min-width: 768px) {
          .crem-flow-mobile { display: none !important; }
          .crem-flow-desktop { display: flex !important; }
        }
        .crem-carousel-wrap { touch-action: pan-y; }
      `}</style>

      {/* ══ Section 1: Hero ══ */}
      <section style={{ backgroundColor: "#0A0807" }}>

        {/* 雙品牌 Logo 橫幅 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "clamp(1rem, 4vw, 2.5rem)",
          padding: "1.75rem 1.5rem 1.5rem",
          borderBottom: "1px solid rgba(197,151,109,0.1)",
        }}>
          <img src={DEER_LOGO} alt="初衷小鹿" style={{ height: "clamp(44px, 7vw, 64px)", width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "rgba(197,151,109,0.4)", lineHeight: 1 }}>×</span>
          <img src={CREM_LOGO} alt="CRÈM" style={{ height: "clamp(44px, 7vw, 64px)", width: "auto", objectFit: "contain" }} />
        </div>

        {/* 全寬 Hero 圖片 */}
        <div style={{ position: "relative", width: "100%", lineHeight: 0, overflow: "hidden" }}>
          <img
            src={HERO_IMG}
            alt="CRÈM × 初衷小鹿 慶祝一條龍服務"
            style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "16/7" }}
          />
        </div>

        {/* 主標題 */}
        <div style={{ textAlign: "center", padding: "3rem 2rem 2.5rem", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
          <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            Exclusive Collaboration ·{" "}
            <span style={{ whiteSpace: "nowrap" }}>慶祝蛋糕 × 餐廳</span>
          </p>
          <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.45, marginBottom: "1.25rem" }}>
            CRÈM 蛋糕上桌預訂
          </h1>
          <p style={{ color: textSub, fontSize: "0.9rem", lineHeight: 2, letterSpacing: "0.06em" }}>
            由兩個品牌共創一場慶祝的完整設計。<br />
            從餐桌到蛋糕，讓每個重要時刻都更加完整。
          </p>
        </div>
      </section>

      {/* ══ Section 2: 一條龍預定服務 ══ */}
      <section style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
        <div className="container" style={{ maxWidth: "960px" }}>
          <div ref={refService} className="fade-up">

            {/* 標題 */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem", whiteSpace: "nowrap" }}>
                慶祝蛋糕 × 餐廳
              </p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                一條龍預定服務
              </h2>
              <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 1.9 }}>
                想在重要的日子好好慶祝，卻總是被這些事情打亂？
              </p>
            </div>

            {/* 六宮格痛點 */}
            <div
              className="crem-pain-grid"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "3.5rem" }}
            >
              {PAIN_POINTS.map((point, i) => (
                <div key={i} style={{
                  border: "1px solid rgba(197,151,109,0.18)",
                  borderRadius: "8px",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  backgroundColor: "rgba(255,255,255,0.015)",
                }}>
                  <span style={{ color: gold, fontSize: "1.1rem", flexShrink: 0, lineHeight: 1, fontWeight: 400 }}>×</span>
                  <span style={{ color: "rgba(240,233,223,0.75)", fontSize: "0.875rem", lineHeight: 1.6 }}>{point}</span>
                </div>
              ))}
            </div>

            {/* 流程圖容器 */}
            <div style={{
              backgroundColor: "rgba(197,151,109,0.04)",
              border: "1px solid rgba(197,151,109,0.14)",
              borderRadius: "12px",
              padding: "2rem 1.5rem",
            }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", marginBottom: "2rem" }}>
                After · 一條龍服務流程
              </p>

              {/* 電腦版：橫向排列 — 箭頭與圖示垂直中心對齊 */}
              <div className="crem-flow-desktop" style={{
                display: "flex",
                alignItems: "flex-start",   /* 頂部對齊，箭頭用 paddingTop 手動對齊圖示中心 */
                justifyContent: "center",
                gap: 0,
              }}>
                {FLOW_STEPS.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    {/* 步驟卡片：圖示 + 文字，自身 flex-col */}
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      width: "clamp(110px, 20vw, 160px)",
                      padding: "0 0.75rem",
                    }}>
                      <div style={{
                        width: "64px", height: "64px",
                        border: "1px solid rgba(197,151,109,0.45)",
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        backgroundColor: "rgba(197,151,109,0.05)",
                        marginBottom: "1rem",
                        flexShrink: 0,
                      }}>
                        {s.icon}
                      </div>
                      <p style={{ color: textMain, fontSize: "0.85rem", letterSpacing: "0.04em", marginBottom: "0.4rem", lineHeight: 1.4 }}>{s.zh}</p>
                      <p style={{ color: textSub, fontSize: "0.72rem", lineHeight: 1.65, whiteSpace: "pre-line" }}>{s.sub}</p>
                    </div>
                    {/* 箭頭：paddingTop 32px = 圖示高度64px / 2 - 箭頭高度16px / 2 = 28px，讓箭頭中心對齊圖示中心 */}
                    {i < FLOW_STEPS.length - 1 && (
                      <div style={{ display: "flex", alignItems: "center", flexShrink: 0, paddingTop: "24px" }}>
                        <svg viewBox="0 0 44 16" fill="none" style={{ width: "44px", height: "16px" }}>
                          <line x1="0" y1="8" x2="38" y2="8" stroke="rgba(197,151,109,0.5)" strokeWidth="1.2"/>
                          <path d="M35 4 L44 8 L35 12" stroke="rgba(197,151,109,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 手機版：垂直排列 */}
              <div className="crem-flow-mobile" style={{
                display: "none",
                flexDirection: "column",
                gap: 0,
                maxWidth: "320px",
                margin: "0 auto",
              }}>
                {FLOW_STEPS.map((s, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      width: "100%",
                      padding: "0.75rem 0",
                    }}>
                      <div style={{
                        width: "56px", height: "56px",
                        border: "1px solid rgba(197,151,109,0.45)",
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        backgroundColor: "rgba(197,151,109,0.05)",
                        flexShrink: 0,
                      }}>
                        {s.icon}
                      </div>
                      <div>
                        <p style={{ color: textMain, fontSize: "0.9rem", letterSpacing: "0.04em", marginBottom: "0.25rem", lineHeight: 1.4 }}>{s.zh}</p>
                        <p style={{ color: textSub, fontSize: "0.75rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>{s.sub}</p>
                      </div>
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: "28px", width: "100%", margin: "0.25rem 0" }}>
                        <svg viewBox="0 0 16 28" fill="none" style={{ width: "16px", height: "28px" }}>
                          <line x1="8" y1="0" x2="8" y2="22" stroke="rgba(197,151,109,0.5)" strokeWidth="1.2"/>
                          <path d="M4 19 L8 28 L12 19" stroke="rgba(197,151,109,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══ Section 3: 訂購方式（連續滑動輪播）══ */}
      <section style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(197,151,109,0.1)", backgroundColor: "#090706" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>

          {/* 標題 */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>How To Order</p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em" }}>
              訂購方式
            </h2>
          </div>

          {/* 輪播主體：position:relative 讓箭頭絕對定位在圖片上 */}
          <div style={{ position: "relative" }}>
            <div
              ref={containerRef}
              className="crem-carousel-wrap"
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "12px",
                border: "1px solid rgba(197,151,109,0.18)",
                backgroundColor: "#111",
                cursor: isMouseDragging.current ? "grabbing" : "grab",
                userSelect: "none",
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
              {/* Track：所有幻燈片橫向排列 */}
              <div style={{
                display: "flex",
                width: `${total * 100}%`,
                transform: trackTranslate,
                transition: isDragging ? "none" : "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}>
                {ORDER_STEPS.map((s, i) => (
                  <div
                    key={i}
                    style={{ width: `${100 / total}%`, flexShrink: 0 }}
                  >
                    {s.stepNum === null ? (
                      /* 介紹幻燈片：全寬圖片 */
                      <div style={{ aspectRatio: "16/7", overflow: "hidden" }}>
                        <img
                          src={s.img}
                          alt={s.title}
                          loading={Math.abs(i - safeIndex) <= 1 ? "eager" : "lazy"}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                        />
                      </div>
                    ) : (
                      /* STEP 幻燈片：左文字 + 右圖片 */
                      <div
                        className="crem-carousel-slide-inner"
                        style={{ display: "flex", alignItems: "stretch", minHeight: "480px" }}
                      >
                        {/* 左側文字 */}
                        <div
                          className="crem-carousel-slide-text"
                          style={{
                            flex: "0 0 40%",
                            padding: "2.5rem 2rem 2.5rem 2.5rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            borderRight: "1px solid rgba(197,151,109,0.12)",
                          }}
                        >
                          <div style={{
                            width: "52px", height: "52px",
                            border: "1.5px solid rgba(197,151,109,0.75)",
                            borderRadius: "50%",
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            marginBottom: "1.25rem",
                          }}>
                            <span style={{ color: "rgba(197,151,109,0.65)", fontSize: "0.45rem", letterSpacing: "0.15em", lineHeight: 1 }}>STEP</span>
                            <span style={{ color: gold, fontSize: "1.3rem", fontWeight: 300, lineHeight: 1 }}>{s.stepNum}</span>
                          </div>
                          <h3 style={{
                            fontFamily: "'Noto Serif TC', serif",
                            fontWeight: 200,
                            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                            color: textMain,
                            letterSpacing: "0.06em",
                            lineHeight: 1.45,
                            marginBottom: "0.5rem",
                          }}>
                            {s.title}
                          </h3>
                          <p style={{ color: goldFaint, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>{s.titleEn}</p>
                          <p style={{ color: "rgba(240,233,223,0.78)", fontSize: "clamp(0.8rem, 1.3vw, 0.9rem)", lineHeight: 1.85 }}>{s.desc}</p>
                          {s.descEn && (
                            <p style={{ color: "rgba(197,151,109,0.55)", fontSize: "0.62rem", lineHeight: 1.7, marginTop: "0.5rem" }}>{s.descEn}</p>
                          )}
                        </div>
                        {/* 右側圖片 */}
              <div
                        className="crem-carousel-slide-img"
                        style={{ flex: "1", overflow: "hidden", backgroundColor: "#111" }}
                      >
                        <img
                          src={s.img}
                          alt={s.title}
                          loading={Math.abs(i - safeIndex) <= 1 ? "eager" : "lazy"}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", objectPosition: "center top", pointerEvents: "none" }}
                        />
                      </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 左右箭頭：絕對定位在輪播容器內左右兩側 */}
            <button
              onClick={prev}
              aria-label="上一步"
              style={{
                position: "absolute", left: "0.75rem", top: "50%",
                transform: "translateY(-50%)", zIndex: 20,
                width: "44px", height: "44px", borderRadius: "50%",
                border: "none", backgroundColor: "rgba(30,20,15,0.72)",
                color: "#fff", cursor: "pointer", fontSize: "1.6rem",
                lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background-color 0.2s ease",
                boxShadow: "0 2px 12px rgba(0,0,0,0.45)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.85)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(30,20,15,0.72)"; }}
            >‹</button>
            <button
              onClick={next}
              aria-label="下一步"
              style={{
                position: "absolute", right: "0.75rem", top: "50%",
                transform: "translateY(-50%)", zIndex: 20,
                width: "44px", height: "44px", borderRadius: "50%",
                border: "none", backgroundColor: "rgba(30,20,15,0.72)",
                color: "#fff", cursor: "pointer", fontSize: "1.6rem",
                lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background-color 0.2s ease",
                boxShadow: "0 2px 12px rgba(0,0,0,0.45)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.85)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(30,20,15,0.72)"; }}
            >›</button>
          </div>

          {/* 指示點 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
            {ORDER_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === safeIndex ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: i === safeIndex ? gold : "rgba(197,151,109,0.22)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* 步驟標籤列 */}
          <div className="crem-step-tabs" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0", marginTop: "0.75rem" }}>
            {ORDER_STEPS.map((s, i) => (
              <button
                key={i}
                className="crem-step-tab"
                onClick={() => goTo(i)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0.4rem 0.875rem",
                  color: i === safeIndex ? gold : "rgba(240,233,223,0.3)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s",
                  borderBottom: i === safeIndex ? `1px solid ${goldFaint}` : "1px solid transparent",
                }}
              >
                {s.stepNum ? `STEP ${s.stepNum}` : "介紹"}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ══ Section 4: CTA ══ */}
      <section style={{ padding: "5rem 2rem", textAlign: "center", backgroundColor: "#0A0807" }}>
        <div ref={refCta} className="fade-up">
          <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Ready to Celebrate</p>
          <h2 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 200,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: textMain,
            letterSpacing: "0.08em",
            marginBottom: "1rem",
          }}>
            開始預訂您的專屬蛋糕
          </h2>
          <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 2, marginBottom: "2.5rem" }}>
            前往 CRÈM 官網選擇口味與尺寸，<br />
            記得在產品頁面選擇「有訂位初衷小鹿」。
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <a
              href="https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "rgba(197,151,109,0.15)",
                border: "1px solid rgba(197,151,109,0.75)",
                color: gold,
                padding: "1rem 3rem",
                fontSize: "0.82rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(197,151,109,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(197,151,109,0.15)")}
            >
              前往 CRÈM 選蛋糕
            </a>
          </div>
          <p style={{ color: "rgba(240,233,223,0.55)", fontSize: "0.72rem", marginTop: "2rem", letterSpacing: "0.04em" }}>
            ＊預訂蛋糕請在 CRÈM 官網下單，請勿直接在初衷小鹿留言
          </p>
        </div>
      </section>
    </main>
  );
}
