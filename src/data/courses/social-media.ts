import type { Course } from "../types";

export const socialMedia: Course = {
  id: "social-media-manager",
  title: { id: "Social Media Manager", en: "Social Media Manager" },
  description: {
    id: "Kelola media sosial brand: strategi, konten, komunitas, dan laporan.",
    en: "Manage brand social media: strategy, content, community, and reporting.",
  },
  longDescription: {
    id: "Belajar mengelola media sosial secara profesional: menyusun strategi, content pillar, community management, handling krisis, sampai membuat laporan untuk klien atau perusahaan.",
    en: "Learn to manage social media professionally: strategy building, content pillars, community management, crisis handling, and reporting for clients or companies.",
  },
  category: "marketing",
  difficulty: "intermediate",
  icon: "Share2",
  color: "#EC4899",
  salary: { id: "Rp 4 - 9 juta/bulan", en: "$280 - $650/month" },
  demand: "Tinggi",
  passScore: 70,
  modules: [
    {
      id: "socialMedia-m1",
      title: { id: "Content Pillar: Fondasi Strategi", en: "Content Pillars: Strategy Foundation" },
      lessons: [
        {
            id: "sm-l1",
            title: { id: "Content Pillar: Fondasi Strategi", en: "Content Pillars: Strategy Foundation" },
            type: "text",
            duration: 6,
            xp: 20,
            body: {
              id: "**Content pillar** = 3-5 topik utama yang konsisten diposting.\n\n**Contoh untuk brand kopi:**\n1. Edukasi (cara seduh, jenis biji)\n2. Produk (menu baru, promo)\n3. Komunitas (repost pelanggan, event)\n4. Hiburan (meme kopi, tren)\n\n**Aturan 80/20**: 80% konten bermanfaat/menghibur, 20% jualan. Akun yang isinya jualan semua akan ditinggal followers.",
              en: "**Content pillars** = 3-5 main topics you consistently post about.\n\n**Example for a coffee brand:**\n1. Education (brewing methods, bean types)\n2. Product (new menu, promos)\n3. Community (customer reposts, events)\n4. Entertainment (coffee memes, trends)\n\n**The 80/20 rule**: 80% valuable/entertaining content, 20% selling. Accounts that only sell get unfollowed.",
            },
          },
        {
          id: "socialMedia-m1l2",
          title: { id: "Pendalaman: Content Pillar: Fondasi Strategi", en: "Deep Dive: Content Pillars: Strategy Foundation" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Content Pillar: Fondasi Strategi**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Content Pillars: Strategy Foundation**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m1l3",
          title: { id: "Penerapan: Content Pillar: Fondasi Strategi", en: "Application: Content Pillars: Strategy Foundation" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Content Pillar: Fondasi Strategi** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Content Pillars: Strategy Foundation** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m1-cq1",
        question: { id: "Apa itu content pillar?", en: "What are content pillars?" },
        options: [
          { id: "Pilar di studio foto", en: "Pillars in a photo studio" },
          { id: "3-5 topik utama yang konsisten diposting", en: "3-5 main topics posted consistently" },
          { id: "Konten paling viral", en: "The most viral content" },
          { id: "Jumlah posting per hari", en: "Number of posts per day" },
        ],
        correctIndex: 1,
      },
      {
        id: "socialMedia-m1-cq2",
        question: { id: "Aturan 80/20 dalam konten media sosial artinya...", en: "The 80/20 rule in social media content means..." },
        options: [
          { id: "80% jualan, 20% edukasi", en: "80% selling, 20% education" },
          { id: "80% konten bermanfaat, 20% jualan", en: "80% valuable content, 20% selling" },
          { id: "80% video, 20% foto", en: "80% video, 20% photos" },
          { id: "80% hashtag, 20% caption", en: "80% hashtags, 20% caption" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "socialMedia-m2",
      title: { id: "Video: Audit Akun Instagram", en: "Video: Instagram Account Audit" },
      lessons: [
        {
            id: "sm-l2",
            title: { id: "Video: Audit Akun Instagram", en: "Video: Instagram Account Audit" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/4iJKNyKBgfA",
          },
        {
          id: "socialMedia-m2l2",
          title: { id: "Pendalaman: Video: Audit Akun Instagram", en: "Deep Dive: Video: Instagram Account Audit" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Audit Akun Instagram**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Instagram Account Audit**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m2l3",
          title: { id: "Penerapan: Video: Audit Akun Instagram", en: "Application: Video: Instagram Account Audit" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Audit Akun Instagram** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Instagram Account Audit** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m2-cq1",
        question: { id: "Platform dengan jangkauan organik terbesar saat ini adalah...", en: "The platform with the biggest organic reach today is..." },
        options: [
          { id: "Facebook", en: "Facebook" },
          { id: "LinkedIn", en: "LinkedIn" },
          { id: "TikTok", en: "TikTok" },
          { id: "Twitter/X", en: "Twitter/X" },
        ],
        correctIndex: 2,
      },
      {
        id: "socialMedia-m2-cq2",
        question: { id: "Berapa waktu ideal membalas komentar?", en: "What is the ideal time to reply to comments?" },
        options: [
          { id: "Kurang dari 1 jam", en: "Less than 1 hour" },
          { id: "1 minggu", en: "1 week" },
          { id: "1 bulan", en: "1 month" },
          { id: "Tidak perlu dibalas", en: "No need to reply" },
        ],
        correctIndex: 0,
      },
      ],
    },
    {
      id: "socialMedia-m3",
      title: { id: "Kartu: Kenali Platformmu", en: "Cards: Know Your Platforms" },
      lessons: [
        {
            id: "sm-l3",
            title: { id: "Kartu: Kenali Platformmu", en: "Cards: Know Your Platforms" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "Instagram", en: "Instagram" },
                back: {
                  id: "Visual estetik + Reels. Kuat untuk brand lifestyle, F&B, fashion. Usia 18-34.",
                  en: "Aesthetic visuals + Reels. Strong for lifestyle, F&B, fashion brands. Ages 18-34.",
                },
              },
              {
                front: { id: "TikTok", en: "TikTok" },
                back: {
                  id: "Video pendek autentik, tidak perlu sempurna. Jangkauan organik terbesar. Usia 16-30.",
                  en: "Short authentic videos, perfection not needed. Biggest organic reach. Ages 16-30.",
                },
              },
              {
                front: { id: "LinkedIn", en: "LinkedIn" },
                back: {
                  id: "Konten profesional & B2B. Personal branding karier. Usia 25-45.",
                  en: "Professional & B2B content. Career personal branding. Ages 25-45.",
                },
              },
            ],
          },
        {
          id: "socialMedia-m3l2",
          title: { id: "Pendalaman: Kartu: Kenali Platformmu", en: "Deep Dive: Cards: Know Your Platforms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Kenali Platformmu**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Know Your Platforms**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m3l3",
          title: { id: "Penerapan: Kartu: Kenali Platformmu", en: "Application: Cards: Know Your Platforms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Kenali Platformmu** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Know Your Platforms** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m3-cq1",
        question: { id: "Cara terbaik menangani komentar negatif adalah...", en: "The best way to handle negative comments is..." },
        options: [
          { id: "Hapus semuanya", en: "Delete them all" },
          { id: "Balas dengan emosi", en: "Reply emotionally" },
          { id: "Tanggapi tenang dan ajak ke DM", en: "Respond calmly and move to DM" },
          { id: "Biarkan menumpuk", en: "Let them pile up" },
        ],
        correctIndex: 2,
      },
      {
        id: "socialMedia-m3-cq2",
        question: { id: "Apa itu golden hour dalam manajemen krisis?", en: "What is the golden hour in crisis management?" },
        options: [
          { id: "Jam posting terbaik", en: "The best posting hour" },
          { id: "1-2 jam pertama krisis yang menentukan", en: "The critical first 1-2 hours of a crisis" },
          { id: "Waktu foto terbaik", en: "The best photo time" },
          { id: "Jam istirahat admin", en: "Admin's break time" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "socialMedia-m4",
      title: { id: "Seni Membalas Komentar & DM", en: "The Art of Replying to Comments & DMs" },
      lessons: [
        {
            id: "sm-l4",
            title: { id: "Seni Membalas Komentar & DM", en: "The Art of Replying to Comments & DMs" },
            type: "text",
            duration: 6,
            xp: 25,
            body: {
              id: "Balasan komentar adalah etalase brand.\n\n**Panduan:**\n- Balas cepat: komentar < 1 jam, DM < 3 jam\n- Pakai nada sesuai brand persona (formal/santai)\n- Komentar positif: apresiasi dengan personal, bukan template\n- Komentar negatif: jangan hapus (kecuali SARA/spam), tanggapi tenang, ajak ke DM\n\n**Komentar yang dibalas** = sinyal ke algoritma bahwa kontenmu hidup.",
              en: "Comment replies are the brand's storefront.\n\n**Guidelines:**\n- Reply fast: comments < 1 hour, DMs < 3 hours\n- Match the brand persona's tone (formal/casual)\n- Positive comments: appreciate personally, not with templates\n- Negative comments: don't delete (unless hate speech/spam), respond calmly, move to DM\n\n**Replied comments** = a signal to the algorithm that your content is alive.",
            },
          },
        {
          id: "socialMedia-m4l2",
          title: { id: "Pendalaman: Seni Membalas Komentar & DM", en: "Deep Dive: The Art of Replying to Comments & DMs" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Seni Membalas Komentar & DM**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **The Art of Replying to Comments & DMs**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m4l3",
          title: { id: "Penerapan: Seni Membalas Komentar & DM", en: "Application: The Art of Replying to Comments & DMs" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Seni Membalas Komentar & DM** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **The Art of Replying to Comments & DMs** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m4-cq1",
        question: { id: "Metrik paling penting untuk mengukur kesehatan akun adalah...", en: "The most important metric for account health is..." },
        options: [
          { id: "Jumlah followers", en: "Follower count" },
          { id: "Engagement rate", en: "Engagement rate" },
          { id: "Jumlah posting", en: "Post count" },
          { id: "Umur akun", en: "Account age" },
        ],
        correctIndex: 1,
      },
      {
        id: "socialMedia-m4-cq2",
        question: { id: "Engagement rate yang sehat umumnya...", en: "A healthy engagement rate is generally..." },
        options: [
          { id: "0.01%", en: "0.01%" },
          { id: "1-5%", en: "1-5%" },
          { id: "50%", en: "50%" },
          { id: "100%", en: "100%" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "socialMedia-m5",
      title: { id: "Video: Menangani Krisis Medsos", en: "Video: Handling a Social Media Crisis" },
      lessons: [
        {
            id: "sm-l5",
            title: { id: "Video: Menangani Krisis Medsos", en: "Video: Handling a Social Media Crisis" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/3VJgYOrlCuc",
          },
        {
          id: "socialMedia-m5l2",
          title: { id: "Pendalaman: Video: Menangani Krisis Medsos", en: "Deep Dive: Video: Handling a Social Media Crisis" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Menangani Krisis Medsos**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Handling a Social Media Crisis**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m5l3",
          title: { id: "Penerapan: Video: Menangani Krisis Medsos", en: "Application: Video: Handling a Social Media Crisis" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Menangani Krisis Medsos** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Handling a Social Media Crisis** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m5-cq1",
        question: { id: "Tanda konten benar-benar berharga bagi audiens adalah...", en: "The sign content is truly valuable to audiences is..." },
        options: [
          { id: "Banyak saves dan shares", en: "Many saves and shares" },
          { id: "Banyak bot yang like", en: "Many bot likes" },
          { id: "Diposting tengah malam", en: "Posted at midnight" },
          { id: "Caption panjang", en: "Long captions" },
        ],
        correctIndex: 0,
      },
      {
        id: "socialMedia-m5-cq2",
        question: { id: "Tools scheduling gratis untuk IG/FB dari Meta adalah...", en: "Meta's free scheduling tool for IG/FB is..." },
        options: [
          { id: "Hootsuite", en: "Hootsuite" },
          { id: "Meta Business Suite", en: "Meta Business Suite" },
          { id: "Photoshop", en: "Photoshop" },
          { id: "Excel", en: "Excel" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "socialMedia-m6",
      title: { id: "Kartu: Manajemen Krisis", en: "Cards: Crisis Management" },
      lessons: [
        {
            id: "sm-l6",
            title: { id: "Kartu: Manajemen Krisis", en: "Cards: Crisis Management" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "Golden Hour", en: "Golden Hour" },
                back: {
                  id: "1-2 jam pertama saat krisis viral. Respons cepat menentukan apakah api padam atau membesar.",
                  en: "The first 1-2 hours of a viral crisis. A fast response determines if the fire dies or spreads.",
                },
              },
              {
                front: { id: "Acknowledge - Apologize - Act", en: "Acknowledge - Apologize - Act" },
                back: {
                  id: "Akui masalah, minta maaf tulus, umumkan tindakan nyata. Jangan defensif atau menyalahkan.",
                  en: "Acknowledge the issue, sincerely apologize, announce real action. Never be defensive or blame.",
                },
              },
              {
                front: { id: "Jangan Pernah...", en: "Never Ever..." },
                back: {
                  id: "Menghapus komentar kritis massal, mematikan kolom komentar, atau berdebat dengan netizen.",
                  en: "Mass-delete critical comments, turn off comments, or argue with netizens.",
                },
              },
            ],
          },
        {
          id: "socialMedia-m6l2",
          title: { id: "Pendalaman: Kartu: Manajemen Krisis", en: "Deep Dive: Cards: Crisis Management" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Manajemen Krisis**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Crisis Management**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m6l3",
          title: { id: "Penerapan: Kartu: Manajemen Krisis", en: "Application: Cards: Crisis Management" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Manajemen Krisis** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Crisis Management** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m6-cq1",
        question: { id: "Apa itu content pillar?", en: "What are content pillars?" },
        options: [
          { id: "Pilar di studio foto", en: "Pillars in a photo studio" },
          { id: "3-5 topik utama yang konsisten diposting", en: "3-5 main topics posted consistently" },
          { id: "Konten paling viral", en: "The most viral content" },
          { id: "Jumlah posting per hari", en: "Number of posts per day" },
        ],
        correctIndex: 1,
      },
      {
        id: "socialMedia-m6-cq2",
        question: { id: "Aturan 80/20 dalam konten media sosial artinya...", en: "The 80/20 rule in social media content means..." },
        options: [
          { id: "80% jualan, 20% edukasi", en: "80% selling, 20% education" },
          { id: "80% konten bermanfaat, 20% jualan", en: "80% valuable content, 20% selling" },
          { id: "80% video, 20% foto", en: "80% video, 20% photos" },
          { id: "80% hashtag, 20% caption", en: "80% hashtags, 20% caption" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "socialMedia-m7",
      title: { id: "Metrik yang Benar-Benar Penting", en: "Metrics That Actually Matter" },
      lessons: [
        {
            id: "sm-l7",
            title: { id: "Metrik yang Benar-Benar Penting", en: "Metrics That Actually Matter" },
            type: "text",
            duration: 6,
            xp: 25,
            body: {
              id: "Followers adalah vanity metric. Yang penting:\n\n- **Engagement rate**: (interaksi ÷ reach) × 100%. Sehat: 1-5%\n- **Reach**: berapa banyak akun unik melihat kontenmu\n- **Saves & shares**: tanda konten benar-benar berharga\n- **Conversion**: klik link, DM masuk, penjualan\n\n**Benchmark**: bandingkan dengan performa akunmu sendiri bulan lalu, bukan dengan akun lain.",
              en: "Followers are a vanity metric. What matters:\n\n- **Engagement rate**: (interactions ÷ reach) × 100%. Healthy: 1-5%\n- **Reach**: how many unique accounts saw your content\n- **Saves & shares**: signs your content is truly valuable\n- **Conversion**: link clicks, DMs, sales\n\n**Benchmark**: compare with your own account's performance last month, not with other accounts.",
            },
          },
        {
          id: "socialMedia-m7l2",
          title: { id: "Pendalaman: Metrik yang Benar-Benar Penting", en: "Deep Dive: Metrics That Actually Matter" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Metrik yang Benar-Benar Penting**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Metrics That Actually Matter**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m7l3",
          title: { id: "Penerapan: Metrik yang Benar-Benar Penting", en: "Application: Metrics That Actually Matter" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Metrik yang Benar-Benar Penting** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Metrics That Actually Matter** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m7-cq1",
        question: { id: "Platform dengan jangkauan organik terbesar saat ini adalah...", en: "The platform with the biggest organic reach today is..." },
        options: [
          { id: "Facebook", en: "Facebook" },
          { id: "LinkedIn", en: "LinkedIn" },
          { id: "TikTok", en: "TikTok" },
          { id: "Twitter/X", en: "Twitter/X" },
        ],
        correctIndex: 2,
      },
      {
        id: "socialMedia-m7-cq2",
        question: { id: "Berapa waktu ideal membalas komentar?", en: "What is the ideal time to reply to comments?" },
        options: [
          { id: "Kurang dari 1 jam", en: "Less than 1 hour" },
          { id: "1 minggu", en: "1 week" },
          { id: "1 bulan", en: "1 month" },
          { id: "Tidak perlu dibalas", en: "No need to reply" },
        ],
        correctIndex: 0,
      },
      ],
    },
    {
      id: "socialMedia-m8",
      title: { id: "Video: Bikin Laporan Bulanan", en: "Video: Building Monthly Reports" },
      lessons: [
        {
            id: "sm-l8",
            title: { id: "Video: Bikin Laporan Bulanan", en: "Video: Building Monthly Reports" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/YA1lOJCV8YM",
          },
        {
          id: "socialMedia-m8l2",
          title: { id: "Pendalaman: Video: Bikin Laporan Bulanan", en: "Deep Dive: Video: Building Monthly Reports" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Bikin Laporan Bulanan**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Building Monthly Reports**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m8l3",
          title: { id: "Penerapan: Video: Bikin Laporan Bulanan", en: "Application: Video: Building Monthly Reports" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Bikin Laporan Bulanan** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Building Monthly Reports** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m8-cq1",
        question: { id: "Cara terbaik menangani komentar negatif adalah...", en: "The best way to handle negative comments is..." },
        options: [
          { id: "Hapus semuanya", en: "Delete them all" },
          { id: "Balas dengan emosi", en: "Reply emotionally" },
          { id: "Tanggapi tenang dan ajak ke DM", en: "Respond calmly and move to DM" },
          { id: "Biarkan menumpuk", en: "Let them pile up" },
        ],
        correctIndex: 2,
      },
      {
        id: "socialMedia-m8-cq2",
        question: { id: "Apa itu golden hour dalam manajemen krisis?", en: "What is the golden hour in crisis management?" },
        options: [
          { id: "Jam posting terbaik", en: "The best posting hour" },
          { id: "1-2 jam pertama krisis yang menentukan", en: "The critical first 1-2 hours of a crisis" },
          { id: "Waktu foto terbaik", en: "The best photo time" },
          { id: "Jam istirahat admin", en: "Admin's break time" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "socialMedia-m9",
      title: { id: "Tools Gratis Social Media Manager", en: "Free Tools for Social Media Managers" },
      lessons: [
        {
            id: "sm-l9",
            title: { id: "Tools Gratis Social Media Manager", en: "Free Tools for Social Media Managers" },
            type: "text",
            duration: 5,
            xp: 20,
            body: {
              id: "Toolkit SMM pemula (semua gratis):\n\n- **Desain**: Canva\n- **Scheduling**: Meta Business Suite (IG/FB), TikTok Studio\n- **Analitik**: Insight bawaan platform\n- **Riset tren**: TikTok Creative Center, Google Trends\n- **Link bio**: Linktree\n\nKuasai tools ini dan kamu sudah siap menangani klien UMKM pertamamu.",
              en: "Beginner SMM toolkit (all free):\n\n- **Design**: Canva\n- **Scheduling**: Meta Business Suite (IG/FB), TikTok Studio\n- **Analytics**: Built-in platform insights\n- **Trend research**: TikTok Creative Center, Google Trends\n- **Bio link**: Linktree\n\nMaster these tools and you're ready for your first SME client.",
            },
          },
        {
          id: "socialMedia-m9l2",
          title: { id: "Pendalaman: Tools Gratis Social Media Manager", en: "Deep Dive: Free Tools for Social Media Managers" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Tools Gratis Social Media Manager**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Free Tools for Social Media Managers**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m9l3",
          title: { id: "Penerapan: Tools Gratis Social Media Manager", en: "Application: Free Tools for Social Media Managers" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Tools Gratis Social Media Manager** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Free Tools for Social Media Managers** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m9-cq1",
        question: { id: "Metrik paling penting untuk mengukur kesehatan akun adalah...", en: "The most important metric for account health is..." },
        options: [
          { id: "Jumlah followers", en: "Follower count" },
          { id: "Engagement rate", en: "Engagement rate" },
          { id: "Jumlah posting", en: "Post count" },
          { id: "Umur akun", en: "Account age" },
        ],
        correctIndex: 1,
      },
      {
        id: "socialMedia-m9-cq2",
        question: { id: "Engagement rate yang sehat umumnya...", en: "A healthy engagement rate is generally..." },
        options: [
          { id: "0.01%", en: "0.01%" },
          { id: "1-5%", en: "1-5%" },
          { id: "50%", en: "50%" },
          { id: "100%", en: "100%" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "socialMedia-m10",
      title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
      lessons: [
        {
        id: "socialMedia-m10l1",
        title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Rangkai content pillar, engagement, dan metrik menjadi satu rutinitas kerja mingguan.\n\n**Simulasi 1 minggu kerja Social Media Manager:**\n- Senin: audit akun — bio, feed 12 terakhir, highlight\n- Selasa: susun 7 ide konten dari 3-4 content pillar\n- Rabu-Kamis: produksi & jadwalkan konten\n- Jumat: balas semua komentar & DM dengan template personal\n- Sabtu: catat metrik mingguan: reach, engagement rate, follower growth\n\nRutinitas ini adalah gambaran nyata pekerjaanmu nanti.\n\n## Latihan Praktis\nJalankan simulasinya pada 1 akun nyata (milikmu atau bisnis teman) selama seminggu penuh.",
          en: "Connect content pillars, engagement, and metrics into one weekly work routine.\n\n**1-week Social Media Manager simulation:**\n- Monday: account audit — bio, last 12 feed posts, highlights\n- Tuesday: draft 7 content ideas from 3-4 content pillars\n- Wednesday-Thursday: produce & schedule content\n- Friday: reply to all comments & DMs with personal templates\n- Saturday: record weekly metrics: reach, engagement rate, follower growth\n\nThis routine is a real picture of your future job.\n\n## Practical Exercise\nRun the simulation on 1 real account (yours or a friend's business) for a full week.",
        },
        },
        {
          id: "socialMedia-m10l2",
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
          id: "socialMedia-m10l3",
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
        id: "socialMedia-m10-cq1",
        question: { id: "Content pillar berfungsi untuk...", en: "Content pillars function to..." },
        options: [
          { id: "Mengisi feed secara acak", en: "Filling the feed randomly" },
          { id: "Menjaga konten tetap fokus dan konsisten", en: "Keeping content focused and consistent" },
          { id: "Memperbanyak hashtag", en: "Adding more hashtags" },
          { id: "Menghapus konten lama", en: "Deleting old content" },
        ],
        correctIndex: 1,
        explanation: { id: "Pillar adalah tema besar yang memastikan semua konten relevan dengan positioning akun.", en: "Pillars are big themes ensuring all content stays relevant to the account's positioning." },
      },
      {
        id: "socialMedia-m10-cq2",
        question: { id: "Metrik yang paling menunjukkan kualitas hubungan dengan audiens adalah...", en: "The metric that best shows audience relationship quality is..." },
        options: [
          { id: "Jumlah followers", en: "Follower count" },
          { id: "Engagement rate", en: "Engagement rate" },
          { id: "Jumlah postingan", en: "Number of posts" },
          { id: "Umur akun", en: "Account age" },
        ],
        correctIndex: 1,
        explanation: { id: "Engagement rate mengukur seberapa peduli audiens, bukan sekadar seberapa banyak.", en: "Engagement rate measures how much the audience cares, not just how many." },
      },
      ],
    },
    {
      id: "socialMedia-m11",
      title: { id: "Proyek Akhir: Kelola 1 Akun 14 Hari", en: "Final Project: Manage 1 Account for 14 Days" },
      lessons: [
        {
        id: "socialMedia-m11l1",
        title: { id: "Proyek Akhir: Kelola 1 Akun 14 Hari", en: "Final Project: Manage 1 Account for 14 Days" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Proyek terbesarmu: kelola 1 akun sosial media bisnis selama 14 hari penuh.\n\n**Deliverable:**\n1. Audit awal + rekomendasi (dokumen 1 halaman)\n2. 6 konten terbit sesuai content pillar\n3. Balasan komentar/DM terdokumentasi\n4. Laporan akhir: perbandingan metrik sebelum-sesudah + 3 rekomendasi bulan berikutnya\n\nProyek ini persis seperti pekerjaan Social Media Manager profesional — dan bisa langsung jadi studi kasus portofolio.\n\n## Latihan Praktis\nTawarkan proyek ini gratis ke 1 UMKM dengan syarat kamu boleh memakai hasilnya sebagai portofolio. Menang-menang.",
          en: "Your biggest project: manage 1 business social media account for a full 14 days.\n\n**Deliverables:**\n1. Initial audit + recommendations (1-page document)\n2. 6 published contents following content pillars\n3. Documented comment/DM replies\n4. Final report: before-after metric comparison + 3 recommendations for next month\n\nThis project is exactly like a professional Social Media Manager's work — and can directly become a portfolio case study.\n\n## Practical Exercise\nOffer this project for free to 1 SME on the condition you may use the results as portfolio. Win-win.",
        },
        },
        {
          id: "socialMedia-m11l2",
          title: { id: "Pendalaman: Proyek Akhir: Kelola 1 Akun 14 Hari", en: "Deep Dive: Final Project: Manage 1 Account for 14 Days" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Proyek Akhir: Kelola 1 Akun 14 Hari**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Final Project: Manage 1 Account for 14 Days**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m11l3",
          title: { id: "Penerapan: Proyek Akhir: Kelola 1 Akun 14 Hari", en: "Application: Final Project: Manage 1 Account for 14 Days" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Proyek Akhir: Kelola 1 Akun 14 Hari** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Final Project: Manage 1 Account for 14 Days** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m11-cq1",
        question: { id: "Mengapa proyek 14 hari cocok dijadikan studi kasus portofolio?", en: "Why is the 14-day project suitable as a portfolio case study?" },
        options: [
          { id: "Karena gratis", en: "Because it is free" },
          { id: "Menunjukkan proses lengkap: audit, eksekusi, dan hasil terukur", en: "It shows the complete process: audit, execution, and measurable results" },
          { id: "Karena hanya 2 minggu", en: "Because it is only 2 weeks" },
          { id: "Supaya dapat followers", en: "To gain followers" },
        ],
        correctIndex: 1,
        explanation: { id: "Klien masa depan ingin melihat proses kerja dan bukti hasil, bukan sekadar klaim kemampuan.", en: "Future clients want to see work process and proof of results, not just claims of ability." },
      },
      {
        id: "socialMedia-m11-cq2",
        question: { id: "Isi laporan akhir yang paling penting bagi klien adalah...", en: "The most important final report content for a client is..." },
        options: [
          { id: "Daftar semua postingan", en: "A list of all posts" },
          { id: "Perbandingan metrik sebelum-sesudah + rekomendasi", en: "Before-after metric comparison + recommendations" },
          { id: "Curahan hati admin", en: "The admin's feelings" },
          { id: "Screenshot semua komentar", en: "Screenshots of all comments" },
        ],
        correctIndex: 1,
        explanation: { id: "Data perubahan dan langkah lanjutan adalah bukti nilai kerjamu yang nyata.", en: "Change data and next steps are real proof of your work's value." },
      },
      ],
    },
    {
      id: "socialMedia-m12",
      title: { id: "Karier Social Media Manager & Negosiasi Fee", en: "Social Media Manager Career & Fee Negotiation" },
      lessons: [
        {
        id: "socialMedia-m12l1",
        title: { id: "Karier Social Media Manager & Negosiasi Fee", en: "Social Media Manager Career & Fee Negotiation" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Saatnya mengubah skill menjadi penghasilan berkelanjutan.\n\n**Model penghasilan SMM:**\n- **Retainer bulanan**: Rp 1,5-4 juta/akun (12-16 konten + engagement + laporan)\n- **Proyek campaign**: fee per kampanye tertentu\n- **Full-time agency/brand**: gaji Rp 4-8 juta untuk pemula\n\n**Cara negosiasi fee:** jangan buka dengan harga — buka dengan hasil. Tunjukkan studi kasus 14 harimu, jelaskan potensi angkanya, baru tawarkan 3 paket (basic/standard/premium) agar klien memilih, bukan menawar.\n\n## Latihan Praktis\nBuat rate card 3 paket dan kirim penawaran ke 5 bisnis lokal dengan melampirkan studi kasus proyek akhirmu.",
          en: "Time to turn skill into sustainable income.\n\n**SMM income models:**\n- **Monthly retainer**: IDR 1.5-4 million/account (12-16 contents + engagement + report)\n- **Campaign project**: fee per specific campaign\n- **Full-time agency/brand**: IDR 4-8 million salary for beginners\n\n**How to negotiate fees:** don't open with price — open with results. Show your 14-day case study, explain the potential numbers, then offer 3 packages (basic/standard/premium) so the client chooses instead of bargaining.\n\n## Practical Exercise\nMake a 3-package rate card and send offers to 5 local businesses with your final project case study attached.",
        },
        },
        {
          id: "socialMedia-m12l2",
          title: { id: "Pendalaman: Karier Social Media Manager & Negosiasi Fee", en: "Deep Dive: Social Media Manager Career & Fee Negotiation" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Karier Social Media Manager & Negosiasi Fee**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Social Media Manager Career & Fee Negotiation**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "socialMedia-m12l3",
          title: { id: "Penerapan: Karier Social Media Manager & Negosiasi Fee", en: "Application: Social Media Manager Career & Fee Negotiation" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Karier Social Media Manager & Negosiasi Fee** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Social Media Manager Career & Fee Negotiation** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "socialMedia-m12-cq1",
        question: { id: "Strategi negosiasi fee yang paling efektif adalah...", en: "The most effective fee negotiation strategy is..." },
        options: [
          { id: "Buka dengan harga termurah", en: "Opening with the cheapest price" },
          { id: "Tunjukkan hasil dulu, lalu tawarkan paket pilihan", en: "Show results first, then offer package options" },
          { id: "Bilang 'terserah klien'", en: "Saying 'up to the client'" },
          { id: "Menolak semua negosiasi", en: "Rejecting all negotiation" },
        ],
        correctIndex: 1,
        explanation: { id: "Bukti hasil menggeser pembicaraan dari 'berapa biaya' menjadi 'berapa nilai'.", en: "Proof of results shifts the conversation from 'how much does it cost' to 'how much is it worth'." },
      },
      {
        id: "socialMedia-m12-cq2",
        question: { id: "Mengapa menawarkan 3 paket lebih baik daripada 1 harga?", en: "Why is offering 3 packages better than 1 price?" },
        options: [
          { id: "Supaya terlihat rumit", en: "To look complicated" },
          { id: "Klien memilih paket, bukan menawar harga", en: "The client picks a package instead of bargaining" },
          { id: "Agar bisa menolak klien", en: "So you can reject clients" },
          { id: "Tidak ada bedanya", en: "There is no difference" },
        ],
        correctIndex: 1,
        explanation: { id: "Pilihan paket memindahkan keputusan klien dari 'ambil atau tidak' menjadi 'ambil yang mana'.", en: "Package options move the client's decision from 'take it or not' to 'which one to take'." },
      },
      ],
    },
  ],
  quiz: [
  {
    id: "socialMedia-q1",
    question: { id: "Apa itu content pillar?", en: "What are content pillars?" },
    options: [
      { id: "Pilar di studio foto", en: "Pillars in a photo studio" },
      { id: "3-5 topik utama yang konsisten diposting", en: "3-5 main topics posted consistently" },
      { id: "Konten paling viral", en: "The most viral content" },
      { id: "Jumlah posting per hari", en: "Number of posts per day" },
    ],
    correctIndex: 1,
  },
  {
    id: "socialMedia-q2",
    question: { id: "Aturan 80/20 dalam konten media sosial artinya...", en: "The 80/20 rule in social media content means..." },
    options: [
      { id: "80% jualan, 20% edukasi", en: "80% selling, 20% education" },
      { id: "80% konten bermanfaat, 20% jualan", en: "80% valuable content, 20% selling" },
      { id: "80% video, 20% foto", en: "80% video, 20% photos" },
      { id: "80% hashtag, 20% caption", en: "80% hashtags, 20% caption" },
    ],
    correctIndex: 1,
  },
  {
    id: "socialMedia-q3",
    question: { id: "Platform dengan jangkauan organik terbesar saat ini adalah...", en: "The platform with the biggest organic reach today is..." },
    options: [
      { id: "Facebook", en: "Facebook" },
      { id: "LinkedIn", en: "LinkedIn" },
      { id: "TikTok", en: "TikTok" },
      { id: "Twitter/X", en: "Twitter/X" },
    ],
    correctIndex: 2,
  },
  {
    id: "socialMedia-q4",
    question: { id: "Berapa waktu ideal membalas komentar?", en: "What is the ideal time to reply to comments?" },
    options: [
      { id: "Kurang dari 1 jam", en: "Less than 1 hour" },
      { id: "1 minggu", en: "1 week" },
      { id: "1 bulan", en: "1 month" },
      { id: "Tidak perlu dibalas", en: "No need to reply" },
    ],
    correctIndex: 0,
  },
  {
    id: "socialMedia-q5",
    question: { id: "Cara terbaik menangani komentar negatif adalah...", en: "The best way to handle negative comments is..." },
    options: [
      { id: "Hapus semuanya", en: "Delete them all" },
      { id: "Balas dengan emosi", en: "Reply emotionally" },
      { id: "Tanggapi tenang dan ajak ke DM", en: "Respond calmly and move to DM" },
      { id: "Biarkan menumpuk", en: "Let them pile up" },
    ],
    correctIndex: 2,
  },
  {
    id: "socialMedia-q6",
    question: { id: "Apa itu golden hour dalam manajemen krisis?", en: "What is the golden hour in crisis management?" },
    options: [
      { id: "Jam posting terbaik", en: "The best posting hour" },
      { id: "1-2 jam pertama krisis yang menentukan", en: "The critical first 1-2 hours of a crisis" },
      { id: "Waktu foto terbaik", en: "The best photo time" },
      { id: "Jam istirahat admin", en: "Admin's break time" },
    ],
    correctIndex: 1,
  },
  {
    id: "socialMedia-q7",
    question: { id: "Metrik paling penting untuk mengukur kesehatan akun adalah...", en: "The most important metric for account health is..." },
    options: [
      { id: "Jumlah followers", en: "Follower count" },
      { id: "Engagement rate", en: "Engagement rate" },
      { id: "Jumlah posting", en: "Post count" },
      { id: "Umur akun", en: "Account age" },
    ],
    correctIndex: 1,
  },
  {
    id: "socialMedia-q8",
    question: { id: "Engagement rate yang sehat umumnya...", en: "A healthy engagement rate is generally..." },
    options: [
      { id: "0.01%", en: "0.01%" },
      { id: "1-5%", en: "1-5%" },
      { id: "50%", en: "50%" },
      { id: "100%", en: "100%" },
    ],
    correctIndex: 1,
  },
  {
    id: "socialMedia-q9",
    question: { id: "Tanda konten benar-benar berharga bagi audiens adalah...", en: "The sign content is truly valuable to audiences is..." },
    options: [
      { id: "Banyak saves dan shares", en: "Many saves and shares" },
      { id: "Banyak bot yang like", en: "Many bot likes" },
      { id: "Diposting tengah malam", en: "Posted at midnight" },
      { id: "Caption panjang", en: "Long captions" },
    ],
    correctIndex: 0,
  },
  {
    id: "socialMedia-q10",
    question: { id: "Tools scheduling gratis untuk IG/FB dari Meta adalah...", en: "Meta's free scheduling tool for IG/FB is..." },
    options: [
      { id: "Hootsuite", en: "Hootsuite" },
      { id: "Meta Business Suite", en: "Meta Business Suite" },
      { id: "Photoshop", en: "Photoshop" },
      { id: "Excel", en: "Excel" },
    ],
    correctIndex: 1,
  },
  ],
};
