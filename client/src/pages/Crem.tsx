/**
 * Crem.tsx — CRÈM蛋糕上桌預訂頁面
 * 介紹 CRÈM 品牌、聯名服務流程，並提供連結至 crem.tw
 */
import { useEffect, useRef } from "react";

function useFadeIn(threshold = 0.15) {
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

const DEER_LOGO = "/manus-storage/deer-logo-white_a35020cd.webp";
const CREM_LOGO = "/manus-storage/crem-logo-white_f9b62a3f.webp";
const CREM_IMG  = "/manus-storage/crem-cake-carnation_bf93218f.jpg";
const CREM_INTERIOR = "/manus-storage/crem-interior_2c8fe91b.webp";

const STEPS = [
  {
    num: "01",
    title: "預訂座位",
    desc: "透過 Inline 線上預訂初衷小鹿，備註慶祝人姓名與就餐時段。",
  },
  {
    num: "02",
    title: "選擇蛋糕",
    desc: "前往 CRÈM 官網（crem.tw）挑選專屬慶祝蛋糕，備註初衷小鹿訂位資訊。",
  },
  {
    num: "03",
    title: "小鹿代勞",
    desc: "我們全程跟進 CRÈM 確認，確保蛋糕在對的時間準時就位。",
  },
  {
    num: "04",
    title: "餐桌驚喜",
    desc: "餐後蛋糕登場，不需擔心任何事，只需就座享受這場慶祝。",
  },
];

export default function Crem() {
  const ref1 = useFadeIn(0.1);
  const ref2 = useFadeIn(0.1);
  const ref3 = useFadeIn(0.1);
  const ref4 = useFadeIn(0.1);

  return (
    <main
      style={{
        paddingTop: "80px",
        backgroundColor: "var(--deer-dark)",
        minHeight: "100vh",
      }}
    >
      {/* ── 聯名橫幅 ── */}
      <section
        style={{
          padding: "5rem 0 4rem",
          borderBottom: "1px solid rgba(197,151,109,0.12)",
        }}
      >
        <div className="container">
          <div
            ref={ref1}
            className="fade-up"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "2.5rem",
            }}
          >
            {/* Logo 並排 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(1.5rem, 5vw, 4rem)",
              }}
            >
              <img
                src={DEER_LOGO}
                alt="初衷小鹿 Logo"
                style={{
                  height: "clamp(64px, 10vw, 100px)",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  color: "rgba(197,151,109,0.9)",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}
              >
                ×
              </span>
              <img
                src={CREM_LOGO}
                alt="CRÈM Logo"
                style={{
                  height: "clamp(64px, 10vw, 100px)",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.55)",
                  marginBottom: "1rem",
                }}
              >
                Exclusive Collaboration
              </p>
              <h1
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.08em",
                  lineHeight: 1.5,
                  marginBottom: "1.5rem",
                }}
              >
                CRÈM蛋糕上桌預訂
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.55)",
                  marginBottom: "1.5rem",
                }}
              >
                × CRÈM 聯名共創
              </p>
              <p
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.9375rem",
                  color: "rgba(240,233,223,0.45)",
                  lineHeight: 2,
                  letterSpacing: "0.06em",
                  maxWidth: "480px",
                  margin: "0 auto",
                }}
              >
                由兩個品牌共創一場慶祝的完整設計。
                <br />
                從餐桌到蛋糕，讓每個重要時刻都更加完整。
              </p>
            </div>
          </div>
        </div>
        {/* 聯名圖 — 初衷小鹿 × CRÈM */}
        <div style={{ overflow: "hidden" }}>
          <img
            src={CREM_IMG}
            alt="初衷小鹿 × CRÈM 聯名"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              backgroundColor: "var(--deer-dark)",
            }}
          />
        </div>
      </section>

      {/* ── 關於 CRÈM ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 6vw, 6rem)",
              alignItems: "start",
            }}
            className="crem-about-grid"
          >
            <div ref={ref2} className="fade-up">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.55)",
                  marginBottom: "1.25rem",
                }}
              >
                About CRÈM
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.5,
                  marginBottom: "1.5rem",
                }}
              >
                座落台北信義區的
                <br />
                奶油甜點專賣店
              </h2>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  backgroundColor: "rgba(197,151,109,0.5)",
                  marginBottom: "1.75rem",
                }}
              />
              {/* 室內裝潢圖 — 移到主標下方、敘述上方 */}
              <div ref={ref3} className="fade-up" style={{ overflow: "hidden", marginBottom: "1.75rem" }}>
                <img
                  src={CREM_INTERIOR}
                  alt="CRÈM 室內空間"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    transition: "transform 0.8s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(240,233,223,0.5)",
                  lineHeight: 2.1,
                  letterSpacing: "0.05em",
                  marginBottom: "1.5rem",
                }}
              >
                CRÈM 專注於創作高品質的奶油甜點，圍繞著「鮮奶油 & 奶油」這核心食材。
                通過對奶油的深入研究，將不同原物料與奶油搭配，創造出每一款奶油甜點的味覺平衡與極致風味。
              </p>
              <p
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(240,233,223,0.35)",
                  lineHeight: 2.1,
                  letterSpacing: "0.05em",
                }}
              >
                對 CRÈM 來說，奶油的選擇並非一味追求頂級，而是以對奶油的專業了解，
                發掘其與其他食材的完美相容性，讓顧客能在一口之間感受細膩與豐富的層次。
              </p>
              <a
                href="https://crem.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-deer-light"
                style={{
                  display: "inline-block",
                  marginTop: "2.5rem",
                  fontSize: "0.8rem",
                }}
              >
                前往 CRÈM 官網
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── 分隔線 ── */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(197,151,109,0.2), transparent)",
          margin: "0 2rem",
        }}
      />

      {/* ── 預訂流程圖 ── */}
      <section style={{ padding: "6rem 0", backgroundColor: "rgba(10,8,7,0.4)" }}>
        <div className="container">
          <div ref={ref4} className="fade-up">
            {/* 標題 */}
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                className="font-label mb-4"
                style={{ color: "rgba(197,151,109,0.6)" }}
              >
                How It Works
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.7,
                }}
              >
                四個步驟，
                <br />
                完成一場完整的慶祝。
              </h2>
            </div>

            {/* 流程圖：桌機橫向 / 手機縱向 */}
            <div className="crem-flow-wrapper">
              {STEPS.map((step, i) => (
                <div key={step.num} className="crem-flow-item-group">
                  {/* 步驟卡片 */}
                  <div className="crem-flow-card">
                    {/* 圓形編號 */}
                    <div className="crem-flow-circle">
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 400,
                          fontSize: "1rem",
                          color: "var(--deer-gold)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {step.num}
                      </span>
                    </div>
                    {/* 圖示 */}
                    <div className="crem-flow-icon">
                      {i === 0 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                      )}
                      {i === 1 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                      )}
                      {i === 2 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      )}
                      {i === 3 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      )}
                    </div>
                    {/* 標題 */}
                    <h3
                      style={{
                        fontFamily: "'Noto Serif TC', serif",
                        fontWeight: 300,
                        fontSize: "1.0625rem",
                        color: "var(--deer-dark-text)",
                        letterSpacing: "0.1em",
                        marginBottom: "0.75rem",
                        textAlign: "center",
                      }}
                    >
                      {step.title}
                    </h3>
                    {/* 說明 */}
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "rgba(240,233,223,0.45)",
                        lineHeight: 1.9,
                        letterSpacing: "0.04em",
                        textAlign: "center",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                  {/* 箭頭連線（最後一個不顯示） */}
                  {i < STEPS.length - 1 && (
                    <div className="crem-flow-arrow" aria-hidden="true">
                      <svg className="crem-flow-arrow-h" width="48" height="16" viewBox="0 0 48 16" fill="none">
                        <line x1="0" y1="8" x2="38" y2="8" stroke="rgba(197,151,109,0.35)" strokeWidth="1"/>
                        <polyline points="34,4 42,8 34,12" fill="none" stroke="rgba(197,151,109,0.55)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <svg className="crem-flow-arrow-v" width="16" height="48" viewBox="0 0 16 48" fill="none">
                        <line x1="8" y1="0" x2="8" y2="38" stroke="rgba(197,151,109,0.35)" strokeWidth="1"/>
                        <polyline points="4,34 8,42 12,34" fill="none" stroke="rgba(197,151,109,0.55)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 底部提示 */}
            <p
              style={{
                textAlign: "center",
                marginTop: "3rem",
                fontSize: "0.8rem",
                color: "rgba(197,151,109,0.4)",
                letterSpacing: "0.1em",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              全程由初衷小鹿協助溝通，您只需安心就座。
            </p>
          </div>
        </div>
      </section>

            {/* ── CTA ── */}
      <section
        style={{
          padding: "6rem 0",
          textAlign: "center",
          borderTop: "1px solid rgba(197,151,109,0.1)",
          backgroundColor: "rgba(10,8,7,0.3)",
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.1em",
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}
          >
            準備好讓這場慶祝
            <br />
            更加完整了嗎？
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-deer-light"
              style={{ fontSize: "0.8rem" }}
            >
              預約初衷小鹿
            </a>
            <a
              href="https://crem.tw"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "0.85rem 2.5rem",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.8rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(197,151,109,0.7)",
                border: "1px solid rgba(197,151,109,0.3)",
                textDecoration: "none",
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(197,151,109,1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.7)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(197,151,109,0.7)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.3)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              前往 CRÈM 選蛋糕
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .crem-about-grid {
            grid-template-columns: 1fr !important;
          }
          .crem-about-grid img {
            width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
          }
        }
      `}</style>
    </main>
  );
}
