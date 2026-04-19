/**
 * Design Philosophy Reminder — 正式訂位資訊頁
 * 訂位頁應以清楚、得體且正式的語氣說明預約方式、適用場合與慶祝服務安排。
 */
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import {
  celebrationService,
  celebrationSteps,
  cremUrl,
  mapsUrl,
  reservationInfo,
  reservationUrl,
  socialUrl,
} from "@/lib/brandData";

const bookingScenes = [
  {
    label: "Date Night",
    title: "雙人約會",
    body: "適合重視空間氣質、餐敘節奏與整體氛圍之雙人晚餐安排。",
  },
  {
    label: "Celebration",
    title: "紀念日與慶祝",
    body: "主餐、甜點與蛋糕服務可連續安排，使重要時刻自訂位起即維持完整性。",
  },
  {
    label: "Hosting",
    title: "正式聚會與款待",
    body: "空間尺度、服務節奏與菜單結構皆適合需兼顧體面與品質的宴聚場合。",
  },
];

export default function Reservation() {
  return (
    <SiteLayout
      eyebrow="Reservation"
      title="建議預先安排席次，以保留更完整而從容的餐敘節奏。"
      intro="初衷小鹿適合約會、週年紀念、生日餐敘、正式聚會與重視氛圍品質的晚餐場合。若已確認日期與人數，建議提早訂位，以利同步安排席位需求與慶祝服務。"
    >
      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
          <div className="feature-panel">
            <p className="section-label">Reservation Guidance</p>
            <h2 className="section-title max-w-sm">訂位不僅為保留席次，亦是展開整體用餐安排的起點。</h2>
            <p className="body-copy mt-5">
              對於重視約會氛圍、紀念日儀式或正式聚會品質的賓客而言，事先完成訂位有助於保留更理想的時段與完整體驗，
              亦便於同步安排蛋糕服務、席位需求與來店節奏。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                <a href={reservationUrl} target="_blank" rel="noreferrer">
                  查詢可訂位時段
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                <a href={mapsUrl} target="_blank" rel="noreferrer">
                  查看位置與交通
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {reservationInfo.map((item) => (
              <div key={item.label} className="review-card">
                <p className="section-label">{item.label}</p>
                <p className="body-copy mt-4">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="feature-panel">
            <p className="section-label">Celebration Service</p>
            <h2 className="section-title max-w-sm">{celebrationService.title}</h2>
            <p className="body-copy mt-5">{celebrationService.body}</p>
            <p className="body-copy mt-5">{celebrationService.note}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                <a href={reservationUrl} target="_blank" rel="noreferrer">
                  先行完成訂位
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
                <a href={cremUrl} target="_blank" rel="noreferrer">
                  參考 CREM 蛋糕款式
                </a>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {celebrationSteps.map((step) => (
              <div key={step.index} className="pillar-card min-h-[14rem]">
                <p className="section-label">Step {step.index}</p>
                <h2 className="mt-5 font-display text-[1.85rem] text-stone-50">{step.title}</h2>
                <p className="body-copy mt-4">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-5 lg:grid-cols-3">
          {bookingScenes.map((scene) => (
            <div key={scene.title} className="pillar-card min-h-[16rem]">
              <p className="section-label">{scene.label}</p>
              <h2 className="mt-5 font-display text-[1.9rem] text-stone-50">{scene.title}</h2>
              <p className="body-copy mt-4">{scene.body}</p>
            </div>
          ))}
        </div>

        <div className="container mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
            <a href={socialUrl} target="_blank" rel="noreferrer">
              瀏覽近期影像與餐桌呈現
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-white/14 bg-white/0 px-6 text-stone-100 hover:bg-white/6">
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              開啟導航路線
            </a>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
