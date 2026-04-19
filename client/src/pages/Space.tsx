/*
 * 初衷小鹿 — 空間體驗 Space.tsx
 * 設計語言：深棕黑底、暖銅金點綴、大量留白、非對稱排版
 * 照片策略：10 張精選，無重複，按空間敘事順序排列
 * A=招牌 B=店外全景 C=店外側 D=用餐主 E=用餐補 F=燈光氛圍 G=桌面 H=靠窗 I=吧台 J=品牌鐵牌
 */
import { useEffect, useRef, useState } from "react";

const PHOTOS = {
  A: "/manus-storage/space_A_signage_9eef2174.jpg",
  B: "/manus-storage/space_B_exterior_a879d9bc.jpg",
  C: "/manus-storage/space_C_exterior2_5d3bb86f.jpg",
  D: "/manus-storage/space_D_dining_main_59a93d64.jpg",
  E: "/manus-storage/space_E_dining2_48d67a98.jpg",
  F: "/manus-storage/space_F_ambience_d74b61dd.jpg",
  G: "/manus-storage/space_G_table_782db411.jpg",
  H: "/manus-storage/space_H_window_34f0207f.jpg",
  I: "/manus-storage/space_I_bar_0b30e5e6.jpg",
  J: "/manus-storage/space_J_brand_a327435b.jpg",
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
          color: "rgba(240,233,223,0.5)", fontSize: "1.5rem", lineHeight: 1,
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
  const introRef = useFadeIn(0);
  const sec1Label = useFadeIn(0);
  const sec2Label = useFadeIn(0);
  const quoteRef = useFadeIn(0);
  const sec3Label = useFadeIn(0);
  const ctaRef = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)" }}>
      {lightbox && <Lightbox src={lightbox} onClose={close} />}

      {/* Hero — 品牌招牌 */}
      <section style={{ position: "relative", height: "88vh", overflow: "hidden" }}>
        <img
          src={PHOTOS.A}
          alt="初衷小鹿品牌招牌"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(26,18,16,0.1) 0%, rgba(26,18,16,0.72) 100%)",
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
        <div ref={introRef} className="fade-up" style={{ maxWidth: "560px" }}>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.1rem, 2vw, 1.45rem)", color: "rgba(240,233,223,0.7)", lineHeight: 2.1, letterSpacing: "0.08em" }}>
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
        {/* 大圖 B + 小圖 C 非對稱 */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "3px", padding: "0 6vw" }}>
          <Photo src={PHOTOS.B} delay={0} style={{ height: "480px" }} onClick={() => open(PHOTOS.B)} />
          <Photo src={PHOTOS.C} delay={120} style={{ height: "480px" }} onClick={() => open(PHOTOS.C)} />
        </div>
      </section>

      {/* 02 用餐空間 */}
      <section style={{ paddingBottom: "5rem" }}>
        <div ref={sec2Label} className="fade-up" style={{ padding: "0 6vw 2.5rem", textAlign: "right" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.63rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)" }}>02 — Dining Area</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)", color: "rgba(240,233,223,0.6)", letterSpacing: "0.1em", marginTop: "0.6rem" }}>用餐空間</h2>
        </div>
        {/* 全幅主圖 D */}
        <Photo src={PHOTOS.D} delay={0} style={{ height: "58vh", margin: "0 6vw" }} onClick={() => open(PHOTOS.D)} />
        {/* 補充圖 E + F */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", padding: "3px 6vw 0" }}>
          <Photo src={PHOTOS.E} delay={80} style={{ height: "320px" }} onClick={() => open(PHOTOS.E)} />
          <Photo src={PHOTOS.F} delay={160} style={{ height: "320px" }} onClick={() => open(PHOTOS.F)} />
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

      {/* 03 細節與吧台 */}
      <section style={{ padding: "5rem 0" }}>
        <div ref={sec3Label} className="fade-up" style={{ padding: "0 6vw 2.5rem" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.63rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,151,109,0.55)" }}>03 — Details & Bar</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)", color: "rgba(240,233,223,0.6)", letterSpacing: "0.1em", marginTop: "0.6rem" }}>細節與吧台</h2>
        </div>
        {/* G 桌面 + H 靠窗 — 非對稱 */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "3px", padding: "0 6vw" }}>
          <Photo src={PHOTOS.G} delay={0} style={{ height: "400px" }} onClick={() => open(PHOTOS.G)} />
          <Photo src={PHOTOS.H} delay={100} style={{ height: "400px" }} onClick={() => open(PHOTOS.H)} />
        </div>
        {/* I 吧台全景 + J 品牌鐵牌 */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "3px", padding: "3px 6vw 0" }}>
          <Photo src={PHOTOS.I} delay={80} style={{ height: "380px" }} onClick={() => open(PHOTOS.I)} />
          <Photo src={PHOTOS.J} delay={180} style={{ height: "380px" }} onClick={() => open(PHOTOS.J)} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "8rem 6vw", textAlign: "center" }}>
        <div ref={ctaRef} className="fade-up">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(197,151,109,0.6)", marginBottom: "2rem" }}>Reservation</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "rgba(240,233,223,0.85)", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
            親自來感受
          </h2>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.38)", lineHeight: 2.1, letterSpacing: "0.05em", maxWidth: "380px", margin: "0 auto 3rem" }}>
            照片只能傳遞一部分。<br />
            那個燈光的溫度，那個空間的安靜，<br />
            需要你親自來。
          </p>
          <a
            href="/reservation"
            style={{
              display: "inline-block",
              padding: "1rem 3rem",
              border: "1px solid rgba(197,151,109,0.6)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(197,151,109,0.85)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(197,151,109,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(197,151,109,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(197,151,109,0.6)";
            }}
          >
            立即訂位
          </a>
        </div>
      </section>
    </main>
  );
}
