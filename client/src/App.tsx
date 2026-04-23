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
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import { useCart } from "./contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "首頁" },
  { href: "/brand", label: "品牌故事" },
  { href: "/menu", label: "菜單" },
  { href: "/space", label: "空間體驗" },
  { href: "/awards", label: "得獎殊榮" },
  { href: "/crem", label: "CRÈM 上桌預訂" },
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

        {/* 訂位按鈕 */}
        <a
          href={RESERVATION_URL}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "block", marginTop: "2rem", textAlign: "center" as const,
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem",
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            color: "var(--deer-gold)",
            border: "1px solid rgba(197,151,109,0.45)",
            padding: "1rem", textDecoration: "none",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.35s ease 360ms, transform 0.4s ease 360ms",
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
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Location</p>
          <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", lineHeight: 2 }}>台北市信義區<br />忠孝東路四段 553 巷 6 弄 15 號</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Hours</p>
          <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", lineHeight: 2 }}>
            星期日　11:30–15:00　17:30–22:30<br />
            星期一　12:00–15:00　18:00–22:00<br />
            星期二　12:00–15:00　18:00–22:00<br />
            星期三　12:00–15:00　18:00–22:00<br />
            星期四　12:00–15:00　18:00–22:00<br />
            星期五　12:00–15:00　17:30–22:30<br />
            星期六　11:30–15:00　17:30–22:30
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Follow</p>
          <a href="https://www.instagram.com/originalpot_official/?hl=zh-tw" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", textDecoration: "none", display: "block", marginBottom: "0.5rem", transition: "color 0.2s" }} onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(197,151,109,0.8)";}} onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(240,233,223,0.4)";}}>Instagram</a>
          <a href="https://www.facebook.com/deershotpotbistro/?locale=zh_TW" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(197,151,109,0.8)";}} onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.color="rgba(240,233,223,0.4)";}}>Facebook</a>
        </div>
      </div>
      <div style={{ maxWidth: "1280px", margin: "3rem auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(240,233,223,0.2)", letterSpacing: "0.08em" }}>© 2024 初衷小鹿 Deer's Hotpot Bistro. All rights reserved.</p>
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

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/brand" component={Brand} />
        <Route path="/menu" component={Menu} />
        <Route path="/space" component={Space} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/experience" component={Experience} />
        <Route path="/awards" component={Awards} />
        <Route path="/crem" component={Crem} />
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
