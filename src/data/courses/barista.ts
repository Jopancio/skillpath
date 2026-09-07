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
      title: { id: "Mengenal Biji Kopi", en: "Meet the Coffee Bean" },
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
          id: "barista-m1l2",
          title: { id: "Pendalaman: Mengenal Biji Kopi", en: "Deep Dive: Meet the Coffee Bean" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Mengenal Biji Kopi**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Meet the Coffee Bean**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m1l3",
          title: { id: "Penerapan: Mengenal Biji Kopi", en: "Application: Meet the Coffee Bean" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Mengenal Biji Kopi** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Meet the Coffee Bean** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m1-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Arabika lebih pahit dan berkafein tinggi", en: "Arabica is more bitter and high in caffeine" },
          { id: "Arabika lebih halus, Robusta lebih pahit dan berkafein tinggi", en: "Arabica is smoother, Robusta is more bitter and higher in caffeine" },
          { id: "Tidak ada perbedaan", en: "There is no difference" },
          { id: "Robusta hanya untuk kopi instan", en: "Robusta is only for instant coffee" },
        ],
        correctIndex: 1,
      },
      {
        id: "barista-m1-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "1:1", en: "1:1" },
          { id: "1:2", en: "1:2" },
          { id: "1:5", en: "1:5" },
          { id: "1:10", en: "1:10" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m2",
      title: { id: "Video: Perjalanan Kopi", en: "Video: The Coffee Journey" },
      lessons: [
        {
            id: "barista-l2",
            title: { id: "Video: Perjalanan Kopi", en: "Video: The Coffee Journey" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/eE8eOiS7l2k",
          },
        {
          id: "barista-m2l2",
          title: { id: "Pendalaman: Video: Perjalanan Kopi", en: "Deep Dive: Video: The Coffee Journey" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Perjalanan Kopi**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: The Coffee Journey**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m2l3",
          title: { id: "Penerapan: Video: Perjalanan Kopi", en: "Application: Video: The Coffee Journey" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Perjalanan Kopi** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: The Coffee Journey** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m2-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Pahit gosong", en: "Burnt bitter" },
          { id: "Asam dan encer", en: "Sour and watery" },
          { id: "Manis sempurna", en: "Perfectly sweet" },
          { id: "Hambar tanpa rasa", en: "Bland and tasteless" },
        ],
        correctIndex: 1,
      },
      {
        id: "barista-m2-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "Susu yang di-steam", en: "Steamed milk" },
          { id: "Lapisan busa keemasan tanda ekstraksi baik", en: "Golden foam layer sign of good extraction" },
          { id: "Gula yang larut", en: "Dissolved sugar" },
          { id: "Ampas kopi halus", en: "Fine coffee grounds" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m3",
      title: { id: "Kartu: Istilah Kopi", en: "Cards: Coffee Terms" },
      lessons: [
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
        {
          id: "barista-m3l2",
          title: { id: "Pendalaman: Kartu: Istilah Kopi", en: "Deep Dive: Cards: Coffee Terms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Istilah Kopi**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Coffee Terms**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m3l3",
          title: { id: "Penerapan: Kartu: Istilah Kopi", en: "Application: Cards: Coffee Terms" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Istilah Kopi** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Coffee Terms** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m3-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Latte", en: "Latte" },
          { id: "Flat White", en: "Flat White" },
          { id: "Cappuccino", en: "Cappuccino" },
          { id: "Mocha", en: "Mocha" },
        ],
        correctIndex: 2,
      },
      {
        id: "barista-m3-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "Bergelembung besar", en: "Large bubbles" },
          { id: "Microfoam mengkilap seperti cat", en: "Glossy microfoam like paint" },
          { id: "Panas tanpa foam", en: "Hot with no foam" },
          { id: "Dingin berbusa", en: "Cold and frothy" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m4",
      title: { id: "Ekstraksi Espresso Sempurna", en: "Perfect Espresso Extraction" },
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
          id: "barista-m4l2",
          title: { id: "Pendalaman: Ekstraksi Espresso Sempurna", en: "Deep Dive: Perfect Espresso Extraction" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Ekstraksi Espresso Sempurna**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Perfect Espresso Extraction**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m4l3",
          title: { id: "Penerapan: Ekstraksi Espresso Sempurna", en: "Application: Perfect Espresso Extraction" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Ekstraksi Espresso Sempurna** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Perfect Espresso Extraction** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m4-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Rosetta", en: "Rosetta" },
          { id: "Swan", en: "Swan" },
          { id: "Heart", en: "Heart" },
          { id: "Tulip", en: "Tulip" },
        ],
        correctIndex: 2,
      },
      {
        id: "barista-m4-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "70-80°C", en: "70-80°C" },
          { id: "90-96°C", en: "90-96°C" },
          { id: "100°C mendidih", en: "100°C boiling" },
          { id: "60°C hangat", en: "60°C warm" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m5",
      title: { id: "Video: Steaming Susu", en: "Video: Milk Steaming" },
      lessons: [
        {
            id: "barista-l5",
            title: { id: "Video: Steaming Susu", en: "Video: Milk Steaming" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/6YMgvU3vQ2A",
          },
        {
          id: "barista-m5l2",
          title: { id: "Pendalaman: Video: Steaming Susu", en: "Deep Dive: Video: Milk Steaming" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Steaming Susu**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Milk Steaming**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m5l3",
          title: { id: "Penerapan: Video: Steaming Susu", en: "Application: Video: Milk Steaming" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Steaming Susu** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Milk Steaming** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m5-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Debat sampai menang", en: "Argue until you win" },
          { id: "Dengar, minta maaf, ganti baru", en: "Listen, apologize, remake" },
          { id: "Abaikan saja", en: "Just ignore it" },
          { id: "Suruh komplain ke manajer", en: "Tell them to complain to the manager" },
        ],
        correctIndex: 1,
      },
      {
        id: "barista-m5-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "Kopi campuran berbagai daerah", en: "Coffee blended from various regions" },
          { id: "Kopi dari satu daerah/kebun", en: "Coffee from one region/farm" },
          { id: "Kopi tanpa kafein", en: "Decaffeinated coffee" },
          { id: "Kopi paling mahal", en: "The most expensive coffee" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m6",
      title: { id: "Kartu: Menu Kopi Susu", en: "Cards: Milk Coffee Menu" },
      lessons: [
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
        {
          id: "barista-m6l2",
          title: { id: "Pendalaman: Kartu: Menu Kopi Susu", en: "Deep Dive: Cards: Milk Coffee Menu" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Kartu: Menu Kopi Susu**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Cards: Milk Coffee Menu**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m6l3",
          title: { id: "Penerapan: Kartu: Menu Kopi Susu", en: "Application: Cards: Milk Coffee Menu" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Kartu: Menu Kopi Susu** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Cards: Milk Coffee Menu** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m6-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Arabika lebih pahit dan berkafein tinggi", en: "Arabica is more bitter and high in caffeine" },
          { id: "Arabika lebih halus, Robusta lebih pahit dan berkafein tinggi", en: "Arabica is smoother, Robusta is more bitter and higher in caffeine" },
          { id: "Tidak ada perbedaan", en: "There is no difference" },
          { id: "Robusta hanya untuk kopi instan", en: "Robusta is only for instant coffee" },
        ],
        correctIndex: 1,
      },
      {
        id: "barista-m6-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "1:1", en: "1:1" },
          { id: "1:2", en: "1:2" },
          { id: "1:5", en: "1:5" },
          { id: "1:10", en: "1:10" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m7",
      title: { id: "Dasar Latte Art", en: "Latte Art Basics" },
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
          id: "barista-m7l2",
          title: { id: "Pendalaman: Dasar Latte Art", en: "Deep Dive: Latte Art Basics" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Dasar Latte Art**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Latte Art Basics**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m7l3",
          title: { id: "Penerapan: Dasar Latte Art", en: "Application: Latte Art Basics" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Dasar Latte Art** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Latte Art Basics** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m7-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Pahit gosong", en: "Burnt bitter" },
          { id: "Asam dan encer", en: "Sour and watery" },
          { id: "Manis sempurna", en: "Perfectly sweet" },
          { id: "Hambar tanpa rasa", en: "Bland and tasteless" },
        ],
        correctIndex: 1,
      },
      {
        id: "barista-m7-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "Susu yang di-steam", en: "Steamed milk" },
          { id: "Lapisan busa keemasan tanda ekstraksi baik", en: "Golden foam layer sign of good extraction" },
          { id: "Gula yang larut", en: "Dissolved sugar" },
          { id: "Ampas kopi halus", en: "Fine coffee grounds" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m8",
      title: { id: "Video: Latte Art Heart", en: "Video: Heart Latte Art" },
      lessons: [
        {
            id: "barista-l8",
            title: { id: "Video: Latte Art Heart", en: "Video: Heart Latte Art" },
            type: "video",
            duration: 8,
            xp: 30,
            videoUrl: "https://www.youtube.com/embed/1jXjT1RpK6g",
          },
        {
          id: "barista-m8l2",
          title: { id: "Pendalaman: Video: Latte Art Heart", en: "Deep Dive: Video: Heart Latte Art" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Video: Latte Art Heart**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Video: Heart Latte Art**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m8l3",
          title: { id: "Penerapan: Video: Latte Art Heart", en: "Application: Video: Heart Latte Art" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Video: Latte Art Heart** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Video: Heart Latte Art** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m8-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Latte", en: "Latte" },
          { id: "Flat White", en: "Flat White" },
          { id: "Cappuccino", en: "Cappuccino" },
          { id: "Mocha", en: "Mocha" },
        ],
        correctIndex: 2,
      },
      {
        id: "barista-m8-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "Bergelembung besar", en: "Large bubbles" },
          { id: "Microfoam mengkilap seperti cat", en: "Glossy microfoam like paint" },
          { id: "Panas tanpa foam", en: "Hot with no foam" },
          { id: "Dingin berbusa", en: "Cold and frothy" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m9",
      title: { id: "Etika Pelayanan Pelanggan", en: "Customer Service Etiquette" },
      lessons: [
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
        {
          id: "barista-m9l2",
          title: { id: "Pendalaman: Etika Pelayanan Pelanggan", en: "Deep Dive: Customer Service Etiquette" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Etika Pelayanan Pelanggan**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Customer Service Etiquette**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m9l3",
          title: { id: "Penerapan: Etika Pelayanan Pelanggan", en: "Application: Customer Service Etiquette" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Etika Pelayanan Pelanggan** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Customer Service Etiquette** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m9-cq1",
        question: { id: "", en: "" },
        options: [
          { id: "Rosetta", en: "Rosetta" },
          { id: "Swan", en: "Swan" },
          { id: "Heart", en: "Heart" },
          { id: "Tulip", en: "Tulip" },
        ],
        correctIndex: 2,
      },
      {
        id: "barista-m9-cq2",
        question: { id: "", en: "" },
        options: [
          { id: "70-80°C", en: "70-80°C" },
          { id: "90-96°C", en: "90-96°C" },
          { id: "100°C mendidih", en: "100°C boiling" },
          { id: "60°C hangat", en: "60°C warm" },
        ],
        correctIndex: 1,
      },
      ],
    },
    {
      id: "barista-m10",
      title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
      lessons: [
        {
        id: "barista-m10l1",
        title: { id: "Review & Drill Praktik", en: "Review & Practice Drill" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Waktunya merangkai semua yang sudah kamu pelajari menjadi satu alur kerja utuh.\n\n**Simulasi shift nyata (15 menit):**\n1. Siapkan *mise en place*: cek stok biji, susu, dan kebersihan station\n2. Terima pesanan: ulangi pesanan pelanggan untuk konfirmasi\n3. Seduh espresso dengan rasio 1:2 sambil steaming susu\n4. Tuang dan sajikan dalam 3-4 menit per cup\n\n**Checklist kualitas:** crema keemasan, suhu susu 60-65°C, gelas bersih, senyum.\n\n## Latihan Praktis\nRekam dirimu membuat 3 minuman berbeda (espresso, cappuccino, latte). Hitung waktunya dan nilai dengan checklist di atas. Ulangi sampai konsisten di bawah 4 menit per cup.",
          en: "Time to connect everything you've learned into one complete workflow.\n\n**Real shift simulation (15 minutes):**\n1. Set up *mise en place*: check bean and milk stock, clean the station\n2. Take the order: repeat it back to confirm\n3. Pull espresso at a 1:2 ratio while steaming milk\n4. Pour and serve within 3-4 minutes per cup\n\n**Quality checklist:** golden crema, milk at 60-65°C, clean cup, smile.\n\n## Practical Exercise\nRecord yourself making 3 different drinks (espresso, cappuccino, latte). Time it and grade with the checklist above. Repeat until consistently under 4 minutes per cup.",
        },
        },
        {
          id: "barista-m10l2",
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
          id: "barista-m10l3",
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
        id: "barista-m10-cq1",
        question: { id: "Suhu susu steamed yang ideal untuk latte adalah...", en: "The ideal steamed milk temperature for a latte is..." },
        options: [
          { id: "40-45°C", en: "40-45°C" },
          { id: "60-65°C", en: "60-65°C" },
          { id: "80-90°C", en: "80-90°C" },
          { id: "100°C mendidih", en: "100°C boiling" },
        ],
        correctIndex: 1,
        explanation: { id: "Susu di atas 70°C kehilangan manisnya dan foam jadi rusak; 60-65°C adalah titik manisnya.", en: "Milk above 70°C loses its sweetness and the foam breaks; 60-65°C is the sweet spot." },
      },
      {
        id: "barista-m10-cq2",
        question: { id: "Mengapa barista mengulangi pesanan pelanggan?", en: "Why should a barista repeat the customer's order?" },
        options: [
          { id: "Supaya terdengar sopan", en: "To sound polite" },
          { id: "Konfirmasi agar tidak salah pesanan", en: "To confirm and avoid wrong orders" },
          { id: "Memperlama antrian", en: "To slow down the queue" },
          { id: "Kebiasaan tanpa tujuan", en: "A pointless habit" },
        ],
        correctIndex: 1,
        explanation: { id: "Konfirmasi lisan mencegah salah saji dan menunjukkan perhatian ke pelanggan.", en: "Verbal confirmation prevents mistakes and shows the customer attention." },
      },
      ],
    },
    {
      id: "barista-m11",
      title: { id: "Proyek Akhir: Sajikan Menu Mini", en: "Final Project: Serve a Mini Menu" },
      lessons: [
        {
        id: "barista-m11l1",
        title: { id: "Proyek Akhir: Sajikan Menu Mini", en: "Final Project: Serve a Mini Menu" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Buktikan kemampuanmu lewat proyek nyata: sajikan 3 minuman signature untuk 3 'pelanggan' (teman atau keluarga).\n\n**Tantangan:**\n- Rancang menu mini berisi 3 minuman berbeda tingkat kesulitan\n- Sajikan lengkap dengan penjelasan rasa ke tiap 'pelanggan'\n- Minta feedback tertulis dan catat yang harus diperbaiki\n\nProyek ini melatih konsistensi, kecepatan, sekaligus komunikasi — tiga hal yang dinilai saat trial kerja di coffee shop.\n\n## Latihan Praktis\nDokumentasikan proyekmu: foto tiap minuman + catatan feedback. Simpan sebagai bukti awal portofolio baristamu.",
          en: "Prove your skill with a real project: serve 3 signature drinks to 3 'customers' (friends or family).\n\n**The challenge:**\n- Design a mini menu of 3 drinks with different difficulty levels\n- Serve each with a taste explanation to the 'customer'\n- Ask for written feedback and note what to improve\n\nThis project trains consistency, speed, and communication — the three things judged during a coffee shop job trial.\n\n## Practical Exercise\nDocument your project: photo of each drink + feedback notes. Keep it as the first proof of your barista portfolio.",
        },
        },
        {
          id: "barista-m11l2",
          title: { id: "Pendalaman: Proyek Akhir: Sajikan Menu Mini", en: "Deep Dive: Final Project: Serve a Mini Menu" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Proyek Akhir: Sajikan Menu Mini**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Final Project: Serve a Mini Menu**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m11l3",
          title: { id: "Penerapan: Proyek Akhir: Sajikan Menu Mini", en: "Application: Final Project: Serve a Mini Menu" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Proyek Akhir: Sajikan Menu Mini** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Final Project: Serve a Mini Menu** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m11-cq1",
        question: { id: "Apa tujuan utama proyek akhir menu mini?", en: "What is the main goal of the mini menu final project?" },
        options: [
          { id: "Pamer di media sosial", en: "Showing off on social media" },
          { id: "Melatih konsistensi, kecepatan, dan komunikasi sekaligus", en: "Training consistency, speed, and communication at once" },
          { id: "Menghabiskan stok biji kopi", en: "Using up coffee bean stock" },
          { id: "Membuat menu untuk dijual", en: "Creating a menu to sell" },
        ],
        correctIndex: 1,
        explanation: { id: "Proyek menggabungkan semua skill teknis dan pelayanan dalam satu simulasi nyata.", en: "The project combines all technical and service skills in one real simulation." },
      },
      {
        id: "barista-m11-cq2",
        question: { id: "Mengapa feedback pelanggan penting dicatat?", en: "Why is it important to record customer feedback?" },
        options: [
          { id: "Agar bisa diabaikan nanti", en: "So it can be ignored later" },
          { id: "Sebagai bahan perbaikan dan bukti portofolio", en: "As material for improvement and portfolio proof" },
          { id: "Supaya terlihat sibuk", en: "To look busy" },
          { id: "Tidak penting", en: "It is not important" },
        ],
        correctIndex: 1,
        explanation: { id: "Feedback tertulis jadi bahan evaluasi dan bukti nyata saat melamar kerja.", en: "Written feedback becomes evaluation material and real proof when applying for jobs." },
      },
      ],
    },
    {
      id: "barista-m12",
      title: { id: "Persiapan Kerja & Trial Shift", en: "Job & Trial Shift Preparation" },
      lessons: [
        {
        id: "barista-m12l1",
        title: { id: "Persiapan Kerja & Trial Shift", en: "Job & Trial Shift Preparation" },
        type: "text",
        duration: 6,
        xp: 30,
        body: {
          id: "Sebagian besar coffee shop menilai calon barista lewat **trial shift** — bekerja langsung beberapa jam.\n\n**Yang dinilai saat trial:**\n- Kebersihan dan kerapian station (paling pertama dilihat!)\n- Kecepatan tanpa panik saat antrian panjang\n- Kerja sama dengan tim dan komunikasi\n- Kerendahan hati untuk belajar menu rumah mereka\n\n**Tips melamar:** siapkan CV singkat + foto hasil karyamu, datang di luar jam sibuk, dan tanya kapan bisa trial.\n\n## Latihan Praktis\nBuat CV satu halaman berisi skill baristamu dan daftar 5 coffee shop target. Kirim ke minimal 3 minggu ini.",
          en: "Most coffee shops judge barista candidates through a **trial shift** — working directly for a few hours.\n\n**What is judged during a trial:**\n- Station cleanliness and tidiness (the very first thing seen!)\n- Speed without panicking during a long queue\n- Teamwork and communication\n- Humility to learn their house menu\n\n**Application tips:** prepare a one-page CV + photos of your work, come outside peak hours, and ask when you can do a trial.\n\n## Practical Exercise\nMake a one-page CV listing your barista skills and a list of 5 target coffee shops. Send it to at least 3 this week.",
        },
        },
        {
          id: "barista-m12l2",
          title: { id: "Pendalaman: Persiapan Kerja & Trial Shift", en: "Deep Dive: Job & Trial Shift Preparation" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Perdalam pemahamanmu tentang **Persiapan Kerja & Trial Shift**.\n\n**Poin pendalaman:**\n- Versi lebih teknis dari konsep inti yang baru kamu pelajari\n- Istilah dan standar yang dipakai para profesional di bidang ini\n- Batasan dan kesalahan umum yang harus kamu hindari\n\nSemakin dalam kamu memahami *kenapa* di balik sebuah langkah, semakin mudah kamu beradaptasi saat kondisi tidak ideal.\n\n## Latihan Praktis\nTulis 3 hal yang menurutmu paling menantang dari materi inti, lalu cari tahu solusinya dari pengalaman praktisi (forum, video, atau mentor).",
            en: "Deepen your understanding of **Job & Trial Shift Preparation**.\n\n**Deep-dive points:**\n- A more technical version of the core concept you just learned\n- Terms and standards used by professionals in this field\n- Limitations and common mistakes you must avoid\n\nThe deeper you understand the *why* behind a step, the easier you adapt when conditions are not ideal.\n\n## Practical Exercise\nWrite the 3 most challenging things from the core material, then find their solutions from practitioners' experience (forums, videos, or a mentor).",
          },
        },
        {
          id: "barista-m12l3",
          title: { id: "Penerapan: Persiapan Kerja & Trial Shift", en: "Application: Job & Trial Shift Preparation" },
          type: "text",
          duration: 6,
          xp: 30,
          body: {
            id: "Waktunya memakai **Persiapan Kerja & Trial Shift** dalam praktik nyata.\n\n**Alur penerapan:**\n1. Ulangi poin utama dari dua slide sebelumnya secara singkat\n2. Kerjakan satu tugas kecil yang relevan dengan materi ini\n3. Evaluasi hasilmu dengan jujur dan catat satu perbaikan\n\nBelajar paling cepat terjadi saat tanganmu ikut bekerja, bukan saat matamu membaca.\n\n## Latihan Praktis\nHasilkan satu karya/output kecil dari materi bab ini, lalu tunjukkan ke 1 orang dan minta 1 masukan paling jujur.",
            en: "Time to put **Job & Trial Shift Preparation** into real practice.\n\n**Application flow:**\n1. Briefly recap the key points from the previous two slides\n2. Do one small task relevant to this material\n3. Honestly evaluate your result and note one improvement\n\nLearning happens fastest when your hands are working, not when your eyes are reading.\n\n## Practical Exercise\nProduce one small work/output from this chapter's material, then show it to 1 person and ask for their single most honest piece of feedback.",
          },
        },
      ],
            quiz: [
      {
        id: "barista-m12-cq1",
        question: { id: "Hal pertama yang biasanya dinilai saat trial shift adalah...", en: "The first thing usually judged during a trial shift is..." },
        options: [
          { id: "Keahlian latte art", en: "Latte art skill" },
          { id: "Kebersihan dan kerapian station", en: "Station cleanliness and tidiness" },
          { id: "Banyaknya followers", en: "Number of followers" },
          { id: "Harga sepatu", en: "The price of your shoes" },
        ],
        correctIndex: 1,
        explanation: { id: "Kebersihan station mencerminkan profesionalisme dan standar kerja seorang barista.", en: "Station cleanliness reflects a barista's professionalism and work standards." },
      },
      {
        id: "barista-m12-cq2",
        question: { id: "Sikap terbaik saat trial di coffee shop baru adalah...", en: "The best attitude during a trial at a new coffee shop is..." },
        options: [
          { id: "Mengoreksi resep mereka", en: "Correcting their recipes" },
          { id: "Rendah hati dan mau belajar menu rumah mereka", en: "Humble and willing to learn their house menu" },
          { id: "Menolak tugas bersih-bersih", en: "Refusing cleaning tasks" },
          { id: "Pamer semua skill sekaligus", en: "Showing off all skills at once" },
        ],
        correctIndex: 1,
        explanation: { id: "Setiap kedai punya standar sendiri; sikap mau belajar dinilai lebih tinggi daripada skill kaku.", en: "Every shop has its own standards; willingness to learn is valued above rigid skill." },
      },
      ],
    },
  ],
  quiz: [
  {
    id: "barista-q1",
    question: { id: "", en: "" },
    options: [
      { id: "Arabika lebih pahit dan berkafein tinggi", en: "Arabica is more bitter and high in caffeine" },
      { id: "Arabika lebih halus, Robusta lebih pahit dan berkafein tinggi", en: "Arabica is smoother, Robusta is more bitter and higher in caffeine" },
      { id: "Tidak ada perbedaan", en: "There is no difference" },
      { id: "Robusta hanya untuk kopi instan", en: "Robusta is only for instant coffee" },
    ],
    correctIndex: 1,
  },
  {
    id: "barista-q2",
    question: { id: "", en: "" },
    options: [
      { id: "1:1", en: "1:1" },
      { id: "1:2", en: "1:2" },
      { id: "1:5", en: "1:5" },
      { id: "1:10", en: "1:10" },
    ],
    correctIndex: 1,
  },
  {
    id: "barista-q3",
    question: { id: "", en: "" },
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
    question: { id: "", en: "" },
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
    question: { id: "", en: "" },
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
    question: { id: "", en: "" },
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
    question: { id: "", en: "" },
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
    question: { id: "", en: "" },
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
    question: { id: "", en: "" },
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
    question: { id: "", en: "" },
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
