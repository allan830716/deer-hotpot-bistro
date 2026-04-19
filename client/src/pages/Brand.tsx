/*
 * 初衷小鹿 — 品牌故事 Brand.tsx
 * 設計語言：暖灰底、深棕黑、木質棕、Noto Serif TC
 * 口吻：克制、成熟、有畫面感、不推銷
 */

import { useEffect, useRef } from "react";

function useFadeIn(delay = 0) {
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
  return ref;
}

function GoldLine() {
  return (
    <div
      style={{
        width: "32px",
        height: "1px",
        backgroundColor: "var(--deer-gold)",
        margin: "2rem 0",
      }}
    />
  );
}

const BRAND_VALUES = [
  {
    en: "Restraint",
    zh: "克制",
    desc: "不張揚，不過度推銷。讓食材、空間、服務說話。",
  },
  {
    en: "Craft",
    zh: "講究",
    desc: "從湯底工序到肉品部位，每一個細節都是選擇的結果。",
  },
  {
    en: "Warmth",
    zh: "溫柔",
    desc: "照顧場面與節奏，讓每一位客人感受到被好好款待。",
  },
  {
    en: "Maturity",
    zh: "成熟",
    desc: "適合重要的人、重要的時刻，不是熱鬧，是陪伴。",
  },
];

function StatItem({
  num,
  label,
  delay,
}: {
  num: string;
  label: string;
  delay: number;
}) {
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
        style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontWeight: 300,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "var(--deer-accent)",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {num}
      </p>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--deer-sub)",
          letterSpacing: "0.06em",
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 300,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function ValueCard({
  en,
  zh,
  desc,
  delay,
}: (typeof BRAND_VALUES)[0] & { delay: number }) {
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
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: "var(--deer-gold)",
          marginBottom: "0.75rem",
        }}
      >
        {en}
      </p>
      <h3
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 300,
          fontSize: "1.5rem",
          color: "var(--deer-text)",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
        }}
      >
        {zh}
      </h3>
      <div
        style={{
          width: "20px",
          height: "1px",
          backgroundColor: "var(--deer-gold)",
          marginBottom: "1rem",
        }}
      />
      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--deer-sub)",
          lineHeight: 1.9,
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 300,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default function Brand() {
  const heroRef = useFadeIn(0);
  const storyRef = useFadeIn(100);
  const valuesRef = useFadeIn(0);
  const quoteRef = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px" }}>

      {/* ── Hero ── */}
      <section
        style={{
          backgroundColor: "var(--deer-dark)",
          padding: "8rem 0 7rem",
        }}
      >
        <div className="container">
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "rgba(197,151,109,0.7)",
                marginBottom: "1.5rem",
              }}
            >
              Brand Story
            </p>
            <h1
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.08em",
                lineHeight: 1.5,
                marginBottom: "2rem",
              }}
            >
              品牌故事
            </h1>
            <div
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "rgba(197,151,109,0.6)",
                marginBottom: "2rem",
              }}
            />
            <p
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "rgba(240,233,223,0.65)",
                lineHeight: 2,
                letterSpacing: "0.05em",
              }}
            >
              人生最容易被遺忘的，
              <br />
              就是初衷。
            </p>
          </div>
        </div>
      </section>

      {/* ── 起源故事 ── */}
      <section
        className="section-lg"
        style={{ backgroundColor: "var(--deer-bg)" }}
      >
        <div className="container">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start"
          >
            {/* 左側：故事文字 */}
            <div ref={storyRef} className="fade-up">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                  color: "var(--deer-gold)",
                  marginBottom: "1.5rem",
                }}
              >
                The Origin
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  color: "var(--deer-text)",
                  letterSpacing: "0.08em",
                  marginBottom: "2rem",
                  lineHeight: 1.6,
                }}
              >
                一段環島，
                <br />
                一個頓悟。
              </h2>
              <GoldLine />
              <div
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.9375rem",
                  color: "var(--deer-sub)",
                  lineHeight: 2.1,
                  letterSpacing: "0.04em",
                }}
              >
                <p style={{ marginBottom: "1.5rem" }}>
                  創辦人小鹿早期由於迷惘自己的人生方向，開啟了一段環島之旅。
                  直到旅途到台東初鹿時，受到一對原住民夫妻熱情的款待。
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  那對夫妻告訴他，「鹿」在原住民裡象徵著「純潔」、「簡單」。
                  相處的過程中，他發現夫妻倆即使生活並不富裕，
                  卻過得很滿足快樂。
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
                { num: "2019", label: "創立於台北信義區" },
                { num: "4.6", label: "Google 評分（1,593 則評論）" },
                { num: "Top 10", label: "2023 台北鍋物大賽十強" },
                { num: "Top 30", label: "2024 全台灣 30 大鍋物" },
              ].map((item, i) => (
                <StatItem key={i} {...item} delay={i * 100} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 品牌個性 ── */}
      <section
        className="section"
        style={{ backgroundColor: "var(--deer-bg-dark)" }}
      >
        <div className="container">
          <div ref={valuesRef} className="fade-up text-center mb-16">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "var(--deer-gold)",
                marginBottom: "1rem",
              }}
            >
              Brand Character
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
              我們的個性
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {BRAND_VALUES.map((v, i) => (
              <ValueCard key={i} {...v} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 引言 ── */}
      <section
        className="section-lg"
        style={{ backgroundColor: "var(--deer-dark)" }}
      >
        <div className="container-narrow text-center">
          <div ref={quoteRef} className="fade-up">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "rgba(197,151,109,0.6)",
                marginBottom: "2.5rem",
              }}
            >
              Our Promise
            </p>
            <blockquote
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                color: "var(--deer-dark-text)",
                lineHeight: 1.9,
                letterSpacing: "0.08em",
                borderLeft: "none",
                margin: 0,
                padding: 0,
              }}
            >
              「湯底從來不是背景，
              <br />
              而是料理的靈魂。」
            </blockquote>
            <div
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "rgba(197,151,109,0.5)",
                margin: "2.5rem auto",
              }}
            />
            <p
              style={{
                fontSize: "0.8125rem",
                color: "rgba(240,233,223,0.4)",
                letterSpacing: "0.12em",
              }}
            >
              初衷小鹿 Deer's Hotpot Bistro
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
