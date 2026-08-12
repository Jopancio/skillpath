import type { Course } from "../types";

export const digitalMarketing: Course = {
  id: "digital-marketing",
  title: { id: "Digital Marketing", en: "Digital Marketing" },
  description: {
    id: "Pelajari strategi pemasaran digital: SEO, iklan berbayar, dan media sosial.",
    en: "Learn digital marketing strategy: SEO, paid ads, and social media.",
  },
  longDescription: {
    id: "Kuasai skill pemasaran digital yang paling dicari perusahaan: funnel marketing, copywriting, SEO dasar, iklan Meta & Google, serta analitik. Cocok untuk pebisnis dan calon digital marketer.",
    en: "Master the most in-demand digital marketing skills: marketing funnels, copywriting, basic SEO, Meta & Google ads, and analytics. Great for business owners and aspiring digital marketers.",
  },
  category: "marketing",
  difficulty: "intermediate",
  icon: "Megaphone",
  color: "#FF914D",
  salary: { id: "Rp 4 - 10 juta/bulan", en: "$280 - $700/month" },
  demand: "Sangat Tinggi",
  passScore: 70,
  modules: [
    {
      id: "dm-m1",
      title: { id: "Fondasi Marketing", en: "Marketing Foundations" },
      lessons: [
        {
          id: "dm-l1",
          title: { id: "Marketing Funnel", en: "The Marketing Funnel" },
          type: "text",
          duration: 6,
          xp: 20,
          body: {
            id: "**Funnel** = perjalanan calon pembeli dari tidak kenal sampai beli.\n\n**3 tahap utama:**\n1. **Awareness** (TOFU): orang baru tahu kamu. Konten: edukasi, viral\n2. **Consideration** (MOFU): orang membandingkan. Konten: review, studi kasus\n3. **Decision** (BOFU): orang siap beli. Konten: promo, testimoni, garansi\n\nKesalahan umum: langsung jualan ke orang yang belum kenal. Bangun dulu dari atas funnel.",
            en: "**Funnel** = the buyer's journey from stranger to customer.\n\n**3 main stages:**\n1. **Awareness** (TOFU): people just discovered you. Content: education, viral\n2. **Consideration** (MOFU): people are comparing. Content: reviews, case studies\n3. **Decision** (BOFU): people are ready to buy. Content: promos, testimonials, guarantees\n\nCommon mistake: hard-selling to strangers. Build from the top of the funnel first.",
          },
        },
        {
          id: "dm-l2",
          title: { id: "Video: Copywriting yang Menjual", en: "Video: Copywriting that Sells" },
          type: "video",
          duration: 9,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/8lkNkHDMxB8",
        },
        {
          id: "dm-l3",
          title: { id: "Kartu: Formula Copywriting", en: "Cards: Copywriting Formulas" },
          type: "flipcard",
          duration: 5,
          xp: 20,
          cards: [
            {
              front: { id: "AIDA", en: "AIDA" },
              back: {
                id: "Attention - Interest - Desire - Action. Tarik perhatian, bangun minat, ciptakan keinginan, ajak bertindak.",
                en: "Attention - Interest - Desire - Action. Grab attention, build interest, create desire, prompt action.",
              },
            },
            {
              front: { id: "PAS", en: "PAS" },
              back: {
                id: "Problem - Agitation - Solution. Sebutkan masalah, perdalam rasa sakitnya, tawarkan solusi.",
                en: "Problem - Agitation - Solution. State the problem, twist the knife, offer the solution.",
              },
            },
            {
              front: { id: "Benefit > Feature", en: "Benefit > Feature" },
              back: {
                id: "Jual hasil, bukan spesifikasi. 'Baterai awet 2 hari' (benefit) > 'Baterai 5000mAh' (feature).",
                en: "Sell outcomes, not specs. 'Battery lasts 2 days' (benefit) > '5000mAh battery' (feature).",
              },
            },
          ],
        },
      ],
    },
    {
      id: "dm-m2",
      title: { id: "SEO & Konten Organik", en: "SEO & Organic Content" },
      lessons: [
        {
          id: "dm-l4",
          title: { id: "Dasar SEO untuk Pemula", en: "SEO Basics for Beginners" },
          type: "text",
          duration: 7,
          xp: 25,
          body: {
            id: "**SEO** = cara agar websitemu muncul di Google tanpa bayar iklan.\n\n**3 pilar SEO:**\n1. **Keyword research**: cari kata yang diketik orang (tools: Google Keyword Planner, gratis)\n2. **On-page**: judul mengandung keyword, konten menjawab pencarian, struktur heading rapi\n3. **Authority**: website lain me-link ke kamu (backlink)\n\n**Long-tail keyword** ('cara membuat latte art untuk pemula') lebih mudah dimenangkan daripada keyword umum ('kopi').",
            en: "**SEO** = how to make your website appear on Google without paying for ads.\n\n**3 pillars of SEO:**\n1. **Keyword research**: find what people type (tools: Google Keyword Planner, free)\n2. **On-page**: keyword in the title, content answers the search, clean heading structure\n3. **Authority**: other websites link to you (backlinks)\n\n**Long-tail keywords** ('how to make latte art for beginners') are easier to win than broad ones ('coffee').",
          },
        },
        {
          id: "dm-l5",
          title: { id: "Video: Riset Keyword Gratis", en: "Video: Free Keyword Research" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/b9DdIivH7Hs",
        },
        {
          id: "dm-l6",
          title: { id: "Kartu: Istilah SEO", en: "Cards: SEO Terms" },
          type: "flipcard",
          duration: 5,
          xp: 20,
          cards: [
            {
              front: { id: "SERP", en: "SERP" },
              back: {
                id: "Search Engine Results Page. Halaman hasil pencarian Google. Targetmu: halaman 1.",
                en: "Search Engine Results Page. Google's results page. Your target: page 1.",
              },
            },
            {
              front: { id: "Backlink", en: "Backlink" },
              back: {
                id: "Link dari website lain ke websitemu. Seperti 'rekomendasi' di mata Google.",
                en: "A link from another website to yours. Like a 'recommendation' in Google's eyes.",
              },
            },
            {
              front: { id: "CTR", en: "CTR" },
              back: {
                id: "Click-Through Rate. Persentase orang yang klik setelah melihat. Judul menarik = CTR tinggi.",
                en: "Click-Through Rate. Percentage of people who click after seeing. Catchy title = high CTR.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "dm-m3",
      title: { id: "Iklan Berbayar & Analitik", en: "Paid Ads & Analytics" },
      lessons: [
        {
          id: "dm-l7",
          title: { id: "Mulai Iklan dengan Budget Kecil", en: "Start Ads on a Small Budget" },
          type: "text",
          duration: 7,
          xp: 25,
          body: {
            id: "Iklan Meta (FB/IG) bisa mulai dari **Rp 20.000/hari**.\n\n**Struktur kampanye:**\n- **Campaign**: tujuan (traffic, konversi, awareness)\n- **Ad set**: target audiens (usia, lokasi, minat)\n- **Ad**: gambar/video + copywriting\n\n**Aturan emas:**\n1. Mulai dari audiens yang sudah kenal (retargeting)\n2. Uji 3-5 variasi iklan (split test)\n3. Matikan iklan yang jelek, besarkan yang untung\n\nJangan habiskan budget sebelum tahu mana yang berhasil.",
            en: "Meta ads (FB/IG) can start from **$1.5/day**.\n\n**Campaign structure:**\n- **Campaign**: objective (traffic, conversion, awareness)\n- **Ad set**: target audience (age, location, interests)\n- **Ad**: image/video + copywriting\n\n**Golden rules:**\n1. Start with audiences who know you (retargeting)\n2. Test 3-5 ad variations (split testing)\n3. Kill losing ads, scale winners\n\nDon't burn budget before knowing what works.",
          },
        },
        {
          id: "dm-l8",
          title: { id: "Video: Meta Ads untuk Pemula", en: "Video: Meta Ads for Beginners" },
          type: "video",
          duration: 10,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/pNNKslGhFvk",
        },
        {
          id: "dm-l9",
          title: { id: "Baca Data: Metrik Penting", en: "Reading Data: Key Metrics" },
          type: "text",
          duration: 6,
          xp: 20,
          body: {
            id: "Marketing tanpa data = judi. Kenali metrik penting ini:\n\n- **CPM**: biaya per 1000 tayangan\n- **CPC**: biaya per klik\n- **CTR**: persentase klik (sehat: >1%)\n- **Conversion rate**: persentase pengunjung yang beli\n- **ROAS**: Return on Ad Spend. Iklan Rp 100rb menghasilkan Rp 500rb = ROAS 5x\n\n**ROAS positif** = iklan untung. Itu satu-satunya yang benar-benar penting.",
            en: "Marketing without data = gambling. Know these key metrics:\n\n- **CPM**: cost per 1000 impressions\n- **CPC**: cost per click\n- **CTR**: click percentage (healthy: >1%)\n- **Conversion rate**: percentage of visitors who buy\n- **ROAS**: Return on Ad Spend. $7 ad generates $35 = 5x ROAS\n\n**Positive ROAS** = profitable ads. It's the only thing that truly matters.",
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "dm-q1",
      question: { id: "Urutan marketing funnel yang benar adalah...", en: "The correct marketing funnel order is..." },
      options: [
        { id: "Decision - Awareness - Consideration", en: "Decision - Awareness - Consideration" },
        { id: "Awareness - Consideration - Decision", en: "Awareness - Consideration - Decision" },
        { id: "Consideration - Decision - Awareness", en: "Consideration - Decision - Awareness" },
        { id: "Awareness - Decision - Consideration", en: "Awareness - Decision - Consideration" },
      ],
      correctIndex: 1,
    },
    {
      id: "dm-q2",
      question: { id: "Formula copywriting PAS adalah...", en: "The PAS copywriting formula is..." },
      options: [
        { id: "Price - Ads - Sales", en: "Price - Ads - Sales" },
        { id: "Problem - Agitation - Solution", en: "Problem - Agitation - Solution" },
        { id: "Product - Audience - Strategy", en: "Product - Audience - Strategy" },
        { id: "Post - Analyze - Share", en: "Post - Analyze - Share" },
      ],
      correctIndex: 1,
    },
    {
      id: "dm-q3",
      question: { id: "Manakah contoh BENEFIT (bukan feature)?", en: "Which is an example of a BENEFIT (not a feature)?" },
      options: [
        { id: "Baterai 5000mAh", en: "5000mAh battery" },
        { id: "RAM 8GB", en: "8GB RAM" },
        { id: "Baterai awet 2 hari tanpa charge", en: "Battery lasts 2 days without charging" },
        { id: "Layar 6.5 inci", en: "6.5 inch screen" },
      ],
      correctIndex: 2,
    },
    {
      id: "dm-q4",
      question: { id: "Apa kepanjangan SEO?", en: "What does SEO stand for?" },
      options: [
        { id: "Social Engagement Optimization", en: "Social Engagement Optimization" },
        { id: "Search Engine Optimization", en: "Search Engine Optimization" },
        { id: "Sales Earning Operation", en: "Sales Earning Operation" },
        { id: "Site Entry Order", en: "Site Entry Order" },
      ],
      correctIndex: 1,
    },
    {
      id: "dm-q5",
      question: { id: "Keyword long-tail lebih mudah dimenangkan karena...", en: "Long-tail keywords are easier to win because..." },
      options: [
        { id: "Lebih panjang hurufnya", en: "They have more letters" },
        { id: "Persaingannya lebih sedikit dan spesifik", en: "They have less competition and are specific" },
        { id: "Google suka kata panjang", en: "Google likes long words" },
        { id: "Lebih mahal di iklan", en: "They cost more in ads" },
      ],
      correctIndex: 1,
    },
    {
      id: "dm-q6",
      question: { id: "Apa itu backlink?", en: "What is a backlink?" },
      options: [
        { id: "Link ke belakang halaman", en: "A link to the back of a page" },
        { id: "Link dari website lain ke website kita", en: "A link from another website to ours" },
        { id: "Tombol kembali browser", en: "The browser back button" },
        { id: "Link internal website", en: "An internal website link" },
      ],
      correctIndex: 1,
    },
    {
      id: "dm-q7",
      question: { id: "Struktur iklan Meta dari atas ke bawah adalah...", en: "The Meta ads structure from top to bottom is..." },
      options: [
        { id: "Ad - Ad set - Campaign", en: "Ad - Ad set - Campaign" },
        { id: "Campaign - Ad set - Ad", en: "Campaign - Ad set - Ad" },
        { id: "Ad set - Campaign - Ad", en: "Ad set - Campaign - Ad" },
        { id: "Campaign - Ad - Ad set", en: "Campaign - Ad - Ad set" },
      ],
      correctIndex: 1,
    },
    {
      id: "dm-q8",
      question: { id: "ROAS 5x artinya...", en: "A 5x ROAS means..." },
      options: [
        { id: "Rugi 5 kali lipat", en: "Losing 5 times the money" },
        { id: "Setiap Rp1 iklan menghasilkan Rp5", en: "Every Rp1 of ads generates Rp5" },
        { id: "Iklan tayang 5 kali", en: "The ad showed 5 times" },
        { id: "5 orang membeli", en: "5 people bought" },
      ],
      correctIndex: 1,
    },
    {
      id: "dm-q9",
      question: { id: "CTR yang sehat untuk iklan umumnya di atas...", en: "A healthy CTR for ads is generally above..." },
      options: [
        { id: "0.01%", en: "0.01%" },
        { id: "1%", en: "1%" },
        { id: "50%", en: "50%" },
        { id: "100%", en: "100%" },
      ],
      correctIndex: 1,
    },
    {
      id: "dm-q10",
      question: { id: "Langkah pertama sebelum beriklan adalah...", en: "The first step before running ads is..." },
      options: [
        { id: "Langsung bakar budget besar", en: "Burn a big budget immediately" },
        { id: "Uji beberapa variasi iklan dengan budget kecil", en: "Test several ad variations with a small budget" },
        { id: "Tunggu viral", en: "Wait to go viral" },
        { id: "Copy iklan kompetitor", en: "Copy competitor ads" },
      ],
      correctIndex: 1,
    },
  ],
};
