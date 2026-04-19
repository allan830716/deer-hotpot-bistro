/*
 * 初衷小鹿 — 空間體驗 Space.tsx
 * 設計語言：深棕黑底、暖銅金點綴、大量留白、非對稱排版
 * 使用真實空間照片，以圖說話，文字克制
 */
import { useEffect, useRef, useState } from "react";

const PHOTOS = {
  s01: "/manus-storage/space_01_46a2b595.jpg",
  s02: "/manus-storage/space_02_6ad69bca.jpg",
  s03: "/manus-storage/space_03_8b9efac3.jpg",
  s04: "/manus-storage/space_04_20d638c9.jpg",
  s05: "/manus-storage/space_05_11727767.jpg",
  s06: "/manus-storage/space_06_fede7c8b.jpg",
  s07: "/manus-storage/space_07_f5281b5b.jpg",
  s08: "/manus-storage/space_08_a5a4ec9a.jpg",
  s09: "/manus-storage/space_09_5033a731.jpg",
  s10: "/manus-storage/space_10_6b3828a0.jpg",
  s11: "/manus-storage/space_11_6d565702.jpg",
  s12: "/manus-storage/space_12_aa059814.jpg",
  s13: "/manus-storage/space_13_c4a1bd4c.jpg",
  s14: "/manus-storage/space_14_da3aeafd.jpg",
  s15: "/manus-storage/space_15_f09fa5ca.jpg",
  s16: "/manus-storage/space_16_3b6dafa8.jpg",
  s17: "/manus-storage/space_17_b8e11a25.jpg",
  s18: "/manus-storage/space_18_51388259.jpg",
  s19: "/manus-storage/space_19_deb72f1b.jpg",
  s20: "/manus-storage/space_20_f69602d6.webp",
};

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
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.93)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      <img
        src={src}
        alt=""
        style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", boxShadow: "0 0 80px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "2rem", right: "2.5rem",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(240,233,223,0.5)", fontSize: "1.25rem", lineHeight: 1,
          fontFamily: "sans-serif",
        }}
      >✕</button>
    </div>
  );
}

function Photo({
  src, alt = "", delay = 0, style = {}, onClick,
}: {
  src: string; alt?: string; delay?: number;
  style?: React.CSSProperties; onClick?: () => void;
}) {
  const ref = useFadeIn(delay);
  return (
    <div
      ref={ref}
      className="fade-up"
      style={{ overflow: "hidden", cursor: onClick ? "zoom-in" : "default", ...style }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.7s ease",
          display: "block",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
      />
    </div>
  );
}

export default function Space() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const open = (src: string) => setLightbox(src);
  const close = () => setLightbox(null);

  const heroRef = useFadeIn(0);
  const intro1 = useFadeIn(0);
  const sec1Label = useFadeIn(0);
  const sec2Label = useFadeIn(0);
  const quoteRef = useFadeIn(0);
  const sec3Label = useFadeIn(0);
  const sec4Label = useFadeIn(0);
  const ctaRef = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)" }}>
      {lightbox && <Lightbox src={lightbox} onClose={close} />}

      {/* Hero */}
      <section style={{ position: "relative", height: "92vh", overflow: "hidden" }}>
        <img
          src={PHOTOS.s19}
          alt="初衷小鹿空間"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(26,18,16,0.15) 0%, rgba(26,18,16,0.75) 100%)",
          display: "flex", flexDirection: "column", alignItems: "flex-start",
          justifyContent: "flex-end", padding: "0 6vw 8vh",
        }}>
          <div ref={heroRef} className="fade-up">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(197,151,109,0.75)", marginBottom: "1.5rem" }}>Space Experience</p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2.25rem, 5vw, 4.5rem)", color: "rgba(240,233,223,0.9)", letterSpacing: "0.1em", lineHeight: 1.35, marginBottom: "2rem" }}>
              空間<br />體驗
            </h1>
            <div style={{ width: "40px", height: "1px", backgroundColor: "rgba(197,151,109,0.65)" }} />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: "8rem 6vw 7rem" }}>
        <div ref={intro1} className="fade-up" style={{ maxWidth: "580px" }}>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "rgba(240,233,223,0.7)", lineHeight: 2.1, letterSpacing: "0.08em" }}>
            空間不只是背景。<br />
            它是這頓飯的第一句話。
          </p>
          <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.45)", margin: "2.5rem 0" }} />
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.38)", lineHeight: 2.1, letterSpacing: "0.05em" }}>
            黑磚、木質、暖銅燈具。<br />
            每一處細節，都是刻意留下的安靜。
          </p>
        </div>
      </section>

      {/* 01 外觀與入口 */}
      <section style={{ paddingBottom: "5rem" }}>
        <div ref={sec1Label} className="fade-up" style={{ padding: "0 6vw 2.5rem" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.63rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)" }}>01 — Exterior</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)", color: "rgba(240,233,223,0.6)", letterSpacing: "0.1em", marginTop: "0.6rem" }}>外觀與入口</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gridTemplateRows: "260px 260px", gap: "3px", padding: "0 6vw" }}>
          <Photo src={PHOTOS.s04} delay={0} style={{ gridRow: "1 / 3", height: "523px" }} onClick={() => open(PHOTOS.s04)} />
          <Photo src={PHOTOS.s03} delay={100} style={{ height: "260px" }} onClick={() => open(PHOTOS.s03)} />
          <Photo src={PHOTOS.s20} delay={200} style={{ height: "260px" }} onClick={() => open(PHOTOS.s20)} />
        </div>
      </section>

      {/* 02 用餐區 */}
      <section style={{ paddingBottom: "5rem" }}>
        <div ref={sec2Label} className="fade-up" style={{ padding: "0 6vw 2.5rem", textAlign: "right" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.63rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)" }}>02 — Dining Area</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)", color: "rgba(240,233,223,0.6)", letterSpacing: "0.1em", marginTop: "0.6rem" }}>用餐區</h2>
        </div>
        <Photo src={PHOTOS.s02} delay={0} style={{ height: "58vh", margin: "0 6vw" }} onClick={() => open(PHOTOS.s02)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3px", padding: "3px 6vw 0" }}>
          <Photo src={PHOTOS.s08} delay={80} style={{ height: "270px" }} onClick={() => open(PHOTOS.s08)} />
          <Photo src={PHOTOS.s10} delay={160} style={{ height: "270px" }} onClick={() => open(PHOTOS.s10)} />
          <Photo src={PHOTOS.s09} delay={240} style={{ height: "270px" }} onClick={() => open(PHOTOS.s09)} />
        </div>
      </section>

      {/* 品牌語句 */}
      <section style={{ padding: "7rem 6vw", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div ref={quoteRef} className="fade-up" style={{ maxWidth: "460px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", color: "rgba(197,151,109,0.8)", lineHeight: 1.9, letterSpacing: "0.03em" }}>
            "The right distance between tables<br />is a form of respect."
          </p>
          <div style={{ width: "24px", height: "1px", backgroundColor: "rgba(197,151,109,0.35)", margin: "2rem auto" }} />
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(240,233,223,0.3)", letterSpacing: "0.12em" }}>桌與桌之間的距離，是一種尊重。</p>
        </div>
      </section>

      {/* 03 燈光與氛圍 */}
      <section style={{ padding: "5rem 0" }}>
        <div ref={sec3Label} className="fade-up" style={{ padding: "0 6vw 2.5rem" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.63rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)" }}>03 — Atmosphere</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)", color: "rgba(240,233,223,0.6)", letterSpacing: "0.1em", marginTop: "0.6rem" }}>燈光與氛圍</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "3px", padding: "0 6vw" }}>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "3px" }}>
            <Photo src={PHOTOS.s07} delay={0} style={{ height: "255px" }} onClick={() => open(PHOTOS.s07)} />
            <Photo src={PHOTOS.s13} delay={120} style={{ height: "255px" }} onClick={() => open(PHOTOS.s13)} />
          </div>
          <Photo src={PHOTOS.s14} delay={80} style={{ height: "513px" }} onClick={() => open(PHOTOS.s14)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "3px", padding: "3px 6vw 0" }}>
          <Photo src={PHOTOS.s11} delay={0} style={{ height: "210px" }} onClick={() => open(PHOTOS.s11)} />
          <Photo src={PHOTOS.s12} delay={80} style={{ height: "210px" }} onClick={() => open(PHOTOS.s12)} />
          <Photo src={PHOTOS.s15} delay={160} style={{ height: "210px" }} onClick={() => open(PHOTOS.s15)} />
          <Photo src={PHOTOS.s01} delay={240} style={{ height: "210px" }} onClick={() => open(PHOTOS.s01)} />
        </div>
      </section>

      {/* 04 空間細節 */}
      <section style={{ padding: "2rem 0 5rem" }}>
        <div ref={sec4Label} className="fade-up" style={{ padding: "0 6vw 2.5rem", textAlign: "right" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.63rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)" }}>04 — Details</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)", color: "rgba(240,233,223,0.6)", letterSpacing: "0.1em", marginTop: "0.6rem" }}>空間細節</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr 2fr", gap: "3px", padding: "0 6vw" }}>
          <Photo src={PHOTOS.s16} delay={0} style={{ height: "480px" }} onClick={() => open(PHOTOS.s16)} />
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "3px" }}>
            <Photo src={PHOTOS.s17} delay={100} style={{ height: "238px" }} onClick={() => open(PHOTOS.s17)} />
            <Photo src={PHOTOS.s05} delay={200} style={{ height: "238px" }} onClick={() => open(PHOTOS.s05)} />
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "3px" }}>
            <Photo src={PHOTOS.s18} delay={150} style={{ height: "238px" }} onClick={() => open(PHOTOS.s18)} />
            <Photo src={PHOTOS.s06} delay={250} style={{ height: "238px" }} onClick={() => open(PHOTOS.s06)} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "8rem 6vw", textAlign: "center" }}>
        <div ref={ctaRef} className="fade-up">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)", marginBottom: "2rem" }}>Reserve Your Table</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", color: "rgba(240,233,223,0.75)", letterSpacing: "0.1em", marginBottom: "1rem" }}>
            在這個空間裡，好好吃一頓飯。
          </h2>
          <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.35)", margin: "2.5rem auto" }} />
          <a
            href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--deer-gold)",
              border: "1px solid rgba(197,151,109,0.45)",
              padding: "1rem 2.5rem",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(197,151,109,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(197,151,109,0.75)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(197,151,109,0.45)";
            }}
          >
            立即預約
          </a>
        </div>
      </section>
    </main>
  );
}
