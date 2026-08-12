"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { FlipCardQuiz } from "@/components/auth/FlipCardQuiz";
import { SignUpSuccess } from "@/components/auth/SignUpSuccess";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

export default function LoginPage() {
  const { user, signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  // When set, the signup-success animation overlay is shown and the
  // normal "logged-in -> redirect home" effect is suppressed so the
  // celebration can play and hand off to the wizard.
  const [successName, setSuccessName] = useState<string | null>(null);

  useEffect(() => {
    // While the success overlay is playing we must NOT bounce to "/".
    if (user && successName === null) router.replace("/");
  }, [user, router, successName]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      const res = signIn(email, password);
      if (!res.ok) setError(res.error ?? "Gagal login.");
    } else {
      const res = signUp({ name, email, password });
      if (!res.ok) {
        setError(res.error ?? "Gagal daftar.");
      } else {
        // Freeze inputs & trigger the animated transition into the wizard.
        // Always store a non-null marker so the redirect guard holds even
        // if the name is blank for some reason.
        setSuccessName(name.trim() || " ");
      }
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError("");
    const res = await signInWithGoogle();
    if (!res.ok) setError(res.error ?? "Gagal login Google.");
    setGoogleLoading(false);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
  };

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center justify-center gap-10 overflow-hidden px-4 py-10 lg:py-16">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-primary/15 to-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tr from-gold/10 to-primary/10 blur-3xl"
        aria-hidden
      />

      {/* Left: auto-playing demo card (desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden max-w-lg lg:block"
      >
        <FlipCardQuiz autoPlay />
      </motion.div>

      {/* Right: auth card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-md"
      >
        {/* Mobile flip card */}
        <div className="mx-auto mb-6 max-w-sm lg:hidden">
          <FlipCardQuiz autoPlay />
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-card">
          {/* Mobile brand */}
          <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange text-white">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="font-display text-xl font-extrabold gradient-text">
              SkillPath
            </span>
          </div>

          <h2 className="text-center font-display text-2xl font-extrabold">
            {mode === "login" ? "Selamat datang kembali!" : "Buat akun barumu"}
          </h2>
          <p className="mt-1.5 text-center text-sm text-muted">
            {mode === "login"
              ? "Masuk untuk melanjutkan perjalananmu"
              : "Gratis — mulai belajar dalam 1 menit"}
          </p>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted">
                  <User className="h-3.5 w-3.5" /> Nama lengkap
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="contoh: Budi Santoso"
                  autoComplete="name"
                  className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold outline-none transition-colors placeholder:font-normal placeholder:text-muted focus:border-primary"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted">
                <Mail className="h-3.5 w-3.5" /> Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kamu@email.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold outline-none transition-colors placeholder:font-normal placeholder:text-muted focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted">
                <Lock className="h-3.5 w-3.5" /> Password
              </span>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "Minimal 6 karakter" : "Password kamu"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                  className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 pr-12 text-sm font-semibold outline-none transition-colors placeholder:font-normal placeholder:text-muted focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:text-foreground"
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            {error && (
              <p className="rounded-xl bg-error/10 px-4 py-3 text-xs font-bold text-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-3d flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3.5 text-sm font-extrabold text-white"
            >
              {mode === "login" ? "Masuk" : "Daftar Sekarang"}
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold text-muted">
                atau lanjutkan dengan
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            {/* Google button — below the submit button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading}
              className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-primary/50 hover:shadow-soft disabled:opacity-60"
            >
              {googleLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <GoogleIcon />
              )}
              {googleLoading
                ? "Menghubungkan..."
                : mode === "login"
                  ? "Masuk dengan Google"
                  : "Daftar dengan Google"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-semibold text-muted">
            {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className={cn("font-extrabold text-primary hover:text-primary-hover")}
            >
              {mode === "login" ? "Daftar sekarang" : "Masuk"}
            </button>
          </p>
        </div>

        <p className="mt-4 text-center text-[11px] font-semibold text-muted">
          Dengan melanjutkan, kamu setuju dengan Ketentuan Layanan & Kebijakan
          Privasi kami.
        </p>
      </motion.div>

      {/* ===== Signup success → wizard transition ===== */}
      {successName !== null && (
        <SignUpSuccess
          name={successName}
          href="/onboarding"
          onContinue={() => router.replace("/onboarding")}
        />
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.07L5.84 9.91C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
