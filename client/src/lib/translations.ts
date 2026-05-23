/**
 * 初衷小鹿 — 多語言翻譯資料
 * 支援：繁體中文 (zh-TW)、英文 (en)、日文 (ja)、韓文 (ko)
 */

export type Locale = "zh-TW" | "en" | "ja" | "ko";

export const LOCALE_LABELS: Record<Locale, string> = {
  "zh-TW": "繁中",
  en: "EN",
  ja: "日文",
  ko: "한국어",
};

export const translations = {
  // ── Navbar ──────────────────────────────────────────────────────────────
  nav: {
    home: {
      "zh-TW": "首頁",
      en: "Home",
      ja: "ホーム",
      ko: "홈",
    },
    brand: {
      "zh-TW": "品牌故事",
      en: "Our Story",
      ja: "ブランドストーリー",
      ko: "브랜드 스토리",
    },
    menu: {
      "zh-TW": "菜單",
      en: "Menu",
      ja: "メニュー",
      ko: "메뉴",
    },
    space: {
      "zh-TW": "空間體驗",
      en: "The Space",
      ja: "空間体験",
      ko: "공간 경험",
    },
    awards: {
      "zh-TW": "獲獎殊榮/雜誌專訪",
      en: "Awards & Press",
      ja: "受賞・メディア掲載",
      ko: "수상 및 언론",
    },
    transport: {
      "zh-TW": "交通與停車",
      en: "Getting Here",
      ja: "アクセス・駐車場",
      ko: "교통 및 주차",
    },
    crem: {
      "zh-TW": "CRÈM 蛋糕上桌預訂",
      en: "CRÈM Cake Reservation",
      ja: "CRÈM ケーキ予約",
      ko: "CRÈM 케이크 예약",
    },
    reserve: {
      "zh-TW": "立即訂位",
      en: "Reserve",
      ja: "ご予約",
      ko: "예약하기",
    },
  },

  // ── Footer ──────────────────────────────────────────────────────────────
  footer: {
    contact: {
      "zh-TW": "Contact",
      en: "Contact",
      ja: "お問い合わせ",
      ko: "연락처",
    },
    hours: {
      "zh-TW": "Hours",
      en: "Hours",
      ja: "営業時間",
      ko: "영업시간",
    },
    follow: {
      "zh-TW": "Follow",
      en: "Follow",
      ja: "フォロー",
      ko: "팔로우",
    },
    findUs: {
      "zh-TW": "Find Us",
      en: "Find Us",
      ja: "アクセス",
      ko: "찾아오시는 길",
    },
    address: {
      "zh-TW": "台北市信義區忠孝東路四段 553 巷 6 弄 15 號",
      en: "No.15, Aly. 6, Ln. 553, Sec. 4, Zhongxiao E. Rd., Xinyi Dist., Taipei",
      ja: "台北市信義区忠孝東路4段553巷6弄15号",
      ko: "타이베이시 신이구 중샤오동로 4단 553항 6弄 15호",
    },
    navigate: {
      "zh-TW": "立即導航",
      en: "Get Directions",
      ja: "ナビを開く",
      ko: "길 안내",
    },
    viewOnMaps: {
      "zh-TW": "在 Google Maps 查看",
      en: "View on Google Maps",
      ja: "Google マップで見る",
      ko: "구글 맵에서 보기",
    },
    gettingHere: {
      "zh-TW": "Getting Here",
      en: "Getting Here",
      ja: "アクセス方法",
      ko: "오시는 방법",
    },
    transportDesc: {
      "zh-TW": "捷運、開車、停車建議——詳見交通與停車頁面",
      en: "MRT, driving, and parking tips — see the Transport page for details",
      ja: "地下鉄・車・駐車場のご案内は交通ページをご覧ください",
      ko: "지하철, 자동차, 주차 안내는 교통 페이지를 참조하세요",
    },
    transportLink: {
      "zh-TW": "交通與停車 →",
      en: "Transport & Parking →",
      ja: "アクセス・駐車場 →",
      ko: "교통 및 주차 →",
    },
    copyright: {
      "zh-TW": "© 2026 初衷小鹿 Deer's Hotpot Bistro. All rights reserved.",
      en: "© 2026 初衷小鹿 Deer's Hotpot Bistro. All rights reserved.",
      ja: "© 2026 初衷小鹿 Deer's Hotpot Bistro. All rights reserved.",
      ko: "© 2026 初衷小鹿 Deer's Hotpot Bistro. All rights reserved.",
    },
    hoursContent: {
      "zh-TW": "星期一　12:00–15:00　18:00–22:00\n星期二　12:00–15:00　18:00–22:00\n星期三　12:00–15:00　18:00–22:00\n星期四　12:00–15:00　18:00–22:00\n星期五　12:00–15:00　17:30–22:30\n星期六　11:30–15:00　17:30–22:30\n星期日　11:30–15:00　17:30–22:30",
      en: "Mon  12:00–15:00  18:00–22:00\nTue  12:00–15:00  18:00–22:00\nWed  12:00–15:00  18:00–22:00\nThu  12:00–15:00  18:00–22:00\nFri  12:00–15:00  17:30–22:30\nSat  11:30–15:00  17:30–22:30\nSun  11:30–15:00  17:30–22:30",
      ja: "月曜日　12:00–15:00　18:00–22:00\n火曜日　12:00–15:00　18:00–22:00\n水曜日　12:00–15:00　18:00–22:00\n木曜日　12:00–15:00　18:00–22:00\n金曜日　12:00–15:00　17:30–22:30\n土曜日　11:30–15:00　17:30–22:30\n日曜日　11:30–15:00　17:30–22:30",
      ko: "월요일　12:00–15:00　18:00–22:00\n화요일　12:00–15:00　18:00–22:00\n수요일　12:00–15:00　18:00–22:00\n목요일　12:00–15:00　18:00–22:00\n금요일　12:00–15:00　17:30–22:30\n토요일　11:30–15:00　17:30–22:30\n일요일　11:30–15:00　17:30–22:30",
    },
  },

  // ── Home Page ────────────────────────────────────────────────────────────
  home: {
    heroSubtitle: {
      "zh-TW": "Deer's Hotpot Bistro · Taipei Xinyi",
      en: "Deer's Hotpot Bistro · Taipei Xinyi",
      ja: "Deer's Hotpot Bistro · 台北信義",
      ko: "Deer's Hotpot Bistro · 타이베이 신이",
    },
    heroHeadline: {
      "zh-TW": "不是一頓火鍋，\n是一場有節奏的\n餐桌體驗。",
      en: "Not just hotpot.\nA dining experience\nwith its own rhythm.",
      ja: "ただの火鍋ではなく、\nリズムのある\n食卓体験。",
      ko: "단순한 훠궈가 아닌,\n리듬이 있는\n다이닝 경험.",
    },
    heroCta: {
      "zh-TW": "預約一場餐桌",
      en: "Reserve a Table",
      ja: "テーブルを予約する",
      ko: "테이블 예약하기",
    },
    philosophyLabel: {
      "zh-TW": "Our Philosophy",
      en: "Our Philosophy",
      ja: "私たちの哲学",
      ko: "우리의 철학",
    },
    philosophyHeadline: {
      "zh-TW": "我們不做熱鬧的火鍋。\n\n我們在意的，\n是一場餐桌的節奏。",
      en: "We don't do loud hotpot.\n\nWhat we care about\nis the rhythm of a meal.",
      ja: "賑やかな火鍋ではなく、\n\n私たちが大切にするのは、\n食卓のリズムです。",
      ko: "우리는 시끌벅적한 훠궈를 하지 않습니다.\n\n우리가 중요하게 생각하는 것은\n식사의 리듬입니다.",
    },
    philosophyDesc: {
      "zh-TW": "前菜、湯底、熟成肉品、酒搭配、甜點收尾。\n每一個環節，都是節奏的一部分。",
      en: "Starter, broth, aged cuts, wine pairing, dessert finale.\nEvery step is part of the rhythm.",
      ja: "前菜、スープ、熟成肉、ワインペアリング、デザートのフィナーレ。\nすべてのステップがリズムの一部です。",
      ko: "전채, 육수, 숙성 고기, 와인 페어링, 디저트 피날레.\n모든 단계가 리듬의 일부입니다.",
    },
    coresLabel: {
      "zh-TW": "What We Do",
      en: "What We Do",
      ja: "私たちのこだわり",
      ko: "우리의 특별함",
    },
    coresHeadline: {
      "zh-TW": "三個核心，構成一場完整的餐桌。",
      en: "Three pillars. One complete dining experience.",
      ja: "三つの核心が、完全な食卓を作り上げる。",
      ko: "세 가지 핵심이 완전한 다이닝을 만든다.",
    },
    core1En: { "zh-TW": "The Cut", en: "The Cut", ja: "熟成肉", ko: "숙성 고기" },
    core1Zh: { "zh-TW": "熟成肉品", en: "Aged Cuts", ja: "熟成肉品", ko: "숙성 육류" },
    core1Title: {
      "zh-TW": "熟成肉品．肉的嚴選專家",
      en: "Aged Cuts · Masters of Meat Selection",
      ja: "熟成肉品・肉の厳選専門家",
      ko: "숙성 육류 · 고기 선별 전문가",
    },
    core1Desc: {
      "zh-TW": "經過濕式熟成處理，保留肉汁、脂肪香氣、提升柔嫩度，適合火鍋這樣的短時間加熱方式，吃得到肉的原味。",
      en: "Wet-aged to preserve juices, fat aroma, and tenderness — perfect for the brief heat of hotpot, letting the true flavor of the meat shine through.",
      ja: "ウェットエイジングにより、肉汁・脂肪の香り・柔らかさを保持。火鍋の短時間加熱に最適で、肉本来の旨みが楽しめます。",
      ko: "웻 에이징으로 육즙, 지방 향, 부드러움을 보존하여 훠궈의 짧은 가열 방식에 완벽하게 어울리며 고기 본연의 맛을 느낄 수 있습니다.",
    },
    core2En: { "zh-TW": "The Broth", en: "The Broth", ja: "だし", ko: "육수" },
    core2Zh: { "zh-TW": "日本頂級乾貨", en: "Premium Japanese Dashi", ja: "日本最高級乾物", ko: "일본 프리미엄 건어물" },
    core2Title: {
      "zh-TW": "『日本頂級乾貨』上湯的層次底蘊",
      en: "Premium Japanese Dashi — Layers of Depth in Every Sip",
      ja: "「日本最高級乾物」上湯の奥深い層",
      ko: "「일본 프리미엄 건어물」깊이 있는 육수",
    },
    core2Desc: {
      "zh-TW": "金黃透亮的乾貨上湯，經長時間熬煮而成。鰹魚的煙燻深度、昆布、椎茸的溫潤菌香，在口中層層展開，越喝越有鮮甜厚度。",
      en: "A golden, clear dashi broth slow-simmered for hours. Smoky bonito depth, kombu, and shiitake warmth unfold layer by layer — growing richer with every sip.",
      ja: "長時間煮込んだ黄金色の透き通るだし。燻製鰹節の深み、昆布と椎茸の温かな香りが口の中で層を重ね、飲むほどに旨みが増します。",
      ko: "몇 시간 동안 천천히 끓인 황금빛 맑은 다시 육수. 훈제 가다랑어의 깊이, 다시마와 표고버섯의 따뜻한 향이 층층이 펼쳐지며 마실수록 깊어집니다.",
    },
    core3En: { "zh-TW": "The Finale", en: "The Finale", ja: "フィナーレ", ko: "피날레" },
    core3Zh: { "zh-TW": "甜點與酒感", en: "Dessert & Wine", ja: "デザートとワイン", ko: "디저트와 와인" },
    core3Title: {
      "zh-TW": "從主鍋延伸到甜點與酒感",
      en: "From the Main Pot to Dessert & Wine",
      ja: "メインの鍋からデザートとワインへ",
      ko: "메인 냄비에서 디저트와 와인으로",
    },
    core3Desc: {
      "zh-TW": "真正被記住的體驗，是從入座一路延伸至餐後。甜點、酒櫃與桌邊節奏共同完成這場晚餐。",
      en: "The experiences that linger are those that extend from first seating to after the meal. Dessert, the wine cabinet, and tableside rhythm together complete the evening.",
      ja: "本当に記憶に残る体験は、着席から食後まで続くもの。デザート、ワインセラー、テーブルサイドのリズムが夕食を完成させます。",
      ko: "진정으로 기억에 남는 경험은 착석부터 식사 후까지 이어지는 것입니다. 디저트, 와인 셀러, 테이블 사이드 리듬이 함께 저녁 식사를 완성합니다.",
    },
    narrativeLabel: {
      "zh-TW": "The Experience",
      en: "The Experience",
      ja: "体験の流れ",
      ko: "경험의 흐름",
    },
    narrativeHeadline: {
      "zh-TW": "一場餐桌的節奏，是這樣展開的。",
      en: "This is how the rhythm of a meal unfolds.",
      ja: "食卓のリズムは、こうして展開します。",
      ko: "식사의 리듬은 이렇게 펼쳐집니다.",
    },
    narrative1Title: { "zh-TW": "前菜，讓味蕾開始", en: "Starter — Awakening the Palate", ja: "前菜、味覚を目覚めさせる", ko: "전채 — 미각을 깨우다" },
    narrative1Body: {
      "zh-TW": "不是填飽，是鋪陳。\n一道前菜，讓整場餐桌的節奏慢慢展開。",
      en: "Not to fill, but to set the stage.\nA starter that lets the rhythm of the meal slowly unfold.",
      ja: "満腹のためではなく、序章として。\n前菜が食卓のリズムをゆっくりと展開させます。",
      ko: "배를 채우기 위한 것이 아니라 무대를 설정하기 위한 것.\n전채가 식사의 리듬을 천천히 펼쳐나갑니다.",
    },
    narrative2Title: { "zh-TW": "湯開始後，節奏慢了下來", en: "The Broth Slows Everything Down", ja: "スープが始まると、リズムが緩やかになる", ko: "육수가 시작되면 모든 것이 느려진다" },
    narrative2Body: {
      "zh-TW": "清澈的上湯，不搶食材的味道。\n讓每一口都有它應有的位置。",
      en: "A clear broth that never overpowers the ingredients.\nEvery bite finds its rightful place.",
      ja: "食材の味を奪わない澄んだスープ。\nすべての一口がその場所を見つけます。",
      ko: "재료의 맛을 압도하지 않는 맑은 육수.\n모든 한 입이 제자리를 찾습니다.",
    },
    narrative3Title: { "zh-TW": "肉，不需要調味", en: "The Meat Needs No Seasoning", ja: "肉は調味料を必要としない", ko: "고기에는 양념이 필요 없다" },
    narrative3Body: {
      "zh-TW": "熟成的肉品，自己就是答案。\n只需要湯，只需要時間。",
      en: "Aged meat is its own answer.\nAll it needs is broth and time.",
      ja: "熟成肉はそれ自体が答えです。\n必要なのはスープと時間だけ。",
      ko: "숙성 고기 자체가 답입니다.\n필요한 것은 육수와 시간뿐입니다.",
    },
    narrative4Title: { "zh-TW": "最後，留一點時間給甜點", en: "Finally, Save Room for Dessert", ja: "最後に、デザートのための時間を", ko: "마지막으로, 디저트를 위한 시간을" },
    narrative4Body: {
      "zh-TW": "一場好的餐桌，不應該在主食結束後就散場。\n甜點，是把時間留給彼此的方式。",
      en: "A great meal should not end when the main course does.\nDessert is a way of giving time back to each other.",
      ja: "素晴らしい食事は、メインコースが終わっても終わりません。\nデザートはお互いに時間を贈る方法です。",
      ko: "훌륭한 식사는 메인 코스가 끝난다고 끝나지 않습니다.\n디저트는 서로에게 시간을 돌려주는 방법입니다.",
    },
    spaceLabel: { "zh-TW": "The Space", en: "The Space", ja: "空間", ko: "공간" },
    spaceHeadline: {
      "zh-TW": "為了那些\n不該被打擾的時刻。",
      en: "For the moments\nthat deserve to be undisturbed.",
      ja: "邪魔されるべきではない\nその瞬間のために。",
      ko: "방해받지 않아야 할\n그 순간들을 위해.",
    },
    spaceDesc: {
      "zh-TW": "低調的空間，是讓對話成為主角的方式。",
      en: "A quiet space where conversation takes center stage.",
      ja: "会話が主役になれる、控えめな空間。",
      ko: "대화가 주인공이 될 수 있는 조용한 공간.",
    },
    spaceCta: { "zh-TW": "探索空間", en: "Explore the Space", ja: "空間を探索する", ko: "공간 탐색하기" },
    trustLabel: { "zh-TW": "Trust", en: "Trust", ja: "信頼", ko: "신뢰" },
    trustHeadline: {
      "zh-TW": "他們說的，\n比我們說的更真實。",
      en: "What they say\nspeaks louder than what we do.",
      ja: "彼らの言葉は、\n私たちの言葉より真実です。",
      ko: "그들의 말이\n우리의 말보다 더 진실합니다.",
    },
    trustRatingLabel: { "zh-TW": "Google 評分", en: "Google Rating", ja: "Google 評価", ko: "구글 평점" },
    trustReviewsLabel: { "zh-TW": "則評論", en: "reviews", ja: "件のレビュー", ko: "개의 리뷰" },
    trustLoadingLabel: { "zh-TW": "載入評分中…", en: "Loading rating…", ja: "評価を読み込み中…", ko: "평점 로딩 중…" },
    ctaLabel: { "zh-TW": "Reservation", en: "Reservation", ja: "ご予約", ko: "예약" },
    ctaHeadline: {
      "zh-TW": "預約一場\n屬於你的餐桌。",
      en: "Reserve a table\nthat belongs to you.",
      ja: "あなただけの\n食卓を予約する。",
      ko: "당신만을 위한\n테이블을 예약하세요.",
    },
    ctaDesc: {
      "zh-TW": "每一張桌子，都是一個完整的節奏空間。",
      en: "Every table is a space complete with its own rhythm.",
      ja: "すべてのテーブルは、独自のリズムを持つ完全な空間です。",
      ko: "모든 테이블은 고유한 리듬을 가진 완전한 공간입니다.",
    },
    ctaButton: { "zh-TW": "立即訂位", en: "Book Now", ja: "今すぐ予約", ko: "지금 예약" },
  },

  // ── Brand Page ───────────────────────────────────────────────────────────
  brand: {
    heroLabel: { "zh-TW": "Brand Story", en: "Brand Story", ja: "ブランドストーリー", ko: "브랜드 스토리" },
    heroHeadline: {
      "zh-TW": "初衷，是一切的起點。",
      en: "The original intention is where everything begins.",
      ja: "初心こそが、すべての始まりです。",
      ko: "초심이 모든 것의 시작입니다.",
    },
    heroDesc: {
      "zh-TW": "在這裡，我們回到最初的問題：一頓好的火鍋，應該是什麼樣子？",
      en: "Here, we return to the original question: what should a truly good hotpot experience be?",
      ja: "ここで、私たちは最初の問いに戻ります：本当に良い火鍋体験とはどのようなものであるべきか？",
      ko: "여기서 우리는 원래의 질문으로 돌아갑니다: 진정으로 좋은 훠궈 경험은 어떤 것이어야 할까요?",
    },
    storyLabel: { "zh-TW": "The Beginning", en: "The Beginning", ja: "始まり", ko: "시작" },
    storyHeadline: {
      "zh-TW": "一個關於「初衷」的故事",
      en: "A Story About Original Intentions",
      ja: "「初心」についての物語",
      ko: "「초심」에 관한 이야기",
    },
    storyP1: {
      "zh-TW": "初衷小鹿，不是一間普通的火鍋店。我們從一個問題開始：如果把火鍋當作一場完整的餐桌體驗來設計，它應該是什麼樣子？",
      en: "Deer's Hotpot Bistro is not an ordinary hotpot restaurant. We started with a question: if you designed hotpot as a complete dining experience, what would it look like?",
      ja: "初衷小鹿は、普通の火鍋店ではありません。私たちはある問いから始めました：火鍋を完全な食事体験として設計したら、どのようなものになるでしょうか？",
      ko: "초충샤오루는 평범한 훠궈 레스토랑이 아닙니다. 우리는 하나의 질문에서 시작했습니다: 훠궈를 완전한 다이닝 경험으로 설계한다면 어떤 모습일까요?",
    },
    storyP2: {
      "zh-TW": "我們相信，一頓好的餐桌體驗，不只是食材的品質，而是整個節奏的設計——從入座的那一刻，到最後一口甜點，每一個細節都應該是有意識的選擇。",
      en: "We believe a great dining experience is not just about ingredient quality, but the design of the entire rhythm — from the moment you sit down to the last bite of dessert, every detail should be a conscious choice.",
      ja: "私たちは、素晴らしい食事体験は食材の品質だけでなく、全体的なリズムのデザインにあると信じています——着席の瞬間からデザートの最後の一口まで、すべての細部が意識的な選択であるべきです。",
      ko: "우리는 훌륭한 다이닝 경험은 재료의 품질만이 아니라 전체 리듬의 설계에 있다고 믿습니다 — 착석하는 순간부터 마지막 디저트 한 입까지, 모든 세부 사항이 의식적인 선택이어야 합니다.",
    },
    storyP3: {
      "zh-TW": "這就是初衷小鹿的核心：用火鍋的形式，做一場真正的餐桌體驗。",
      en: "This is the core of Deer's Hotpot Bistro: using the form of hotpot to create a truly complete dining experience.",
      ja: "これが初衷小鹿の核心です：火鍋の形式を使って、本当に完全な食事体験を作り出すこと。",
      ko: "이것이 초충샤오루의 핵심입니다: 훠궈의 형식을 사용하여 진정으로 완전한 다이닝 경험을 만드는 것.",
    },
    commitment1: { "zh-TW": "食材嚴選", en: "Ingredient Curation", ja: "食材の厳選", ko: "식재료 엄선" },
    commitment2: { "zh-TW": "湯底研究", en: "Broth Research", ja: "スープの研究", ko: "육수 연구" },
    commitment3: { "zh-TW": "空間設計", en: "Space Design", ja: "空間デザイン", ko: "공간 디자인" },
    commitment4: { "zh-TW": "服務節奏", en: "Service Rhythm", ja: "サービスのリズム", ko: "서비스 리듬" },
    commitment1Desc: {
      "zh-TW": "每一種食材，都是經過嚴格篩選的結果。",
      en: "Every ingredient is the result of rigorous selection.",
      ja: "すべての食材は、厳格な選別の結果です。",
      ko: "모든 식재료는 엄격한 선별의 결과입니다.",
    },
    commitment2Desc: {
      "zh-TW": "湯底是火鍋的靈魂，我們用最好的乾貨熬製。",
      en: "The broth is the soul of hotpot; we simmer it with the finest dried ingredients.",
      ja: "スープは火鍋の魂。最高の乾物で丁寧に煮込みます。",
      ko: "육수는 훠궈의 영혼입니다. 최고의 건어물로 정성껏 끓입니다.",
    },
    commitment3Desc: {
      "zh-TW": "空間的設計，是為了讓對話成為主角。",
      en: "The space is designed to let conversation take center stage.",
      ja: "空間のデザインは、会話が主役になれるように。",
      ko: "공간 디자인은 대화가 주인공이 될 수 있도록 설계되었습니다.",
    },
    commitment4Desc: {
      "zh-TW": "服務的節奏，是整場體驗的骨架。",
      en: "The rhythm of service is the backbone of the entire experience.",
      ja: "サービスのリズムは、全体的な体験の骨格です。",
      ko: "서비스의 리듬은 전체 경험의 뼈대입니다.",
    },
    philosophyLabel: { "zh-TW": "Philosophy", en: "Philosophy", ja: "哲学", ko: "철학" },
    philosophyQuote: {
      "zh-TW": "「初衷，是在每一次選擇中，\n回到最重要的那個問題：\n這樣做，對嗎？」",
      en: "\"Original intention means returning, with every choice,\nto the most important question:\nIs this the right thing to do?\"",
      ja: "「初心とは、すべての選択において、\n最も重要な問いに立ち返ることです：\nこれは正しいことでしょうか？」",
      ko: "「초심이란 모든 선택에서\n가장 중요한 질문으로 돌아가는 것입니다:\n이것이 올바른 일인가요?」",
    },
  },

  // ── Menu Page ────────────────────────────────────────────────────────────
  menu: {
    title: { "zh-TW": "菜單", en: "Menu", ja: "メニュー", ko: "메뉴" },
    subtitle: {
      "zh-TW": "點擊分類查看完整菜單",
      en: "Select a category to view the full menu",
      ja: "カテゴリーを選択して完全なメニューを見る",
      ko: "카테고리를 선택하여 전체 메뉴 보기",
    },
    loading: { "zh-TW": "載入中…", en: "Loading…", ja: "読み込み中…", ko: "로딩 중…" },
    closeHint: { "zh-TW": "點擊任意處關閉", en: "CLICK ANYWHERE TO CLOSE", ja: "どこかをクリックして閉じる", ko: "아무 곳이나 클릭하여 닫기" },
    allMenus: { "zh-TW": "全部菜單", en: "All Menus", ja: "すべてのメニュー", ko: "전체 메뉴" },
    food: { "zh-TW": "料理", en: "Food", ja: "料理", ko: "요리" },
    drinks: { "zh-TW": "飲品", en: "Drinks", ja: "ドリンク", ko: "음료" },
  },

  // ── Space Page ───────────────────────────────────────────────────────────
  space: {
    heroLabel: { "zh-TW": "The Space", en: "The Space", ja: "空間", ko: "공간" },
    heroHeadline: {
      "zh-TW": "為了那些\n不該被打擾的時刻。",
      en: "For the moments\nthat deserve to be undisturbed.",
      ja: "邪魔されるべきではない\nその瞬間のために。",
      ko: "방해받지 않아야 할\n그 순간들을 위해.",
    },
    galleryLabel: { "zh-TW": "Gallery", en: "Gallery", ja: "ギャラリー", ko: "갤러리" },
    reserveLabel: { "zh-TW": "Reserve", en: "Reserve", ja: "ご予約", ko: "예약" },
    reserveHeadline: {
      "zh-TW": "預約這個空間，\n屬於你的那一晚。",
      en: "Reserve this space\nfor an evening that's yours.",
      ja: "この空間を予約して、\nあなただけの夜を。",
      ko: "이 공간을 예약하여\n당신만의 저녁을 만드세요.",
    },
    reserveButton: { "zh-TW": "立即訂位", en: "Book Now", ja: "今すぐ予約", ko: "지금 예약" },
  },

  // ── Awards Page ──────────────────────────────────────────────────────────
  awards: {
    heroLabel: { "zh-TW": "Awards & Press", en: "Awards & Press", ja: "受賞・メディア掲載", ko: "수상 및 언론" },
    heroHeadline: {
      "zh-TW": "被看見，\n是因為我們值得被看見。",
      en: "Recognized\nbecause we deserve to be.",
      ja: "認められるのは、\n認められるべきだからです。",
      ko: "인정받는 것은\n인정받을 자격이 있기 때문입니다.",
    },
  },

  // ── Transport Page ───────────────────────────────────────────────────────
  transport: {
    heroLabel: { "zh-TW": "Getting Here", en: "Getting Here", ja: "アクセス", ko: "오시는 방법" },
    heroHeadline: {
      "zh-TW": "找到我們，\n不是一件難事。",
      en: "Finding us\nis easier than you think.",
      ja: "私たちを見つけることは、\n難しくありません。",
      ko: "우리를 찾는 것은\n생각보다 쉽습니다.",
    },
    mrtLabel: { "zh-TW": "捷運", en: "MRT", ja: "地下鉄", ko: "지하철" },
    carLabel: { "zh-TW": "開車", en: "By Car", ja: "車", ko: "자동차" },
    parkingLabel: { "zh-TW": "停車", en: "Parking", ja: "駐車場", ko: "주차장" },
  },

  // ── Crem Page ────────────────────────────────────────────────────────────
  crem: {
    heroLabel: { "zh-TW": "CRÈM × 初衷小鹿", en: "CRÈM × Deer's Hotpot Bistro", ja: "CRÈM × 初衷小鹿", ko: "CRÈM × 초충샤오루" },
    heroHeadline: {
      "zh-TW": "把甜點，\n帶上你的餐桌。",
      en: "Bring dessert\nto your table.",
      ja: "デザートを、\nあなたの食卓へ。",
      ko: "디저트를\n당신의 테이블로.",
    },
    heroDesc: {
      "zh-TW": "與 CRÈM 合作，讓每一場餐桌都有一個完美的甜點收尾。",
      en: "In collaboration with CRÈM, every dining experience ends with a perfect dessert finale.",
      ja: "CRÈMとのコラボレーションで、すべての食事体験が完璧なデザートのフィナーレで終わります。",
      ko: "CRÈM과의 협업으로 모든 다이닝 경험이 완벽한 디저트 피날레로 마무리됩니다.",
    },
    orderButton: { "zh-TW": "立即預訂蛋糕", en: "Order a Cake", ja: "ケーキを注文する", ko: "케이크 주문하기" },
  },
} as const;

export type TranslationKey = keyof typeof translations;

/** Helper to get a translation value */
export function t(
  section: keyof typeof translations,
  key: string,
  locale: Locale
): string {
  const sectionData = translations[section] as Record<string, Record<Locale, string>>;
  const entry = sectionData[key];
  if (!entry) return key;
  return entry[locale] ?? entry["zh-TW"] ?? key;
}
