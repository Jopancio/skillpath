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
      id: "ph-m1",
      title: { id: "Dasar Fotografi", en: "Photography Fundamentals" },
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
          id: "ph-l2",
          title: { id: "Video: Komposisi Fotografi", en: "Video: Photography Composition" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/VArISvUuyr0",
        },
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
      ],
    },
    {
      id: "ph-m2",
      title: { id: "Pencahayaan", en: "Lighting" },
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
          id: "ph-l5",
          title: { id: "Video: Setup Foto Produk Rumahan", en: "Video: Home Product Photo Setup" },
          type: "video",
          duration: 9,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/tkJH4mKqJE4",
        },
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
      ],
    },
    {
      id: "ph-m3",
      title: { id: "Editing & Bisnis", en: "Editing & Business" },
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
          id: "ph-l8",
          title: { id: "Video: Lightroom Mobile Tutorial", en: "Video: Lightroom Mobile Tutorial" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/jJVKX4BqgXQ",
        },
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
      ],
    },
  ],
  quiz: [
    {
      id: "ph-q1",
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
      id: "ph-q2",
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
      id: "ph-q3",
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
      id: "ph-q4",
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
      id: "ph-q5",
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
      id: "ph-q6",
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
      id: "ph-q7",
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
      id: "ph-q8",
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
      id: "ph-q9",
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
      id: "ph-q10",
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
