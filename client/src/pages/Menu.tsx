/**
 * Design Philosophy Reminder — 菜單頁
 * 菜單頁應以正式且清晰的語氣說明套餐架構、價格帶與風味方向，維持品牌官網的資訊質地。
 */
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import { menuHighlights, menuSections, reservationUrl } from "@/lib/brandData";

export default function Menu() {
  return (
    <SiteLayout
      eyebrow="Menu"
      title="菜單以完整晚餐為前提，安排主餐、加點、甜點與酒感之間的節奏。"
      intro="初衷小鹿的菜單設定，並非僅以價格與份量區分品項，而是以一場完整餐敘的結構為核心，讓賓客能依不同場合、風味偏好與主餐需求安排合適的用餐內容。"
    >
      <section className="section-shell pt-0">
        <div className="container grid gap-5 lg:grid-cols-3">
          {menuHighlights.map((highlight) => (
            <article key={highlight.title} className="feature-panel min-h-[18rem]">
              <p className="section-label">{highlight.label}</p>
              <h2 className="mt-5 font-display text-[2rem] leading-tight text-stone-50">{highlight.title}</h2>
              <p className="body-copy mt-4">{highlight.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-5 lg:grid-cols-2">
          {menuSections.map((section) => (
            <article key={section.title} className="panel-card min-h-[24rem]">
              <p className="section-label">{section.eyebrow}</p>
              <h2 className="mt-5 font-display text-[2.2rem] leading-tight text-stone-50">{section.title}</h2>
              <p className="body-copy mt-4">{section.body}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-stone-300">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="section-label">Selection Guidance</p>
            <h2 className="section-title max-w-sm">由主餐、風味延伸與餐後收尾依序展開，更能體現品牌所重視的完整度。</h2>
          </div>
          <div className="brand-rail grid gap-4 md:grid-cols-3">
            <div className="review-card min-h-[13rem]">
              <p className="section-label">Step 01</p>
              <h3 className="mt-4 font-display text-[1.8rem] text-stone-50">選擇主餐方向</h3>
              <p className="body-copy mt-4">可依餐敘性質與口味偏好，從牛肉、豬肉、海鮮或海陸套餐中安排最適合的主體結構。</p>
            </div>
            <div className="review-card min-h-[13rem]">
              <p className="section-label">Step 02</p>
              <h3 className="mt-4 font-display text-[1.8rem] text-stone-50">延伸餐桌層次</h3>
              <p className="body-copy mt-4">透過松露醬、鮭魚卵、手工漿與海鮮加點，使風味與桌面表情更為豐富而完整。</p>
            </div>
            <div className="review-card min-h-[13rem]">
              <p className="section-label">Step 03</p>
              <h3 className="mt-4 font-display text-[1.8rem] text-stone-50">保留餐後收尾</h3>
              <p className="body-copy mt-4">甜點與酒單延續整體晚餐節奏，使用餐經驗自前段風味自然過渡至結尾。 </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="section-label">Reservation</p>
            <h2 className="section-title max-w-sm">若已確認用餐日期與餐敘性質，建議預先保留席次與時段安排。</h2>
          </div>
          <div className="feature-panel">
            <p className="body-copy">
              於完成訂位後再進一步瀏覽菜單與搭配方向，能更從容地安排主餐、酒感與慶祝需求，使整體晚餐經驗更貼近預期品質。
            </p>
            <Button asChild className="mt-6 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              <a href={reservationUrl} target="_blank" rel="noreferrer">
                查詢訂位時段
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
