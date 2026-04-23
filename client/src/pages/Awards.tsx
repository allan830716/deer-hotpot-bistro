/**
 * Awards.tsx — 得獎殊榮頁面
 * 設計語言：暗底、金色細節、大量留白、敘事感
 */
import { useEffect, useRef } from "react";

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

function GoldLine({ width = 32 }: { width?: number }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "1px",
        backgroundColor: "rgba(197,151,109,0.6)",
        margin: "2rem 0",
      }}
    />
  );
}

export default function Awards() {
  const ref1 = useFadeIn(0.1);
  const ref2 = useFadeIn(0.1);
  const ref3 = useFadeIn(0.1);
  const ref4 = useFadeIn(0.1);
  const ref5 = useFadeIn(0.1);

  return (
    <main
      style={{
        paddingTop: "80px",
        backgroundColor: "var(--deer-dark)",
        minHeight: "100vh",
      }}
    >
      {/* ── Hero ── */}
      <section style={{ padding: "6rem 0 4rem" }}>
        <div className="container">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(197,151,109,0.6)",
              marginBottom: "1.25rem",
            }}
          >
            Achievements & Recognition
          </p>
          <h1
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.08em",
              lineHeight: 1.4,
              marginBottom: "1.5rem",
            }}
          >
            得獎殊榮
          </h1>
          <div
            style={{
              width: "32px",
              height: "1px",
              backgroundColor: "rgba(197,151,109,0.5)",
              marginBottom: "2rem",
            }}
          />
          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 300,
              fontSize: "0.9375rem",
              color: "rgba(240,233,223,0.45)",
              lineHeight: 2,
              letterSpacing: "0.06em",
              maxWidth: "480px",
            }}
          >
            每一份認可，都是一個提醒——
            <br />
            讓我們繼續把每一場餐桌做得更好。
          </p>
        </div>
      </section>

      {/* ── 分隔線 ── */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(197,151,109,0.25), transparent)",
          margin: "0 2rem",
        }}
      />

      {/* ── 2023 台北十強 ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div
            ref={ref1}
            className="fade-up"
            style={{ maxWidth: "640px" }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(197,151,109,0.5)",
                marginBottom: "1.25rem",
              }}
            >
              2023 · Taipei International Hotpot Awards
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.1em",
                lineHeight: 1.5,
                marginBottom: "0.5rem",
              }}
            >
              臺北十強鍋物
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                color: "rgba(197,151,109,0.6)",
                letterSpacing: "0.12em",
                marginBottom: "2rem",
              }}
            >
              Taipei International Hotpot Awards — Top 10
            </p>
            <GoldLine />
            <p
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                color: "rgba(240,233,223,0.5)",
                lineHeight: 2,
                letterSpacing: "0.05em",
              }}
            >
              在台北數百家鍋物餐廳中，以湯頭工藝、食材選品與整體用餐體驗，
              獲評審評選為年度十強之列。
            </p>
          </div>
        </div>
      </section>

      {/* ── 分隔線 ── */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(197,151,109,0.15), transparent)",
          margin: "0 2rem",
        }}
      />

      {/* ── 2024 台灣 30 大 ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div
            ref={ref2}
            className="fade-up"
            style={{ maxWidth: "640px", marginLeft: "auto" }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(197,151,109,0.5)",
                marginBottom: "1.25rem",
              }}
            >
              2024 · Taiwan International Hotpot Awards
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.1em",
                lineHeight: 1.5,
                marginBottom: "0.5rem",
              }}
            >
              臺灣 30 大鍋物
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                color: "rgba(197,151,109,0.6)",
                letterSpacing: "0.12em",
                marginBottom: "2rem",
              }}
            >
              Taiwan International Hotpot Awards — Top 30
            </p>
            <GoldLine />
            <p
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                color: "rgba(240,233,223,0.5)",
                lineHeight: 2,
                letterSpacing: "0.05em",
              }}
            >
              從台北到全台，在更大的競技場中再次獲得評審認可，
              入選台灣年度三十大鍋物餐廳。
            </p>
          </div>
        </div>
      </section>

      {/* ── 分隔線 ── */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(197,151,109,0.15), transparent)",
          margin: "0 2rem",
        }}
      />

      {/* ── 日本 &Premium ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div
            ref={ref3}
            className="fade-up"
            style={{ maxWidth: "640px" }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(197,151,109,0.5)",
                marginBottom: "1.25rem",
              }}
            >
              July 2024 · &amp;Premium Japan
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.1em",
                lineHeight: 1.5,
                marginBottom: "0.5rem",
              }}
            >
              日本生活品味雜誌《&amp;Premium》年度收錄
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                color: "rgba(197,151,109,0.6)",
                letterSpacing: "0.12em",
                marginBottom: "2rem",
              }}
            >
              The Guide To A Better Life
            </p>
            <GoldLine />
            <p
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                color: "rgba(240,233,223,0.5)",
                lineHeight: 2,
                letterSpacing: "0.05em",
              }}
            >
              以「美好生活指南」為核心概念的日本知名生活雜誌《&amp;Premium》，
              於 2024 年 7 月號收錄初衷小鹿，作為台北值得一訪的品味餐廳代表。
              <br />
              <br />
              「品味」是個很主觀的定義，但在《&amp;Premium》中，
              它為好品味設下一個範圍與樣貌。
            </p>
          </div>
        </div>
      </section>

      {/* ── 分隔線 ── */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(197,151,109,0.15), transparent)",
          margin: "0 2rem",
        }}
      />

      {/* ── Google 三不原則 ── */}
      <section
        style={{
          padding: "6rem 0",
          backgroundColor: "rgba(10,8,7,0.4)",
        }}
      >
        <div className="container">
          <div
            ref={ref4}
            className="fade-up"
            style={{ maxWidth: "640px", marginLeft: "auto" }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(197,151,109,0.5)",
                marginBottom: "1.25rem",
              }}
            >
              Google Reviews · 4.6 Stars
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 200,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--deer-dark-text)",
                letterSpacing: "0.1em",
                lineHeight: 1.5,
                marginBottom: "2rem",
              }}
            >
              4.6 顆星
              <br />
              100% 自主性真實評論
            </h2>
            <GoldLine />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                "從不請客人主動評論",
                "從不做評論送禮活動",
                "從不花錢購買假評論",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(197,151,109,0.5)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      fontFamily: "'Cormorant Garamond', serif",
                      paddingTop: "0.2rem",
                      flexShrink: 0,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <p
                    style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontWeight: 300,
                      fontSize: "0.9375rem",
                      color: "rgba(240,233,223,0.65)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.7,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 300,
                fontSize: "0.8125rem",
                color: "rgba(240,233,223,0.3)",
                lineHeight: 2,
                letterSpacing: "0.05em",
                marginTop: "2rem",
              }}
            >
              一點一滴收集每一位客人真實的反饋，
              <br />
              成為我們每個進步的方針。
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "6rem 0",
          textAlign: "center",
          borderTop: "1px solid rgba(197,151,109,0.1)",
        }}
      >
        <div ref={ref5} className="fade-up container">
          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 200,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              color: "var(--deer-dark-text)",
              letterSpacing: "0.1em",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            這些認可，讓我們繼續做好
            <br />
            每一場餐桌。
          </p>
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
      </section>
    </main>
  );
}
