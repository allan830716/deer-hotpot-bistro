/**
 * Design Philosophy Reminder — 空間形象頁
 * 空間頁應以正式、沉著的語氣說明場域特質，使影像與文字共同建立品牌氣質。
 */
import { ArrowRight, CakeSlice } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import { celebrationService, galleryImages } from "@/lib/brandData";

const scenarios = [
  {
    title: "約會晚餐",
    body: "柔和光線、適度桌距與安定材質，使雙人餐敘能在較為私密而舒展的氛圍中展開。",
  },
  {
    title: "紀念日與慶祝",
    body: "空間具備內斂而完整的儀式感，適合生日、週年與重視細節安排的重要時刻。",
  },
  {
    title: "正式聚會",
    body: "在人聲密度、動線與座席尺度之間維持良好平衡，使款待與聚會皆能保有應有的從容。",
  },
];

const photoNotes = [
  {
    label: "Main Dining",
    title: "主用餐區呈現安定而完整的餐敘尺度",
    body: "桌距、光線與動線經過妥善配置，使整體空間在視覺與實際體驗上皆維持一致秩序。",
    image: galleryImages.dining,
    alt: "初衷小鹿主用餐區真實空間照片",
  },
  {
    label: "Window Side",
    title: "靠窗席位保留更為凝聚的夜間氛圍",
    body: "夜色、木質與暖色照明形成較為安靜的景深，適合雙人餐敘與較具儀式感的安排。",
    image: galleryImages.ritual,
    alt: "初衷小鹿靠窗座位與夜晚氛圍照片",
  },
  {
    label: "Private Corner",
    title: "角落席位提供更內斂的親密感受",
    body: "在不刻意區隔的前提下，仍保有足夠的完整性，使談話與慶祝時刻更顯安定。",
    image: galleryImages.corner,
    alt: "初衷小鹿角落座位與暖燈照片",
  },
];

export default function Space() {
  return (
    <SiteLayout
      eyebrow="Space Experience"
      title="空間以沉著而節制的方式，承接每一次值得被細緻安排的晚餐。"
      intro="初衷小鹿的空間設計並非僅為營造視覺印象，而是為了承接完整晚餐所需的節奏與尺度。從門面識別、進場視線、座席安排至光線層次，皆以同一標準回應品牌所重視的用餐品質。"
    >
      <section className="section-shell pt-0">
        <div className="container grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:grid-rows-[1fr_auto]">
          <img src={galleryImages.dining} alt="初衷小鹿主用餐區全景" className="gallery-wide min-h-[30rem] lg:row-span-2 lg:min-h-[42rem]" />
          <img src={galleryImages.ritual} alt="初衷小鹿靠窗席位與夜晚餐桌氛圍" className="gallery-large min-h-[18rem]" />
          <div className="feature-panel flex flex-col justify-between">
            <div>
              <p className="section-label">Atmosphere</p>
              <h2 className="section-title max-w-sm">品牌所重視的，不只是場景美感，而是空間能否使一場晚餐維持應有的分寸。</h2>
              <p className="body-copy mt-5">
                對於約會、紀念日與正式聚會而言，真正重要的往往是桌距、光線、材質與人聲之間是否維持恰當平衡。
                初衷小鹿以此作為空間安排的核心，使整體氛圍足以承接長時間用餐與深度交談。
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                <Link href="/reservation">
                  查看訂位資訊 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                <Link href="/menu">瀏覽菜單</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-5 lg:grid-cols-3">
          {scenarios.map((scenario, index) => (
            <article key={scenario.title} className="pillar-card min-h-[18rem]">
              <p className="section-label">Scene 0{index + 1}</p>
              <h2 className="mt-5 font-display text-[2rem] leading-tight text-stone-50">{scenario.title}</h2>
              <p className="body-copy mt-4">{scenario.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-5 lg:grid-cols-3">
          {photoNotes.map((photo) => (
            <article key={photo.title} className="overflow-hidden rounded-[2rem] border border-white/8 bg-[#17120f] shadow-[0_28px_80px_rgba(0,0,0,0.32)]">
              <img src={photo.image} alt={photo.alt} className="h-[18rem] w-full object-cover" />
              <div className="p-6">
                <p className="section-label">{photo.label}</p>
                <h2 className="mt-4 font-display text-[1.85rem] leading-tight text-stone-50">{photo.title}</h2>
                <p className="body-copy mt-4">{photo.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="feature-panel">
            <p className="section-label">Celebration Ambience</p>
            <h2 className="section-title max-w-sm">慶祝的完整性，不僅來自安排本身，也來自空間是否足以承接那份儀式感。</h2>
            <p className="body-copy mt-5">{celebrationService.body}</p>
            <p className="body-copy mt-5">
              當蛋糕、祝福與晚餐節奏被妥善銜接，空間的成熟度與穩定性亦成為整體體驗的一部分，使重要時刻得以自然展開。
            </p>
            <div className="mt-7 info-strip">
              <div className="info-strip-label">
                <CakeSlice className="h-4 w-4 text-primary" />
                <span>Celebration Note</span>
              </div>
              <p className="text-sm leading-7 text-stone-200/82">若為生日、週年紀念或需事先安排驚喜之場合，建議於訂位時同步說明需求。</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-[0.94fr_1.06fr]">
            <img src={galleryImages.table} alt="初衷小鹿單桌與角落燈光氛圍" className="gallery-large min-h-[20rem]" />
            <img src={galleryImages.counter} alt="初衷小鹿店內整體視角與長桌動線" className="gallery-wide min-h-[20rem]" />
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <img src={galleryImages.exterior} alt="初衷小鹿招牌與門面識別" className="gallery-wide min-h-[22rem]" />
          <div className="feature-panel flex flex-col justify-between">
            <div>
              <p className="section-label">Arrival</p>
              <h2 className="section-title max-w-sm">品牌印象自抵達門前即已展開，並延續至整場晚餐的收尾。</h2>
              <p className="body-copy mt-5">
                對重視用餐品質的賓客而言，真正值得記住的往往不只是餐桌本身，而是自抵達、入座至離席之間，整體氣氛是否維持一致而得體。
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                <Link href="/reservation">線上訂位</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                <Link href="/reservation">查看慶祝服務</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
