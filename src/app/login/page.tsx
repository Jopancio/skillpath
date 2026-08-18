"use client";

import { useState } from "react";
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
// Clerk v7: sign-in/sign-up flows use the stable legacy hooks; useUser keeps
// the current API.
import { useSignIn, useSignUp } from "@clerk/nextjs/legacy";
import { useUser } from "@clerk/nextjs";
import { FlipCardQuiz } from "@/components/auth/FlipCardQuiz";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

function clerkError(err?: { code?: string; message?: string } | undefined): string {
  if (!err) return "Terjadi kesalahan.";
  const map: Record<string, string> = {
    form_password_incorrect: "Email atau password salah.",
    form_identifier_not_found: "Email belum terdaftar.",
    form_identifier_exists: "Email sudah terdaftar. Silakan login.",
    form_password_pwned:
      "Password ini pernah bocor di internet, gunakan password lain.",
    form_password_too_short: "Password minimal 15 karakter.",
    form_password_length_too_short: "Password minimal 15 karakter.",
    form_password_length_too_long: "Password terlalu panjang.",
    form_password_not_strong_enough: "Password kurang kuat.",
    form_param_format_invalid: "Format email tidak valid.",
    form_email_address_invalid: "Format email tidak valid.",
    form_code_incorrect: "Kode verifikasi salah.",
  };
  return map[err.code ?? ""] ?? err.message ?? "Terjadi kesalahan.";
}

function errorText(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as {
      errors?: Array<{ code?: string; message?: string }>;
      message?: string;
    };
    if (Array.isArray(e.errors) && e.errors.length)
      return e.errors.map(clerkError).join(" ");
    if (typeof e.message === "string") return e.message;
  }
  return "Terjadi kesalahan.";
}

export default function LoginPage() {
  const { isLoaded: userLoaded } = useUser();
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Email verification (signup): "form" -> "verify" -> success overlay
  const [step, setStep] = useState<"form" | "verify">("form");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  const loaded = userLoaded && signInLoaded && signUpLoaded;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      if (!signInLoaded || !signIn) return;
      setSubmitting(true);
      try {
        const res = await signIn.create({
          identifier: email.trim().toLowerCase(),
          password,
        });
        if (res.status === "complete" && res.createdSessionId) {
          await setActive({ session: res.createdSessionId, navigate: () => {} });
          router.replace("/");
        } else {
          setError("Gagal login. Periksa kembali email dan passwordmu.");
        }
      } catch (err) {
        setError(errorText(err));
      }
      setSubmitting(false);
      return;
    }

    // Signup validation
    if (!name.trim()) {
      setError("Nama tidak boleh kosong.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Email tidak valid.");
      return;
    }
    if (password.length < 15) {
      setError("Password minimal 15 karakter.");
      return;
    }

    if (!signUpLoaded || !signUp || !signInLoaded || !setActive) return;
    setSubmitting(true);
    try {
      const res = await signUp.create({
        emailAddress: email.trim().toLowerCase(),
        password,
        firstName: name.trim(),
      });
      if (res.status === "complete" && res.createdSessionId) {
        // Skip Clerk's automatic redirect (afterSignUpUrl = "/") so the
        // wizard (with its welcome animation) receives the user.
        await setActive({ session: res.createdSessionId, navigate: () => {} });
        router.replace("/onboarding");
        return;
      }
      // Email verification required before the account becomes active.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify");
    } catch (err) {
      setError(errorText(err));
    } finally {
      setSubmitting(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded || !signUp || !signInLoaded || !setActive) return;
    setVerifying(true);
    setError("");
    try {
      const res = await signUp.attemptEmailAddressVerification({ code });
      if (res.status === "complete" && res.createdSessionId) {
        await setActive({ session: res.createdSessionId, navigate: () => {} });
        router.replace("/onboarding");
      } else {
        setError("Kode verifikasi salah.");
      }
    } catch (err) {
      setError(errorText(err));
    }
    setVerifying(false);
  };

  const handleGoogle = async () => {
    if (!signInLoaded || !signIn) return;
    setGoogleLoading(true);
    setError("");
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch {
      setError("Login Google gagal.");
      setGoogleLoading(false);
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
    setStep("form");
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

          {step === "verify" ? (
            <>
              <h2 className="text-center font-display text-2xl font-extrabold">
                Verifikasi emailmu
              </h2>
              <p className="mt-1.5 text-center text-sm text-muted">
                Kami kirim kode 6 digit ke{" "}
                <span className="font-bold text-foreground">
                  {email.trim().toLowerCase()}
                </span>
                . Cek inbox atau folder spam.
              </p>

              <form onSubmit={verifyCode} className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted">
                    <Mail className="h-3.5 w-3.5" /> Kode verifikasi
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000"
                    required
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-center text-lg font-bold tracking-[0.5em] outline-none transition-colors placeholder:font-normal placeholder:text-muted focus:border-primary"
                  />
                </label>

                {error && (
                  <p className="rounded-xl bg-error/10 px-4 py-3 text-xs font-bold text-error">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={verifying}
                  className="btn-3d flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  {verifying ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Verifikasi Email"
                  )}
                  {!verifying && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-center font-display text-2xl font-extrabold">
                {mode === "login" ? "Selamat datang kembali!" : "Buat akun barumu"}
              </h2>
              <p className="mt-1.5 text-center text-sm text-muted">
                {mode === "login"
                  ? "Masuk untuk melanjutkan perjalananmu"
                  : "Gratis — mulai belajar dalam 1 menit"}
              </p>

              <form onSubmit={submit} className="mt-6 space-y-4">
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
                      placeholder={mode === "signup" ? "Minimal 15 karakter" : "Password kamu"}
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

                {/* Clerk renders its Smart CAPTCHA here when a signup is
                    suspected to be a bot; without this element it silently
                    falls back to an invisible widget. */}
                {mode === "signup" && (
                  <div
                    id="clerk-captcha"
                    data-cl-theme="auto"
                    data-cl-size="flexible"
                  />
                )}

                <button
                  type="submit"
                  disabled={!loaded || submitting}
                  className="btn-3d flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : mode === "login" ? (
                    "Masuk"
                  ) : (
                    "Daftar Sekarang"
                  )}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
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
                  disabled={!loaded || googleLoading}
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
            </>
          )}
        </div>

        <p className="mt-4 text-center text-[11px] font-semibold text-muted">
          Dengan melanjutkan, kamu setuju dengan Ketentuan Layanan & Kebijakan
          Privasi kami.
        </p>
      </motion.div>

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
