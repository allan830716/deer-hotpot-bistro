/*
 * 初衷小鹿 — 獲獎殊榮／雜誌專訪 Awards.tsx
 * ─────────────────────────────────────────────
 * 設計語言：深色背景 var(--deer-dark) · 金色點綴 · 克制排版
 * 原則：獲獎是被動的榮耀，不主動推銷，以敘事帶出脈絡
 */

import { useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

// ── CDN 圖片 ────────────────────────────────────────────────────────────────
const AWARDS_HERO = "/manus-storage/triangler_DeersHotpotBistro19_a3f32aa8.jpg";
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
  const { t } = useLanguage();
  const ref1 = useFadeIn(0.1);
  const ref2 = useFadeIn(0.1);
  const ref3 = useFadeIn(0.1);
  const ref4 = useFadeIn(0.1);
  const ref5 = useFadeIn(0.1);
  const ref6 = useFadeIn(0.1);
  const { data: placeData } = trpc.placeInfo.getReviews.useQuery();
  const MEDIA_LINKS_I18N = [
    {
      pub: "Vogue Taiwan",
      title: t("awards.media.vogue.title"),
      desc: t("awards.media.vogue.desc"),
      url: "https://www.vogue.com.tw/article/%E5%88%9D%E8%A1%B7%E5%B0%8F%E9%B9%BF-%E9%8D%8B%E7%89%A9",
      img: "/manus-storage/media-vogue_3d3c94b6.webp",
    },
    {
      pub: "工商時報",
      title: t("awards.media.chinatimes.title"),
      desc: t("awards.media.chinatimes.desc"),
      url: "https://www.ctee.com.tw/news/20230930700224-431207",
      img: "/manus-storage/media-chinatimes_1b9ec7a4.png",
    },
    {
      pub: "ELLE",
      title: t("awards.media.elle.title"),
      desc: t("awards.media.elle.desc"),
      url: "https://www.elle.com.tw/life/foodie/g46059914/taipei-big-dome-foods/",
      img: "/manus-storage/media-elle_b69c8ed0.webp",
    },
    {
      pub: "旅讀 Or",
      title: t("awards.media.or.title"),
      desc: t("awards.media.or.desc"),
      url: "https://today.line.me/tw/v3/article/PG7PxnM",
      img: "/manus-storage/media-or_610baf69.webp",
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
            {t("awards.hero.label")}
          </p>
          <h1
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.08em",
              lineHeight: 1.4,
              marginBottom: "1.5rem",
            }}
          >
            {t("awards.hero.title")}
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
            {t("awards.hero.desc").split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
        </div>
      </section>

      <Divider />

      {/* ── 2023 台北十強 ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div ref={ref1} className="fade-up">
            {/* 照片 — 電腦版左文右圖並排，手機版文字在上圖片在下 */}
            <style>{`
              @media (min-width: 768px) {
                .awards-top10-layout {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: clamp(2rem, 4vw, 4rem);
                  align-items: start;
                  max-width: 860px;
                }
                .awards-top10-text { margin-bottom: 0 !important; }
              }
            `}</style>
            <div className="awards-top10-layout">
              <div className="awards-top10-text" style={{ maxWidth: "560px", marginBottom: "3rem" }}>
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
                  {t("awards.taipei10.label")}
                </p>
                <h2
                  style={{
                    fontFamily: "'Noto Serif TC', serif",
                    fontWeight: 200,
                    fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                    color: "var(--deer-dark-text)",
                    letterSpacing: "0.1em",
                    lineHeight: 1.5,
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("awards.taipei10.title")}
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
                  {t("awards.taipei10.subtitle")}
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
                  {t("awards.taipei10.desc").split("\n").map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
              <div
                style={{
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
        </div>
      </section>

      <Divider />

      {/* ── 2024 台灣 30 大 ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <style>{`
            @media (max-width: 640px) {
              .awards-taiwan30-img { order: 2; width: 100% !important; max-width: 320px; margin: 0 auto; }
              .awards-taiwan30-text { order: 1; }
              .awards-taiwan30-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          <div
            ref={ref2}
            className="fade-up awards-item-grid awards-taiwan30-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "clamp(2rem, 5vw, 4rem)",
              alignItems: "start",
              maxWidth: "860px",
            }}
          >
            {/* 獎狀圖 */}
            <div
              className="awards-taiwan30-img"
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
            <div className="awards-taiwan30-text">
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
                {t("awards.taiwan30.label")}
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.5,
                  marginBottom: "0.5rem",
                }}
              >
                {t("awards.taiwan30.title")}
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
                {t("awards.taiwan30.subtitle")}
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
                {t("awards.taiwan30.desc").split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
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
                  fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
                  color: "var(--deer-dark-text)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.5,
                  marginBottom: "0.5rem",
                }}
              >
                {t("awards.premium.title")}
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
                {t("awards.premium.subtitle")}
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
                {t("awards.premium.desc").split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
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
                  {t("awards.premium.jul.desc")}
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
                  {t("awards.premium.oct.desc")}
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
              {t("awards.media.label")}
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
              {t("awards.media.title")}
            </h2>
            <GoldLine />
            <style>{`
              @media (min-width: 1024px) {
                .media-cards-grid {
                  grid-template-columns: repeat(4, 1fr) !important;
                  max-width: 100% !important;
                }
              }
            `}</style>
            <div
              className="media-cards-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1.25rem",
                maxWidth: "860px",
              }}
            >
              {MEDIA_LINKS_I18N.map((item, i) => (
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
        onClick={() => window.open("https://maps.app.goo.gl/aWRwfie8rDpdxK277", "_blank", "noopener,noreferrer")}
        style={{
          padding: "6rem 0",
          backgroundColor: "rgba(10,8,7,0.4)",
          cursor: "pointer",
        }}
      >
        <div className="container">
          <div
            ref={ref5}
            className="fade-up"
            style={{ maxWidth: "640px" }}
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
              Google Reviews
            </p>

            {/* 星級評分視覺化區塊 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              {/* 大數字評分 */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  color: "var(--deer-gold)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {placeData ? placeData.rating.toFixed(1) : "4.6"}
              </span>

              {/* 星星 + 評論數 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {/* 星星列 */}
                <div style={{ display: "flex", gap: "0.2rem" }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const rating = placeData ? placeData.rating : 4.6;
                    const isFilled = star <= Math.round(rating);
                    return (
                      <svg
                        key={star}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        style={{ flexShrink: 0 }}
                      >
                        <polygon
                          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                          fill={isFilled ? "#C5976D" : "rgba(197,151,109,0.2)"}
                          stroke="none"
                        />
                      </svg>
                    );
                  })}
                </div>
                {/* 評論數量 */}
                <p
                  style={{
                    fontFamily: "'Noto Serif TC', serif",
                    fontWeight: 300,
                    fontSize: "0.875rem",
                    color: "rgba(240,233,223,0.55)",
                    letterSpacing: "0.06em",
                    margin: 0,
                  }}
                >
                  {placeData
                    ? `${placeData.totalRatings.toLocaleString()} ${t("awards.google.reviewsUnit")}`
                    : t("awards.google.reviewsDefault")}
                </p>
                {/* 點擊提示 */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    color: "rgba(197,151,109,0.4)",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  {t("awards.google.viewAll")}
                </p>
              </div>
            </div>
            <GoldLine />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                t("awards.google.rule1"),
                t("awards.google.rule2"),
                t("awards.google.rule3"),
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
              {t("awards.google.desc").split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
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
            {t("awards.cta.title").split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
          <a
            href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-light"
            style={{ fontSize: "0.8rem" }}
          >
            {t("awards.cta.btn")}
          </a>
        </div>
      </section>
    </main>
  );
}
