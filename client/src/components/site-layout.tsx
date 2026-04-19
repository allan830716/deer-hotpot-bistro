/**
 * Design Philosophy Reminder — 品牌形象官網共用版型
 * 共用區塊須維持精煉、克制且正式的語氣，以穩定承接品牌定位與訂位動機。
 */
import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  footerNote,
  logoImage,
  mapsUrl,
  navItems,
  reservationUrl,
  socialUrl,
} from "@/lib/brandData";

type SiteLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  showPageIntro?: boolean;
};

export function SiteLayout({ eyebrow, title, intro, children, showPageIntro = true }: SiteLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(197,151,109,0.18),transparent_18%),radial-gradient(circle_at_84%_16%,rgba(255,240,222,0.08),transparent_18%),linear-gradient(180deg,rgba(10,9,8,0.14),transparent_24%,rgba(10,9,8,0.56))]" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(10,9,8,0.82)] backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-4">
          <Link href="/">
            <span className="flex items-center gap-4 text-sm uppercase tracking-[0.28em] text-stone-100/90">
              <img
                src={logoImage}
                alt="初衷小鹿品牌標誌"
                className="h-10 w-10 rounded-full object-cover ring-1 ring-[rgba(197,151,109,0.34)]"
              />
              <span className="hidden md:inline">Original Deer’s Hotpot Bistro</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item, index) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className={[
                      "nav-track-item text-xs uppercase tracking-[0.28em] transition",
                      isActive ? "text-stone-50" : "text-stone-300 hover:text-stone-50",
                    ].join(" ")}
                    data-index={`0${index + 1}`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-[rgba(197,151,109,0.34)] bg-white/5 px-4 text-[11px] tracking-[0.24em] text-stone-100 hover:bg-white/10 md:px-5 md:tracking-[0.28em]"
          >
            <a href={reservationUrl} target="_blank" rel="noreferrer">
              線上訂位
            </a>
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        {showPageIntro ? (
          <section className="section-shell border-b border-white/6 pb-10 md:pb-14">
            <div className="container grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
              <div className="space-y-4">
                <p className="section-label">{eyebrow}</p>
                <h1 className="section-title max-w-lg">{title}</h1>
              </div>
              <div className="page-intro-shell">
                <p className="body-copy max-w-none">{intro}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                    <a href={reservationUrl} target="_blank" rel="noreferrer">
                      查詢訂位時段 <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                    <a href={mapsUrl} target="_blank" rel="noreferrer">
                      查看位置資訊
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {children}
      </main>

      <footer className="relative z-10 border-t border-white/8 pb-8 pt-12">
        <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-4">
            <p className="section-label">Reservation</p>
            <h2 className="section-title max-w-md text-[clamp(2.4rem,4vw,4.2rem)]">
              歡迎預留席次，從容展開一場完整而得體的晚餐安排。
            </h2>
            <p className="body-copy max-w-xl">
              初衷小鹿適合約會、慶祝、正式宴聚與重視餐敘品質的會面。若已確認用餐日期，建議提前安排，以保留更完整的體驗節奏。
            </p>
          </div>

          <div className="brand-rail grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
            <div className="info-row">
              <span>線上訂位</span>
              <a href={reservationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                查詢可預約時段 <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="info-row">
              <span>Instagram</span>
              <a href={socialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                瀏覽近期影像 <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="info-row">
              <span>Google 地圖</span>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                導航與位置資訊 <MapPin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="container mt-10 border-t border-white/6 pt-6">
          <p className="text-sm text-stone-400">{footerNote}</p>
        </div>
      </footer>
    </div>
  );
}
