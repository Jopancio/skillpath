"use client";

import {
  useEffect,
  useState,
  type ComponentType,
} from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  Flame,
  GraduationCap,
  Loader2,
  Lock,
  LogIn,
  Mail,
  PartyPopper,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  UserPlus,
  Zap,
} from "lucide-react";
// Clerk v7: sign-in/sign-up flows use the stable legacy hooks; useUser keeps
// the current API.
import { useSignIn, useSignUp } from "@clerk/nextjs/legacy";
import { useUser } from "@clerk/nextjs";
import { FlipCardQuiz } from "@/components/auth/FlipCardQuiz";
import { AuroraBackdrop } from "@/components/auth/AuroraBackdrop";
import { OtpInput } from "@/components/auth/OtpInput";
import TextType from "@/components/ui/TextType";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

/* ============================================================ */
/*  Animation presets                                            */
/* ============================================================ */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Container that staggers its children in (used for each auth step). */
const stepContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.03 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.16, ease: "easeIn" } },
};

const stepItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 330, damping: 26 },
  },
};

/** Hero headline words flip up one by one. */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: -55 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 280, damping: 21 },
  },
};

const HERO_WORDS: Array<{ text: string; accent?: boolean }> = [
  { text: "Belajar" },
  { text: "skill" },
  { text: "baru," },
  { text: "seru" },
  { text: "kayak" },
  { text: "game!", accent: true },
];

const ROLES = [
  "Barista",
  "Content Creator",
  "Digital Marketer",
  "Video Editor",
  "UI/UX Designer",
];

const PERKS = [
  { icon: BadgeCheck, text: "100% gratis untuk mulai", chip: "bg-success/10 text-success" },
  { icon: Zap, text: "Seru kayak main game", chip: "bg-primary/10 text-primary" },
  { icon: Rocket, text: "Langsung siap kerja", chip: "bg-gold/15 text-deep-orange" },
];

const RESEND_COOLDOWN = 30;

/* ============================================================ */
/*  Error helpers                                                */
/* ============================================================ */

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

/* ============================================================ */
/*  Small presentational helpers                                 */
/* ============================================================ */

function passwordStrength(pw: string): {
  score: number;
  label: string;
  bar: string;
  text: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 15) score++;
  if (/[a-zA-Z]/.test(pw) && /[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (pw.length < 8) score = Math.min(score, 1);

  const meta = [
    { label: "Lemah", bar: "bg-error", text: "text-error" },
    { label: "Cukup", bar: "bg-gold", text: "text-gold" },
    { label: "Bagus", bar: "bg-primary", text: "text-primary" },
    { label: "Kuat", bar: "bg-success", text: "text-success" },
  ][Math.max(0, score - 1)];
  return { score, ...meta };
}

const INPUT_CLASS =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base font-semibold outline-none transition-all duration-200 placeholder:font-normal placeholder:text-muted focus:-translate-y-px focus:border-primary focus:shadow-[0_0_0_4px_rgb(255_107_44/0.12)] sm:text-sm";

/** Labeled input shell — icon warms up when the field gains focus. */
function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted transition-colors group-focus-within:text-primary">
        <Icon className="h-3.5 w-3.5" /> {label}
      </span>
      {children}
    </label>
  );
}

/** Inline error banner that slides open/closed. */
function ErrorBanner({ error }: { error: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -6 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -6 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <p className="flex items-start gap-2 rounded-xl bg-error/10 px-4 py-3 text-xs font-bold text-error">
            <AlertCircle className="mt-px h-4 w-4 shrink-0" />
            {error}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Little sticker pinned to the auth card, gently wobbling. */
function CardSticker({
  icon: Icon,
  iconClass,
  className,
  delay,
  reduce,
}: {
  icon: ComponentType<{ className?: string }>;
  iconClass: string;
  className: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        delay: reduce ? 0 : 0.55 + delay,
        type: "spring",
        stiffness: 280,
        damping: 14,
      }}
      className={cn("absolute z-20", className)}
    >
      <motion.div
        animate={reduce ? undefined : { rotate: [0, 10, -6, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex h-9 w-9 items-center justify-center rounded-2xl border border-border bg-card shadow-soft"
      >
        <Icon className={cn("h-4 w-4", iconClass)} />
      </motion.div>
    </motion.div>
  );
}

/** Floating achievement badge orbiting the demo quiz card. */
function FloatBadge({
  children,
  className,
  delay,
  reduce,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: reduce ? 0 : 1 + delay,
        type: "spring",
        stiffness: 300,
        damping: 17,
      }}
      className={cn("absolute z-20", className)}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-2xl border border-border bg-card/95 px-3 py-2 text-xs font-extrabold shadow-soft backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================ */
/*  Page                                                         */
/* ============================================================ */

export default function LoginPage() {
  const { isLoaded: userLoaded } = useUser();
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

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
  const [resendIn, setResendIn] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);
  const [resentOk, setResentOk] = useState(false);

  const loaded = userLoaded && signInLoaded && signUpLoaded;

  // Shake the auth card whenever an error appears.
  const shakeControls = useAnimationControls();
  useEffect(() => {
    if (!error || reduceMotion) return;
    shakeControls.start({
      x: [0, -9, 9, -6, 6, -2, 0],
      transition: { duration: 0.45, ease: "easeInOut" },
    });
  }, [error, reduceMotion, shakeControls]);

  // "Kirim ulang kode" cooldown ticker; the countdown itself is reset by the
  // handlers that open/resend the verification step.
  useEffect(() => {
    if (step !== "verify") return;
    const timer = window.setInterval(
      () => setResendIn((s) => (s > 0 ? s - 1 : 0)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [step]);

  useEffect(() => {
    if (!resentOk) return;
    const id = window.setTimeout(() => setResentOk(false), 2600);
    return () => window.clearTimeout(id);
  }, [resentOk]);

  const updateCode = (value: string) => {
    setCode(value);
    if (error) setError("");
  };

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
      setCode("");
      setResendIn(RESEND_COOLDOWN);
      setStep("verify");
    } catch (err) {
      setError(errorText(err));
    } finally {
      setSubmitting(false);
    }
  };

  const doVerify = async (codeValue: string) => {
    if (!signUpLoaded || !signUp || !signInLoaded || !setActive) return;
    if (verifying) return;
    setVerifying(true);
    setError("");
    try {
      const res = await signUp.attemptEmailAddressVerification({ code: codeValue });
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

  const verifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) void doVerify(code);
  };

  const resendCode = async () => {
    if (!signUpLoaded || !signUp || resending || resendIn > 0) return;
    setResending(true);
    setError("");
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setResendIn(RESEND_COOLDOWN);
      setResentOk(true);
    } catch (err) {
      setError(errorText(err));
    } finally {
      setResending(false);
    }
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

  const strength = passwordStrength(password);

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
      <AuroraBackdrop />

      <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* ================================================ */}
        {/* Left: hero + auto-playing demo card (desktop)     */}
        {/* ================================================ */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="hidden lg:block"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT }}
            className="mb-5 inline-flex"
          >
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-extrabold text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Platform belajar bergaya game
            </motion.span>
          </motion.div>

          {/* Headline — words flip in one by one */}
          <motion.h1
            className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight xl:text-5xl"
            style={{ perspective: 900 }}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
            }}
          >
            {HERO_WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={cn(
                  "mr-[0.22em] inline-block",
                  word.accent && "gradient-text",
                )}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          {/* Typewriter role line */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-4 flex flex-wrap items-baseline gap-x-2 text-lg font-bold text-muted"
          >
            <span>Siap jadi seorang</span>
            <TextType
              className="gradient-text font-display text-xl font-extrabold sm:text-2xl"
              text={ROLES}
              typingSpeed={70}
              deletingSpeed={38}
              pauseDuration={1700}
              cursorCharacter="▍"
              cursorClassName="text-primary"
            />
          </motion.div>

          {/* Perk chips */}
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09, delayChildren: 0.85 } },
            }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {PERKS.map((perk) => (
              <motion.span
                key={perk.text}
                variants={stepItem}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold",
                  perk.chip,
                )}
              >
                <perk.icon className="h-3.5 w-3.5" />
                {perk.text}
              </motion.span>
            ))}
          </motion.div>

          {/* Live demo quiz + floating achievement badges */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE_OUT }}
            className="relative mx-auto mt-8 max-w-lg"
          >
            <FloatBadge
              reduce={!!reduceMotion}
              delay={0.4}
              className="-left-3 top-24 xl:-left-7"
            >
              <Trophy className="h-4 w-4 text-gold" />
              +50 XP
            </FloatBadge>
            <FloatBadge
              reduce={!!reduceMotion}
              delay={1.1}
              className="-right-3 bottom-24 xl:-right-7"
            >
              <Flame className="h-4 w-4 text-primary" fill="currentColor" />
              Streak 7 hari
            </FloatBadge>
            <FloatBadge
              reduce={!!reduceMotion}
              delay={1.7}
              className="-bottom-4 left-10"
            >
              <PartyPopper className="h-4 w-4 text-deep-orange" />
              Level Up!
            </FloatBadge>

            <FlipCardQuiz autoPlay />
          </motion.div>
        </motion.div>

        {/* ================================================ */}
        {/* Right: auth card                                  */}
        {/* ================================================ */}
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 32, scale: 0.97 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT }}
          className="mx-auto w-full max-w-md"
        >
          <motion.div animate={shakeControls}>
            <div className="auth-beam rounded-[2rem]">
              <CardSticker
                icon={Sparkles}
                iconClass="text-gold"
                className="-right-3 -top-4"
                delay={0.2}
                reduce={!!reduceMotion}
              />
              <CardSticker
                icon={Trophy}
                iconClass="text-primary"
                className="-bottom-4 -left-3"
                delay={0.9}
                reduce={!!reduceMotion}
              />

              <div className="relative rounded-[2rem] border border-border bg-card p-5 shadow-card sm:p-8">
                {/* Mobile brand */}
                <motion.div
                  initial={
                    reduceMotion ? false : { opacity: 0, y: -18, scale: 0.85 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mb-5 flex items-center justify-center gap-2.5 lg:hidden"
                >
                  <span className="animate-pulse-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <span className="gradient-text font-display text-2xl font-extrabold">
                    SkillPath
                  </span>
                </motion.div>

                {/* Segmented mode switcher — kept mounted across mode
                    switches so the active pill slides between tabs; it
                    collapses while the verify step is open. */}
                <AnimatePresence initial={false}>
                  {step === "form" && (
                    <motion.div
                      key="tabs"
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <div className="relative grid grid-cols-2 rounded-full border border-border bg-background p-1">
                        {(
                          [
                            { key: "login", label: "Masuk", icon: LogIn },
                            { key: "signup", label: "Daftar", icon: UserPlus },
                          ] as const
                        ).map((tab) => (
                          <button
                            key={tab.key}
                            type="button"
                            onClick={() => switchMode(tab.key)}
                            className={cn(
                              "relative flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-extrabold transition-colors duration-200",
                              mode === tab.key
                                ? "text-white"
                                : "text-muted hover:text-foreground",
                            )}
                          >
                            {mode === tab.key && (
                              <motion.span
                                layoutId="auth-tab-pill"
                                transition={{
                                  type: "spring",
                                  stiffness: 420,
                                  damping: 34,
                                }}
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-deep-orange shadow-soft"
                              />
                            )}
                            <tab.icon className="relative z-10 h-4 w-4" />
                            <span className="relative z-10">{tab.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {step === "verify" ? (
                    /* ------------------------------------------ */
                    /* Verify step                                 */
                    /* ------------------------------------------ */
                    <motion.div
                      key="verify"
                      variants={stepContainer}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      {/* Radar mail icon */}
                      <motion.div
                        variants={stepItem}
                        className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center"
                      >
                        <span className="animate-pulse-ring absolute inset-0 rounded-full" />
                        <span className="animate-pulse-ring absolute inset-0 rounded-full [animation-delay:1s]" />
                        <motion.div
                          initial={
                            reduceMotion ? false : { scale: 0, rotate: -20 }
                          }
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 13,
                          }}
                          className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-glow"
                        >
                          <Mail className="h-7 w-7" />
                        </motion.div>
                      </motion.div>

                      <motion.h2
                        variants={stepItem}
                        className="text-center font-display text-xl font-extrabold sm:text-2xl"
                      >
                        Verifikasi emailmu
                      </motion.h2>
                      <motion.p
                        variants={stepItem}
                        className="mt-1.5 text-center text-sm text-muted"
                      >
                        Kami kirim kode 6 digit ke{" "}
                        <span className="font-bold text-foreground">
                          {email.trim().toLowerCase()}
                        </span>
                        . Cek inbox atau folder spam.
                      </motion.p>

                      <motion.form
                        onSubmit={verifyCode}
                        variants={stepItem}
                        className="mt-6 space-y-4"
                      >
                        <OtpInput
                          value={code}
                          onChange={updateCode}
                          onComplete={(value) => void doVerify(value)}
                          error={!!error}
                          disabled={verifying}
                        />

                        <ErrorBanner error={error} />

                        <button
                          type="submit"
                          disabled={verifying || code.length !== 6}
                          className="btn-3d group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3.5 text-sm font-extrabold text-white"
                        >
                          {verifying ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Memproses...
                            </>
                          ) : (
                            <>
                              Verifikasi Email
                              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </>
                          )}
                        </button>

                        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-muted">
                          Tidak menerima kode?
                          {resendIn > 0 ? (
                            <span className="font-bold">
                              Kirim ulang ({resendIn}s)
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={resendCode}
                              disabled={resending}
                              className="inline-flex items-center gap-1 font-extrabold text-primary transition-colors hover:text-primary-hover disabled:opacity-60"
                            >
                              {resending ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <RefreshCw className="h-3.5 w-3.5" />
                              )}
                              Kirim ulang kode
                            </button>
                          )}
                        </div>
                        <AnimatePresence>
                          {resentOk && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-center text-xs font-bold text-success"
                            >
                              Kode baru berhasil dikirim!
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.form>

                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setStep("form");
                        }}
                        className="mt-4 flex w-full items-center justify-center gap-1.5 text-xs font-bold text-muted transition-colors hover:text-foreground"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Gunakan email lain
                      </button>
                    </motion.div>
                  ) : (
                    /* ------------------------------------------ */
                    /* Form step (login / signup)                 */
                    /* ------------------------------------------ */
                    <motion.div
                      key={`form-${mode}`}
                      variants={stepContainer}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <motion.h2
                        variants={stepItem}
                        className="text-center font-display text-xl font-extrabold sm:text-2xl"
                      >
                        {mode === "login"
                          ? "Selamat datang kembali!"
                          : "Buat akun barumu"}
                      </motion.h2>
                      <motion.p
                        variants={stepItem}
                        className="mt-1.5 text-center text-sm text-muted"
                      >
                        {mode === "login"
                          ? "Masuk untuk melanjutkan perjalananmu"
                          : "Gratis — mulai belajar dalam 1 menit"}
                      </motion.p>

                      <motion.form
                        onSubmit={submit}
                        variants={stepItem}
                        className="mt-5 space-y-4"
                      >
                        {mode === "signup" && (
                          <Field label="Nama lengkap" icon={User}>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="contoh: Budi Santoso"
                              autoComplete="name"
                              className={INPUT_CLASS}
                            />
                          </Field>
                        )}

                        <Field label="Email" icon={Mail}>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="kamu@email.com"
                            autoComplete="email"
                            required
                            className={INPUT_CLASS}
                          />
                        </Field>

                        <div>
                          <Field label="Password" icon={Lock}>
                            <div className="relative">
                              <input
                                type={showPass ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={
                                  mode === "signup"
                                    ? "Minimal 15 karakter"
                                    : "Password kamu"
                                }
                                autoComplete={
                                  mode === "login"
                                    ? "current-password"
                                    : "new-password"
                                }
                                required
                                className={cn(INPUT_CLASS, "pr-12")}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPass((v) => !v)}
                                aria-label="Toggle password visibility"
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-all hover:scale-110 hover:text-foreground active:scale-90"
                              >
                                {showPass ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </Field>

                          {/* Password strength meter (signup only) */}
                          <AnimatePresence>
                            {mode === "signup" && password.length > 0 && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: EASE_OUT }}
                                className="overflow-hidden"
                              >
                                <div className="flex items-center gap-2.5 pt-2">
                                  <div className="flex flex-1 gap-1">
                                    {[1, 2, 3, 4].map((level) => (
                                      <span
                                        key={level}
                                        className="h-1.5 flex-1 overflow-hidden rounded-full bg-border"
                                      >
                                        <motion.span
                                          initial={false}
                                          animate={{
                                            scaleX: level <= strength.score ? 1 : 0,
                                          }}
                                          transition={{
                                            duration: 0.25,
                                            ease: EASE_OUT,
                                          }}
                                          className={cn(
                                            "block h-full origin-left rounded-full",
                                            level <= strength.score
                                              ? strength.bar
                                              : "bg-transparent",
                                          )}
                                        />
                                      </span>
                                    ))}
                                  </div>
                                  <span
                                    className={cn(
                                      "whitespace-nowrap text-[11px] font-extrabold",
                                      strength.text,
                                    )}
                                  >
                                    {strength.label}
                                    {password.length < 15 && (
                                      <span className="ml-1 font-semibold text-muted">
                                        · {password.length}/15
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <ErrorBanner error={error} />

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
                          className="btn-3d group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3.5 text-sm font-extrabold text-white"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Memproses...
                            </>
                          ) : (
                            <>
                              {mode === "login" ? "Masuk" : "Daftar Sekarang"}
                              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </>
                          )}
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
                          className="group flex w-full items-center justify-center gap-3 rounded-full border-2 border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft active:translate-y-0 disabled:opacity-60"
                        >
                          <motion.span
                            animate={googleLoading ? { rotate: [0, 12, -12, 0] } : undefined}
                            transition={{
                              duration: 0.5,
                              repeat: googleLoading ? Infinity : 0,
                            }}
                            className="flex transition-transform duration-200 group-hover:scale-110"
                          >
                            <GoogleIcon />
                          </motion.span>
                          {googleLoading
                            ? "Menghubungkan..."
                            : mode === "login"
                              ? "Masuk dengan Google"
                              : "Daftar dengan Google"}
                        </button>
                      </motion.form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                  Data kamu aman &amp; terenkripsi
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 text-center text-[11px] font-semibold leading-relaxed text-muted"
          >
            Dengan melanjutkan, kamu setuju dengan{" "}
            <span className="font-bold text-foreground/80">
              Ketentuan Layanan
            </span>{" "}
            &amp;{" "}
            <span className="font-bold text-foreground/80">
              Kebijakan Privasi
            </span>{" "}
            kami.
          </motion.p>
        </motion.div>
      </div>
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
