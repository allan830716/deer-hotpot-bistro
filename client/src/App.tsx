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
import NotFound from "./pages/NotFound";

const NAV_LINKS = [
  { href: "/", label: "首頁" },
  { href: "/brand", label: "品牌故事" },
  { href: "/menu", label: "菜單" },
  { href: "/space", label: "空間體驗" },
  { href: "/reservation", label: "訂位" },
  { href: "/experience", label: "品牌體驗" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "80px",
        display: "flex",
        alignItems: "center",
        backgroundColor: scrolled ? "rgba(26,18,16,0.96)" : "rgba(26,18,16,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(197,151,109,0.15)" : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "0 2rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
        {/* Logo */}
        <Link href="/">
          <span style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 200, fontSize: "1rem", color: "rgba(240,233,223,0.9)", letterSpacing: "0.12em", cursor: "pointer" }}>
            初衷小鹿
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="hidden md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 300,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.1em",
                  color: location === link.href ? "var(--deer-gold)" : "rgba(240,233,223,0.55)",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
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
          <a
            href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--deer-gold)",
              border: "1px solid rgba(197,151,109,0.5)",
              padding: "0.5rem 1.25rem",
              transition: "all 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = "rgba(197,151,109,0.1)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = "transparent"; }}
          >
            立即訂位
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}
          aria-label="選單"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: "block", width: "22px", height: "1px", backgroundColor: "rgba(240,233,223,0.7)", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "absolute", top: "80px", left: 0, right: 0, backgroundColor: "rgba(26,18,16,0.98)", borderBottom: "1px solid rgba(197,151,109,0.15)", padding: "2rem" }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <div style={{ padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Noto Serif TC', serif", fontWeight: 300, fontSize: "0.9375rem", color: location === link.href ? "var(--deer-gold)" : "rgba(240,233,223,0.65)", letterSpacing: "0.1em", cursor: "pointer" }}>
                {link.label}
              </div>
            </Link>
          ))}
          <a href="https://inline.app/booking/-NKkKMkWVJnbMHHzxMxe:inline-live-2/-NKkKMkWVJnbMHHzxMxf" target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "1.5rem", textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", border: "1px solid rgba(197,151,109,0.4)", padding: "0.75rem", textDecoration: "none" }}>立即訂位</a>
        </div>
      )}
    </header>
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
          <p style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", lineHeight: 2 }}>週二至週日<br />午餐 11:30 — 14:30<br />晚餐 17:30 — 22:00</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--deer-gold)", marginBottom: "1rem" }}>Follow</p>
          <a href="https://www.instagram.com/deers_hotpot_bistro/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", textDecoration: "none", display: "block", marginBottom: "0.5rem" }}>Instagram</a>
          <a href="https://www.facebook.com/deershotpotbistro/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8125rem", color: "rgba(240,233,223,0.4)", textDecoration: "none" }}>Facebook</a>
        </div>
      </div>
      <div style={{ maxWidth: "1280px", margin: "3rem auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(240,233,223,0.2)", letterSpacing: "0.08em" }}>© 2024 初衷小鹿 Deer's Hotpot Bistro. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/brand" component={Brand} />
      <Route path="/menu" component={Menu} />
      <Route path="/space" component={Space} />
      <Route path="/reservation" component={Reservation} />
      <Route path="/experience" component={Experience} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
          <Toaster />
          <Navbar />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
