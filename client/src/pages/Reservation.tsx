/*
 * 初衷小鹿 — 訂位資訊 Reservation.tsx
 * v2：全黑色背景
 */
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } },
      { threshold: 0.1 }
    );
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return ref;
}

function InfoItem({ en, zh, content, delay }: { en: string; zh: string; content: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } },
      { threshold: 0.1 }
    );
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up" style={{ borderTop: "1px solid rgba(197,151,109,0.15)", paddingTop: "1.5rem" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.8)", marginBottom: "0.5rem" }}>{en}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.9)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{zh}</h3>
      <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(240,233,223,0.5)", lineHeight: 2, whiteSpace: "pre-line" as const }}>{content}</p>
    </div>
  );
}

function CelebStep({ step, title, desc, delay }: { step: string; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } },
      { threshold: 0.1 }
    );
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up">
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.5rem", color: "rgba(197,151,109,0.4)", lineHeight: 1, marginBottom: "1rem" }}>{step}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.9)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{title}</h3>
      <div style={{ width: "24px", height: "1px", backgroundColor: "rgba(197,151,109,0.4)", marginBottom: "1rem" }} />
      <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.45)", lineHeight: 2 }}>{desc}</p>
    </div>
  );
}

export default function Reservation() {
  const { t } = useLanguage();
  const heroRef   = useFadeIn(0);
  const noticeRef = useFadeIn(0);
  const celebRef  = useFadeIn(0);

  const NOTICES = [
    { en: t("reservation.notice.n1.en"), zh: t("reservation.notice.n1.zh"), content: t("reservation.notice.n1.content") },
    { en: t("reservation.notice.n2.en"), zh: t("reservation.notice.n2.zh"), content: t("reservation.notice.n2.content") },
    { en: t("reservation.notice.n3.en"), zh: t("reservation.notice.n3.zh"), content: t("reservation.notice.n3.content") },
    { en: t("reservation.notice.n4.en"), zh: t("reservation.notice.n4.zh"), content: t("reservation.notice.n4.content") },
  ];

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)" }}>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "8rem 0 7rem" }}>
        <div className="container">
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "1.5rem" }}>{t("reservation.hero.label")}</p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2rem, 4vw, 3rem)", color: "rgba(240,233,223,0.95)", letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "2rem" }}>{t("reservation.hero.title")}</h1>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.6)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.5)", lineHeight: 2, letterSpacing: "0.05em" }}>
              {t("reservation.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ── inline 訂位系統嵌入 ── */}
      <section style={{ backgroundColor: "rgba(10,8,7,0.95)", padding: "5rem 0", borderTop: "1px solid rgba(197,151,109,0.08)" }}>
        <div className="container">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "2rem" }}>
            {t("reservation.booking.label")}
          </p>
          <div style={{
            width: "100%",
            border: "1px solid rgba(197,151,109,0.12)",
            overflow: "hidden",
            backgroundColor: "#fff",
            borderRadius: "2px",
          }} className="inline-booking-container">
            <iframe
              src="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
              width="100%"
              height="100%"
              style={{ border: "none", display: "block", minHeight: "100%" }}
              title="初衷小鹿線上訂位"
              allow="payment"
              loading="lazy"
            />
          </div>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.3)", marginTop: "1rem", lineHeight: 1.8 }}>
            {t("reservation.booking.note")}
          </p>
        </div>
      </section>

      {/* ── 訂位注意事項 ── */}
      <section className="section-lg" style={{ backgroundColor: "rgba(14,10,9,0.98)", borderTop: "1px solid rgba(197,151,109,0.08)" }}>
        <div className="container">
          <div ref={noticeRef} className="fade-up mb-12">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.8)", marginBottom: "1rem" }}>
              {t("reservation.notice.label")}
            </p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "rgba(240,233,223,0.9)", letterSpacing: "0.1em" }}>
              {t("reservation.notice.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {NOTICES.map((item, i) => (
              <InfoItem key={i} {...item} delay={i * 80} />
            ))}
          </div>

          {/* 額外注意事項 */}
          <div style={{ marginTop: "3rem", padding: "2rem", border: "1px solid rgba(197,151,109,0.12)", backgroundColor: "rgba(197,151,109,0.04)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "1.25rem" }}>
              {t("reservation.notes.label")}
            </p>
            <div style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(240,233,223,0.45)", lineHeight: 2.2, letterSpacing: "0.04em" }}>
              <p style={{ marginBottom: "0.25rem" }}>· {t("reservation.notes.b1")}</p>
              <p style={{ marginBottom: "0.25rem" }}>· {t("reservation.notes.b2")}</p>
              <p style={{ marginBottom: "0.25rem" }}>· {t("reservation.notes.b3")}</p>
              <p style={{ marginBottom: "0.25rem" }}>· {t("reservation.notes.b4")}</p>
              <p>· {t("reservation.notes.b5")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 慶祝蛋糕服務 ── */}
      <section className="section" style={{ backgroundColor: "var(--deer-dark)", borderTop: "1px solid rgba(197,151,109,0.08)" }}>
        <div className="container">
          <div ref={celebRef} className="fade-up mb-14">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "1rem" }}>{t("reservation.celeb.label")}</p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "rgba(240,233,223,0.9)", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              {t("reservation.celeb.title")}
            </h2>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.5)", marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(240,233,223,0.45)", lineHeight: 2, maxWidth: "560px" }}>
              {t("reservation.celeb.desc")}
            </p>
          </div>

          {/* 服務流程 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
            {[
              { step: t("reservation.celeb.s1.step"), title: t("reservation.celeb.s1.title"), desc: t("reservation.celeb.s1.desc") },
              { step: t("reservation.celeb.s2.step"), title: t("reservation.celeb.s2.title"), desc: t("reservation.celeb.s2.desc") },
              { step: t("reservation.celeb.s3.step"), title: t("reservation.celeb.s3.title"), desc: t("reservation.celeb.s3.desc") },
            ].map(({ step, title, desc }, i) => (
              <CelebStep key={i} step={step} title={title} desc={desc} delay={i * 100} />
            ))}
          </div>

          {/* 服務亮點 */}
          <div style={{ padding: "2rem", border: "1px solid rgba(197,151,109,0.12)", backgroundColor: "rgba(197,151,109,0.04)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "1.25rem" }}>
              {t("reservation.celeb.highlights.label")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[
                t("reservation.celeb.h1"),
                t("reservation.celeb.h2"),
                t("reservation.celeb.h3"),
                t("reservation.celeb.h4"),
                t("reservation.celeb.h5"),
                t("reservation.celeb.h6"),
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(197,151,109,0.8)", fontSize: "0.9rem", flexShrink: 0, marginTop: "0.1rem" }}>→</span>
                  <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.45)", lineHeight: 1.9 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* CRÈM 官網按鈕 */}
            <div style={{ marginTop: "2.5rem", padding: "2rem", border: "1px solid rgba(197,151,109,0.25)", backgroundColor: "rgba(197,151,109,0.06)", maxWidth: "480px" }}>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(197,151,109,0.7)", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>{t("reservation.celeb.cta.ready")}</p>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(240,233,223,0.6)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                {t("reservation.celeb.cta.desc")}
              </p>
              <a
                href="https://www.crem.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-deer-light"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem" }}
              >
                {t("reservation.celeb.cta.btn")}
                <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
