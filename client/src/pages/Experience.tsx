/*
 * 初衷小鹿 — 沉浸式品牌體驗 Experience.tsx
 * 設計語言：全螢幕 Scrollytelling，GSAP ScrollTrigger 驅動
 * 每個 Section 固定視窗，滾動觸發文字逐句浮現、照片視差、淡入淡出
 * 敘事結構：開場 → 起源 → 湯底哲學 → 空間 → 款待 → 訂位
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 使用已上傳的空間照片
const IMGS = {
  hero:    "/manus-storage/space_A_signage_9eef2174.jpg",
  origin:  "/manus-storage/space_B_exterior_a879d9bc.jpg",
  soup:    "/manus-storage/space_D_dining_main_59a93d64.jpg",
  space:   "/manus-storage/space_F_ambience_d74b61dd.jpg",
  table:   "/manus-storage/space_G_table_782db411.jpg",
  window:  "/manus-storage/space_H_window_34f0207f.jpg",
  bar:     "/manus-storage/space_I_bar_0b30e5e6.jpg",
  brand:   "/manus-storage/space_J_brand_a327435b.jpg",
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 通用：每個 .reveal-line 逐行浮現 ──
      gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── 通用：.reveal-slow 慢速淡入 ──
      gsap.utils.toArray<HTMLElement>(".reveal-slow").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0 },
          {
            opacity: 1, duration: 1.8, ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── Section 1 Hero：文字從下往上，錯開時間 ──
      gsap.fromTo(".hero-label",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(".hero-title span",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power3.out", stagger: 0.18, delay: 0.7 }
      );
      gsap.fromTo(".hero-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.5 }
      );
      gsap.fromTo(".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.0 }
      );

      // ── Section 2 起源：照片視差 ──
      gsap.to(".parallax-origin",
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-origin",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // ── Section 3 湯底：橫向文字跑馬 ──
      gsap.to(".marquee-inner",
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-soup",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // ── Section 3 湯底：照片視差 ──
      gsap.to(".parallax-soup",
        {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-soup",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // ── Section 4 空間：圖片從右滑入 ──
      gsap.fromTo(".space-img-right",
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-space",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Section 5 款待：數字計數動畫 ──
      const counters = [
        { el: ".count-year", end: 2019, suffix: "" },
        { el: ".count-score", end: 4.6, suffix: "", decimals: 1 },
        { el: ".count-reviews", end: 1593, suffix: "+" },
        { el: ".count-award", end: 10, suffix: "" },
      ];
      counters.forEach(({ el, end, suffix, decimals = 0 }) => {
        const target = document.querySelector(el) as HTMLElement;
        if (!target) return;
        gsap.fromTo({ val: 0 }, { val: end },
          {
            duration: 2.2, ease: "power2.out",
            onUpdate: function () {
              target.textContent = (this.targets()[0] as { val: number }).val.toFixed(decimals) + suffix;
            },
            scrollTrigger: {
              trigger: target,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Section 6 訂位：線條從左展開 ──
      gsap.fromTo(".cta-line",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".section-cta",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const gold = "rgba(197,151,109,1)";
  const goldDim = "rgba(197,151,109,0.65)";
  const goldFaint = "rgba(197,151,109,0.35)";
  const cream = "rgba(240,233,223,0.92)";
  const creamDim = "rgba(240,233,223,0.55)";
  const creamFaint = "rgba(240,233,223,0.28)";
  const dark = "#1A1210";

  return (
    <div ref={containerRef} style={{ backgroundColor: dark, color: cream, overflowX: "hidden" }}>

      {/* ══════════════════════════════════════
          SECTION 1 — HERO（全螢幕開場）
      ══════════════════════════════════════ */}
      <section style={{
        position: "relative", height: "100vh", overflow: "hidden",
        display: "flex", alignItems: "flex-end",
      }}>
        <img
          src={IMGS.hero}
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "115%", objectFit: "cover",
            filter: "brightness(0.38)",
            transformOrigin: "center center",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, rgba(26,18,16,0) 30%, rgba(26,18,16,0.85) 100%)`,
        }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 7vw 9vh", width: "100%" }}>
          <p className="hero-label" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase",
            color: goldDim, marginBottom: "2rem",
          }}>
            Deer's Hotpot Bistro — Brand Experience
          </p>
          <h1 className="hero-title" style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            lineHeight: 1.2, letterSpacing: "0.06em",
            color: cream, marginBottom: "2.5rem",
            overflow: "hidden",
          }}>
            <span style={{ display: "inline-block" }}>不是一頓</span>
            <span style={{ display: "inline-block" }}>火鍋，</span>
            <br />
            <span style={{ display: "inline-block" }}>是一場有</span>
            <span style={{ display: "inline-block" }}>節奏的</span>
            <br />
            <span style={{ display: "inline-block", color: gold }}>餐桌體驗。</span>
          </h1>
          <p className="hero-sub" style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
            fontSize: "0.9rem", color: creamDim,
            letterSpacing: "0.1em", lineHeight: 2,
            marginBottom: "3rem",
          }}>
            台北信義 · 鍋物餐酒館
          </p>
          <div className="hero-cta" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ width: "48px", height: "1px", backgroundColor: goldFaint }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.7rem", letterSpacing: "0.2em",
              color: goldDim, textTransform: "uppercase",
            }}>Scroll to begin</p>
          </div>
        </div>
        {/* 滾動提示箭頭 */}
        <div style={{
          position: "absolute", bottom: "2.5rem", right: "7vw", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: "1px", height: "20px",
              backgroundColor: goldFaint,
              animation: `pulse-down 1.8s ease-in-out ${i * 0.3}s infinite`,
            }} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — 起源（品牌故事）
      ══════════════════════════════════════ */}
      <section className="section-origin" style={{
        position: "relative", minHeight: "100vh", overflow: "hidden",
        display: "flex", alignItems: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0, overflow: "hidden",
        }}>
          <img
            src={IMGS.origin}
            alt=""
            className="parallax-origin"
            style={{
              width: "100%", height: "130%", objectFit: "cover",
              filter: "brightness(0.22)",
              transformOrigin: "center top",
            }}
          />
        </div>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, rgba(26,18,16,0.92) 0%, rgba(26,18,16,0.4) 100%)`,
        }} />
        <div style={{
          position: "relative", zIndex: 2,
          padding: "10vh 7vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6vw",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}>
          <div>
            <p className="reveal-line" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.65rem", letterSpacing: "0.26em", textTransform: "uppercase",
              color: goldDim, marginBottom: "2rem",
            }}>01 — Origin</p>
            <h2 className="reveal-line" style={{
              fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              color: cream, lineHeight: 1.5, letterSpacing: "0.08em",
              marginBottom: "3rem",
            }}>
              一段環島，<br />一個頓悟。
            </h2>
            <div className="reveal-line" style={{
              width: "36px", height: "1px",
              backgroundColor: goldFaint,
              marginBottom: "2.5rem",
            }} />
            <p className="reveal-line" style={{
              fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
              fontSize: "0.9375rem", color: creamDim,
              lineHeight: 2.2, letterSpacing: "0.05em",
              maxWidth: "440px",
            }}>
              2019 年，創辦人在一趟環島旅途中，<br />
              在一個陌生的小鎮吃到一頓讓他說不出話的飯。<br /><br />
              不是因為多豪華。<br />
              是因為那頓飯讓他想起了<br />
              <span style={{ color: gold }}>「為什麼要好好吃一頓飯」</span>。
            </p>
          </div>
          <div className="reveal-slow" style={{
            borderLeft: `1px solid ${goldFaint}`,
            paddingLeft: "4vw",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
              color: gold, lineHeight: 1.9, letterSpacing: "0.04em",
              marginBottom: "2rem",
            }}>
              "人生最容易被遺忘的，<br />就是初衷。"
            </p>
            <p style={{
              fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
              fontSize: "0.8rem", color: creamFaint,
              letterSpacing: "0.1em",
            }}>
              — 初衷小鹿，創立於 2019
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — 湯底哲學（跑馬燈 + 大圖）
      ══════════════════════════════════════ */}
      <section className="section-soup" style={{
        position: "relative", minHeight: "100vh",
        overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        {/* 背景照片視差 */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src={IMGS.soup}
            alt=""
            className="parallax-soup"
            style={{
              width: "100%", height: "130%", objectFit: "cover",
              filter: "brightness(0.18)",
              transformOrigin: "center top",
            }}
          />
        </div>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to right, rgba(26,18,16,0.95) 40%, rgba(26,18,16,0.5) 100%)`,
        }} />

        {/* 跑馬燈 */}
        <div style={{
          position: "absolute", top: "12%",
          width: "100%", overflow: "hidden",
          borderTop: `1px solid ${goldFaint}`,
          borderBottom: `1px solid ${goldFaint}`,
          padding: "0.8rem 0",
        }}>
          <div className="marquee-inner" style={{
            display: "flex", gap: "4rem",
            whiteSpace: "nowrap",
            width: "200%",
          }}>
            {Array(6).fill(null).map((_, i) => (
              <span key={i} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontWeight: 300,
                fontSize: "0.75rem", letterSpacing: "0.2em",
                color: goldDim, textTransform: "uppercase",
              }}>
                Soup is the Soul &nbsp;·&nbsp; 湯底是靈魂 &nbsp;·&nbsp; Not Background &nbsp;·&nbsp; 不是背景 &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* 主內容 */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "18vh 7vw 10vh",
          maxWidth: "680px",
        }}>
          <p className="reveal-line" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.65rem", letterSpacing: "0.26em", textTransform: "uppercase",
            color: goldDim, marginBottom: "2rem",
          }}>02 — Philosophy</p>
          <h2 className="reveal-line" style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            color: cream, lineHeight: 1.5, letterSpacing: "0.08em",
            marginBottom: "3rem",
          }}>
            湯底從來不是背景，<br />
            <span style={{ color: gold }}>而是料理的靈魂。</span>
          </h2>
          <p className="reveal-line" style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
            fontSize: "0.9375rem", color: creamDim,
            lineHeight: 2.3, letterSpacing: "0.05em",
          }}>
            每一鍋湯底，都是從骨頭開始熬的。<br />
            不加味精，不走捷徑。<br /><br />
            清澈的湯，是最誠實的廚藝。<br />
            你嘗到的每一口，都是時間的重量。
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — 空間（左文右圖）
      ══════════════════════════════════════ */}
      <section className="section-space" style={{
        minHeight: "100vh", backgroundColor: "#120E0D",
        display: "flex", alignItems: "stretch",
      }}>
        {/* 左側文字 */}
        <div style={{
          flex: "0 0 45%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "10vh 5vw 10vh 7vw",
        }}>
          <p className="reveal-line" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.65rem", letterSpacing: "0.26em", textTransform: "uppercase",
            color: goldDim, marginBottom: "2rem",
          }}>03 — Space</p>
          <h2 className="reveal-line" style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            color: cream, lineHeight: 1.5, letterSpacing: "0.08em",
            marginBottom: "3rem",
          }}>
            空間不只是<br />背景。
          </h2>
          <div className="reveal-line" style={{
            width: "36px", height: "1px",
            backgroundColor: goldFaint, marginBottom: "2.5rem",
          }} />
          <p className="reveal-line" style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
            fontSize: "0.9375rem", color: creamDim,
            lineHeight: 2.3, letterSpacing: "0.05em",
            marginBottom: "3rem",
          }}>
            黑磚、木質、暖銅燈具。<br />
            每一處細節，都是刻意留下的安靜。<br /><br />
            桌與桌之間的距離，是一種尊重。<br />
            讓你的對話，只屬於這張桌子。
          </p>
          <a
            href="/space"
            className="reveal-line"
            style={{
              display: "inline-flex", alignItems: "center", gap: "1rem",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: goldDim, textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = gold)}
            onMouseLeave={(e) => (e.currentTarget.style.color = goldDim)}
          >
            <span>瀏覽空間</span>
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "currentColor" }} />
          </a>
        </div>

        {/* 右側圖片組合 */}
        <div className="space-img-right" style={{
          flex: "1",
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gridTemplateColumns: "1fr 1fr",
          gap: "3px",
        }}>
          <img src={IMGS.space} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", gridRow: "1 / 3", gridColumn: "1" }} />
          <img src={IMGS.table} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src={IMGS.window} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — 數字（品牌成就）
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: "60vh", backgroundColor: dark,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "10vh 7vw",
        borderTop: `1px solid rgba(255,255,255,0.04)`,
      }}>
        <p className="reveal-line" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.65rem", letterSpacing: "0.26em", textTransform: "uppercase",
          color: goldDim, marginBottom: "5rem", textAlign: "center",
        }}>04 — Recognition</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2px",
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
        }}>
          {[
            { label: "創立年份", value: "count-year", unit: "" },
            { label: "Google 評分", value: "count-score", unit: " / 5" },
            { label: "評論則數", value: "count-reviews", unit: "" },
            { label: "全台鍋物 Top", value: "count-award", unit: "" },
          ].map(({ label, value, unit }) => (
            <div key={label} style={{
              textAlign: "center",
              padding: "3rem 1rem",
              borderRight: `1px solid rgba(255,255,255,0.05)`,
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 4vw, 3.8rem)",
                color: gold, lineHeight: 1,
                marginBottom: "1rem",
              }}>
                <span className={value}>0</span>
                <span style={{ fontSize: "0.5em" }}>{unit}</span>
              </p>
              <p style={{
                fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
                fontSize: "0.78rem", color: creamFaint,
                letterSpacing: "0.1em",
              }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6 — 款待哲學（全寬引句）
      ══════════════════════════════════════ */}
      <section style={{
        position: "relative", minHeight: "70vh", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img
          src={IMGS.bar}
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.2)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `rgba(26,18,16,0.6)`,
        }} />
        <div style={{
          position: "relative", zIndex: 2,
          textAlign: "center", padding: "8vh 7vw",
          maxWidth: "700px",
        }}>
          <p className="reveal-line" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
            color: gold, lineHeight: 1.9, letterSpacing: "0.04em",
            marginBottom: "2.5rem",
          }}>
            "我們不賣熱鬧。<br />
            我們賣的是，<br />
            一頓值得記住的飯。"
          </p>
          <div style={{ width: "24px", height: "1px", backgroundColor: goldFaint, margin: "0 auto 2rem" }} />
          <p className="reveal-slow" style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
            fontSize: "0.8rem", color: creamFaint,
            letterSpacing: "0.12em",
          }}>初衷小鹿 Deer's Hotpot Bistro</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7 — CTA（訂位）
      ══════════════════════════════════════ */}
      <section className="section-cta" style={{
        minHeight: "80vh", backgroundColor: "#0E0B0A",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "10vh 7vw",
        textAlign: "center",
      }}>
        <p className="reveal-line" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase",
          color: goldDim, marginBottom: "3rem",
        }}>Reserve Your Table</p>

        <h2 className="reveal-line" style={{
          fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          color: cream, lineHeight: 1.35, letterSpacing: "0.08em",
          marginBottom: "1.5rem",
        }}>
          準備好了嗎？
        </h2>
        <h2 className="reveal-line" style={{
          fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          color: gold, lineHeight: 1.35, letterSpacing: "0.08em",
          marginBottom: "4rem",
        }}>
          預約一場有節奏的晚餐。
        </h2>

        {/* 展開線條 */}
        <div className="cta-line" style={{
          width: "80px", height: "1px",
          backgroundColor: goldFaint,
          transformOrigin: "left center",
          marginBottom: "4rem",
        }} />

        <p className="reveal-line" style={{
          fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
          fontSize: "0.9rem", color: creamDim,
          lineHeight: 2.2, letterSpacing: "0.06em",
          marginBottom: "4rem",
        }}>
          台北市信義區忠孝東路四段 553 巷 6 弄 15 號<br />
          晚餐時段 · 最低消費每位 $600 + 10%
        </p>

        <div className="reveal-line" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="/reservation"
            style={{
              display: "inline-block",
              padding: "1.1rem 3.5rem",
              backgroundColor: gold,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.75rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: dark, textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(197,151,109,0.85)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = gold; }}
          >
            立即訂位
          </a>
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "1.1rem 3.5rem",
              border: `1px solid ${goldFaint}`,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.75rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: goldDim, textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = goldDim; (e.currentTarget as HTMLAnchorElement).style.color = gold; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = goldFaint; (e.currentTarget as HTMLAnchorElement).style.color = goldDim; }}
          >
            回到官網
          </a>
        </div>
      </section>

      {/* 全域動畫 CSS */}
      <style>{`
        @keyframes pulse-down {
          0%, 100% { opacity: 0.2; transform: scaleY(0.6); }
          50% { opacity: 0.8; transform: scaleY(1); }
        }
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .section-space {
            flex-direction: column !important;
          }
          .section-space > div:first-child {
            flex: none !important;
            padding: 6vh 5vw !important;
          }
          .space-img-right {
            height: 50vw !important;
            min-height: 280px;
          }
        }
      `}</style>
    </div>
  );
}
