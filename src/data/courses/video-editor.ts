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
      id: "ve-m1",
      title: { id: "Dasar Editing", en: "Editing Fundamentals" },
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
          id: "ve-l2",
          title: { id: "Video: DaVinci Resolve Dasar", en: "Video: DaVinci Resolve Basics" },
          type: "video",
          duration: 10,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/4o-X3tZvGKM",
        },
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
      ],
    },
    {
      id: "ve-m2",
      title: { id: "Warna & Audio", en: "Color & Audio" },
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
          id: "ve-l5",
          title: { id: "Video: Color Grading Sinematik", en: "Video: Cinematic Color Grading" },
          type: "video",
          duration: 9,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/KcSx0mFvWKE",
        },
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
      ],
    },
    {
      id: "ve-m3",
      title: { id: "Motion Graphics & Karier", en: "Motion Graphics & Career" },
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
          id: "ve-l8",
          title: { id: "Video: Animasi Teks Profesional", en: "Video: Professional Text Animation" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/nKHdHqpFzTo",
        },
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
      ],
    },
  ],
  quiz: [
    {
      id: "ve-q1",
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
      id: "ve-q2",
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
      id: "ve-q3",
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
      id: "ve-q4",
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
      id: "ve-q5",
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
      id: "ve-q6",
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
      id: "ve-q7",
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
      id: "ve-q8",
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
      id: "ve-q9",
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
      id: "ve-q10",
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
