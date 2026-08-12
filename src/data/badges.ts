import type { Localized } from "./types";

export interface Badge {
  id: string;
  name: Localized;
  description: Localized;
  icon: string; // lucide icon key
  color: string;
}

export const badges: Badge[] = [
  {
    id: "first-steps",
    name: { id: "Langkah Pertama", en: "First Steps" },
    description: { id: "Selesaikan pelajaran pertamamu", en: "Complete your first lesson" },
    icon: "Footprints",
    color: "#22C55E",
  },
  {
    id: "streak-3",
    name: { id: "Streak 3 Hari", en: "3-Day Streak" },
    description: { id: "Belajar 3 hari berturut-turut", en: "Learn 3 days in a row" },
    icon: "Flame",
    color: "#FF6B2C",
  },
  {
    id: "streak-7",
    name: { id: "Streak 7 Hari", en: "7-Day Streak" },
    description: { id: "Belajar seminggu penuh tanpa putus", en: "Learn a full week without missing" },
    icon: "Zap",
    color: "#F4B942",
  },
  {
    id: "bookworm",
    name: { id: "Kutu Buku", en: "Bookworm" },
    description: { id: "Selesaikan 10 pelajaran", en: "Complete 10 lessons" },
    icon: "BookOpen",
    color: "#3B82F6",
  },
  {
    id: "scholar",
    name: { id: "Sarjana Skill", en: "Skill Scholar" },
    description: { id: "Selesaikan 25 pelajaran", en: "Complete 25 lessons" },
    icon: "GraduationCap",
    color: "#8B5CF6",
  },
  {
    id: "quiz-master",
    name: { id: "Master Kuis", en: "Quiz Master" },
    description: { id: "Dapatkan nilai sempurna di kuis", en: "Get a perfect score on a quiz" },
    icon: "Target",
    color: "#EF4444",
  },
  {
    id: "course-completer",
    name: { id: "Penakluk Kursus", en: "Course Conqueror" },
    description: { id: "Selesaikan semua pelajaran di satu kursus", en: "Complete all lessons in one course" },
    icon: "Trophy",
    color: "#D94A16",
  },
  {
    id: "certified",
    name: { id: "Tersertifikasi", en: "Certified" },
    description: { id: "Lulus kuis akhir dan raih sertifikat", en: "Pass a final quiz and earn a certificate" },
    icon: "Award",
    color: "#22C55E",
  },
  {
    id: "xp-500",
    name: { id: "Kolektor 500 XP", en: "500 XP Collector" },
    description: { id: "Kumpulkan total 500 XP", en: "Collect 500 total XP" },
    icon: "Star",
    color: "#EC4899",
  },
  {
    id: "xp-1000",
    name: { id: "Legenda 1000 XP", en: "1000 XP Legend" },
    description: { id: "Kumpulkan total 1000 XP", en: "Collect 1000 total XP" },
    icon: "Crown",
    color: "#FF6B2C",
  },
];

export function getBadge(id: string): Badge | undefined {
  return badges.find((b) => b.id === id);
}

export interface LeaderboardEntry {
  name: string;
  xp: number;
  streak: number;
  avatarColor: string;
}

export const leaderboard: LeaderboardEntry[] = [
  { name: "Rani Puspita", xp: 1240, streak: 21, avatarColor: "#FF6B2C" },
  { name: "Bagas Wicaksono", xp: 980, streak: 14, avatarColor: "#3B82F6" },
  { name: "Siti Maemunah", xp: 860, streak: 12, avatarColor: "#EC4899" },
  { name: "Andi Pratama", xp: 720, streak: 9, avatarColor: "#F4B942" },
  { name: "Dewi Anggraini", xp: 655, streak: 7, avatarColor: "#8B5CF6" },
  { name: "Rizky Ramadhan", xp: 540, streak: 6, avatarColor: "#D94A16" },
  { name: "Putri Ayu", xp: 430, streak: 5, avatarColor: "#22C55E" },
];
