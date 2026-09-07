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
      id: "digitalMarketing-m1",
      title: { id: "Marketing Funnel", en: "The Marketing Funnel" },
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
          id: "digitalMarketing-m1l2",
          title: { id: "Pendalaman: Marketing Funnel", en: "Deep Dive: The Marketing Funnel" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Marketing Funnel**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **The Marketing Funnel**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m1l3",
          title: { id: "Penerapan: Marketing Funnel", en: "Application: The Marketing Funnel" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Marketing Funnel** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **The Marketing Funnel** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m1-cq1",
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
        id: "digitalMarketing-m1-cq2",
        question: { id: "Formula copywriting PAS adalah...", en: "The PAS copywriting formula is..." },
        options: [
          { id: "Price - Ads - Sales", en: "Price - Ads - Sales" },
          { id: "Problem - Agitation - Solution", en: "Problem - Agitation - Solution" },
          { id: "Product - Audience - Strategy", en: "Product - Audience - Strategy" },
          { id: "Post - Analyze - Share", en: "Post - Analyze - Share" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "digitalMarketing-m2",
      title: { id: "Video: Copywriting yang Menjual", en: "Video: Copywriting that Sells" },
      lessons: [
        {
            id: "dm-l2",
            title: { id: "Video: Copywriting yang Menjual", en: "Video: Copywriting that Sells" },
            type: "video",
            duration: 9,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/8lkNkHDMxB8",
          },
        {
          id: "digitalMarketing-m2l2",
          title: { id: "Pendalaman: Video: Copywriting yang Menjual", en: "Deep Dive: Video: Copywriting that Sells" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Copywriting yang Menjual**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Copywriting that Sells**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m2l3",
          title: { id: "Penerapan: Video: Copywriting yang Menjual", en: "Application: Video: Copywriting that Sells" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Copywriting yang Menjual** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Copywriting that Sells** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m2-cq1",
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
        id: "digitalMarketing-m2-cq2",
        question: { id: "Apa kepanjangan SEO?", en: "What does SEO stand for?" },
        options: [
          { id: "Social Engagement Optimization", en: "Social Engagement Optimization" },
          { id: "Search Engine Optimization", en: "Search Engine Optimization" },
          { id: "Sales Earning Operation", en: "Sales Earning Operation" },
          { id: "Site Entry Order", en: "Site Entry Order" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "digitalMarketing-m3",
      title: { id: "Kartu: Formula Copywriting", en: "Cards: Copywriting Formulas" },
      lessons: [
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
        {
          id: "digitalMarketing-m3l2",
          title: { id: "Pendalaman: Kartu: Formula Copywriting", en: "Deep Dive: Cards: Copywriting Formulas" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Formula Copywriting**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Copywriting Formulas**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m3l3",
          title: { id: "Penerapan: Kartu: Formula Copywriting", en: "Application: Cards: Copywriting Formulas" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Formula Copywriting** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Copywriting Formulas** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m3-cq1",
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
        id: "digitalMarketing-m3-cq2",
        question: { id: "Apa itu backlink?", en: "What is a backlink?" },
        options: [
          { id: "Link ke belakang halaman", en: "A link to the back of a page" },
          { id: "Link dari website lain ke website kita", en: "A link from another website to ours" },
          { id: "Tombol kembali browser", en: "The browser back button" },
          { id: "Link internal website", en: "An internal website link" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "digitalMarketing-m4",
      title: { id: "Dasar SEO untuk Pemula", en: "SEO Basics for Beginners" },
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
          id: "digitalMarketing-m4l2",
          title: { id: "Pendalaman: Dasar SEO untuk Pemula", en: "Deep Dive: SEO Basics for Beginners" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Dasar SEO untuk Pemula**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **SEO Basics for Beginners**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m4l3",
          title: { id: "Penerapan: Dasar SEO untuk Pemula", en: "Application: SEO Basics for Beginners" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Dasar SEO untuk Pemula** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **SEO Basics for Beginners** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m4-cq1",
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
        id: "digitalMarketing-m4-cq2",
        question: { id: "ROAS 5x artinya...", en: "A 5x ROAS means..." },
        options: [
          { id: "Rugi 5 kali lipat", en: "Losing 5 times the money" },
          { id: "Setiap Rp1 iklan menghasilkan Rp5", en: "Every Rp1 of ads generates Rp5" },
          { id: "Iklan tayang 5 kali", en: "The ad showed 5 times" },
          { id: "5 orang membeli", en: "5 people bought" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "digitalMarketing-m5",
      title: { id: "Video: Riset Keyword Gratis", en: "Video: Free Keyword Research" },
      lessons: [
        {
            id: "dm-l5",
            title: { id: "Video: Riset Keyword Gratis", en: "Video: Free Keyword Research" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/b9DdIivH7Hs",
          },
        {
          id: "digitalMarketing-m5l2",
          title: { id: "Pendalaman: Video: Riset Keyword Gratis", en: "Deep Dive: Video: Free Keyword Research" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Riset Keyword Gratis**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Free Keyword Research**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m5l3",
          title: { id: "Penerapan: Video: Riset Keyword Gratis", en: "Application: Video: Free Keyword Research" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Riset Keyword Gratis** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Free Keyword Research** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m5-cq1",
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
        id: "digitalMarketing-m5-cq2",
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
    },
    {
      id: "digitalMarketing-m6",
      title: { id: "Kartu: Istilah SEO", en: "Cards: SEO Terms" },
      lessons: [
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
        {
          id: "digitalMarketing-m6l2",
          title: { id: "Pendalaman: Kartu: Istilah SEO", en: "Deep Dive: Cards: SEO Terms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Istilah SEO**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: SEO Terms**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m6l3",
          title: { id: "Penerapan: Kartu: Istilah SEO", en: "Application: Cards: SEO Terms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Istilah SEO** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: SEO Terms** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m6-cq1",
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
        id: "digitalMarketing-m6-cq2",
        question: { id: "Formula copywriting PAS adalah...", en: "The PAS copywriting formula is..." },
        options: [
          { id: "Price - Ads - Sales", en: "Price - Ads - Sales" },
          { id: "Problem - Agitation - Solution", en: "Problem - Agitation - Solution" },
          { id: "Product - Audience - Strategy", en: "Product - Audience - Strategy" },
          { id: "Post - Analyze - Share", en: "Post - Analyze - Share" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "digitalMarketing-m7",
      title: { id: "Mulai Iklan dengan Budget Kecil", en: "Start Ads on a Small Budget" },
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
          id: "digitalMarketing-m7l2",
          title: { id: "Pendalaman: Mulai Iklan dengan Budget Kecil", en: "Deep Dive: Start Ads on a Small Budget" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Mulai Iklan dengan Budget Kecil**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Start Ads on a Small Budget**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m7l3",
          title: { id: "Penerapan: Mulai Iklan dengan Budget Kecil", en: "Application: Start Ads on a Small Budget" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Mulai Iklan dengan Budget Kecil** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Start Ads on a Small Budget** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m7-cq1",
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
        id: "digitalMarketing-m7-cq2",
        question: { id: "Apa kepanjangan SEO?", en: "What does SEO stand for?" },
        options: [
          { id: "Social Engagement Optimization", en: "Social Engagement Optimization" },
          { id: "Search Engine Optimization", en: "Search Engine Optimization" },
          { id: "Sales Earning Operation", en: "Sales Earning Operation" },
          { id: "Site Entry Order", en: "Site Entry Order" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "digitalMarketing-m8",
      title: { id: "Video: Meta Ads untuk Pemula", en: "Video: Meta Ads for Beginners" },
      lessons: [
        {
            id: "dm-l8",
            title: { id: "Video: Meta Ads untuk Pemula", en: "Video: Meta Ads for Beginners" },
            type: "video",
            duration: 10,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/pNNKslGhFvk",
          },
        {
          id: "digitalMarketing-m8l2",
          title: { id: "Pendalaman: Video: Meta Ads untuk Pemula", en: "Deep Dive: Video: Meta Ads for Beginners" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Meta Ads untuk Pemula**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Meta Ads for Beginners**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m8l3",
          title: { id: "Penerapan: Video: Meta Ads untuk Pemula", en: "Application: Video: Meta Ads for Beginners" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Meta Ads untuk Pemula** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Meta Ads for Beginners** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m8-cq1",
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
        id: "digitalMarketing-m8-cq2",
        question: { id: "Apa itu backlink?", en: "What is a backlink?" },
        options: [
          { id: "Link ke belakang halaman", en: "A link to the back of a page" },
          { id: "Link dari website lain ke website kita", en: "A link from another website to ours" },
          { id: "Tombol kembali browser", en: "The browser back button" },
          { id: "Link internal website", en: "An internal website link" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "digitalMarketing-m9",
      title: { id: "Baca Data: Metrik Penting", en: "Reading Data: Key Metrics" },
      lessons: [
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
        {
          id: "digitalMarketing-m9l2",
          title: { id: "Pendalaman: Baca Data: Metrik Penting", en: "Deep Dive: Reading Data: Key Metrics" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Baca Data: Metrik Penting**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Reading Data: Key Metrics**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m9l3",
          title: { id: "Penerapan: Baca Data: Metrik Penting", en: "Application: Reading Data: Key Metrics" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Baca Data: Metrik Penting** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Reading Data: Key Metrics** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m9-cq1",
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
        id: "digitalMarketing-m9-cq2",
        question: { id: "ROAS 5x artinya...", en: "A 5x ROAS means..." },
        options: [
          { id: "Rugi 5 kali lipat", en: "Losing 5 times the money" },
          { id: "Setiap Rp1 iklan menghasilkan Rp5", en: "Every Rp1 of ads generates Rp5" },
          { id: "Iklan tayang 5 kali", en: "The ad showed 5 times" },
          { id: "5 orang membeli", en: "5 people bought" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "digitalMarketing-m10",
      title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
      lessons: [
        {
        id: "digitalMarketing-m10l1",
        title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Rangkai funnel, copywriting, SEO, dan iklan jadi satu strategi utuh.\n\n**Drill strategi mini (pilih 1 produk nyata di sekitarmu):**\n1. Gambar funnel-nya: apa konten awareness, consideration, dan conversion-nya\n2. Tulis 3 headline copywriting dengan formula AIDA\n3. Riset 5 keyword gratis untuk produk itu\n4. Rancang 1 kampanye iklan Rp 50.000: siapa targetnya, apa pesannya\n\nDrill ini mensimulasikan pekerjaan nyata digital marketer untuk satu produk.\n\n## Latihan Praktis\nKerjakan 4 langkah di atas untuk satu produk nyata, lalu minta teman menilai: mana yang paling meyakinkan dan mana yang lemah.",
          en: "Connect funnel, copywriting, SEO, and ads into one complete strategy.\n\n**Mini strategy drill (pick 1 real product around you):**\n1. Map its funnel: what is the awareness, consideration, and conversion content\n2. Write 3 copywriting headlines with the AIDA formula\n3. Research 5 free keywords for the product\n4. Design 1 IDR 50k ad campaign: who is the target, what is the message\n\nThis drill simulates a digital marketer's real work for one product.\n\n## Practical Exercise\nDo the 4 steps above for one real product, then ask a friend to judge: which is most convincing and which is weak.",
        },
        },
        {
          id: "digitalMarketing-m10l2",
          title: { id: "Pendalaman: Review & Drill Praktik", en: "Deep Dive: Review & Practice Drill" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Review & Drill Praktik**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Review & Practice Drill**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m10l3",
          title: { id: "Penerapan: Review & Drill Praktik", en: "Application: Review & Practice Drill" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Review & Drill Praktik** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Review & Practice Drill** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m10-cq1",
        question: { id: "Urutan tahapan marketing funnel yang benar adalah...", en: "The correct marketing funnel stage order is..." },
        options: [
          { id: "Conversion - consideration - awareness", en: "Conversion - consideration - awareness" },
          { id: "Awareness - consideration - conversion", en: "Awareness - consideration - conversion" },
          { id: "Consideration - awareness - conversion", en: "Consideration - awareness - conversion" },
          { id: "Awareness - conversion - consideration", en: "Awareness - conversion - consideration" },
        ],
        correctIndex: 1,
        explanation: { id: "Calon pelanggan harus sadar dulu, lalu mempertimbangkan, baru membeli.", en: "Prospects must become aware first, then consider, then buy." },
      },
      {
        id: "digitalMarketing-m10-cq2",
        question: { id: "Formula copywriting AIDA adalah...", en: "The AIDA copywriting formula is..." },
        options: [
          { id: "Attention, Interest, Desire, Action", en: "Attention, Interest, Desire, Action" },
          { id: "Action, Idea, Data, Analysis", en: "Action, Idea, Data, Analysis" },
          { id: "Aware, Inform, Decide, Ask", en: "Aware, Inform, Decide, Ask" },
          { id: "Attract, Invite, Deliver, Assess", en: "Attract, Invite, Deliver, Assess" },
        ],
        correctIndex: 0,
        explanation: { id: "AIDA: tarik perhatian, bangun minat, ciptakan keinginan, dorong aksi.", en: "AIDA: grab attention, build interest, create desire, drive action." },
      },
      ],
    },
    {
      id: "digitalMarketing-m11",
      title: { id: "Proyek Akhir: Kampanye Mini 2 Minggu", en: "Final Project: 2-Week Mini Campaign" },
      lessons: [
        {
        id: "digitalMarketing-m11l1",
        title: { id: "Proyek Akhir: Kampanye Mini 2 Minggu", en: "Final Project: 2-Week Mini Campaign" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Jalankan kampanye nyata berskala kecil untuk satu produk/jasa (milikmu, teman, atau UMKM).\n\n**Rencana 2 minggu:**\n- Minggu 1: terbitkan 3 konten organik sesuai funnel + pasang 1 iklan kecil (Rp 50-100 ribu)\n- Minggu 2: pantau metrik tiap 2 hari, matikan yang jelek, lanjutkan yang menang\n- Akhir periode: tulis laporan 1 halaman: jangkauan, klik, biaya per hasil\n\nInilah portofolio pertamamu sebagai digital marketer — lengkap dengan data nyata.\n\n## Latihan Praktis\nJalankan kampanyenya dan simpan screenshot dashboard iklan + laporan 1 halaman sebagai bukti portofolio.",
          en: "Run a real small-scale campaign for one product/service (yours, a friend's, or an SME's).\n\n**2-week plan:**\n- Week 1: publish 3 organic funnel contents + run 1 small ad (IDR 50-100k)\n- Week 2: monitor metrics every 2 days, kill the losers, scale the winner\n- End of period: write a 1-page report: reach, clicks, cost per result\n\nThis is your first portfolio as a digital marketer — complete with real data.\n\n## Practical Exercise\nRun the campaign and save the ads dashboard screenshots + 1-page report as portfolio proof.",
        },
        },
        {
          id: "digitalMarketing-m11l2",
          title: { id: "Pendalaman: Proyek Akhir: Kampanye Mini 2 Minggu", en: "Deep Dive: Final Project: 2-Week Mini Campaign" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Proyek Akhir: Kampanye Mini 2 Minggu**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Final Project: 2-Week Mini Campaign**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m11l3",
          title: { id: "Penerapan: Proyek Akhir: Kampanye Mini 2 Minggu", en: "Application: Final Project: 2-Week Mini Campaign" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Proyek Akhir: Kampanye Mini 2 Minggu** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Final Project: 2-Week Mini Campaign** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m11-cq1",
        question: { id: "Apa yang harus dilakukan pada iklan yang performanya buruk di minggu ke-2?", en: "What should be done with a poorly performing ad in week 2?" },
        options: [
          { id: "Tambah budgetnya", en: "Increase its budget" },
          { id: "Matikan dan alihkan budget ke yang menang", en: "Kill it and move budget to the winner" },
          { id: "Biarkan sampai habis", en: "Let it run out" },
          { id: "Hapus akun iklannya", en: "Delete the ads account" },
        ],
        correctIndex: 1,
        explanation: { id: "Prinsip optimasi: hentikan yang boros, gandakan yang efektif.", en: "Optimization principle: stop the wasteful, double down on what works." },
      },
      {
        id: "digitalMarketing-m11-cq2",
        question: { id: "Mengapa laporan kampanye penting untuk portofolio?", en: "Why is a campaign report important for a portfolio?" },
        options: [
          { id: "Supaya terlihat rajin", en: "To look diligent" },
          { id: "Membuktikan kamu bisa membaca data dan mengambil keputusan", en: "It proves you can read data and make decisions" },
          { id: "Agar bisa diprint", en: "So it can be printed" },
          { id: "Tidak penting", en: "It is not important" },
        ],
        correctIndex: 1,
        explanation: { id: "Klien/perusahaan menilai kemampuan analisis dari data nyata, bukan klaim.", en: "Clients/companies judge analytical ability from real data, not claims." },
      },
      ],
    },
    {
      id: "digitalMarketing-m12",
      title: { id: "Karier & Rate Card Digital Marketer", en: "Digital Marketer Career & Rate Card" },
      lessons: [
        {
        id: "digitalMarketing-m12l1",
        title: { id: "Karier & Rate Card Digital Marketer", en: "Digital Marketer Career & Rate Card" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Digital marketing punya banyak spesialisasi — pilih satu untuk didalami dulu.\n\n**Jalur karier umum:**\n- **Performance marketer**: fokus iklan berbayar & ROI (paling dicari, gaji tinggi)\n- **SEO specialist**: traffik organik jangka panjang\n- **Content/organic marketer**: konten & komunitas\n- **Generalist UMKM**: pegang semua untuk bisnis kecil, fee Rp 1-3 juta/akun/bulan\n\n**Strategi masuk pasar:** mulai sebagai generalist UMKM untuk mengumpulkan 2-3 studi kasus, lalu spesialisasi sesuai hasil terbaikmu.\n\n## Latihan Praktis\nTentukan spesialisasi targetmu, buat rate card sederhana (3 paket harga), dan siapkan 1 studi kasus dari proyek akhirmu.",
          en: "Digital marketing has many specializations — pick one to master first.\n\n**Common career paths:**\n- **Performance marketer**: focus on paid ads & ROI (most in-demand, high pay)\n- **SEO specialist**: long-term organic traffic\n- **Content/organic marketer**: content & community\n- **SME generalist**: handle everything for small businesses, IDR 1-3 million/account/month\n\n**Market entry strategy:** start as an SME generalist to collect 2-3 case studies, then specialize based on your best results.\n\n## Practical Exercise\nDefine your target specialization, make a simple rate card (3 pricing packages), and prepare 1 case study from your final project.",
        },
        },
        {
          id: "digitalMarketing-m12l2",
          title: { id: "Pendalaman: Karier & Rate Card Digital Marketer", en: "Deep Dive: Digital Marketer Career & Rate Card" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Karier & Rate Card Digital Marketer**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Digital Marketer Career & Rate Card**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "digitalMarketing-m12l3",
          title: { id: "Penerapan: Karier & Rate Card Digital Marketer", en: "Application: Digital Marketer Career & Rate Card" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Karier & Rate Card Digital Marketer** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Digital Marketer Career & Rate Card** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "digitalMarketing-m12-cq1",
        question: { id: "Strategi terbaik pemula masuk pasar digital marketing adalah...", en: "The best strategy for a beginner entering the digital marketing market is..." },
        options: [
          { id: "Langsung jadi spesialis tanpa portofolio", en: "Immediately specializing without a portfolio" },
          { id: "Mulai sebagai generalist UMKM, kumpulkan studi kasus, lalu spesialisasi", en: "Starting as an SME generalist, collecting case studies, then specializing" },
          { id: "Menunggu tawaran datang", en: "Waiting for offers to come" },
          { id: "Kerja gratis selamanya", en: "Working for free forever" },
        ],
        correctIndex: 1,
        explanation: { id: "Studi kasus nyata dari klien kecil membuka jalan ke spesialisasi bergaji lebih tinggi.", en: "Real case studies from small clients open the path to higher-paying specialization." },
      },
      {
        id: "digitalMarketing-m12-cq2",
        question: { id: "Spesialisasi yang paling dicari dengan gaji tertinggi umumnya adalah...", en: "The specialization generally most in-demand with the highest pay is..." },
        options: [
          { id: "Admin sosial media", en: "Social media admin" },
          { id: "Performance marketer (iklan & ROI)", en: "Performance marketer (ads & ROI)" },
          { id: "Penulis blog", en: "Blog writer" },
          { id: "Desainer feed", en: "Feed designer" },
        ],
        correctIndex: 1,
        explanation: { id: "Kemampuan menghasilkan ROI dari iklan berbayar berdampak langsung ke revenue bisnis.", en: "The ability to generate ROI from paid ads directly impacts business revenue." },
      },
      ],
    },
  ],
  quiz: [
  {
    id: "digitalMarketing-q1",
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
    id: "digitalMarketing-q2",
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
    id: "digitalMarketing-q3",
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
    id: "digitalMarketing-q4",
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
    id: "digitalMarketing-q5",
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
    id: "digitalMarketing-q6",
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
    id: "digitalMarketing-q7",
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
    id: "digitalMarketing-q8",
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
    id: "digitalMarketing-q9",
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
    id: "digitalMarketing-q10",
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
