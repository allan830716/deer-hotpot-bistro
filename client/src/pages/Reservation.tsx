/*
 * 初衷小鹿 — 訂位資訊 Reservation.tsx
 * 嵌入 inline 訂位系統，加入訂位公告與注意事項
 */
import { useEffect, useRef } from "react";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } },
      { threshold: 0.1 }
    );
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return ref;
}

const NOTICES = [
  {
    en: "Minimum Spend",
    zh: "最低消費",
    content: "晚餐時段每位 NT$600（以單人獨立計算）\n商業午餐每位 NT$300\n以上價格均加收一成服務費",
  },
  {
    en: "Hours",
    zh: "營業時間",
    content: "星期日　11:30–15:00　17:30–22:30\n星期一　12:00–15:00　18:00–22:00\n星期二　12:00–15:00　18:00–22:00\n星期三　12:00–15:00　18:00–22:00\n星期四　12:00–15:00　18:00–22:00\n星期五　12:00–15:00　17:30–22:30\n星期六　11:30–15:00　17:30–22:30",
  },
  {
    en: "Location",
    zh: "地址",
    content: "台北市信義區\n忠孝東路四段 553 巷 6 弄 15 號",
  },
  {
    en: "Beverage Policy",
    zh: "飲品規定",
    content: "本餐廳僅提供 NATURA 微礦水或微礦氣泡水\n禁止飲用烈酒\n自備酒水酌收開瓶費葡萄酒每瓶 NT$500",
  },
];

function InfoItem({ en, zh, content, delay }: { en: string; zh: string; content: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } },
      { threshold: 0.1 }
    );
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up" style={{ borderTop: "1px solid rgba(107,74,50,0.2)", paddingTop: "1.5rem" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "0.5rem" }}>{en}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{zh}</h3>
      <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "var(--deer-sub)", lineHeight: 2, whiteSpace: "pre-line" as const }}>{content}</p>
    </div>
  );
}

export default function Reservation() {
  const heroRef = useFadeIn(0);
  const noticeRef = useFadeIn(0);
  const celebRef = useFadeIn(0);

  return (
    <main style={{ paddingTop: "80px" }}>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "8rem 0 7rem" }}>
        <div className="container">
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "1.5rem" }}>Reservation</p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--deer-dark-text)", letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "2rem" }}>預約一場餐桌</h1>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.6)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(240,233,223,0.6)", lineHeight: 2, letterSpacing: "0.05em" }}>
              把時間，留給重要的人。
            </p>
          </div>
        </div>
      </section>

      {/* ── inline 訂位系統嵌入 ── */}
      <section style={{ backgroundColor: "var(--deer-bg)", padding: "5rem 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "2rem" }}>
            Online Booking
          </p>
          {/* 響應式 iframe 容器：手機 100vh，桌機自動擴展 */}
          <div style={{
            width: "100%",
            border: "1px solid rgba(107,74,50,0.15)",
            overflow: "hidden",
            backgroundColor: "#fff",
            borderRadius: "2px",
            /* 手機上使用 100dvh 確保可捲動瀏覽整頁 */
          }} className="inline-booking-container">
            <iframe
              src="https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw"
              width="100%"
              height="100%"
              style={{ border: "none", display: "block", minHeight: "100%" }}
              title="初衷小鹿線上訂位"
              allow="payment"
              loading="lazy"
            />
          </div>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "var(--deer-muted)", marginTop: "1rem", lineHeight: 1.8 }}>
            如遇訂位系統問題，亦可透過 Instagram 或 Facebook 私訊聯絡我們。
          </p>
        </div>
      </section>

      {/* ── 訂位注意事項 ── */}
      <section className="section-lg" style={{ backgroundColor: "var(--deer-bg-dark)" }}>
        <div className="container">
          <div ref={noticeRef} className="fade-up mb-12">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "1rem" }}>
              Booking Notice
            </p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-text)", letterSpacing: "0.1em" }}>
              訂位公告
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {NOTICES.map((item, i) => (
              <InfoItem key={i} {...item} delay={i * 80} />
            ))}
          </div>

          {/* 額外注意事項 — 修正文字可見度 */}
          <div style={{ marginTop: "3rem", padding: "2rem", border: "1px solid rgba(107,74,50,0.25)", backgroundColor: "var(--deer-bg)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "1.25rem" }}>
              Important Notes
            </p>
            <div style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "var(--deer-sub)", lineHeight: 2.2, letterSpacing: "0.04em" }}>
              <p style={{ marginBottom: "0.25rem" }}>· 建議提前 3–7 天預約，以確保您偏好的時段與席位。</p>
              <p style={{ marginBottom: "0.25rem" }}>· 如有特殊需求（包廂、慶祝佈置、飲食限制），請於備注欄說明。</p>
              <p style={{ marginBottom: "0.25rem" }}>· 部分餐點可能會因供貨短缺及品質等因素而無法正常供應。</p>
              <p style={{ marginBottom: "0.25rem" }}>· 每份套餐均含一份前菜、綜合菜盤、副餐及甜點。</p>
              <p>· 商業午餐僅平日供應，假日及例假日不供應。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 慶祝蛋糕服務 ── */}
      <section className="section" style={{ backgroundColor: "var(--deer-bg)" }}>
        <div className="container">
          <div ref={celebRef} className="fade-up mb-14">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "1rem" }}>Celebration Service</p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-text)", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              全新服務｜小鹿為您準備慶祝蛋糕
            </h2>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--deer-gold)", marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9rem", color: "var(--deer-sub)", lineHeight: 2, maxWidth: "560px" }}>
              與 CRÈM 鮮奶油專門店合作，您只需在 CRÈM 官網下單，備註訂位大名、日期與時間，
              我們的人員將自動為您安排製作、配送與蠟燭擺盤上桌，讓甜點成為這個時刻最完整的收尾。
            </p>
          </div>

          {/* 服務流程 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
            {[
              {
                step: "01",
                title: "CRÈM 官網下單",
                desc: "前往 CRÈM 預定蛋糕網頁，選擇 4、6、8 吋蛋糕，線上預訂快速方便。",
              },
              {
                step: "02",
                title: "備註訂位資訊",
                desc: "下單時備註訂位大名、日期、時間，省去與餐廳溝通的時間，我們將自動為您安排。",
              },
              {
                step: "03",
                title: "小鹿全程代勞",
                desc: "配送到餐廳、低溫冷藏保存、蠟燭擺盤上桌，讓您專心享受與壽星的用餐時刻。",
              },
            ].map(({ step, title, desc }, i) => (
              <CelebStep key={i} step={step} title={title} desc={desc} delay={i * 100} />
            ))}
          </div>

          {/* 服務亮點 */}
          <div style={{ padding: "2rem", border: "1px solid rgba(107,74,50,0.2)", backgroundColor: "var(--deer-bg-dark)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--deer-gold)", marginBottom: "1.25rem" }}>
              Service Highlights
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[
                { icon: "→", text: "預定 4、6、8 吋蛋糕（線上預訂，快速方便）" },
                { icon: "→", text: "配送餐廳（省去取貨、送貨交通時間）" },
                { icon: "→", text: "低溫冷藏（省去冷藏保存焦慮）" },
                { icon: "→", text: "溝通訂位資訊、安排上桌（省去與餐廳溝通時間）" },
                { icon: "→", text: "初衷小鹿蠟燭擺盤上桌（省去心意儀式感編排）" },
                { icon: "→", text: "專心享受與壽星的用餐時刻" },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--deer-gold)", fontSize: "0.9rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
                  <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "var(--deer-sub)", lineHeight: 1.9 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* CRÈM 官網按鈕 */}
            <div style={{ marginTop: "2.5rem" }}>
              <a
                href="https://www.crem.tw"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: "var(--deer-gold)",
                  border: "1px solid rgba(197,151,109,0.45)",
                  padding: "0.75rem 2rem",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "rgba(197,151,109,0.1)";
                  el.style.borderColor = "rgba(197,151,109,0.8)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "transparent";
                  el.style.borderColor = "rgba(197,151,109,0.45)";
                }}
              >
                <span>前往 CRÈM 預訂蛋糕</span>
                <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 適合的時刻 ── */}
      <section className="section-lg" style={{ backgroundColor: "var(--deer-dark)" }}>
        <div className="container-narrow text-center">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.6)", marginBottom: "2rem" }}>Suitable For</p>
          <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-dark-text)", letterSpacing: "0.1em", marginBottom: "3rem" }}>適合的時刻</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["約會", "週年紀念", "生日餐敘", "重要聚會"].map((label, i) => (
              <div key={i} style={{ padding: "1.5rem 1rem", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" as const }}>
                <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.7)", letterSpacing: "0.08em" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CelebStep({ step, title, desc, delay }: { step: string; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } },
      { threshold: 0.1 }
    );
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up">
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.5rem", color: "rgba(197,151,109,0.3)", lineHeight: 1, marginBottom: "1rem" }}>{step}</p>
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{title}</h3>
      <div style={{ width: "16px", height: "1px", backgroundColor: "var(--deer-gold)", marginBottom: "0.75rem" }} />
      <p style={{ fontSize: "0.8125rem", color: "var(--deer-sub)", lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}
