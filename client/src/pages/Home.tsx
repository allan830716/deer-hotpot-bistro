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
// 不該被打擾的時刻—全景用餐空間
 const SPACE_IMG = "/manus-storage/59301147_2179218135493270_2323651919307866112_o_06d161dd.jpg";
// 三核心圖片—專屬生成料理照片
const SOUP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-soup-kD9yMfeQhWitk7LSxi895N.webp";
const MEAT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663054902373/Vgu6VMSix7FNFxaq6at7Cj/core-meat-HfC4JKdjgVn8nhL3rfu43S.webp";
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
            href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
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
    zh: "日本頂級乾貨",
    en: "The Broth",
    line1: "靜岡本枯節 · 北海道羅臼昆布 · 宮崎香信椎茸",
    line2: "",
    desc: "三種頂級日本乾貨，長時慢熬。鮮甜清澈，不添加人工甘味——湯底是料理的靈魂，不是背景。",
  },
  {
    img: MEAT_IMG,
    zh: "熟成肉品",
    en: "The Cut",
    line1: "SRF 極黑和牛 · 伊比利豬 · 草飼羊",
    line2: "",
    desc: "西餐等級肉種，濕式熟成處理。保留肉汁與脂肪香氣，讓火鍋也能有一點講究。",
  },
  {
    img: DESSERT_IMG,
    zh: "甜點與酒感",
    en: "The Finale",
    line1: "專業甜點師 · 侍酒師嚴選酒單",
    line2: "",
    desc: "甜點不是配角。從紅白氣泡酒搭配到餐後甜點收尾，這是我們反骨的個性——一場餐桌，不該在主食後就散場。",
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
            三核心，構成一場完整的餐桌
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

        {/* 輕量 CTA */}
        <div style={{ textAlign: "center", marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(197,151,109,0.15)" }}>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.55)", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>
            準備好了嗎？
          </p>
          <a
            href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deer-outline"
          >
            預約一場餐桌
          </a>
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
              空間體驗⇢
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



          {/* 獲獎敘述 */}
          <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(197,151,109,0.12)", paddingTop: "2.5rem" }}>
            <p className="font-label mb-8" style={{ color: "rgba(197,151,109,0.5)" }}>
              Recognition
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)", marginBottom: "0.5rem" }}>
                  2023 · 台北市府鍋物大賽
                </p>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", lineHeight: 1.6 }}>
                  2023 台北十強鍋物
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)", marginBottom: "0.5rem" }}>
                  2024 · 台北市府鍋物大賽
                </p>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", lineHeight: 1.6 }}>
                  2024 台灣 30 大鍋物
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)", marginBottom: "0.5rem" }}>
                  2024 · &amp;Premium Japan
                </p>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", lineHeight: 1.6 }}>
                  日本生活品味雜誌《&amp;Premium》年度收錄
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--deer-sub)", marginTop: "0.4rem", lineHeight: 1.7 }}>
                  以「美好生活指南」為概念，廣受歡迎且充滿質感氛圍的日本生活雜誌
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
const CREM_STEPS = [
  { num: "01", label: "預訂座位", desc: "透過 Inline 線上預訂，備註慶祝人與就餐時段" },
  { num: "02", label: "選擇蛋糕", desc: "至 CRÈM 官網挑選專屬慶祝蛋糕，備註小鹿訂位資訊" },
  { num: "03", label: "小鹿代勞", desc: "我們全程跟進 CRÈM 確認，確保蛋糕按時就位" },
  { num: "04", label: "餐桌驚喜", desc: "餐後蛋糕登場，不需擔心一切，只需就座享受這場慶祝" },
];

function CremSection() {
  const ref = useFadeIn(0.08);
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
            一條龍慶祝服務，從餐桌到蛋糕。
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
          一條龍慶祝服務，
          <br />
          從餐桌到蛋糕。
        </h2>
      </div>
      {/* 文字說明 + 步驟 + CTA */}
      <div className="container" style={{ padding: "5rem 0" }}>
        <div ref={ref} className="fade-up">
          {/* 說明文字 */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="crem-collab-desc" style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(240,233,223,0.5)", lineHeight: 2, letterSpacing: "0.06em", maxWidth: "520px", margin: "0 auto 2rem" }}>
              初衷小鹿 × CRÈM 聯名，
              <br />
              讓每一場慶祝都有專屬蛋糕。
              <br />
              <span className="crem-collab-sub">由兩個品牌共創一場慶祝的完整設計。</span>
            </p>
          </div>

          {/* 步驟流程 */}
          <div className="crem-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", marginBottom: "3rem", border: "1px solid rgba(197,151,109,0.12)", maxWidth: "860px", margin: "0 auto 3rem" }}>
            {CREM_STEPS.map((step, i) => (
              <CremStep key={i} {...step} delay={i * 100} />
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.35)", letterSpacing: "0.06em", marginBottom: "2rem" }}>
              這是一場不需要擔心任何事的專屬慶祝。
            </p>
            <a
              href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-deer-light"
              style={{ fontSize: "0.8rem" }}
            >
              預約一場慶祝餐桌
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CremStep({ num, label, desc, delay }: (typeof CREM_STEPS)[0] & { delay: number }) {
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
          </p>
          <a
            href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
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