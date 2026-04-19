/*
 * 初衷小鹿 — 訂位資訊 Reservation.tsx
 */
import { useEffect, useRef } from "react";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } }, { threshold: 0.1 });
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return ref;
}

const INFO_ITEMS = [
  { en: "Location", zh: "地址", content: "台北市信義區\n忠孝東路四段 553 巷 6 弄 15 號" },
  { en: "Hours", zh: "營業時間", content: "週二至週日\n午餐 11:30 — 14:30\n晚餐 17:30 — 22:00\n（週一公休）" },
  { en: "Minimum", zh: "最低消費", content: "晚餐時段每位 NT$600\n另加一成服務費" },
];

const CELEBRATION_STEPS = [
  { step: "01", title: "訂位時告知", desc: "於線上訂位備注欄填寫慶祝需求，包含慶祝對象與日期。" },
  { step: "02", title: "選擇蛋糕", desc: "我們將為您介紹 CRÈM 鮮奶油專門店的當季蛋糕選項。" },
  { step: "03", title: "餐廳協助配送", desc: "蛋糕由餐廳代為安排配送，並在適當時機為您上桌。" },
];

export default function Reservation() {
  const heroRef = useFadeIn(0);
  const infoRef = useFadeIn(0);
  const celebRef = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px" }}>
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "8rem 0 7rem" }}>
        <div className="container">
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.7)", marginBottom: "1.5rem" }}>Reservation</p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--deer-dark-text)", letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "2rem" }}>預約一場餐桌</h1>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.6)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.6)", lineHeight: 2, letterSpacing: "0.05em" }}>
              把時間，留給重要的人。
            </p>
          </div>
        </div>
      </section>

      <section className="section-lg" style={{ backgroundColor: "var(--deer-bg)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <div ref={infoRef} className="fade-up">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "2rem" }}>Visit Information</p>
                <div className="flex flex-col gap-10">
                  {INFO_ITEMS.map((item, i) => (
                    <InfoItem key={i} {...item} delay={i * 80} />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "2rem" }}>Online Booking</p>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "var(--deer-sub)", lineHeight: 2, marginBottom: "2.5rem" }}>
                建議提前 3–7 天預約，以確保您偏好的時段與席位。
                如有特殊需求（包廂、慶祝佈置、飲食限制），請於備注欄說明。
              </p>
              <a href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf" target="_blank" rel="noopener noreferrer" className="btn-deer">立即預約</a>
              <p style={{ fontSize: "0.75rem", color: "var(--deer-muted)", marginTop: "1.5rem", lineHeight: 1.8 }}>
                如需電話預約，請撥打 02-2345-6789
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--deer-bg-dark)" }}>
        <div className="container">
          <div ref={celebRef} className="fade-up text-center mb-16">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Celebration Service</p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-text)", letterSpacing: "0.1em", marginBottom: "1rem" }}>慶祝蛋糕一條龍服務</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--deer-sub)", lineHeight: 2 }}>與 CRÈM 鮮奶油專門店合作，讓甜點成為這個時刻的完整收尾。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto">
            {CELEBRATION_STEPS.map((step, i) => (
              <CelebrationStep key={i} {...step} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-lg" style={{ backgroundColor: "var(--deer-dark)" }}>
        <div className="container-narrow text-center">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.6)", marginBottom: "2rem" }}>Suitable For</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-dark-text)", letterSpacing: "0.1em", marginBottom: "3rem" }}>適合的時刻</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["約會", "週年紀念", "生日餐敘", "重要聚會"].map((label, i) => (
              <div key={i} style={{ padding: "1.5rem 1rem", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.7)", letterSpacing: "0.08em" }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.4)", margin: "3rem auto" }} />
          <a href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf" target="_blank" rel="noopener noreferrer" className="btn-deer-light">預約一場餐桌</a>
        </div>
      </section>
    </main>
  );
}

function InfoItem({ en, zh, content, delay }: { en: string; zh: string; content: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } }, { threshold: 0.1 });
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up">
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "0.5rem" }}>{en}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{zh}</h3>
      <div style={{ width: "16px", height: "1px", backgroundColor: "var(--deer-gold)", marginBottom: "0.75rem" }} />
      <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "var(--deer-sub)", lineHeight: 2, whiteSpace: "pre-line" }}>{content}</p>
    </div>
  );
}

function CelebrationStep({ step, title, desc, delay }: { step: string; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } }, { threshold: 0.1 });
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up">
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.5rem", color: "rgba(197,151,109,0.4)", lineHeight: 1, marginBottom: "1rem" }}>{step}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{title}</h3>
      <div style={{ width: "16px", height: "1px", backgroundColor: "var(--deer-gold)", marginBottom: "0.75rem" }} />
      <p style={{ fontSize: "0.8125rem", color: "var(--deer-sub)", lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}
