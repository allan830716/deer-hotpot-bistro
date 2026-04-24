/*
 * 初衷小鹿 — 空間體驗 Space.tsx
 * 設計語言：深棕黑底、暖銅金點綴、大量留白、非對稱排版
 * 響應式：手機單欄 / 平板雙欄 / 桌機非對稱格局
 */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MapView } from "@/components/Map";

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

const css = `
  .sp-fade { opacity: 0; transform: translateY(22px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .sp-fade.sp-in { opacity: 1; transform: translateY(0); }

  .sp-photo img { transition: transform 0.7s ease; }
  .sp-photo:hover img { transform: scale(1.04); }

  /* ── Hero ── */
  .sp-hero { position: relative; height: 56vw; min-height: 260px; max-height: 88vh; overflow: hidden; }
  @media (max-width: 640px) {
    .sp-hero { height: 65vw; min-height: 220px; max-height: 320px; }
  }

  /* ── 01 外觀：桌機非對稱 / 手機單欄 ── */
  .sp-grid-exterior {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3px;
    padding: 0 6vw;
  }
  .sp-grid-exterior .sp-photo { height: 420px; }
  @media (max-width: 640px) {
    .sp-grid-exterior { grid-template-columns: 1fr; }
    .sp-grid-exterior .sp-photo { height: 56vw; }
  }

  /* ── 02 用餐：主圖 + 雙欄 ── */
  .sp-dining-main { height: 52vh; margin: 0 6vw; }
  .sp-grid-dining {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px;
    padding: 3px 6vw 0;
  }
  .sp-grid-dining .sp-photo { height: 280px; }
  @media (max-width: 640px) {
    .sp-dining-main { height: 60vw; margin: 0 4vw; }
    .sp-grid-dining { grid-template-columns: 1fr; padding: 3px 4vw 0; }
    .sp-grid-dining .sp-photo { height: 56vw; }
  }

  /* ── 03 細節：兩排非對稱 ── */
  .sp-grid-detail-a {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 3px;
    padding: 0 6vw;
  }
  .sp-grid-detail-a .sp-photo { height: 360px; }
  .sp-grid-detail-b {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3px;
    padding: 3px 6vw 0;
  }
  .sp-grid-detail-b .sp-photo { height: 340px; }
  @media (max-width: 640px) {
    .sp-grid-detail-a { grid-template-columns: 1fr; padding: 0 4vw; }
    .sp-grid-detail-a .sp-photo { height: 56vw; }
    .sp-grid-detail-b { grid-template-columns: 1fr 1fr; padding: 3px 4vw 0; }
    .sp-grid-detail-b .sp-photo { height: 44vw; }
  }

  /* ── Intro padding ── */
  .sp-intro { padding: 5rem 6vw 4rem; }
  @media (max-width: 640px) { .sp-intro { padding: 3rem 6vw 2.5rem; } }

  /* ── Section padding ── */
  .sp-sec { padding-bottom: 4rem; }
  @media (max-width: 640px) { .sp-sec { padding-bottom: 2.5rem; } }

  /* ── Quote ── */
  .sp-quote { padding: 5rem 6vw; border-top: 1px solid rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.04); }
  @media (max-width: 640px) { .sp-quote { padding: 3rem 6vw; } }

  /* ── CTA ── */
  .sp-cta { padding: 5rem 6vw 6rem; text-align: center; }
  @media (max-width: 640px) { .sp-cta { padding: 3.5rem 6vw 4rem; } }
`;

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.classList.add("sp-in"); observer.unobserve(el); }, delay);
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

  const overlay = (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        backgroundColor: "rgba(0,0,0,0.95)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "zoom-out",
        pointerEvents: "all",
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          maxWidth: "92vw", maxHeight: "88vh",
          objectFit: "contain",
          boxShadow: "0 0 60px rgba(0,0,0,0.5)",
          display: "block",
        }}
        onClick={(e) => e.stopPropagation()}
        onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
      />
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "1.5rem", right: "2rem",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(240,233,223,0.7)", fontSize: "2rem", lineHeight: 1,
          zIndex: 100000,
        }}
      >✕</button>
    </div>
  );

  return createPortal(overlay, document.body);
}

function Photo({
  src, alt = "", delay = 0, className = "", onClick,
}: {
  src: string; alt?: string; delay?: number;
  className?: string; onClick?: () => void;
}) {
  const ref = useFadeIn(delay);
  return (
    <div
      ref={ref}
      className={`sp-fade sp-photo ${className}`}
      style={{ overflow: "hidden", cursor: onClick ? "zoom-in" : "default" }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

const T = {
  label: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 400 as const,
    fontSize: "0.63rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "rgba(197,151,109,0.55)",
  },
  secTitle: {
    fontFamily: "'Noto Serif TC', serif",
    fontWeight: 200 as const,
    fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)",
    color: "rgba(240,233,223,0.6)",
    letterSpacing: "0.1em",
    marginTop: "0.5rem",
  },
};

export default function Space() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const open = (src: string) => setLightbox(src);
  const close = () => setLightbox(null);

  const heroRef   = useFadeIn(0);
  const introRef  = useFadeIn(0);
  const sec1Ref   = useFadeIn(0);
  const sec2Ref   = useFadeIn(0);
  const quoteRef  = useFadeIn(0);
  const sec3Ref   = useFadeIn(0);
  const ctaRef    = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px", backgroundColor: "var(--deer-dark)" }}>
      <style>{css}</style>
      {lightbox && <Lightbox src={lightbox} onClose={close} />}

      {/* Hero */}
      <section className="sp-hero">
        <img
          src={PHOTOS.A}
          alt="初衷小鹿品牌招牌"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(26,18,16,0.1) 0%, rgba(26,18,16,0.72) 100%)",
          display: "flex", flexDirection: "column", alignItems: "flex-start",
          justifyContent: "flex-end", padding: "0 6vw 6vh",
        }}>
          <div ref={heroRef} className="sp-fade">
            <p style={{ ...T.label, color: "rgba(197,151,109,0.75)", marginBottom: "1rem" }}>Space Experience</p>
            <h1 style={{
              fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
              fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
              color: "rgba(240,233,223,0.9)", letterSpacing: "0.1em",
              lineHeight: 1.35, marginBottom: "1.5rem",
            }}>
              空間<br />體驗
            </h1>
            <div style={{ width: "36px", height: "1px", backgroundColor: "rgba(197,151,109,0.65)" }} />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="sp-intro">
        <div ref={introRef} className="sp-fade" style={{ maxWidth: "520px" }}>
          <p style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
            fontSize: "clamp(1rem, 2vw, 1.35rem)",
            color: "rgba(240,233,223,0.7)", lineHeight: 2.1, letterSpacing: "0.08em",
          }}>
            空間不只是背景。<br />
            它是這頓飯的第一句話。
          </p>
          <div style={{ width: "28px", height: "1px", backgroundColor: "rgba(197,151,109,0.45)", margin: "2rem 0" }} />
          <p style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
            fontSize: "0.9rem", color: "rgba(240,233,223,0.38)",
            lineHeight: 2.1, letterSpacing: "0.05em",
          }}>
            黑磚、木質、暖銅燈具。<br />
            每一處細節，都是為了讓你專注於眼前的人。
          </p>
        </div>
      </section>

      {/* 01 外觀與入口 */}
      <section className="sp-sec">
        <div ref={sec1Ref} className="sp-fade" style={{ padding: "0 6vw 2rem" }}>
          <p style={T.label}>01 — Exterior</p>
          <h2 style={T.secTitle}>外觀與入口</h2>
        </div>
        <div className="sp-grid-exterior">
          <Photo src={PHOTOS.B} delay={0} onClick={() => open(PHOTOS.B)} />
          <Photo src={PHOTOS.C} delay={100} onClick={() => open(PHOTOS.C)} />
        </div>
      </section>

      {/* 02 用餐空間 */}
      <section className="sp-sec">
        <div ref={sec2Ref} className="sp-fade" style={{ padding: "0 6vw 2rem", textAlign: "right" }}>
          <p style={T.label}>02 — Dining Area</p>
          <h2 style={T.secTitle}>用餐空間</h2>
        </div>
        <Photo src={PHOTOS.D} delay={0} className="sp-dining-main" onClick={() => open(PHOTOS.D)} />
        <div className="sp-grid-dining">
          <Photo src={PHOTOS.E} delay={80} onClick={() => open(PHOTOS.E)} />
          <Photo src={PHOTOS.F} delay={160} onClick={() => open(PHOTOS.F)} />
        </div>
      </section>

      {/* 品牌語句 */}
      <section className="sp-quote">
        <div ref={quoteRef} className="sp-fade" style={{ maxWidth: "420px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontWeight: 300, fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
            color: "rgba(197,151,109,0.8)", lineHeight: 1.9, letterSpacing: "0.03em",
          }}>
            "The right distance between tables<br />is a form of respect."
          </p>
          <div style={{ width: "22px", height: "1px", backgroundColor: "rgba(197,151,109,0.35)", margin: "1.75rem auto" }} />
          <p style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
            fontSize: "0.8rem", color: "rgba(240,233,223,0.3)", letterSpacing: "0.12em",
          }}>桌與桌之間的距離，是一種尊重。</p>
        </div>
      </section>

      {/* 03 細節與吧台 */}
      <section style={{ padding: "4rem 0 3rem" }}>
        <div ref={sec3Ref} className="sp-fade" style={{ padding: "0 6vw 2rem" }}>
          <p style={T.label}>03 — Details & Bar</p>
          <h2 style={T.secTitle}>細節與吧台</h2>
        </div>
        <div className="sp-grid-detail-a">
          <Photo src={PHOTOS.G} delay={0} onClick={() => open(PHOTOS.G)} />
          <Photo src={PHOTOS.H} delay={100} onClick={() => open(PHOTOS.H)} />
        </div>
        <div className="sp-grid-detail-b">
          <Photo src={PHOTOS.I} delay={80} onClick={() => open(PHOTOS.I)} />
          <Photo src={PHOTOS.J} delay={180} onClick={() => open(PHOTOS.J)} />
        </div>
      </section>

      {/* 04 位置與導航 */}
      <section style={{ padding: "5rem 6vw 0", backgroundColor: "var(--deer-dark)" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ ...T.label, marginBottom: "0.75rem" }}>04 — Location</p>
          <h2 style={{ ...T.secTitle, marginBottom: "0.5rem" }}>位置與導航</h2>
          <p style={{ fontSize: "0.8rem", color: "rgba(240,233,223,0.35)", letterSpacing: "0.06em", lineHeight: 1.8 }}>
            台北市信義區忠孝東路四段 553 巷 6 弄 15 號
          </p>
        </div>
        <div style={{ height: "420px", borderRadius: "2px", overflow: "hidden", border: "1px solid rgba(197,151,109,0.12)" }}>
          <MapView
            initialCenter={{ lat: 25.0423803, lng: 121.5634603 }}
            initialZoom={17}
            onMapReady={(map) => {
              // 套用暗色主題
              map.setOptions({
                styles: [
                  { elementType: "geometry", stylers: [{ color: "#1a1210" }] },
                  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1210" }] },
                  { elementType: "labels.text.fill", stylers: [{ color: "#c5976d" }] },
                  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d2420" }] },
                  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1a1210" }] },
                  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
                  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c2e28" }] },
                  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f1a2a" }] },
                  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
                  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
                  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
                ],
              });
              // 加入金色標記
              const markerEl = document.createElement("div");
              markerEl.style.cssText = `
                width: 36px; height: 36px;
                background: rgba(197,151,109,0.9);
                border: 2px solid rgba(240,233,223,0.8);
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 2px 12px rgba(197,151,109,0.4);
              `;
              new google.maps.marker.AdvancedMarkerElement({
                map,
                position: { lat: 25.0423803, lng: 121.5634603 },
                content: markerEl,
                title: "初衷小鹿 Deer's Hotpot Bistro",
              });
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=25.0423803,121.5634603&destination_place_id=ChIJUe3i_A6rQjQRLQzk4lRMncI"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.75rem 1.75rem",
              backgroundColor: "rgba(197,151,109,0.15)",
              border: "1px solid rgba(197,151,109,0.45)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.7rem", letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(197,151,109,0.9)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.15)"; }}
          >
            ↗ 立即導航
          </a>
          <a
            href="https://www.google.com/maps/place/初衷小鹿+Deer's+Hotpot+Bistro/@25.0423803,121.5634603,17z"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.75rem 1.75rem",
              border: "1px solid rgba(197,151,109,0.2)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.7rem", letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(197,151,109,0.55)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.45)"; (e.currentTarget as HTMLElement).style.color = "rgba(197,151,109,0.85)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(197,151,109,0.55)"; }}
          >
            在 Google Maps 查看
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta">
        <div ref={ctaRef} className="sp-fade">
          <p style={{ ...T.label, color: "rgba(197,151,109,0.4)", marginBottom: "2.5rem" }}>2019 &mdash; Taipei Xinyi</p>
          <blockquote style={{
            fontFamily: "'Noto Serif TC', serif", fontWeight: 200,
            fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
            color: "rgba(240,233,223,0.75)", letterSpacing: "0.1em",
            lineHeight: 1.9, margin: "0 0 2rem",
            borderLeft: "none", padding: 0,
          }}>
            有些氛圍，
            <br />
            是照片說不清楚的。
          </blockquote>
          <div style={{ width: "22px", height: "1px", backgroundColor: "rgba(197,151,109,0.3)", margin: "0 auto 2.5rem" }} />
          <a
            href="/reservation"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              border: "1px solid rgba(197,151,109,0.35)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(197,151,109,0.6)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.65)";
              (e.currentTarget as HTMLElement).style.color = "rgba(197,151,109,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.35)";
              (e.currentTarget as HTMLElement).style.color = "rgba(197,151,109,0.6)";
            }}
          >
            Reserve a Table
          </a>
        </div>
      </section>
    </main>
  );
}
