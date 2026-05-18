/*
 * 初衷小鹿 — App.tsx
 * 全站路由與導覽列、頁尾
 * /space-embed 路由不含導覽列與頁尾，供 EasyStore iframe 嵌入使用
 */
import { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Brand from "./pages/Brand";
import Menu from "./pages/Menu";
import Space from "./pages/Space";
import Reservation from "./pages/Reservation";
import Experience from "./pages/Experience";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ShopSuccess from "./pages/ShopSuccess";
import ShopProduct from "./pages/ShopProduct";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminMembers from "./pages/AdminMembers";
import Awards from "./pages/Awards";
import Crem from "./pages/Crem";
import Transport from "./pages/Transport";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import { useCart } from "./contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "首頁" },
  { href: "/brand", label: "品牌故事" },
  { href: "/menu", label: "菜單" },
  { href: "/space", label: "空間體驗" },
  { href: "/awards", label: "獲獎殊榮/雜誌專訪" },
  { href: "/transport", label: "交通與停車" },
];

const RESERVATION_URL = "https://inline.app/booking/-LnGxVQiLowRUUBg2dlS:inline-live-1/-LnGxVUeNglvFM_8Rz2a?language=zh-tw";

function NavCartBtn() {
  const { itemCount } = useCart();
  const [, navigate] = useLocation();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {/* 商店文字連結 — 暫時隱藏，待上線時移除 display:none */}
      <button
        onClick={() => navigate("/shop")}
        className="nav-shop-link"
        style={{ background: "transparent", border: "1px solid rgba(197,151,109,0.35)", color: "var(--deer-gold)", cursor: "pointer", display: "none", alignItems: "center", gap: "0.375rem", padding: "0.375rem 0.875rem", fontSize: "0.75rem", letterSpacing: "0.08em", fontFamily: "'Noto Serif TC', serif" }}
      >
        生鮮商店
      </button>
      {/* 購物車圖示 — 暫時隱藏，待上線時移除 */}
      {false && itemCount > 0 && (
        <button
          onClick={() => navigate("/cart")}
          style={{ position: "relative", background: "transparent", border: "none", color: "var(--deer-gold)", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.375rem" }}
          aria-label="購物車"
        >
          <ShoppingCart size={16} />
          <span style={{ position: "absolute", top: "-2px", right: "-4px", background: "var(--deer-gold)", color: "var(--deer-dark)", fontSize: "0.6rem", fontWeight: 700, width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {itemCount}
          </span>
        </button>
      )}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 路由切換時關閉選單
  useEffect(() => { setMenuOpen(false); }, [location]);

  // 選單開啟時鎖定 body 捲動
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* 桌機版 header — md 以上顯示 */}
      <header
        className="hidden md:flex"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          height: "64px",
          alignItems: "center",
          backgroundColor: scrolled ? "rgba(26,18,16,0.97)" : "rgba(26,18,16,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid rgba(197,151,109,0.15)" : "1px solid transparent",
          transition: "all 0.3s ease",
          padding: "0 1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
          {/* Logo */}
          <Link href="/">
            <img
              src="/manus-storage/deer-logo_88482511.webp"
              alt="初衷小鹿"
              style={{ height: "80px", width: "auto", cursor: "pointer", display: "block", filter: "brightness(1.05)" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  style={{
                    fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem",
                    letterSpacing: "0.1em",
                    color: location === link.href ? "var(--deer-gold)" : "rgba(240,233,223,0.55)",
                    cursor: "pointer", transition: "color 0.2s ease",
                    borderBottom: location === link.href ? "1px solid rgba(197,151,109,0.6)" : "1px solid transparent",
                    paddingBottom: "2px",
                  }}
                  onMouseEnter={(e) => { if (location !== link.href) (e.target as HTMLElement).style.color = "rgba(240,233,223,0.85)"; }}
                  onMouseLeave={(e) => { if (location !== link.href) (e.target as HTMLElement).style.color = "rgba(240,233,223,0.55)"; }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <NavCartBtn />
            <Link href="/crem">
              <span
                style={{
                  fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem",
                  letterSpacing: "0.1em",
                  color: location === "/crem" ? "var(--deer-gold)" : "rgba(240,233,223,0.75)",
                  cursor: "pointer", transition: "all 0.2s ease",
                  border: location === "/crem" ? "1px solid rgba(197,151,109,0.6)" : "1px solid rgba(255,255,255,0.3)",
                  padding: "0.4rem 0.9rem",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "rgba(240,233,223,1)";
                  (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  if (location !== "/crem") {
                    (e.target as HTMLElement).style.color = "rgba(240,233,223,0.75)";
                    (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                  }
                }}
              >
                CRÈM 蛋糕上桌預訂
              </span>
            </Link>
            <a
              href={RESERVATION_URL}
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.7rem",
                letterSpacing: "0.18em", textTransform: "uppercase" as const,
                color: "var(--deer-gold)", border: "1px solid rgba(197,151,109,0.5)",
                padding: "0.5rem 1.25rem", transition: "all 0.2s ease", textDecoration: "none",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              立即訂位
            </a>
          </nav>

        </div>
      </header>

      {/* 手機版頂部黑色半透明橫幅 */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          height: "64px",
          zIndex: 205,
          backgroundColor: "rgba(10,8,7,0.72)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* 手機版 Logo — 左上角，固定定位 */}
      <Link href="/">
        <img
          src="/manus-storage/deer-logo_88482511.webp"
          alt="初衷小鹿"
          className="md:hidden"
          style={{
            position: "fixed", top: "6px", left: "1rem",
            zIndex: 210, height: "52px", width: "auto",
            filter: "brightness(1.05)", cursor: "pointer",
          }}
        />
      </Link>

      {/* 手機版漢堡按鈕 — 独立固定定位，只在手機顯示 */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: "fixed", top: "1rem", right: "1.25rem",
          zIndex: 210, background: "none", border: "none",
          cursor: "pointer", padding: "0.5rem",
        }}
        aria-label={menuOpen ? "關閉選單" : "開啟選單"}
        aria-expanded={menuOpen}
      >
        <div style={{ width: "22px", height: "16px", position: "relative" }}>
          <span style={{
            position: "absolute", left: 0,
            top: menuOpen ? "7px" : "0px",
            display: "block", width: "22px", height: "1px",
            backgroundColor: "rgba(240,233,223,0.85)",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), top 0.35s cubic-bezier(0.4,0,0.2,1)",
            transform: menuOpen ? "rotate(45deg)" : "none",
          }} />
          <span style={{
            position: "absolute", left: 0, top: "7px",
            display: "block", width: "22px", height: "1px",
            backgroundColor: "rgba(240,233,223,0.85)",
            transition: "opacity 0.2s ease",
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            position: "absolute", left: 0,
            bottom: menuOpen ? "7px" : "0px",
            display: "block", width: "22px", height: "1px",
            backgroundColor: "rgba(240,233,223,0.85)",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), bottom 0.35s cubic-bezier(0.4,0,0.2,1)",
            transform: menuOpen ? "rotate(-45deg)" : "none",
          }} />
        </div>
      </button>

      {/* ── 手機側邊抽屜遮罩 ── */}
      <div
        className="md:hidden"
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 190,
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* ── 手機側邊抽屜本體 — 從右側滑入 ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "72vw", maxWidth: "300px",
          zIndex: 195,
          backgroundColor: "rgba(18,12,10,0.98)",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(197,151,109,0.12)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          display: "flex", flexDirection: "column",
          padding: "5rem 2rem 3rem",
          overflowY: "auto",
        }}
      >
        {/* 導覽連結 */}
        <nav style={{ flex: 1 }}>
          {NAV_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href}>
              <div style={{
                padding: "1rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
                fontSize: "1rem",
                color: location === link.href ? "var(--deer-gold)" : "rgba(240,233,223,0.65)",
                letterSpacing: "0.1em", cursor: "pointer",
                transform: menuOpen ? "translateX(0)" : "translateX(16px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.4s cubic-bezier(0.4,0,0.2,1) ${80 + i * 45}ms, opacity 0.35s ease ${60 + i * 45}ms`,
              }}>
                {link.label}
              </div>
            </Link>
          ))}
          {/* 商店連結 — 暫時隱藏，待上線時移除 display:none */}
          <Link href="/shop">
            <div style={{
              padding: "1rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              fontFamily: "'Noto Serif TC', serif", fontWeight: 300,
              fontSize: "1rem",
              color: location === "/shop" ? "var(--deer-gold)" : "rgba(197,151,109,0.85)",
              letterSpacing: "0.1em", cursor: "pointer",
              transform: menuOpen ? "translateX(0)" : "translateX(16px)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.4s cubic-bezier(0.4,0,0.2,1) ${80 + NAV_LINKS.length * 45}ms, opacity 0.35s ease ${60 + NAV_LINKS.length * 45}ms`,
              display: "none", alignItems: "center", gap: "0.5rem",
            }}>
              <ShoppingCart size={14} /> 生鮮商店
            </div>
          </Link>
        </nav>

        {/* CRÈM 蛋糕上桌預訂按鈕 */}
        <Link href="/crem">
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block", marginTop: "2rem", textAlign: "center" as const,
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem",
              letterSpacing: "0.18em", textTransform: "uppercase" as const,
              color: "rgba(240,233,223,0.6)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "1rem", cursor: "pointer",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.35s ease 320ms, transform 0.4s ease 320ms",
            }}
          >CRÈM 蛋糕上桌預訂</div>
        </Link>

        {/* 訂位按鈕 */}
        <a
          href={RESERVATION_URL}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "block", marginTop: "0.75rem", textAlign: "center" as const,
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem",
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            color: "var(--deer-gold)",
            border: "1px solid rgba(197,151,109,0.45)",
            padding: "1rem", textDecoration: "none", whiteSpace: "nowrap" as const,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.35s ease 380ms, transform 0.4s ease 380ms",
          }}
        >立即訂位</a>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--deer-dark)", borderTop: "1px solid rgba(197,151,109,0.12)", padding: "4rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
        <div>
          <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "1.125rem", color: "rgba(240,233,223,0.85)", letterSpacing: "0.12em", marginBottom: "1rem" }}>初衷小鹿</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(197,151,109,0.7)", textTransform: "uppercase" }}>Deer's Hotpot Bistro</p>
        </div>

        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Contact</p>
          <a href="tel:+886227658585" style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", textDecoration: "none", display: "block", lineHeight: 2, transition: "color 0.2s" }} onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(197,151,109,0.8)";}} onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(240,233,223,0.4)";}}>02-2765-8585</a>
        </div>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Hours</p>
          <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", lineHeight: 2 }}>
            星期一　12:00–15:00　18:00–22:00<br />
            星期二　12:00–15:00　18:00–22:00<br />
            星期三　12:00–15:00　18:00–22:00<br />
            星期四　12:00–15:00　18:00–22:00<br />
            星期五　12:00–15:00　17:30–22:30<br />
            星期六　11:30–15:00　17:30–22:30<br />
            星期日　11:30–15:00　17:30–22:30
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Follow</p>
          <a href="https://www.instagram.com/originalpot_official/?hl=zh-tw" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", textDecoration: "none", display: "block", marginBottom: "0.5rem", transition: "color 0.2s" }} onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(197,151,109,0.8)";}} onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(240,233,223,0.4)";}}>Instagram</a>
          <a href="https://www.facebook.com/deershotpotbistro/?locale=zh_TW" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(197,151,109,0.8)";}} onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(240,233,223,0.4)";}}>Facebook</a>
        </div>
      </div>
      {/* ── 地圖 + 地址並排區塊 ── */}
      <div style={{ maxWidth: "1280px", margin: "3rem auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "2.5rem", alignItems: "stretch" }}>
          {/* 左欄：地址資訊 */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.7)", marginBottom: "1rem" }}>Find Us</p>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(240,233,223,0.75)", lineHeight: 2, letterSpacing: "0.06em", marginBottom: "0.25rem" }}>台北市信義區</p>
              <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(240,233,223,0.75)", lineHeight: 2, letterSpacing: "0.06em", marginBottom: "1.5rem" }}>忠孝東路四段 553 巷 6 弄 15 號</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(240,233,223,0.35)", letterSpacing: "0.08em", lineHeight: 1.8 }}>Zhongxiao E. Rd. Sec. 4, Lane 553<br />Alley 6, No. 15, Xinyi Dist., Taipei</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=25.0423803,121.5634603&destination_place_id=ChIJUe3i_A6rQjQRLQzk4lRMncI"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.75rem", color: "rgba(197,151,109,0.85)", textDecoration: "none", letterSpacing: "0.1em", border: "1px solid rgba(197,151,109,0.35)", padding: "0.5rem 1.25rem", transition: "all 0.2s", fontFamily: "'Cormorant Garamond', serif", display: "inline-block", width: "fit-content", whiteSpace: "nowrap" as const }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.7)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.35)"; }}
              >
                立即導航
              </a>
              <a
                href="https://maps.app.goo.gl/aWRwfie8rDpdxK277"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.7rem", color: "rgba(240,233,223,0.3)", textDecoration: "none", letterSpacing: "0.08em", transition: "color 0.2s", fontFamily: "'Cormorant Garamond', serif" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,233,223,0.6)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,233,223,0.3)"; }}
              >
                在 Google Maps 查看
              </a>
            </div>
          </div>
          {/* 右欄：地圖 iframe */}
          <div style={{ borderRadius: "2px", overflow: "hidden", border: "1px solid rgba(197,151,109,0.12)", minHeight: "240px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9!2d121.5634603!3d25.0423803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab0efce2ed51%3A0xc29d4c54e2e40c2d!2z5Yid6KW15bCP6bm_IERlZXIncyBIb3Rwb3QgQmlzdHJv!5e0!3m2!1szh-TW!2stw!4v1745462400000!5m2!1szh-TW!2stw"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "240px", filter: "invert(90%) hue-rotate(180deg) brightness(0.85) saturate(0.7)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="初衷小鹿位置地圖"
            />
          </div>
        </div>
      </div>
      {/* 交通引導區塊 */}
      <div style={{ maxWidth: "1280px", margin: "2.5rem auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: "1.25rem" }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(197,151,109,0.55)", marginBottom: "0.5rem" }}>Getting Here</p>
            <p style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.8125rem", color: "rgba(240,233,223,0.5)", letterSpacing: "0.06em" }}>
              捷運、開車、停車建議——詳見交通與停車頁面
            </p>
          </div>
          <Link
            href="/transport"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              color: "rgba(197,151,109,0.85)",
              textDecoration: "none",
              border: "1px solid rgba(197,151,109,0.35)",
              padding: "0.625rem 1.5rem",
              whiteSpace: "nowrap" as const,
              transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.7)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(197,151,109,0.35)"; }}
          >
            交通與停車 →
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "2rem auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(240,233,223,0.2)", letterSpacing: "0.08em" }}>© 2026 初衷小鹿 Deer's Hotpot Bistro. All rights reserved.</p>
      </div>
    </footer>
  );
}
// ── 全站浮動購物車圓形按鈕 ────────────────────────────────────────────────────────────────────────────────
function FloatingCartButton() {
  const { itemCount } = useCart();
  const [, navigate] = useLocation();
  const [location] = useLocation();
  // 在購物車頁面或結帳頁面不顯示
  if (location === "/cart" || location === "/shop/success") return null;
  // 暫時隱藏購物車浮動按鈕，待生鮮商店上線時移除此行
  return null;
  if (itemCount === 0) return null;
  return (
    <button
      onClick={() => navigate("/cart")}
      aria-label={`購物車 (${itemCount})`}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 300,
        width: "68px",
        height: "68px",
        borderRadius: "50%",
        backgroundColor: "var(--deer-gold)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 24px rgba(197,151,109,0.45), 0 2px 8px rgba(0,0,0,0.4)",
        transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(197,151,109,0.6), 0 4px 12px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(197,151,109,0.45), 0 2px 8px rgba(0,0,0,0.4)";
      }}
    >
      <ShoppingCart size={26} color="#1A1210" strokeWidth={2} />
      <span style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        background: "#1A1210",
        color: "var(--deer-gold)",
        fontSize: "0.65rem",
        fontWeight: 700,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
      }}>
        {itemCount > 9 ? "9+" : itemCount}
      </span>
    </button>
  );
}
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

// ── 動態 SEO 標題與描述管理 ────────────────────────────────────────────────
const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "初衷小鹿 Deer's Hotpot Bistro｜台北信義區高端鍋物餐酒館",
    description: "初衷小鹿，台北信義區高端鍋物餐酒館。天然日式乾貨上湯、熟成肉品、精選酒單，適合約會、週年紀念、生日慶祝與正式聚餐。立即線上訂位。",
  },
  "/brand": {
    title: "品牌故事｜初衷小鹿 Deer's Hotpot Bistro",
    description: "了解初衷小鹿的品牌理念：以鍋物為形式，延伸出具有節奏感的完整晚餐體驗。天然上湯、熟成肉品與成熟空間，構成品牌所重視的款待標準。",
  },
  "/menu": {
    title: "菜單與價位｜初衷小鹿 Deer's Hotpot Bistro",
    description: "初衷小鹿菜單：牛肉套餐 920–1,980 元、海鮮套餐 1,380–3,460 元、豬肉套餐 920–1,380 元。天然日式乾貨上湯、熟成肉品、精選加點。台北信義區。",
  },
  "/space": {
    title: "空間體驗｜初衷小鹿 Deer's Hotpot Bistro",
    description: "初衷小鹿台北信義區餐廳空間：黑磚、木質、暖銅燈具，成熟內斂的用餐環境，適合約會、紀念日與正式聚會。一窺餐廳空間全貌。",
  },
  "/awards": {
    title: "獲獎殊榮與雜誌專訪｜初衷小鹿 Deer's Hotpot Bistro",
    description: "初衷小鹿獲獎紀錄與媒體報導。Google 評分 4.6 顆星，獲多家美食雜誌與媒體專訪推薦。台北信義區高端鍋物餐廳。",
  },
  "/transport": {
    title: "交通與停車指南｜初衷小鹿 Deer's Hotpot Bistro",
    description: "初衷小鹿交通指南：捷運市政府站步行5分鐘，附近三個停車場最近步行2分鐘。台北市信義區忠孝東路四段553巷6弄15號。",
  },
};

// 菜單頁專用 Menu Schema JSON-LD
const MENU_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": "https://deersbistro.tw/menu#menu",
  "name": "初衷小鹿菜單",
  "url": "https://deersbistro.tw/menu",
  "inLanguage": "zh-TW",
  "hasMenuSection": [
    { "@type": "MenuSection", "name": "牛肉套餐", "description": "西餐等級熟成牛肉套餐，含前菜、湯底、副餐與甜點", "offers": { "@type": "Offer", "priceCurrency": "TWD", "lowPrice": "920", "highPrice": "1980" } },
    { "@type": "MenuSection", "name": "豚肉套餐", "offers": { "@type": "Offer", "priceCurrency": "TWD", "lowPrice": "920", "highPrice": "1380" } },
    { "@type": "MenuSection", "name": "海鮮套餐", "offers": { "@type": "Offer", "priceCurrency": "TWD", "lowPrice": "1380", "highPrice": "3460" } },
    { "@type": "MenuSection", "name": "羊肉套餐" },
    { "@type": "MenuSection", "name": "雞肉 / 蔬食套餐" },
    { "@type": "MenuSection", "name": "商業午餐", "description": "平日中午限定優惠套餐" },
    { "@type": "MenuSection", "name": "酒水單", "description": "侍酒師嚴選紅白氣泡酒、啊酒、無酒精飲品" }
  ]
};

function DynamicTitle() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = PAGE_META[location] || PAGE_META["/"];
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", meta.description);
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute("content", meta.title);
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute("content", meta.description);
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute("href", `https://deersbistro.tw${location}`);
    // 修正 og:url 動態跟著當前路由
    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute("content", `https://deersbistro.tw${location}`);
    // 菜單頁動態注入 Menu Schema
    const existingMenuSchema = document.getElementById('schema-menu');
    if (location === '/menu') {
      if (!existingMenuSchema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'schema-menu';
        script.textContent = JSON.stringify(MENU_SCHEMA);
        document.head.appendChild(script);
      }
    } else {
      if (existingMenuSchema) existingMenuSchema.remove();
    }
  }, [location]);
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <DynamicTitle />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/brand" component={Brand} />
        <Route path="/menu" component={Menu} />
        <Route path="/space" component={Space} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/experience" component={Experience} />
        <Route path="/awards" component={Awards} />
        <Route path="/crem" component={Crem} />
        <Route path="/transport" component={Transport} />
        <Route path="/shop" component={Shop} />
        <Route path="/shop/success" component={ShopSuccess} />
        <Route path="/shop/:id" component={ShopProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin/members" component={AdminMembers} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default function App() {
  const [location] = useLocation();

  // /space-embed 路由：不含導覽列與頁尾，純內容，供 EasyStore iframe 嵌入使用
  if (location === "/space-embed") {
    return (
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Space />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // /brand-embed 路由：不含導覽列與頁尾，供 EasyStore iframe 嵌入使用
  if (location === "/brand-embed") {
    return (
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Brand />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // /menu-embed 路由：不含導覽列與頁尾，供 EasyStore iframe 嵌入使用
  if (location === "/menu-embed") {
    return (
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Menu />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // /reservation-embed 路由：不含導覽列與頁尾，供 EasyStore iframe 嵌入使用
  if (location === "/reservation-embed") {
    return (
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Reservation />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Navbar />
            <Router />
            <Footer />
            <FloatingCartButton />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
