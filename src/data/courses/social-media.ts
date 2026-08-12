import type { Course } from "../types";

export const socialMedia: Course = {
  id: "social-media-manager",
  title: { id: "Social Media Manager", en: "Social Media Manager" },
  description: {
    id: "Kelola media sosial brand: strategi, konten, komunitas, dan laporan.",
    en: "Manage brand social media: strategy, content, community, and reporting.",
  },
  longDescription: {
    id: "Belajar mengelola media sosial secara profesional: menyusun strategi, content pillar, community management, handling krisis, sampai membuat laporan untuk klien atau perusahaan.",
    en: "Learn to manage social media professionally: strategy building, content pillars, community management, crisis handling, and reporting for clients or companies.",
  },
  category: "marketing",
  difficulty: "intermediate",
  icon: "Share2",
  color: "#EC4899",
  salary: { id: "Rp 4 - 9 juta/bulan", en: "$280 - $650/month" },
  demand: "Tinggi",
  passScore: 70,
  modules: [
    {
      id: "sm-m1",
      title: { id: "Strategi Media Sosial", en: "Social Media Strategy" },
      lessons: [
        {
          id: "sm-l1",
          title: { id: "Content Pillar: Fondasi Strategi", en: "Content Pillars: Strategy Foundation" },
          type: "text",
          duration: 6,
          xp: 20,
          body: {
            id: "**Content pillar** = 3-5 topik utama yang konsisten diposting.\n\n**Contoh untuk brand kopi:**\n1. Edukasi (cara seduh, jenis biji)\n2. Produk (menu baru, promo)\n3. Komunitas (repost pelanggan, event)\n4. Hiburan (meme kopi, tren)\n\n**Aturan 80/20**: 80% konten bermanfaat/menghibur, 20% jualan. Akun yang isinya jualan semua akan ditinggal followers.",
            en: "**Content pillars** = 3-5 main topics you consistently post about.\n\n**Example for a coffee brand:**\n1. Education (brewing methods, bean types)\n2. Product (new menu, promos)\n3. Community (customer reposts, events)\n4. Entertainment (coffee memes, trends)\n\n**The 80/20 rule**: 80% valuable/entertaining content, 20% selling. Accounts that only sell get unfollowed.",
          },
        },
        {
          id: "sm-l2",
          title: { id: "Video: Audit Akun Instagram", en: "Video: Instagram Account Audit" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/4iJKNyKBgfA",
        },
        {
          id: "sm-l3",
          title: { id: "Kartu: Kenali Platformmu", en: "Cards: Know Your Platforms" },
          type: "flipcard",
          duration: 5,
          xp: 20,
          cards: [
            {
              front: { id: "Instagram", en: "Instagram" },
              back: {
                id: "Visual estetik + Reels. Kuat untuk brand lifestyle, F&B, fashion. Usia 18-34.",
                en: "Aesthetic visuals + Reels. Strong for lifestyle, F&B, fashion brands. Ages 18-34.",
              },
            },
            {
              front: { id: "TikTok", en: "TikTok" },
              back: {
                id: "Video pendek autentik, tidak perlu sempurna. Jangkauan organik terbesar. Usia 16-30.",
                en: "Short authentic videos, perfection not needed. Biggest organic reach. Ages 16-30.",
              },
            },
            {
              front: { id: "LinkedIn", en: "LinkedIn" },
              back: {
                id: "Konten profesional & B2B. Personal branding karier. Usia 25-45.",
                en: "Professional & B2B content. Career personal branding. Ages 25-45.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sm-m2",
      title: { id: "Manajemen Komunitas", en: "Community Management" },
      lessons: [
        {
          id: "sm-l4",
          title: { id: "Seni Membalas Komentar & DM", en: "The Art of Replying to Comments & DMs" },
          type: "text",
          duration: 6,
          xp: 25,
          body: {
            id: "Balasan komentar adalah etalase brand.\n\n**Panduan:**\n- Balas cepat: komentar < 1 jam, DM < 3 jam\n- Pakai nada sesuai brand persona (formal/santai)\n- Komentar positif: apresiasi dengan personal, bukan template\n- Komentar negatif: jangan hapus (kecuali SARA/spam), tanggapi tenang, ajak ke DM\n\n**Komentar yang dibalas** = sinyal ke algoritma bahwa kontenmu hidup.",
            en: "Comment replies are the brand's storefront.\n\n**Guidelines:**\n- Reply fast: comments < 1 hour, DMs < 3 hours\n- Match the brand persona's tone (formal/casual)\n- Positive comments: appreciate personally, not with templates\n- Negative comments: don't delete (unless hate speech/spam), respond calmly, move to DM\n\n**Replied comments** = a signal to the algorithm that your content is alive.",
          },
        },
        {
          id: "sm-l5",
          title: { id: "Video: Menangani Krisis Medsos", en: "Video: Handling a Social Media Crisis" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/3VJgYOrlCuc",
        },
        {
          id: "sm-l6",
          title: { id: "Kartu: Manajemen Krisis", en: "Cards: Crisis Management" },
          type: "flipcard",
          duration: 5,
          xp: 20,
          cards: [
            {
              front: { id: "Golden Hour", en: "Golden Hour" },
              back: {
                id: "1-2 jam pertama saat krisis viral. Respons cepat menentukan apakah api padam atau membesar.",
                en: "The first 1-2 hours of a viral crisis. A fast response determines if the fire dies or spreads.",
              },
            },
            {
              front: { id: "Acknowledge - Apologize - Act", en: "Acknowledge - Apologize - Act" },
              back: {
                id: "Akui masalah, minta maaf tulus, umumkan tindakan nyata. Jangan defensif atau menyalahkan.",
                en: "Acknowledge the issue, sincerely apologize, announce real action. Never be defensive or blame.",
              },
            },
            {
              front: { id: "Jangan Pernah...", en: "Never Ever..." },
              back: {
                id: "Menghapus komentar kritis massal, mematikan kolom komentar, atau berdebat dengan netizen.",
                en: "Mass-delete critical comments, turn off comments, or argue with netizens.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sm-m3",
      title: { id: "Analitik & Laporan", en: "Analytics & Reporting" },
      lessons: [
        {
          id: "sm-l7",
          title: { id: "Metrik yang Benar-Benar Penting", en: "Metrics That Actually Matter" },
          type: "text",
          duration: 6,
          xp: 25,
          body: {
            id: "Followers adalah vanity metric. Yang penting:\n\n- **Engagement rate**: (interaksi ÷ reach) × 100%. Sehat: 1-5%\n- **Reach**: berapa banyak akun unik melihat kontenmu\n- **Saves & shares**: tanda konten benar-benar berharga\n- **Conversion**: klik link, DM masuk, penjualan\n\n**Benchmark**: bandingkan dengan performa akunmu sendiri bulan lalu, bukan dengan akun lain.",
            en: "Followers are a vanity metric. What matters:\n\n- **Engagement rate**: (interactions ÷ reach) × 100%. Healthy: 1-5%\n- **Reach**: how many unique accounts saw your content\n- **Saves & shares**: signs your content is truly valuable\n- **Conversion**: link clicks, DMs, sales\n\n**Benchmark**: compare with your own account's performance last month, not with other accounts.",
          },
        },
        {
          id: "sm-l8",
          title: { id: "Video: Bikin Laporan Bulanan", en: "Video: Building Monthly Reports" },
          type: "video",
          duration: 8,
          xp: 30,
          videoUrl: "https://www.youtube.com/embed/YA1lOJCV8YM",
        },
        {
          id: "sm-l9",
          title: { id: "Tools Gratis Social Media Manager", en: "Free Tools for Social Media Managers" },
          type: "text",
          duration: 5,
          xp: 20,
          body: {
            id: "Toolkit SMM pemula (semua gratis):\n\n- **Desain**: Canva\n- **Scheduling**: Meta Business Suite (IG/FB), TikTok Studio\n- **Analitik**: Insight bawaan platform\n- **Riset tren**: TikTok Creative Center, Google Trends\n- **Link bio**: Linktree\n\nKuasai tools ini dan kamu sudah siap menangani klien UMKM pertamamu.",
            en: "Beginner SMM toolkit (all free):\n\n- **Design**: Canva\n- **Scheduling**: Meta Business Suite (IG/FB), TikTok Studio\n- **Analytics**: Built-in platform insights\n- **Trend research**: TikTok Creative Center, Google Trends\n- **Bio link**: Linktree\n\nMaster these tools and you're ready for your first SME client.",
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sm-q1",
      question: { id: "Apa itu content pillar?", en: "What are content pillars?" },
      options: [
        { id: "Pilar di studio foto", en: "Pillars in a photo studio" },
        { id: "3-5 topik utama yang konsisten diposting", en: "3-5 main topics posted consistently" },
        { id: "Konten paling viral", en: "The most viral content" },
        { id: "Jumlah posting per hari", en: "Number of posts per day" },
      ],
      correctIndex: 1,
    },
    {
      id: "sm-q2",
      question: { id: "Aturan 80/20 dalam konten media sosial artinya...", en: "The 80/20 rule in social media content means..." },
      options: [
        { id: "80% jualan, 20% edukasi", en: "80% selling, 20% education" },
        { id: "80% konten bermanfaat, 20% jualan", en: "80% valuable content, 20% selling" },
        { id: "80% video, 20% foto", en: "80% video, 20% photos" },
        { id: "80% hashtag, 20% caption", en: "80% hashtags, 20% caption" },
      ],
      correctIndex: 1,
    },
    {
      id: "sm-q3",
      question: { id: "Platform dengan jangkauan organik terbesar saat ini adalah...", en: "The platform with the biggest organic reach today is..." },
      options: [
        { id: "Facebook", en: "Facebook" },
        { id: "LinkedIn", en: "LinkedIn" },
        { id: "TikTok", en: "TikTok" },
        { id: "Twitter/X", en: "Twitter/X" },
      ],
      correctIndex: 2,
    },
    {
      id: "sm-q4",
      question: { id: "Berapa waktu ideal membalas komentar?", en: "What is the ideal time to reply to comments?" },
      options: [
        { id: "Kurang dari 1 jam", en: "Less than 1 hour" },
        { id: "1 minggu", en: "1 week" },
        { id: "1 bulan", en: "1 month" },
        { id: "Tidak perlu dibalas", en: "No need to reply" },
      ],
      correctIndex: 0,
    },
    {
      id: "sm-q5",
      question: { id: "Cara terbaik menangani komentar negatif adalah...", en: "The best way to handle negative comments is..." },
      options: [
        { id: "Hapus semuanya", en: "Delete them all" },
        { id: "Balas dengan emosi", en: "Reply emotionally" },
        { id: "Tanggapi tenang dan ajak ke DM", en: "Respond calmly and move to DM" },
        { id: "Biarkan menumpuk", en: "Let them pile up" },
      ],
      correctIndex: 2,
    },
    {
      id: "sm-q6",
      question: { id: "Apa itu golden hour dalam manajemen krisis?", en: "What is the golden hour in crisis management?" },
      options: [
        { id: "Jam posting terbaik", en: "The best posting hour" },
        { id: "1-2 jam pertama krisis yang menentukan", en: "The critical first 1-2 hours of a crisis" },
        { id: "Waktu foto terbaik", en: "The best photo time" },
        { id: "Jam istirahat admin", en: "Admin's break time" },
      ],
      correctIndex: 1,
    },
    {
      id: "sm-q7",
      question: { id: "Metrik paling penting untuk mengukur kesehatan akun adalah...", en: "The most important metric for account health is..." },
      options: [
        { id: "Jumlah followers", en: "Follower count" },
        { id: "Engagement rate", en: "Engagement rate" },
        { id: "Jumlah posting", en: "Post count" },
        { id: "Umur akun", en: "Account age" },
      ],
      correctIndex: 1,
    },
    {
      id: "sm-q8",
      question: { id: "Engagement rate yang sehat umumnya...", en: "A healthy engagement rate is generally..." },
      options: [
        { id: "0.01%", en: "0.01%" },
        { id: "1-5%", en: "1-5%" },
        { id: "50%", en: "50%" },
        { id: "100%", en: "100%" },
      ],
      correctIndex: 1,
    },
    {
      id: "sm-q9",
      question: { id: "Tanda konten benar-benar berharga bagi audiens adalah...", en: "The sign content is truly valuable to audiences is..." },
      options: [
        { id: "Banyak saves dan shares", en: "Many saves and shares" },
        { id: "Banyak bot yang like", en: "Many bot likes" },
        { id: "Diposting tengah malam", en: "Posted at midnight" },
        { id: "Caption panjang", en: "Long captions" },
      ],
      correctIndex: 0,
    },
    {
      id: "sm-q10",
      question: { id: "Tools scheduling gratis untuk IG/FB dari Meta adalah...", en: "Meta's free scheduling tool for IG/FB is..." },
      options: [
        { id: "Hootsuite", en: "Hootsuite" },
        { id: "Meta Business Suite", en: "Meta Business Suite" },
        { id: "Photoshop", en: "Photoshop" },
        { id: "Excel", en: "Excel" },
      ],
      correctIndex: 1,
    },
  ],
};
