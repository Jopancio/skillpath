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
      id: "cc-m1",
      title: { id: "Fondasi Konten", en: "Content Foundations" },
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
          id: "cc-l2",
          title: { id: "Video: Rahasia Hook 3 Detik", en: "Video: The 3-Second Hook Secret" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/lqv2OgG0kdk",
        },
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
      ],
    },
    {
      id: "cc-m2",
      title: { id: "Produksi dengan HP", en: "Production with a Phone" },
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
          id: "cc-l5",
          title: { id: "Video: Editing di CapCut", en: "Video: Editing in CapCut" },
          type: "video",
          duration: 10,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/2GXx2y1Mq0I",
        },
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
      ],
    },
    {
      id: "cc-m3",
      title: { id: "Algoritma & Konsistensi", en: "Algorithm & Consistency" },
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
          id: "cc-l8",
          title: { id: "Video: Riset Konten Trending", en: "Video: Trending Content Research" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/2HYuE39Cq0M",
        },
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
      ],
    },
  ],
  quiz: [
    {
      id: "cc-q1",
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
      id: "cc-q2",
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
      id: "cc-q3",
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
      id: "cc-q4",
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
      id: "cc-q5",
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
      id: "cc-q6",
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
      id: "cc-q7",
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
      id: "cc-q8",
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
      id: "cc-q9",
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
      id: "cc-q10",
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
