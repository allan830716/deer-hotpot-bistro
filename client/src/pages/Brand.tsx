/*
 * 初衷小鹿 — 品牌故事 Brand.tsx
 * v2：全黑背景、加入空間圖片增加氛圍感
 */

import { useEffect, useRef } from "react";

const HERO_IMG  = "/manus-storage/space_J_brand_3b560a56.jpg";

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

const BRAND_COMMITMENTS = [
  { en: "Broth First",    zh: "天然上湯",  desc: "以鰹節柴魚、多樣蔬果長時熬製，不添加人工甘味劑。湯底澄清透明，是食材本身的誠意。" },
  { en: "Curated Cuts",  zh: "嚴選肉品",  desc: "經過濕式熟成處理，保留肉汁、脂肪香氣、提升柔嫩度，依部位特性搭配涮燙方式，每一片都有它應在的位置。" },
  { en: "Present Service", zh: "在場服務", desc: "服務不催促節奏，不打擾對話。在場，但不佔據。讓餐桌屬於你們，讓時間屬於這一刻。" },
  { en: "CRÈM Dessert",  zh: "慶祝蛋糕",  desc: "與 CRÈM 甜點品牌合作，提供一條龍慶祝服務，從餐桌到蛋糕，讓每個重要時刻都更加完整。" },
];

function StatItem({ num, label, delay }: { num: string; label: string; delay: number }) {
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
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", color: "rgba(197,151,109,0.9)", lineHeight: 1, marginBottom: "0.5rem" }}>{num}</p>
      <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.45)", letterSpacing: "0.06em", fontFamily: "'Noto Serif TC', serif", fontWeight: 300 }}>{label}</p>
    </div>
  );
}

function CommitmentCard({ en, zh, desc, delay }: (typeof BRAND_COMMITMENTS)[0] & { delay: number }) {
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
  const heroRef       = useFadeIn(0);
  const storyRef      = useFadeIn(100);
  const commitmentsRef = useFadeIn(0);
  const quoteRef      = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)" }}>

      {/* ── Hero 全版圖 ── */}
      <section style={{ position: "relative", height: "70vh", minHeight: "480px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,7,0.45) 0%, rgba(10,8,7,0.85) 100%)" }} />
        <div className="container" style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end", paddingBottom: "5rem" }}>
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.7)", marginBottom: "1.5rem" }}>
              Brand Story
            </p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0E9DF", letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              品牌故事
            </h1>
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.6)", lineHeight: 2, letterSpacing: "0.05em" }}>
              人生最容易被遺忘的，就是初衷。
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
                The Origin
              </p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "rgba(240,233,223,0.9)", letterSpacing: "0.08em", marginBottom: "2rem", lineHeight: 1.6 }}>
                一段環島，<br />一個頓悟。
              </h2>
              <GoldLine />
              <div style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.5)", lineHeight: 2.1, letterSpacing: "0.04em" }}>
                <p style={{ marginBottom: "1.5rem" }}>
                  創辦人小鹿早期由於迷惘自己的人生方向，開啟了一段環島之旅。
                  直到旅途到台東初鹿時，受到一對原住民夫妻熱情的款待。
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  那對夫妻告訴他，「鹿」在原住民裡象徵著「純潔」、「簡單」。
                  相處的過程中，他發現夫妻倆即使生活並不富裕，卻過得很滿足快樂。
                </p>
                <p>
                  就像「鹿」的意思一樣，這種心靈上純粹的快樂，
                  似乎就是人生最終要追求的目的地。
                  在這趟旅程結束後，創辦人審視了自己的「初衷」，
                  也找回初心，希望帶給更多迷途中的人，
                  能重新找回屬於自己初衷「快樂的意義」，
                  因而將店名取為「初衷小鹿」。
                </p>
              </div>
            </div>

            {/* 右側：品牌數字 */}
            <div className="flex flex-col gap-12">
              {[
                { num: "2019",   label: "創立於台北信義區" },
                { num: "4.6",    label: "Google 評分（1,593 則評論）" },
                { num: "Top 10", label: "2023 台北鍋物大賽十強" },
                { num: "Top 30", label: "2024 全台灣 30 大鍋物" },
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
              Our Commitment
            </p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "rgba(240,233,223,0.9)", letterSpacing: "0.08em" }}>
              我們的堅持
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
              Our Philosophy
            </p>
            <blockquote style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", color: "rgba(240,233,223,0.85)", lineHeight: 1.9, letterSpacing: "0.08em", borderLeft: "none", margin: 0, padding: 0 }}>
              「湯底從來不是背景，<br />而是料理的靈魂。」
            </blockquote>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.4)", margin: "2.5rem auto" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(240,233,223,0.4)", lineHeight: 2, letterSpacing: "0.06em", maxWidth: "480px", margin: "0 auto 2rem" }}>
              以日本頂級乾貨與天然蔬果長時熬製，<br />
              將鮮味慢慢收進每一口之中，只留食材本身的誠意。<br />
              每一口湯，都是這份初衷最直接的表達。
            </p>
            <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.2)", letterSpacing: "0.12em" }}>
              Soul in every broth.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
