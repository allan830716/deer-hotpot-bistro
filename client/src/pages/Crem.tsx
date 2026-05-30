/*
 * CRÈM 蛋糕上桌預訂頁面 (v8 — 靜態圖片版)
 * ─────────────────────────────────────────────
 * 修正：移除輪播，預訂方式改為靜態圖片呈現
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

// ── 圖片 CDN 路徑 ──────────────────────────────────────────────────────────
const DEER_LOGO = "/manus-storage/deer-logo-white_a35020cd.webp";
const HERO_IMG = "/manus-storage/crem-hero-new_b5d70f72.jpg";
const CREM_LOGO = "/manus-storage/crem-logo-white_f9b62a3f.webp";
const ORDER_GUIDE_IMG = "/manus-storage/crem-order-guide_bdd840ee.webp";

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

export default function Crem() {
  const refService = useFadeIn(0.08);
  const refOrder = useFadeIn(0.08);
  const refCta = useFadeIn(0.1);

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
        }
        @media (min-width: 768px) {
          .crem-flow-mobile { display: none !important; }
          .crem-flow-desktop { display: flex !important; }
        }
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
          <img src={DEER_LOGO} alt="初衷小鹿" style={{ height: "clamp(56px, 9vw, 88px)", width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "rgba(197,151,109,0.4)", lineHeight: 1 }}>×</span>
          <img src={CREM_LOGO} alt="CRÈM" style={{ height: "clamp(56px, 9vw, 88px)", width: "auto", objectFit: "contain" }} />
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
          <p style={{ color: textSub, fontSize: "0.9rem", lineHeight: 2, letterSpacing: "0.06em", maxWidth: "520px", margin: "0 auto" }}>
            由兩個品牌共創一場慶祝的完整設計。從餐桌到蛋糕，讓每個重要時刻都更加完整。
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
                想在重要的日子好好慶祝，<br />卻總是被這些事情打亂？
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

              {/* 電腦版：橫向排列 */}
              <div className="crem-flow-desktop" style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 0,
              }}>
                {FLOW_STEPS.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
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

      {/* ══ Section 3: 預訂方式（靜態圖片）══ */}
      <section style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(197,151,109,0.1)", backgroundColor: "#090706" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div ref={refOrder} className="fade-up">

            {/* 標題 */}
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>How To Order</p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em" }}>
                預訂方式
              </h2>
            </div>

            {/* 靜態圖片 */}
            <div style={{ width: "100%", lineHeight: 0 }}>
              <img
                src={ORDER_GUIDE_IMG}
                alt="CRÈM 預訂方式 — 專屬慶祝流程"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
              />
            </div>

            {/* CTA 按鈕 */}
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <a
                href="https://www.crem.tw/collections/%E5%88%9D%E8%A1%B7%E5%B0%8F%E9%B9%BF-x-cr%C3%A8m"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(197,151,109,0.15)",
                  border: "1px solid rgba(197,151,109,0.75)",
                  color: gold,
                  padding: "0.85rem 2.5rem",
                  fontSize: "0.82rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(197,151,109,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(197,151,109,0.15)")}
              >
                立即前往預訂
              </a>
            </div>

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
            開始預訂您的專屬「慶祝服務」
          </h2>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <a
              href="https://www.crem.tw/collections/%E5%88%9D%E8%A1%B7%E5%B0%8F%E9%B9%BF-x-cr%C3%A8m"
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
