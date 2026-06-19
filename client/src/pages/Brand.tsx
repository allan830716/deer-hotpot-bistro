/*
 * 初衷小鹿 — 品牌故事 Brand.tsx
 * v3：四語言支援
 */

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_IMG = "/images/space_J_brand_3b560a56.jpg";

function useFadeIn(delay = 0) {
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
  return ref;
}

function GoldLine() {
  return <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.6)", margin: "2rem 0" }} />;
}

function StatItem({ num, label, delay, href }: { num: string; label: string; delay: number; href?: string }) {
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
    <div ref={ref} className="fade-up">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", color: "rgba(197,151,109,0.9)", lineHeight: 1, marginBottom: "0.5rem" }}>{num}</p>
          <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.45)", letterSpacing: "0.06em", fontFamily: "'Noto Serif TC', serif", fontWeight: 300 }}>{label}</p>
        </a>
      ) : (
        <>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", color: "rgba(197,151,109,0.9)", lineHeight: 1, marginBottom: "0.5rem" }}>{num}</p>
          <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.45)", letterSpacing: "0.06em", fontFamily: "'Noto Serif TC', serif", fontWeight: 300 }}>{label}</p>
        </>
      )}
    </div>
  );
}

type CommitmentItem = { en: string; zh: string; desc: string };

function CommitmentCard({ en, zh, desc, delay }: CommitmentItem & { delay: number }) {
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
    <div ref={ref} className="fade-up" style={{ borderTop: "1px solid rgba(197,151,109,0.15)", paddingTop: "2rem" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.8)", marginBottom: "0.75rem" }}>{en}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1.375rem", color: "rgba(240,233,223,0.9)", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>{zh}</h3>
      <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.45)", lineHeight: 2, fontFamily: "'Noto Serif TC', serif", fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

export default function Brand() {
  const { t } = useLanguage();
  const heroRef        = useFadeIn(0);
  const storyRef       = useFadeIn(100);
  const commitmentsRef = useFadeIn(0);
  const quoteRef       = useFadeIn(0);

  const liveRating = 4.6;
  const liveTotal  = 1593;
  const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/aWRwfie8rDpdxK277";

  const BRAND_COMMITMENTS: CommitmentItem[] = [
    { en: t("brand.commitment.c1.en"), zh: t("brand.commitment.c1.zh"), desc: t("brand.commitment.c1.desc") },
    { en: t("brand.commitment.c2.en"), zh: t("brand.commitment.c2.zh"), desc: t("brand.commitment.c2.desc") },
    { en: t("brand.commitment.c3.en"), zh: t("brand.commitment.c3.zh"), desc: t("brand.commitment.c3.desc") },
    { en: t("brand.commitment.c4.en"), zh: t("brand.commitment.c4.zh"), desc: t("brand.commitment.c4.desc") },
  ];

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)" }}>

      {/* ── Hero 全版圖 ── */}
      <section style={{ position: "relative", height: "70vh", minHeight: "480px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,7,0.45) 0%, rgba(10,8,7,0.85) 100%)" }} />
        <div className="container" style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end", paddingBottom: "5rem" }}>
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.7)", marginBottom: "1.5rem" }}>
              {t("brand.hero.label")}
            </p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0E9DF", letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              {t("brand.hero.title")}
            </h1>
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.6)", lineHeight: 2, letterSpacing: "0.05em" }}>
              {t("brand.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ── 起源故事 ── */}
      <section className="section-lg" style={{ backgroundColor: "var(--deer-dark)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* 左側：故事文字 */}
            <div ref={storyRef} className="fade-up">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.8)", marginBottom: "1.5rem" }}>
                {t("brand.origin.label")}
              </p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "rgba(240,233,223,0.9)", letterSpacing: "0.08em", marginBottom: "2rem", lineHeight: 1.6 }}>
                {t("brand.origin.title")}
              </h2>
              <GoldLine />
              <div style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.5)", lineHeight: 2.1, letterSpacing: "0.04em" }}>
                <p style={{ marginBottom: "1.5rem" }}>{t("brand.origin.p1")}</p>
                <p style={{ marginBottom: "1.5rem" }}>{t("brand.origin.p2")}</p>
                <p>{t("brand.origin.p3")}</p>
              </div>
            </div>

            {/* 右側：品牌數字 */}
            <div className="flex flex-col gap-12">
              {[
                { num: "2019",   label: t("brand.stats.founded") },
                { num: liveRating.toFixed(1), label: `${t("brand.stats.rating")}（${liveTotal.toLocaleString()} ${t("brand.stats.reviews")}）`, href: GOOGLE_REVIEWS_URL },
                { num: "Top 10", label: t("brand.stats.top10") },
                { num: "Top 30", label: t("brand.stats.top30") },
              ].map((item, i) => (
                <StatItem key={i} {...item} delay={i * 100} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 我們的堅持 ── */}
      <section className="section" style={{ backgroundColor: "rgba(18,12,10,0.8)", borderTop: "1px solid rgba(197,151,109,0.08)" }}>
        <div className="container">
          <div ref={commitmentsRef} className="fade-up" style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.8)", marginBottom: "1rem" }}>
              {t("brand.commitment.label")}
            </p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "rgba(240,233,223,0.9)", letterSpacing: "0.08em" }}>
              {t("brand.commitment.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {BRAND_COMMITMENTS.map((v, i) => (
              <CommitmentCard key={i} {...v} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 引言 ── */}
      <section className="section-lg" style={{ backgroundColor: "var(--deer-dark)" }}>
        <div className="container-narrow text-center">
          <div ref={quoteRef} className="fade-up">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.5)", marginBottom: "2.5rem" }}>
              {t("brand.quote.label")}
            </p>
            <blockquote style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", color: "rgba(240,233,223,0.85)", lineHeight: 1.9, letterSpacing: "0.08em", borderLeft: "none", margin: 0, padding: 0 }}>
              {t("brand.quote.text")}
            </blockquote>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.4)", margin: "2.5rem auto" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(240,233,223,0.4)", lineHeight: 2, letterSpacing: "0.06em", maxWidth: "480px", margin: "0 auto 2rem" }}>
              {t("brand.quote.desc")}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.2)", letterSpacing: "0.12em" }}>
              {t("brand.quote.en")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
