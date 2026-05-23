/**
 * Crem.tsx — CRÈM蛋糕上桌預訂頁面（重整版）
 * 結構：Hero → 痛點 → 流程（橫向一目瞭然）→ 關於 CRÈM → CTA
 */
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
const CREM_LOGO_WHITE = "/manus-storage/crem-hero-user_bced4f58.webp";
const CREM_HERO_BG = "/manus-storage/crem-hero-new_b33a4ac5.jpg";

// 痛點清單
const PAIN_POINTS = [
  { icon: "×", text: "壽星在旁，還要偷偷準備" },
  { icon: "×", text: "花費交通、時間取蛋糕" },
  { icon: "×", text: "怕蛋糕撞壞或融化變形" },
  { icon: "×", text: "取貨時間對不上，行程亂掉" },
  { icon: "×", text: "一邊吃飯還要偷偷協調" },
  { icon: "×", text: "製造驚喜卻變成最忙的人" },
];

const STEPS_DATA = [
  {
    num: "01",
    title: "線上預訂座位",
    sub: "透過 Inline 線上預訂",
    desc: "訂位時備註需要蛋糕服務，我們會與您確認細節。",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.85)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "選擇蛋糕口味",
    sub: "4 / 6 / 8 吋任選",
    desc: "從 CRÈM 當季鮮奶油蛋糕系列中，挑選您心儀的口味與尺寸。",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.85)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "專車冷藏配送",
    sub: "準時送達餐廳",
    desc: "CRÈM 以專車冷藏配送，確保蛋糕完美抵達，無需您親自取件。",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.85)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "專人安排上桌",
    sub: "驚喜完美呈現",
    desc: "由初衷小鹿服務人員在適當時機，為您安排蛋糕上桌儀式。",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.85)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
];

export default function Crem() {
  const { t } = useLanguage();
  const refHero = useFadeIn(0.05);
  const refPain = useFadeIn(0.1);
  const refSteps = useFadeIn(0.08);
  const refAbout = useFadeIn(0.1);
  const refCTA = useFadeIn(0.1);

  return (
    <main
      style={{
        paddingTop: "80px",
        backgroundColor: "var(--deer-dark)",
        minHeight: "100vh",
      }}
    >
      {/* ── Section 1: Hero 橫幅（單張圖 + 品牌 Logo + 主標題）── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* 背景圖 */}
        <div
          style={{
            position: "relative",
            height: "clamp(320px, 55vw, 600px)",
            overflow: "hidden",
          }}
        >
          <img
            src={CREM_HERO_BG}
            alt="CRÈM 蛋糕"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block",
            }}
          />
          {/* 漸層遮罩 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,8,7,0.2) 0%, rgba(10,8,7,0.5) 60%, rgba(10,8,7,0.85) 100%)",
            }}
          />
          {/* 疊加在圖片上的 CRÈM Logo */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(0.75rem, 3vw, 2rem)",
            }}
          >
            <img
              src={DEER_LOGO}
              alt="初衷小鹿"
              style={{ height: "clamp(36px, 6vw, 52px)", width: "auto", objectFit: "contain", opacity: 0.9 }}
            />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)",
                color: "rgba(197,151,109,0.6)",
                lineHeight: 1,
              }}
            >
              ×
            </span>
            <img
              src={CREM_LOGO_WHITE}
              alt="CRÈM"
              style={{ height: "clamp(36px, 6vw, 52px)", width: "auto", objectFit: "contain", opacity: 0.9 }}
            />
          </div>
        </div>

        {/* 主標題文字區 */}
        <div ref={refHero} className="fade-up" style={{ textAlign: "center", padding: "3rem 1.5rem 4rem" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(197,151,109,0.5)",
              marginBottom: "1rem",
            }}
          >
            {t("crem.banner.label")}
          </p>
          <h1
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.08em",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
            }}
          >
            {t("crem.banner.title")}
          </h1>
          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 300,
              fontSize: "0.875rem",
              color: "rgba(240,233,223,0.4)",
              lineHeight: 2,
              letterSpacing: "0.06em",
            }}
          >
            {t("crem.banner.desc").split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
        </div>
      </section>

      {/* ── Section 2: 痛點區塊 ── */}
      <section
        style={{
          padding: "5rem 0",
          borderTop: "1px solid rgba(197,151,109,0.1)",
          backgroundColor: "rgba(10,8,7,0.5)",
        }}
      >
        <div className="container">
          <div ref={refPain} className="fade-up">
            {/* 標題 */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.5)",
                  marginBottom: "0.75rem",
                }}
              >
                慶祝蛋糕 × 餐廳
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.08em",
                  lineHeight: 1.5,
                  marginBottom: "0.75rem",
                }}
              >
                一條龍預定服務
              </h2>
              <p
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.9375rem",
                  color: "rgba(240,233,223,0.45)",
                  lineHeight: 1.9,
                  letterSpacing: "0.04em",
                }}
              >
                想在重要的日子好好慶祝，<br />
                卻總是被這些事情打亂？
              </p>
            </div>

            {/* 痛點格子 2 欄 */}
            <div className="crem-pain-grid">
              {PAIN_POINTS.map((point, i) => (
                <div key={i} className="crem-pain-item">
                  <span className="crem-pain-x">×</span>
                  <span className="crem-pain-text">{point.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: 預訂流程（橫向一目瞭然）── */}
      <section
        style={{
          padding: "5rem 0",
          borderTop: "1px solid rgba(197,151,109,0.1)",
        }}
      >
        <div className="container">
          <div ref={refSteps} className="fade-up">
            {/* 標題 */}
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p
                className="font-label mb-4"
                style={{ color: "rgba(197,151,109,0.6)" }}
              >
                {t("crem.steps.label")}
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
                {t("crem.steps.title").split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
            </div>

            {/* 流程橫向排列（桌機 4 欄 / 手機 2 欄）*/}
            <div className="crem-steps-grid">
              {STEPS_DATA.map((step, i) => (
                <div key={step.num} className="crem-step-card">
                  {/* 圓形編號 */}
                  <div className="crem-step-circle">
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
                  {/* 連接線（桌機版，最後一個不顯示）*/}
                  {i < STEPS_DATA.length - 1 && (
                    <div className="crem-step-connector" aria-hidden="true" />
                  )}
                  {/* 圖示 */}
                  <div style={{ marginBottom: "1rem", opacity: 0.9 }}>{step.icon}</div>
                  {/* 標題 */}
                  <h3
                    style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontWeight: 300,
                      fontSize: "1rem",
                      color: "var(--deer-dark-text)",
                      letterSpacing: "0.08em",
                      marginBottom: "0.4rem",
                      textAlign: "center",
                    }}
                  >
                    {step.title}
                  </h3>
                  {/* 副標 */}
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.72rem",
                      color: "rgba(197,151,109,0.65)",
                      letterSpacing: "0.08em",
                      textAlign: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.sub}
                  </p>
                  {/* 說明 */}
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(240,233,223,0.4)",
                      lineHeight: 1.9,
                      letterSpacing: "0.04em",
                      textAlign: "center",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 底部提示 */}
            <p
              style={{
                textAlign: "center",
                marginTop: "2.5rem",
                fontSize: "0.78rem",
                color: "rgba(197,151,109,0.4)",
                letterSpacing: "0.1em",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {t("crem.steps.hint")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: 關於 CRÈM ── */}
      <section
        style={{
          padding: "5rem 0",
          borderTop: "1px solid rgba(197,151,109,0.1)",
          backgroundColor: "rgba(10,8,7,0.4)",
        }}
      >
        <div className="container">
          <div
            ref={refAbout}
            className="fade-up crem-about-layout"
          >
            {/* 左側文字 */}
            <div className="crem-about-text">
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
                {t("crem.about.label")}
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
                {t("crem.about.title")}
              </h2>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  backgroundColor: "rgba(197,151,109,0.5)",
                  marginBottom: "1.75rem",
                }}
              />
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
                {t("crem.about.desc1").split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
              <p
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(240,233,223,0.35)",
                  lineHeight: 2.1,
                  letterSpacing: "0.05em",
                  marginBottom: "2rem",
                }}
              >
                {t("crem.about.desc2").split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
              <a
                href="https://crem.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-deer-light"
                style={{ display: "inline-block", fontSize: "0.8rem" }}
              >
                {t("crem.about.btn")}
              </a>
            </div>

            {/* 右側 Logo 裝飾 */}
            <div className="crem-about-logo-wrap">
              <img
                src={CREM_LOGO_WHITE}
                alt="CRÈM"
                style={{
                  width: "clamp(120px, 20vw, 200px)",
                  height: "auto",
                  objectFit: "contain",
                  opacity: 0.12,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: CTA ── */}
      <section
        ref={refCTA}
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
            {t("crem.cta.title").split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
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
              {t("crem.cta.btn1")}
            </a>
            <a
              href="https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97"
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
              {t("crem.cta.btn2")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
