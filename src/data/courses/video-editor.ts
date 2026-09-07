import type { Course } from "../types";

export const videoEditor: Course = {
  id: "video-editor",
  title: { id: "Video Editor", en: "Video Editor" },
  description: {
    id: "Kuasai editing video profesional dari dasar sampai motion graphics.",
    en: "Master professional video editing from basics to motion graphics.",
  },
  longDescription: {
    id: "Belajar editing video dari nol: cutting, color grading, audio mixing, sampai motion graphics sederhana. Skill ini sangat dicari oleh YouTuber, perusahaan, dan agensi.",
    en: "Learn video editing from scratch: cutting, color grading, audio mixing, and simple motion graphics. This skill is in high demand by YouTubers, companies, and agencies.",
  },
  category: "creative",
  difficulty: "intermediate",
  icon: "Scissors",
  color: "#8B5CF6",
  salary: { id: "Rp 4 - 12 juta/bulan", en: "$280 - $850/month" },
  demand: "Tinggi",
  passScore: 70,
  modules: [
    {
      id: "videoEditor-m1",
      title: { id: "Prinsip Cutting yang Baik", en: "Principles of Good Cutting" },
      lessons: [
        {
            id: "ve-l1",
            title: { id: "Prinsip Cutting yang Baik", en: "Principles of Good Cutting" },
            type: "text",
            duration: 6,
            xp: 20,
            body: {
              id: "Editing adalah seni membuang. **Cut** yang baik tidak terasa oleh penonton.\n\n**Prinsip dasar:**\n- Potong di saat gerakan (action) agar mulus\n- Buang semua bagian yang tidak menambah cerita\n- **J-cut**: audio klip berikutnya masuk sebelum gambarnya (transisi halus)\n- **L-cut**: kebalikannya, audio tetap saat gambar ganti\n\nSoftware gratis terbaik: **DaVinci Resolve** (profesional) atau **CapCut** (cepat).",
              en: "Editing is the art of removing. A good **cut** goes unnoticed by viewers.\n\n**Basic principles:**\n- Cut during movement (action) for smoothness\n- Remove everything that doesn't add to the story\n- **J-cut**: next clip's audio enters before its picture (smooth transition)\n- **L-cut**: the opposite, audio continues while picture changes\n\nBest free software: **DaVinci Resolve** (pro) or **CapCut** (fast).",
            },
          },
        {
          id: "videoEditor-m1l2",
          title: { id: "Pendalaman: Prinsip Cutting yang Baik", en: "Deep Dive: Principles of Good Cutting" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Prinsip Cutting yang Baik**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Principles of Good Cutting**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m1l3",
          title: { id: "Penerapan: Prinsip Cutting yang Baik", en: "Application: Principles of Good Cutting" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Prinsip Cutting yang Baik** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Principles of Good Cutting** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m1-cq1",
        question: { id: "Kapan waktu terbaik melakukan cut agar mulus?", en: "When is the best time to cut for smoothness?" },
        options: [
          { id: "Saat subjek diam", en: "When the subject is still" },
          { id: "Saat gerakan/action", en: "During movement/action" },
          { id: "Sembarang waktu", en: "Any time" },
          { id: "Setiap 5 detik", en: "Every 5 seconds" },
        ],
        correctIndex: 1,
      },
      {
        id: "videoEditor-m1-cq2",
        question: { id: "Apa itu J-cut?", en: "What is a J-cut?" },
        options: [
          { id: "Cut berbentuk huruf J", en: "A J-shaped cut" },
          { id: "Audio klip berikutnya masuk sebelum gambarnya", en: "Next clip's audio enters before its picture" },
          { id: "Cut paling lambat", en: "The slowest cut" },
          { id: "Transisi putar", en: "A spin transition" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m2",
      title: { id: "Video: DaVinci Resolve Dasar", en: "Video: DaVinci Resolve Basics" },
      lessons: [
        {
            id: "ve-l2",
            title: { id: "Video: DaVinci Resolve Dasar", en: "Video: DaVinci Resolve Basics" },
            type: "video",
            duration: 10,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/4o-X3tZvGKM",
          },
        {
          id: "videoEditor-m2l2",
          title: { id: "Pendalaman: Video: DaVinci Resolve Dasar", en: "Deep Dive: Video: DaVinci Resolve Basics" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: DaVinci Resolve Dasar**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: DaVinci Resolve Basics**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m2l3",
          title: { id: "Penerapan: Video: DaVinci Resolve Dasar", en: "Application: Video: DaVinci Resolve Basics" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: DaVinci Resolve Dasar** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: DaVinci Resolve Basics** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m2-cq1",
        question: { id: "Software editing profesional yang GRATIS adalah...", en: "A professional FREE editing software is..." },
        options: [
          { id: "Adobe Premiere", en: "Adobe Premiere" },
          { id: "Final Cut Pro", en: "Final Cut Pro" },
          { id: "DaVinci Resolve", en: "DaVinci Resolve" },
          { id: "Sony Vegas", en: "Sony Vegas" },
        ],
        correctIndex: 2,
      },
      {
        id: "videoEditor-m2-cq2",
        question: { id: "Urutan kerja warna yang benar adalah...", en: "The correct color workflow order is..." },
        options: [
          { id: "Grade dulu, baru correct", en: "Grade first, then correct" },
          { id: "Correct dulu, baru grade", en: "Correct first, then grade" },
          { id: "Bersamaan", en: "At the same time" },
          { id: "Tidak perlu keduanya", en: "Neither is needed" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m3",
      title: { id: "Kartu: Shortcut Wajib", en: "Cards: Must-Know Shortcuts" },
      lessons: [
        {
            id: "ve-l3",
            title: { id: "Kartu: Shortcut Wajib", en: "Cards: Must-Know Shortcuts" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "Cut / Blade (B)", en: "Cut / Blade (B)" },
                back: {
                  id: "Memotong klip di posisi playhead. Shortcut paling sering dipakai dalam editing.",
                  en: "Cuts the clip at the playhead position. The most used shortcut in editing.",
                },
              },
              {
                front: { id: "Ripple Delete", en: "Ripple Delete" },
                back: {
                  id: "Hapus klip dan geser semua klip setelahnya ke kiri otomatis. Timeline tetap rapat.",
                  en: "Deletes a clip and shifts all following clips left automatically. Timeline stays tight.",
                },
              },
              {
                front: { id: "J, K, L", en: "J, K, L" },
                back: {
                  id: "J = mundur, K = berhenti, L = maju. Standar navigasi di semua software editing.",
                  en: "J = rewind, K = stop, L = forward. Standard navigation in all editing software.",
                },
              },
            ],
          },
        {
          id: "videoEditor-m3l2",
          title: { id: "Pendalaman: Kartu: Shortcut Wajib", en: "Deep Dive: Cards: Must-Know Shortcuts" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Shortcut Wajib**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Must-Know Shortcuts**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m3l3",
          title: { id: "Penerapan: Kartu: Shortcut Wajib", en: "Application: Cards: Must-Know Shortcuts" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Shortcut Wajib** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Must-Know Shortcuts** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m3-cq1",
        question: { id: "Apa fungsi LUT dalam editing?", en: "What is the function of a LUT in editing?" },
        options: [
          { id: "Menghapus noise audio", en: "Removing audio noise" },
          { id: "Preset warna untuk grading cepat", en: "Color preset for fast grading" },
          { id: "Menambah resolusi", en: "Increasing resolution" },
          { id: "Memotong video otomatis", en: "Auto-cutting video" },
        ],
        correctIndex: 1,
      },
      {
        id: "videoEditor-m3-cq2",
        question: { id: "Level ideal untuk suara dialog adalah...", en: "The ideal level for dialogue audio is..." },
        options: [
          { id: "0 dB (maksimal)", en: "0 dB (maximum)" },
          { id: "-6 sampai -12 dB", en: "-6 to -12 dB" },
          { id: "-50 dB", en: "-50 dB" },
          { id: "+10 dB", en: "+10 dB" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m4",
      title: { id: "Color Correction vs Grading", en: "Color Correction vs Grading" },
      lessons: [
        {
            id: "ve-l4",
            title: { id: "Color Correction vs Grading", en: "Color Correction vs Grading" },
            type: "text",
            duration: 7,
            xp: 25,
            body: {
              id: "**Color correction** = memperbaiki warna agar natural (exposure, white balance).\n**Color grading** = memberi style/mood (hangat, dingin, sinematik).\n\n**Urutan kerja benar:** correct dulu, baru grade.\n\n**Tips cepat:**\n- Exposure: jangan ada area putih/hitam total\n- White balance: putih harus benar-benar putih\n- Gunakan **LUT** (preset warna) untuk grading cepat\n\nVideo flat/LOG memang terlihat pudar — itu normal, dirancang untuk di-grade.",
              en: "**Color correction** = fixing colors to look natural (exposure, white balance).\n**Color grading** = adding style/mood (warm, cold, cinematic).\n\n**Correct workflow:** correct first, then grade.\n\n**Quick tips:**\n- Exposure: no fully white/black areas\n- White balance: whites must be truly white\n- Use **LUTs** (color presets) for fast grading\n\nFlat/LOG video looks washed out on purpose — it's designed for grading.",
            },
          },
        {
          id: "videoEditor-m4l2",
          title: { id: "Pendalaman: Color Correction vs Grading", en: "Deep Dive: Color Correction vs Grading" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Color Correction vs Grading**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Color Correction vs Grading**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m4l3",
          title: { id: "Penerapan: Color Correction vs Grading", en: "Application: Color Correction vs Grading" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Color Correction vs Grading** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Color Correction vs Grading** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m4-cq1",
        question: { id: "Apa itu ducking dalam audio?", en: "What is ducking in audio?" },
        options: [
          { id: "Suara bebek", en: "Duck sounds" },
          { id: "Musik mengecil otomatis saat dialog", en: "Music auto-lowering during dialogue" },
          { id: "Menghapus semua audio", en: "Removing all audio" },
          { id: "Mempercepat audio", en: "Speeding up audio" },
        ],
        correctIndex: 1,
      },
      {
        id: "videoEditor-m4-cq2",
        question: { id: "Apa yang membuat animasi teks terasa hidup?", en: "What makes text animation feel alive?" },
        options: [
          { id: "Gerakan linear", en: "Linear movement" },
          { id: "Easing (percepatan/perlambatan)", en: "Easing (acceleration/deceleration)" },
          { id: "Warna cerah", en: "Bright colors" },
          { id: "Ukuran besar", en: "Large size" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m5",
      title: { id: "Video: Color Grading Sinematik", en: "Video: Cinematic Color Grading" },
      lessons: [
        {
            id: "ve-l5",
            title: { id: "Video: Color Grading Sinematik", en: "Video: Cinematic Color Grading" },
            type: "video",
            duration: 9,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/KcSx0mFvWKE",
          },
        {
          id: "videoEditor-m5l2",
          title: { id: "Pendalaman: Video: Color Grading Sinematik", en: "Deep Dive: Video: Cinematic Color Grading" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Color Grading Sinematik**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Cinematic Color Grading**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m5l3",
          title: { id: "Penerapan: Video: Color Grading Sinematik", en: "Application: Video: Cinematic Color Grading" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Color Grading Sinematik** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Cinematic Color Grading** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m5-cq1",
        question: { id: "Lower third adalah...", en: "A lower third is..." },
        options: [
          { id: "Sepertiga video terbawah dihapus", en: "The bottom third of the video removed" },
          { id: "Teks nama/jabatan di pojok bawah", en: "Name/title text in the bottom corner" },
          { id: "Musik di akhir video", en: "Music at the video's end" },
          { id: "Efek transisi bawah", en: "A bottom transition effect" },
        ],
        correctIndex: 1,
      },
      {
        id: "videoEditor-m5-cq2",
        question: { id: "Hal pertama untuk membangun karier video editor adalah...", en: "The first step to building a video editor career is..." },
        options: [
          { id: "Beli PC mahal", en: "Buy an expensive PC" },
          { id: "Buat 3 video demo terbaik untuk portofolio", en: "Create 3 best demo videos for a portfolio" },
          { id: "Ikut kursus mahal", en: "Take an expensive course" },
          { id: "Tunggu ada klien", en: "Wait for clients" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m6",
      title: { id: "Audio: Separuh dari Video", en: "Audio: Half of the Video" },
      lessons: [
        {
            id: "ve-l6",
            title: { id: "Audio: Separuh dari Video", en: "Audio: Half of the Video" },
            type: "text",
            duration: 6,
            xp: 25,
            body: {
              id: "Penonton memaafkan video buram, tapi tidak audio jelek.\n\n**Level audio ideal:**\n- Suara dialog: -6 sampai -12 dB\n- Musik latar: -20 sampai -30 dB (jangan menutupi suara)\n\n**Trik pro:**\n- Gunakan **keyframes audio** untuk fade in/out musik\n- **Ducking**: musik mengecil otomatis saat ada dialog\n- Tambahkan **sound effect** halus (whoosh, pop) untuk transisi\n\nSelalu cek audio pakai earphone sebelum export.",
              en: "Viewers forgive blurry video, but not bad audio.\n\n**Ideal audio levels:**\n- Dialogue: -6 to -12 dB\n- Background music: -20 to -30 dB (don't drown out voices)\n\n**Pro tricks:**\n- Use **audio keyframes** for music fade in/out\n- **Ducking**: music auto-lowers during dialogue\n- Add subtle **sound effects** (whoosh, pop) for transitions\n\nAlways check audio with earphones before exporting.",
            },
          },
        {
          id: "videoEditor-m6l2",
          title: { id: "Pendalaman: Audio: Separuh dari Video", en: "Deep Dive: Audio: Half of the Video" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Audio: Separuh dari Video**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Audio: Half of the Video**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m6l3",
          title: { id: "Penerapan: Audio: Separuh dari Video", en: "Application: Audio: Half of the Video" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Audio: Separuh dari Video** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Audio: Half of the Video** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m6-cq1",
        question: { id: "Kapan waktu terbaik melakukan cut agar mulus?", en: "When is the best time to cut for smoothness?" },
        options: [
          { id: "Saat subjek diam", en: "When the subject is still" },
          { id: "Saat gerakan/action", en: "During movement/action" },
          { id: "Sembarang waktu", en: "Any time" },
          { id: "Setiap 5 detik", en: "Every 5 seconds" },
        ],
        correctIndex: 1,
      },
      {
        id: "videoEditor-m6-cq2",
        question: { id: "Apa itu J-cut?", en: "What is a J-cut?" },
        options: [
          { id: "Cut berbentuk huruf J", en: "A J-shaped cut" },
          { id: "Audio klip berikutnya masuk sebelum gambarnya", en: "Next clip's audio enters before its picture" },
          { id: "Cut paling lambat", en: "The slowest cut" },
          { id: "Transisi putar", en: "A spin transition" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m7",
      title: { id: "Motion Graphics Sederhana", en: "Simple Motion Graphics" },
      lessons: [
        {
            id: "ve-l7",
            title: { id: "Motion Graphics Sederhana", en: "Simple Motion Graphics" },
            type: "text",
            duration: 7,
            xp: 25,
            body: {
              id: "Motion graphics membuat video terasa premium.\n\n**3 efek dasar yang wajib dikuasai:**\n1. **Text animation**: judul muncul dengan easing (jangan linear, terasa kaku)\n2. **Zoom & pan digital**: memberi gerakan pada gambar diam (Ken Burns effect)\n3. **Lower third**: nama/jabatan narasumber di pojok bawah\n\nKunci: **easing** (percepatan/perlambatan) membuat semua animasi terasa hidup.",
              en: "Motion graphics make videos feel premium.\n\n**3 basic effects to master:**\n1. **Text animation**: titles appear with easing (not linear, which feels stiff)\n2. **Digital zoom & pan**: movement on still images (Ken Burns effect)\n3. **Lower third**: speaker's name/title in the bottom corner\n\nKey: **easing** (acceleration/deceleration) makes all animation feel alive.",
            },
          },
        {
          id: "videoEditor-m7l2",
          title: { id: "Pendalaman: Motion Graphics Sederhana", en: "Deep Dive: Simple Motion Graphics" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Motion Graphics Sederhana**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Simple Motion Graphics**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m7l3",
          title: { id: "Penerapan: Motion Graphics Sederhana", en: "Application: Simple Motion Graphics" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Motion Graphics Sederhana** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Simple Motion Graphics** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m7-cq1",
        question: { id: "Software editing profesional yang GRATIS adalah...", en: "A professional FREE editing software is..." },
        options: [
          { id: "Adobe Premiere", en: "Adobe Premiere" },
          { id: "Final Cut Pro", en: "Final Cut Pro" },
          { id: "DaVinci Resolve", en: "DaVinci Resolve" },
          { id: "Sony Vegas", en: "Sony Vegas" },
        ],
        correctIndex: 2,
      },
      {
        id: "videoEditor-m7-cq2",
        question: { id: "Urutan kerja warna yang benar adalah...", en: "The correct color workflow order is..." },
        options: [
          { id: "Grade dulu, baru correct", en: "Grade first, then correct" },
          { id: "Correct dulu, baru grade", en: "Correct first, then grade" },
          { id: "Bersamaan", en: "At the same time" },
          { id: "Tidak perlu keduanya", en: "Neither is needed" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m8",
      title: { id: "Video: Animasi Teks Profesional", en: "Video: Professional Text Animation" },
      lessons: [
        {
            id: "ve-l8",
            title: { id: "Video: Animasi Teks Profesional", en: "Video: Professional Text Animation" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/nKHdHqpFzTo",
          },
        {
          id: "videoEditor-m8l2",
          title: { id: "Pendalaman: Video: Animasi Teks Profesional", en: "Deep Dive: Video: Professional Text Animation" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Animasi Teks Profesional**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Professional Text Animation**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m8l3",
          title: { id: "Penerapan: Video: Animasi Teks Profesional", en: "Application: Video: Professional Text Animation" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Animasi Teks Profesional** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Professional Text Animation** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m8-cq1",
        question: { id: "Apa fungsi LUT dalam editing?", en: "What is the function of a LUT in editing?" },
        options: [
          { id: "Menghapus noise audio", en: "Removing audio noise" },
          { id: "Preset warna untuk grading cepat", en: "Color preset for fast grading" },
          { id: "Menambah resolusi", en: "Increasing resolution" },
          { id: "Memotong video otomatis", en: "Auto-cutting video" },
        ],
        correctIndex: 1,
      },
      {
        id: "videoEditor-m8-cq2",
        question: { id: "Level ideal untuk suara dialog adalah...", en: "The ideal level for dialogue audio is..." },
        options: [
          { id: "0 dB (maksimal)", en: "0 dB (maximum)" },
          { id: "-6 sampai -12 dB", en: "-6 to -12 dB" },
          { id: "-50 dB", en: "-50 dB" },
          { id: "+10 dB", en: "+10 dB" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m9",
      title: { id: "Membangun Portofolio & Harga", en: "Building Portfolio & Pricing" },
      lessons: [
        {
            id: "ve-l9",
            title: { id: "Membangun Portofolio & Harga", en: "Building Portfolio & Pricing" },
            type: "text",
            duration: 6,
            xp: 20,
            body: {
              id: "Editor dinilai dari portofolio, bukan sertifikat.\n\n**Langkah memulai:**\n1. Buat 3 video demo terbaik (boleh dari footage gratis)\n2. Upload ke YouTube/Google Drive, siapkan link\n3. Tawarkan jasa: UMKM lokal, YouTuber kecil, wedding\n\n**Patokan harga pemula (Indonesia):**\n- Video pendek (Reels/TikTok): Rp 50-150rb/video\n- Video YouTube 10 menit: Rp 300rb - 1jt\n- Naikkan harga tiap 10 klien puas.",
              en: "Editors are judged by portfolios, not certificates.\n\n**Getting started:**\n1. Create 3 best demo videos (free stock footage is fine)\n2. Upload to YouTube/Google Drive, prepare the link\n3. Offer services: local SMEs, small YouTubers, weddings\n\n**Beginner pricing guide (Indonesia):**\n- Short videos (Reels/TikTok): Rp 50-150k/video\n- 10-min YouTube video: Rp 300k - 1M\n- Raise prices every 10 satisfied clients.",
            },
          },
        {
          id: "videoEditor-m9l2",
          title: { id: "Pendalaman: Membangun Portofolio & Harga", en: "Deep Dive: Building Portfolio & Pricing" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Membangun Portofolio & Harga**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Building Portfolio & Pricing**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m9l3",
          title: { id: "Penerapan: Membangun Portofolio & Harga", en: "Application: Building Portfolio & Pricing" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Membangun Portofolio & Harga** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Building Portfolio & Pricing** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m9-cq1",
        question: { id: "Apa itu ducking dalam audio?", en: "What is ducking in audio?" },
        options: [
          { id: "Suara bebek", en: "Duck sounds" },
          { id: "Musik mengecil otomatis saat dialog", en: "Music auto-lowering during dialogue" },
          { id: "Menghapus semua audio", en: "Removing all audio" },
          { id: "Mempercepat audio", en: "Speeding up audio" },
        ],
        correctIndex: 1,
      },
      {
        id: "videoEditor-m9-cq2",
        question: { id: "Apa yang membuat animasi teks terasa hidup?", en: "What makes text animation feel alive?" },
        options: [
          { id: "Gerakan linear", en: "Linear movement" },
          { id: "Easing (percepatan/perlambatan)", en: "Easing (acceleration/deceleration)" },
          { id: "Warna cerah", en: "Bright colors" },
          { id: "Ukuran besar", en: "Large size" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "videoEditor-m10",
      title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
      lessons: [
        {
        id: "videoEditor-m10l1",
        title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Uji semua skill dasarmu — cutting, color, audio, motion — dalam satu video pendek.\n\n**Drill video 60 detik:**\n1. Ambil footage HP-mu sendiri (atau footage gratis Pexels)\n2. Cutting rapat: buang semua jeda mati, maksimal 60 detik\n3. Color correction dulu (white balance, exposure), baru grading sinematik tipis\n4. Audio: rapikan suara, tambah musik di -18 dB di bawah voice\n5. Tutup dengan 1 animasi teks sederhana sebagai judul\n\nSatu video ini merangkum seluruh jalur belajarmu.\n\n## Latihan Praktis\nSelesaikan drillnya dan minta 3 orang menonton tanpa konteks — tanya di bagian mana mereka bosan. Itu titik perbaikanmu.",
          en: "Test all your basic skills — cutting, color, audio, motion — in one short video.\n\n**60-second video drill:**\n1. Use your own phone footage (or free Pexels footage)\n2. Tight cutting: remove all dead air, maximum 60 seconds\n3. Color correct first (white balance, exposure), then light cinematic grading\n4. Audio: clean up sound, add music at -18 dB below voice\n5. Close with 1 simple text animation as the title\n\nThis one video summarizes your entire learning path.\n\n## Practical Exercise\nFinish the drill and ask 3 people to watch without context — ask where they got bored. That's your improvement point.",
        },
        },
        {
          id: "videoEditor-m10l2",
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
          id: "videoEditor-m10l3",
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
        id: "videoEditor-m10-cq1",
        question: { id: "Urutan kerja color yang benar adalah...", en: "The correct color workflow order is..." },
        options: [
          { id: "Grading dulu baru correction", en: "Grading first, then correction" },
          { id: "Correction dulu baru grading", en: "Correction first, then grading" },
          { id: "Bersamaan saja", en: "Both at the same time" },
          { id: "Tidak perlu correction", en: "No correction needed" },
        ],
        correctIndex: 1,
        explanation: { id: "Correction menetralkan gambar dulu; grading memberi gaya di atas dasar yang sudah benar.", en: "Correction neutralizes the image first; grading adds style on top of a correct base." },
      },
      {
        id: "videoEditor-m10-cq2",
        question: { id: "Level musik latar yang aman di bawah suara dialog adalah sekitar...", en: "A safe background music level below dialogue is around..." },
        options: [
          { id: "0 dB", en: "0 dB" },
          { id: "-18 dB", en: "-18 dB" },
          { id: "+6 dB", en: "+6 dB" },
          { id: "Sama keras dengan dialog", en: "As loud as the dialogue" },
        ],
        correctIndex: 1,
        explanation: { id: "Musik terlalu keras menutupi dialog; -18 dB menjaganya terasa tanpa mengganggu.", en: "Music too loud covers dialogue; -18 dB keeps it felt without disturbing." },
      },
      ],
    },
    {
      id: "videoEditor-m11",
      title: { id: "Proyek Akhir: Video Klien Simulasi", en: "Final Project: Simulated Client Video" },
      lessons: [
        {
        id: "videoEditor-m11l1",
        title: { id: "Proyek Akhir: Video Klien Simulasi", en: "Final Project: Simulated Client Video" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Simulasikan pekerjaan klien nyata dari brief sampai revisi.\n\n**Brief imajiner:** bisnis lokal butuh video promosi 30-45 detik untuk Instagram.\n\n**Alur kerja profesional:**\n1. Brief: tulis 3 tujuan video & target penonton\n2. Rough cut: struktur tanpa efek — minta 'klien' (teman) review\n3. Fine cut: color, audio, motion graphics\n4. Revisi 1x: catat semua masukan, kerjakan tanpa debat\n5. Deliver: export 1080p + file project rapi\n\nMengerjakan revisi dengan tenang adalah skill klien yang paling mahal harganya.\n\n## Latihan Praktis\nJalankan seluruh alurnya dan catat berapa lama tiap tahap — ini dasar perhitungan harga jasamu nanti.",
          en: "Simulate real client work from brief to revision.\n\n**Imaginary brief:** a local business needs a 30-45 second promo video for Instagram.\n\n**Professional workflow:**\n1. Brief: write 3 video goals & target audience\n2. Rough cut: structure without effects — have the 'client' (a friend) review\n3. Fine cut: color, audio, motion graphics\n4. 1 revision round: note all input, execute without arguing\n5. Deliver: 1080p export + tidy project files\n\nHandling revisions calmly is the most expensive client skill.\n\n## Practical Exercise\nRun the entire workflow and record how long each stage takes — this becomes the basis for calculating your service pricing.",
        },
        },
        {
          id: "videoEditor-m11l2",
          title: { id: "Pendalaman: Proyek Akhir: Video Klien Simulasi", en: "Deep Dive: Final Project: Simulated Client Video" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Proyek Akhir: Video Klien Simulasi**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Final Project: Simulated Client Video**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m11l3",
          title: { id: "Penerapan: Proyek Akhir: Video Klien Simulasi", en: "Application: Final Project: Simulated Client Video" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Proyek Akhir: Video Klien Simulasi** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Final Project: Simulated Client Video** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m11-cq1",
        question: { id: "Mengapa rough cut ditunjukkan ke klien sebelum efek dikerjakan?", en: "Why show the rough cut to the client before working on effects?" },
        options: [
          { id: "Supaya klien terkesan", en: "To impress the client" },
          { id: "Struktur disetujui dulu, revisi besar tidak terjadi di akhir", en: "Structure gets approved first, big revisions don't happen at the end" },
          { id: "Karena malas mengedit", en: "Because of laziness" },
          { id: "Supaya cepat selesai", en: "To finish quickly" },
        ],
        correctIndex: 1,
        explanation: { id: "Mengubah struktur setelah efek selesai membuang berjam-jam kerja — validasi struktur di awal.", en: "Changing structure after effects are done wastes hours of work — validate structure early." },
      },
      {
        id: "videoEditor-m11-cq2",
        question: { id: "Sikap profesional saat menerima revisi klien adalah...", en: "The professional attitude when receiving client revisions is..." },
        options: [
          { id: "Debat sampai klien menyerah", en: "Arguing until the client gives up" },
          { id: "Catat semua masukan dan kerjakan dengan tenang", en: "Note all input and execute calmly" },
          { id: "Menolak semua revisi", en: "Rejecting all revisions" },
          { id: "Menghilang tanpa kabar", en: "Disappearing without news" },
        ],
        correctIndex: 1,
        explanation: { id: "Revisi adalah bagian normal pekerjaan; editor yang tenang dan solutif akan dipakai lagi.", en: "Revisions are a normal part of the job; calm, solution-oriented editors get rehired." },
      },
      ],
    },
    {
      id: "videoEditor-m12",
      title: { id: "Rate Card & Klien Berbayar Pertama", en: "Rate Card & Your First Paying Client" },
      lessons: [
        {
        id: "videoEditor-m12l1",
        title: { id: "Rate Card & Klien Berbayar Pertama", en: "Rate Card & Your First Paying Client" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Waktunya menetapkan harga dan berburu klien nyata.\n\n**Patokan harga pemula (pasar Indonesia):**\n- Video reels/TikTok 30-60 dtk: Rp 150-400 ribu\n- Video promosi 1-3 menit: Rp 500 ribu - 1,5 juta\n- Paket bulanan 8-12 video pendek: Rp 1,5-4 juta\n\n**Cara mencari klien pertama:** tawarkan ke kreator UMKM yang videonya masih seadanya, lampirkan 1 contoh edit ulang 15 detik dari video mereka — bukti langsung mengalahkan seribu kata promosi.\n\n## Latihan Praktis\nBuat rate card 3 paket, pilih 5 calon klien, edit ulang 15 detik video salah satu video mereka sebagai contoh, dan kirim penawaranmu minggu ini.",
          en: "Time to set your price and hunt real clients.\n\n**Beginner pricing benchmarks (Indonesian market):**\n- Reels/TikTok video 30-60s: IDR 150-400k\n- Promo video 1-3 minutes: IDR 500k - 1.5 million\n- Monthly package 8-12 short videos: IDR 1.5-4 million\n\n**Finding your first client:** approach SME creators whose videos are still basic, attach a 15-second re-edit sample of their own video — direct proof beats a thousand words of promotion.\n\n## Practical Exercise\nMake a 3-package rate card, pick 5 prospective clients, re-edit 15 seconds of one of their videos as a sample, and send your offer this week.",
        },
        },
        {
          id: "videoEditor-m12l2",
          title: { id: "Pendalaman: Rate Card & Klien Berbayar Pertama", en: "Deep Dive: Rate Card & Your First Paying Client" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Rate Card & Klien Berbayar Pertama**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Rate Card & Your First Paying Client**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "videoEditor-m12l3",
          title: { id: "Penerapan: Rate Card & Klien Berbayar Pertama", en: "Application: Rate Card & Your First Paying Client" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Rate Card & Klien Berbayar Pertama** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Rate Card & Your First Paying Client** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "videoEditor-m12-cq1",
        question: { id: "Cara paling efektif meyakinkan calon klien video editing adalah...", en: "The most effective way to convince a prospective video editing client is..." },
        options: [
          { id: "Mengirim CV panjang", en: "Sending a long CV" },
          { id: "Contoh edit ulang video mereka sendiri", en: "A re-edit sample of their own video" },
          { id: "Menawarkan harga termurah", en: "Offering the cheapest price" },
          { id: "Bercerita soal alat mahal", en: "Talking about expensive gear" },
        ],
        correctIndex: 1,
        explanation: { id: "Klien langsung melihat hasil pada kontennya sendiri — bukti konkret mengalahkan janji.", en: "The client directly sees results on their own content — concrete proof beats promises." },
      },
      {
        id: "videoEditor-m12-cq2",
        question: { id: "Apa dasar paling adil untuk menentukan harga jasa editing?", en: "What is the fairest basis for determining editing service pricing?" },
        options: [
          { id: "Tebakan acak", en: "Random guessing" },
          { id: "Waktu kerja per tahap + kualitas hasil", en: "Work time per stage + result quality" },
          { id: "Harga termahal di pasar", en: "The most expensive market price" },
          { id: "Mood saat itu", en: "Current mood" },
        ],
        correctIndex: 1,
        explanation: { id: "Mencatat waktu tiap tahap dari proyek simulasi memberimu dasar harga yang realistis dan menguntungkan.", en: "Recording time per stage from the simulated project gives you a realistic and profitable pricing basis." },
      },
      ],
    },
  ],
  quiz: [
  {
    id: "videoEditor-q1",
    question: { id: "Kapan waktu terbaik melakukan cut agar mulus?", en: "When is the best time to cut for smoothness?" },
    options: [
      { id: "Saat subjek diam", en: "When the subject is still" },
      { id: "Saat gerakan/action", en: "During movement/action" },
      { id: "Sembarang waktu", en: "Any time" },
      { id: "Setiap 5 detik", en: "Every 5 seconds" },
    ],
    correctIndex: 1,
  },
  {
    id: "videoEditor-q2",
    question: { id: "Apa itu J-cut?", en: "What is a J-cut?" },
    options: [
      { id: "Cut berbentuk huruf J", en: "A J-shaped cut" },
      { id: "Audio klip berikutnya masuk sebelum gambarnya", en: "Next clip's audio enters before its picture" },
      { id: "Cut paling lambat", en: "The slowest cut" },
      { id: "Transisi putar", en: "A spin transition" },
    ],
    correctIndex: 1,
  },
  {
    id: "videoEditor-q3",
    question: { id: "Software editing profesional yang GRATIS adalah...", en: "A professional FREE editing software is..." },
    options: [
      { id: "Adobe Premiere", en: "Adobe Premiere" },
      { id: "Final Cut Pro", en: "Final Cut Pro" },
      { id: "DaVinci Resolve", en: "DaVinci Resolve" },
      { id: "Sony Vegas", en: "Sony Vegas" },
    ],
    correctIndex: 2,
  },
  {
    id: "videoEditor-q4",
    question: { id: "Urutan kerja warna yang benar adalah...", en: "The correct color workflow order is..." },
    options: [
      { id: "Grade dulu, baru correct", en: "Grade first, then correct" },
      { id: "Correct dulu, baru grade", en: "Correct first, then grade" },
      { id: "Bersamaan", en: "At the same time" },
      { id: "Tidak perlu keduanya", en: "Neither is needed" },
    ],
    correctIndex: 1,
  },
  {
    id: "videoEditor-q5",
    question: { id: "Apa fungsi LUT dalam editing?", en: "What is the function of a LUT in editing?" },
    options: [
      { id: "Menghapus noise audio", en: "Removing audio noise" },
      { id: "Preset warna untuk grading cepat", en: "Color preset for fast grading" },
      { id: "Menambah resolusi", en: "Increasing resolution" },
      { id: "Memotong video otomatis", en: "Auto-cutting video" },
    ],
    correctIndex: 1,
  },
  {
    id: "videoEditor-q6",
    question: { id: "Level ideal untuk suara dialog adalah...", en: "The ideal level for dialogue audio is..." },
    options: [
      { id: "0 dB (maksimal)", en: "0 dB (maximum)" },
      { id: "-6 sampai -12 dB", en: "-6 to -12 dB" },
      { id: "-50 dB", en: "-50 dB" },
      { id: "+10 dB", en: "+10 dB" },
    ],
    correctIndex: 1,
  },
  {
    id: "videoEditor-q7",
    question: { id: "Apa itu ducking dalam audio?", en: "What is ducking in audio?" },
    options: [
      { id: "Suara bebek", en: "Duck sounds" },
      { id: "Musik mengecil otomatis saat dialog", en: "Music auto-lowering during dialogue" },
      { id: "Menghapus semua audio", en: "Removing all audio" },
      { id: "Mempercepat audio", en: "Speeding up audio" },
    ],
    correctIndex: 1,
  },
  {
    id: "videoEditor-q8",
    question: { id: "Apa yang membuat animasi teks terasa hidup?", en: "What makes text animation feel alive?" },
    options: [
      { id: "Gerakan linear", en: "Linear movement" },
      { id: "Easing (percepatan/perlambatan)", en: "Easing (acceleration/deceleration)" },
      { id: "Warna cerah", en: "Bright colors" },
      { id: "Ukuran besar", en: "Large size" },
    ],
    correctIndex: 1,
  },
  {
    id: "videoEditor-q9",
    question: { id: "Lower third adalah...", en: "A lower third is..." },
    options: [
      { id: "Sepertiga video terbawah dihapus", en: "The bottom third of the video removed" },
      { id: "Teks nama/jabatan di pojok bawah", en: "Name/title text in the bottom corner" },
      { id: "Musik di akhir video", en: "Music at the video's end" },
      { id: "Efek transisi bawah", en: "A bottom transition effect" },
    ],
    correctIndex: 1,
  },
  {
    id: "videoEditor-q10",
    question: { id: "Hal pertama untuk membangun karier video editor adalah...", en: "The first step to building a video editor career is..." },
    options: [
      { id: "Beli PC mahal", en: "Buy an expensive PC" },
      { id: "Buat 3 video demo terbaik untuk portofolio", en: "Create 3 best demo videos for a portfolio" },
      { id: "Ikut kursus mahal", en: "Take an expensive course" },
      { id: "Tunggu ada klien", en: "Wait for clients" },
    ],
    correctIndex: 1,
  },
  ],
};
