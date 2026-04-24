/*
 * 初衷小鹿 — 獲獎殊榮／雜誌專訪 Awards.tsx
 * ─────────────────────────────────────────────
 * 設計語言：深色背景 var(--deer-dark) · 金色點綴 · 克制排版
 * 原則：獲獎是被動的榮耀，不主動推銷，以敘事帶出脈絡
 */

import { useEffect, useRef } from "react";

// ── CDN 圖片 ────────────────────────────────────────────────────────────────
const AWARDS_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/awards-hero-7jmxMSptfMLUhEkH6L3KK4.webp";
const AWARD_TAIWAN30 = "/manus-storage/award-taiwan30_286d027c.webp";
const AWARD_TAIPEI10_COLLAGE = "/manus-storage/award-taipei10-collage_8a9d2c22.webp";
const AWARD_TAIPEI10_TEAM = "/manus-storage/award-taipei10-team_9e26013a.webp";
const AWARD_TAIPEI10_SINGLE = "/manus-storage/award-taipei-top10_bcd1a47c.webp";
const PREMIUM_JUL_COVER = "/manus-storage/premium-jul-cover_db537d5f.webp";
const PREMIUM_JUL_INSIDE = "/manus-storage/premium-jul-inside_b77d482e.webp";
const PREMIUM_OCT_COVER = "/manus-storage/premium-oct-cover_485776b5.webp";
const PREMIUM_OCT_INSIDE = "/manus-storage/premium-oct-inside_1b5f8f99.webp";

// ── Intersection Observer Hook ────────────────────────────────────────────
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

function GoldLine({ width = 32 }: { width?: number }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "1px",
        backgroundColor: "rgba(197,151,109,0.6)",
        margin: "2rem 0",
      }}
    />
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(197,151,109,0.18), transparent)",
        margin: "0 2rem",
      }}
    />
  );
}

// ── 媒體連結資料 ─────────────────────────────────────────────────────────
const MEDIA_LINKS = [
  {
    pub: "Vogue Taiwan",
    title: "隱身巷弄的質感系鍋物",
    desc: "以熟成肉品、乾貨上湯與精緻甜點，打造有節奏感的餐桌體驗。",
    url: "https://www.vogue.com.tw/article/%E5%88%9D%E8%A1%B7%E5%B0%8F%E9%B9%BF-%E9%8D%8B%E7%89%A9",
    img: "/manus-storage/media-vogue_3d3c94b6.webp",
  },
  {
    pub: "工商時報",
    title: "台北鍋界大賽十強高質感鍋物，初衷小鹿如私房招待所",
    desc: "榮獲台北市政府 112 年「美食在台北・鍋際大賞」人氣票選 TOP 10。",
    url: "https://www.ctee.com.tw/news/20230930700224-431207",
    img: "/manus-storage/media-chinatimes_1b9ec7a4.png",
  },
  {
    pub: "ELLE",
    title: "台北大巨蛋美食攻略",
    desc: "信義區不可錯過的精緻鍋物選擇，適合商務宴客與特殊紀念日。",
    url: "https://www.elle.com.tw/life/foodie/g46059914/taipei-big-dome-foods/",
    img: "/manus-storage/media-elle_b69c8ed0.webp",
  },
  {
    pub: "旅讀 Or",
    title: "一鍋澄清的溫柔",
    desc: "日本頂級乾貨上湯，讓每一口都有它應有的位置。",
    url: "https://today.line.me/tw/v3/article/PG7PxnM",
    img: "/manus-storage/media-or_610baf69.webp",
  },
];

export default function Awards() {
  const ref1 = useFadeIn(0.1);
  const ref2 = useFadeIn(0.1);
  const ref3 = useFadeIn(0.1);
  const ref4 = useFadeIn(0.1);
  const ref5 = useFadeIn(0.1);
  const ref6 = useFadeIn(0.1);

  return (
    <main
      style={{
        paddingTop: "80px",
        backgroundColor: "var(--deer-dark)",
        minHeight: "100vh",
      }}
    >
      {/* ── Hero 首圖 ── */}
      <section
        style={{
          position: "relative",
          height: "45vh",
          minHeight: "280px",
          maxHeight: "480px",
          overflow: "hidden",
        }}
      >
        <img
          src={AWARDS_HERO}
          alt="獲獎殊榮"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,8,7,0.2) 0%, rgba(10,8,7,0.55) 100%)",
          }}
        />
      </section>
      {/* ── Hero ── */}
      <section style={{ padding: "6rem 0 4rem" }}>
        <div className="container">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(197,151,109,0.6)",
              marginBottom: "1.25rem",
            }}
          >
            Achievements &amp; Press
          </p>
          <h1
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.08em",
              lineHeight: 1.4,
              marginBottom: "1.5rem",
            }}
          >
            獲獎殊榮／雜誌專訪
          </h1>
          <div
            style={{
              width: "32px",
              height: "1px",
              backgroundColor: "rgba(197,151,109,0.5)",
              marginBottom: "2rem",
            }}
          />
          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 300,
              fontSize: "0.9375rem",
              color: "rgba(240,233,223,0.45)",
              lineHeight: 2,
              letterSpacing: "0.06em",
              maxWidth: "480px",
            }}
          >
            每一份認可，都是一個提醒——
            <br />
            讓我們繼續把每一場餐桌做得更好。
          </p>
        </div>
      </section>

      <Divider />

      {/* ── 2023 台北十強 ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div ref={ref1} className="fade-up">
            {/* 文字 */}
            <div style={{ maxWidth: "560px", marginBottom: "3rem" }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.5)",
                  marginBottom: "1.25rem",
                }}
              >
                2023 · 台北市府鍋物大賽
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.5,
                  marginBottom: "0.5rem",
                }}
              >
                2023 台北十強鍋物
              </h2>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(197,151,109,0.6)",
                  letterSpacing: "0.12em",
                  marginBottom: "2rem",
                }}
              >
                Taipei International Hotpot Awards — Top 10
              </p>
              <GoldLine />
              <p
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(240,233,223,0.5)",
                  lineHeight: 2,
                  letterSpacing: "0.05em",
                }}
              >
                在台北數百家鍋物餐廳中，以湯頭工藝、食材選品與整體用餐體驗，
                獲評審評選為年度十強之列。
              </p>
            </div>

            {/* 照片 — 單張 */}
            <div
              style={{
                maxWidth: "560px",
                overflow: "hidden",
                backgroundColor: "rgba(197,151,109,0.05)",
              }}
            >
              <img
                src={AWARD_TAIPEI10_SINGLE}
                alt="2023 台北十強鍋物 — 工商時報報導與台北市政府獎狀"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 2024 台灣 30 大 ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div
            ref={ref2}
            className="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "4rem",
              alignItems: "start",
              maxWidth: "860px",
              marginLeft: "auto",
            }}
          >
            {/* 獎狀圖 */}
            <div
              style={{
                width: "clamp(160px, 25vw, 280px)",
                aspectRatio: "3/4",
                overflow: "hidden",
                backgroundColor: "rgba(197,151,109,0.05)",
                flexShrink: 0,
              }}
            >
              <img
                src={AWARD_TAIWAN30}
                alt="2024 台灣 30 大鍋物 獎狀"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>

            {/* 文字 */}
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.5)",
                  marginBottom: "1.25rem",
                }}
              >
                2024 · 台北市府鍋物大賽
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.5,
                  marginBottom: "0.5rem",
                }}
              >
                2024 台灣 30 大鍋物
              </h2>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(197,151,109,0.6)",
                  letterSpacing: "0.12em",
                  marginBottom: "2rem",
                }}
              >
                Taiwan International Hotpot Awards — Top 30
              </p>
              <GoldLine />
              <p
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(240,233,223,0.5)",
                  lineHeight: 2,
                  letterSpacing: "0.05em",
                }}
              >
                從台北到全台，在更大的競技場中再次獲得評審認可，
                入選台灣年度三十大鍋物餐廳。
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 日本 &Premium 雜誌 ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div ref={ref3} className="fade-up">
            {/* 標題 */}
            <div style={{ maxWidth: "560px", marginBottom: "3rem" }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.5)",
                  marginBottom: "1.25rem",
                }}
              >
                2024 · &amp;Premium Japan
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.5,
                  marginBottom: "0.5rem",
                }}
              >
                日本生活品味雜誌《&amp;Premium》
              </h2>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(197,151,109,0.6)",
                  letterSpacing: "0.12em",
                  marginBottom: "2rem",
                }}
              >
                The Guide To A Better Life
              </p>
              <GoldLine />
              <p
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "rgba(240,233,223,0.5)",
                  lineHeight: 2,
                  letterSpacing: "0.05em",
                }}
              >
                以「美好生活指南」為核心概念的日本知名生活雜誌《&amp;Premium》，
                分別於 2024 年 7 月號及 10 月號兩度收錄初衷小鹿，
                作為台北值得一訪的品味餐廳代表。
              </p>
            </div>

            {/* 兩期雜誌並排 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "3rem",
              }}
            >
              {/* 7 月號 */}
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(197,151,109,0.45)",
                    marginBottom: "1rem",
                  }}
                >
                  July 2024
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "rgba(197,151,109,0.05)" }}>
                    <img
                      src={PREMIUM_JUL_COVER}
                      alt="&Premium 2024年7月號封面"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "rgba(197,151,109,0.05)" }}>
                    <img
                      src={PREMIUM_JUL_INSIDE}
                      alt="&Premium 2024年7月號內頁"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Noto Serif TC', serif",
                    fontWeight: 300,
                    fontSize: "0.8125rem",
                    color: "rgba(240,233,223,0.4)",
                    lineHeight: 1.8,
                    letterSpacing: "0.04em",
                  }}
                >
                  7 月號以台北美食為主題，
                  收錄初衷小鹿作為代表性品味餐廳。
                </p>
              </div>

              {/* 10 月號 */}
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(197,151,109,0.45)",
                    marginBottom: "1rem",
                  }}
                >
                  October 2024
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "rgba(197,151,109,0.05)" }}>
                    <img
                      src={PREMIUM_OCT_COVER}
                      alt="&Premium 2024年10月號封面"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "rgba(197,151,109,0.05)" }}>
                    <img
                      src={PREMIUM_OCT_INSIDE}
                      alt="&Premium 2024年10月號內頁"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Noto Serif TC', serif",
                    fontWeight: 300,
                    fontSize: "0.8125rem",
                    color: "rgba(240,233,223,0.4)",
                    lineHeight: 1.8,
                    letterSpacing: "0.04em",
                  }}
                >
                  10 月號再度收錄，
                  持續作為台北品味生活的推薦選擇。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 媒體報導 ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div ref={ref4} className="fade-up">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(197,151,109,0.5)",
                marginBottom: "1.25rem",
              }}
            >
              Press Coverage
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.1em",
                lineHeight: 1.5,
                marginBottom: "2rem",
              }}
            >
              媒體報導
            </h2>
            <GoldLine />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1.25rem",
                maxWidth: "860px",
              }}
            >
              {MEDIA_LINKS.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(197,151,109,0.15)",
                    backgroundColor: "rgba(197,151,109,0.04)",
                    textDecoration: "none",
                    transition: "border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(197,151,109,0.5)";
                    el.style.backgroundColor = "rgba(197,151,109,0.09)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(197,151,109,0.15)";
                    el.style.backgroundColor = "rgba(197,151,109,0.04)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {/* 報導截圖預覽 */}
                  {item.img && (
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.pub}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top center",
                          display: "block",
                          transition: "transform 0.5s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLImageElement).style.transform = "scale(1.04)";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLImageElement).style.transform = "scale(1)";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to bottom, transparent 50%, rgba(10,8,7,0.6) 100%)",
                        }}
                      />
                    </div>
                  )}
                  {/* 文字區 */}
                  <div style={{ padding: "1.25rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                    {/* 媒體名稱 badge + 箭頭 */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 500,
                          fontSize: "0.65rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--deer-gold)",
                          padding: "0.2rem 0.6rem",
                          border: "1px solid rgba(197,151,109,0.3)",
                          display: "inline-block",
                        }}
                      >
                        {item.pub}
                      </span>
                      <span style={{ color: "rgba(197,151,109,0.55)", fontSize: "0.85rem" }}>↗</span>
                    </div>
                    {/* 標題 */}
                    <p
                      style={{
                        fontFamily: "'Noto Serif TC', serif",
                        fontWeight: 300,
                        fontSize: "0.9rem",
                        color: "rgba(240,233,223,0.85)",
                        letterSpacing: "0.05em",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </p>
                    {/* 說明文字 */}
                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.775rem",
                          color: "rgba(240,233,223,0.4)",
                          lineHeight: 1.7,
                          margin: 0,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.desc}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Google 三不原則 ── */}
      <section
        style={{
          padding: "6rem 0",
          backgroundColor: "rgba(10,8,7,0.4)",
        }}
      >
        <div className="container">
          <div
            ref={ref5}
            className="fade-up"
            style={{ maxWidth: "640px", marginLeft: "auto" }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(197,151,109,0.5)",
                marginBottom: "1.25rem",
              }}
            >
              Google Reviews · 4.6 Stars
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.1em",
                lineHeight: 1.5,
                marginBottom: "2rem",
              }}
            >
              4.6 顆星
              <br />
              100% 自主性真實評論
            </h2>
            <GoldLine />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                "從不請客人主動評論",
                "從不做評論送禮活動",
                "從不花錢購買假評論",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(197,151,109,0.5)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      fontFamily: "'Cormorant Garamond', serif",
                      paddingTop: "0.2rem",
                      flexShrink: 0,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <p
                    style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontWeight: 300,
                      fontSize: "0.9375rem",
                      color: "rgba(240,233,223,0.65)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.7,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 300,
                fontSize: "0.8125rem",
                color: "rgba(240,233,223,0.3)",
                lineHeight: 2,
                letterSpacing: "0.05em",
                marginTop: "2rem",
              }}
            >
              一點一滴收集每一位客人真實的反饋，
              <br />
              成為我們每個進步的方針。
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
        }}
      >
        <div ref={ref6} className="fade-up container">
          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.1em",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            這些認可，讓我們繼續做好
            <br />
            每一場餐桌。
          </p>
          <a
            href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-light"
            style={{ fontSize: "0.8rem" }}
          >
            預約一場餐桌
          </a>
        </div>
      </section>
    </main>
  );
}
