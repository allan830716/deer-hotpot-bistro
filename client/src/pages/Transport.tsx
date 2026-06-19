/*
 * 初衷小鹿 — 交通與停車 Transport.tsx
 * ─────────────────────────────────────────────
 * mobile-first 一頁式設計
 * Section 1: Hero
 * Section 2: 品牌插畫地圖
 * Section 3: 交通方式總覽（4 卡片）
 * Section 4: 捷運資訊
 * Section 5: 公車資訊
 * Section 6: 開車與停車建議
 * Section 7: 交通決策引導
 * Section 8: 手機底部 Sticky 快速按鈕
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// ── 常數 ──────────────────────────────────────────────────────────────────
const HERO_IMG = "/images/hero-space_100d3e43.jpg";

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
  const { t } = useLanguage();
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
          {t("transport.hero.label")}
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
            whiteSpace: "pre-line",
          }}
        >
          {t("transport.hero.title")}
        </h1>

        <p
          style={{
            color: "rgba(240,233,223,0.55)",
            fontSize: "0.875rem",
            lineHeight: 1.9,
            letterSpacing: "0.06em",
            marginBottom: "2.5rem",
            whiteSpace: "pre-line",
          }}
        >
          {t("transport.hero.subtitle")}
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
            {t("transport.hero.navigate.btn")}
          </a>
          <button
            onClick={scrollToParking}
            className="btn-deer-light"
            style={{ fontSize: "0.8rem", padding: "0.75rem 1.75rem" }}
          >
            {t("transport.hero.parking.btn")}
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
function TransportOverviewSection() {
  const { t } = useLanguage();
  const ref = useFadeIn();

  const TRANSPORT_CARDS = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2"/>
          <line x1="12" y1="18" x2="12" y2="18.01"/>
          <line x1="9" y1="6" x2="15" y2="6"/>
        </svg>
      ),
      en: t("transport.card.mrt.en"),
      zh: t("transport.card.mrt.zh"),
      desc: t("transport.card.mrt.desc"),
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
      en: t("transport.card.bus.en"),
      zh: t("transport.card.bus.zh"),
      desc: t("transport.card.bus.desc"),
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
      en: t("transport.card.drive.en"),
      zh: t("transport.card.drive.zh"),
      desc: t("transport.card.drive.desc"),
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
      en: t("transport.card.taxi.en"),
      zh: t("transport.card.taxi.zh"),
      desc: t("transport.card.taxi.desc"),
      anchor: "section-mrt",
    },
  ];

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
              {t("transport.overview.label")}
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
              {t("transport.overview.title")}
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
  const { t } = useLanguage();
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
            MRT · {t("transport.mrt.label")}
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
            {t("transport.mrt.title")}
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
                  {t("transport.mrt.line")}
                </p>
                <p style={{ fontSize: "0.75rem", color: "rgba(197,151,109,0.6)", letterSpacing: "0.06em" }}>
                  {t("transport.mrt.line.sub")}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--deer-gold)", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }}>01</span>
                <p style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.7)", lineHeight: 1.8 }}>
                  {t("transport.mrt.step1")}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--deer-gold)", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }}>02</span>
                <p style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.7)", lineHeight: 1.8 }}>
                  {t("transport.mrt.step2")}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--deer-gold)", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }}>03</span>
                <p style={{ fontSize: "0.875rem", color: "rgba(240,233,223,0.7)", lineHeight: 1.8 }}>
                  {t("transport.mrt.step3")}
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
            {t("transport.mrt.navigate.btn")}
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Section 4: 公車資訊 ───────────────────────────────────────────────────
function BusSection() {
  const { t } = useLanguage();
  const ref = useFadeIn();

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
            Bus · {t("transport.bus.label")}
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
            {t("transport.bus.title")}
          </h2>
          <GoldLine />

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
            {t("transport.bus.navigate.btn")}
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Section 5: 開車與停車建議 ─────────────────────────────────────────────
function ParkingSection() {
  const { t } = useLanguage();
  const ref = useFadeIn();

  const PARKING_LOTS = [
    {
      badge: t("transport.lot1.badge"),
      badgeColor: "#C5976D",
      name: t("transport.lot1.name"),
      address: t("transport.lot1.address"),
      walk: t("transport.lot1.walk"),
      feature: t("transport.lot1.feature"),
      spaces: t("transport.lot1.spaces"),
      nav: PARKING_1_NAV,
    },
    {
      badge: t("transport.lot2.badge"),
      badgeColor: "#6B8B5E",
      name: t("transport.lot2.name"),
      address: t("transport.lot2.address"),
      walk: t("transport.lot2.walk"),
      feature: t("transport.lot2.feature"),
      spaces: t("transport.lot2.spaces"),
      nav: PARKING_2_NAV,
    },
    {
      badge: t("transport.lot3.badge"),
      badgeColor: "#5E7A8B",
      name: t("transport.lot3.name"),
      address: t("transport.lot3.address"),
      walk: t("transport.lot3.walk"),
      feature: t("transport.lot3.feature"),
      spaces: t("transport.lot3.spaces"),
      nav: PARKING_3_NAV,
    },
  ];

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
              Parking · {t("transport.parking.label")}
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
              {t("transport.parking.title")}
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
              {t("transport.parking.desc")}
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
                    <span style={{ fontSize: "0.75rem", color: "var(--deer-gold)", minWidth: "60px" }}>{t("transport.parking.walk")}</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--deer-dark-text)", fontFamily: "'Noto Serif TC', serif" }}>
                      {lot.walk}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--deer-gold)", minWidth: "60px" }}>{t("transport.parking.feature")}</span>
                    <span style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.6)" }}>{lot.feature}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--deer-gold)", minWidth: "60px" }}>{t("transport.parking.spaces")}</span>
                    <span style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.5)" }}>{lot.spaces}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--deer-gold)", minWidth: "60px" }}>{t("transport.parking.address")}</span>
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
                  {t("transport.parking.navigate.btn")}
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
function DecisionSection() {
  const { t } = useLanguage();
  const ref = useFadeIn();

  const DECISIONS = [
    {
      situation: t("transport.decision.d1.situation"),
      suggestion: t("transport.decision.d1.suggestion"),
      anchor: "section-mrt",
    },
    {
      situation: t("transport.decision.d2.situation"),
      suggestion: t("transport.decision.d2.suggestion"),
      anchor: "section-bus",
    },
    {
      situation: t("transport.decision.d3.situation"),
      suggestion: t("transport.decision.d3.suggestion"),
      anchor: "section-parking",
    },
    {
      situation: t("transport.decision.d4.situation"),
      suggestion: t("transport.decision.d4.suggestion"),
      anchor: "section-hero",
    },
  ];

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
            {t("transport.decision.label")}
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              color: "var(--deer-text)",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
              whiteSpace: "pre-line",
            }}
          >
            {t("transport.decision.title")}
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
function MapLightbox({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        backgroundColor: "rgba(10,8,7,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(90vw, 900px)",
          maxHeight: "90vh",
          width: "100%",
          border: "1px solid rgba(197,151,109,0.3)",
          overflow: "hidden",
        }}
      >
        {children}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "0.75rem", right: "0.75rem",
            background: "rgba(26,18,16,0.85)",
            border: "1px solid rgba(197,151,109,0.4)",
            color: "#C5976D", cursor: "pointer",
            width: "32px", height: "32px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem", lineHeight: 1,
            borderRadius: "2px",
          }}
          aria-label="關閉放大地圖"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}

function IllustrationMapSection() {
  const { t } = useLanguage();
  const ref = useFadeIn();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      style={{ padding: "5rem 0", backgroundColor: "var(--deer-dark)" }}
    >
      <div className="container">
        <div ref={ref} className="fade-up">
          {/* 標題 */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p className="font-label mb-4" style={{ color: "rgba(197,151,109,0.6)" }}>
              {t("transport.map.label")}
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
              {t("transport.map.title")}
            </h2>
          </div>

          {/* 地圖圖片（點擊放大） */}
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              position: "relative",
              cursor: "zoom-in",
              lineHeight: 0,
            }}
            onClick={() => setLightboxOpen(true)}
            title={t("transport.map.zoom")}
          >
            {/* 放大提示 */}
            <div
              style={{
                position: "absolute", top: "0.6rem", left: "0.6rem",
                zIndex: 2,
                background: "rgba(26,18,16,0.75)",
                border: "1px solid rgba(197,151,109,0.3)",
                borderRadius: "2px",
                padding: "0.2rem 0.55rem",
                fontSize: "0.65rem",
                color: "rgba(197,151,109,0.8)",
                letterSpacing: "0.06em",
                pointerEvents: "none",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {t("transport.map.zoom")}
            </div>
            <img
              src="/images/transport-map-custom_a48b7aa9.png"
              alt="初衷小鹿 Deer's Hotpot Bistro 周邊交通示意圖"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Lightbox 放大版 */}
          {lightboxOpen && (
            <MapLightbox onClose={() => setLightboxOpen(false)}>
              <img
                src="/images/transport-map-custom_a48b7aa9.png"
                alt="初衷小鹿 Deer's Hotpot Bistro 周邊交通示意圖（放大）"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  backgroundColor: "#1A1210",
                }}
              />
            </MapLightbox>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Section 8: 手機底部 Sticky 快速按鈕 ──────────────────────────────────
function StickyBottomBar() {
  const { t } = useLanguage();
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
        {t("transport.sticky.navigate")}
      </a>
      <button
        onClick={() => document.getElementById("section-mrt")?.scrollIntoView({ behavior: "smooth" })}
        className="transport-sticky-btn transport-sticky-secondary"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect x="5" y="2" width="14" height="20" rx="2"/>
          <line x1="12" y1="18" x2="12" y2="18.01"/>
        </svg>
        {t("transport.sticky.mrt")}
      </button>
      <button
        onClick={() => document.getElementById("section-parking")?.scrollIntoView({ behavior: "smooth" })}
        className="transport-sticky-btn transport-sticky-secondary"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none" fontWeight="bold">P</text>
        </svg>
        {t("transport.sticky.parking")}
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

      {/* Section 2: 品牌插畫地圖（一進頁面即可看到） */}
      <IllustrationMapSection />

      {/* Section 3: 交通方式總覽 */}
      <TransportOverviewSection />

      {/* Section 4: 捷運資訊 */}
      <MrtSection />

      {/* Section 5: 公車資訊 */}
      <BusSection />

      {/* Section 6: 開車與停車建議 */}
      <ParkingSection />

      {/* Section 7: 交通決策引導 */}
      <DecisionSection />

      {/* Section 8: 手機底部 Sticky 快速按鈕 */}
      <StickyBottomBar />
    </div>
  );
}
