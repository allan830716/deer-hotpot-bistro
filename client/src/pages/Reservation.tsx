/*
 * 初衷小鹿 — 訂位資訊 Reservation.tsx
 * 嵌入 inline 訂位系統，加入訂位公告與注意事項
 */
import { useEffect, useRef } from "react";

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

const NOTICES = [
  {
    en: "Minimum Spend",
    zh: "最低消費",
    content: "晚餐時段每位 NT$600（以單人獨立計算）\n商業午餐每位 NT$300\n以上價格均加收一成服務費",
  },
  {
    en: "Hours",
    zh: "營業時間",
    content: "週二至週日\n午餐 12:00 — 14:00（平日供應，假日不供應）\n晚餐 17:30 — 22:00\n週一公休",
  },
  {
    en: "Location",
    zh: "地址",
    content: "台北市信義區\n忠孝東路四段 553 巷 6 弄 15 號",
  },
  {
    en: "Beverage Policy",
    zh: "飲品規定",
    content: "本餐廳僅提供 NATURA 微礦水或微礦氣泡水\n禁止飲用烈酒\n自備酒水酌收開瓶費葡萄酒每瓶 NT$200",
  },
];

const CELEBRATION_STEPS = [
  { step: "01", title: "訂位時告知", desc: "於線上訂位備注欄填寫慶祝需求，包含慶祝對象與日期。" },
  { step: "02", title: "選擇蛋糕", desc: "我們將為您介紹 CRÈM 鮮奶油專門店的當季蛋糕選項。" },
  { step: "03", title: "餐廳協助配送", desc: "蛋糕由餐廳代為安排配送，並在適當時機為您上桌。" },
];

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
    <div ref={ref} className="fade-up" style={{ borderTop: "1px solid rgba(107,74,50,0.2)", paddingTop: "1.5rem" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "0.5rem" }}>{en}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{zh}</h3>
      <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "var(--deer-sub)", lineHeight: 2, whiteSpace: "pre-line" as const }}>{content}</p>
    </div>
  );
}

function CelebrationStep({ step, title, desc, delay }: { step: string; title: string; desc: string; delay: number }) {
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
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{title}</h3>
      <div style={{ width: "16px", height: "1px", backgroundColor: "var(--deer-gold)", marginBottom: "0.75rem" }} />
      <p style={{ fontSize: "0.8125rem", color: "var(--deer-sub)", lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}

export default function Reservation() {
  const heroRef = useFadeIn(0);
  const noticeRef = useFadeIn(0);
  const celebRef = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px" }}>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "8rem 0 7rem" }}>
        <div className="container">
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "1.5rem" }}>Reservation</p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--deer-dark-text)", letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "2rem" }}>預約一場餐桌</h1>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.6)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.6)", lineHeight: 2, letterSpacing: "0.05em" }}>
              把時間，留給重要的人。
            </p>
          </div>
        </div>
      </section>

      {/* ── inline 訂位系統嵌入 ── */}
      <section style={{ backgroundColor: "var(--deer-bg)", padding: "5rem 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "2rem" }}>
            Online Booking
          </p>
          <div style={{
            width: "100%",
            minHeight: "700px",
            border: "1px solid rgba(107,74,50,0.2)",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}>
            <iframe
              src="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
              width="100%"
              height="700"
              style={{ border: "none", display: "block" }}
              title="初衷小鹿線上訂位"
              allow="payment"
            />
          </div>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "var(--deer-muted)", marginTop: "1rem", lineHeight: 1.8 }}>
            如遇訂位系統問題，亦可透過 Instagram 或 Facebook 私訊聯絡我們。
          </p>
        </div>
      </section>

      {/* ── 訂位注意事項 ── */}
      <section className="section-lg" style={{ backgroundColor: "var(--deer-bg-dark)" }}>
        <div className="container">
          <div ref={noticeRef} className="fade-up mb-12">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "1rem" }}>
              Booking Notice
            </p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-text)", letterSpacing: "0.1em" }}>
              訂位公告
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {NOTICES.map((item, i) => (
              <InfoItem key={i} {...item} delay={i * 80} />
            ))}
          </div>

          {/* 額外注意事項 */}
          <div style={{ marginTop: "3rem", padding: "2rem", border: "1px solid rgba(197,151,109,0.15)", backgroundColor: "rgba(26,18,16,0.3)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "1rem" }}>
              Important Notes
            </p>
            <div style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "var(--deer-sub)", lineHeight: 2.2, letterSpacing: "0.04em" }}>
              <p>· 建議提前 3–7 天預約，以確保您偏好的時段與席位。</p>
              <p>· 如有特殊需求（包廂、慶祝佈置、飲食限制），請於備注欄說明。</p>
              <p>· 部分餐點可能會因供貨短缺及品質等因素而無法正常供應。</p>
              <p>· 每份套餐均含一份前菜、綜合菜盤、副餐及甜點。</p>
              <p>· 商業午餐僅平日 12:00–14:00 供應，假日及例假日不供應。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 慶祝蛋糕服務 ── */}
      <section className="section" style={{ backgroundColor: "var(--deer-bg)" }}>
        <div className="container">
          <div ref={celebRef} className="fade-up text-center mb-16">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "1rem" }}>Celebration Service</p>
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

      {/* ── 適合的時刻 ── */}
      <section className="section-lg" style={{ backgroundColor: "var(--deer-dark)" }}>
        <div className="container-narrow text-center">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.6)", marginBottom: "2rem" }}>Suitable For</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-dark-text)", letterSpacing: "0.1em", marginBottom: "3rem" }}>適合的時刻</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["約會", "週年紀念", "生日餐敘", "重要聚會"].map((label, i) => (
              <div key={i} style={{ padding: "1.5rem 1rem", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" as const }}>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.7)", letterSpacing: "0.08em" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
