/**
 * Crem.tsx — CRÈM蛋糕上桌預訂頁面
 * 結構：
 *  1. 雙品牌 Logo（首圖上方）
 *  2. Hero 首圖（完整不裁切）
 *  3. 主標題 + 副標
 *  4. 痛點 Before × 流程 After（圖示+線條）
 *  5. 預定期間 PRE-ORDER WINDOW
 *  6. 訂購方式 HOW TO ORDER
 *  7. CTA（單一按鈕）
 */
import { useEffect, useRef } from "react";

function useFadeIn(threshold = 0.1) {
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

const DEER_LOGO = "/manus-storage/deer-logo-white_a35020cd.webp";
const CREM_LOGO_WHITE = "/manus-storage/crem-hero-user_bced4f58.webp";
const CREM_HERO_BG = "/manus-storage/crem-hero-new_b33a4ac5.jpg";

// 痛點（Before）
const PAIN_POINTS = [
  { icon: "😰", text: "壽星在旁，還要偷偷準備" },
  { icon: "🚗", text: "花費交通、時間取蛋糕" },
  { icon: "😟", text: "怕蛋糕撞壞或融化變形" },
  { icon: "⏰", text: "取貨時間對不上，行程亂掉" },
  { icon: "📱", text: "一邊吃飯還要偷偷協調" },
  { icon: "😓", text: "製造驚喜卻變成最忙的人" },
];

// 服務流程（After）— 圖示 + 標題 + 說明
const FLOW_STEPS = [
  {
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <rect x="6" y="10" width="36" height="28" rx="2" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5" fill="none"/>
        <path d="M6 18h36" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5"/>
        <path d="M16 6v8M32 6v8" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 28h8M14 34h14" stroke="rgba(197,151,109,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "訂位時同步預約",
    desc: "訂位時可以同步預約蛋糕服務",
  },
  {
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <circle cx="24" cy="20" r="10" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5" fill="none"/>
        <path d="M24 10v10l6 4" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 38c0-6 7-10 16-10s16 4 16 10" stroke="rgba(197,151,109,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "CRÈM 官網選蛋糕",
    desc: "開放期間前往 CRÈM 官網選擇口味與尺寸",
  },
  {
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <rect x="10" y="8" width="28" height="32" rx="2" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5" fill="none"/>
        <path d="M16 20h16M16 26h10" stroke="rgba(197,151,109,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 14h8" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="34" cy="34" r="8" fill="var(--deer-dark)" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5"/>
        <path d="M30 34l3 3 5-5" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "備註訂位資訊",
    desc: "結帳備註填入訂位時間 / 大名 / 電話",
  },
  {
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <path d="M24 8c-8 0-14 5-14 12 0 4 2 7 6 9v7l4-3h4c8 0 14-5 14-12S32 8 24 8z" stroke="rgba(197,151,109,0.8)" strokeWidth="1.5" fill="none"/>
        <path d="M18 22l4 4 8-8" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "專人安排上桌",
    desc: "服務人員在適當時機安排蛋糕上桌，驚喜完整呈現",
  },
];

export default function Crem() {
  const refHero = useFadeIn(0.05);
  const refPain = useFadeIn(0.08);
  const refWindow = useFadeIn(0.08);
  const refHow = useFadeIn(0.08);
  const refCTA = useFadeIn(0.1);

  const gold = "rgba(197,151,109,1)";
  const goldFaint = "rgba(197,151,109,0.5)";
  const textMain = "var(--deer-dark-text)";
  const textSub = "rgba(240,233,223,0.4)";
  const sectionBorder = "1px solid rgba(197,151,109,0.12)";

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════
          Section 1 — 雙品牌 Logo（首圖上方）
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0A0807", padding: "2.5rem 1.5rem 2rem", textAlign: "center", borderBottom: "1px solid rgba(197,151,109,0.08)" }}>
        {/* 聯名標籤 */}
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(197,151,109,0.4)", marginBottom: "1.5rem" }}>
          Exclusive Collaboration
        </p>
        {/* 雙 Logo — 放大版 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(1.5rem, 5vw, 3.5rem)" }}>
          <img
            src={DEER_LOGO}
            alt="初衷小鹿"
            style={{ height: "clamp(48px, 8vw, 72px)", width: "auto", objectFit: "contain", opacity: 0.9 }}
          />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            color: "rgba(197,151,109,0.3)",
            lineHeight: 1,
            userSelect: "none",
          }}>×</span>
          <img
            src={CREM_LOGO_WHITE}
            alt="CRÈM"
            style={{ height: "clamp(48px, 8vw, 72px)", width: "auto", objectFit: "contain", opacity: 0.9 }}
          />
        </div>
        {/* 副標 */}
        <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)", color: "rgba(197,151,109,0.45)", letterSpacing: "0.12em", marginTop: "1.5rem" }}>
          慶祝蛋糕 &amp; 餐廳 · 一條龍預定服務
        </p>
      </section>

      {/* ══════════════════════════════════════════
          Section 2 — Hero 首圖（完整不裁切）
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0A0807", display: "flex", justifyContent: "center" }}>
        <img
          src={CREM_HERO_BG}
          alt="CRÈM 蛋糕"
          style={{ width: "100%", maxWidth: "960px", height: "auto", display: "block", objectFit: "contain" }}
        />
      </section>

      {/* ══════════════════════════════════════════
          Section 3 — 主標題
      ══════════════════════════════════════════ */}
      <section style={{ padding: "3.5rem 1.5rem 4rem", textAlign: "center", borderBottom: sectionBorder }}>
        <div ref={refHero} className="fade-up">
          <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "1.25rem" }}>
            CRÈM 蛋糕上桌預訂
          </h1>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.875rem, 2vw, 1rem)", color: textSub, lineHeight: 2, letterSpacing: "0.06em", maxWidth: "480px", margin: "0 auto" }}>
            由兩個品牌共創一場慶祝的完整設計。<br />
            從餐桌到蛋糕，讓每個重要時刻都更加完整。
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 4 — 痛點 Before × 流程 After
      ══════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", borderBottom: sectionBorder }}>
        <div className="container">
          <div ref={refPain} className="fade-up">

            {/* 標題 */}
            <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: goldFaint, marginBottom: "0.75rem" }}>
                The Problem We Solve
              </p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: textMain, letterSpacing: "0.1em" }}>
                一條龍預定服務
              </h2>
            </div>

            {/* Before / After 雙欄 */}
            <div className="crem-before-after">

              {/* ── Before ── */}
              <div className="crem-before-col">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(220,80,60,0.15)" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(220,80,60,0.5)" }}>Before</span>
                  <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(240,233,223,0.3)" }}>沒有這個服務時</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {PAIN_POINTS.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1rem", backgroundColor: "rgba(220,80,60,0.03)", border: "1px solid rgba(220,80,60,0.1)" }}>
                      <span style={{ fontSize: "1.125rem", flexShrink: 0, opacity: 0.7 }}>{p.icon}</span>
                      <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.8rem, 1.8vw, 0.875rem)", color: "rgba(240,233,223,0.4)", lineHeight: 1.5 }}>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── After：流程圖示 + 線條 ── */}
              <div className="crem-after-col">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(197,151,109,0.15)" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: goldFaint }}>After</span>
                  <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(240,233,223,0.3)" }}>一條龍服務流程</span>
                </div>

                {/* 流程步驟 — 垂直連線 */}
                <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                  {FLOW_STEPS.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", position: "relative", paddingBottom: i < FLOW_STEPS.length - 1 ? "0" : "0" }}>
                      {/* 左側：圖示 + 連線 */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "52px" }}>
                        {/* 圖示圓圈 */}
                        <div style={{ width: "52px", height: "52px", border: "1px solid rgba(197,151,109,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(197,151,109,0.04)", flexShrink: 0 }}>
                          {step.svg}
                        </div>
                        {/* 連線 */}
                        {i < FLOW_STEPS.length - 1 && (
                          <div style={{ width: "1px", flexGrow: 1, minHeight: "40px", background: "linear-gradient(to bottom, rgba(197,151,109,0.3), rgba(197,151,109,0.08))", margin: "0.25rem 0" }} />
                        )}
                      </div>

                      {/* 右側：文字 */}
                      <div style={{ paddingTop: "0.625rem", paddingBottom: i < FLOW_STEPS.length - 1 ? "2rem" : "0" }}>
                        <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 400, fontSize: "clamp(0.875rem, 2vw, 0.9375rem)", color: textMain, letterSpacing: "0.06em", marginBottom: "0.375rem" }}>
                          {step.title}
                        </p>
                        <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.775rem, 1.6vw, 0.8125rem)", color: textSub, lineHeight: 1.8, letterSpacing: "0.03em" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 5 — 預定期間 PRE-ORDER WINDOW
      ══════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", borderBottom: sectionBorder }}>
        <div className="container">
          <div ref={refWindow} className="fade-up" style={{ maxWidth: "680px" }}>

            {/* 標題 */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(197,151,109,0.15)" }}>
              <div style={{ width: "3px", height: "2.5rem", backgroundColor: gold, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: goldFaint, marginBottom: "0.25rem" }}>Pre-Order Window</p>
                <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: textMain, letterSpacing: "0.1em" }}>
                  預定期間
                </h2>
              </div>
            </div>

            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: textSub, lineHeight: 2, letterSpacing: "0.04em", marginBottom: "2rem" }}>
              CRÈM 每月分兩批公布蛋糕口味並開放預訂。<br />
              請在開放期間前往 CRÈM 官網選購，結帳時備註初衷小鹿訂位資訊。
            </p>

            {/* 時程表 */}
            <div style={{ border: "1px solid rgba(197,151,109,0.15)", overflow: "hidden", marginBottom: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "rgba(197,151,109,0.06)", borderBottom: "1px solid rgba(197,151,109,0.12)" }}>
                <div style={{ padding: "0.75rem 1.25rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: goldFaint }}>每月</div>
                <div style={{ padding: "0.75rem 1.25rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: goldFaint, borderLeft: "1px solid rgba(197,151,109,0.12)" }}>開放期間</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(197,151,109,0.08)" }}>
                <div style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: gold }}>01</span>
                  <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: textSub }}>日</span>
                </div>
                <div style={{ padding: "1.25rem", borderLeft: "1px solid rgba(197,151,109,0.08)" }}>
                  <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.875rem, 2vw, 1rem)", color: textMain, marginBottom: "0.25rem" }}>16 日 ～ 月底</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: goldFaint, letterSpacing: "0.06em" }}>下半月口味開放預訂</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: gold }}>15</span>
                  <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: textSub }}>日</span>
                </div>
                <div style={{ padding: "1.25rem", borderLeft: "1px solid rgba(197,151,109,0.08)" }}>
                  <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.875rem, 2vw, 1rem)", color: textMain, marginBottom: "0.25rem" }}>1 日 ～ 15 日（次月）</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: goldFaint, letterSpacing: "0.06em" }}>上半月口味開放預訂</p>
                </div>
              </div>
            </div>

            {/* 範例 */}
            <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "rgba(197,151,109,0.03)", border: "1px solid rgba(197,151,109,0.1)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: goldFaint, marginBottom: "0.75rem" }}>Example</p>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.375rem 1.25rem", alignItems: "center" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: goldFaint }}>4 / 1 開放</span>
                <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: textSub }}>→ 4/16 ～ 4/30 蛋糕口味可預訂</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: goldFaint }}>4 / 15 開放</span>
                <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: textSub }}>→ 5/01 ～ 5/15 蛋糕口味可預訂</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 6 — 訂購方式 HOW TO ORDER
      ══════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", borderBottom: sectionBorder, backgroundColor: "rgba(10,8,7,0.35)" }}>
        <div className="container">
          <div ref={refHow} className="fade-up">

            {/* 標題 */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(197,151,109,0.15)" }}>
              <div style={{ width: "3px", height: "2.5rem", backgroundColor: gold, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: goldFaint, marginBottom: "0.25rem" }}>How To Order</p>
                <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: textMain, letterSpacing: "0.1em" }}>
                  訂購方式
                </h2>
              </div>
            </div>

            {/* 三步驟 */}
            <div className="crem-how-steps">
              {[
                {
                  num: "1",
                  title: "選擇口味",
                  sub: "前往 CRÈM 官網",
                  desc: "在開放期間前往 CRÈM 官網，從當季鮮奶油蛋糕系列中選擇口味與尺寸（4 / 6 / 8 吋）。",
                },
                {
                  num: "2",
                  title: "點選「是否有訂位？」",
                  sub: "產品頁面",
                  desc: "選擇用餐日期後，點選「是否有訂位初衷小鹿？」並選擇「有，下一頁結帳頁面備註填上訂位」。",
                },
                {
                  num: "3",
                  title: "備註訂位資訊",
                  sub: "結帳頁面",
                  desc: "在「訂單備註」欄位填入訂位時間 / 大名 / 電話，完成預訂。",
                },
              ].map((step, i, arr) => (
                <div key={i} className="crem-how-card">
                  <div className="crem-how-num">{step.num}</div>
                  {i < arr.length - 1 && <div className="crem-how-arrow">→</div>}
                  <h3 className="crem-how-title">{step.title}</h3>
                  <p className="crem-how-sub">{step.sub}</p>
                  <p className="crem-how-desc">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* 重要提醒 */}
            <div style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", border: "1px solid rgba(197,151,109,0.18)", backgroundColor: "rgba(197,151,109,0.03)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ color: gold, fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>!</span>
              <div>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 400, fontSize: "0.875rem", color: "rgba(197,151,109,0.8)", letterSpacing: "0.04em", marginBottom: "0.375rem" }}>重要提醒</p>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: textSub, lineHeight: 1.9, letterSpacing: "0.03em" }}>
                  蛋糕預訂請直接在 CRÈM 官網下單，請勿直接在 Inline 訂位留言備註。<br />
                  訂位時亦可同步預約蛋糕服務，我們的服務人員會在適當時機安排上桌。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 7 — CTA（單一按鈕）
      ══════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", textAlign: "center" }}>
        <div className="container">
          <div ref={refCTA} className="fade-up">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: goldFaint, marginBottom: "1.25rem" }}>
              Ready to Celebrate
            </p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: textMain, letterSpacing: "0.1em", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              準備好讓這場慶祝<br />更加完整了嗎？
            </h2>
            <a
              href="https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-deer-light"
              style={{ fontSize: "0.8rem" }}
            >
              前往 CRÈM 選蛋糕
            </a>
            <p style={{ marginTop: "2rem", fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(240,233,223,0.18)", letterSpacing: "0.06em" }}>
              先完成初衷小鹿訂位，再前往 CRÈM 官網預訂蛋糕，於結帳備註填入訂位資訊即完成。
            </p>
          </div>
        </div>
      </section>

      {/* ── 響應式樣式 ── */}
      <style>{`
        .crem-before-after {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 767px) {
          .crem-before-after {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        .crem-how-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid rgba(197,151,109,0.15);
          max-width: 860px;
        }
        .crem-how-card {
          padding: 2.5rem 1.75rem;
          background: rgba(10,8,7,0.4);
          border-right: 1px solid rgba(197,151,109,0.1);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .crem-how-card:last-child { border-right: none; }
        .crem-how-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 3rem;
          color: rgba(197,151,109,0.12);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .crem-how-arrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          color: rgba(197,151,109,0.3);
          position: absolute;
          top: 50%;
          right: -0.8rem;
          transform: translateY(-50%);
          z-index: 2;
          background: var(--deer-dark);
          padding: 0.25rem 0;
        }
        .crem-how-title {
          font-family: 'Noto Serif TC', serif;
          font-weight: 300;
          font-size: clamp(0.875rem, 2vw, 0.9375rem);
          color: var(--deer-dark-text);
          letter-spacing: 0.06em;
          line-height: 1.5;
          margin-bottom: 0.375rem;
        }
        .crem-how-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.68rem;
          color: rgba(197,151,109,0.5);
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .crem-how-desc {
          font-family: 'Noto Serif TC', serif;
          font-weight: 300;
          font-size: 0.8rem;
          color: rgba(240,233,223,0.38);
          line-height: 1.9;
          letter-spacing: 0.03em;
          flex: 1;
        }
        @media (max-width: 767px) {
          .crem-how-steps {
            grid-template-columns: 1fr !important;
          }
          .crem-how-card {
            border-right: none;
            border-bottom: 1px solid rgba(197,151,109,0.1);
          }
          .crem-how-card:last-child { border-bottom: none; }
          .crem-how-arrow { display: none; }
        }
      `}</style>
    </main>
  );
}
