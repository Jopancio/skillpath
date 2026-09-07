import type { Course } from "../types";

export const photography: Course = {
  id: "photography",
  title: { id: "Fotografi Produk & Potret", en: "Product & Portrait Photography" },
  description: {
    id: "Belajar fotografi produk dan potret untuk jualan online dan jasa foto.",
    en: "Learn product and portrait photography for online selling and photo services.",
  },
  longDescription: {
    id: "Kuasai fotografi dengan kamera apapun, termasuk HP: komposisi, pencahayaan, editing, dan cara membangun jasa fotografi produk untuk UMKM serta foto potret profesional.",
    en: "Master photography with any camera, including phones: composition, lighting, editing, and building a product photography service for SMEs and professional portrait shoots.",
  },
  category: "creative",
  difficulty: "beginner",
  icon: "Camera",
  color: "#0EA5E9",
  salary: { id: "Rp 3 - 10 juta/bulan", en: "$200 - $700/month" },
  demand: "Tinggi",
  passScore: 70,
  modules: [
    {
      id: "photography-m1",
      title: { id: "Segitiga Exposure", en: "The Exposure Triangle" },
      lessons: [
        {
            id: "ph-l1",
            title: { id: "Segitiga Exposure", en: "The Exposure Triangle" },
            type: "text",
            duration: 7,
            xp: 20,
            body: {
              id: "Tiga pengaturan yang menentukan terang-gelapnya foto:\n\n1. **Aperture (f/)**: bukaan lensa. Kecil angkanya (f/1.8) = background blur, cahaya banyak\n2. **Shutter speed**: kecepatan rana. Cepat (1/1000) = bekukan gerakan; lambat = motion blur\n3. **ISO**: sensitivitas sensor. Rendah (100) = bersih; tinggi (3200+) = noise/bintik\n\n**Aturan praktis**: siang hari ISO 100, dalam ruangan naikkan aperture dulu sebelum ISO.",
              en: "Three settings that determine photo brightness:\n\n1. **Aperture (f/)**: lens opening. Low number (f/1.8) = blurry background, more light\n2. **Shutter speed**: fast (1/1000) = freezes motion; slow = motion blur\n3. **ISO**: sensor sensitivity. Low (100) = clean; high (3200+) = noise/grain\n\n**Practical rule**: daylight ISO 100, indoors open the aperture first before raising ISO.",
            },
          },
        {
          id: "photography-m1l2",
          title: { id: "Pendalaman: Segitiga Exposure", en: "Deep Dive: The Exposure Triangle" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Segitiga Exposure**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **The Exposure Triangle**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m1l3",
          title: { id: "Penerapan: Segitiga Exposure", en: "Application: The Exposure Triangle" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Segitiga Exposure** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **The Exposure Triangle** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m1-cq1",
        question: { id: "Aperture f/1.8 menghasilkan foto...", en: "An aperture of f/1.8 produces photos..." },
        options: [
          { id: "Gelap dengan background tajam", en: "Dark with sharp background" },
          { id: "Terang dengan background blur", en: "Bright with blurry background" },
          { id: "Hitam putih", en: "Black and white" },
          { id: "Bergerak blur", en: "Motion blurred" },
        ],
        correctIndex: 1,
      },
      {
        id: "photography-m1-cq2",
        question: { id: "Shutter speed 1/1000 cocok untuk...", en: "A 1/1000 shutter speed is good for..." },
        options: [
          { id: "Membekukan gerakan cepat", en: "Freezing fast motion" },
          { id: "Foto malam hari", en: "Night photography" },
          { id: "Membuat light trail", en: "Creating light trails" },
          { id: "Blur background", en: "Blurring background" },
        ],
        correctIndex: 0,
      },
      ],
    },
    {
      id: "photography-m2",
      title: { id: "Video: Komposisi Fotografi", en: "Video: Photography Composition" },
      lessons: [
        {
            id: "ph-l2",
            title: { id: "Video: Komposisi Fotografi", en: "Video: Photography Composition" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/VArISvUuyr0",
          },
        {
          id: "photography-m2l2",
          title: { id: "Pendalaman: Video: Komposisi Fotografi", en: "Deep Dive: Video: Photography Composition" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Komposisi Fotografi**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Photography Composition**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m2l3",
          title: { id: "Penerapan: Video: Komposisi Fotografi", en: "Application: Video: Photography Composition" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Komposisi Fotografi** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Photography Composition** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m2-cq1",
        question: { id: "ISO tinggi (3200+) menyebabkan...", en: "High ISO (3200+) causes..." },
        options: [
          { id: "Foto makin bersih", en: "Cleaner photos" },
          { id: "Noise/bintik pada foto", en: "Noise/grain on photos" },
          { id: "Warna makin akurat", en: "More accurate colors" },
          { id: "Background blur", en: "Background blur" },
        ],
        correctIndex: 1,
      },
      {
        id: "photography-m2-cq2",
        question: { id: "Rule of thirds menyarankan subjek diletakkan di...", en: "The rule of thirds suggests placing the subject at..." },
        options: [
          { id: "Tengah frame selalu", en: "Always the center of the frame" },
          { id: "Garis atau titik potong grid", en: "Grid lines or intersections" },
          { id: "Pojok bawah", en: "The bottom corner" },
          { id: "Sembarang tempat", en: "Anywhere" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "photography-m3",
      title: { id: "Kartu: Teknik Komposisi", en: "Cards: Composition Techniques" },
      lessons: [
        {
            id: "ph-l3",
            title: { id: "Kartu: Teknik Komposisi", en: "Cards: Composition Techniques" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "Rule of Thirds", en: "Rule of Thirds" },
                back: {
                  id: "Bagi frame jadi 9 kotak, letakkan subjek di garis/titik potong. Foto langsung lebih menarik.",
                  en: "Divide the frame into 9 boxes, place the subject on the lines/intersections. Instantly more interesting photos.",
                },
              },
              {
                front: { id: "Leading Lines", en: "Leading Lines" },
                back: {
                  id: "Gunakan garis alami (jalan, pagar, meja) untuk mengarahkan mata ke subjek.",
                  en: "Use natural lines (roads, fences, tables) to guide the eye to the subject.",
                },
              },
              {
                front: { id: "Negative Space", en: "Negative Space" },
                back: {
                  id: "Sisakan ruang kosong di sekitar subjek agar fokus makin kuat. Favorit untuk foto produk.",
                  en: "Leave empty space around the subject to strengthen focus. A favorite for product photos.",
                },
              },
            ],
          },
        {
          id: "photography-m3l2",
          title: { id: "Pendalaman: Kartu: Teknik Komposisi", en: "Deep Dive: Cards: Composition Techniques" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Teknik Komposisi**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Composition Techniques**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m3l3",
          title: { id: "Penerapan: Kartu: Teknik Komposisi", en: "Application: Cards: Composition Techniques" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Teknik Komposisi** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Composition Techniques** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m3-cq1",
        question: { id: "Waktu cahaya alami terbaik untuk foto adalah...", en: "The best natural light time for photos is..." },
        options: [
          { id: "Tengah hari bolong", en: "High noon" },
          { id: "Golden hour (pagi/sore)", en: "Golden hour (morning/afternoon)" },
          { id: "Tengah malam", en: "Midnight" },
          { id: "Saat hujan deras", en: "During heavy rain" },
        ],
        correctIndex: 1,
      },
      {
        id: "photography-m3-cq2",
        question: { id: "Background wajib untuk foto produk marketplace adalah...", en: "The required background for marketplace product photos is..." },
        options: [
          { id: "Warna-warni", en: "Colorful" },
          { id: "Putih bersih", en: "Clean white" },
          { id: "Hitam gelap", en: "Dark black" },
          { id: "Motif batik", en: "Batik pattern" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "photography-m4",
      title: { id: "Cahaya Alami vs Buatan", en: "Natural vs Artificial Light" },
      lessons: [
        {
            id: "ph-l4",
            title: { id: "Cahaya Alami vs Buatan", en: "Natural vs Artificial Light" },
            type: "text",
            duration: 6,
            xp: 25,
            body: {
              id: "Cahaya adalah 80% dari foto bagus.\n\n**Cahaya alami (gratis):**\n- Golden hour (pagi 6-8, sore 4-6): hangat dan lembut\n- Jendela besar: softbox alami untuk foto produk\n- Hindari matahari tengah hari: bayangan keras\n\n**Buatan (modal kecil):**\n- Ring light (Rp 100rb) untuk potret\n- Lampu belajar putih + kertas minyak = softbox DIY\n- Reflektor dari styrofoam/kertas aluminium",
              en: "Light is 80% of a good photo.\n\n**Natural light (free):**\n- Golden hour (6-8am, 4-6pm): warm and soft\n- Large windows: natural softbox for product photos\n- Avoid midday sun: harsh shadows\n\n**Artificial (low budget):**\n- Ring light ($7) for portraits\n- White study lamp + baking paper = DIY softbox\n- Reflector from styrofoam/aluminum foil",
            },
          },
        {
          id: "photography-m4l2",
          title: { id: "Pendalaman: Cahaya Alami vs Buatan", en: "Deep Dive: Natural vs Artificial Light" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Cahaya Alami vs Buatan**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Natural vs Artificial Light**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m4l3",
          title: { id: "Penerapan: Cahaya Alami vs Buatan", en: "Application: Natural vs Artificial Light" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Cahaya Alami vs Buatan** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Natural vs Artificial Light** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m4-cq1",
        question: { id: "Sudut paling aman untuk memotret produk adalah...", en: "The safest angle for photographing products is..." },
        options: [
          { id: "45° (atas dan samping terlihat)", en: "45° (top and side visible)" },
          { id: "Dari bawah", en: "From below" },
          { id: "Belakang produk", en: "Behind the product" },
          { id: "Sambil jongkok", en: "While squatting" },
        ],
        correctIndex: 0,
      },
      {
        id: "photography-m4-cq2",
        question: { id: "Aplikasi editing foto gratis terbaik di HP adalah...", en: "The best free photo editing app on phones is..." },
        options: [
          { id: "Kalkulator", en: "Calculator" },
          { id: "Lightroom Mobile", en: "Lightroom Mobile" },
          { id: "Notepad", en: "Notepad" },
          { id: "Microsoft Word", en: "Microsoft Word" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "photography-m5",
      title: { id: "Video: Setup Foto Produk Rumahan", en: "Video: Home Product Photo Setup" },
      lessons: [
        {
            id: "ph-l5",
            title: { id: "Video: Setup Foto Produk Rumahan", en: "Video: Home Product Photo Setup" },
            type: "video",
            duration: 9,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/tkJH4mKqJE4",
          },
        {
          id: "photography-m5l2",
          title: { id: "Pendalaman: Video: Setup Foto Produk Rumahan", en: "Deep Dive: Video: Home Product Photo Setup" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Setup Foto Produk Rumahan**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Home Product Photo Setup**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m5l3",
          title: { id: "Penerapan: Video: Setup Foto Produk Rumahan", en: "Application: Video: Home Product Photo Setup" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Setup Foto Produk Rumahan** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Home Product Photo Setup** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m5-cq1",
        question: { id: "Langkah pertama memulai jasa fotografi adalah...", en: "The first step to starting a photography service is..." },
        options: [
          { id: "Beli kamera termahal", en: "Buy the most expensive camera" },
          { id: "Buat portofolio dari 10 foto produk", en: "Build a portfolio of 10 product photos" },
          { id: "Sewa studio", en: "Rent a studio" },
          { id: "Cetak kartu nama", en: "Print business cards" },
        ],
        correctIndex: 1,
      },
      {
        id: "photography-m5-cq2",
        question: { id: "Upsell cerdas untuk jasa foto produk adalah...", en: "A smart upsell for product photo services is..." },
        options: [
          { id: "Paket foto + video pendek Reels", en: "Photo + short Reels video package" },
          { id: "Jual kamera bekas", en: "Selling used cameras" },
          { id: "Menolak klien kecil", en: "Rejecting small clients" },
          { id: "Menaikkan harga 10x lipat", en: "Raising prices 10x" },
        ],
        correctIndex: 0,
      },
      ],
    },
    {
      id: "photography-m6",
      title: { id: "Kartu: Properti Foto Produk", en: "Cards: Product Photo Props" },
      lessons: [
        {
            id: "ph-l6",
            title: { id: "Kartu: Properti Foto Produk", en: "Cards: Product Photo Props" },
            type: "flipcard",
            duration: 5,
            xp: 20,
            cards: [
              {
                front: { id: "Background Putih", en: "White Background" },
                back: {
                  id: "Wajib untuk marketplace (Shopee, Tokopedia). Gunakan kertas HVS besar atau kain putih.",
                  en: "Required for marketplaces (Shopee, Tokopedia). Use large white paper or white cloth.",
                },
              },
              {
                front: { id: "Props Pendukung", en: "Supporting Props" },
                back: {
                  id: "Bahan terkait produk (biji kopi untuk kopi, daun untuk skincare). Jangan lebih ramai dari produk.",
                  en: "Materials related to the product (coffee beans for coffee, leaves for skincare). Never busier than the product.",
                },
              },
              {
                front: { id: "Angle 45°", en: "45° Angle" },
                back: {
                  id: "Sudut paling aman untuk produk: kelihatan atas dan samping. Eye-level untuk skincare, flat-lay untuk makanan.",
                  en: "The safest product angle: shows top and side. Eye-level for skincare, flat-lay for food.",
                },
              },
            ],
          },
        {
          id: "photography-m6l2",
          title: { id: "Pendalaman: Kartu: Properti Foto Produk", en: "Deep Dive: Cards: Product Photo Props" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Properti Foto Produk**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Product Photo Props**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m6l3",
          title: { id: "Penerapan: Kartu: Properti Foto Produk", en: "Application: Cards: Product Photo Props" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Properti Foto Produk** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Product Photo Props** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m6-cq1",
        question: { id: "Aperture f/1.8 menghasilkan foto...", en: "An aperture of f/1.8 produces photos..." },
        options: [
          { id: "Gelap dengan background tajam", en: "Dark with sharp background" },
          { id: "Terang dengan background blur", en: "Bright with blurry background" },
          { id: "Hitam putih", en: "Black and white" },
          { id: "Bergerak blur", en: "Motion blurred" },
        ],
        correctIndex: 1,
      },
      {
        id: "photography-m6-cq2",
        question: { id: "Shutter speed 1/1000 cocok untuk...", en: "A 1/1000 shutter speed is good for..." },
        options: [
          { id: "Membekukan gerakan cepat", en: "Freezing fast motion" },
          { id: "Foto malam hari", en: "Night photography" },
          { id: "Membuat light trail", en: "Creating light trails" },
          { id: "Blur background", en: "Blurring background" },
        ],
        correctIndex: 0,
      },
      ],
    },
    {
      id: "photography-m7",
      title: { id: "Editing Cepat di HP", en: "Quick Editing on Your Phone" },
      lessons: [
        {
            id: "ph-l7",
            title: { id: "Editing Cepat di HP", en: "Quick Editing on Your Phone" },
            type: "text",
            duration: 6,
            xp: 25,
            body: {
              id: "Edit foto produk langsung dari HP dengan **Lightroom Mobile** (gratis).\n\n**Resep edit produk:**\n1. Naikkan exposure sedikit (+0.3)\n2. White balance: putih harus netral\n3. Naikkan clarity/texture untuk detail\n4. Crop lurus — foto miring terlihat tidak profesional\n\n**Resep potret:**\n- Turunkan highlights, naikkan shadows (kulit lembut)\n- Sedikit vibrance, jangan saturasi berlebihan\n\nKonsistensi preset = ciri khas brand fotomu.",
              en: "Edit product photos right on your phone with **Lightroom Mobile** (free).\n\n**Product edit recipe:**\n1. Raise exposure slightly (+0.3)\n2. White balance: whites must be neutral\n3. Raise clarity/texture for detail\n4. Straighten the crop — tilted photos look unprofessional\n\n**Portrait recipe:**\n- Lower highlights, raise shadows (soft skin)\n- Slight vibrance, don't oversaturate\n\nConsistent presets = your photo brand's signature.",
            },
          },
        {
          id: "photography-m7l2",
          title: { id: "Pendalaman: Editing Cepat di HP", en: "Deep Dive: Quick Editing on Your Phone" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Editing Cepat di HP**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Quick Editing on Your Phone**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m7l3",
          title: { id: "Penerapan: Editing Cepat di HP", en: "Application: Quick Editing on Your Phone" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Editing Cepat di HP** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Quick Editing on Your Phone** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m7-cq1",
        question: { id: "ISO tinggi (3200+) menyebabkan...", en: "High ISO (3200+) causes..." },
        options: [
          { id: "Foto makin bersih", en: "Cleaner photos" },
          { id: "Noise/bintik pada foto", en: "Noise/grain on photos" },
          { id: "Warna makin akurat", en: "More accurate colors" },
          { id: "Background blur", en: "Background blur" },
        ],
        correctIndex: 1,
      },
      {
        id: "photography-m7-cq2",
        question: { id: "Rule of thirds menyarankan subjek diletakkan di...", en: "The rule of thirds suggests placing the subject at..." },
        options: [
          { id: "Tengah frame selalu", en: "Always the center of the frame" },
          { id: "Garis atau titik potong grid", en: "Grid lines or intersections" },
          { id: "Pojok bawah", en: "The bottom corner" },
          { id: "Sembarang tempat", en: "Anywhere" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "photography-m8",
      title: { id: "Video: Lightroom Mobile Tutorial", en: "Video: Lightroom Mobile Tutorial" },
      lessons: [
        {
            id: "ph-l8",
            title: { id: "Video: Lightroom Mobile Tutorial", en: "Video: Lightroom Mobile Tutorial" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/jJVKX4BqgXQ",
          },
        {
          id: "photography-m8l2",
          title: { id: "Pendalaman: Video: Lightroom Mobile Tutorial", en: "Deep Dive: Video: Lightroom Mobile Tutorial" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Lightroom Mobile Tutorial**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Lightroom Mobile Tutorial**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m8l3",
          title: { id: "Penerapan: Video: Lightroom Mobile Tutorial", en: "Application: Video: Lightroom Mobile Tutorial" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Lightroom Mobile Tutorial** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Lightroom Mobile Tutorial** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m8-cq1",
        question: { id: "Waktu cahaya alami terbaik untuk foto adalah...", en: "The best natural light time for photos is..." },
        options: [
          { id: "Tengah hari bolong", en: "High noon" },
          { id: "Golden hour (pagi/sore)", en: "Golden hour (morning/afternoon)" },
          { id: "Tengah malam", en: "Midnight" },
          { id: "Saat hujan deras", en: "During heavy rain" },
        ],
        correctIndex: 1,
      },
      {
        id: "photography-m8-cq2",
        question: { id: "Background wajib untuk foto produk marketplace adalah...", en: "The required background for marketplace product photos is..." },
        options: [
          { id: "Warna-warni", en: "Colorful" },
          { id: "Putih bersih", en: "Clean white" },
          { id: "Hitam gelap", en: "Dark black" },
          { id: "Motif batik", en: "Batik pattern" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "photography-m9",
      title: { id: "Memulai Jasa Fotografi", en: "Starting a Photography Service" },
      lessons: [
        {
            id: "ph-l9",
            title: { id: "Memulai Jasa Fotografi", en: "Starting a Photography Service" },
            type: "text",
            duration: 6,
            xp: 20,
            body: {
              id: "Jasa foto produk sangat dibutuhkan UMKM yang jualan online.\n\n**Langkah awal:**\n1. Foto 10 produk milik sendiri/teman sebagai portofolio\n2. Tawarkan ke UMKM sekitar: warung, toko kue, online shop\n3. Harga pemula: Rp 25-75rb/foto jadi, atau paket 10 foto\n\n**Upsell cerdas:**\n- Paket foto + video pendek untuk Reels\n- Langganan bulanan konten katalog\n\nUMKM butuh konten terus-menerus = penghasilan berulang.",
              en: "Product photo services are in high demand from online-selling SMEs.\n\n**First steps:**\n1. Photograph 10 products of your own/friends for a portfolio\n2. Offer to local SMEs: food stalls, cake shops, online stores\n3. Beginner pricing: Rp 25-75k/finished photo, or 10-photo packages\n\n**Smart upsells:**\n- Photo + short video package for Reels\n- Monthly catalog content subscription\n\nSMEs need content continuously = recurring income.",
            },
          },
        {
          id: "photography-m9l2",
          title: { id: "Pendalaman: Memulai Jasa Fotografi", en: "Deep Dive: Starting a Photography Service" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Memulai Jasa Fotografi**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Starting a Photography Service**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m9l3",
          title: { id: "Penerapan: Memulai Jasa Fotografi", en: "Application: Starting a Photography Service" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Memulai Jasa Fotografi** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Starting a Photography Service** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m9-cq1",
        question: { id: "Sudut paling aman untuk memotret produk adalah...", en: "The safest angle for photographing products is..." },
        options: [
          { id: "45° (atas dan samping terlihat)", en: "45° (top and side visible)" },
          { id: "Dari bawah", en: "From below" },
          { id: "Belakang produk", en: "Behind the product" },
          { id: "Sambil jongkok", en: "While squatting" },
        ],
        correctIndex: 0,
      },
      {
        id: "photography-m9-cq2",
        question: { id: "Aplikasi editing foto gratis terbaik di HP adalah...", en: "The best free photo editing app on phones is..." },
        options: [
          { id: "Kalkulator", en: "Calculator" },
          { id: "Lightroom Mobile", en: "Lightroom Mobile" },
          { id: "Notepad", en: "Notepad" },
          { id: "Microsoft Word", en: "Microsoft Word" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "photography-m10",
      title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
      lessons: [
        {
        id: "photography-m10l1",
        title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Uji pemahamanmu tentang exposure, komposisi, dan cahaya dalam satu sesi foto terpadu.\n\n**Drill 1 sesi (60 menit):**\n1. Pilih 1 objek di rumah (gelas, sepatu, makanan)\n2. Foto objek yang sama dengan 3 setting exposure berbeda — rasakan bedanya\n3. Terapkan 3 teknik komposisi: rule of thirds, leading lines, negative space\n4. Ulangi di 2 kondisi cahaya: dekat jendela dan lampu meja\n\nKamu akan punya 12+ foto dari objek yang sama — lihat bagaimana setting mengubah hasil.\n\n## Latihan Praktis\nSelesaikan drillnya, pilih 3 foto terbaik, edit di HP, dan bandingkan before-after-nya.",
          en: "Test your understanding of exposure, composition, and light in one integrated photo session.\n\n**1-session drill (60 minutes):**\n1. Pick 1 object at home (glass, shoe, food)\n2. Shoot the same object with 3 different exposure settings — feel the difference\n3. Apply 3 composition techniques: rule of thirds, leading lines, negative space\n4. Repeat in 2 light conditions: near a window and a desk lamp\n\nYou'll have 12+ photos of the same object — see how settings change results.\n\n## Practical Exercise\nFinish the drill, pick your 3 best photos, edit on your phone, and compare before-after.",
        },
        },
        {
          id: "photography-m10l2",
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
          id: "photography-m10l3",
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
        id: "photography-m10-cq1",
        question: { id: "Tiga elemen segitiga exposure adalah...", en: "The three elements of the exposure triangle are..." },
        options: [
          { id: "ISO, aperture, shutter speed", en: "ISO, aperture, shutter speed" },
          { id: "Zoom, flash, filter", en: "Zoom, flash, filter" },
          { id: "Fokus, blur, crop", en: "Focus, blur, crop" },
          { id: "Cahaya, bayangan, warna", en: "Light, shadow, color" },
        ],
        correctIndex: 0,
        explanation: { id: "ISO, bukaan (aperture), dan kecepatan rana bersama menentukan terang-gelap dan karakter foto.", en: "ISO, aperture, and shutter speed together determine brightness and photo character." },
      },
      {
        id: "photography-m10-cq2",
        question: { id: "Teknik komposisi yang menempatkan objek di perpotongan garis imajiner disebut...", en: "The composition technique placing the subject at imaginary line intersections is called..." },
        options: [
          { id: "Leading lines", en: "Leading lines" },
          { id: "Rule of thirds", en: "Rule of thirds" },
          { id: "Negative space", en: "Negative space" },
          { id: "Framing", en: "Framing" },
        ],
        correctIndex: 1,
        explanation: { id: "Rule of thirds membagi frame jadi 9 kotak; titik potongnya adalah posisi paling menarik.", en: "The rule of thirds divides the frame into 9 boxes; its intersections are the most attractive positions." },
      },
      ],
    },
    {
      id: "photography-m11",
      title: { id: "Proyek Akhir: Katalog Produk Mini", en: "Final Project: Mini Product Catalog" },
      lessons: [
        {
        id: "photography-m11l1",
        title: { id: "Proyek Akhir: Katalog Produk Mini", en: "Final Project: Mini Product Catalog" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Proyek nyata: buat **katalog 9 foto untuk 1 produk** (punya sendiri atau UMKM tetangga — gratis dulu tidak apa-apa).\n\n**Brief klien imajiner:**\n- 3 foto hero: produk terlihat jelas, cahaya terbaik\n- 3 foto detail: tekstur, bahan, kemasan\n- 3 foto lifestyle: produk dipakai dalam konteks nyata\n\nDeliverable: 9 foto teredit konsisten (tone warna seragam) dalam 1 folder rapi.\n\n## Latihan Praktis\nKerjakan proyeknya, kirim ke pemilik produk, dan minta testimoni tertulis — ini aset pertamamu untuk menawar klien berbayar.",
          en: "A real project: create a **9-photo catalog for 1 product** (your own or a neighbor's SME — free first is fine).\n\n**Imaginary client brief:**\n- 3 hero shots: product clearly visible, best lighting\n- 3 detail shots: texture, material, packaging\n- 3 lifestyle shots: product used in real context\n\nDeliverable: 9 consistently edited photos (uniform color tone) in 1 tidy folder.\n\n## Practical Exercise\nDo the project, send it to the product owner, and ask for a written testimonial — this is your first asset for pitching paying clients.",
        },
        },
        {
          id: "photography-m11l2",
          title: { id: "Pendalaman: Proyek Akhir: Katalog Produk Mini", en: "Deep Dive: Final Project: Mini Product Catalog" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Proyek Akhir: Katalog Produk Mini**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Final Project: Mini Product Catalog**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m11l3",
          title: { id: "Penerapan: Proyek Akhir: Katalog Produk Mini", en: "Application: Final Project: Mini Product Catalog" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Proyek Akhir: Katalog Produk Mini** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Final Project: Mini Product Catalog** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m11-cq1",
        question: { id: "Mengapa tone warna foto katalog harus konsisten?", en: "Why must a catalog's color tone be consistent?" },
        options: [
          { id: "Supaya hemat filter", en: "To save on filters" },
          { id: "Terlihat profesional dan mereknya kuat", en: "It looks professional and strengthens the brand" },
          { id: "Agar file tidak besar", en: "So files stay small" },
          { id: "Tidak perlu konsisten", en: "It doesn't need to be" },
        ],
        correctIndex: 1,
        explanation: { id: "Konsistensi visual adalah tanda kerja profesional dan memperkuat identitas merek produk.", en: "Visual consistency is a mark of professional work and strengthens the product's brand identity." },
      },
      {
        id: "photography-m11-cq2",
        question: { id: "Urutan paket foto katalog yang lengkap adalah...", en: "A complete catalog photo package order is..." },
        options: [
          { id: "Hanya 1 foto terbaik", en: "Only 1 best photo" },
          { id: "Hero, detail, lifestyle", en: "Hero, detail, lifestyle" },
          { id: "Semua foto dari sudut yang sama", en: "All photos from the same angle" },
          { id: "Foto blur artistik saja", en: "Only artistic blurry photos" },
        ],
        correctIndex: 1,
        explanation: { id: "Kombinasi hero-detail-lifestyle menjawab semua kebutuhan calon pembeli melihat produk.", en: "The hero-detail-lifestyle combination answers all prospective buyers' needs in viewing a product." },
      },
      ],
    },
    {
      id: "photography-m12",
      title: { id: "Membangun Jasa & Portofolio Online", en: "Building Your Service & Online Portfolio" },
      lessons: [
        {
        id: "photography-m12l1",
        title: { id: "Membangun Jasa & Portofolio Online", en: "Building Your Service & Online Portfolio" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Fotografer dinilai dari portofolio yang mudah dilihat. Waktunya merapikan milikmu.\n\n**Susun portofolio online (gratis):**\n- Pilih 15-20 foto terbaik saja — kualitas mengalahkan kuantitas\n- Kelompokkan per tema: produk, makanan, portrait\n- Tampilkan di Instagram khusus karya + link Google Drive/Behance\n\n**Paket jasa awal:** mulai dari Rp 150-300 ribu per sesi produk (9-15 foto), naikkan setelah 5 klien dengan testimoni.\n\n## Latihan Praktis\nRilis portofoliomu minggu ini dan tawarkan paket perdana ke 5 UMKM sekitar. Target: 1 klien berbayar pertama bulan ini.",
          en: "Photographers are judged by an easy-to-view portfolio. Time to tidy yours up.\n\n**Build an online portfolio (free):**\n- Pick only your 15-20 best photos — quality beats quantity\n- Group by theme: product, food, portrait\n- Display on a dedicated work Instagram + Google Drive/Behance link\n\n**Starter service package:** start at IDR 150-300k per product session (9-15 photos), raise after 5 clients with testimonials.\n\n## Practical Exercise\nRelease your portfolio this week and offer your starter package to 5 nearby SMEs. Target: your first paying client this month.",
        },
        },
        {
          id: "photography-m12l2",
          title: { id: "Pendalaman: Membangun Jasa & Portofolio Online", en: "Deep Dive: Building Your Service & Online Portfolio" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Membangun Jasa & Portofolio Online**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Building Your Service & Online Portfolio**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "photography-m12l3",
          title: { id: "Penerapan: Membangun Jasa & Portofolio Online", en: "Application: Building Your Service & Online Portfolio" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Membangun Jasa & Portofolio Online** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Building Your Service & Online Portfolio** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "photography-m12-cq1",
        question: { id: "Berapa jumlah foto ideal dalam portofolio awal?", en: "What is the ideal number of photos in a starter portfolio?" },
        options: [
          { id: "Semua foto yang pernah diambil", en: "Every photo ever taken" },
          { id: "15-20 foto terbaik", en: "15-20 best photos" },
          { id: "Minimal 100 foto", en: "At least 100 photos" },
          { id: "1 foto saja", en: "Just 1 photo" },
        ],
        correctIndex: 1,
        explanation: { id: "Portofolio dinilai dari foto terlemahnya — sedikit tapi kuat lebih baik daripada banyak tapi campur.", en: "A portfolio is judged by its weakest photo — few but strong beats many but mixed." },
      },
      {
        id: "photography-m12-cq2",
        question: { id: "Kapan waktu yang tepat menaikkan harga jasa fotografi?", en: "When is the right time to raise your photography service price?" },
        options: [
          { id: "Setiap minggu", en: "Every week" },
          { id: "Setelah punya beberapa klien dan testimoni", en: "After having several clients and testimonials" },
          { id: "Tidak pernah", en: "Never" },
          { id: "Saat beli kamera baru", en: "When buying a new camera" },
        ],
        correctIndex: 1,
        explanation: { id: "Testimoni dan permintaan yang stabil adalah bukti nilai jasamu sudah diakui pasar.", en: "Testimonials and steady demand are proof the market recognizes your service value." },
      },
      ],
    },
  ],
  quiz: [
  {
    id: "photography-q1",
    question: { id: "Aperture f/1.8 menghasilkan foto...", en: "An aperture of f/1.8 produces photos..." },
    options: [
      { id: "Gelap dengan background tajam", en: "Dark with sharp background" },
      { id: "Terang dengan background blur", en: "Bright with blurry background" },
      { id: "Hitam putih", en: "Black and white" },
      { id: "Bergerak blur", en: "Motion blurred" },
    ],
    correctIndex: 1,
  },
  {
    id: "photography-q2",
    question: { id: "Shutter speed 1/1000 cocok untuk...", en: "A 1/1000 shutter speed is good for..." },
    options: [
      { id: "Membekukan gerakan cepat", en: "Freezing fast motion" },
      { id: "Foto malam hari", en: "Night photography" },
      { id: "Membuat light trail", en: "Creating light trails" },
      { id: "Blur background", en: "Blurring background" },
    ],
    correctIndex: 0,
  },
  {
    id: "photography-q3",
    question: { id: "ISO tinggi (3200+) menyebabkan...", en: "High ISO (3200+) causes..." },
    options: [
      { id: "Foto makin bersih", en: "Cleaner photos" },
      { id: "Noise/bintik pada foto", en: "Noise/grain on photos" },
      { id: "Warna makin akurat", en: "More accurate colors" },
      { id: "Background blur", en: "Background blur" },
    ],
    correctIndex: 1,
  },
  {
    id: "photography-q4",
    question: { id: "Rule of thirds menyarankan subjek diletakkan di...", en: "The rule of thirds suggests placing the subject at..." },
    options: [
      { id: "Tengah frame selalu", en: "Always the center of the frame" },
      { id: "Garis atau titik potong grid", en: "Grid lines or intersections" },
      { id: "Pojok bawah", en: "The bottom corner" },
      { id: "Sembarang tempat", en: "Anywhere" },
    ],
    correctIndex: 1,
  },
  {
    id: "photography-q5",
    question: { id: "Waktu cahaya alami terbaik untuk foto adalah...", en: "The best natural light time for photos is..." },
    options: [
      { id: "Tengah hari bolong", en: "High noon" },
      { id: "Golden hour (pagi/sore)", en: "Golden hour (morning/afternoon)" },
      { id: "Tengah malam", en: "Midnight" },
      { id: "Saat hujan deras", en: "During heavy rain" },
    ],
    correctIndex: 1,
  },
  {
    id: "photography-q6",
    question: { id: "Background wajib untuk foto produk marketplace adalah...", en: "The required background for marketplace product photos is..." },
    options: [
      { id: "Warna-warni", en: "Colorful" },
      { id: "Putih bersih", en: "Clean white" },
      { id: "Hitam gelap", en: "Dark black" },
      { id: "Motif batik", en: "Batik pattern" },
    ],
    correctIndex: 1,
  },
  {
    id: "photography-q7",
    question: { id: "Sudut paling aman untuk memotret produk adalah...", en: "The safest angle for photographing products is..." },
    options: [
      { id: "45° (atas dan samping terlihat)", en: "45° (top and side visible)" },
      { id: "Dari bawah", en: "From below" },
      { id: "Belakang produk", en: "Behind the product" },
      { id: "Sambil jongkok", en: "While squatting" },
    ],
    correctIndex: 0,
  },
  {
    id: "photography-q8",
    question: { id: "Aplikasi editing foto gratis terbaik di HP adalah...", en: "The best free photo editing app on phones is..." },
    options: [
      { id: "Kalkulator", en: "Calculator" },
      { id: "Lightroom Mobile", en: "Lightroom Mobile" },
      { id: "Notepad", en: "Notepad" },
      { id: "Microsoft Word", en: "Microsoft Word" },
    ],
    correctIndex: 1,
  },
  {
    id: "photography-q9",
    question: { id: "Langkah pertama memulai jasa fotografi adalah...", en: "The first step to starting a photography service is..." },
    options: [
      { id: "Beli kamera termahal", en: "Buy the most expensive camera" },
      { id: "Buat portofolio dari 10 foto produk", en: "Build a portfolio of 10 product photos" },
      { id: "Sewa studio", en: "Rent a studio" },
      { id: "Cetak kartu nama", en: "Print business cards" },
    ],
    correctIndex: 1,
  },
  {
    id: "photography-q10",
    question: { id: "Upsell cerdas untuk jasa foto produk adalah...", en: "A smart upsell for product photo services is..." },
    options: [
      { id: "Paket foto + video pendek Reels", en: "Photo + short Reels video package" },
      { id: "Jual kamera bekas", en: "Selling used cameras" },
      { id: "Menolak klien kecil", en: "Rejecting small clients" },
      { id: "Menaikkan harga 10x lipat", en: "Raising prices 10x" },
    ],
    correctIndex: 0,
  },
  ],
};
