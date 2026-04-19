/*
 * 初衷小鹿 — 空間體驗 Space.tsx
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

const SPACE_IMAGES = [
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80", alt: "用餐空間全景", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "餐桌設置" },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", alt: "吧台區域" },
  { src: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80", alt: "私人包廂" },
  { src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80", alt: "甜點展示" },
];

const SPACE_FEATURES = [
  { en: "Ambience", zh: "氛圍", desc: "低照度、暖銅燈光，讓整個空間在夜晚呈現出最適合重要時刻的質地。" },
  { en: "Privacy", zh: "距離感", desc: "桌距設計讓每一組客人都有足夠的空間，不被打擾，只有彼此。" },
  { en: "Detail", zh: "細節", desc: "訂製抽屜式餐具收納、手工陶瓷器皿，每一個接觸點都是設計的一部分。" },
];

export default function Space() {
  const heroRef = useFadeIn(0);
  const featRef = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px" }}>
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "8rem 0 7rem" }}>
        <div className="container">
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.7)", marginBottom: "1.5rem" }}>Space</p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--deer-dark-text)", letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "2rem" }}>空間體驗</h1>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.6)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.6)", lineHeight: 2, letterSpacing: "0.05em" }}>
              為了那些不該被打擾的時刻。
            </p>
          </div>
        </div>
      </section>

      <section className="section-lg" style={{ backgroundColor: "var(--deer-bg)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div style={{ aspectRatio: "16/9", overflow: "hidden", gridColumn: "1 / -1" }}>
              <img src={SPACE_IMAGES[0].src} alt={SPACE_IMAGES[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPACE_IMAGES.slice(1).map((img, i) => (
              <div key={i} style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--deer-bg-dark)" }}>
        <div className="container">
          <div ref={featRef} className="fade-up text-center mb-16">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Space Design</p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-text)", letterSpacing: "0.1em" }}>空間的每一個細節，都是設計。</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SPACE_FEATURES.map((f, i) => (
              <SpaceFeatureCard key={i} {...f} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-lg" style={{ backgroundColor: "var(--deer-dark)" }}>
        <div className="container-narrow text-center">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.6)", marginBottom: "2rem" }}>Visit Us</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--deer-dark-text)", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>把時間，留給重要的人。</h2>
          <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", lineHeight: 2, marginBottom: "3rem", letterSpacing: "0.06em" }}>台北市信義區忠孝東路四段 553 巷 6 弄 15 號</p>
          <a href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf" target="_blank" rel="noopener noreferrer" className="btn-deer-light" style={{ fontSize: "0.8rem" }}>預約一場餐桌</a>
        </div>
      </section>
    </main>
  );
}

function SpaceFeatureCard({ en, zh, desc, delay }: { en: string; zh: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } }, { threshold: 0.1 });
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up">
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "0.75rem" }}>{en}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1.5rem", color: "var(--deer-text)", letterSpacing: "0.1em", marginBottom: "1rem" }}>{zh}</h3>
      <div style={{ width: "20px", height: "1px", backgroundColor: "var(--deer-gold)", marginBottom: "1rem" }} />
      <p style={{ fontSize: "0.8125rem", color: "var(--deer-sub)", lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}
