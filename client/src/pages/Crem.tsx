/*
 * CRÈM 蛋糕上桌預訂頁面 (v6 — 全面修正版)
 * ─────────────────────────────────────────────
 * 修正項目：
 * 1. Hero：手機版改為上下堆疊，電腦版維持兩欄全寬，圖片比例改為 16/9
 * 2. 一條龍服務：手機版痛點改為單欄，流程圖手機版改為垂直排列
 * 3. 輪播：手機版改為圖片在上、文字在下的分離佈局（不再疊加）
 * 4. 預訂期間：移除重複的範例資訊，僅保留橫幅圖 + 簡短說明
 * 5. CTA：強化按鈕視覺，新增 LINE 詢問入口
 */
import { useEffect, useRef, useState } from "react";

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
// Hero 圖片：新版蛋糕 + CRÈM 黑盒合照
const HERO_IMG = "/manus-storage/crem-hero-new_b5d70f72.jpg";
// CRÈM 原始 Logo
const CREM_LOGO = "/manus-storage/crem-logo-white_f9b62a3f.webp";
// 訂購方式輪播介紹圖
const HOW_TO_ORDER_HERO = "/manus-storage/crem-how-to-order-hero_9e446791.webp";
const STEP1_IMG = "/manus-storage/crem-step1-flavor_672c25e8.webp";
const STEP2_IMG = "/manus-storage/crem-step2-booking_7694680f.webp";
const STEP3_IMG = "/manus-storage/crem-step3-checkout_7f71404e.webp";
const STEP4_IMG = "/manus-storage/crem-step4-notes_160b6582.webp";
const STEP5_IMG = "/manus-storage/crem-step5-done2_2e613f78.png";
// 預訂期間橫幅
const PREORDER_BANNER = "/manus-storage/crem-preorder-banner_8d365f8c.png";

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
        <path d="M8 32V12a2 2 0 012-2h20a2 2 0 012 2v20" strokeLinecap="round"/>
        <path d="M4 32h32" strokeLinecap="round"/>
        <path d="M16 22h8M16 17h8" strokeLinecap="round"/>
      </svg>
    ),
    zh: "冷藏配送",
    sub: "低溫冷藏\n省去取貨",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <rect x="4" y="14" width="22" height="14" rx="2"/>
        <path d="M26 18l8-4v12l-8-4" strokeLinejoin="round"/>
        <circle cx="15" cy="21" r="3"/>
      </svg>
    ),
    zh: "專人安排上桌",
    sub: "蠟燭 / 擺盤\n時機提前安排",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <path d="M20 6c-7.7 0-14 5.4-14 12 0 4.2 2.3 7.9 6 10.2V34l5-3h3c7.7 0 14-5.4 14-12S27.7 6 20 6z"/>
        <path d="M14 20l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
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
  const refPreorder = useFadeIn(0.08);
  const refCta = useFadeIn(0.1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = ORDER_STEPS.length;

  const gold = "rgba(197,151,109,1)";
  const goldFaint = "rgba(197,151,109,0.5)";
  const textMain = "#F0E9DF";
  const textSub = "rgba(240,233,223,0.45)";

  const step = ORDER_STEPS[currentSlide];

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "#0A0807", minHeight: "100vh" }}>

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

        {/* 響應式媒體查詢 */}
        <style>{`
          @media (max-width: 767px) {
            .crem-flow-desktop { display: none !important; }
            .crem-flow-mobile { display: flex !important; }
            .crem-pain-grid { grid-template-columns: 1fr !important; }
            .crem-carousel-desktop { display: none !important; }
            .crem-carousel-mobile { display: block !important; }
            .crem-step-tabs { gap: 0 !important; }
            .crem-step-tab { padding: 0.4rem 0.5rem !important; font-size: 0.62rem !important; }
          }
          @media (min-width: 768px) {
            .crem-flow-mobile { display: none !important; }
            .crem-flow-desktop { display: flex !important; }
            .crem-carousel-desktop { display: block !important; }
            .crem-carousel-mobile { display: none !important; }
          }
        `}</style>

        {/* 全寬 Hero 圖片 — 電腦版與手機版均為全寬 */}
        <div style={{ position: "relative", width: "100%", lineHeight: 0, overflow: "hidden" }}>
          <img
            src={HERO_IMG}
            alt="CRÈM × 初衷小鹿 慶祝一條龍服務"
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
              aspectRatio: "16/7",
            }}
          />
        </div>

        {/* 主標題 */}
        <div style={{ textAlign: "center", padding: "3rem 2rem 2.5rem", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
          <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            Exclusive Collaboration · 慶祝蛋糕 × 餐廳
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
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                慶祝蛋糕 × 餐廳
              </p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                一條龍預定服務
              </h2>
              <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 1.9 }}>
                想在重要的日子好好慶祝，卻總是被這些事情打亂？
              </p>
            </div>

            {/* 六宮格痛點（× 叉叉）— 電腦版左3右3，手機版單欄 */}
            <div
              className="crem-pain-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                marginBottom: "3.5rem",
              }}
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

            {/* 流程圖 — 電腦版橫向，手機版垂直 */}
            <div style={{
              backgroundColor: "rgba(197,151,109,0.04)",
              border: "1px solid rgba(197,151,109,0.14)",
              borderRadius: "12px",
              padding: "2rem 1.5rem",
            }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", marginBottom: "2rem" }}>
                After · 一條龍服務流程
              </p>

              {/* 電腦版：橫向排列 */}
              <div className="crem-flow-desktop" style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 0,
              }}>
                {FLOW_STEPS.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", flexShrink: 0 }}>
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
                    {i < FLOW_STEPS.length - 1 && (
                      <div style={{ display: "flex", alignItems: "center", paddingTop: "20px", flexShrink: 0 }}>
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

      {/* ══ Section 3: 訂購方式（輪播）══ */}
      <section style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(197,151,109,0.1)", backgroundColor: "#090706" }}>
        <div className="container" style={{ maxWidth: "960px" }}>

          {/* 標題 */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>How To Order</p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em" }}>
              訂購方式
            </h2>
          </div>

          {/* 輪播主體包裝（position:relative 讓箭頭可以絕對定位）*/}
          <div style={{ position: "relative", padding: "0 24px" }}>

            {/* 電腦版輪播：介紹幻燈片全寬圖片，STEP 幻燈片左文字+右圖片分欄 */}
            <div className="crem-carousel-desktop" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(197,151,109,0.18)", backgroundColor: "#111" }}>
              {step.stepNum === null ? (
                /* 介紹幻燈片：全寬圖片（圖片本身已包含文字）*/
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/7" }}>
                  <img
                    key={`desktop-intro`}
                    src={step.img}
                    alt={step.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ) : (
                /* STEP 幻燈片：左側文字 + 右側圖片（不疊加，完全分離）*/
                <div style={{ display: "flex", alignItems: "stretch", minHeight: "340px" }}>
                  {/* 左側文字區 */}
                  <div style={{
                    flex: "0 0 42%",
                    padding: "2.5rem 2rem 2.5rem 2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRight: "1px solid rgba(197,151,109,0.12)",
                  }}>
                    <div style={{
                      width: "52px", height: "52px",
                      border: "1.5px solid rgba(197,151,109,0.75)",
                      borderRadius: "50%",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      marginBottom: "1.25rem",
                    }}>
                      <span style={{ color: "rgba(197,151,109,0.65)", fontSize: "0.45rem", letterSpacing: "0.15em", lineHeight: 1 }}>STEP</span>
                      <span style={{ color: gold, fontSize: "1.3rem", fontWeight: 300, lineHeight: 1 }}>{step.stepNum}</span>
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
                      {step.title}
                    </h3>
                    <p style={{ color: goldFaint, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>{step.titleEn}</p>
                    <p style={{ color: "rgba(240,233,223,0.78)", fontSize: "clamp(0.8rem, 1.3vw, 0.9rem)", lineHeight: 1.85 }}>{step.desc}</p>
                    {step.descEn && (
                      <p style={{ color: "rgba(197,151,109,0.55)", fontSize: "0.62rem", lineHeight: 1.7, marginTop: "0.5rem" }}>{step.descEn}</p>
                    )}
                  </div>
                  {/* 右側圖片區 */}
                  <div style={{ flex: "1", overflow: "hidden", position: "relative" }}>
                    <img
                      key={`desktop-step-${currentSlide}`}
                      src={step.img}
                      alt={step.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", objectPosition: "center top" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 手機版輪播：純圖片，完整顯示不裁切 */}
            <div className="crem-carousel-mobile" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(197,151,109,0.18)", backgroundColor: "#111" }}>
              <img
                key={`mobile-${currentSlide}`}
                src={step.img}
                alt={step.title}
                style={{ width: "100%", display: "block", objectFit: "contain", maxHeight: "70vw" }}
              />
            </div>

            {/* 左右箭頭（半覆蓋在輪播容器邊緣）*/}
            <button
              onClick={() => setCurrentSlide((currentSlide - 1 + total) % total)}
              aria-label="上一步"
              style={{
                position: "absolute", left: "4px", top: "40%", transform: "translateY(-50%)",
                width: "40px", height: "40px",
                border: "1px solid rgba(197,151,109,0.45)", borderRadius: "50%",
                backgroundColor: "rgba(9,7,6,0.85)", color: gold,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.35rem", zIndex: 10,
              }}
            >‹</button>
            <button
              onClick={() => setCurrentSlide((currentSlide + 1) % total)}
              aria-label="下一步"
              style={{
                position: "absolute", right: "4px", top: "40%", transform: "translateY(-50%)",
                width: "40px", height: "40px",
                border: "1px solid rgba(197,151,109,0.45)", borderRadius: "50%",
                backgroundColor: "rgba(9,7,6,0.85)", color: gold,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.35rem", zIndex: 10,
              }}
            >›</button>

          </div>



          {/* 指示點 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
            {ORDER_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: i === currentSlide ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: i === currentSlide ? gold : "rgba(197,151,109,0.22)",
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
                onClick={() => setCurrentSlide(i)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0.4rem 0.875rem",
                  color: i === currentSlide ? gold : "rgba(240,233,223,0.3)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s",
                  borderBottom: i === currentSlide ? `1px solid ${goldFaint}` : "1px solid transparent",
                }}
              >
                {s.stepNum ? `STEP ${s.stepNum}` : "介紹"}
              </button>
            ))}
          </div>
        </div>
      </section>



      {/* ══ Section 5: CTA ══ */}
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

          {/* 主要 CTA 按鈕 */}
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
