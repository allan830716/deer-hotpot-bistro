/*
 * 初衷小鹿 — 交通與停車 Transport.tsx
 * ─────────────────────────────────────────────
 * mobile-first 一頁式設計
 * Section 1: Hero
 * Section 2: 交通方式總覽（4 卡片）
 * Section 3: 捷運資訊
 * Section 4: 公車資訊
 * Section 5: 開車與停車建議（3 停車卡）
 * Section 6: 交通決策引導
 * Section 7: 品牌插畫地圖
 * Section 8: Google Map 嵌入
 * Section 9: 手機底部 Sticky 快速按鈕
 */

import { useEffect, useRef, useState } from "react";

const DEER_LOGO = "/manus-storage/deer-logo-white_5580d538.webp";

// ── 常數 ──────────────────────────────────────────────────────────────────
const HERO_IMG = "/manus-storage/hero-space_100d3e43.jpg";
const MAP_IMG = "/manus-storage/transport-map-v5_a1bd3d13.svg";

const RESTAURANT_ADDRESS = "台北市信義區忠孝東路四段553巷6弄15號";
const GOOGLE_MAPS_NAV = "https://maps.google.com/?q=初衷小鹿+Deer%27s+Hotpot+Bistro&daddr=台北市信義區忠孝東路四段553巷6弄15號";
const MRT_NAV = "https://maps.google.com/?q=台北捷運市政府站1號出口&daddr=台北市信義區忠孝東路四段553巷6弄15號";
const BUS_QUERY = "https://maps.google.com/?q=市府轉運站&daddr=台北市信義區忠孝東路四段553巷6弄15號";
const PARKING_1_NAV = "https://maps.google.com/?q=松山高中地下停車場+台北市基隆路一段156號";
const PARKING_2_NAV = "https://maps.google.com/?q=俥亭停車基隆路二場+台北市信義區基隆路一段176巷1號";
const PARKING_3_NAV = "https://maps.google.com/?q=臺北文創大樓收費停車場+台北市信義區菸廠路88號";

// ── Intersection Observer Hook ────────────────────────────────────────────
function useFadeIn(threshold = 0.12) {
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

// ── 細分隔線 ─────────────────────────────────────────────────────────────
function GoldLine({ centered = false }: { centered?: boolean }) {
  return (
    <div
      style={{
        width: "32px",
        height: "1px",
        backgroundColor: "var(--deer-gold)",
        margin: centered ? "1.5rem auto" : "1.5rem 0",
      }}
    />
  );
}

// ── Section 1: Hero ───────────────────────────────────────────────────────
function HeroSection() {
  const scrollToParking = () => {
    document.getElementById("section-parking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="section-hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 背景圖 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
        }}
      />
      {/* 漸層遮罩 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,8,7,0.55) 0%, rgba(10,8,7,0.72) 60%, rgba(10,8,7,0.88) 100%)",
        }}
      />

      {/* 文字 */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "560px",
        }}
      >
        <p
          className="font-display"
          style={{
            color: "rgba(197,151,109,0.75)",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Getting Here · 交通指南
        </p>

        <h1
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 200,
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            lineHeight: 1.45,
            color: "#F0E9DF",
            letterSpacing: "0.08em",
            marginBottom: "1.25rem",
          }}
        >
          如何順利抵達
          <br />
          初衷小鹿
        </h1>

        <p
          style={{
            color: "rgba(240,233,223,0.55)",
            fontSize: "0.875rem",
            lineHeight: 1.9,
            letterSpacing: "0.06em",
            marginBottom: "2.5rem",
          }}
        >
          位於信義區巷弄內
          <br />
          建議提前查看交通與停車方式
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={GOOGLE_MAPS_NAV}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-light"
            style={{ fontSize: "0.8rem", padding: "0.75rem 1.75rem" }}
          >
            導航至餐廳
          </a>
          <button
            onClick={scrollToParking}
            className="btn-deer-light"
            style={{ fontSize: "0.8rem", padding: "0.75rem 1.75rem" }}
          >
            查看停車建議
          </button>
        </div>

        <p
          style={{
            marginTop: "2rem",
            fontSize: "0.75rem",
            color: "rgba(197,151,109,0.5)",
            letterSpacing: "0.08em",
          }}
        >
          {RESTAURANT_ADDRESS}
        </p>
      </div>

      {/* 向下指示線 */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, transparent, rgba(197,151,109,0.5))",
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}

// ── Section 2: 交通方式總覽 ───────────────────────────────────────────────
const TRANSPORT_CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="12" y1="18" x2="12" y2="18.01"/>
        <line x1="9" y1="6" x2="15" y2="6"/>
      </svg>
    ),
    en: "MRT",
    zh: "捷運",
    desc: "板南線至「市政府站」\n步行約 5 分鐘",
    anchor: "section-mrt",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    en: "Bus",
    zh: "公車",
    desc: "「市府轉運站」或「聯合報」站點下車\n步行約 2 分鐘",
    anchor: "section-bus",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5h-2"/>
        <circle cx="7" cy="17" r="2"/>
        <circle cx="17" cy="17" r="2"/>
        <path d="M13 3v5h5"/>
      </svg>
    ),
    en: "Drive",
    zh: "開車",
    desc: "巷內停車位有限\n建議直接前往指定停車場",
    anchor: "section-parking",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"/>
        <path d="M12 7v6l3 3"/>
        <path d="M9 13l-3 4"/>
        <path d="M15 13l3 4"/>
      </svg>
    ),
    en: "Walk",
    zh: "步行",
    desc: "鄰近松菸、信義商圈，可由市政府站、松菸方向步行前往",
    anchor: "section-mrt",
  },
];

function TransportOverviewSection() {
  const ref = useFadeIn();
  return (
    <section
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--deer-bg)",
      }}
    >
      <div className="container">
        <div ref={ref} className="fade-up">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="font-label mb-4" style={{ color: "var(--deer-gold)" }}>
              How to Arrive
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                color: "var(--deer-text)",
                letterSpacing: "0.1em",
              }}
            >
              選擇最適合你的抵達方式
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
            className="transport-overview-grid"
          >
            {TRANSPORT_CARDS.map((card) => (
              <button
                key={card.en}
                onClick={() =>
                  document.getElementById(card.anchor)?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid rgba(107,74,50,0.15)",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.3s, background 0.3s",
                }}
                className="transport-card-btn"
              >
                <div
                  style={{
                    color: "var(--deer-gold)",
                    marginBottom: "0.875rem",
                    opacity: 0.8,
                  }}
                >
                  {card.icon}
                </div>
                <p
                  className="font-label"
                  style={{ color: "var(--deer-gold)", marginBottom: "0.25rem" }}
                >
                  {card.en}
                </p>
                <h3
                  style={{
                    fontFamily: "'Noto Serif TC', serif",
                    fontWeight: 300,
                    fontSize: "1.125rem",
                    color: "var(--deer-text)",
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {card.zh}
                </h3>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--deer-sub)",
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {card.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 3: 捷運資訊 ───────────────────────────────────────────────────
function MrtSection() {
  const ref = useFadeIn();
  return (
    <section
      id="section-mrt"
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--deer-dark)",
      }}
    >
      <div className="container-narrow">
        <div ref={ref} className="fade-up">
          <p className="font-label mb-4" style={{ color: "rgba(197,151,109,0.6)" }}>
            MRT · 捷運
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}
          >
            搭乘捷運
          </h2>
          <GoldLine />

          {/* 捷運資訊卡 */}
          <div
            style={{
              border: "1px solid rgba(197,151,109,0.2)",
              padding: "2rem",
              marginBottom: "2rem",
              background: "rgba(197,151,109,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#3A6B9E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "white", fontSize: "0.875rem", fontWeight: 600 }}>M</span>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Noto Serif TC', serif",
                    fontWeight: 300,
                    fontSize: "1rem",
                    color: "var(--deer-dark-text)",
                    letterSpacing: "0.08em",
                  }}
                >
                  板南線 · 市政府站
                </p>
                <p style={{ fontSize: "0.75rem", color: "rgba(197,151,109,0.6)", letterSpacing: "0.06em" }}>
                  Taipei City Hall Station
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--deer-gold)", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }}>01</span>
                <p style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.7)", lineHeight: 1.8 }}>
                  由<strong style={{ color: "var(--deer-dark-text)" }}>1 號出口</strong>出站
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--deer-gold)", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }}>02</span>
                <p style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.7)", lineHeight: 1.8 }}>
                  沿忠孝東路四段往西步行，進入 553 巷後左轉 6 弄
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--deer-gold)", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }}>03</span>
                <p style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.7)", lineHeight: 1.8 }}>
                  步行約 <strong style={{ color: "var(--deer-dark-text)" }}>400 公尺，5 分鐘</strong>可抵達
                </p>
              </div>
            </div>
          </div>

          <a
            href={MRT_NAV}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-light"
            style={{ fontSize: "0.8rem", display: "inline-block", marginBottom: "1.5rem" }}
          >
            從市政府站導航
          </a>

          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(197,151,109,0.45)",
              lineHeight: 1.8,
              letterSpacing: "0.04em",
              borderLeft: "1px solid rgba(197,151,109,0.2)",
              paddingLeft: "1rem",
            }}
          >
            若攜帶長輩、兒童或遇到下雨天，建議預留較多步行時間，或考慮搭乘計程車直達。
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section 4: 公車資訊 ───────────────────────────────────────────────────
const BUS_STOPS = [
  {
    name: "市府轉運站",
    walk: "步行約 5 分鐘",
    routes: "202、212、612、647、忠孝幹線、棕 7 等",
  },
  {
    name: "聯合報",
    walk: "步行約 2 分鐘",
    routes: "多路公車停靠，可依 Google Maps 即時查詢",
  },
];

function BusSection() {
  const ref = useFadeIn();
  return (
    <section
      id="section-bus"
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--deer-bg)",
      }}
    >
      <div className="container-narrow">
        <div ref={ref} className="fade-up">
          <p className="font-label mb-4" style={{ color: "var(--deer-gold)" }}>
            Bus · 公車
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              color: "var(--deer-text)",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}
          >
            搭乘公車
          </h2>
          <GoldLine />

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--deer-sub)",
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            可選擇於以下站點下車，再步行前往初衷小鹿。
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {BUS_STOPS.map((stop) => (
              <div
                key={stop.name}
                style={{
                  border: "1px solid rgba(107,74,50,0.15)",
                  padding: "1.5rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#8B6B3E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}
                >
                  <span style={{ color: "white", fontSize: "0.75rem", fontWeight: 600 }}>B</span>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontWeight: 300,
                      fontSize: "1rem",
                      color: "var(--deer-text)",
                      letterSpacing: "0.08em",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {stop.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--deer-gold)",
                      letterSpacing: "0.06em",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {stop.walk}
                  </p>
                  <p style={{ fontSize: "0.775rem", color: "var(--deer-sub)", lineHeight: 1.7 }}>
                    {stop.routes}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={BUS_QUERY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer"
            style={{ fontSize: "0.8rem", display: "inline-block" }}
          >
            查詢公車路線
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Section 5: 開車與停車建議 ─────────────────────────────────────────────
const PARKING_LOTS = [
  {
    badge: "首選",
    badgeColor: "#C5976D",
    name: "松山高中地下停車場",
    address: "基隆路一段 156 號地下",
    walk: "步行約 3 分鐘",
    feature: "距離最近，適合快速抵達",
    spaces: "約 226 格，24 小時營業",
    nav: PARKING_1_NAV,
    navLabel: "導航",
  },
  {
    badge: "備選",
    badgeColor: "#6B8B5E",
    name: "俥亭停車基隆路二場",
    address: "基隆路一段 176 巷 1 號",
    walk: "步行約 2 分鐘",
    feature: "鄰近餐廳，適合快速停車",
    spaces: "24 小時營業，車位數量請当場確認",
    nav: PARKING_2_NAV,
    navLabel: "導航",
  },
  {
    badge: "假日備案",
    badgeColor: "#5E7A8B",
    name: "臺北文創大樓收費停車場",
    address: "信義區菸廠路 88 號",
    walk: "步行約 8 分鐘",
    feature: "松菸園區內，車位充足，適合假日尖峰時段",
    spaces: "24 小時營業，建議提前查詢即時車位",
    nav: PARKING_3_NAV,
    navLabel: "導航",
  },
];

function ParkingSection() {
  const ref = useFadeIn();
  return (
    <section
      id="section-parking"
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--deer-dark)",
      }}
    >
      <div className="container">
        <div ref={ref} className="fade-up">
          <div style={{ marginBottom: "3rem" }}>
            <p className="font-label mb-4" style={{ color: "rgba(197,151,109,0.6)" }}>
              Parking · 停車
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}
            >
              開車前往
            </h2>
            <GoldLine />
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(240,233,223,0.5)",
                lineHeight: 1.9,
                maxWidth: "480px",
              }}
            >
              初衷小鹿位於巷弄內，周邊路邊停車位有限，建議直接停放至鄰近停車場後步行前往。
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
            }}
            className="parking-grid"
          >
            {PARKING_LOTS.map((lot) => (
              <div
                key={lot.name}
                style={{
                  border: "1px solid rgba(197,151,109,0.15)",
                  background: "rgba(197,151,109,0.02)",
                  padding: "1.75rem",
                  transition: "border-color 0.3s",
                }}
                className="parking-card"
              >
                {/* Badge + 名稱 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.1em",
                      padding: "0.2rem 0.6rem",
                      border: `1px solid ${lot.badgeColor}`,
                      color: lot.badgeColor,
                      fontFamily: "'Noto Serif TC', serif",
                    }}
                  >
                    {lot.badge}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontWeight: 300,
                      fontSize: "1.0625rem",
                      color: "var(--deer-dark-text)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {lot.name}
                  </h3>
                </div>

                {/* 資訊列 */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--deer-gold)", minWidth: "60px" }}>步行距離</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--deer-dark-text)", fontFamily: "'Noto Serif TC', serif" }}>
                      {lot.walk}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--deer-gold)", minWidth: "60px" }}>特點</span>
                    <span style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.6)" }}>{lot.feature}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--deer-gold)", minWidth: "60px" }}>車位</span>
                    <span style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.5)" }}>{lot.spaces}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--deer-gold)", minWidth: "60px" }}>地址</span>
                    <span style={{ fontSize: "0.775rem", color: "rgba(240,233,223,0.4)" }}>{lot.address}</span>
                  </div>
                </div>

                <a
                  href={lot.nav}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-deer-light"
                  style={{ fontSize: "0.775rem", padding: "0.625rem 1.5rem", display: "inline-block" }}
                >
                  {lot.navLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 6: 交通決策引導 ───────────────────────────────────────────────
const DECISIONS = [
  {
    situation: "想最方便",
    suggestion: "搭捷運到市政府站，再步行前往",
    anchor: "section-mrt",
  },
  {
    situation: "想快速停車",
    suggestion: "優先停松山高中地下停車場",
    anchor: "section-parking",
  },
  {
    situation: "假日或晚餐尖峰",
    suggestion: "假日建議停臺北文創大樓停車場，車位充足",
    anchor: "section-parking",
  },
  {
    situation: "不想找車位",
    suggestion: "可選俥亭停車基隆路二場，鄰近餐廳且車位穩定",
    anchor: "section-parking",
  },
  {
    situation: "下雨或帶長輩小孩",
    suggestion: "建議搭車至店附近再步行，或直接叫計程車",
    anchor: "section-mrt",
  },
];

function DecisionSection() {
  const ref = useFadeIn();
  return (
    <section
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--deer-bg)",
      }}
    >
      <div className="container-narrow">
        <div ref={ref} className="fade-up">
          <p className="font-label mb-4" style={{ color: "var(--deer-gold)" }}>
            Quick Guide
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              color: "var(--deer-text)",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}
          >
            不知道怎麼來？
            <br />
            可以這樣選
          </h2>
          <GoldLine />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {DECISIONS.map((item, i) => (
              <button
                key={i}
                onClick={() =>
                  document.getElementById(item.anchor)?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid rgba(107,74,50,0.1)",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  transition: "padding-left 0.2s",
                }}
                className="decision-row"
              >
                <span
                  style={{
                    color: "var(--deer-gold)",
                    fontSize: "0.75rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    marginTop: "0.2rem",
                    flexShrink: 0,
                    minWidth: "20px",
                  }}
                >
                  →
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--deer-sub)",
                      marginBottom: "0.25rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.situation}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontWeight: 300,
                      fontSize: "0.9375rem",
                      color: "var(--deer-text)",
                      lineHeight: 1.7,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.suggestion}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 7: 品牌插畫地圖 ───────────────────────────────────────────────
// ── 地圖地標資料 ──────────────────────────────────────────────────────────
const MAP_MARKERS = [
  {
    id: "deer",
    type: "restaurant" as const,
    label: "初衷小鹿",
    sublabel: "",
    walk: "",
    x: 310, y: 310,
    mapsUrl: GOOGLE_MAPS_NAV,
    color: "#C5976D",
  },
  {
    id: "parking1",
    type: "parking" as const,
    label: "松山高中地下停車場",
    sublabel: "基隆路一段156號",
    walk: "步行 3 分鐘",
    x: 390, y: 205,
    mapsUrl: PARKING_1_NAV,
    color: "#6BAA8E",
  },
  {
    id: "parking2",
    type: "parking" as const,
    label: "俥亭停車基隆路二場",
    sublabel: "基隆路一段176巷1號",
    walk: "步行 2 分鐘",
    x: 420, y: 285,
    mapsUrl: PARKING_2_NAV,
    color: "#6BAA8E",
  },
  {
    id: "parking3",
    type: "parking" as const,
    label: "臺北文創大樓停車場",
    sublabel: "菸廠路88號",
    walk: "步行 8 分鐘",
    x: 130, y: 115,
    mapsUrl: PARKING_3_NAV,
    color: "#6BAA8E",
  },
  {
    id: "bus1",
    type: "bus" as const,
    label: "聯合報站",
    sublabel: "忠孝東路四段555號",
    walk: "步行 2 分鐘",
    x: 280, y: 415,
    mapsUrl: "https://maps.google.com/?q=聯合報站+台北市信義區忠孝東路四段555號",
    color: "#C5976D",
  },
  {
    id: "bus2",
    type: "bus" as const,
    label: "市府轉運站",
    sublabel: "忠孝東路五段6號",
    walk: "步行 5 分鐘",
    x: 490, y: 430,
    mapsUrl: BUS_QUERY,
    color: "#C5976D",
  },
  {
    id: "mrt",
    type: "mrt" as const,
    label: "市政府捷運站",
    sublabel: "板南線 1號出口",
    walk: "步行 5 分鐘",
    x: 530, y: 395,
    mapsUrl: MRT_NAV,
    color: "#7EB8D4",
  },
];

type FilterType = "parking" | "mrt" | "bus";

function IllustrationMapSection() {
  const ref = useFadeIn();
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(
    () => new Set<FilterType>(["parking", "mrt", "bus"])
  );

  const toggleFilter = (f: FilterType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  const FILTERS: { key: FilterType; label: string; color: string }[] = [
    { key: "parking", label: "🅿 停車", color: "#6BAA8E" },
    { key: "mrt",     label: "🚇 捷運", color: "#7EB8D4" },
    { key: "bus",     label: "🚌 公車", color: "#C5976D" },
  ];

  // 虛線路徑（從初衷小鹿到各地標）
  const deer = MAP_MARKERS.find((m) => m.id === "deer")!;
  const pathMarkers = MAP_MARKERS.filter((m) => m.type !== "restaurant");

  return (
    <section
      style={{ padding: "5rem 0", backgroundColor: "var(--deer-dark)" }}
    >
      <div className="container">
        <div ref={ref} className="fade-up">
          {/* 標題 */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p className="font-label mb-4" style={{ color: "rgba(197,151,109,0.6)" }}>
              Illustrated Map
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.1em",
              }}
            >
              周邊交通示意圖
            </h2>
          </div>

          {/* 篩選器 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1.75rem",
              flexWrap: "wrap",
            }}
          >
            {FILTERS.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                style={{
                  padding: "0.4rem 1rem",
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  border: `1px solid ${activeFilters.has(key) ? color : "rgba(255,255,255,0.15)"}`,
                  borderRadius: "2px",
                  backgroundColor: activeFilters.has(key) ? `${color}22` : "transparent",
                  color: activeFilters.has(key) ? color : "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "'Noto Serif TC', serif",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* SVG 地圖 */}
          <div
            style={{
              maxWidth: "560px",
              margin: "0 auto",
              border: "1px solid rgba(197,151,109,0.15)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <svg
              viewBox="0 0 640 520"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto", display: "block", backgroundColor: "#1A1210" }}
            >
              {/* 背景地塊 */}
              {/* 松山文創園區 */}
              <rect x="30" y="80" width="200" height="200" rx="4" fill="#2A2018" stroke="rgba(197,151,109,0.2)" strokeWidth="1"/>
              <text x="130" y="175" textAnchor="middle" fill="rgba(197,151,109,0.45)" fontSize="11" fontFamily="Noto Serif TC, serif">松山文創園區</text>
              <text x="130" y="192" textAnchor="middle" fill="rgba(197,151,109,0.3)" fontSize="9" fontFamily="Noto Serif TC, serif">Songshan Cultural Park</text>

              {/* 臺北大巨蛋 */}
              <ellipse cx="100" cy="340" rx="65" ry="50" fill="#221A14" stroke="rgba(197,151,109,0.2)" strokeWidth="1"/>
              <text x="100" y="337" textAnchor="middle" fill="rgba(197,151,109,0.45)" fontSize="10" fontFamily="Noto Serif TC, serif">臺北大巨蛋</text>
              <text x="100" y="352" textAnchor="middle" fill="rgba(197,151,109,0.3)" fontSize="8" fontFamily="Noto Serif TC, serif">Taipei Dome</text>

              {/* 主要道路 */}
              {/* 忠孝東路四段（橫向，偏下） */}
              <line x1="0" y1="400" x2="640" y2="400" stroke="#3A2E24" strokeWidth="12"/>
              <text x="320" y="397" textAnchor="middle" fill="rgba(197,151,109,0.5)" fontSize="9" fontFamily="Noto Serif TC, serif">忠孝東路四段</text>

              {/* 基隆路（縱向，偏右） */}
              <line x1="440" y1="0" x2="440" y2="520" stroke="#3A2E24" strokeWidth="10"/>
              <text x="448" y="50" fill="rgba(197,151,109,0.4)" fontSize="8" fontFamily="Noto Serif TC, serif" transform="rotate(90, 448, 50)">基隆路</text>

              {/* 菸廠路（橫向，偏上） */}
              <line x1="0" y1="130" x2="260" y2="130" stroke="#3A2E24" strokeWidth="6"/>
              <text x="50" y="126" fill="rgba(197,151,109,0.35)" fontSize="8" fontFamily="Noto Serif TC, serif">菸廠路</text>

              {/* 市民大道（橫向，最上） */}
              <line x1="0" y1="55" x2="640" y2="55" stroke="#3A2E24" strokeWidth="8"/>
              <text x="320" y="51" textAnchor="middle" fill="rgba(197,151,109,0.35)" fontSize="8" fontFamily="Noto Serif TC, serif">市民大道</text>

              {/* 忠孝東路五段（橫向，最下） */}
              <line x1="440" y1="420" x2="640" y2="420" stroke="#3A2E24" strokeWidth="8"/>
              <text x="540" y="416" textAnchor="middle" fill="rgba(197,151,109,0.35)" fontSize="8" fontFamily="Noto Serif TC, serif">忠孝東路五段</text>

              {/* 步行虛線路徑 */}
              {pathMarkers.map((m) => {
                const visible = activeFilters.has(m.type as FilterType);
                if (!visible) return null;
                return (
                  <line
                    key={`path-${m.id}`}
                    x1={deer.x} y1={deer.y}
                    x2={m.x} y2={m.y}
                    stroke={m.color}
                    strokeWidth="1.5"
                    strokeDasharray="5,4"
                    opacity="0.5"
                  />
                );
              })}

              {/* 地標標記 */}
              {MAP_MARKERS.map((m) => {
                if (m.id === "deer") {
                  // 初衷小鹿：Logo + 金色圓圈
                  return (
                    <g
                      key={m.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => window.open(m.mapsUrl, "_blank")}
                    >
                      <circle cx={m.x} cy={m.y} r="22" fill="#C5976D" opacity="0.15"/>
                      <circle cx={m.x} cy={m.y} r="16" fill="#1A1210" stroke="#C5976D" strokeWidth="1.5"/>
                      <image
                        href={DEER_LOGO}
                        x={m.x - 11} y={m.y - 11}
                        width="22" height="22"
                        style={{ filter: "brightness(0.9)" }}
                      />
                      {/* 標籤 */}
                      <rect x={m.x - 40} y={m.y + 20} width="80" height="18" rx="2" fill="#1A1210" stroke="#C5976D" strokeWidth="0.8" opacity="0.95"/>
                      <text x={m.x} y={m.y + 32} textAnchor="middle" fill="#C5976D" fontSize="9" fontFamily="Noto Serif TC, serif" fontWeight="500">
                        初衷小鹿
                      </text>
                    </g>
                  );
                }

                const visible = activeFilters.has(m.type as FilterType);
                if (!visible) return null;

                // 判斷標籤方向（避免超出畫布）
                const labelRight = m.x < 360;
                const labelLx = labelRight ? m.x + 14 : m.x - 14;
                const labelAnchor = labelRight ? "start" : "end";
                const boxW = 120;
                const boxH = m.walk ? 34 : 22;
                const boxX = labelRight ? m.x + 12 : m.x - 12 - boxW;
                const boxY = m.y - 11;

                return (
                  <g
                    key={m.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => window.open(m.mapsUrl, "_blank")}
                  >
                    {/* 圓形標記 */}
                    <circle cx={m.x} cy={m.y} r="7" fill={m.color} opacity="0.9"/>
                    <circle cx={m.x} cy={m.y} r="7" fill="none" stroke={m.color} strokeWidth="2" opacity="0.4"/>

                    {/* 文字背景框 */}
                    <rect
                      x={boxX} y={boxY}
                      width={boxW} height={boxH}
                      rx="2"
                      fill="rgba(26,18,16,0.92)"
                      stroke={`${m.color}55`}
                      strokeWidth="0.8"
                    />

                    {/* 地標名稱 */}
                    <text
                      x={labelLx} y={m.y + 2}
                      textAnchor={labelAnchor}
                      fill="#EDE3D8"
                      fontSize="9"
                      fontFamily="Noto Serif TC, serif"
                    >
                      {m.label.length > 10 ? m.label.slice(0, 10) : m.label}
                    </text>

                    {/* 步行時間 */}
                    {m.walk && (
                      <text
                        x={labelLx} y={m.y + 14}
                        textAnchor={labelAnchor}
                        fill={m.color}
                        fontSize="8"
                        fontFamily="Noto Serif TC, serif"
                      >
                        {m.walk}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* 北方指示 */}
              <g transform="translate(600, 30)">
                <circle cx="0" cy="0" r="14" fill="rgba(26,18,16,0.8)" stroke="rgba(197,151,109,0.4)" strokeWidth="1"/>
                <text x="0" y="-4" textAnchor="middle" fill="#C5976D" fontSize="10" fontFamily="serif" fontWeight="bold">N</text>
                <line x1="0" y1="2" x2="0" y2="10" stroke="#C5976D" strokeWidth="1.5"/>
                <polygon points="0,-12 -3,-4 3,-4" fill="#C5976D"/>
              </g>

              {/* 圖例 */}
              <g transform="translate(16, 430)">
                <rect x="0" y="0" width="130" height="72" rx="3" fill="rgba(26,18,16,0.85)" stroke="rgba(197,151,109,0.2)" strokeWidth="0.8"/>
                <text x="8" y="14" fill="rgba(197,151,109,0.7)" fontSize="8" fontFamily="Noto Serif TC, serif">圖例</text>
                <circle cx="16" cy="27" r="5" fill="#C5976D"/>
                <text x="26" y="31" fill="#EDE3D8" fontSize="8" fontFamily="Noto Serif TC, serif">初衷小鹿</text>
                <circle cx="16" cy="43" r="5" fill="#6BAA8E"/>
                <text x="26" y="47" fill="#EDE3D8" fontSize="8" fontFamily="Noto Serif TC, serif">停車場</text>
                <circle cx="16" cy="59" r="5" fill="#7EB8D4"/>
                <text x="26" y="63" fill="#EDE3D8" fontSize="8" fontFamily="Noto Serif TC, serif">捷運</text>
                <circle cx="80" cy="43" r="5" fill="#C5976D"/>
                <text x="90" y="47" fill="#EDE3D8" fontSize="8" fontFamily="Noto Serif TC, serif">公車</text>
              </g>
            </svg>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "0.7rem",
              color: "rgba(197,151,109,0.3)",
              letterSpacing: "0.08em",
            }}
          >
            點擊地標可開啟 Google Maps 導航 · 示意圖非精確比例，僅供方向參考
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section 8: 手機底部 Sticky 快速按鈕 ──────────────────────────────────
function StickyBottomBar() {
  return (
    <div className="transport-sticky-bar">
      <a
        href={GOOGLE_MAPS_NAV}
        target="_blank"
        rel="noopener noreferrer"
        className="transport-sticky-btn transport-sticky-primary"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
        導航至餐廳
      </a>
      <button
        onClick={() => document.getElementById("section-mrt")?.scrollIntoView({ behavior: "smooth" })}
        className="transport-sticky-btn transport-sticky-secondary"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect x="5" y="2" width="14" height="20" rx="2"/>
          <line x1="12" y1="18" x2="12" y2="18.01"/>
        </svg>
        捷運怎麼走
      </button>
      <button
        onClick={() => document.getElementById("section-parking")?.scrollIntoView({ behavior: "smooth" })}
        className="transport-sticky-btn transport-sticky-secondary"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none" fontWeight="bold">P</text>
        </svg>
        停車建議
      </button>
    </div>
  );
}

// ── 主頁面 ────────────────────────────────────────────────────────────────
export default function Transport() {
  // 頁面進入時置頂
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingBottom: "72px" }}>
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: 交通方式總覽 */}
      <TransportOverviewSection />

      {/* Section 3: 捷運資訊 */}
      <MrtSection />

      {/* Section 4: 公車資訊 */}
      <BusSection />

      {/* Section 5: 開車與停車建議 */}
      <ParkingSection />

      {/* Section 6: 交通決策引導 */}
      <DecisionSection />

      {/* Section 7: 品牌插畫地圖 */}
      <IllustrationMapSection />

      {/* Section 8: 手機底部 Sticky 快速按鈕 */}
      <StickyBottomBar />
    </div>
  );
}
