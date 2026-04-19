/*
 * 初衷小鹿 — 菜單 Menu.tsx
 */
import { useEffect, useRef, useState } from "react";

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

const MENU_CATEGORIES = [
  {
    id: "beef", label: "牛肉套餐", en: "Beef",
    items: [
      { name: "精選牛肉套餐", desc: "美國 USDA Choice 牛肉，搭配天然蔬果上湯", price: "NT$920", tag: "" },
      { name: "頂級牛肉套餐", desc: "美國 SRF 雪花牛，熟成處理，細緻油花", price: "NT$1,380", tag: "推薦" },
      { name: "和牛套餐", desc: "A5 和牛，極致油花，不需要任何調味", price: "NT$1,980", tag: "限量" },
    ],
  },
  {
    id: "pork", label: "豬肉套餐", en: "Pork",
    items: [
      { name: "精選豬肉套餐", desc: "台灣在地豬，搭配柴魚昆布上湯", price: "NT$920", tag: "" },
      { name: "伊比利豬套餐", desc: "西班牙伊比利黑豬，橡果飼養，油脂細膩", price: "NT$1,380", tag: "推薦" },
    ],
  },
  {
    id: "seafood", label: "海鮮套餐", en: "Seafood",
    items: [
      { name: "精選海鮮套餐", desc: "時令海鮮，搭配清澈蔬果上湯", price: "NT$1,380", tag: "" },
      { name: "頂級海鮮套餐", desc: "龍蝦、干貝、鮮蝦，完整海味層次", price: "NT$2,580", tag: "推薦" },
      { name: "豪華海鮮套餐", desc: "波士頓龍蝦、帝王蟹腳、頂級干貝", price: "NT$3,460", tag: "限量" },
    ],
  },
  {
    id: "combo", label: "海陸套餐", en: "Land & Sea",
    items: [
      { name: "海陸雙享套餐", desc: "精選牛肉 + 時令海鮮，一場完整的餐桌", price: "NT$1,780", tag: "推薦" },
      { name: "頂級海陸套餐", desc: "和牛 + 龍蝦，為重要的時刻而設", price: "NT$2,580", tag: "限量" },
    ],
  },
];

const EXTRAS = [
  { name: "松露醬", desc: "義大利黑松露，少量即可提升整鍋層次", price: "NT$280" },
  { name: "鮭魚卵", desc: "北海道鮭魚卵，鹹鮮爆裂，搭配肉片", price: "NT$180" },
  { name: "手工漿料", desc: "每日現做，包含蝦漿、魚漿、豬肉漿", price: "NT$120" },
  { name: "時令蔬菜盤", desc: "每日嚴選當季蔬菜，清甜不搶味", price: "NT$80" },
];

function MenuItemCard({ name, desc, price, tag, delay }: { name: string; desc: string; price: string; tag: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } }, { threshold: 0.1 });
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up" style={{ padding: "2rem", border: "1px solid rgba(26,18,16,0.08)", backgroundColor: "var(--deer-bg)", position: "relative" }}>
      {tag && <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--deer-gold)", border: "1px solid rgba(197,151,109,0.4)", padding: "0.2rem 0.6rem" }}>{tag}</span>}
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1.0625rem", color: "var(--deer-text)", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>{name}</h3>
      <p style={{ fontSize: "0.8125rem", color: "var(--deer-sub)", lineHeight: 1.8, marginBottom: "1.5rem" }}>{desc}</p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.25rem", color: "var(--deer-accent)" }}>{price}</p>
    </div>
  );
}

function ExtraCard({ name, desc, price, delay }: { name: string; desc: string; price: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => { el.classList.add("visible"); observer.unobserve(el); }, delay); } }, { threshold: 0.1 });
    observer.observe(el); return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up">
      <div style={{ width: "20px", height: "1px", backgroundColor: "var(--deer-gold)", marginBottom: "1rem" }} />
      <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "1rem", color: "var(--deer-text)", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{name}</h3>
      <p style={{ fontSize: "0.8rem", color: "var(--deer-sub)", lineHeight: 1.8, marginBottom: "0.75rem" }}>{desc}</p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.125rem", color: "var(--deer-accent)" }}>{price}</p>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("beef");
  const heroRef = useFadeIn(0);
  const currentCategory = MENU_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <main style={{ paddingTop: "80px" }}>
      <section style={{ backgroundColor: "var(--deer-dark)", padding: "8rem 0 7rem" }}>
        <div className="container">
          <div ref={heroRef} className="fade-up" style={{ maxWidth: "560px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.7)", marginBottom: "1.5rem" }}>Menu</p>
            <h1 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--deer-dark-text)", letterSpacing: "0.08em", lineHeight: 1.5, marginBottom: "2rem" }}>菜單</h1>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.6)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: "rgba(240,233,223,0.55)", lineHeight: 2, letterSpacing: "0.05em" }}>
              每份套餐皆包含：前菜、天然上湯、主食材、配菜、<br />手工沾醬，以及甜點收尾。
            </p>
          </div>
        </div>
      </section>

      <section className="section-lg" style={{ backgroundColor: "var(--deer-bg)" }}>
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-16" style={{ borderBottom: "1px solid rgba(26,18,16,0.1)" }}>
            {MENU_CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", letterSpacing: "0.08em", padding: "0.75rem 1.5rem", border: "none", background: "transparent", cursor: "pointer", color: activeCategory === cat.id ? "var(--deer-accent)" : "var(--deer-sub)", borderBottom: activeCategory === cat.id ? "1px solid var(--deer-gold)" : "1px solid transparent", transition: "all 0.2s ease", marginBottom: "-1px" }}>
                {cat.label}
              </button>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "2.5rem" }}>{currentCategory.en}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCategory.items.map((item, i) => <MenuItemCard key={i} {...item} delay={i * 80} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--deer-bg-dark)" }}>
        <div className="container">
          <div className="text-center mb-14">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Add-ons</p>
            <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--deer-text)", letterSpacing: "0.1em" }}>加點</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {EXTRAS.map((item, i) => <ExtraCard key={i} {...item} delay={i * 80} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--deer-dark)" }}>
        <div className="container-narrow text-center">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,151,109,0.6)", marginBottom: "2rem" }}>Please Note</p>
          <div style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(240,233,223,0.45)", lineHeight: 2.2, letterSpacing: "0.05em" }}>
            <p>晚餐時段每位最低消費 NT$600，另加一成服務費。</p>
            <p>菜單內容依季節與食材供應調整，以當日為準。</p>
            <p>如有食物過敏或特殊飲食需求，請於訂位時告知。</p>
          </div>
          <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(197,151,109,0.4)", margin: "2.5rem auto" }} />
          <a href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf" target="_blank" rel="noopener noreferrer" className="btn-deer-light" style={{ fontSize: "0.8rem" }}>預約一場餐桌</a>
        </div>
      </section>
    </main>
  );
}
