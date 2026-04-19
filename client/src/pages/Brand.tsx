/**
 * Design Philosophy Reminder — 品牌故事頁
 * 品牌故事頁應以較正式的語氣說明品牌精神、風味哲學與款待立場，避免社群貼文式對話口吻。
 */
import { SiteLayout } from "@/components/site-layout";
import { brandStatement, galleryImages, timeline } from "@/lib/brandData";

export default function Brand() {
  return (
    <SiteLayout
      eyebrow="Brand Story"
      title="初衷小鹿以鍋物為起點，延伸出更完整而成熟的晚餐體驗。"
      intro="品牌所關注的，並非單一料理形式的表現，而是整體餐敘是否能在風味、空間、節奏與服務之間維持一致的品質。初衷小鹿因此以天然上湯、穩定食材與成熟空間作為基礎，建立更適合重要時刻的款待場域。"
    >
      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="feature-panel flex flex-col justify-between">
            <div>
              <p className="section-label">What Defines Original Deer</p>
              <p className="body-copy mt-5 text-lg md:text-xl">{brandStatement}</p>
            </div>
            <p className="mt-10 border-t border-white/8 pt-5 text-sm leading-7 text-stone-400">
              品牌所期望被記住的，並非抽象的華麗感，而是對湯底、食材、空間與服務標準的持續維持，
              使每一次來訪都能獲得穩定而完整的用餐印象。
            </p>
          </div>

          <img src={galleryImages.counter} alt="初衷小鹿櫃台與酒櫃空間" className="gallery-wide" />
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-5 lg:grid-cols-3">
          {timeline.map((item, index) => (
            <article key={item.title} className="pillar-card min-h-[22rem]">
              <span className="section-label">0{index + 1}</span>
              <h2 className="mt-5 font-display text-[2rem] leading-tight text-stone-50">{item.title}</h2>
              <p className="body-copy mt-4">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-white/6">
        <div className="container grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <img src={galleryImages.ritual} alt="初衷小鹿燈光與入口視角" className="gallery-large" />
          <div className="feature-panel">
            <p className="section-label">Brand Perspective</p>
            <h2 className="section-title max-w-md">品牌價值體現在整體餐敘品質，而不僅止於單一道料理的表現。</h2>
            <p className="body-copy mt-5">
              初衷小鹿所呈現的，不僅是鍋物本身的風味，更包括空間尺度、服務節奏與餐後收尾的整體協調。這些看似分散的細節，
              共同構成品牌對晚餐品質的理解，也使其更適合承接紀念時刻與正式聚會。
            </p>
            <p className="body-copy mt-5">
              在品牌語境中，真正重要的並非張揚的表述，而是以穩定、節制且一致的方式，讓賓客在整場晚餐之中感受到被妥善照料的質地。
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
