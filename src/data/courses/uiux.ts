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
      id: "ux-m1",
      title: { id: "Prinsip Desain Visual", en: "Visual Design Principles" },
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
          id: "ux-l2",
          title: { id: "Video: Teori Warna Praktis", en: "Video: Practical Color Theory" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/AvgCkHrcj90",
        },
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
      ],
    },
    {
      id: "ux-m2",
      title: { id: "Berpikir Seperti UX Designer", en: "Thinking Like a UX Designer" },
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
          id: "ux-l5",
          title: { id: "Video: Figma untuk Pemula", en: "Video: Figma for Beginners" },
          type: "video",
          duration: 10,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/FTFaQWZBqQ8",
        },
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
      ],
    },
    {
      id: "ux-m3",
      title: { id: "Portofolio & Karier", en: "Portfolio & Career" },
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
          id: "ux-l8",
          title: { id: "Video: Review Portofolio Junior", en: "Video: Junior Portfolio Review" },
          type: "video",
          duration: 9,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/g4aPFeWdwDI",
        },
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
      ],
    },
  ],
  quiz: [
    {
      id: "ux-q1",
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
      id: "ux-q2",
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
      id: "ux-q3",
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
      id: "ux-q4",
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
      id: "ux-q5",
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
      id: "ux-q6",
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
      id: "ux-q7",
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
      id: "ux-q8",
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
      id: "ux-q9",
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
      id: "ux-q10",
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
