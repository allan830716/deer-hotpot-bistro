/*
 * CRÈM 蛋糕上桌預訂頁面 (v5)
 * 結構：
 * 1. Hero — 雙品牌 Logo（上方）+ 兩圖並排（電腦版全寬）+ 主標題
 * 2. 一條龍預定服務 — 六宮格痛點（× 叉叉）+ 橫向流程圖示（S 型連接）
 * 3. 訂購方式 — 輪播步驟圖（6 張）
 * 4. 預訂期間 — 橫幅圖 + 時程表
 * 5. CTA
 */
import { useEffect, useRef, useState } from "react";

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

// ── 圖片 CDN 路徑 ──────────────────────────────────────────────────────────
const DEER_LOGO = "/manus-storage/deer-logo-white_a35020cd.webp";
// Hero 左圖：CRÈM 鮮奶油蛋糕照片
const HERO_LEFT = "/manus-storage/crem-cake_7f5629d5.jpg";
// Hero 右圖：初衷小鹿餐廳空間
const HERO_RIGHT = "/manus-storage/59301147_2179218135493270_2323651919307866112_o_0536430f.jpg";
// 訂購方式輪播
const HOW_TO_ORDER_HERO = "/manus-storage/crem-how-to-order-hero_9e446791.webp";
const STEP1_IMG = "/manus-storage/crem-step1-flavor_672c25e8.webp";
const STEP2_IMG = "/manus-storage/crem-step2-booking_7694680f.webp";
const STEP3_IMG = "/manus-storage/crem-step3-checkout_7f71404e.webp";
const STEP4_IMG = "/manus-storage/crem-step4-notes_160b6582.webp";
const STEP5_IMG = "/manus-storage/crem-step5-done2_2e613f78.png";
// 預訂期間橫幅
const PREORDER_BANNER = "/manus-storage/crem-preorder-banner_8d365f8c.png";

// ── 痛點資料 ────────────────────────────────────────────────────────────────
const PAIN_POINTS = [
  "壽星在旁，還要偷偷準備",
  "花費交通、時間取蛋糕",
  "怕蛋糕撞壞或融化變形",
  "取貨時間對不上，行程亂掉",
  "一邊吃飯還要偷偷協調",
  "製造驚喜卻變成最忙的人",
];

// ── 流程步驟（橫向 S 型連接）────────────────────────────────────────────────
const FLOW_STEPS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 26, height: 26 }}>
        <rect x="6" y="8" width="28" height="24" rx="2"/>
        <path d="M13 8V5M27 8V5M6 16h28" strokeLinecap="round"/>
        <circle cx="20" cy="26" r="3"/>
      </svg>
    ),
    zh: "線上選口味",
    sub: "4 / 6 / 8 吋\n快速預訂",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 26, height: 26 }}>
        <path d="M8 32V12a2 2 0 012-2h20a2 2 0 012 2v20" strokeLinecap="round"/>
        <path d="M4 32h32" strokeLinecap="round"/>
        <path d="M16 22h8M16 17h8" strokeLinecap="round"/>
      </svg>
    ),
    zh: "訂位時同步預約",
    sub: "訂位時可以同步\n預約蛋糕服務",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 26, height: 26 }}>
        <rect x="4" y="14" width="22" height="14" rx="2"/>
        <path d="M26 18l8-4v12l-8-4" strokeLinejoin="round"/>
        <circle cx="15" cy="21" r="3"/>
      </svg>
    ),
    zh: "專車冷藏配送",
    sub: "低溫冷藏\n省去取貨",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="rgba(197,151,109,0.9)" strokeWidth="1.5" style={{ width: 26, height: 26 }}>
        <path d="M20 6c-7.7 0-14 5.4-14 12 0 4.2 2.3 7.9 6 10.2V34l5-3h3c7.7 0 14-5.4 14-12S27.7 6 20 6z"/>
        <path d="M14 20l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    zh: "專人安排上桌",
    sub: "蠟燭 / 擺盤\n時機提前安排",
  },
];

// ── 訂購方式輪播資料 ─────────────────────────────────────────────────────────
const ORDER_STEPS = [
  {
    img: HOW_TO_ORDER_HERO,
    stepNum: null as number | null,
    title: "如何預訂\n慶祝一條龍服務？",
    titleEn: "HOW TO ORDER",
    desc: "只需簡單幾步，\n我們將為您安排專屬於您的慶祝時刻。",
    descEn: "CAKE × RESERVATION × CELEBRATION",
  },
  {
    img: STEP1_IMG,
    stepNum: 1 as number | null,
    title: "選擇口味",
    titleEn: "CHOOSE FLAVOR",
    desc: "挑選您喜歡的蛋糕口味與尺寸，\n開啟美好慶祝的第一步！",
    descEn: "Select your favorite cake flavor and size,\nand start the celebration!",
  },
  {
    img: STEP2_IMG,
    stepNum: 2 as number | null,
    title: "點選「是否有訂位？」",
    titleEn: "CHECK BOOKING",
    desc: "在產品頁面中，\n點選「是否有訂位初衷小鹿？」\n選擇「有，下一頁結帳頁面備註填上訂位」",
    descEn: 'On the product page,\nselect "Do you have a reservation?"',
  },
  {
    img: STEP3_IMG,
    stepNum: 3 as number | null,
    title: "前往結帳頁面",
    titleEn: "GO TO CHECKOUT",
    desc: "確認商品與數量後，\n點選「立即購買」\n前往結帳頁面。",
    descEn: 'Click "立即購買"\nto proceed to checkout.',
  },
  {
    img: STEP4_IMG,
    stepNum: 4 as number | null,
    title: "填寫訂單備註",
    titleEn: "FILL IN ORDER NOTES",
    desc: "在結帳頁面的「訂單備註」中，\n填寫訂位大名 / 時間 / 電話，\n讓我們為您安排最完美的蛋糕！",
    descEn: "In Order Notes:\nName / Time / Phone Number",
  },
  {
    img: STEP5_IMG,
    stepNum: 5 as number | null,
    title: "預訂完成！",
    titleEn: "ALL SET",
    desc: "感謝您預訂「慶祝一條龍服務」！\n我們將用心為您打造專屬的完美時刻，\n期待與您一同慶祝人生中每個重要時刻。",
    descEn: "Thank you for choosing our\nall-in-one celebration service!",
  },
];

export default function Crem() {
  const refService = useFadeIn(0.08);
  const refPreorder = useFadeIn(0.08);
  const refCta = useFadeIn(0.1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = ORDER_STEPS.length;

  const gold = "rgba(197,151,109,1)";
  const goldFaint = "rgba(197,151,109,0.5)";
  const textMain = "#F0E9DF";
  const textSub = "rgba(240,233,223,0.45)";

  const step = ORDER_STEPS[currentSlide];

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "#0A0807", minHeight: "100vh" }}>

      {/* ══ Section 1: Hero ══ */}
      <section style={{ backgroundColor: "#0A0807" }}>

        {/* 雙品牌 Logo 橫幅 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "clamp(1.5rem, 5vw, 3rem)",
          padding: "2.5rem 2rem 2rem",
          borderBottom: "1px solid rgba(197,151,109,0.1)",
        }}>
          <img src={DEER_LOGO} alt="初衷小鹿" style={{ height: "clamp(48px, 8vw, 68px)", width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3rem)", color: "rgba(197,151,109,0.4)", lineHeight: 1 }}>×</span>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.2em", color: "#fff", lineHeight: 1 }}>
            CR<span style={{ fontSize: "0.85em" }}>È</span>M
          </div>
        </div>

        {/* 兩圖並排 — 電腦版全寬，手機版堆疊 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: "100%" }}>
          <div style={{ overflow: "hidden", lineHeight: 0 }}>
            <img
              src={HERO_LEFT}
              alt="CRÈM 鮮奶油蛋糕"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "4/3" }}
            />
          </div>
          <div style={{ overflow: "hidden", lineHeight: 0 }}>
            <img
              src={HERO_RIGHT}
              alt="初衷小鹿餐廳空間"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "4/3" }}
            />
          </div>
        </div>

        {/* 主標題 */}
        <div style={{ textAlign: "center", padding: "3.5rem 2rem 3rem", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
          <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            Exclusive Collaboration · 慶祝蛋糕 × 餐廳
          </p>
          <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.45, marginBottom: "1.25rem" }}>
            CRÈM 蛋糕上桌預訂
          </h1>
          <p style={{ color: textSub, fontSize: "0.9rem", lineHeight: 2, letterSpacing: "0.06em" }}>
            由兩個品牌共創一場慶祝的完整設計。<br />
            從餐桌到蛋糕，讓每個重要時刻都更加完整。
          </p>
        </div>
      </section>

      {/* ══ Section 2: 一條龍預定服務 ══ */}
      <section style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(197,151,109,0.1)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div ref={refService} className="fade-up">

            {/* 標題 */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                慶祝蛋糕 × 餐廳
              </p>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                一條龍預定服務
              </h2>
              <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 1.9 }}>
                想在重要的日子好好慶祝，卻總是被這些事情打亂？
              </p>
            </div>

            {/* 六宮格痛點（× 叉叉，左3右3）*/}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.625rem",
              marginBottom: "3.5rem",
            }}>
              {PAIN_POINTS.map((point, i) => (
                <div key={i} style={{
                  border: "1px solid rgba(197,151,109,0.18)",
                  borderRadius: "8px",
                  padding: "0.875rem 1.125rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  backgroundColor: "rgba(255,255,255,0.015)",
                }}>
                  <span style={{ color: gold, fontSize: "1rem", flexShrink: 0, lineHeight: 1, fontWeight: 400 }}>×</span>
                  <span style={{ color: "rgba(240,233,223,0.7)", fontSize: "0.85rem", lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </div>

            {/* 橫向流程圖示（S 型曲線連接）*/}
            <div style={{
              backgroundColor: "rgba(197,151,109,0.04)",
              border: "1px solid rgba(197,151,109,0.14)",
              borderRadius: "12px",
              padding: "2rem 1.5rem",
            }}>
              <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", marginBottom: "2rem" }}>
                After · 一條龍服務流程
              </p>
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                overflowX: "auto",
                paddingBottom: "0.5rem",
              }}>
                {FLOW_STEPS.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", flexShrink: 0 }}>
                    {/* 步驟卡片 */}
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      width: "clamp(90px, 22vw, 130px)",
                      padding: "0 0.5rem",
                    }}>
                      <div style={{
                        width: "60px", height: "60px",
                        border: "1px solid rgba(197,151,109,0.45)",
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        backgroundColor: "rgba(197,151,109,0.05)",
                        marginBottom: "0.875rem",
                        flexShrink: 0,
                      }}>
                        {s.icon}
                      </div>
                      <p style={{ color: textMain, fontSize: "0.8rem", letterSpacing: "0.04em", marginBottom: "0.35rem", lineHeight: 1.4 }}>{s.zh}</p>
                      <p style={{ color: textSub, fontSize: "0.68rem", lineHeight: 1.65, whiteSpace: "pre-line" }}>{s.sub}</p>
                    </div>
                    {/* S 型曲線箭頭 */}
                    {i < FLOW_STEPS.length - 1 && (
                      <div style={{ display: "flex", alignItems: "center", paddingTop: "18px", flexShrink: 0 }}>
                        <svg viewBox="0 0 44 24" fill="none" style={{ width: "44px", height: "24px" }}>
                          <path d="M0 12 Q11 0 22 12 Q33 24 44 12" stroke="rgba(197,151,109,0.5)" strokeWidth="1.2" fill="none"/>
                          <path d="M39 9 L44 12 L39 15" stroke="rgba(197,151,109,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Section 3: 訂購方式（輪播）══ */}
      <section style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(197,151,109,0.1)", backgroundColor: "#090706" }}>
        <div className="container" style={{ maxWidth: "960px" }}>

          {/* 標題 */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>How To Order</p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: textMain, letterSpacing: "0.08em" }}>
              訂購方式
            </h2>
          </div>

          {/* 輪播主體 */}
          <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(197,151,109,0.18)", backgroundColor: "#111" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
              <img
                key={currentSlide}
                src={step.img}
                alt={step.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* 漸層遮罩 */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, rgba(9,7,6,0.92) 0%, rgba(9,7,6,0.55) 45%, rgba(9,7,6,0.08) 100%)",
              }} />
              {/* 文字 */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "5%",
                transform: "translateY(-50%)",
                maxWidth: "48%",
                zIndex: 2,
              }}>
                {step.stepNum && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
                    <div style={{
                      width: "46px", height: "46px",
                      border: "1.5px solid rgba(197,151,109,0.75)",
                      borderRadius: "50%",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ color: "rgba(197,151,109,0.65)", fontSize: "0.45rem", letterSpacing: "0.15em", lineHeight: 1 }}>STEP</span>
                      <span style={{ color: gold, fontSize: "1.2rem", fontWeight: 300, lineHeight: 1 }}>{step.stepNum}</span>
                    </div>
                  </div>
                )}
                <h3 style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 200,
                  fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                  color: textMain,
                  letterSpacing: "0.06em",
                  lineHeight: 1.45,
                  marginBottom: "0.5rem",
                  whiteSpace: "pre-line",
                }}>
                  {step.title}
                </h3>
                <p style={{ color: goldFaint, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.875rem" }}>{step.titleEn}</p>
                <p style={{ color: "rgba(240,233,223,0.72)", fontSize: "clamp(0.72rem, 1.5vw, 0.875rem)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{step.desc}</p>
                {step.descEn && (
                  <p style={{ color: "rgba(197,151,109,0.55)", fontSize: "0.62rem", lineHeight: 1.7, marginTop: "0.5rem", whiteSpace: "pre-line" }}>{step.descEn}</p>
                )}
              </div>
            </div>

            {/* 左箭頭 */}
            <button
              onClick={() => setCurrentSlide((currentSlide - 1 + total) % total)}
              aria-label="上一步"
              style={{
                position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
                width: "38px", height: "38px",
                border: "1px solid rgba(197,151,109,0.45)", borderRadius: "50%",
                backgroundColor: "rgba(9,7,6,0.65)", color: gold,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.25rem", zIndex: 10,
              }}
            >‹</button>
            {/* 右箭頭 */}
            <button
              onClick={() => setCurrentSlide((currentSlide + 1) % total)}
              aria-label="下一步"
              style={{
                position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                width: "38px", height: "38px",
                border: "1px solid rgba(197,151,109,0.45)", borderRadius: "50%",
                backgroundColor: "rgba(9,7,6,0.65)", color: gold,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.25rem", zIndex: 10,
              }}
            >›</button>
          </div>

          {/* 指示點 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
            {ORDER_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: i === currentSlide ? "22px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: i === currentSlide ? gold : "rgba(197,151,109,0.22)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* 步驟標籤列 */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0", marginTop: "0.75rem" }}>
            {ORDER_STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0.4rem 0.75rem",
                  color: i === currentSlide ? gold : "rgba(240,233,223,0.3)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s",
                  borderBottom: i === currentSlide ? `1px solid ${goldFaint}` : "1px solid transparent",
                }}
              >
                {s.stepNum ? `STEP ${s.stepNum}` : "介紹"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Section 4: 預訂期間 ══ */}
      <section style={{ borderBottom: "1px solid rgba(197,151,109,0.1)", overflow: "hidden" }}>
        {/* 橫幅圖 */}
        <img
          src={PREORDER_BANNER}
          alt="預訂期間 PRE-ORDER WINDOW"
          style={{ width: "100%", display: "block", objectFit: "cover" }}
        />

        {/* 說明 + 範例 */}
        <div ref={refPreorder} className="fade-up container" style={{ maxWidth: "680px", padding: "3.5rem 2rem 4rem" }}>
          <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 1.9, textAlign: "center", marginBottom: "2.5rem" }}>
            CRÈM 每月分兩批公布蛋糕口味並開放預訂。<br />
            請在開放期間內至 CRÈM 官網完成預訂。
          </p>
          <div style={{
            border: "1px solid rgba(197,151,109,0.22)",
            borderRadius: "8px",
            padding: "1.5rem 2rem",
            backgroundColor: "rgba(197,151,109,0.03)",
          }}>
            <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center" }}>Example</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { date: "4 / 1", period: "04/16 ～ 04/30" },
                { date: "4 / 15", period: "05/01 ～ 05/15" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
                  <span style={{ color: "rgba(240,233,223,0.55)", fontSize: "0.9rem", minWidth: "60px", textAlign: "right" }}>EX. {row.date}</span>
                  <span style={{
                    backgroundColor: "rgba(197,151,109,0.7)",
                    color: "#0a0806",
                    fontSize: "0.62rem",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "3px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}>開放</span>
                  <span style={{ color: textMain, fontSize: "0.95rem", letterSpacing: "0.04em" }}>{row.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Section 5: CTA ══ */}
      <section style={{ padding: "5rem 2rem", textAlign: "center" }}>
        <div ref={refCta} className="fade-up">
          <p style={{ color: goldFaint, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Ready to Celebrate</p>
          <h2 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 200,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: textMain,
            letterSpacing: "0.08em",
            marginBottom: "1rem",
          }}>
            開始預訂您的專屬蛋糕
          </h2>
          <p style={{ color: textSub, fontSize: "0.875rem", lineHeight: 1.9, marginBottom: "2.5rem" }}>
            前往 CRÈM 官網選擇口味與尺寸，<br />
            記得在產品頁面選擇「有訂位初衷小鹿」。
          </p>
          <a
            href="https://www.crem.tw/collections/%E9%AE%AE%E5%A5%B6%E6%B2%B9%E8%9B%8B%E7%B3%95-%E7%B3%BB%E5%88%97"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              border: "1px solid rgba(197,151,109,0.65)",
              color: gold,
              padding: "0.875rem 2.5rem",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            前往 CRÈM 選蛋糕
          </a>
          <p style={{ color: "rgba(240,233,223,0.25)", fontSize: "0.68rem", marginTop: "1.5rem", letterSpacing: "0.06em" }}>
            ＊預訂蛋糕請在 CRÈM 官網下單，請勿直接在初衷小鹿留言
          </p>
        </div>
      </section>
    </main>
  );
}
