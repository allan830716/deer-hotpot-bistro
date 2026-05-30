/*
 * 初衷小鹿 — 首頁 Home.tsx
 * ─────────────────────────────────────────────
 * 設計語言：暖灰底 #F5F3EF · 深棕黑 #1A1210 · 木質棕 #6B4A32
 * 字體：Noto Serif TC 300 · Cormorant Garamond 300
 * 原則：大量留白、短句、克制、不推銷
 *
 * Section 結構：
 * 1. Hero — 全版空間照 + 主句
 * 2. 品牌轉折 — 我們不做熱鬧的火鍋
 * 3. 三核心 — 湯 · 肉 · 甜點
 * 4. 體驗敘事 — 節奏鋪陳
 * 5. 空間 — 為了那些不該被打擾的時刻
 * 6. 信任 — 4.6 顆星
 * 7. CTA — 預約一場餐桌
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

// ── 空間照片（已上傳至 CDN）────────────────────────────────────────────────
const HERO_IMG = "/manus-storage/hero-space_100d3e43.jpg";
// 不該被打擾的時刻—全景用餐空間
 const SPACE_IMG = "/manus-storage/59301147_2179218135493270_2323651919307866112_o_06d161dd.jpg";
// 三核心圖片—專屬生成料理照片
const SOUP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-soup-kD9yMfeQhWitk7LSxi895N.webp";
const MEAT_IMG = "/manus-storage/core-meat-no-salt_f0361824.png";
const DESSERT_IMG = "/manus-storage/core-wine-cellar_3dd0f607.webp";

// ── Intersection Observer Hook ────────────────────────────────────────────
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

// ── 細分隔線元件 ──────────────────────────────────────────────────────────
function GoldLine({ width = 40 }: { width?: number }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "1px",
        backgroundColor: "var(--deer-gold)",
        margin: "2rem 0",
      }}
    />
  );
}

function GoldLineCentered({ width = 40 }: { width?: number }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "1px",
        backgroundColor: "var(--deer-gold)",
        margin: "2rem auto",
      }}
    />
  );
}

// ── Section 1: Hero ─────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useLanguage();
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
      }}
    >
      {/* 背景圖 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />
      {/* 漸層遮罩 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(10,8,7,0.78) 0%, rgba(10,8,7,0.45) 55%, rgba(10,8,7,0.15) 100%)",
        }}
      />

      {/* 文字 */}
      <div
        className="container"
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "480px" }}>
          <p
            className="font-display"
            style={{
              color: "rgba(197,151,109,0.85)",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            {t("home.tagline")}
          </p>

          <h1
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.35,
              color: "#F0E9DF",
              letterSpacing: "0.06em",
              marginBottom: "2.5rem",
            }}
          >
            {t("home.hero.line1")}
            <br />
            {t("home.hero.line2")}
            <br />
            {t("home.hero.line3")}
          </h1>

          <a
            href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-light"
            style={{ fontSize: "0.8rem" }}
          >
            {t("home.hero.cta")}
          </a>
        </div>
      </div>

      {/* 向下箭頭 */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, transparent, rgba(197,151,109,0.6))",
          }}
        />
      </div>
    </section>
  );
}

// ── Section 2: 品牌轉折 ───────────────────────────────────────────────────
function BrandPivotSection() {
  const ref = useFadeIn();
  const { t } = useLanguage();
  return (
    <section
      className="section-lg"
      style={{ backgroundColor: "var(--deer-bg)" }}
    >
      <div className="container-narrow text-center">
        <div ref={ref} className="fade-up">
          <p
            className="font-label mb-8"
            style={{ color: "var(--deer-gold)" }}
          >
            {t("home.philosophy.label")}
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.7,
              color: "var(--deer-text)",
              letterSpacing: "0.08em",
            }}
          >
            {t("home.philosophy.title1")}
            <br />
            <br />
            {t("home.philosophy.title2")}
            <br />
            {t("home.philosophy.title3")}
          </h2>
          <GoldLineCentered width={32} />
          <p
            style={{
              color: "var(--deer-sub)",
              fontSize: "0.875rem",
              lineHeight: 2,
              letterSpacing: "0.06em",
              whiteSpace: "pre-line",
            }}
          >
            {t("home.philosophy.desc")}
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section 3: 三核心 ─────────────────────────────────────────────────────
function getCores(t: (key: string) => string) {
  return [
    {
      img: SOUP_IMG,
      zh: t("home.cores.soup.zh"),
      en: t("home.cores.soup.en"),
      line1: t("home.cores.soup.subtitle2"),
      line2: "",
      desc: t("home.cores.soup.desc2"),
    },
    {
      img: MEAT_IMG,
      zh: t("home.cores.meat.zh"),
      en: t("home.cores.meat.en"),
      line1: t("home.cores.meat.subtitle2"),
      line2: "",
      desc: t("home.cores.meat.desc2"),
    },
    {
      img: DESSERT_IMG,
      zh: t("home.cores.dessert.zh"),
      en: t("home.cores.dessert.en"),
      line1: t("home.cores.dessert.subtitle2"),
      line2: "",
      desc: t("home.cores.dessert.desc2"),
    },
  ];
}

function CoreSection() {
  const ref = useFadeIn(0.1);
  const { t } = useLanguage();
  const CORES = getCores(t);
  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--deer-bg-dark)" }}
    >
      <div className="container">
        <div ref={ref} className="fade-up text-center mb-16">
          <p className="font-label mb-4" style={{ color: "var(--deer-gold)" }}>
            {t("home.cores.label")}
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              color: "var(--deer-text)",
              letterSpacing: "0.1em",
            }}
          >
            {t("home.cores.title2")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {CORES.map((core, i) => (
            <CoreCard key={i} {...core} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

type CoreItem = { img: string; zh: string; en: string; line1: string; line2: string; desc: string };
function CoreCard({
  img,
  zh,
  en,
  line1,
  line2,
  desc,
  delay,
}: CoreItem & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
            observer.unobserve(el);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="fade-up">
      {/* 圖片 */}
      <div
        style={{
          aspectRatio: "4/3",
          overflow: "hidden",
          marginBottom: "2rem",
        }}
      >
        <img
          src={img}
          alt={zh}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.8s ease",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLImageElement).style.transform = "scale(1.04)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLImageElement).style.transform = "scale(1)")
          }
        />
      </div>

      {/* 文字 */}
      <p className="font-label mb-3" style={{ color: "var(--deer-gold)" }}>
        {en}
      </p>
      <h3
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 300,
          fontSize: "1.75rem",
          color: "var(--deer-text)",
          letterSpacing: "0.1em",
          marginBottom: "0.75rem",
        }}
      >
        {zh}
      </h3>
      <GoldLine width={24} />
      <p
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 300,
          fontSize: "0.9375rem",
          color: "var(--deer-text)",
          lineHeight: 1.8,
          marginBottom: "0.75rem",
        }}
      >
        {line1}
        <br />
        {line2}
      </p>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--deer-sub)",
          lineHeight: 1.9,
        }}
      >
        {desc}
      </p>
    </div>
  );
}// ── Section 4: 體驗敘事 ─────────────────────────────────────────────────────
function getNarrative(t: (key: string) => string) {
  return [
    { step: "01", title: t("home.narrative.step1.title"), body: t("home.narrative.step1.body") },
    { step: "02", title: t("home.narrative.step2.title"), body: t("home.narrative.step2.body") },
    { step: "03", title: t("home.narrative.step3.title"), body: t("home.narrative.step3.body") },
    { step: "04", title: t("home.narrative.step4.title"), body: t("home.narrative.step4.body") },
  ];
}

function NarrativeSection() {
  const { t } = useLanguage();
  const NARRATIVE = getNarrative(t);
  return (
    <section
      className="section-lg"
      style={{ backgroundColor: "var(--deer-dark)" }}
    >
      <div className="container">
        <div className="text-center mb-20">
          <p
            className="font-label mb-4"
            style={{ color: "rgba(197,151,109,0.7)" }}
          >
            {t("home.narrative.label")}
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.1em",
            }}
          >
            {t("home.narrative.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 max-w-3xl mx-auto">
          {NARRATIVE.map((item, i) => (
            <NarrativeItem key={i} {...item} delay={i * 100} />
          ))}
        </div>

        {/* 輕量 CTA */}
        <div style={{ textAlign: "center", marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(197,151,109,0.15)" }}>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.55)", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>
            {t("home.narrative.ctaReady")}
          </p>
          <a
            href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-outline"
          >
            {t("home.narrative.ctaBtn")}
          </a>
        </div>
      </div>
    </section>
  );
}
type NarrativeItemType = { step: string; title: string; body: string };
function NarrativeItem({
  step,
  title,
  body,
  delay,
}: NarrativeItemType & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
            observer.unobserve(el);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="fade-up">
      <p
        className="font-display"
        style={{
          color: "rgba(197,151,109,0.5)",
          fontSize: "2.5rem",
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        {step}
      </p>
      <h3
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 300,
          fontSize: "1.0625rem",
          color: "var(--deer-dark-text)",
          letterSpacing: "0.08em",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          width: "24px",
          height: "1px",
          backgroundColor: "rgba(197,151,109,0.5)",
          marginBottom: "1rem",
        }}
      />
      <p
        style={{
          fontSize: "0.8125rem",
          color: "rgba(240,233,223,0.5)",
          lineHeight: 2,
          whiteSpace: "pre-line",
        }}
      >
        {body}
      </p>
    </div>
  );
}

/// ── Section 5: 空間 ─────────────────────────────────────────────────────
function SpaceSection() {
  const ref = useFadeIn(0.1);
  const { t } = useLanguage();
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* 圖片 */}
      <div style={{ position: "relative", height: "80vh", minHeight: "500px" }}>
        <img
          src={SPACE_IMG}
          alt="初衷小鹿空間"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,8,7,0.1) 0%, rgba(10,8,7,0.6) 100%)",
          }}
        />
        <div
          ref={ref}
          className="fade-up"
          style={{
            position: "absolute",
            bottom: "4rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            width: "100%",
            padding: "0 2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              color: "#F0E9DF",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            {t("home.space.title2")}
            <br />
            {t("home.space.title2b")}
          </h2>
          <Link href="/space">
            <span className="btn-deer-light" style={{ fontSize: "0.8rem" }}>
              {t("home.space.cta")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/// ── Section 6: 信任 ─────────────────────────────────────────────────────
function TrustSection() {
  const ref = useFadeIn();
  const { t } = useLanguage();
  const { data: placeData, isLoading: placeLoading } = trpc.placeInfo.getReviews.useQuery();;
  const rating = placeData?.rating ?? 4.6;
  const totalRatings = placeData?.totalRatings ?? 1593;
  const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/aWRwfie8rDpdxK277";
  return (
    <section
      className="section-lg"
      style={{ backgroundColor: "var(--deer-bg)" }}
    >
      <div className="container-narrow text-center">
        <div ref={ref} className="fade-up">
          <p className="font-label mb-8" style={{ color: "var(--deer-gold)" }}>
            {t("home.trust.googleReviews")}
          </p>

           {/* 星評 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.375rem",
              marginBottom: "1.5rem",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const filled = star <= Math.floor(rating);
              const half = !filled && star === Math.ceil(rating) && rating % 1 >= 0.3;
              return (
                <span key={star} style={{ position: "relative", display: "inline-block", fontSize: "1.25rem", color: "var(--deer-muted)" }}>
                  ★
                  {(filled || half) && (
                    <span style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      overflow: "hidden",
                      width: filled ? "100%" : "55%",
                      color: "var(--deer-gold)",
                    }}>★</span>
                  )}
                </span>
              );
            })}
          </div>
          <p
            className="font-display"
            style={{
              fontSize: "clamp(3rem, 8vw, 5rem)",
              color: "var(--deer-text)",
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}
          >
            {rating.toFixed(1)}
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--deer-sub)",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            {t("home.trust.reviewCount").replace("{n}", totalRatings.toLocaleString())}
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontSize: "0.7rem",
              color: "rgba(197,151,109,0.75)",
              textDecoration: "none",
              letterSpacing: "0.12em",
              border: "1px solid rgba(197,151,109,0.3)",
              padding: "0.4rem 1.25rem",
              fontFamily: "'Cormorant Garamond', serif",
              transition: "all 0.2s",
              marginBottom: "2.5rem",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.3)"; }}
          >
            {t("home.trust.viewReviews")}
          </a>

          <GoldLineCentered width={32} />

          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 300,
              fontSize: "1rem",
              color: "var(--deer-text)",
              lineHeight: 2,
              letterSpacing: "0.06em",
            }}
          >
            {t("home.trust.authentic1")}
            <br />
            {t("home.trust.authentic2")}
          </p>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--deer-sub)",
              marginTop: "1rem",
              lineHeight: 1.9,
            }}
          >
            {t("home.trust.authenticSub")}
          </p>



          {/* 獲獎敘述 */}
          <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(197,151,109,0.12)", paddingTop: "2.5rem" }}>
            <p className="font-label mb-8" style={{ color: "rgba(197,151,109,0.5)" }}>
              {t("home.trust.recognition")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)", marginBottom: "0.5rem" }}>
                  {t("home.trust.award1.year")}
                </p>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", lineHeight: 1.6 }}>
                  {t("home.trust.award1.title")}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)", marginBottom: "0.5rem" }}>
                  {t("home.trust.award2.year")}
                </p>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", lineHeight: 1.6 }}>
                  {t("home.trust.award2.title")}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)", marginBottom: "0.5rem" }}>
                  {t("home.trust.award3.year")}
                </p>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", lineHeight: 1.6 }}>
                  {t("home.trust.award3.title")}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--deer-sub)", marginTop: "0.4rem", lineHeight: 1.7 }}>
                  {t("home.trust.award3.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 6.8: CRÈM 一條龍服務 ────────────────────────────────────────────
function getCremSteps(t: (key: string) => string) {
  return [
    { num: "01", label: t("home.crem.step1.label"), desc: t("home.crem.step1.desc") },
    { num: "02", label: t("home.crem.step2.label"), desc: t("home.crem.step2.desc") },
    { num: "03", label: t("home.crem.step3.label"), desc: t("home.crem.step3.desc") },
    { num: "04", label: t("home.crem.step4.label"), desc: t("home.crem.step4.desc") },
  ];
}

function CremSection() {
  const ref = useFadeIn(0.08);
  const { t } = useLanguage();
  const CREM_IMG = "/manus-storage/crem-cake_7f5629d5.jpg";
  const DEER_LOGO = "/manus-storage/deer-logo-white_a35020cd.webp";
  const CREM_LOGO = "/manus-storage/crem-logo-white_f9b62a3f.webp";
  return (
    <section
      style={{
        backgroundColor: "var(--deer-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 裝飾性橫線 */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(197,151,109,0.3), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(197,151,109,0.3), transparent)" }} />

      {/* ── 聯名橫幅 — 照片上方獨立區塊 ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(1.5rem, 5vw, 4rem)",
        padding: "0px 33px",
        borderBottom: "1px solid rgba(197,151,109,0.18)",
      }}>
        <img
          src={DEER_LOGO}
          alt="初衷小鹿 Logo"
          style={{ height: "clamp(56px, 10vw, 96px)", width: "auto", objectFit: "contain" }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2rem, 6vw, 4rem)",
            color: "rgba(197,151,109,0.9)",
            lineHeight: 1,
            letterSpacing: "0.05em",
          }}>×</span>
        </div>
        <img
          src={CREM_LOGO}
          alt="CRÈM Logo"
          style={{ height: "clamp(56px, 10vw, 96px)", width: "auto", objectFit: "contain" }}
        />
      </div>
      {/* 橫式全寬照片 */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* 手機版：完整顯示圖片（contain），電腦版：全寬填滿（cover） */}
        <picture>
          <img
            src={CREM_IMG}
            alt="CRÈM 慶祝蛋糕"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              objectPosition: "center center",
              backgroundColor: "var(--deer-dark)",
            }}
            loading="eager"
          />
        </picture>
        {/* 漸層遮罩 — 底部文字區 */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,8,7,0.1) 0%, rgba(10,8,7,0.0) 40%, rgba(10,8,7,0.75) 100%)",
        }} />
        {/* 照片底部文字 — 電腦版顯示，手機版隱藏 */}
        <div className="crem-img-overlay-text" style={{
          position: "absolute",
          bottom: "2.5rem",
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 2rem",
        }}>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#F0E9DF", letterSpacing: "0.1em", lineHeight: 1.5 }}>
            {t("home.crem.imgTitle")}
          </h2>
        </div>
      </div>

      {/* 手機版圖片下方標題（電腦版隱藏） */}
      <div className="crem-mobile-title" style={{
        textAlign: "center",
        padding: "2rem 1.5rem 0",
        backgroundColor: "var(--deer-dark)",
      }}>
        <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 5vw, 2.5rem)", color: "#F0E9DF", letterSpacing: "0.1em", lineHeight: 1.5 }}>
          {t("home.crem.imgTitleMobile1")}
          <br />
          {t("home.crem.imgTitleMobile2")}
        </h2>
      </div>
      {/* 文字說明 + 步驟 + CTA */}
      <div className="container" style={{ padding: "5rem 0" }}>
        <div ref={ref} className="fade-up">
          {/* 說明文字 */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="crem-collab-desc" style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(240,233,223,0.5)", lineHeight: 2, letterSpacing: "0.06em", maxWidth: "520px", margin: "0 auto 2rem" }}>
              {t("home.crem.desc1")}
              <br />
              {t("home.crem.desc2")}
              <br />
              <span className="crem-collab-sub">{t("home.crem.descSub")}</span>
            </p>
          </div>

          {/* 步驟流程 */}
          {(() => { const CREM_STEPS = getCremSteps(t); return (
          <div className="crem-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", marginBottom: "3rem", border: "1px solid rgba(197,151,109,0.12)", maxWidth: "860px", margin: "0 auto 3rem" }}>
            {CREM_STEPS.map((step, i) => (
              <CremStep key={i} {...step} delay={i * 100} />
            ))}
          </div>
          ); })()}

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.35)", letterSpacing: "0.06em", marginBottom: "2rem" }}>
              {t("home.crem.ctaDesc")}
            </p>
            <a
              href="https://deersbistro.tw/crem"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-deer-light"
              style={{ fontSize: "0.8rem" }}
            >
              {t("home.crem.ctaBtn")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type CremStepItem = { num: string; label: string; desc: string };
function CremStep({ num, label, desc, delay }: CremStepItem & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="fade-up crem-step-item"
      style={{
        padding: "2.5rem 2rem",
        borderRight: "1px solid rgba(197,151,109,0.12)",
        borderBottom: "1px solid rgba(197,151,109,0.12)",
        textAlign: "center",
      }}
    >
      <p
        className="crem-step-num"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "2.25rem",
          color: "rgba(197,151,109,0.25)",
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        {num}
      </p>
      <h3
        className="crem-step-label"
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 300,
          fontSize: "0.9375rem",
          color: "var(--deer-dark-text)",
          letterSpacing: "0.1em",
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </h3>
      <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(197,151,109,0.4)", margin: "0 auto 0.75rem" }} />
      <p
        className="crem-step-desc"
        style={{
          fontSize: "0.8rem",
          color: "rgba(240,233,223,0.4)",
          lineHeight: 1.9,
        }}
      >
      {desc}
      </p>
    </div>
  );
}

// ── Section 7: CTA ────────────────────────────────────────────────────────────────────────────
function CTASection() {
  const ref = useFadeIn();
  const { t } = useLanguage();
  return (
    <section
      className="section-lg"
      style={{ backgroundColor: "var(--deer-dark)" }}
    >
      <div className="container-narrow text-center">
        <div ref={ref} className="fade-up">
          <p
            className="font-label mb-8"
            style={{ color: "rgba(197,151,109,0.7)" }}
          >
            {t("home.cta.label")}
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            {t("home.cta.title")}
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(240,233,223,0.45)",
              lineHeight: 2,
              marginBottom: "3rem",
              letterSpacing: "0.06em",
            }}
          >
            {t("home.cta.subtitle")}
          </p>
          <a
            href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-light"
          >
            {t("home.cta.btn")}
          </a>
        </div>
      </div>
    </section>
  );
}

// ── 主元件 ──────────────────// ── 主元件 ────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandPivotSection />
      <CoreSection />
      <CremSection />
      <SpaceSection />
      <TrustSection />
      <CTASection />
    </main>
  );
}