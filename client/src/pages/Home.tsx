/**
 * Design Philosophy Reminder — 高端品牌首頁
 * 首頁文字應優先建立品牌定位、款待氣質與用餐價值，以正式而節制的語氣傳達品牌形象。
 */
import { motion } from "framer-motion";
import { ArrowRight, CakeSlice, Clock3, MapPin, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import {
  brandStatement,
  brandStats,
  celebrationHighlights,
  celebrationService,
  cremUrl,
  experiencePillars,
  galleryImages,
  heroImage,
  keyMemories,
  mapsUrl,
  reservationUrl,
  reviews,
} from "@/lib/brandData";
import { Link } from "wouter";

const occasionCards = [
  {
    label: "Date Night",
    title: "約會晚餐",
    body: "以成熟而安定的空間氣質承接雙人晚餐，使對話、節奏與用餐體驗得以維持恰當的從容。",
  },
  {
    label: "Celebration",
    title: "紀念日與慶祝",
    body: "從主餐、甜點至蛋糕服務皆可連續安排，使重要時刻保有完整儀式感與得體收尾。",
  },
  {
    label: "Gathering",
    title: "正式宴聚",
    body: "以穩定菜單結構、成熟場域與節制服務，承接重視品質與氛圍的聚餐與款待場合。",
  },
];

const quickFacts = [
  {
    icon: MapPin,
    label: "地點",
    value: "台北市信義區忠孝東路四段553巷6弄15號",
  },
  {
    icon: Clock3,
    label: "訂位建議",
    value: "熱門晚餐時段、紀念日與正式聚會建議提前安排席次",
  },
  {
    icon: CakeSlice,
    label: "慶祝服務",
    value: "可整合 CREM 鮮奶油蛋糕預訂、配送與上桌安排",
  },
];

export default function Home() {
  return (
    <SiteLayout
      eyebrow="Original Deer’s Hotpot Bistro"
      title="一處以鍋物為形式，延伸完整晚餐體驗的餐敘場域。"
      intro="初衷小鹿以天然上湯、穩定食材、成熟空間與節制服務為基礎，構成更適合約會、慶祝與正式聚會的晚餐安排。品牌所呈現的，不只是餐點本身，而是一場自入座至收尾皆維持完成度的用餐經驗。"
      showPageIntro={false}
    >
      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-frame min-h-[38rem] overflow-hidden"
          >
            <img src={heroImage} alt="初衷小鹿首頁品牌主視覺" className="hero-image" />
            <div className="hero-overlay" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 lg:p-10">
              <div className="flex flex-wrap gap-3">
                <span className="ember-tag">精緻鍋物晚餐</span>
                <span className="ember-tag">約會與紀念時刻</span>
                <span className="ember-tag">慶祝整合服務</span>
              </div>
              <div className="max-w-3xl">
                <p className="hero-kicker">A Night Worth Reserving</p>
                <h2 className="mt-4 hero-title max-w-3xl text-white">
                  席次所預留的，
                  <br />
                  不僅是位置，亦是一場完整晚餐的展開。
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-200/82 md:text-base">
                  初衷小鹿以清澈上湯為起點，延伸至主餐、甜點、酒感與慶祝安排，
                  使整體體驗更適合約會、週年紀念、正式聚會與重視餐敘品質的重要時刻。
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="feature-panel"
            >
              <p className="section-label">Brand Position</p>
              <h3 className="mt-4 font-display text-[2.4rem] leading-[0.95] text-stone-50 md:text-[3rem]">
                以鍋物為形式，呈現更完整的晚餐體驗。
              </h3>
              <p className="body-copy mt-5">{brandStatement}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                  <a href={reservationUrl} target="_blank" rel="noreferrer">
                    線上訂位 <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                  <Link href="/menu">瀏覽菜單與價格</Link>
                </Button>
              </div>
              <div className="mt-7 grid gap-3">
                {quickFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="info-strip">
                      <div className="info-strip-label">
                        <Icon className="h-4 w-4 text-primary" />
                        <span>{fact.label}</span>
                      </div>
                      <p className="text-sm leading-7 text-stone-200/82">{fact.value}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
            >
              {brandStats.map((stat) => (
                <div key={stat.label} className="stat-card min-h-[10.5rem]">
                  <span className="font-display text-[1.9rem] leading-tight text-stone-50">{stat.value}</span>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-label">Dining Occasions</p>
            <h2 className="section-title max-w-sm">品牌所關注的，是不同時刻都能被妥善承接的晚餐品質。</h2>
          </div>
          <p className="body-copy max-w-2xl">
            初衷小鹿的價值並不侷限於單一用餐情境。無論是雙人約會、紀念日晚餐，或重視氛圍與體面的正式聚會，
            皆可在餐點、空間與服務之間獲得一致且安定的體驗。
          </p>
        </div>

        <div className="container mt-8 grid gap-5 lg:grid-cols-3">
          {occasionCards.map((card) => (
            <article key={card.title} className="pillar-card min-h-[18rem]">
              <p className="section-label">{card.label}</p>
              <h3 className="mt-5 font-display text-[2rem] text-stone-50">{card.title}</h3>
              <p className="body-copy mt-4">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:gap-10">
          <div className="feature-panel flex h-full flex-col justify-between">
            <div>
              <p className="section-label">Celebration Service</p>
              <h2 className="section-title max-w-md">{celebrationService.title}</h2>
              <p className="body-copy mt-5">{celebrationService.body}</p>
              <p className="body-copy mt-5">{celebrationService.note}</p>
            </div>
            <div className="mt-8 grid gap-3">
              {celebrationHighlights.map((item) => (
                <div key={item} className="info-strip">
                  <div className="info-strip-label">
                    <CakeSlice className="h-4 w-4 text-primary" />
                    <span>Celebration Detail</span>
                  </div>
                  <p className="text-sm leading-7 text-stone-200/82">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                <Link href="/reservation">
                  查看慶祝安排 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                <a href={cremUrl} target="_blank" rel="noreferrer">
                  參考 CREM 蛋糕款式
                </a>
              </Button>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-[1.04fr_0.96fr]">
            <img src={galleryImages.ritual} alt="初衷小鹿靠窗席位與夜晚氛圍" className="gallery-wide min-h-[22rem] md:min-h-[34rem]" />
            <div className="grid gap-5">
              <img src={galleryImages.corner} alt="初衷小鹿約會角落座位" className="gallery-large min-h-[16rem]" />
              <img src={galleryImages.exterior} alt="初衷小鹿招牌與到店識別" className="gallery-large min-h-[16rem]" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div>
            <p className="section-label">Guest Impressions</p>
            <h2 className="section-title max-w-sm">最終被記住的，往往是整體體驗所形成的完整印象。</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {keyMemories.map((memory) => (
              <div key={memory} className="memory-card">
                <span className="memory-dot" />
                <p>{memory}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-5 lg:grid-cols-3">
          {experiencePillars.map((pillar) => (
            <article key={pillar.index} className="feature-panel min-h-[21rem]">
              <span className="section-label">{pillar.index}</span>
              <h3 className="mt-5 font-display text-3xl text-stone-50">{pillar.title}</h3>
              <p className="body-copy mt-4">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="grid gap-5 md:grid-cols-2">
            <img src={galleryImages.dining} alt="初衷小鹿內用座位空間" className="gallery-large" />
            <img src={galleryImages.counter} alt="初衷小鹿主要用餐區與開放式空間" className="gallery-large md:translate-y-10" />
          </div>
          <div className="feature-panel flex flex-col justify-between">
            <div>
              <p className="section-label">Menu & Space</p>
              <h2 className="section-title max-w-md">菜單結構、空間質地與慶祝服務，共同構成品牌所重視的晚餐完成度。</h2>
              <p className="body-copy mt-5">
                菜單清楚呈現套餐架構、價格帶與主餐方向；空間則以深色材質與內斂光線營造適合久坐與對話的氛圍。
                若需安排紀念日或生日蛋糕，亦可於訂位階段一併規劃，使整體體驗更為連續。
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                <Link href="/menu">瀏覽完整菜單</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                <Link href="/space">
                  查看空間影像 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="section-label">Guest Reviews</p>
            <h2 className="section-title max-w-sm">空間、服務與食材品質，通常會一同構成賓客對品牌的記憶。</h2>
            <Button asChild variant="outline" className="mt-6 rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                查看 Google 評論
              </a>
            </Button>
          </div>
          <div className="grid gap-4">
            {reviews.map((review) => (
              <div key={review.quote} className="review-card">
                <Quote className="h-6 w-6 text-primary" />
                <p className="mt-5 font-serif text-2xl leading-relaxed text-stone-100">“{review.quote}”</p>
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-stone-400">{review.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
