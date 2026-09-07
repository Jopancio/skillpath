import type { Course } from "../types";

export const uiux: Course = {
  id: "ui-ux-design",
  title: { id: "UI/UX Design", en: "UI/UX Design" },
  description: {
    id: "Rancang aplikasi dan website yang indah sekaligus mudah digunakan.",
    en: "Design apps and websites that are beautiful and easy to use.",
  },
  longDescription: {
    id: "Pelajari dasar desain UI/UX: prinsip visual, riset pengguna, wireframing, prototyping di Figma, dan membangun portofolio. Skill desain yang dibutuhkan semua perusahaan teknologi.",
    en: "Learn UI/UX design fundamentals: visual principles, user research, wireframing, Figma prototyping, and portfolio building. A design skill needed by every tech company.",
  },
  category: "tech",
  difficulty: "beginner",
  icon: "PenTool",
  color: "#4D9DE0",
  salary: { id: "Rp 5 - 15 juta/bulan", en: "$350 - $1,000/month" },
  demand: "Sangat Tinggi",
  passScore: 70,
  modules: [
    {
      id: "uiux-m1",
      title: { id: "5 Prinsip Dasar Desain", en: "5 Basic Design Principles" },
      lessons: [
        {
            id: "ux-l1",
            title: { id: "5 Prinsip Dasar Desain", en: "5 Basic Design Principles" },
            type: "text",
            duration: 6,
            xp: 20,
            body: {
              id: "Desain bagus bukan bakat, tapi prinsip yang bisa dipelajari:\n\n1. **Hierarchy**: elemen terpenting harus paling menonjol (ukuran, warna, posisi)\n2. **Contrast**: teks harus mudah dibaca dari latar\n3. **Alignment**: semua elemen sejajar dengan sesuatu\n4. **Proximity**: elemen terkait didekatkan, yang tidak dijauhkan\n5. **Whitespace**: ruang kosong bukan pemborosan, tapi napas desain\n\n**Aturan emas**: jika ragu, sederhanakan.",
              en: "Good design isn't talent, it's learnable principles:\n\n1. **Hierarchy**: the most important element must stand out (size, color, position)\n2. **Contrast**: text must be readable against the background\n3. **Alignment**: every element aligns with something\n4. **Proximity**: related elements go together, unrelated ones apart\n5. **Whitespace**: empty space isn't waste, it's breathing room\n\n**Golden rule**: when in doubt, simplify.",
            },
          },
        {
          id: "uiux-m1l2",
          title: { id: "Pendalaman: 5 Prinsip Dasar Desain", en: "Deep Dive: 5 Basic Design Principles" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **5 Prinsip Dasar Desain**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **5 Basic Design Principles**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m1l3",
          title: { id: "Penerapan: 5 Prinsip Dasar Desain", en: "Application: 5 Basic Design Principles" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **5 Prinsip Dasar Desain** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **5 Basic Design Principles** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m1-cq1",
        question: { id: "Prinsip desain yang mengatur elemen terpenting agar paling menonjol adalah...", en: "The design principle that makes the most important element stand out is..." },
        options: [
          { id: "Proximity", en: "Proximity" },
          { id: "Hierarchy", en: "Hierarchy" },
          { id: "Whitespace", en: "Whitespace" },
          { id: "Alignment", en: "Alignment" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m1-cq2",
        question: { id: "Dalam aturan 60-30-10, warna aksen dipakai untuk...", en: "In the 60-30-10 rule, accent color is used for..." },
        options: [
          { id: "Latar belakang utama", en: "Main background" },
          { id: "Semua teks", en: "All text" },
          { id: "Tombol CTA dan elemen penting", en: "CTA buttons and key elements" },
          { id: "Border saja", en: "Borders only" },
        ],
        correctIndex: 2,
      },
      ],
    },
    {
      id: "uiux-m2",
      title: { id: "Video: Teori Warna Praktis", en: "Video: Practical Color Theory" },
      lessons: [
        {
            id: "ux-l2",
            title: { id: "Video: Teori Warna Praktis", en: "Video: Practical Color Theory" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/AvgCkHrcj90",
          },
        {
          id: "uiux-m2l2",
          title: { id: "Pendalaman: Video: Teori Warna Praktis", en: "Deep Dive: Video: Practical Color Theory" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Teori Warna Praktis**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Practical Color Theory**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m2l3",
          title: { id: "Penerapan: Video: Teori Warna Praktis", en: "Application: Video: Practical Color Theory" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Teori Warna Praktis** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Practical Color Theory** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m2-cq1",
        question: { id: "Apa fungsi whitespace dalam desain?", en: "What is the function of whitespace in design?" },
        options: [
          { id: "Pemborosan ruang", en: "Wasting space" },
          { id: "Ruang napas agar desain tidak sesak", en: "Breathing room so designs don't feel cramped" },
          { id: "Tempat iklan", en: "Space for ads" },
          { id: "Area kosong yang harus diisi", en: "Empty area that must be filled" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m2-cq2",
        question: { id: "Wireframe harus dibuat...", en: "Wireframes should be made..." },
        options: [
          { id: "Setelah desain final", en: "After the final design" },
          { id: "Sebelum desain visual, fokus ke struktur", en: "Before visual design, focusing on structure" },
          { id: "Dengan warna lengkap", en: "With full colors" },
          { id: "Oleh developer saja", en: "Only by developers" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "uiux-m3",
      title: { id: "Kartu: Aturan 60-30-10", en: "Cards: The 60-30-10 Rule" },
      lessons: [
        {
            id: "ux-l3",
            title: { id: "Kartu: Aturan 60-30-10", en: "Cards: The 60-30-10 Rule" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "60% Warna Dominan", en: "60% Dominant Color" },
                back: {
                  id: "Warna utama, biasanya netral (putih, abu). Jadi latar mayoritas desain.",
                  en: "The main color, usually neutral (white, gray). Covers most of the design.",
                },
              },
              {
                front: { id: "30% Warna Sekunder", en: "30% Secondary Color" },
                back: {
                  id: "Warna pendukung untuk section, card, atau elemen menengah.",
                  en: "Supporting color for sections, cards, or medium elements.",
                },
              },
              {
                front: { id: "10% Warna Aksen", en: "10% Accent Color" },
                back: {
                  id: "Warna paling mencolok, khusus untuk tombol CTA dan elemen penting. Sedikit tapi kuat.",
                  en: "The boldest color, reserved for CTA buttons and key elements. Small but powerful.",
                },
              },
            ],
          },
        {
          id: "uiux-m3l2",
          title: { id: "Pendalaman: Kartu: Aturan 60-30-10", en: "Deep Dive: Cards: The 60-30-10 Rule" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Aturan 60-30-10**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: The 60-30-10 Rule**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m3l3",
          title: { id: "Penerapan: Kartu: Aturan 60-30-10", en: "Application: Cards: The 60-30-10 Rule" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Aturan 60-30-10** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: The 60-30-10 Rule** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m3-cq1",
        question: { id: "Apa itu user persona?", en: "What is a user persona?" },
        options: [
          { id: "Akun media sosial", en: "A social media account" },
          { id: "Profil fiktif pengguna ideal", en: "A fictional profile of the ideal user" },
          { id: "Nama aplikasi", en: "An app name" },
          { id: "Avatar dalam game", en: "A game avatar" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m3-cq2",
        question: { id: "Berapa pengguna yang cukup untuk menemukan 85% masalah usability?", en: "How many users are enough to find 85% of usability problems?" },
        options: [
          { id: "1 orang", en: "1 person" },
          { id: "5 orang", en: "5 people" },
          { id: "100 orang", en: "100 people" },
          { id: "1000 orang", en: "1000 people" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "uiux-m4",
      title: { id: "User Flow & Wireframe", en: "User Flow & Wireframes" },
      lessons: [
        {
            id: "ux-l4",
            title: { id: "User Flow & Wireframe", en: "User Flow & Wireframes" },
            type: "text",
            duration: 7,
            xp: 25,
            body: {
              id: "**User flow** = langkah-langkah pengguna menyelesaikan tugas (misal: beli produk).\n\n**Wireframe** = sketsa kasar layout sebelum dipercantik. Fokus ke struktur, bukan warna.\n\n**Proses benar:**\n1. Pahami masalah pengguna\n2. Gambar user flow di kertas\n3. Wireframe low-fidelity (kotak-kotak abu)\n4. Baru desain visual (hi-fi)\n\nLompat langsung ke desain cantik tanpa wireframe = 90% revisi nanti.",
              en: "**User flow** = the steps a user takes to complete a task (e.g. buy a product).\n\n**Wireframe** = a rough layout sketch before beautifying. Focus on structure, not color.\n\n**Correct process:**\n1. Understand the user's problem\n2. Draw the user flow on paper\n3. Low-fidelity wireframe (gray boxes)\n4. Then visual design (hi-fi)\n\nJumping straight to pretty design without wireframes = 90% revisions later.",
            },
          },
        {
          id: "uiux-m4l2",
          title: { id: "Pendalaman: User Flow & Wireframe", en: "Deep Dive: User Flow & Wireframes" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **User Flow & Wireframe**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **User Flow & Wireframes**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m4l3",
          title: { id: "Penerapan: User Flow & Wireframe", en: "Application: User Flow & Wireframes" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **User Flow & Wireframe** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **User Flow & Wireframes** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m4-cq1",
        question: { id: "Tools desain UI/UX paling populer dan gratis untuk pemula adalah...", en: "The most popular and free UI/UX design tool for beginners is..." },
        options: [
          { id: "Microsoft Word", en: "Microsoft Word" },
          { id: "Figma", en: "Figma" },
          { id: "Paint", en: "Paint" },
          { id: "Excel", en: "Excel" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m4-cq2",
        question: { id: "Portofolio UI/UX yang baik berisi...", en: "A good UI/UX portfolio contains..." },
        options: [
          { id: "Banyak gambar tanpa penjelasan", en: "Many images without explanation" },
          { id: "Case study yang menceritakan proses pemecahan masalah", en: "Case studies telling problem-solving processes" },
          { id: "Foto diri", en: "Self photos" },
          { id: "Sertifikat kursus saja", en: "Course certificates only" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "uiux-m5",
      title: { id: "Video: Figma untuk Pemula", en: "Video: Figma for Beginners" },
      lessons: [
        {
            id: "ux-l5",
            title: { id: "Video: Figma untuk Pemula", en: "Video: Figma for Beginners" },
            type: "video",
            duration: 10,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/FTFaQWZBqQ8",
          },
        {
          id: "uiux-m5l2",
          title: { id: "Pendalaman: Video: Figma untuk Pemula", en: "Deep Dive: Video: Figma for Beginners" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Figma untuk Pemula**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Figma for Beginners**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m5l3",
          title: { id: "Penerapan: Video: Figma untuk Pemula", en: "Application: Video: Figma for Beginners" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Figma untuk Pemula** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Figma for Beginners** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m5-cq1",
        question: { id: "Urutan struktur case study yang benar adalah...", en: "The correct case study structure order is..." },
        options: [
          { id: "Solusi - Masalah - Proses - Dampak", en: "Solution - Problem - Process - Impact" },
          { id: "Masalah - Proses - Solusi - Dampak", en: "Problem - Process - Solution - Impact" },
          { id: "Dampak - Solusi - Proses - Masalah", en: "Impact - Solution - Process - Problem" },
          { id: "Proses - Masalah - Dampak - Solusi", en: "Process - Problem - Impact - Solution" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m5-cq2",
        question: { id: "Cara terbaik masuk karier UI/UX tanpa pengalaman kerja adalah...", en: "The best way to enter a UI/UX career without work experience is..." },
        options: [
          { id: "Tunggu lowongan junior", en: "Wait for junior openings" },
          { id: "Redesign aplikasi populer dan ikut design challenge", en: "Redesign popular apps and join design challenges" },
          { id: "Beli sertifikat palsu", en: "Buy fake certificates" },
          { id: "Kuliah 4 tahun dulu", en: "Study 4 years first" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "uiux-m6",
      title: { id: "Kartu: Istilah UX", en: "Cards: UX Terms" },
      lessons: [
        {
            id: "ux-l6",
            title: { id: "Kartu: Istilah UX", en: "Cards: UX Terms" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "User Persona", en: "User Persona" },
                back: {
                  id: "Profil fiktif pengguna ideal: nama, usia, tujuan, frustrasi. Desain untuk dia, bukan untuk dirimu.",
                  en: "A fictional profile of your ideal user: name, age, goals, frustrations. Design for them, not yourself.",
                },
              },
              {
                front: { id: "Usability Testing", en: "Usability Testing" },
                back: {
                  id: "Mengamati pengguna nyata memakai desainmu. 5 pengguna cukup menemukan 85% masalah.",
                  en: "Watching real users use your design. 5 users reveal 85% of problems.",
                },
              },
              {
                front: { id: "Prototype", en: "Prototype" },
                back: {
                  id: "Desain yang bisa diklik seperti aplikasi sungguhan, untuk diuji sebelum dibuat developer.",
                  en: "A clickable design that acts like a real app, for testing before developers build it.",
                },
              },
            ],
          },
        {
          id: "uiux-m6l2",
          title: { id: "Pendalaman: Kartu: Istilah UX", en: "Deep Dive: Cards: UX Terms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Istilah UX**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: UX Terms**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m6l3",
          title: { id: "Penerapan: Kartu: Istilah UX", en: "Application: Cards: UX Terms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Istilah UX** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: UX Terms** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m6-cq1",
        question: { id: "Prinsip desain yang mengatur elemen terpenting agar paling menonjol adalah...", en: "The design principle that makes the most important element stand out is..." },
        options: [
          { id: "Proximity", en: "Proximity" },
          { id: "Hierarchy", en: "Hierarchy" },
          { id: "Whitespace", en: "Whitespace" },
          { id: "Alignment", en: "Alignment" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m6-cq2",
        question: { id: "Dalam aturan 60-30-10, warna aksen dipakai untuk...", en: "In the 60-30-10 rule, accent color is used for..." },
        options: [
          { id: "Latar belakang utama", en: "Main background" },
          { id: "Semua teks", en: "All text" },
          { id: "Tombol CTA dan elemen penting", en: "CTA buttons and key elements" },
          { id: "Border saja", en: "Borders only" },
        ],
        correctIndex: 2,
      },
      ],
    },
    {
      id: "uiux-m7",
      title: { id: "Case Study: Jantung Portofolio", en: "Case Studies: The Heart of a Portfolio" },
      lessons: [
        {
            id: "ux-l7",
            title: { id: "Case Study: Jantung Portofolio", en: "Case Studies: The Heart of a Portfolio" },
            type: "text",
            duration: 7,
            xp: 25,
            body: {
              id: "Portofolio UI/UX bukan galeri gambar, tapi **cerita pemecahan masalah**.\n\n**Struktur case study:**\n1. **Masalah**: apa yang rusak/belum ada?\n2. **Proses**: riset, wireframe, iterasi\n3. **Solusi**: desain akhir + alasannya\n4. **Dampak**: hasil yang terukur\n\n**Tips**: 3 case study mendalam > 20 gambar cantik tanpa cerita. Taruh di Behance atau website pribadi.",
              en: "A UI/UX portfolio isn't an image gallery, it's a **problem-solving story**.\n\n**Case study structure:**\n1. **Problem**: what was broken/missing?\n2. **Process**: research, wireframes, iterations\n3. **Solution**: final design + reasoning\n4. **Impact**: measurable results\n\n**Tip**: 3 deep case studies > 20 pretty pictures without story. Put them on Behance or a personal website.",
            },
          },
        {
          id: "uiux-m7l2",
          title: { id: "Pendalaman: Case Study: Jantung Portofolio", en: "Deep Dive: Case Studies: The Heart of a Portfolio" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Case Study: Jantung Portofolio**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Case Studies: The Heart of a Portfolio**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m7l3",
          title: { id: "Penerapan: Case Study: Jantung Portofolio", en: "Application: Case Studies: The Heart of a Portfolio" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Case Study: Jantung Portofolio** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Case Studies: The Heart of a Portfolio** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m7-cq1",
        question: { id: "Apa fungsi whitespace dalam desain?", en: "What is the function of whitespace in design?" },
        options: [
          { id: "Pemborosan ruang", en: "Wasting space" },
          { id: "Ruang napas agar desain tidak sesak", en: "Breathing room so designs don't feel cramped" },
          { id: "Tempat iklan", en: "Space for ads" },
          { id: "Area kosong yang harus diisi", en: "Empty area that must be filled" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m7-cq2",
        question: { id: "Wireframe harus dibuat...", en: "Wireframes should be made..." },
        options: [
          { id: "Setelah desain final", en: "After the final design" },
          { id: "Sebelum desain visual, fokus ke struktur", en: "Before visual design, focusing on structure" },
          { id: "Dengan warna lengkap", en: "With full colors" },
          { id: "Oleh developer saja", en: "Only by developers" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "uiux-m8",
      title: { id: "Video: Review Portofolio Junior", en: "Video: Junior Portfolio Review" },
      lessons: [
        {
            id: "ux-l8",
            title: { id: "Video: Review Portofolio Junior", en: "Video: Junior Portfolio Review" },
            type: "video",
            duration: 9,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/g4aPFeWdwDI",
          },
        {
          id: "uiux-m8l2",
          title: { id: "Pendalaman: Video: Review Portofolio Junior", en: "Deep Dive: Video: Junior Portfolio Review" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Review Portofolio Junior**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Junior Portfolio Review**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m8l3",
          title: { id: "Penerapan: Video: Review Portofolio Junior", en: "Application: Video: Junior Portfolio Review" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Review Portofolio Junior** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Junior Portfolio Review** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m8-cq1",
        question: { id: "Apa itu user persona?", en: "What is a user persona?" },
        options: [
          { id: "Akun media sosial", en: "A social media account" },
          { id: "Profil fiktif pengguna ideal", en: "A fictional profile of the ideal user" },
          { id: "Nama aplikasi", en: "An app name" },
          { id: "Avatar dalam game", en: "A game avatar" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m8-cq2",
        question: { id: "Berapa pengguna yang cukup untuk menemukan 85% masalah usability?", en: "How many users are enough to find 85% of usability problems?" },
        options: [
          { id: "1 orang", en: "1 person" },
          { id: "5 orang", en: "5 people" },
          { id: "100 orang", en: "100 people" },
          { id: "1000 orang", en: "1000 people" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "uiux-m9",
      title: { id: "Jalur Karier UI/UX", en: "The UI/UX Career Path" },
      lessons: [
        {
            id: "ux-l9",
            title: { id: "Jalur Karier UI/UX", en: "The UI/UX Career Path" },
            type: "text",
            duration: 6,
            xp: 20,
            body: {
              id: "Jalur karier UI/UX di Indonesia:\n\n1. **Junior UI/UX Designer** (0-2 th): eksekusi desain, Rp 5-8 jt\n2. **Mid Product Designer** (2-4 th): punya produk sendiri, Rp 8-15 jt\n3. **Senior/Lead** (4+ th): strategi & tim, Rp 15-30 jt+\n\n**Cara masuk tanpa pengalaman:**\n- Redesign aplikasi populer sebagai latihan\n- Ikut challenge desain (Daily UI)\n- Freelance proyek UMKM\n- Aktif di komunitas desain",
              en: "The UI/UX career path in Indonesia:\n\n1. **Junior UI/UX Designer** (0-2 yrs): design execution, Rp 5-8M\n2. **Mid Product Designer** (2-4 yrs): owns a product, Rp 8-15M\n3. **Senior/Lead** (4+ yrs): strategy & team, Rp 15-30M+\n\n**Breaking in without experience:**\n- Redesign popular apps as practice\n- Join design challenges (Daily UI)\n- Freelance for SMEs\n- Be active in design communities",
            },
          },
        {
          id: "uiux-m9l2",
          title: { id: "Pendalaman: Jalur Karier UI/UX", en: "Deep Dive: The UI/UX Career Path" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Jalur Karier UI/UX**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **The UI/UX Career Path**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m9l3",
          title: { id: "Penerapan: Jalur Karier UI/UX", en: "Application: The UI/UX Career Path" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Jalur Karier UI/UX** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **The UI/UX Career Path** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m9-cq1",
        question: { id: "Tools desain UI/UX paling populer dan gratis untuk pemula adalah...", en: "The most popular and free UI/UX design tool for beginners is..." },
        options: [
          { id: "Microsoft Word", en: "Microsoft Word" },
          { id: "Figma", en: "Figma" },
          { id: "Paint", en: "Paint" },
          { id: "Excel", en: "Excel" },
        ],
        correctIndex: 1,
      },
      {
        id: "uiux-m9-cq2",
        question: { id: "Portofolio UI/UX yang baik berisi...", en: "A good UI/UX portfolio contains..." },
        options: [
          { id: "Banyak gambar tanpa penjelasan", en: "Many images without explanation" },
          { id: "Case study yang menceritakan proses pemecahan masalah", en: "Case studies telling problem-solving processes" },
          { id: "Foto diri", en: "Self photos" },
          { id: "Sertifikat kursus saja", en: "Course certificates only" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "uiux-m10",
      title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
      lessons: [
        {
        id: "uiux-m10l1",
        title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Gabungkan prinsip desain, warna, dan user flow dalam satu tantangan redesign.\n\n**Tantangan redesign (90 menit):**\n1. Pilih 1 layar aplikasi yang sering kamu pakai dan terasa buruk\n2. Tulis 3 masalahnya memakai 5 prinsip desain (hierarchy, contrast, alignment, proximity, repetition)\n3. Sketsa wireframe perbaikannya di kertas\n4. Terapkan palet warna dengan aturan 60-30-10\n5. Buat versi high-fidelity sederhananya di Figma\n\nDrill ini melatih mata desainmu berpikir dari masalah, bukan dari hiasan.\n\n## Latihan Praktis\nSelesaikan tantangannya dan dokumentasikan before-after + alasan tiap keputusan desainmu dalam 5 kalimat.",
          en: "Combine design principles, color, and user flow in one redesign challenge.\n\n**Redesign challenge (90 minutes):**\n1. Pick 1 screen from an app you use often that feels bad\n2. Write its 3 problems using the 5 design principles (hierarchy, contrast, alignment, proximity, repetition)\n3. Sketch the improved wireframe on paper\n4. Apply a color palette with the 60-30-10 rule\n5. Make its simple high-fidelity version in Figma\n\nThis drill trains your design eye to think from problems, not decoration.\n\n## Practical Exercise\nFinish the challenge and document the before-after + the reasoning behind each design decision in 5 sentences.",
        },
        },
        {
          id: "uiux-m10l2",
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
          id: "uiux-m10l3",
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
        id: "uiux-m10-cq1",
        question: { id: "Aturan 60-30-10 dalam desain mengatur tentang...", en: "The 60-30-10 rule in design regulates..." },
        options: [
          { id: "Ukuran font", en: "Font sizes" },
          { id: "Proporsi warna dominan, sekunder, dan aksen", en: "Proportions of dominant, secondary, and accent colors" },
          { id: "Jumlah halaman", en: "Number of pages" },
          { id: "Jarak antar ikon", en: "Spacing between icons" },
        ],
        correctIndex: 1,
        explanation: { id: "60% warna dominan, 30% sekunder, 10% aksen menciptakan komposisi warna yang seimbang.", en: "60% dominant, 30% secondary, 10% accent color creates a balanced color composition." },
      },
      {
        id: "uiux-m10-cq2",
        question: { id: "Langkah pertama yang benar saat redesign adalah...", en: "The correct first step when redesigning is..." },
        options: [
          { id: "Langsung buka Figma", en: "Opening Figma right away" },
          { id: "Mengidentifikasi masalah dengan prinsip desain", en: "Identifying problems with design principles" },
          { id: "Mengganti semua warna", en: "Changing all colors" },
          { id: "Menambah animasi", en: "Adding animations" },
        ],
        correctIndex: 1,
        explanation: { id: "Desain yang baik dimulai dari diagnosis masalah, bukan dari mempercantik tampilan.", en: "Good design starts from problem diagnosis, not from beautifying the display." },
      },
      ],
    },
    {
      id: "uiux-m11",
      title: { id: "Proyek Akhir: Case Study Mini", en: "Final Project: Mini Case Study" },
      lessons: [
        {
        id: "uiux-m11l1",
        title: { id: "Proyek Akhir: Case Study Mini", en: "Final Project: Mini Case Study" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Portofolio UI/UX dinilai dari case study, bukan sekadar gambar cantik. Buat satu sekarang.\n\n**Struktur case study mini (dari hasil redesign-mu):**\n1. **Problem**: apa yang rusak dan siapa yang terdampak\n2. **Process**: sketsa, wireframe, iterasi — tunjukkan cara berpikirmu\n3. **Solution**: desain final + alasan tiap keputusan\n4. **Impact**: apa yang membaik (meski dari tes ke 3 teman saja)\n\nSusun jadi 1 halaman rapi di Figma/Notion/Behance.\n\n## Latihan Praktis\nPublikasikan case study pertamamu minggu ini, lalu minta critique di komunitas desain (grup Discord/Facebook designer Indonesia).",
          en: "A UI/UX portfolio is judged by case studies, not just pretty pictures. Make one now.\n\n**Mini case study structure (from your redesign):**\n1. **Problem**: what is broken and who is affected\n2. **Process**: sketches, wireframes, iterations — show your thinking\n3. **Solution**: final design + reasoning for each decision\n4. **Impact**: what improved (even just from testing with 3 friends)\n\nArrange it into 1 tidy page on Figma/Notion/Behance.\n\n## Practical Exercise\nPublish your first case study this week, then ask for critique in design communities (Indonesian designer Discord/Facebook groups).",
        },
        },
        {
          id: "uiux-m11l2",
          title: { id: "Pendalaman: Proyek Akhir: Case Study Mini", en: "Deep Dive: Final Project: Mini Case Study" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Proyek Akhir: Case Study Mini**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Final Project: Mini Case Study**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m11l3",
          title: { id: "Penerapan: Proyek Akhir: Case Study Mini", en: "Application: Final Project: Mini Case Study" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Proyek Akhir: Case Study Mini** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Final Project: Mini Case Study** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m11-cq1",
        question: { id: "Bagian case study yang paling dilirik rekruter adalah...", en: "The case study part that most catches recruiters' eyes is..." },
        options: [
          { id: "Warna-warna cantik", en: "Pretty colors" },
          { id: "Proses berpikir dari problem ke solusi", en: "The thinking process from problem to solution" },
          { id: "Jumlah layar", en: "The number of screens" },
          { id: "Logo aplikasinya", en: "The app's logo" },
        ],
        correctIndex: 1,
        explanation: { id: "Rekruter membeli cara berpikirmu memecahkan masalah, bukan hanya hasil visual.", en: "Recruiters buy your problem-solving thinking, not just visual output." },
      },
      {
        id: "uiux-m11-cq2",
        question: { id: "Apa yang membuat case study junior terlihat kredibel?", en: "What makes a junior's case study look credible?" },
        options: [
          { id: "Mengaku sebagai senior", en: "Claiming to be a senior" },
          { id: "Kejujuran proses: masalah nyata, iterasi, dan pembelajaran", en: "Process honesty: real problems, iterations, and learnings" },
          { id: "Banyak mockup 3D", en: "Lots of 3D mockups" },
          { id: "Istilah asing yang rumit", en: "Complicated foreign terms" },
        ],
        correctIndex: 1,
        explanation: { id: "Kejujuran proses dan refleksi pembelajaran menunjukkan kematangan berpikir yang dicari tim.", en: "Process honesty and learning reflection show the thinking maturity teams look for." },
      },
      ],
    },
    {
      id: "uiux-m12",
      title: { id: "Melamar Kerja & Interview Desain", en: "Applying for Jobs & Design Interviews" },
      lessons: [
        {
        id: "uiux-m12l1",
        title: { id: "Melamar Kerja & Interview Desain", en: "Applying for Jobs & Design Interviews" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Dengan 1-2 case study, kamu sudah bisa mulai melamar. Begini strateginya.\n\n**Paket lamaran junior:**\n- CV 1 halaman: skill tools (Figma), prinsip desain, link portofolio\n- Portofolio: 2-3 case study — lebih baik sedikit tapi dalam\n- Surat singkat personal per perusahaan (bukan template massal)\n\n**Persiapan interview desain:** siapkan cerita 5 menit per case study dengan format situasi-problem-proses-hasil, dan latihan whiteboard challenge: memikirkan solusi sambil bicara keras.\n\n## Latihan Praktis\nKirim lamaran ke 5 lowongan junior UI/UX minggu ini dan rekam latihan presentasi case study-mu untuk evaluasi.",
          en: "With 1-2 case studies, you can start applying. Here's the strategy.\n\n**Junior application package:**\n- 1-page CV: tool skills (Figma), design principles, portfolio link\n- Portfolio: 2-3 case studies — fewer but deeper is better\n- A short personal letter per company (not a mass template)\n\n**Design interview preparation:** prepare a 5-minute story per case study in situation-problem-process-result format, and practice whiteboard challenges: thinking through solutions while speaking out loud.\n\n## Practical Exercise\nSend applications to 5 junior UI/UX openings this week and record your case study presentation practice for evaluation.",
        },
        },
        {
          id: "uiux-m12l2",
          title: { id: "Pendalaman: Melamar Kerja & Interview Desain", en: "Deep Dive: Applying for Jobs & Design Interviews" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Melamar Kerja & Interview Desain**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Applying for Jobs & Design Interviews**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "uiux-m12l3",
          title: { id: "Penerapan: Melamar Kerja & Interview Desain", en: "Application: Applying for Jobs & Design Interviews" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Melamar Kerja & Interview Desain** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Applying for Jobs & Design Interviews** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "uiux-m12-cq1",
        question: { id: "Format terbaik menceritakan case study saat interview adalah...", en: "The best format for telling a case study in an interview is..." },
        options: [
          { id: "Baca slide pelan-pelan", en: "Reading slides slowly" },
          { id: "Situasi - problem - proses - hasil", en: "Situation - problem - process - result" },
          { id: "Hanya tunjukkan gambar final", en: "Only showing the final images" },
          { id: "Cerita panjang tanpa struktur", en: "A long story without structure" },
        ],
        correctIndex: 1,
        explanation: { id: "Struktur yang jelas memudahkan interviewer mengikuti alur berpikirmu dalam waktu singkat.", en: "A clear structure makes it easy for the interviewer to follow your thinking in a short time." },
      },
      {
        id: "uiux-m12-cq2",
        question: { id: "Berapa jumlah case study ideal untuk portofolio junior?", en: "What is the ideal number of case studies for a junior portfolio?" },
        options: [
          { id: "Sebanyak mungkin", en: "As many as possible" },
          { id: "2-3 case study yang dalam", en: "2-3 deep case studies" },
          { id: "10 halaman mockup", en: "10 pages of mockups" },
          { id: "Tidak perlu case study", en: "No case study needed" },
        ],
        correctIndex: 1,
        explanation: { id: "Kedalaman berpikir di 2-3 case study jauh lebih bernilai daripada banyak karya dangkal.", en: "Thinking depth in 2-3 case studies is worth far more than many shallow works." },
      },
      ],
    },
  ],
  quiz: [
  {
    id: "uiux-q1",
    question: { id: "Prinsip desain yang mengatur elemen terpenting agar paling menonjol adalah...", en: "The design principle that makes the most important element stand out is..." },
    options: [
      { id: "Proximity", en: "Proximity" },
      { id: "Hierarchy", en: "Hierarchy" },
      { id: "Whitespace", en: "Whitespace" },
      { id: "Alignment", en: "Alignment" },
    ],
    correctIndex: 1,
  },
  {
    id: "uiux-q2",
    question: { id: "Dalam aturan 60-30-10, warna aksen dipakai untuk...", en: "In the 60-30-10 rule, accent color is used for..." },
    options: [
      { id: "Latar belakang utama", en: "Main background" },
      { id: "Semua teks", en: "All text" },
      { id: "Tombol CTA dan elemen penting", en: "CTA buttons and key elements" },
      { id: "Border saja", en: "Borders only" },
    ],
    correctIndex: 2,
  },
  {
    id: "uiux-q3",
    question: { id: "Apa fungsi whitespace dalam desain?", en: "What is the function of whitespace in design?" },
    options: [
      { id: "Pemborosan ruang", en: "Wasting space" },
      { id: "Ruang napas agar desain tidak sesak", en: "Breathing room so designs don't feel cramped" },
      { id: "Tempat iklan", en: "Space for ads" },
      { id: "Area kosong yang harus diisi", en: "Empty area that must be filled" },
    ],
    correctIndex: 1,
  },
  {
    id: "uiux-q4",
    question: { id: "Wireframe harus dibuat...", en: "Wireframes should be made..." },
    options: [
      { id: "Setelah desain final", en: "After the final design" },
      { id: "Sebelum desain visual, fokus ke struktur", en: "Before visual design, focusing on structure" },
      { id: "Dengan warna lengkap", en: "With full colors" },
      { id: "Oleh developer saja", en: "Only by developers" },
    ],
    correctIndex: 1,
  },
  {
    id: "uiux-q5",
    question: { id: "Apa itu user persona?", en: "What is a user persona?" },
    options: [
      { id: "Akun media sosial", en: "A social media account" },
      { id: "Profil fiktif pengguna ideal", en: "A fictional profile of the ideal user" },
      { id: "Nama aplikasi", en: "An app name" },
      { id: "Avatar dalam game", en: "A game avatar" },
    ],
    correctIndex: 1,
  },
  {
    id: "uiux-q6",
    question: { id: "Berapa pengguna yang cukup untuk menemukan 85% masalah usability?", en: "How many users are enough to find 85% of usability problems?" },
    options: [
      { id: "1 orang", en: "1 person" },
      { id: "5 orang", en: "5 people" },
      { id: "100 orang", en: "100 people" },
      { id: "1000 orang", en: "1000 people" },
    ],
    correctIndex: 1,
  },
  {
    id: "uiux-q7",
    question: { id: "Tools desain UI/UX paling populer dan gratis untuk pemula adalah...", en: "The most popular and free UI/UX design tool for beginners is..." },
    options: [
      { id: "Microsoft Word", en: "Microsoft Word" },
      { id: "Figma", en: "Figma" },
      { id: "Paint", en: "Paint" },
      { id: "Excel", en: "Excel" },
    ],
    correctIndex: 1,
  },
  {
    id: "uiux-q8",
    question: { id: "Portofolio UI/UX yang baik berisi...", en: "A good UI/UX portfolio contains..." },
    options: [
      { id: "Banyak gambar tanpa penjelasan", en: "Many images without explanation" },
      { id: "Case study yang menceritakan proses pemecahan masalah", en: "Case studies telling problem-solving processes" },
      { id: "Foto diri", en: "Self photos" },
      { id: "Sertifikat kursus saja", en: "Course certificates only" },
    ],
    correctIndex: 1,
  },
  {
    id: "uiux-q9",
    question: { id: "Urutan struktur case study yang benar adalah...", en: "The correct case study structure order is..." },
    options: [
      { id: "Solusi - Masalah - Proses - Dampak", en: "Solution - Problem - Process - Impact" },
      { id: "Masalah - Proses - Solusi - Dampak", en: "Problem - Process - Solution - Impact" },
      { id: "Dampak - Solusi - Proses - Masalah", en: "Impact - Solution - Process - Problem" },
      { id: "Proses - Masalah - Dampak - Solusi", en: "Process - Problem - Impact - Solution" },
    ],
    correctIndex: 1,
  },
  {
    id: "uiux-q10",
    question: { id: "Cara terbaik masuk karier UI/UX tanpa pengalaman kerja adalah...", en: "The best way to enter a UI/UX career without work experience is..." },
    options: [
      { id: "Tunggu lowongan junior", en: "Wait for junior openings" },
      { id: "Redesign aplikasi populer dan ikut design challenge", en: "Redesign popular apps and join design challenges" },
      { id: "Beli sertifikat palsu", en: "Buy fake certificates" },
      { id: "Kuliah 4 tahun dulu", en: "Study 4 years first" },
    ],
    correctIndex: 1,
  },
  ],
};
