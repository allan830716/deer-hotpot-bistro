/**
 * Crem.tsx — CRÈM蛋糕上桌預訂頁面（全面重製版）
 * 設計：暗色系 · 痛點區塊 · 流程設計 · 蛋糕商品展示
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
const CREM_LOGO = "/manus-storage/crem-logo-white_f9b62a3f.webp";
const CREM_HERO = "/manus-storage/crem-hero-new_b33a4ac5.jpg";
const CREM_INTERIOR = "/manus-storage/crem-interior_2c8fe91b.webp";

// 目前供應的 CRÈM 蛋糕商品（2026年5-6月）
const CREM_CAKES = [
  {
    name: "Éternel 精品收藏級花禮",
    badge: "浪漫限定",
    price: "NT$ 3,380",
    period: "",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#C5976D",
  },
  {
    name: "茉莉烏龍・紅心芭樂",
    badge: "5/16–5/31",
    price: "NT$ 1,380–3,580",
    period: "限量供應",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#8BAF7A",
  },
  {
    name: "伯爵・秋翠",
    badge: "5/16–5/31",
    price: "NT$ 880–2,580",
    period: "限量供應",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#7A9E8B",
  },
  {
    name: "純粹・白",
    badge: "5/16–6/15",
    price: "NT$ 960–1,680",
    period: "限量供應",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#D4C5B0",
  },
  {
    name: "純粹・香密",
    badge: "5/16–5/31",
    price: "NT$ 1,280–3,380",
    period: "限量供應",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#C9A96E",
  },
  {
    name: "紅烏龍無花果",
    badge: "5/16–6/15",
    price: "NT$ 1,180–2,880",
    period: "限量供應",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#A0785A",
  },
  {
    name: "藍莓・薰衣草",
    badge: "6/1–6/15",
    price: "NT$ 1,280–3,280",
    period: "限量供應",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#8B7FA8",
  },
  {
    name: "純粹・芒果",
    badge: "6/1–6/15",
    price: "NT$ 1,380–3,480",
    period: "限量供應",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#D4A04A",
  },
  {
    name: "伯爵・愛文",
    badge: "6/1–6/15",
    price: "NT$ 960–2,780",
    period: "限量供應",
    url: "https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97",
    color: "#B8956A",
  },
];

// 痛點清單
const PAIN_POINTS = [
  "壽星在旁，還要偷偷準備",
  "花費交通、時間取蛋糕",
  "怕蛋糕撞壞或融化變形",
  "取貨時間對不上，行程亂掉",
  "一邊吃飯還要偷偷協調",
  "製造驚喜卻變成最忙的人",
];

export default function Crem() {
  const { t } = useLanguage();
  const refHero = useFadeIn(0.05);
  const refPain = useFadeIn(0.1);
  const refSteps = useFadeIn(0.1);
  const refCakes = useFadeIn(0.1);
  const refAbout = useFadeIn(0.1);
  const refCTA = useFadeIn(0.1);

  const STEPS = [
    {
      num: "01",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      title: t("crem.step1.title"),
      desc: t("crem.step1.desc"),
      sub: "透過 Inline 線上預訂",
    },
    {
      num: "02",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l3 3"/>
        </svg>
      ),
      title: t("crem.step2.title"),
      desc: t("crem.step2.desc"),
      sub: "線上選口味 4/6/8 吋",
    },
    {
      num: "03",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="1"/>
          <path d="M16 8h4l3 3v5h-7V8z"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      title: t("crem.step3.title"),
      desc: t("crem.step3.desc"),
      sub: "專車冷藏配送",
    },
    {
      num: "04",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(197,151,109,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: t("crem.step4.title"),
      desc: t("crem.step4.desc"),
      sub: "專人安排上桌",
    },
  ];

  return (
    <main
      style={{
        paddingTop: "80px",
        backgroundColor: "var(--deer-dark)",
        minHeight: "100vh",
      }}
    >
      {/* ── 頂部橫幅：雙圖並排 + 標題 ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* 雙圖並排橫幅 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            height: "clamp(300px, 50vw, 560px)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <img
              src={CREM_HERO}
              alt="CRÈM 蛋糕"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
          <div style={{ overflow: "hidden" }}>
            <img
              src={CREM_INTERIOR}
              alt="CRÈM 包裝開箱"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* 品牌 Logo 列 */}
        <div
          style={{
            padding: "2rem 0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1rem, 4vw, 3rem)",
          }}
        >
          <img
            src={DEER_LOGO}
            alt="初衷小鹿"
            style={{ height: "clamp(40px, 7vw, 64px)", width: "auto", objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              color: "rgba(197,151,109,0.7)",
              lineHeight: 1,
            }}
          >
            ×
          </span>
          <img
            src={CREM_LOGO}
            alt="CRÈM"
            style={{ height: "clamp(40px, 7vw, 64px)", width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* 主標題 */}
        <div ref={refHero} className="fade-up" style={{ textAlign: "center", padding: "0 1.5rem 4rem" }}>
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
              marginBottom: "1rem",
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

      {/* ── 痛點區塊 ── */}
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
            <div style={{ marginBottom: "3rem" }}>
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
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.08em",
                  lineHeight: 1.5,
                  marginBottom: "1rem",
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

            {/* 痛點格子 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.75rem",
                marginBottom: "0",
              }}
            >
              {PAIN_POINTS.map((point, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1rem 1.25rem",
                    border: "1px solid rgba(197,151,109,0.15)",
                    borderRadius: "4px",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(197,151,109,0.5)",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </span>
                  <span
                    style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontWeight: 300,
                      fontSize: "clamp(0.75rem, 2.2vw, 0.875rem)",
                      color: "rgba(240,233,223,0.55)",
                      letterSpacing: "0.03em",
                      lineHeight: 1.5,
                    }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 預訂流程 ── */}
      <section
        style={{
          padding: "5rem 0",
          borderTop: "1px solid rgba(197,151,109,0.1)",
        }}
      >
        <div className="container">
          <div ref={refSteps} className="fade-up">
            {/* 標題 */}
            <div style={{ marginBottom: "3rem" }}>
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

            {/* 流程卡片：桌機橫向 / 手機縱向 */}
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
                    <div className="crem-flow-icon">{step.icon}</div>
                    {/* 標題 */}
                    <h3
                      style={{
                        fontFamily: "'Noto Serif TC', serif",
                        fontWeight: 300,
                        fontSize: "1.0625rem",
                        color: "var(--deer-dark-text)",
                        letterSpacing: "0.1em",
                        marginBottom: "0.5rem",
                        textAlign: "center",
                      }}
                    >
                      {step.title}
                    </h3>
                    {/* 副標 */}
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.75rem",
                        color: "rgba(197,151,109,0.6)",
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
                  {/* 箭頭連線 */}
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
              {t("crem.steps.hint")}
            </p>
          </div>
        </div>
      </section>

      {/* ── 蛋糕商品展示 ── */}
      <section
        style={{
          padding: "5rem 0",
          borderTop: "1px solid rgba(197,151,109,0.1)",
          backgroundColor: "rgba(10,8,7,0.4)",
        }}
      >
        <div className="container">
          <div ref={refCakes} className="fade-up">
            {/* 標題 */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.5)",
                  marginBottom: "0.75rem",
                }}
              >
                Current Menu
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.6,
                  marginBottom: "0.75rem",
                }}
              >
                本季供應蛋糕
              </h2>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(240,233,223,0.35)",
                  letterSpacing: "0.04em",
                  lineHeight: 1.8,
                }}
              >
                以下為 CRÈM 目前開放預訂的鮮奶油蛋糕系列，點擊可前往 CRÈM 官網選購。
              </p>
            </div>

            {/* 商品格子 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                backgroundColor: "rgba(197,151,109,0.1)",
                border: "1px solid rgba(197,151,109,0.1)",
              }}
              className="crem-cakes-grid"
            >
              {CREM_CAKES.map((cake, i) => (
                <a
                  key={i}
                  href={cake.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.5rem 1.25rem",
                    backgroundColor: "rgba(10,8,7,0.8)",
                    textDecoration: "none",
                    transition: "background-color 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(10,8,7,0.8)";
                  }}
                >
                  {/* 色彩指示條 */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "3px",
                      height: "100%",
                      backgroundColor: cake.color,
                      opacity: 0.6,
                    }}
                  />
                  {/* 供應期徽章 */}
                  <div style={{ marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        color: "rgba(197,151,109,0.65)",
                        backgroundColor: "rgba(197,151,109,0.08)",
                        padding: "0.2rem 0.5rem",
                        border: "1px solid rgba(197,151,109,0.2)",
                        display: "inline-block",
                      }}
                    >
                      {cake.badge}
                    </span>
                  </div>
                  {/* 蛋糕名稱 */}
                  <h3
                    style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontWeight: 300,
                      fontSize: "clamp(0.875rem, 2vw, 1rem)",
                      color: "var(--deer-dark-text)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.5,
                      marginBottom: "0.5rem",
                      flex: 1,
                    }}
                  >
                    {cake.name}
                  </h3>
                  {/* 價格 */}
                  <div style={{ marginTop: "auto" }}>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 400,
                        fontSize: "0.875rem",
                        color: "rgba(197,151,109,0.8)",
                        letterSpacing: "0.05em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {cake.price}
                    </p>
                    {cake.period && (
                      <p
                        style={{
                          fontFamily: "'Noto Serif TC', serif",
                          fontSize: "0.7rem",
                          color: "rgba(240,233,223,0.3)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {cake.period}
                      </p>
                    )}
                    {/* 箭頭 */}
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.7rem",
                        color: "rgba(197,151,109,0.4)",
                        letterSpacing: "0.1em",
                        marginTop: "0.5rem",
                      }}
                    >
                      前往選購 →
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* 查看全部按鈕 */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
                View All Cakes at CRÈM →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 關於 CRÈM ── */}
      <section
        style={{
          padding: "5rem 0",
          borderTop: "1px solid rgba(197,151,109,0.1)",
        }}
      >
        <div className="container">
          <div
            ref={refAbout}
            className="fade-up"
            style={{ maxWidth: "680px" }}
          >
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
              style={{
                display: "inline-block",
                marginTop: "2.5rem",
                fontSize: "0.8rem",
              }}
            >
              {t("crem.about.btn")}
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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

      <style>{`
        /* ── 蛋糕商品格子：手機版改為 2 欄 ── */
        @media (max-width: 640px) {
          .crem-cakes-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* ── 手機版痛點格子：保持 2 欄但縮小 padding ── */
        @media (max-width: 480px) {
          .crem-cakes-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
