/*
 * CRÈM 蛋糕上桌預訂頁面 (v10)
 * ─────────────────────────────────────────────
 * 新增功能：
 *   1. 流程圖步驟 Hover 效果（圖示發光 + 文字上移 + 邊框高亮）
 *   2. Before/After 互動式 Slider（拖拉分割線）
 *   3. CTA 按鈕視覺優化（金色漸層背景 + 光暈效果）
 */
import { useEffect, useRef } from "react";

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

// ── 圖片路徑 ────────────────────────────────────────────────────────────────
const DEER_LOGO       = "/manus-storage/deer-logo-white_a35020cd.webp";
const HERO_IMG        = "/manus-storage/crem-hero-new_b5d70f72.jpg";
const CREM_LOGO       = "/manus-storage/crem-logo-white_f9b62a3f.webp";
const ORDER_GUIDE_IMG = "/manus-storage/crem-order-guide_bdd840ee.webp";

// ── 流程步驟 ────────────────────────────────────────────────────────────────
const FLOW_STEPS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <rect x="6" y="8" width="28" height="24" rx="2"/>
        <path d="M13 8V5M27 8V5M6 16h28" strokeLinecap="round"/>
        <circle cx="20" cy="26" r="3"/>
      </svg>
    ),
    step: "01",
    zh: "線上選口味",
    sub: "4 / 6 / 8 吋\n快速預訂",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <rect x="6" y="10" width="28" height="22" rx="2"/>
        <path d="M6 18h28" strokeLinecap="round"/>
        <path d="M20 22v6M17 24l3-2 3 2M17 26l3 2 3-2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 10V7M27 10V7" strokeLinecap="round"/>
      </svg>
    ),
    step: "02",
    zh: "冷藏配送到店",
    sub: "低溫冷藏\n省去取貨",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <circle cx="20" cy="9" r="4"/>
        <path d="M12 34v-8a8 8 0 0116 0v8" strokeLinecap="round"/>
        <path d="M10 22h20" strokeLinecap="round"/>
        <circle cx="20" cy="22" r="2" fill="rgba(197,151,109,0.5)" stroke="none"/>
      </svg>
    ),
    step: "03",
    zh: "專人安排上桌",
    sub: "蠟燭 / 擺盤\n時機提前安排",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
        <path d="M20 33s-14-9-14-18a8 8 0 0114-5.2A8 8 0 0134 15c0 9-14 18-14 18z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    step: "04",
    zh: "把時間留給重要的人",
    sub: "剩下的\n交給我們",
  },
];

// ── 痛點對比（靜態版）────────────────────────────────────────────────────
const CONTRASTS = [
  {
    before: "壽星在旁，還要偷偷協調",
    after:  "提前預訂，當天專心陪伴",
  },
  {
    before: "擔心取貨時間對不上",
    after:  "冷藏直送，不用親自取",
  },
  {
    before: "蠟燭、擺盤要自己張羅",
    after:  "專人安排，驚喜完整呈現",
  },
];

// ── Before/After 靜態對比列元件 ─────────────────────────────────────────────
function BeforeAfterStatic() {
  const gold = "rgba(197,151,109,1)";
  const textSub = "rgba(240,233,223,0.45)";
  return (
    <div>
      {/* 欄標題 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        marginBottom: "0.75rem",
        padding: "0 0.5rem",
      }}>
        <p style={{ color: "rgba(240,233,223,0.3)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" }}>Before</p>
        <span />
        <p style={{ color: gold, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" }}>After</p>
      </div>
      {/* 對比列 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {CONTRASTS.map((c, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "1fr 48px 1fr",
            alignItems: "center",
            border: "1px solid rgba(197,151,109,0.12)",
            borderRadius: "8px",
            overflow: "hidden",
          }}>
            {/* Before */}
            <div style={{
              padding: "1rem 1.25rem",
              backgroundColor: "rgba(255,255,255,0.015)",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{ color: "rgba(240,233,223,0.25)", fontSize: "1rem", flexShrink: 0, lineHeight: 1 }}>×</span>
              <span style={{ color: "rgba(240,233,223,0.4)", fontSize: "0.85rem", lineHeight: 1.6 }}>{c.before}</span>
            </div>
            {/* 箭頭 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(197,151,109,0.04)" }}>
              <svg viewBox="0 0 20 16" fill="none" style={{ width: "20px", height: "16px" }}>
                <line x1="0" y1="8" x2="14" y2="8" stroke="rgba(197,151,109,0.4)" strokeWidth="1.2"/>
                <path d="M11 4 L20 8 L11 12" stroke="rgba(197,151,109,0.6)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* After */}
            <div style={{
              padding: "1rem 1.25rem",
              backgroundColor: "rgba(197,151,109,0.05)",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{ color: gold, fontSize: "1rem", flexShrink: 0, lineHeight: 1 }}>✓</span>
              <span style={{ color: "rgba(240,233,223,0.85)", fontSize: "0.85rem", lineHeight: 1.6 }}>{c.after}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Crem() {
  const refFlow    = useFadeIn(0.08);
  const refWhy     = useFadeIn(0.08);
  const refOrder   = useFadeIn(0.08);
  const refCta     = useFadeIn(0.1);

  const gold      = "rgba(197,151,109,1)";
  const goldFaint = "rgba(197,151,109,0.5)";
  const textMain  = "#F0E9DF";
  const textSub   = "rgba(240,233,223,0.45)";

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "#0A0807", minHeight: "100vh" }}>

      {/* 全域 CSS */}
      <style>{`
        @media (max-width: 767px) {
          .crem-flow-desktop { display: none !important; }
          .crem-flow-mobile  { display: flex !important; }
        }
        @media (min-width: 768px) {
          .crem-flow-mobile  { display: none !important; }
          .crem-flow-desktop { display: flex !important; }
        }

        /* 流程圖步驟 Hover */
        .flow-step-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .flow-step-card:hover {
          transform: translateY(-6px);
          border-color: rgba(197,151,109,0.85) !important;
          box-shadow: 0 8px 28px rgba(197,151,109,0.18), 0 0 0 1px rgba(197,151,109,0.3);
        }
        .flow-step-card:hover .flow-icon {
          color: rgba(197,151,109,1) !important;
          filter: drop-shadow(0 0 8px rgba(197,151,109,0.6));
        }
        .flow-step-card:hover .flow-title {
          color: rgba(240,233,223,1) !important;
        }
        .flow-icon {
          color: rgba(197,151,109,0.9);
          transition: color 0.3s, filter 0.3s;
        }
        .flow-title {
          transition: color 0.3s;
        }

        /* CTA 按鈕 */
        .crem-cta-btn {
          position: relative;
          display: inline-block;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .crem-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(197,151,109,0.22) 0%, rgba(197,151,109,0.08) 50%, rgba(197,151,109,0.22) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .crem-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(197,151,109,0.35), 0 0 0 1px rgba(197,151,109,0.6);
        }
        .crem-cta-btn:hover::before {
          opacity: 1;
        }
        .crem-cta-btn:active {
          transform: translateY(0);
        }
      `}</style>

      {/* ══ Section 1: Hero ══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0A0807" }}>
        {/* 雙品牌 Logo 橫幅 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "clamp(1rem, 4vw, 2.5rem)",
          padding: "1.75rem 1.5rem 1.5rem",
          borderBottom: "1px solid rgba(197,151,109,0.1)",
        }}>
          <img src={DEER_LOGO} alt="初衷小鹿" style={{ height: "clamp(56px, 9vw, 88px)", width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "rgba(197,151,109,0.4)", lineHeight: 1 }}>×</span>
          <img src={CREM_LOGO} alt="CRÈM" style={{ height: "clamp(56px, 9vw, 88px)", width: "auto", objectFit: "contain" }} />
        </div>

        {/* 全寬 Hero 圖片 */}
        <div style={{ width: "100%", lineHeight: 0 }}>
          <img
            src={HERO_IMG}
            alt="CRÈM × 初衷小鹿 慶祝一條龍服務"
            style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "16/7" }}
          />
        </div>

        {/* 主標題 */}
        <div style={{ textAlign: "center", padding: "3rem 2rem 2.5rem", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
          <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            Exclusive Collaboration · <span style={{ whiteSpace: "nowrap" }}>慶祝蛋糕 × 餐廳</span>
          </p>
          <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.45, marginBottom: "1.25rem" }}>
            CRÈM 蛋糕上桌預訂
          </h1>
          <p style={{ color: textSub, fontSize: "0.9rem", lineHeight: 2, letterSpacing: "0.06em", maxWidth: "520px", margin: "0 auto" }}>
            由兩個品牌共創一場慶祝的完整設計。<br />從餐桌到蛋糕，讓每個重要時刻都更加完整。
          </p>
        </div>
      </section>

      {/* ══ Section 2: 一條龍服務是什麼（流程圖 + Hover）══════════════════ */}
      <section style={{ padding: "5rem 0 4.5rem", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
        <div className="container" style={{ maxWidth: "960px" }}>
          <div ref={refFlow} className="fade-up">
            <div style={{ marginBottom: "3rem" }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>How It Works</p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                一條龍預定服務
              </h2>
              <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 1.9 }}>從選蛋糕到上桌，全程由我們安排。</p>
            </div>

            {/* 電腦版：橫向 */}
            <div className="crem-flow-desktop" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 0 }}>
              {FLOW_STEPS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <div
                    className="flow-step-card"
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                      width: "clamp(110px, 20vw, 160px)",
                      padding: "1.5rem 0.75rem",
                      border: "1px solid rgba(197,151,109,0.14)",
                      borderRadius: "10px",
                      backgroundColor: "rgba(197,151,109,0.03)",
                    }}
                  >
                    <p style={{ color: gold, fontSize: "1.1rem", letterSpacing: "0.12em", marginBottom: "0.6rem", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>{s.step}</p>
                    <div className="flow-icon" style={{ marginBottom: "1rem" }}>{s.icon}</div>
                    <p className="flow-title" style={{ color: "rgba(240,233,223,0.85)", fontSize: "0.85rem", letterSpacing: "0.04em", marginBottom: "0.4rem", lineHeight: 1.4 }}>{s.zh}</p>
                    <p style={{ color: textSub, fontSize: "0.72rem", lineHeight: 1.65, whiteSpace: "pre-line" }}>{s.sub}</p>
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <div style={{ display: "flex", alignItems: "center", flexShrink: 0, paddingTop: "0" }}>
                      <svg viewBox="0 0 44 16" fill="none" style={{ width: "44px", height: "16px" }}>
                        <line x1="0" y1="8" x2="38" y2="8" stroke="rgba(197,151,109,0.4)" strokeWidth="1.2"/>
                        <path d="M35 4 L44 8 L35 12" stroke="rgba(197,151,109,0.6)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 手機版：垂直 */}
            <div className="crem-flow-mobile" style={{ display: "none", flexDirection: "column", gap: 0, maxWidth: "320px", margin: "0 auto" }}>
              {FLOW_STEPS.map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    className="flow-step-card"
                    style={{ display: "flex", alignItems: "center", gap: "1.25rem", width: "100%", padding: "0.75rem 1rem", border: "1px solid rgba(197,151,109,0.14)", borderRadius: "10px", backgroundColor: "rgba(197,151,109,0.03)", marginBottom: "0.5rem" }}
                  >
                    <div className="flow-icon" style={{ flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <p style={{ color: gold, fontSize: "1rem", letterSpacing: "0.12em", marginBottom: "0.2rem", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>{s.step}</p>
                      <p className="flow-title" style={{ color: "rgba(240,233,223,0.85)", fontSize: "0.9rem", letterSpacing: "0.04em", marginBottom: "0.25rem", lineHeight: 1.4 }}>{s.zh}</p>
                      <p style={{ color: textSub, fontSize: "0.75rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>{s.sub}</p>
                    </div>
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "0.1rem 0 0.6rem" }}>
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
      </section>

      {/* ══ Section 3: 為什麼選我們（互動式 Slider）══════════════════════ */}
      <section style={{ padding: "5rem 0 4.5rem", borderBottom: "1px solid rgba(197,151,109,0.1)", backgroundColor: "#090706" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <div ref={refWhy} className="fade-up">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Why This Service</p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                慶祝這件事，不該讓你最累
              </h2>
              <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 1.9 }}>
                不用再偷偷協調、不用擔心取貨時間、<br />不用讓壽星看到你在忙。
              </p>
            </div>
            <BeforeAfterStatic />
          </div>
        </div>
      </section>

      {/* ══ Section 4: 怎麼訂（靜態圖片）══════════════════════════════════ */}
      <section style={{ padding: "5rem 0 4.5rem", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div ref={refOrder} className="fade-up">
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>How To Order</p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em" }}>
                預訂方式
              </h2>
            </div>
            <div style={{ width: "100%", lineHeight: 0 }}>
              <img
                src={ORDER_GUIDE_IMG}
                alt="CRÈM 預訂方式 — 專屬慶祝流程"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ Section 5: CTA（視覺優化版）══════════════════════════════════ */}
      <section style={{ padding: "6rem 2rem", textAlign: "center", backgroundColor: "#0A0807", position: "relative", overflow: "hidden" }}>
        {/* 背景光暈裝飾 */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse at center, rgba(197,151,109,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div ref={refCta} className="fade-up" style={{ position: "relative" }}>
          <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Ready to Celebrate</p>
          <h2 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 200,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: textMain,
            letterSpacing: "0.08em",
            marginBottom: "0.75rem",
          }}>
            開始預訂您的專屬「慶祝服務」
          </h2>
          <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 1.9, marginBottom: "2.5rem" }}>
            從選蛋糕到上桌，我們幫你安排好每一個細節。
          </p>

          {/* 主 CTA 按鈕 */}
          <a
            href="https://www.crem.tw/collections/%E5%88%9D%E8%A1%B7%E5%B0%8F%E9%B9%BF-x-cr%C3%A8m"
            target="_blank"
            rel="noopener noreferrer"
            className="crem-cta-btn"
            style={{
              border: `1.5px solid ${gold}`,
              color: gold,
              padding: "1.1rem 3.5rem",
              fontSize: "0.85rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 300,
              background: "linear-gradient(135deg, rgba(197,151,109,0.12) 0%, rgba(197,151,109,0.05) 100%)",
              borderRadius: "2px",
            }}
          >
            前往 CRÈM 選蛋糕
          </a>

          {/* 備注 */}
          <p style={{ color: "rgba(240,233,223,0.3)", fontSize: "0.72rem", marginTop: "2rem", letterSpacing: "0.04em" }}>
            ＊預訂蛋糕請在 CRÈM 官網下單，請勿直接在初衷小鹿留言
          </p>
        </div>
      </section>
    </main>
  );
}
