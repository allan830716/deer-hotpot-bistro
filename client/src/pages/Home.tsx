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

// ── 空間照片（已上傳至 CDN）────────────────────────────────────────────────
const HERO_IMG = "/manus-storage/hero-space_100d3e43.jpg";
const SPACE_IMG =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1400&q=80";
const SOUP_IMG =
  "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80";
const MEAT_IMG =
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80";
const DESSERT_IMG =
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80";

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

// ── Section 1: Hero ───────────────────────────────────────────────────────
function HeroSection() {
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
            Deer's Hotpot Bistro · Taipei Xinyi
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
            不是一頓火鍋，
            <br />
            是一場有節奏的
            <br />
            餐桌體驗。
          </h1>

          <a
            href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-light"
            style={{ fontSize: "0.8rem" }}
          >
            預約一場餐桌
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
            Our Philosophy
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
            我們不做熱鬧的火鍋。
            <br />
            <br />
            我們在意的，
            <br />
            是一場餐桌的節奏。
          </h2>
          <GoldLineCentered width={32} />
          <p
            style={{
              color: "var(--deer-sub)",
              fontSize: "0.875rem",
              lineHeight: 2,
              letterSpacing: "0.06em",
            }}
          >
            前菜、湯底、熟成肉品、酒搭配、甜點收尾。
            <br />
            每一個環節，都是節奏的一部分。
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section 3: 三核心 ─────────────────────────────────────────────────────
const CORES = [
  {
    img: SOUP_IMG,
    zh: "湯",
    en: "The Broth",
    line1: "湯，不是背景。",
    line2: "是整場餐桌的開始。",
    desc: "天然蔬果、乾貨慢熬，清澈不搶味，讓食材說話。",
  },
  {
    img: MEAT_IMG,
    zh: "肉",
    en: "The Cut",
    line1: "不是火鍋肉。",
    line2: "是經過處理的料理食材。",
    desc: "熟成、部位、厚切，不需要過度調味。",
  },
  {
    img: DESSERT_IMG,
    zh: "甜點",
    en: "The Finale",
    line1: "最後一道，",
    line2: "才是記住的原因。",
    desc: "與 CRÈM 合作，把甜點做成餐桌的完整收尾。",
  },
];

function CoreSection() {
  const ref = useFadeIn(0.1);
  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--deer-bg-dark)" }}
    >
      <div className="container">
        <div ref={ref} className="fade-up text-center mb-16">
          <p className="font-label mb-4" style={{ color: "var(--deer-gold)" }}>
            What We Do
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
            三個核心，構成一場完整的餐桌。
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

function CoreCard({
  img,
  zh,
  en,
  line1,
  line2,
  desc,
  delay,
}: (typeof CORES)[0] & { delay: number }) {
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
}

// ── Section 4: 體驗敘事 ───────────────────────────────────────────────────
const NARRATIVE = [
  {
    step: "01",
    title: "前菜，讓味蕾開始",
    body: "不是填飽，是鋪陳。\n一道前菜，讓整場餐桌的節奏慢慢展開。",
  },
  {
    step: "02",
    title: "湯開始後，節奏慢了下來",
    body: "清澈的上湯，不搶食材的味道。\n讓每一口都有它應有的位置。",
  },
  {
    step: "03",
    title: "肉，不需要調味",
    body: "熟成的肉品，自己就是答案。\n只需要湯，只需要時間。",
  },
  {
    step: "04",
    title: "最後，留一點時間給甜點",
    body: "一場好的餐桌，不應該在主食結束後就散場。\n甜點，是把時間留給彼此的方式。",
  },
];

function NarrativeSection() {
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
            The Experience
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
            一場餐桌的節奏，是這樣展開的。
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 max-w-3xl mx-auto">
          {NARRATIVE.map((item, i) => (
            <NarrativeItem key={i} {...item} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NarrativeItem({
  step,
  title,
  body,
  delay,
}: (typeof NARRATIVE)[0] & { delay: number }) {
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

// ── Section 5: 空間 ───────────────────────────────────────────────────────
function SpaceSection() {
  const ref = useFadeIn(0.1);
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
            為了那些不該被打擾的時刻。
          </h2>
          <Link href="/space">
            <span className="btn-deer-light" style={{ fontSize: "0.8rem" }}>
              探索空間
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Section 6: 信任 ───────────────────────────────────────────────────────
function TrustSection() {
  const ref = useFadeIn();
  return (
    <section
      className="section-lg"
      style={{ backgroundColor: "var(--deer-bg)" }}
    >
      <div className="container-narrow text-center">
        <div ref={ref} className="fade-up">
          <p className="font-label mb-8" style={{ color: "var(--deer-gold)" }}>
            Google Reviews
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
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                style={{
                  color: i < 4 ? "var(--deer-gold)" : "var(--deer-muted)",
                  fontSize: "1.25rem",
                }}
              >
                ★
              </span>
            ))}
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
            4.6
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--deer-sub)",
              letterSpacing: "0.1em",
              marginBottom: "3rem",
            }}
          >
            1,593 則 Google 評論
          </p>

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
            我們不送禮換評論，
            <br />
            也不請客人留下評價。
          </p>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--deer-sub)",
              marginTop: "1rem",
              lineHeight: 1.9,
            }}
          >
            每一則評論，都是真實的用餐記憶。
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section 7: CTA ────────────────────────────────────────────────────────
function CTASection() {
  const ref = useFadeIn();
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
            Reservation
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
            預約一場餐桌
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
            把時間，留給重要的人。
            <br />
            晚餐時段每位最低消費 NT$600 + 10% 服務費
          </p>
          <a
            href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-light"
          >
            立即預約
          </a>
        </div>
      </div>
    </section>
  );
}

// ── 主元件 ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandPivotSection />
      <CoreSection />
      <NarrativeSection />
      <SpaceSection />
      <TrustSection />
      <CTASection />
    </main>
  );
}
