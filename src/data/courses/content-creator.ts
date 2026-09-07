import type { Course } from "../types";

export const contentCreator: Course = {
  id: "content-creator",
  title: { id: "Content Creator", en: "Content Creator" },
  description: {
    id: "Belajar bikin konten menarik untuk TikTok, Instagram, dan YouTube.",
    en: "Learn to create engaging content for TikTok, Instagram, and YouTube.",
  },
  longDescription: {
    id: "Dari ide konten, scripting, shooting dengan HP, editing, sampai strategi algoritma. Kursus ini cocok untuk kamu yang ingin jadi content creator atau mengelola konten brand.",
    en: "From content ideas, scripting, shooting with a phone, editing, to algorithm strategy. This course is perfect for aspiring content creators or brand content managers.",
  },
  category: "creative",
  difficulty: "beginner",
  icon: "Clapperboard",
  color: "#4D9DE0",
  salary: { id: "Rp 3 - 15 juta/bulan", en: "$200 - $1,000/month" },
  demand: "Sangat Tinggi",
  passScore: 70,
  modules: [
    {
      id: "contentCreator-m1",
      title: { id: "Menemukan Niche Kamu", en: "Finding Your Niche" },
      lessons: [
        {
            id: "cc-l1",
            title: { id: "Menemukan Niche Kamu", en: "Finding Your Niche" },
            type: "text",
            duration: 6,
            xp: 20,
            body: {
              id: "**Niche** = topik spesifik yang jadi identitas kontenmu.\n\n**Cara menemukan niche:**\n1. Apa yang kamu suka dan bisa bahas berjam-jam?\n2. Apa yang dicari orang?\n3. Apa persilangan keduanya?\n\n**Contoh niche kuat:** masak hemat anak kos, review skincare lokal, belajar Excel untuk karyawan.\n\nNiche spesifik > niche umum. Lebih mudah dikenal dan direkomendasikan algoritma.",
              en: "**Niche** = a specific topic that becomes your content identity.\n\n**How to find your niche:**\n1. What do you love and can talk about for hours?\n2. What are people searching for?\n3. Where do the two intersect?\n\n**Strong niche examples:** budget cooking for students, local skincare reviews, Excel for office workers.\n\nSpecific niche > broad niche. Easier to be recognized and recommended by algorithms.",
            },
          },
        {
          id: "contentCreator-m1l2",
          title: { id: "Pendalaman: Menemukan Niche Kamu", en: "Deep Dive: Finding Your Niche" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Menemukan Niche Kamu**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Finding Your Niche**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m1l3",
          title: { id: "Penerapan: Menemukan Niche Kamu", en: "Application: Finding Your Niche" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Menemukan Niche Kamu** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Finding Your Niche** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m1-cq1",
        question: { id: "Apa itu niche dalam content creation?", en: "What is a niche in content creation?" },
        options: [
          { id: "Topik spesifik identitas konten", en: "A specific topic that defines your content" },
          { id: "Nama akun yang unik", en: "A unique account name" },
          { id: "Jenis kamera yang dipakai", en: "The type of camera used" },
          { id: "Jumlah followers", en: "Number of followers" },
        ],
        correctIndex: 0,
      },
      {
        id: "contentCreator-m1-cq2",
        question: { id: "Berapa durasi kritis hook di awal video?", en: "What is the critical hook duration at the start of a video?" },
        options: [
          { id: "10 detik", en: "10 seconds" },
          { id: "3 detik", en: "3 seconds" },
          { id: "30 detik", en: "30 seconds" },
          { id: "1 menit", en: "1 minute" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "contentCreator-m2",
      title: { id: "Video: Rahasia Hook 3 Detik", en: "Video: The 3-Second Hook Secret" },
      lessons: [
        {
            id: "cc-l2",
            title: { id: "Video: Rahasia Hook 3 Detik", en: "Video: The 3-Second Hook Secret" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/lqv2OgG0kdk",
          },
        {
          id: "contentCreator-m2l2",
          title: { id: "Pendalaman: Video: Rahasia Hook 3 Detik", en: "Deep Dive: Video: The 3-Second Hook Secret" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Rahasia Hook 3 Detik**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: The 3-Second Hook Secret**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m2l3",
          title: { id: "Penerapan: Video: Rahasia Hook 3 Detik", en: "Application: Video: The 3-Second Hook Secret" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Rahasia Hook 3 Detik** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: The 3-Second Hook Secret** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m2-cq1",
        question: { id: "Struktur konten yang efektif adalah...", en: "An effective content structure is..." },
        options: [
          { id: "Isi - Hook - CTA", en: "Body - Hook - CTA" },
          { id: "Hook - Value - CTA", en: "Hook - Value - CTA" },
          { id: "CTA - Hook - Isi", en: "CTA - Hook - Body" },
          { id: "Hook - CTA - Isi", en: "Hook - CTA - Body" },
        ],
        correctIndex: 1,
      },
      {
        id: "contentCreator-m2-cq2",
        question: { id: "Faktor terpenting yang membuat penonton kabur adalah...", en: "The most important factor that makes viewers leave is..." },
        options: [
          { id: "Kualitas video rendah", en: "Low video quality" },
          { id: "Audio yang buruk", en: "Bad audio" },
          { id: "Background jelek", en: "Ugly background" },
          { id: "Tidak pakai filter", en: "No filters" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "contentCreator-m3",
      title: { id: "Kartu: Struktur Konten Viral", en: "Cards: Viral Content Structure" },
      lessons: [
        {
            id: "cc-l3",
            title: { id: "Kartu: Struktur Konten Viral", en: "Cards: Viral Content Structure" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "Hook (0-3 detik)", en: "Hook (0-3 seconds)" },
                back: {
                  id: "Kalimat/visual pembuka yang bikin orang berhenti scroll. Contoh: 'Jangan beli HP sebelum tahu ini!'",
                  en: "Opening line/visual that stops the scroll. E.g. 'Don't buy a phone before knowing this!'",
                },
              },
              {
                front: { id: "Value (isi)", en: "Value (body)" },
                back: {
                  id: "Isi konten yang menjawab janji hook. Padat, jelas, tidak bertele-tele.",
                  en: "The content that delivers on the hook's promise. Dense, clear, no fluff.",
                },
              },
              {
                front: { id: "CTA (Call to Action)", en: "CTA (Call to Action)" },
                back: {
                  id: "Ajakkan di akhir: follow, komen, share, atau simpan. Contoh: 'Simpan biar gak lupa!'",
                  en: "An invitation at the end: follow, comment, share, or save. E.g. 'Save this so you don't forget!'",
                },
              },
            ],
          },
        {
          id: "contentCreator-m3l2",
          title: { id: "Pendalaman: Kartu: Struktur Konten Viral", en: "Deep Dive: Cards: Viral Content Structure" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Struktur Konten Viral**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Viral Content Structure**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m3l3",
          title: { id: "Penerapan: Kartu: Struktur Konten Viral", en: "Application: Cards: Viral Content Structure" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Struktur Konten Viral** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Viral Content Structure** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m3-cq1",
        question: { id: "Apa itu jump cut?", en: "What is a jump cut?" },
        options: [
          { id: "Efek transisi putar", en: "A spinning transition effect" },
          { id: "Potongan untuk menghilangkan jeda", en: "A cut to remove pauses" },
          { id: "Filter warna", en: "A color filter" },
          { id: "Efek slow motion", en: "A slow motion effect" },
        ],
        correctIndex: 1,
      },
      {
        id: "contentCreator-m3-cq2",
        question: { id: "Metrik paling berharga bagi algoritma adalah...", en: "The most valuable metric for the algorithm is..." },
        options: [
          { id: "Like", en: "Likes" },
          { id: "Jumlah followers", en: "Follower count" },
          { id: "Share dan save", en: "Shares and saves" },
          { id: "View dari akun sendiri", en: "Views from your own account" },
        ],
        correctIndex: 2,
      },
      ],
    },
    {
      id: "contentCreator-m4",
      title: { id: "Shooting Sinematik Modal HP", en: "Cinematic Shooting with a Phone" },
      lessons: [
        {
            id: "cc-l4",
            title: { id: "Shooting Sinematik Modal HP", en: "Cinematic Shooting with a Phone" },
            type: "text",
            duration: 7,
            xp: 25,
            body: {
              id: "HP kamu sudah cukup untuk konten berkualitas.\n\n**Tips utama:**\n- **Cahaya**: menghadap jendela, hindari backlight. Golden hour (sore) = cahaya terbaik gratis\n- **Stabil**: gunakan tripod HP murah atau tumpukan buku\n- **Audio**: rekam di ruangan kecil, jauh dari kipas. Suara jelek = penonton kabur\n- **Rule of thirds**: aktifkan grid kamera, letakkan subjek di garis potong\n\nResolusi: rekam 1080p 30/60fps sudah lebih dari cukup.",
              en: "Your phone is enough for quality content.\n\n**Key tips:**\n- **Lighting**: face a window, avoid backlight. Golden hour = best free light\n- **Stable**: use a cheap phone tripod or a stack of books\n- **Audio**: record in a small room, away from fans. Bad audio = viewers leave\n- **Rule of thirds**: turn on camera grid, place subject on intersecting lines\n\nResolution: 1080p at 30/60fps is more than enough.",
            },
          },
        {
          id: "contentCreator-m4l2",
          title: { id: "Pendalaman: Shooting Sinematik Modal HP", en: "Deep Dive: Cinematic Shooting with a Phone" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Shooting Sinematik Modal HP**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cinematic Shooting with a Phone**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m4l3",
          title: { id: "Penerapan: Shooting Sinematik Modal HP", en: "Application: Cinematic Shooting with a Phone" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Shooting Sinematik Modal HP** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cinematic Shooting with a Phone** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m4-cq1",
        question: { id: "Apa fungsi B-Roll dalam video?", en: "What is the function of B-Roll in a video?" },
        options: [
          { id: "Footage pendukung agar tidak bosan", en: "Supporting footage to keep it interesting" },
          { id: "Video utama", en: "The main video" },
          { id: "Background musik", en: "Background music" },
          { id: "Thumbnail video", en: "Video thumbnail" },
        ],
        correctIndex: 0,
      },
      {
        id: "contentCreator-m4-cq2",
        question: { id: "Strategi posting terbaik untuk pemula adalah...", en: "The best posting strategy for beginners is..." },
        options: [
          { id: "7 video dalam 1 hari tiap minggu", en: "7 videos in 1 day each week" },
          { id: "1 video konsisten setiap hari", en: "1 video consistently every day" },
          { id: "Posting kalau mood saja", en: "Post only when in the mood" },
          { id: "1 video per bulan", en: "1 video per month" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "contentCreator-m5",
      title: { id: "Video: Editing di CapCut", en: "Video: Editing in CapCut" },
      lessons: [
        {
            id: "cc-l5",
            title: { id: "Video: Editing di CapCut", en: "Video: Editing in CapCut" },
            type: "video",
            duration: 10,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/2GXx2y1Mq0I",
          },
        {
          id: "contentCreator-m5l2",
          title: { id: "Pendalaman: Video: Editing di CapCut", en: "Deep Dive: Video: Editing in CapCut" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Editing di CapCut**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Editing in CapCut**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m5l3",
          title: { id: "Penerapan: Video: Editing di CapCut", en: "Application: Video: Editing in CapCut" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Editing di CapCut** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Editing in CapCut** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m5-cq1",
        question: { id: "Apa itu batching dalam produksi konten?", en: "What is batching in content production?" },
        options: [
          { id: "Rekam banyak konten sekaligus dalam 1 hari", en: "Recording many pieces of content in 1 day" },
          { id: "Hapus konten lama", en: "Deleting old content" },
          { id: "Beli peralatan sekaligus", en: "Buying equipment all at once" },
          { id: "Posting jam yang sama", en: "Posting at the same hour" },
        ],
        correctIndex: 0,
      },
      {
        id: "contentCreator-m5-cq2",
        question: { id: "Cahaya alami terbaik untuk shooting adalah...", en: "The best natural light for shooting is..." },
        options: [
          { id: "Lampu kamar", en: "Room lamp" },
          { id: "Menghadap jendela / golden hour", en: "Facing a window / golden hour" },
          { id: "Membelakangi jendela", en: "Back to a window" },
          { id: "Gelap total", en: "Total darkness" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "contentCreator-m6",
      title: { id: "Kartu: Istilah Editing", en: "Cards: Editing Terms" },
      lessons: [
        {
            id: "cc-l6",
            title: { id: "Kartu: Istilah Editing", en: "Cards: Editing Terms" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "Jump Cut", en: "Jump Cut" },
                back: {
                  id: "Potongan lompat untuk menghilangkan jeda/'eee'. Bikin video terasa cepat dan padat.",
                  en: "A jump cut to remove pauses/'umm'. Makes videos feel fast and tight.",
                },
              },
              {
                front: { id: "B-Roll", en: "B-Roll" },
                back: {
                  id: "Footage pendukung yang menimpa video utama. Bikin konten tidak membosankan.",
                  en: "Supporting footage layered over the main video. Keeps content interesting.",
                },
              },
              {
                front: { id: "Keyframe", en: "Keyframe" },
                back: {
                  id: "Titik pengunci untuk animasi zoom/gerakan. Dasar efek zoom smooth di CapCut.",
                  en: "An anchor point for zoom/movement animation. The basis of smooth zoom effects in CapCut.",
                },
              },
            ],
          },
        {
          id: "contentCreator-m6l2",
          title: { id: "Pendalaman: Kartu: Istilah Editing", en: "Deep Dive: Cards: Editing Terms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Istilah Editing**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Editing Terms**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m6l3",
          title: { id: "Penerapan: Kartu: Istilah Editing", en: "Application: Cards: Editing Terms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Istilah Editing** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Editing Terms** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m6-cq1",
        question: { id: "Apa itu niche dalam content creation?", en: "What is a niche in content creation?" },
        options: [
          { id: "Topik spesifik identitas konten", en: "A specific topic that defines your content" },
          { id: "Nama akun yang unik", en: "A unique account name" },
          { id: "Jenis kamera yang dipakai", en: "The type of camera used" },
          { id: "Jumlah followers", en: "Number of followers" },
        ],
        correctIndex: 0,
      },
      {
        id: "contentCreator-m6-cq2",
        question: { id: "Berapa durasi kritis hook di awal video?", en: "What is the critical hook duration at the start of a video?" },
        options: [
          { id: "10 detik", en: "10 seconds" },
          { id: "3 detik", en: "3 seconds" },
          { id: "30 detik", en: "30 seconds" },
          { id: "1 menit", en: "1 minute" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "contentCreator-m7",
      title: { id: "Cara Kerja Algoritma", en: "How the Algorithm Works" },
      lessons: [
        {
            id: "cc-l7",
            title: { id: "Cara Kerja Algoritma", en: "How the Algorithm Works" },
            type: "text",
            duration: 6,
            xp: 25,
            body: {
              id: "Algoritma TikTok/IG mendorong konten berdasarkan **retensi** (berapa lama orang menonton) dan **interaksi** (komen, share, save).\n\n**Strategi praktis:**\n- Video pendek (15-30 dtk) lebih mudah dapat retensi tinggi\n- Share dan save lebih berharga daripada like\n- Balas komentar 1 jam pertama setelah posting\n- Posting konsisten: 1x sehari lebih baik daripada 7x seminggu sekali\n\n**FYP bukan keberuntungan, tapi sistem.**",
              en: "The TikTok/IG algorithm pushes content based on **retention** (how long people watch) and **engagement** (comments, shares, saves).\n\n**Practical strategy:**\n- Short videos (15-30s) get high retention more easily\n- Shares and saves are worth more than likes\n- Reply to comments in the first hour after posting\n- Post consistently: once a day beats 7x once a week\n\n**Going viral isn't luck, it's a system.**",
            },
          },
        {
          id: "contentCreator-m7l2",
          title: { id: "Pendalaman: Cara Kerja Algoritma", en: "Deep Dive: How the Algorithm Works" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Cara Kerja Algoritma**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **How the Algorithm Works**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m7l3",
          title: { id: "Penerapan: Cara Kerja Algoritma", en: "Application: How the Algorithm Works" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Cara Kerja Algoritma** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **How the Algorithm Works** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m7-cq1",
        question: { id: "Struktur konten yang efektif adalah...", en: "An effective content structure is..." },
        options: [
          { id: "Isi - Hook - CTA", en: "Body - Hook - CTA" },
          { id: "Hook - Value - CTA", en: "Hook - Value - CTA" },
          { id: "CTA - Hook - Isi", en: "CTA - Hook - Body" },
          { id: "Hook - CTA - Isi", en: "Hook - CTA - Body" },
        ],
        correctIndex: 1,
      },
      {
        id: "contentCreator-m7-cq2",
        question: { id: "Faktor terpenting yang membuat penonton kabur adalah...", en: "The most important factor that makes viewers leave is..." },
        options: [
          { id: "Kualitas video rendah", en: "Low video quality" },
          { id: "Audio yang buruk", en: "Bad audio" },
          { id: "Background jelek", en: "Ugly background" },
          { id: "Tidak pakai filter", en: "No filters" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "contentCreator-m8",
      title: { id: "Video: Riset Konten Trending", en: "Video: Trending Content Research" },
      lessons: [
        {
            id: "cc-l8",
            title: { id: "Video: Riset Konten Trending", en: "Video: Trending Content Research" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/2HYuE39Cq0M",
          },
        {
          id: "contentCreator-m8l2",
          title: { id: "Pendalaman: Video: Riset Konten Trending", en: "Deep Dive: Video: Trending Content Research" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Riset Konten Trending**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Trending Content Research**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m8l3",
          title: { id: "Penerapan: Video: Riset Konten Trending", en: "Application: Video: Trending Content Research" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Riset Konten Trending** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Trending Content Research** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m8-cq1",
        question: { id: "Apa itu jump cut?", en: "What is a jump cut?" },
        options: [
          { id: "Efek transisi putar", en: "A spinning transition effect" },
          { id: "Potongan untuk menghilangkan jeda", en: "A cut to remove pauses" },
          { id: "Filter warna", en: "A color filter" },
          { id: "Efek slow motion", en: "A slow motion effect" },
        ],
        correctIndex: 1,
      },
      {
        id: "contentCreator-m8-cq2",
        question: { id: "Metrik paling berharga bagi algoritma adalah...", en: "The most valuable metric for the algorithm is..." },
        options: [
          { id: "Like", en: "Likes" },
          { id: "Jumlah followers", en: "Follower count" },
          { id: "Share dan save", en: "Shares and saves" },
          { id: "View dari akun sendiri", en: "Views from your own account" },
        ],
        correctIndex: 2,
      },
      ],
    },
    {
      id: "contentCreator-m9",
      title: { id: "Content Calendar 30 Hari", en: "30-Day Content Calendar" },
      lessons: [
        {
            id: "cc-l9",
            title: { id: "Content Calendar 30 Hari", en: "30-Day Content Calendar" },
            type: "text",
            duration: 6,
            xp: 20,
            body: {
              id: "Konsistensi menang dari bakat. Buat **content calendar** sederhana.\n\n**Formula mingguan:**\n- 3 konten edukasi (tutorial, tips)\n- 2 konten hiburan (tren, relatable)\n- 1 konten personal (cerita, behind the scene)\n- 1 konten engagement (tanya jawab, polling)\n\n**Batching**: rekam 7 konten dalam 1 hari, edit bertahap. Produksi sekali, posting seminggu.",
              en: "Consistency beats talent. Build a simple **content calendar**.\n\n**Weekly formula:**\n- 3 educational content (tutorials, tips)\n- 2 entertainment content (trends, relatable)\n- 1 personal content (stories, behind the scenes)\n- 1 engagement content (Q&A, polls)\n\n**Batching**: record 7 pieces in 1 day, edit gradually. Produce once, post all week.",
            },
          },
        {
          id: "contentCreator-m9l2",
          title: { id: "Pendalaman: Content Calendar 30 Hari", en: "Deep Dive: 30-Day Content Calendar" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Content Calendar 30 Hari**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **30-Day Content Calendar**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m9l3",
          title: { id: "Penerapan: Content Calendar 30 Hari", en: "Application: 30-Day Content Calendar" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Content Calendar 30 Hari** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **30-Day Content Calendar** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m9-cq1",
        question: { id: "Apa fungsi B-Roll dalam video?", en: "What is the function of B-Roll in a video?" },
        options: [
          { id: "Footage pendukung agar tidak bosan", en: "Supporting footage to keep it interesting" },
          { id: "Video utama", en: "The main video" },
          { id: "Background musik", en: "Background music" },
          { id: "Thumbnail video", en: "Video thumbnail" },
        ],
        correctIndex: 0,
      },
      {
        id: "contentCreator-m9-cq2",
        question: { id: "Strategi posting terbaik untuk pemula adalah...", en: "The best posting strategy for beginners is..." },
        options: [
          { id: "7 video dalam 1 hari tiap minggu", en: "7 videos in 1 day each week" },
          { id: "1 video konsisten setiap hari", en: "1 video consistently every day" },
          { id: "Posting kalau mood saja", en: "Post only when in the mood" },
          { id: "1 video per bulan", en: "1 video per month" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "contentCreator-m10",
      title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
      lessons: [
        {
        id: "contentCreator-m10l1",
        title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Saatnya menguji semua fondasimu: niche, hook, struktur konten, shooting, dan editing.\n\n**Drill 7 hari:**\n- Hari 1-2: tulis 10 ide konten dari niche-mu, pilih 3 terbaik\n- Hari 3-4: tulis hook 3 detik untuk tiap ide (3 variasi per ide)\n- Hari 5-6: shooting 1 konten dengan HP, fokus ke cahaya dan stabilitas\n- Hari 7: edit jadi video 30-60 detik dengan struktur hook-isi-CTA\n\nSatu minggu drill ini sama nilainya dengan sebulan menonton tutorial.\n\n## Latihan Praktis\nSelesaikan drill 7 hari di atas dan unggah hasilnya. Bandingkan performanya dengan konten lamamu (kalau ada).",
          en: "Time to test all your foundations: niche, hooks, content structure, shooting, and editing.\n\n**7-day drill:**\n- Days 1-2: write 10 content ideas from your niche, pick the 3 best\n- Days 3-4: write a 3-second hook for each idea (3 variations each)\n- Days 5-6: shoot 1 piece of content with your phone, focus on light and stability\n- Day 7: edit into a 30-60 second video with hook-body-CTA structure\n\nOne week of this drill is worth a month of watching tutorials.\n\n## Practical Exercise\nComplete the 7-day drill above and publish the result. Compare its performance with your old content (if any).",
        },
        },
        {
          id: "contentCreator-m10l2",
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
          id: "contentCreator-m10l3",
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
        id: "contentCreator-m10-cq1",
        question: { id: "Berapa lama waktu ideal menarik perhatian penonton di awal video?", en: "How long is the ideal time to grab viewers' attention at the start of a video?" },
        options: [
          { id: "10 detik", en: "10 seconds" },
          { id: "3 detik", en: "3 seconds" },
          { id: "30 detik", en: "30 seconds" },
          { id: "1 menit", en: "1 minute" },
        ],
        correctIndex: 1,
        explanation: { id: "Penonton memutuskan lanjut atau scroll dalam 3 detik pertama — hook harus langsung menggigit.", en: "Viewers decide to keep watching or scroll within the first 3 seconds — the hook must bite instantly." },
      },
      {
        id: "contentCreator-m10-cq2",
        question: { id: "Urutan struktur konten yang benar adalah...", en: "The correct content structure order is..." },
        options: [
          { id: "CTA - isi - hook", en: "CTA - body - hook" },
          { id: "Hook - isi - CTA", en: "Hook - body - CTA" },
          { id: "Isi - hook - CTA", en: "Body - hook - CTA" },
          { id: "Hook - CTA - isi", en: "Hook - CTA - body" },
        ],
        correctIndex: 1,
        explanation: { id: "Hook menarik perhatian, isi memberi nilai, CTA mengarahkan aksi penonton.", en: "The hook grabs attention, the body delivers value, the CTA directs viewer action." },
      },
      ],
    },
    {
      id: "contentCreator-m11",
      title: { id: "Proyek Akhir: Seri Konten 1 Minggu", en: "Final Project: 1-Week Content Series" },
      lessons: [
        {
        id: "contentCreator-m11l1",
        title: { id: "Proyek Akhir: Seri Konten 1 Minggu", en: "Final Project: 1-Week Content Series" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Proyek pamungkas: terbitkan **3 konten dalam 7 hari** dari niche yang sama.\n\n**Aturan main:**\n1. Semua konten memakai struktur hook-isi-CTA\n2. Satu format berbeda di tiap konten (tutorial, storytelling, listicle)\n3. Catat metrik tiap konten 48 jam setelah terbit: views, retention, engagement\n\nDari proyek ini kamu akan tahu format mana yang paling cocok dengan audiensmu — bukan tebakan lagi.\n\n## Latihan Praktis\nJalankan proyeknya, lalu tulis evaluasi singkat: format mana yang menang dan kenapa. Jadikan itu acuan content calendar-mu berikutnya.",
          en: "The ultimate project: publish **3 pieces of content in 7 days** from the same niche.\n\n**Rules:**\n1. All content uses the hook-body-CTA structure\n2. A different format for each piece (tutorial, storytelling, listicle)\n3. Record each piece's metrics 48 hours after publishing: views, retention, engagement\n\nFrom this project you'll know which format fits your audience best — no more guessing.\n\n## Practical Exercise\nRun the project, then write a short evaluation: which format won and why. Use it as the basis for your next content calendar.",
        },
        },
        {
          id: "contentCreator-m11l2",
          title: { id: "Pendalaman: Proyek Akhir: Seri Konten 1 Minggu", en: "Deep Dive: Final Project: 1-Week Content Series" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Proyek Akhir: Seri Konten 1 Minggu**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Final Project: 1-Week Content Series**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m11l3",
          title: { id: "Penerapan: Proyek Akhir: Seri Konten 1 Minggu", en: "Application: Final Project: 1-Week Content Series" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Proyek Akhir: Seri Konten 1 Minggu** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Final Project: 1-Week Content Series** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m11-cq1",
        question: { id: "Kenapa metrik baru dibaca 48 jam setelah konten terbit?", en: "Why should metrics be read 48 hours after publishing?" },
        options: [
          { id: "Karena lupa sebelumnya", en: "Because we forgot earlier" },
          { id: "Algoritma butuh waktu mendistribusikan konten", en: "The algorithm needs time to distribute content" },
          { id: "Supaya views lebih banyak", en: "To get more views" },
          { id: "Tidak ada alasannya", en: "There is no reason" },
        ],
        correctIndex: 1,
        explanation: { id: "Data 48 jam pertama menunjukkan performa awal yang cukup adil untuk membandingkan format.", en: "The first 48 hours of data show early performance fairly enough to compare formats." },
      },
      {
        id: "contentCreator-m11-cq2",
        question: { id: "Apa output paling berharga dari proyek seri konten?", en: "What is the most valuable output of the content series project?" },
        options: [
          { id: "Followers bertambah", en: "More followers" },
          { id: "Data format konten yang paling cocok untuk audiensmu", en: "Data on which content format fits your audience best" },
          { id: "Video jadi viral", en: "A viral video" },
          { id: "Banyak komentar", en: "Lots of comments" },
        ],
        correctIndex: 1,
        explanation: { id: "Data format pemenang jadi kompas strategi konten jangka panjangmu.", en: "Winning-format data becomes your long-term content strategy compass." },
      },
      ],
    },
    {
      id: "contentCreator-m12",
      title: { id: "Monetisasi & Klien Pertama", en: "Monetization & Your First Client" },
      lessons: [
        {
        id: "contentCreator-m12l1",
        title: { id: "Monetisasi & Klien Pertama", en: "Monetization & Your First Client" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Skill konten bisa jadi penghasilan lewat beberapa jalur:\n\n**Jalur monetisasi:**\n- **Jasa konten UMKM**: kelola 3-5 akun kecil, fee per bulan\n- **UGC creator**: dibayar brand untuk bikin konten, tak perlu followers banyak\n- **Afiliasi & endorsement**: butuh audiens yang tumbuh konsisten\n- **Produk digital**: template, preset, e-book dari keahlianmu\n\n**Cara dapat klien pertama:** tawarkan 1 minggu konten gratis/discount ke UMKM lokal dengan proposal 1 halaman berisi 5 ide konten untuk mereka.\n\n## Latihan Praktis\nBuat daftar 10 UMKM di sekitarmu, pilih 3, dan kirim proposal 1 halaman minggu ini.",
          en: "Content skills can become income through several paths:\n\n**Monetization paths:**\n- **Content services for SMEs**: manage 3-5 small accounts, monthly fee\n- **UGC creator**: paid by brands to make content, no big following needed\n- **Affiliate & endorsements**: needs a consistently growing audience\n- **Digital products**: templates, presets, e-books from your expertise\n\n**Getting your first client:** offer 1 week of free/discounted content to a local SME with a 1-page proposal containing 5 content ideas for them.\n\n## Practical Exercise\nList 10 SMEs around you, pick 3, and send the 1-page proposal this week.",
        },
        },
        {
          id: "contentCreator-m12l2",
          title: { id: "Pendalaman: Monetisasi & Klien Pertama", en: "Deep Dive: Monetization & Your First Client" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Monetisasi & Klien Pertama**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Monetization & Your First Client**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "contentCreator-m12l3",
          title: { id: "Penerapan: Monetisasi & Klien Pertama", en: "Application: Monetization & Your First Client" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Monetisasi & Klien Pertama** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Monetization & Your First Client** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "contentCreator-m12-cq1",
        question: { id: "Jalur monetisasi yang TIDAK butuh followers banyak adalah...", en: "The monetization path that does NOT need many followers is..." },
        options: [
          { id: "Endorsement", en: "Endorsements" },
          { id: "Jasa konten UMKM / UGC", en: "SME content services / UGC" },
          { id: "Program kreator platform", en: "Platform creator programs" },
          { id: "Iklan di video", en: "Ads on videos" },
        ],
        correctIndex: 1,
        explanation: { id: "UGC dan jasa UMKM dibayar untuk kemampuan membuat konten, bukan ukuran audiens.", en: "UGC and SME services are paid for content-making ability, not audience size." },
      },
      {
        id: "contentCreator-m12-cq2",
        question: { id: "Isi proposal penawaran jasa konten yang paling penting adalah...", en: "The most important content of a service proposal is..." },
        options: [
          { id: "Biodata lengkapmu", en: "Your full biodata" },
          { id: "Ide konten konkret untuk bisnis klien", en: "Concrete content ideas for the client's business" },
          { id: "Harga setinggi mungkin", en: "The highest possible price" },
          { id: "Foto profil keren", en: "A cool profile photo" },
        ],
        correctIndex: 1,
        explanation: { id: "Ide konkret menunjukkan kamu sudah memikirkan bisnis mereka, bukan sekadar menawarkan jasa.", en: "Concrete ideas show you've thought about their business, not just offering services." },
      },
      ],
    },
  ],
  quiz: [
  {
    id: "contentCreator-q1",
    question: { id: "Apa itu niche dalam content creation?", en: "What is a niche in content creation?" },
    options: [
      { id: "Topik spesifik identitas konten", en: "A specific topic that defines your content" },
      { id: "Nama akun yang unik", en: "A unique account name" },
      { id: "Jenis kamera yang dipakai", en: "The type of camera used" },
      { id: "Jumlah followers", en: "Number of followers" },
    ],
    correctIndex: 0,
  },
  {
    id: "contentCreator-q2",
    question: { id: "Berapa durasi kritis hook di awal video?", en: "What is the critical hook duration at the start of a video?" },
    options: [
      { id: "10 detik", en: "10 seconds" },
      { id: "3 detik", en: "3 seconds" },
      { id: "30 detik", en: "30 seconds" },
      { id: "1 menit", en: "1 minute" },
    ],
    correctIndex: 1,
  },
  {
    id: "contentCreator-q3",
    question: { id: "Struktur konten yang efektif adalah...", en: "An effective content structure is..." },
    options: [
      { id: "Isi - Hook - CTA", en: "Body - Hook - CTA" },
      { id: "Hook - Value - CTA", en: "Hook - Value - CTA" },
      { id: "CTA - Hook - Isi", en: "CTA - Hook - Body" },
      { id: "Hook - CTA - Isi", en: "Hook - CTA - Body" },
    ],
    correctIndex: 1,
  },
  {
    id: "contentCreator-q4",
    question: { id: "Faktor terpenting yang membuat penonton kabur adalah...", en: "The most important factor that makes viewers leave is..." },
    options: [
      { id: "Kualitas video rendah", en: "Low video quality" },
      { id: "Audio yang buruk", en: "Bad audio" },
      { id: "Background jelek", en: "Ugly background" },
      { id: "Tidak pakai filter", en: "No filters" },
    ],
    correctIndex: 1,
  },
  {
    id: "contentCreator-q5",
    question: { id: "Apa itu jump cut?", en: "What is a jump cut?" },
    options: [
      { id: "Efek transisi putar", en: "A spinning transition effect" },
      { id: "Potongan untuk menghilangkan jeda", en: "A cut to remove pauses" },
      { id: "Filter warna", en: "A color filter" },
      { id: "Efek slow motion", en: "A slow motion effect" },
    ],
    correctIndex: 1,
  },
  {
    id: "contentCreator-q6",
    question: { id: "Metrik paling berharga bagi algoritma adalah...", en: "The most valuable metric for the algorithm is..." },
    options: [
      { id: "Like", en: "Likes" },
      { id: "Jumlah followers", en: "Follower count" },
      { id: "Share dan save", en: "Shares and saves" },
      { id: "View dari akun sendiri", en: "Views from your own account" },
    ],
    correctIndex: 2,
  },
  {
    id: "contentCreator-q7",
    question: { id: "Apa fungsi B-Roll dalam video?", en: "What is the function of B-Roll in a video?" },
    options: [
      { id: "Footage pendukung agar tidak bosan", en: "Supporting footage to keep it interesting" },
      { id: "Video utama", en: "The main video" },
      { id: "Background musik", en: "Background music" },
      { id: "Thumbnail video", en: "Video thumbnail" },
    ],
    correctIndex: 0,
  },
  {
    id: "contentCreator-q8",
    question: { id: "Strategi posting terbaik untuk pemula adalah...", en: "The best posting strategy for beginners is..." },
    options: [
      { id: "7 video dalam 1 hari tiap minggu", en: "7 videos in 1 day each week" },
      { id: "1 video konsisten setiap hari", en: "1 video consistently every day" },
      { id: "Posting kalau mood saja", en: "Post only when in the mood" },
      { id: "1 video per bulan", en: "1 video per month" },
    ],
    correctIndex: 1,
  },
  {
    id: "contentCreator-q9",
    question: { id: "Apa itu batching dalam produksi konten?", en: "What is batching in content production?" },
    options: [
      { id: "Rekam banyak konten sekaligus dalam 1 hari", en: "Recording many pieces of content in 1 day" },
      { id: "Hapus konten lama", en: "Deleting old content" },
      { id: "Beli peralatan sekaligus", en: "Buying equipment all at once" },
      { id: "Posting jam yang sama", en: "Posting at the same hour" },
    ],
    correctIndex: 0,
  },
  {
    id: "contentCreator-q10",
    question: { id: "Cahaya alami terbaik untuk shooting adalah...", en: "The best natural light for shooting is..." },
    options: [
      { id: "Lampu kamar", en: "Room lamp" },
      { id: "Menghadap jendela / golden hour", en: "Facing a window / golden hour" },
      { id: "Membelakangi jendela", en: "Back to a window" },
      { id: "Gelap total", en: "Total darkness" },
    ],
    correctIndex: 1,
  },
  ],
};
