import type { Course } from "../types";

export const barista: Course = {
  id: "barista",
  title: { id: "Barista Profesional", en: "Professional Barista" },
  description: {
    id: "Kuasai seni menyeduh kopi dari espresso dasar sampai latte art.",
    en: "Master the art of coffee from basic espresso to latte art.",
  },
  longDescription: {
    id: "Kursus ini membawamu dari nol sampai siap kerja di coffee shop. Kamu akan belajar mengenal biji kopi, mengoperasikan mesin espresso, teknik steaming susu, sampai dasar-dasar latte art dan pelayanan pelanggan.",
    en: "This course takes you from zero to job-ready at a coffee shop. You will learn coffee beans, espresso machine operation, milk steaming techniques, latte art basics, and customer service.",
  },
  category: "culinary",
  difficulty: "beginner",
  icon: "Coffee",
  color: "#A16207",
  salary: { id: "Rp 3 - 6 juta/bulan", en: "$200 - $400/month" },
  demand: "Tinggi",
  passScore: 70,
  modules: [
    {
      id: "barista-m1",
      title: { id: "Dasar-Dasar Kopi", en: "Coffee Fundamentals" },
      lessons: [
        {
          id: "barista-l1",
          title: { id: "Mengenal Biji Kopi", en: "Meet the Coffee Bean" },
          type: "text",
          duration: 5,
          xp: 20,
          body: {
            id: "Kopi dimulai dari biji. Dua jenis utama: **Arabika** (rasa halus, asam, aroma kompleks) dan **Robusta** (pahit kuat, kafein tinggi).\n\n**Proses pasca panen** memengaruhi rasa:\n- *Washed*: bersih, asam cerah\n- *Natural*: fruity, manis\n- *Honey*: di antara keduanya\n\n**Roasting level**: light (asam, fruity), medium (seimbang), dark (pahit, bold). Untuk espresso, umumnya medium-dark.",
            en: "Coffee starts with the bean. Two main species: **Arabica** (smooth, acidic, complex aroma) and **Robusta** (strong bitter, high caffeine).\n\n**Post-harvest processing** affects flavor:\n- *Washed*: clean, bright acidity\n- *Natural*: fruity, sweet\n- *Honey*: in between\n\n**Roast levels**: light (acidic, fruity), medium (balanced), dark (bitter, bold). Espresso usually uses medium-dark.",
          },
        },
        {
          id: "barista-l2",
          title: { id: "Video: Perjalanan Kopi", en: "Video: The Coffee Journey" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/eE8eOiS7l2k",
        },
        {
          id: "barista-l3",
          title: { id: "Kartu: Istilah Kopi", en: "Cards: Coffee Terms" },
          type: "flipcard",
          duration: 5,
          xp: 20,
          cards: [
            {
              front: { id: "Espresso", en: "Espresso" },
              back: {
                id: "Ekstraksi kopi 25-30 detik dengan tekanan 9 bar. Dasar semua minuman kopi susu.",
                en: "Coffee extracted in 25-30 seconds at 9 bars of pressure. The base of all milk coffee drinks.",
              },
            },
            {
              front: { id: "Crema", en: "Crema" },
              back: {
                id: "Lapisan busa keemasan di atas espresso. Tanda ekstraksi yang baik dan kopi segar.",
                en: "The golden foam layer on top of espresso. A sign of good extraction and fresh coffee.",
              },
            },
            {
              front: { id: "Single Origin", en: "Single Origin" },
              back: {
                id: "Kopi dari satu daerah/kebun, bukan campuran. Rasa khas daerah asalnya.",
                en: "Coffee from one region/farm, not a blend. Carries the distinct taste of its origin.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "barista-m2",
      title: { id: "Teknik Espresso & Susu", en: "Espresso & Milk Techniques" },
      lessons: [
        {
          id: "barista-l4",
          title: { id: "Ekstraksi Espresso Sempurna", en: "Perfect Espresso Extraction" },
          type: "text",
          duration: 7,
          xp: 25,
          body: {
            id: "Rasio ideal espresso: **1:2** (18g kopi → 36g cairan) dalam **25-30 detik**.\n\n**Tanda ekstraksi:**\n- Terlalu cepat (<20 dtk) → asam, encer (*under-extracted*)\n- Terlalu lama (>35 dtk) → pahit gosong (*over-extracted*)\n\n**Atur grind size**: makin halus makin lambat menetes. Suhu air ideal 90-96°C.",
            en: "Ideal espresso ratio: **1:2** (18g coffee → 36g liquid) in **25-30 seconds**.\n\n**Extraction signs:**\n- Too fast (<20s) → sour, watery (*under-extracted*)\n- Too slow (>35s) → burnt bitter (*over-extracted*)\n\n**Adjust grind size**: finer = slower drip. Ideal water temperature 90-96°C.",
          },
        },
        {
          id: "barista-l5",
          title: { id: "Video: Steaming Susu", en: "Video: Milk Steaming" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/6YMgvU3vQ2A",
        },
        {
          id: "barista-l6",
          title: { id: "Kartu: Menu Kopi Susu", en: "Cards: Milk Coffee Menu" },
          type: "flipcard",
          duration: 5,
          xp: 20,
          cards: [
            {
              front: { id: "Latte", en: "Latte" },
              back: {
                id: "1 shot espresso + susu steamed banyak + foam tipis. Porsi susu paling banyak.",
                en: "1 shot espresso + lots of steamed milk + thin foam. The milkiest of all.",
              },
            },
            {
              front: { id: "Cappuccino", en: "Cappuccino" },
              back: {
                id: "1/3 espresso, 1/3 susu steamed, 1/3 foam tebal. Lebih kuat rasa kopinya.",
                en: "1/3 espresso, 1/3 steamed milk, 1/3 thick foam. Stronger coffee taste.",
              },
            },
            {
              front: { id: "Flat White", en: "Flat White" },
              back: {
                id: "Double shot + susu dengan microfoam tipis. Kecil tapi strong.",
                en: "Double shot + milk with thin microfoam. Small but strong.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "barista-m3",
      title: { id: "Latte Art & Pelayanan", en: "Latte Art & Service" },
      lessons: [
        {
          id: "barista-l7",
          title: { id: "Dasar Latte Art", en: "Latte Art Basics" },
          type: "text",
          duration: 6,
          xp: 25,
          body: {
            id: "Latte art butuh **microfoam** yang sempurna: susu mengkilap seperti cat, tanpa gelembung besar.\n\n**Pola dasar:**\n1. *Heart*: tuang tinggi, turun, tarik ke depan\n2. *Tulip*: tumpuk beberapa heart\n3. *Rosetta*: goyang pitcher sambil mundur\n\nKunci: konsistensi susu lebih penting daripada gerakan tangan. Latihan dengan air + sabun dulu!",
            en: "Latte art needs perfect **microfoam**: glossy milk like paint, no big bubbles.\n\n**Basic patterns:**\n1. *Heart*: pour high, drop down, pull forward\n2. *Tulip*: stack several hearts\n3. *Rosetta*: wiggle the pitcher while pulling back\n\nKey: milk consistency matters more than hand movement. Practice with water + dish soap first!",
          },
        },
        {
          id: "barista-l8",
          title: { id: "Video: Latte Art Heart", en: "Video: Heart Latte Art" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/1jXjT1RpK6g",
        },
        {
          id: "barista-l9",
          title: { id: "Etika Pelayanan Pelanggan", en: "Customer Service Etiquette" },
          type: "text",
          duration: 5,
          xp: 20,
          body: {
            id: "Barista hebat bukan cuma soal kopi, tapi juga pelayanan.\n\n**Prinsip dasar:**\n- Sapa pelanggan dengan ramah dalam 10 detik pertama\n- Hafalkan menu dan bisa rekomendasi\n- Kecepatan tanpa mengorbankan kualitas\n- Tangani komplain dengan tenang: dengar, minta maaf, ganti baru\n\nKebersihan work station adalah cerminan profesionalisme.",
            en: "A great barista is not just about coffee, but also service.\n\n**Core principles:**\n- Greet customers warmly within the first 10 seconds\n- Memorize the menu and be able to recommend\n- Speed without sacrificing quality\n- Handle complaints calmly: listen, apologize, remake\n\nA clean workstation reflects professionalism.",
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "barista-q1",
      question: {
        id: "Apa perbedaan utama biji Arabika dan Robusta?",
        en: "What is the main difference between Arabica and Robusta beans?",
      },
      options: [
        { id: "Arabika lebih pahit dan berkafein tinggi", en: "Arabica is more bitter and high in caffeine" },
        { id: "Arabika lebih halus, Robusta lebih pahit dan berkafein tinggi", en: "Arabica is smoother, Robusta is more bitter and higher in caffeine" },
        { id: "Tidak ada perbedaan", en: "There is no difference" },
        { id: "Robusta hanya untuk kopi instan", en: "Robusta is only for instant coffee" },
      ],
      correctIndex: 1,
      explanation: {
        id: "Arabika punya rasa halus dan asam, sementara Robusta lebih pahit dengan kafein sekitar 2x lipat.",
        en: "Arabica is smooth and acidic, while Robusta is more bitter with about 2x the caffeine.",
      },
    },
    {
      id: "barista-q2",
      question: {
        id: "Berapa rasio ideal ekstraksi espresso?",
        en: "What is the ideal espresso extraction ratio?",
      },
      options: [
        { id: "1:1", en: "1:1" },
        { id: "1:2", en: "1:2" },
        { id: "1:5", en: "1:5" },
        { id: "1:10", en: "1:10" },
      ],
      correctIndex: 1,
      explanation: {
        id: "Rasio 1:2 berarti 18g kopi menghasilkan sekitar 36g cairan espresso.",
        en: "A 1:2 ratio means 18g of coffee yields about 36g of liquid espresso.",
      },
    },
    {
      id: "barista-q3",
      question: {
        id: "Espresso yang terekstrak terlalu cepat (under-extracted) akan terasa...",
        en: "Espresso extracted too fast (under-extracted) will taste...",
      },
      options: [
        { id: "Pahit gosong", en: "Burnt bitter" },
        { id: "Asam dan encer", en: "Sour and watery" },
        { id: "Manis sempurna", en: "Perfectly sweet" },
        { id: "Hambar tanpa rasa", en: "Bland and tasteless" },
      ],
      correctIndex: 1,
    },
    {
      id: "barista-q4",
      question: {
        id: "Apa itu crema pada espresso?",
        en: "What is crema on espresso?",
      },
      options: [
        { id: "Susu yang di-steam", en: "Steamed milk" },
        { id: "Lapisan busa keemasan tanda ekstraksi baik", en: "Golden foam layer sign of good extraction" },
        { id: "Gula yang larut", en: "Dissolved sugar" },
        { id: "Ampas kopi halus", en: "Fine coffee grounds" },
      ],
      correctIndex: 1,
    },
    {
      id: "barista-q5",
      question: {
        id: "Minuman kopi dengan komposisi 1/3 espresso, 1/3 susu steamed, 1/3 foam adalah...",
        en: "The coffee drink with 1/3 espresso, 1/3 steamed milk, 1/3 foam is...",
      },
      options: [
        { id: "Latte", en: "Latte" },
        { id: "Flat White", en: "Flat White" },
        { id: "Cappuccino", en: "Cappuccino" },
        { id: "Mocha", en: "Mocha" },
      ],
      correctIndex: 2,
    },
    {
      id: "barista-q6",
      question: {
        id: "Tekstur susu yang ideal untuk latte art adalah...",
        en: "The ideal milk texture for latte art is...",
      },
      options: [
        { id: "Bergelembung besar", en: "Large bubbles" },
        { id: "Microfoam mengkilap seperti cat", en: "Glossy microfoam like paint" },
        { id: "Panas tanpa foam", en: "Hot with no foam" },
        { id: "Dingin berbusa", en: "Cold and frothy" },
      ],
      correctIndex: 1,
    },
    {
      id: "barista-q7",
      question: {
        id: "Pola latte art paling dasar yang harus dikuasai pertama adalah...",
        en: "The most basic latte art pattern to master first is...",
      },
      options: [
        { id: "Rosetta", en: "Rosetta" },
        { id: "Swan", en: "Swan" },
        { id: "Heart", en: "Heart" },
        { id: "Tulip", en: "Tulip" },
      ],
      correctIndex: 2,
    },
    {
      id: "barista-q8",
      question: {
        id: "Suhu air ideal untuk menyeduh espresso adalah...",
        en: "The ideal water temperature for brewing espresso is...",
      },
      options: [
        { id: "70-80°C", en: "70-80°C" },
        { id: "90-96°C", en: "90-96°C" },
        { id: "100°C mendidih", en: "100°C boiling" },
        { id: "60°C hangat", en: "60°C warm" },
      ],
      correctIndex: 1,
    },
    {
      id: "barista-q9",
      question: {
        id: "Cara terbaik menangani komplain pelanggan adalah...",
        en: "The best way to handle a customer complaint is...",
      },
      options: [
        { id: "Debat sampai menang", en: "Argue until you win" },
        { id: "Dengar, minta maaf, ganti baru", en: "Listen, apologize, remake" },
        { id: "Abaikan saja", en: "Just ignore it" },
        { id: "Suruh komplain ke manajer", en: "Tell them to complain to the manager" },
      ],
      correctIndex: 1,
    },
    {
      id: "barista-q10",
      question: {
        id: "Apa itu single origin coffee?",
        en: "What is single origin coffee?",
      },
      options: [
        { id: "Kopi campuran berbagai daerah", en: "Coffee blended from various regions" },
        { id: "Kopi dari satu daerah/kebun", en: "Coffee from one region/farm" },
        { id: "Kopi tanpa kafein", en: "Decaffeinated coffee" },
        { id: "Kopi paling mahal", en: "The most expensive coffee" },
      ],
      correctIndex: 1,
    },
  ],
};
