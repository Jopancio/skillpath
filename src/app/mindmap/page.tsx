"use client";

import MindMap, { type MindMapData } from "@/components/mindmap/MindMap";

const demoData: MindMapData = {
  root: {
    title: "Pembuat Aplikasi Judi",
    subtitle: "Perencanaan",
    icon: "file",
  },
  features: [
    {
      id: "f1",
      title: "Studio Pembuat",
      phase: 1,
      icon: "layers",
      subFeatures: [
        { title: "Template Siap Pakai" },
        { title: "Tata Letak" },
        { title: "Pratinjau Langsung" },
        { title: "Kustomisasi Warna" },
      ],
    },
    {
      id: "f2",
      title: "Kelola Game",
      phase: 2,
      icon: "grid",
      subFeatures: [
        { title: "Tambah Game" },
        { title: "Atur Aturan & Odds" },
        { title: "Uji Coba Game" },
        { title: "Kategori Game" },
      ],
    },
    {
      id: "f3",
      title: "Atur Keuangan",
      phase: 2,
      icon: "card",
      subFeatures: [
        { title: "Deposit" },
        { title: "Penarikan" },
        { title: "Riwayat Transaksi" },
        { title: "Metode Pembayaran" },
      ],
    },
    {
      id: "f4",
      title: "Kelola Pemain",
      phase: 3,
      icon: "users",
      subFeatures: [
        { title: "Daftar Pemain" },
        { title: "Blokir Pemain" },
        { title: "Riwayat Aktivitas" },
        { title: "Level & Bonus" },
      ],
    },
    {
      id: "f5",
      title: "Analitik",
      phase: 3,
      icon: "chart",
      subFeatures: [
        { title: "Laporan Harian" },
        { title: "Game Terpopuler" },
        { title: "Perbandingan Omzet" },
        { title: "Grafik Tren Pemain" },
      ],
    },
    {
      id: "f6",
      title: "Masuk Akun",
      phase: 4,
      icon: "key",
      subFeatures: [
        { title: "Daftar Akun" },
        { title: "Login & Logout" },
        { title: "Reset Kata Sandi" },
        { title: "Keamanan 2FA" },
      ],
    },
    {
      id: "f7",
      title: "Pengaturan Aplikasi",
      phase: 5,
      icon: "settings",
      subFeatures: [
        { title: "Info Aplikasi" },
        { title: "Logo & Tema" },
        { title: "Bahasa & Zona" },
        { title: "Notifikasi" },
      ],
    },
  ],
};

export default function MindMapDemoPage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      <div className="absolute left-4 top-4 z-10 rounded-xl border border-border bg-card px-4 py-2 shadow-sm">
        <p className="font-display text-sm font-semibold text-foreground">
          Peta Pikiran — Fitur Aplikasi
        </p>
        <p className="text-[11px] text-muted">Geser untuk jelajah • Scroll untuk zoom</p>
      </div>
      <MindMap data={demoData} />
    </main>
  );
}
