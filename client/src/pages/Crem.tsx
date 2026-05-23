/**
 * Crem.tsx — CRÈM蛋糕上桌預訂頁面（完整版）
 * 結構：
 *  1. Hero（完整圖 + Logo 在下方 + 主標題）
 *  2. 痛點 + 服務優勢
 *  3. 預定期間 PRE-ORDER WINDOW（時程表）
 *  4. 訂購方式 HOW TO ORDER（三步驟）
 *  5. 連動按鈕 CTA
 */
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function useFadeIn(threshold = 0.12) {
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

const PAIN_POINTS = [
  "壽星在旁，還要偷偷準備",
  "花費交通、時間取蛋糕",
  "怕蛋糕撞壞或融化變形",
  "取貨時間對不上，行程亂掉",
  "一邊吃飯還要偷偷協調",
  "製造驚喜卻變成最忙的人",
];

const ADVANTAGES = [
  { icon: "✓", text: "訂位同步預約蛋糕，一站完成" },
  { icon: "✓", text: "CRÈM 專車冷藏配送，無需自取" },
  { icon: "✓", text: "服務人員安排上桌，驚喜完整呈現" },
  { icon: "✓", text: "餐桌節奏不被打斷，從容慶祝" },
];

export default function Crem() {
  const { t } = useLanguage();
  const refHero = useFadeIn(0.05);
  const refPain = useFadeIn(0.1);
  const refWindow = useFadeIn(0.08);
  const refHow = useFadeIn(0.08);
  const refCTA = useFadeIn(0.1);

  const gold = "rgba(197,151,109,1)";
  const goldFaint = "rgba(197,151,109,0.5)";
  const goldDim = "rgba(197,151,109,0.2)";
  const textMain = "var(--deer-dark-text)";
  const textSub = "rgba(240,233,223,0.45)";
  const sectionBorder = "1px solid rgba(197,151,109,0.12)";

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════
          Section 1 — Hero
      ══════════════════════════════════════════ */}
      <section>
        {/* 完整圖片，不裁切 */}
        <div style={{ backgroundColor: "#0A0807", display: "flex", justifyContent: "center" }}>
          <img
            src={CREM_HERO_BG}
            alt="CRÈM 蛋糕"
            style={{ width: "100%", maxWidth: "900px", height: "auto", display: "block", objectFit: "contain" }}
          />
        </div>

        {/* 雙品牌 Logo 聯名（圖片正下方）*/}
        <div style={{
          padding: "2rem 1.5rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(1rem, 4vw, 2.5rem)",
          borderBottom: sectionBorder,
        }}>
          <img src={DEER_LOGO} alt="初衷小鹿" style={{ height: "clamp(28px, 4.5vw, 44px)", width: "auto", objectFit: "contain", opacity: 0.85 }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.25rem, 3vw, 2rem)", color: goldDim, lineHeight: 1 }}>×</span>
          <img src={CREM_LOGO_WHITE} alt="CRÈM" style={{ height: "clamp(28px, 4.5vw, 44px)", width: "auto", objectFit: "contain", opacity: 0.85 }} />
        </div>

        {/* 主標題 */}
        <div ref={refHero} className="fade-up" style={{ textAlign: "center", padding: "2.5rem 1.5rem 4rem" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: goldFaint, marginBottom: "1rem" }}>
            Exclusive Collaboration · Pre-Order Window
          </p>
          <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.6, marginBottom: "1.25rem" }}>
            CRÈM 蛋糕上桌預訂
          </h1>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: textSub, lineHeight: 2, letterSpacing: "0.06em" }}>
            由兩個品牌共創一場慶祝的完整設計。<br />
            從餐桌到蛋糕，讓每個重要時刻都更加完整。
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 2 — 痛點 × 解決方案
      ══════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", borderTop: sectionBorder, backgroundColor: "rgba(10,8,7,0.5)" }}>
        <div className="container">
          <div ref={refPain} className="fade-up">
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: goldFaint, marginBottom: "0.75rem" }}>
                The Problem We Solve
              </p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                一條龍預定服務
              </h2>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: textSub, lineHeight: 1.9, letterSpacing: "0.04em" }}>
                想在重要的日子好好慶祝，<br />
                卻總是被這些事情打亂？
              </p>
            </div>

            {/* 痛點 × 解決方案並排 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="crem-pain-vs-grid">
              {/* 左：痛點 */}
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(220,80,60,0.6)", textTransform: "uppercase", marginBottom: "1rem" }}>
                  Before
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {PAIN_POINTS.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", padding: "0.75rem 1rem", border: "1px solid rgba(220,80,60,0.15)", backgroundColor: "rgba(220,80,60,0.03)" }}>
                      <span style={{ color: "rgba(220,80,60,0.5)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", flexShrink: 0, lineHeight: 1.3 }}>×</span>
                      <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.75rem, 2vw, 0.875rem)", color: "rgba(240,233,223,0.45)", lineHeight: 1.6 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右：解決方案 */}
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(197,151,109,0.65)", textTransform: "uppercase", marginBottom: "1rem" }}>
                  After
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {ADVANTAGES.map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", padding: "0.75rem 1rem", border: "1px solid rgba(197,151,109,0.18)", backgroundColor: "rgba(197,151,109,0.04)" }}>
                      <span style={{ color: gold, fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", flexShrink: 0, lineHeight: 1.3 }}>✓</span>
                      <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.75rem, 2vw, 0.875rem)", color: "rgba(240,233,223,0.65)", lineHeight: 1.6 }}>{a.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 3 — 預定期間 PRE-ORDER WINDOW
      ══════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", borderTop: sectionBorder }}>
        <div className="container">
          <div ref={refWindow} className="fade-up" style={{ maxWidth: "720px" }}>

            {/* 標題列 */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(197,151,109,0.15)" }}>
              <div style={{ width: "3px", height: "2.5rem", backgroundColor: gold, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: goldFaint, marginBottom: "0.25rem" }}>Pre-Order Window</p>
                <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: textMain, letterSpacing: "0.1em" }}>
                  預定期間
                </h2>
              </div>
            </div>

            {/* 說明文字 */}
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: textSub, lineHeight: 2, letterSpacing: "0.04em", marginBottom: "2rem" }}>
              CRÈM 每月分兩批公布蛋糕口味，並開放預訂。<br />
              請在開放期間前往 CRÈM 官網選購，並於結帳時備註初衷小鹿訂位資訊。
            </p>

            {/* 時程表 */}
            <div style={{ border: "1px solid rgba(197,151,109,0.15)", overflow: "hidden", marginBottom: "1.5rem" }}>
              {/* 表頭 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "rgba(197,151,109,0.08)", borderBottom: "1px solid rgba(197,151,109,0.15)" }}>
                <div style={{ padding: "0.75rem 1.25rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: goldFaint }}>每月</div>
                <div style={{ padding: "0.75rem 1.25rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: goldFaint, borderLeft: "1px solid rgba(197,151,109,0.15)" }}>開放期間</div>
              </div>
              {/* 第一列 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
                <div style={{ padding: "1.25rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: gold, lineHeight: 1 }}>01</span>
                  <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: textSub }}>日</span>
                </div>
                <div style={{ padding: "1.25rem 1.25rem", borderLeft: "1px solid rgba(197,151,109,0.1)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.875rem, 2vw, 1rem)", color: textMain, letterSpacing: "0.04em", marginBottom: "0.25rem" }}>
                    16 日 ～ 月底
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: goldFaint, letterSpacing: "0.08em" }}>
                    下半月口味開放預訂
                  </p>
                </div>
              </div>
              {/* 第二列 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ padding: "1.25rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: gold, lineHeight: 1 }}>15</span>
                  <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: textSub }}>日</span>
                </div>
                <div style={{ padding: "1.25rem 1.25rem", borderLeft: "1px solid rgba(197,151,109,0.1)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "clamp(0.875rem, 2vw, 1rem)", color: textMain, letterSpacing: "0.04em", marginBottom: "0.25rem" }}>
                    1 日 ～ 15 日（次月）
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: goldFaint, letterSpacing: "0.08em" }}>
                    上半月口味開放預訂
                  </p>
                </div>
              </div>
            </div>

            {/* 範例說明 */}
            <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "rgba(197,151,109,0.04)", border: "1px solid rgba(197,151,109,0.12)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: goldFaint, marginBottom: "0.75rem" }}>
                Example
              </p>
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
          Section 4 — 訂購方式 HOW TO ORDER
      ══════════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", borderTop: sectionBorder, backgroundColor: "rgba(10,8,7,0.4)" }}>
        <div className="container">
          <div ref={refHow} className="fade-up">

            {/* 標題列 */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(197,151,109,0.15)" }}>
              <div style={{ width: "3px", height: "2.5rem", backgroundColor: gold, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: goldFaint, marginBottom: "0.25rem" }}>How To Order</p>
                <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: textMain, letterSpacing: "0.1em" }}>
                  訂購方式
                </h2>
              </div>
            </div>

            {/* 三步驟 */}
            <div className="crem-how-steps">
              {/* Step 1 */}
              <div className="crem-how-card">
                <div className="crem-how-num">1</div>
                <div className="crem-how-arrow">→</div>
                <h3 className="crem-how-title">選擇口味</h3>
                <p className="crem-how-sub">前往 CRÈM 官網</p>
                <p className="crem-how-desc">在開放期間前往 CRÈM 官網，從當季鮮奶油蛋糕系列中選擇您喜歡的口味與尺寸（4 / 6 / 8 吋）。</p>
              </div>

              {/* Step 2 */}
              <div className="crem-how-card">
                <div className="crem-how-num">2</div>
                <div className="crem-how-arrow">→</div>
                <h3 className="crem-how-title">點選「是否有訂位？」</h3>
                <p className="crem-how-sub">產品頁面</p>
                <p className="crem-how-desc">在 CRÈM 產品頁面，選擇用餐日期後，點選「是否有訂位初衷小鹿？」並選擇「有，下一頁結帳頁面備註填上訂位」。</p>
              </div>

              {/* Step 3 */}
              <div className="crem-how-card">
                <div className="crem-how-num">3</div>
                <div className="crem-how-arrow" style={{ opacity: 0 }}>→</div>
                <h3 className="crem-how-title">備註訂位資訊</h3>
                <p className="crem-how-sub">結帳頁面</p>
                <p className="crem-how-desc">在結帳頁面的「訂單備註」欄位，填入您在初衷小鹿的訂位時間 / 大名 / 電話，完成預訂。</p>
              </div>
            </div>

            {/* 重要提醒 */}
            <div style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", border: "1px solid rgba(197,151,109,0.2)", backgroundColor: "rgba(197,151,109,0.04)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ color: gold, fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>!</span>
              <div>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 400, fontSize: "0.875rem", color: "rgba(197,151,109,0.85)", letterSpacing: "0.04em", marginBottom: "0.375rem" }}>
                  重要提醒
                </p>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: textSub, lineHeight: 1.9, letterSpacing: "0.03em" }}>
                  蛋糕預訂請直接在 CRÈM 官網下單，請勿直接在 Inline 訂位留言備註。<br />
                  訂位時亦可同步預約蛋糕服務，我們的服務人員會在適當時機安排上桌。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 5 — CTA 連動按鈕
      ══════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", textAlign: "center", borderTop: sectionBorder }}>
        <div className="container">
          <div ref={refCTA} className="fade-up">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: goldFaint, marginBottom: "1.25rem" }}>
              Ready to Celebrate
            </p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: textMain, letterSpacing: "0.1em", lineHeight: 1.8, marginBottom: "3rem" }}>
              準備好讓這場慶祝<br />更加完整了嗎？
            </h2>

            <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
              {/* 主按鈕：前往 CRÈM 選蛋糕 */}
              <a
                href="https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-deer-light"
                style={{ fontSize: "0.8rem" }}
              >
                前往 CRÈM 選蛋糕
              </a>

              {/* 次按鈕：預約初衷小鹿 */}
              <a
                href="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.85rem 2.5rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "0.8rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(197,151,109,0.7)",
                  border: "1px solid rgba(197,151,109,0.3)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(197,151,109,1)";
                  el.style.borderColor = "rgba(197,151,109,0.7)";
                  el.style.backgroundColor = "rgba(197,151,109,0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(197,151,109,0.7)";
                  el.style.borderColor = "rgba(197,151,109,0.3)";
                  el.style.backgroundColor = "transparent";
                }}
              >
                預約初衷小鹿
              </a>
            </div>

            <p style={{ marginTop: "2rem", fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(240,233,223,0.2)", letterSpacing: "0.06em" }}>
              先完成初衷小鹿訂位，再前往 CRÈM 官網預訂蛋糕，於結帳備註填入訂位資訊即完成。
            </p>
          </div>
        </div>
      </section>

      {/* 手機版樣式 */}
      <style>{`
        .crem-pain-vs-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 640px) {
          .crem-pain-vs-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .crem-how-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid rgba(197,151,109,0.15);
          max-width: 900px;
        }
        .crem-how-card {
          padding: 2.5rem 1.75rem;
          background: rgba(10,8,7,0.5);
          border-right: 1px solid rgba(197,151,109,0.1);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .crem-how-card:last-child {
          border-right: none;
        }
        .crem-how-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 3rem;
          color: rgba(197,151,109,0.15);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .crem-how-arrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          color: rgba(197,151,109,0.35);
          position: absolute;
          top: 50%;
          right: -0.75rem;
          transform: translateY(-50%);
          z-index: 2;
          background: var(--deer-dark);
          padding: 0.25rem 0;
        }
        .crem-how-title {
          font-family: 'Noto Serif TC', serif;
          font-weight: 300;
          font-size: clamp(0.875rem, 2vw, 1rem);
          color: var(--deer-dark-text);
          letter-spacing: 0.06em;
          line-height: 1.5;
          margin-bottom: 0.375rem;
        }
        .crem-how-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.7rem;
          color: rgba(197,151,109,0.55);
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .crem-how-desc {
          font-family: 'Noto Serif TC', serif;
          font-weight: 300;
          font-size: 0.8rem;
          color: rgba(240,233,223,0.4);
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
          .crem-how-card:last-child {
            border-bottom: none;
          }
          .crem-how-arrow {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
