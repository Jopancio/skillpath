"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import {
  Brain,
  Check,
  Clock,
  Flame,
  Gamepad2,
  Hand,
  MousePointerClick,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from "lucide-react";

/* ============================================================ */
/*  Types                                                       */
/* ============================================================ */

type GameType = "swipe" | "tap" | "match" | "flip" | "sort";

interface BaseGame {
  id: string;
  type: GameType;
  title: string;
  instruction: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
}

interface SwipeGame extends BaseGame {
  type: "swipe";
  statement: string;
  isTrue: boolean;
}

interface TapGame extends BaseGame {
  type: "tap";
  prompt: string;
  options: { text: string; correct: boolean }[];
}

interface MatchGame extends BaseGame {
  type: "match";
  pairs: { left: string; right: string; id: string }[];
}

interface FlipGame extends BaseGame {
  type: "flip";
  statement: string;
  isTrue: boolean;
}

interface SortGame extends BaseGame {
  type: "sort";
  items: { text: string; correctPosition: number }[];
}

type Game = SwipeGame | TapGame | MatchGame | FlipGame | SortGame;

/* ============================================================ */
/*  Game data — 5 mini-games, variety of interactions           */
/* ============================================================ */

const GAMES: Game[] = [
  // 1. SWIPE — Swipe right for true, left for false
  {
    id: "g1",
    type: "swipe",
    title: "Swipe Benar / Salah",
    instruction: "Geser kanan jika BENAR, kiri jika SALAH",
    icon: Hand,
    accent: "from-primary to-deep-orange",
    statement: "Belajar 25 menit setiap hari lebih efektif daripada 5 jam seminggu sekali",
    isTrue: true,
  },
  // 2. TAP — Tap the correct answer fast
  {
    id: "g2",
    type: "tap",
    title: "Tap Cepat",
    instruction: "Pilih jawaban yang BENAR secepatnya!",
    icon: MousePointerClick,
    accent: "from-gold to-primary",
    prompt: "Apa teknik belajar paling efektif untuk daya ingat jangka panjang?",
    options: [
      { text: "Membaca ulang & menandai", correct: false },
      { text: "Pengulangan aktif (active recall)", correct: true },
      { text: "Menyimak sambil tidur", correct: false },
    ],
  },
  // 3. MATCH — Match pairs by tapping
  {
    id: "g3",
    type: "match",
    title: "Cocokkan Pasangan",
    instruction: "Pasangkan istilah dengan artinya yang benar",
    icon: Target,
    accent: "from-deep-orange to-gold",
    pairs: [
      { id: "p1", left: "Active Recall", right: "Mengingat tanpa melihat catatan" },
      { id: "p2", left: "Spaced Repetition", right: "Ulang dengan jarak waktu" },
      { id: "p3", left: "Pomodoro", right: "25 menit fokus, 5 menit istirahat" },
    ],
  },
  // 4. FLIP — Flip card to reveal, then decide true/false
  {
    id: "g4",
    type: "flip",
    title: "Flip Kartu",
    instruction: "Klik kartu untuk lihat detail, lalu pilih Benar / Salah",
    icon: Sparkles,
    accent: "from-primary to-gold",
    statement: "Mengajar ulang materi ke orang lain memperkuat pemahamanmu sendiri",
    isTrue: true,
  },
  // 5. SORT — Drag items into correct order
  {
    id: "g5",
    type: "sort",
    title: "Urutkan Tahapan",
    instruction: "Tahan & geser untuk urutkan langkah belajar yang benar",
    icon: Gamepad2,
    accent: "from-gold to-deep-orange",
    items: [
      { text: "Belajar konsep baru", correctPosition: 0 },
      { text: "Latihan soal / praktik", correctPosition: 1 },
      { text: "Review kesalahan", correctPosition: 2 },
      { text: "Mengajarkan ulang", correctPosition: 3 },
    ],
  },
];

/* ============================================================ */
/*  Timing                                                       */
/* ============================================================ */

const INTRO_DURATION = 2800;
const RESULT_DURATION = 1800;
const FLIP_MS = 500;

/* Auto-play timing (ms). The bot "thinks" then picks an answer. */
const AUTO_PLAY_DELAY_MIN = 1400;
const AUTO_PLAY_DELAY_MAX = 2600;
const AUTO_STEP_DELAY_MIN = 500;
const AUTO_STEP_DELAY_MAX = 1100;
/* Occasionally the bot picks a wrong answer to feel human. */
const AUTO_WRONG_CHANCE = 0.18;

/* ============================================================ */
/*  Main component                                               */
/* ============================================================ */

export function FlipCardQuiz({ autoPlay = true }: { autoPlay?: boolean }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "playing" | "result">("intro");
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const game = GAMES[index];

  const timersRef = useRef<number[]>([]);
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const goNext = useCallback(() => {
    setLastResult(null);
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % GAMES.length);
      setPhase("intro");
    }, 200);
    timersRef.current.push(id);
  }, []);

  // Intro auto-advance to playing
  useEffect(() => {
    clearTimers();
    if (phase === "intro") {
      const id = window.setTimeout(() => setPhase("playing"), INTRO_DURATION);
      timersRef.current.push(id);
    } else if (phase === "result") {
      const id = window.setTimeout(() => {
        goNext();
      }, RESULT_DURATION);
      timersRef.current.push(id);
    }
    return () => clearTimers();
  }, [phase, clearTimers, goNext]);

  const handleResult = useCallback(
    (correct: boolean) => {
      if (phase !== "playing") return;
      setLastResult(correct ? "correct" : "wrong");
      setScore((s) => s + (correct ? 1 : 0));
      setStreak((s) => (correct ? s + 1 : 0));
      setPhase("result");
    },
    [phase],
  );

  return (
    <div className="flex w-full flex-col items-center">
      {/* ===== Header: score + streak ===== */}
      <div className="mb-4 flex w-full items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold shadow-soft">
          <Trophy className="h-4 w-4 text-gold" />
          <span className="text-foreground">{score}</span>
          <span className="text-muted">skor</span>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {GAMES.map((g, i) => (
            <span
              key={g.id}
              className={
                "block h-2 rounded-full transition-all duration-300 " +
                (i === index
                  ? "w-6 bg-gradient-to-r from-primary to-gold"
                  : i < index
                    ? "w-2 bg-primary/40"
                    : "w-2 bg-border")
              }
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold shadow-soft">
          <Flame className="h-4 w-4 text-primary" fill="currentColor" />
          <span className="text-foreground">{streak}</span>
        </div>
      </div>

      {/* ===== Game card ===== */}
      <div
        className="relative h-[30rem] w-full max-w-lg"
        style={{ perspective: "1800px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={game.id + phase}
            initial={{ opacity: 0, scale: 0.94, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.96, rotateY: 15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            {phase === "intro" && <GameIntro game={game} />}
            {phase === "playing" && (
              <GamePlay
                game={game}
                onResult={handleResult}
                autoPlay={autoPlay}
              />
            )}
            {phase === "result" && (
              <GameResult game={game} result={lastResult} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Auto-play helpers                                            */
/* ============================================================ */

function randInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min));
}

/** Returns true most of the time so the bot looks competent. */
function autoDecideCorrect() {
  return Math.random() > AUTO_WRONG_CHANCE;
}

/* ============================================================ */
/*  Game intro                                                    */
/* ============================================================ */

function GameIntro({ game }: { game: Game }) {
  const Icon = game.icon;
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center shadow-card">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className={
          "flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br text-white shadow-glow " +
          game.accent
        }
      >
        <Icon className="h-10 w-10" />
      </motion.div>

      <span className="mt-6 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-primary">
        Game {GAMES.indexOf(game) + 1} / {GAMES.length}
      </span>

      <h3 className="mt-4 font-display text-2xl font-extrabold">
        {game.title}
      </h3>
      <p className="mt-2 max-w-xs text-sm font-semibold leading-relaxed text-muted">
        {game.instruction}
      </p>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-6 flex items-center gap-2 text-xs font-bold text-primary"
      >
        <Clock className="h-4 w-4" />
        Bersiap...
      </motion.div>
    </div>
  );
}

/* ============================================================ */
/*  Game play — dispatch to correct game type                    */
/* ============================================================ */

function GamePlay({
  game,
  onResult,
  autoPlay,
}: {
  game: Game;
  onResult: (correct: boolean) => void;
  autoPlay: boolean;
}) {
  switch (game.type) {
    case "swipe":
      return <SwipePlay game={game} onResult={onResult} autoPlay={autoPlay} />;
    case "tap":
      return <TapPlay game={game} onResult={onResult} autoPlay={autoPlay} />;
    case "match":
      return <MatchPlay game={game} onResult={onResult} autoPlay={autoPlay} />;
    case "flip":
      return <FlipPlay game={game} onResult={onResult} autoPlay={autoPlay} />;
    case "sort":
      return <SortPlay game={game} onResult={onResult} autoPlay={autoPlay} />;
  }
}

/* ============================================================ */
/*  Game 1: SWIPE — drag left (false) / right (true)             */
/* ============================================================ */

function SwipePlay({
  game,
  onResult,
  autoPlay,
}: {
  game: SwipeGame;
  onResult: (correct: boolean) => void;
  autoPlay: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -80, 0, 80, 200], [0.5, 1, 1, 1, 0.5]);
  const leftHint = useTransform(x, [-100, 0], [1, 0]);
  const rightHint = useTransform(x, [0, 100], [0, 1]);
  const [dragging, setDragging] = useState(false);
  const answeredRef = useRef(false);

  const commit = useCallback(
    (direction: "left" | "right") => {
      if (answeredRef.current) return;
      answeredRef.current = true;
      const willBeCorrect =
        direction === "right" ? game.isTrue === true : game.isTrue === false;
      onResult(willBeCorrect);
    },
    [game.isTrue, onResult],
  );

  // Auto-play: animate the card to the chosen side.
  const autoTargetRef = useRef<number | null>(null);
  useEffect(() => {
    if (!autoPlay) return;
    answeredRef.current = false;
    const correct = autoDecideCorrect();
    const direction: "left" | "right" = correct
      ? game.isTrue
        ? "right"
        : "left"
      : game.isTrue
        ? "left"
        : "right";

    const delay = randInt(AUTO_PLAY_DELAY_MIN, AUTO_PLAY_DELAY_MAX);
    const id = window.setTimeout(() => {
      const target = direction === "right" ? 220 : -220;
      autoTargetRef.current = target;
      x.set(target);
      window.setTimeout(() => commit(direction), 480);
    }, delay);
    return () => window.clearTimeout(id);
  }, [autoPlay, game.isTrue, x, commit]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (autoPlay) return;
    setDragging(false);
    const threshold = 80;
    if (info.offset.x > threshold) {
      commit("right");
    } else if (info.offset.x < -threshold) {
      commit("left");
    }
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-primary/30 bg-card p-8 shadow-glow">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary">
          <Hand className="h-4 w-4" /> Swipe
        </span>
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="flex items-center gap-1 text-error">
            <X className="h-4 w-4" /> Salah
          </span>
          <span className="flex items-center gap-1 text-success">
            Benar <Check className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Swipe area */}
      <div className="relative flex flex-1 items-center justify-center">
        {/* Left/right hint backgrounds */}
        <motion.div
          aria-hidden
          style={{ opacity: leftHint }}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 rounded-2xl bg-error/10 p-4"
        >
          <X className="h-8 w-8 text-error" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ opacity: rightHint }}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl bg-success/10 p-4"
        >
          <Check className="h-8 w-8 text-success" />
        </motion.div>

        <motion.div
          drag={autoPlay ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          style={{ x, rotate, opacity }}
          onDragStart={() => !autoPlay && setDragging(true)}
          onDragEnd={handleDragEnd}
          transition={autoPlay ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] } : undefined}
          className={
            "relative z-10 w-full " +
            (autoPlay
              ? "pointer-events-none"
              : "cursor-grab touch-none active:cursor-grabbing")
          }
        >
          <div className="rounded-2xl border-2 border-border bg-gradient-to-br from-primary/5 to-gold/5 p-6 shadow-card">
            <p className="text-center font-display text-lg font-extrabold leading-snug">
              {game.statement}
            </p>
          </div>
          <p className="mt-3 text-center text-xs font-bold text-muted">
            {autoPlay
              ? "Demo otomatis..."
              : dragging
                ? "Lepaskan untuk jawab!"
                : "Geser kartu →"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Game 2: TAP — tap correct answer quickly                    */
/* ============================================================ */

function TapPlay({
  game,
  onResult,
  autoPlay,
}: {
  game: TapGame;
  onResult: (correct: boolean) => void;
  autoPlay: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(8);
  const answeredRef = useRef(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!answeredRef.current) {
        answeredRef.current = true;
        onResult(false);
      }
      return;
    }
    const id = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => window.clearTimeout(id);
  }, [timeLeft, onResult]);

  // Auto-play: pick an option after a short "thinking" delay.
  useEffect(() => {
    if (!autoPlay) return;
    answeredRef.current = false;
    const correct = autoDecideCorrect();
    const correctIdx = game.options.findIndex((o) => o.correct);
    const wrongIdxs = game.options
      .map((o, i) => (o.correct ? -1 : i))
      .filter((i) => i >= 0);
    const pickIdx = correct
      ? correctIdx
      : wrongIdxs[randInt(0, wrongIdxs.length)];

    const delay = randInt(AUTO_PLAY_DELAY_MIN, AUTO_PLAY_DELAY_MAX);
    const id = window.setTimeout(() => {
      if (answeredRef.current) return;
      setSelected(pickIdx);
      window.setTimeout(() => {
        if (answeredRef.current) return;
        answeredRef.current = true;
        onResult(game.options[pickIdx].correct);
      }, 450);
    }, delay);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, game]);

  const handleTap = (i: number) => {
    if (autoPlay || answeredRef.current) return;
    answeredRef.current = true;
    setSelected(i);
    setTimeout(() => onResult(game.options[i].correct), 400);
  };

  const pct = (timeLeft / 8) * 100;

  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-primary/30 bg-card p-8 shadow-glow">
      {/* Timer bar */}
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-1.5 text-primary">
            <Clock className="h-4 w-4" /> Waktu
          </span>
          <span className={timeLeft <= 3 ? "text-error" : "text-muted"}>
            {timeLeft}s
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <MousePointerClick className="h-5 w-5 text-primary" />
        <span className="text-xs font-extrabold uppercase tracking-wide text-primary">
          Tap Cepat
        </span>
      </div>

      <h3 className="font-display text-lg font-extrabold leading-snug">
        {game.prompt}
      </h3>

      <div className="mt-auto space-y-3 pt-4">
        {game.options.map((opt, i) => {
          const isSelected = selected === i;
          const showResult = selected !== null;
          return (
            <motion.button
              key={i}
              type="button"
              disabled={autoPlay || showResult}
              onClick={() => handleTap(i)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={!autoPlay && !showResult ? { scale: 1.02 } : undefined}
              whileTap={!autoPlay && !showResult ? { scale: 0.97 } : undefined}
              className={
                "flex w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-base font-bold transition-all " +
                (showResult && opt.correct
                  ? "border-success bg-success/10 text-success"
                  : showResult && isSelected && !opt.correct
                    ? "border-error bg-error/10 text-error"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5")
              }
            >
              <span
                className={
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold " +
                  (showResult && opt.correct
                    ? "bg-success text-white"
                    : showResult && isSelected && !opt.correct
                      ? "bg-error text-white"
                      : "bg-primary/10 text-primary")
                }
              >
                {showResult && opt.correct ? (
                  <Check className="h-5 w-5" />
                ) : showResult && isSelected && !opt.correct ? (
                  <X className="h-5 w-5" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="flex-1">{opt.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Game 3: MATCH — tap left then right to match pairs           */
/* ============================================================ */

function MatchPlay({
  game,
  onResult,
  autoPlay,
}: {
  game: MatchGame;
  onResult: (correct: boolean) => void;
  autoPlay: boolean;
}) {
  const [leftSel, setLeftSel] = useState<string | null>(null);
  const [rightSel, setRightSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const answeredRef = useRef(false);

  // Shuffle right column
  const rightItems = useMemo(() => {
    const arr = [...game.pairs];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [game]);

  const finishMatch = useCallback(
    (success: boolean) => {
      if (answeredRef.current) return;
      answeredRef.current = true;
      window.setTimeout(() => onResult(success), 450);
    },
    [onResult],
  );

  const checkMatch = useCallback(
    (lId: string, rId: string) => {
      setAttempts((a) => a + 1);
      if (lId === rId) {
        setMatched((prev) => {
          const next = new Set(prev);
          next.add(lId);
          if (next.size === game.pairs.length) {
            finishMatch(true);
          }
          return next;
        });
        setLeftSel(null);
        setRightSel(null);
      } else {
        setWrongPair(`${lId}-${rId}`);
        window.setTimeout(() => {
          setWrongPair(null);
          setLeftSel(null);
          setRightSel(null);
        }, 600);
      }
    },
    [game.pairs.length, finishMatch],
  );

  const handleLeft = (id: string) => {
    if (autoPlay || matched.has(id) || answeredRef.current) return;
    setLeftSel(id);
    if (rightSel) checkMatch(id, rightSel);
  };

  const handleRight = (id: string) => {
    if (autoPlay || matched.has(id) || answeredRef.current) return;
    setRightSel(id);
    if (leftSel) checkMatch(leftSel, id);
  };

  // Auto-play: pair items one by one with a small delay.
  useEffect(() => {
    if (!autoPlay) return;
    answeredRef.current = false;

    let cancelled = false;
    const timers: number[] = [];

    // Reset state first (deferred to avoid synchronous setState in effect body).
    timers.push(
      window.setTimeout(() => {
        if (cancelled) return;
        setMatched(new Set());
        setLeftSel(null);
        setRightSel(null);
      }, 0),
    );

    // Pair items in order; occasionally make a wrong attempt for realism.
    game.pairs.forEach((pair, i) => {
      const baseDelay = AUTO_PLAY_DELAY_MIN + i * (AUTO_STEP_DELAY_MAX + 400);

      // Highlight left
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setLeftSel(pair.id);
        }, baseDelay),
      );

      // Highlight right
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setRightSel(pair.id);
        }, baseDelay + 350),
      );

      // Commit match
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          checkMatch(pair.id, pair.id);
        }, baseDelay + 700),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, game]);

  // Too many attempts = fail (manual mode safety)
  useEffect(() => {
    if (attempts >= 6 && !answeredRef.current) {
      finishMatch(false);
    }
  }, [attempts, finishMatch]);

  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-glow">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary">
          <Target className="h-4 w-4" /> Cocokkan
        </span>
        <span className="text-xs font-bold text-muted">
          {matched.size}/{game.pairs.length} cocok
        </span>
      </div>

      <p className="mb-3 text-sm font-semibold text-muted">
        {autoPlay ? "Demo otomatis..." : "Kiri: istilah → Kanan: arti"}
      </p>

      <div className="grid flex-1 grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-2.5">
          {game.pairs.map((p) => {
            const isMatched = matched.has(p.id);
            const isSelected = leftSel === p.id;
            const isWrong = wrongPair?.startsWith(p.id);
            return (
              <motion.button
                key={p.id}
                type="button"
                disabled={autoPlay || isMatched}
                onClick={() => handleLeft(p.id)}
                whileTap={!autoPlay && !isMatched ? { scale: 0.95 } : undefined}
                className={
                  "w-full rounded-xl border-2 px-3 py-3 text-left text-xs font-bold transition-all " +
                  (isMatched
                    ? "border-success bg-success/10 text-success opacity-60"
                    : isWrong
                      ? "border-error bg-error/10 text-error"
                      : isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/40")
                }
              >
                {isMatched && <Check className="mb-1 h-3.5 w-3.5" />}
                {p.left}
              </motion.button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2.5">
          {rightItems.map((p) => {
            const isMatched = matched.has(p.id);
            const isSelected = rightSel === p.id;
            const isWrong = wrongPair?.endsWith(`-${p.id}`);
            return (
              <motion.button
                key={p.id}
                type="button"
                disabled={autoPlay || isMatched}
                onClick={() => handleRight(p.id)}
                whileTap={!autoPlay && !isMatched ? { scale: 0.95 } : undefined}
                className={
                  "w-full rounded-xl border-2 px-3 py-3 text-left text-xs font-bold transition-all " +
                  (isMatched
                    ? "border-success bg-success/10 text-success opacity-60"
                    : isWrong
                      ? "border-error bg-error/10 text-error"
                      : isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/40")
                }
              >
                {isMatched && <Check className="mb-1 h-3.5 w-3.5" />}
                {p.right}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Game 4: FLIP — flip card to reveal, then true/false          */
/* ============================================================ */

function FlipPlay({
  game,
  onResult,
  autoPlay,
}: {
  game: FlipGame;
  onResult: (correct: boolean) => void;
  autoPlay: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState<"true" | "false" | null>(null);
  const answeredRef = useRef(false);

  // Auto-play: flip, then pick an answer.
  useEffect(() => {
    if (!autoPlay) return;
    answeredRef.current = false;

    const flipDelay = randInt(700, 1300);
    const answerDelay = flipDelay + FLIP_MS + randInt(AUTO_PLAY_DELAY_MIN, AUTO_PLAY_DELAY_MAX);

    // Reset state first (deferred to avoid synchronous setState in effect body).
    const resetId = window.setTimeout(() => {
      setFlipped(false);
      setAnswered(null);
    }, 0);

    const flipId = window.setTimeout(() => setFlipped(true), flipDelay);
    const answerId = window.setTimeout(() => {
      if (answeredRef.current) return;
      const correct = autoDecideCorrect();
      const choice: "true" | "false" = correct
        ? game.isTrue
          ? "true"
          : "false"
        : game.isTrue
          ? "false"
          : "true";
      answeredRef.current = true;
      setAnswered(choice);
      const isCorrect =
        (choice === "true" && game.isTrue) ||
        (choice === "false" && !game.isTrue);
      window.setTimeout(() => onResult(isCorrect), 600);
    }, answerDelay);

    return () => {
      window.clearTimeout(resetId);
      window.clearTimeout(flipId);
      window.clearTimeout(answerId);
    };
  }, [autoPlay, game, onResult]);

  const handleAnswer = (choice: "true" | "false") => {
    if (autoPlay || answeredRef.current || !flipped) return;
    answeredRef.current = true;
    setAnswered(choice);
    const correct =
      (choice === "true" && game.isTrue) ||
      (choice === "false" && !game.isTrue);
    setTimeout(() => onResult(correct), 600);
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-primary/30 bg-card p-8 shadow-glow">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="text-xs font-extrabold uppercase tracking-wide text-primary">
          Flip Kartu
        </span>
      </div>

      <p className="mb-4 text-sm font-semibold text-muted">
        {game.instruction}
      </p>

      {/* Flip card */}
      <div className="flex flex-1 items-center justify-center" style={{ perspective: "1200px" }}>
        <motion.div
          className={
            "relative h-44 w-full " +
            (autoPlay ? "pointer-events-none" : "cursor-pointer")
          }
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => !autoPlay && !flipped && setFlipped(true)}
        >
          {/* Front: hidden */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/5 to-gold/5"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"
              >
                <Brain className="h-6 w-6 text-primary" />
              </motion.div>
              <p className="text-sm font-bold text-primary">
                {autoPlay ? "Membuka kartu..." : "Klik untuk buka kartu"}
              </p>
            </div>
          </div>

          {/* Back: statement */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 to-gold/10 p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-center font-display text-base font-extrabold leading-snug">
              {game.statement}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Answer buttons */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <motion.button
          type="button"
          disabled={autoPlay || !flipped || answered !== null}
          onClick={() => handleAnswer("true")}
          whileHover={!autoPlay && flipped && !answered ? { scale: 1.03 } : undefined}
          whileTap={!autoPlay && flipped && !answered ? { scale: 0.97 } : undefined}
          className={
            "flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3.5 text-sm font-extrabold transition-all " +
            (answered === "true"
              ? game.isTrue
                ? "border-success bg-success/10 text-success"
                : "border-error bg-error/10 text-error"
              : "border-border bg-card text-foreground hover:border-success/50 hover:bg-success/5 disabled:opacity-40")
          }
        >
          <Check className="h-5 w-5" /> Benar
        </motion.button>
        <motion.button
          type="button"
          disabled={autoPlay || !flipped || answered !== null}
          onClick={() => handleAnswer("false")}
          whileHover={!autoPlay && flipped && !answered ? { scale: 1.03 } : undefined}
          whileTap={!autoPlay && flipped && !answered ? { scale: 0.97 } : undefined}
          className={
            "flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3.5 text-sm font-extrabold transition-all " +
            (answered === "false"
              ? !game.isTrue
                ? "border-success bg-success/10 text-success"
                : "border-error bg-error/10 text-error"
              : "border-border bg-card text-foreground hover:border-error/50 hover:bg-error/5 disabled:opacity-40")
          }
        >
          <X className="h-5 w-5" /> Salah
        </motion.button>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Game 5: SORT — tap items in correct order                    */
/* ============================================================ */

function SortPlay({
  game,
  onResult,
  autoPlay,
}: {
  game: SortGame;
  onResult: (correct: boolean) => void;
  autoPlay: boolean;
}) {
  // Shuffle display order
  const [items] = useState(() => {
    const arr = [...game.items];
    // Simple shuffle (avoid same as correct order)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Ensure not already sorted
    if (arr.every((it, i) => it.correctPosition === i)) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    return arr;
  });

  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const answeredRef = useRef(false);
  const [attempts, setAttempts] = useState(0);

  const handleTap = (displayIdx: number) => {
    if (autoPlay || locked || answeredRef.current) return;
    if (selected === null) {
      setSelected(displayIdx);
    } else if (selected === displayIdx) {
      setSelected(null);
    } else {
      // Swap
      const next = [...order];
      [next[selected], next[displayIdx]] = [next[displayIdx], next[selected]];
      setOrder(next);
      setSelected(null);
      setAttempts((a) => a + 1);
    }
  };

  const checkOrder = () => {
    if (autoPlay || locked) return;
    setLocked(true);
    const isCorrect = order.every((itemIdx, pos) => {
      return items[itemIdx].correctPosition === pos;
    });
    answeredRef.current = true;
    setTimeout(() => onResult(isCorrect), 800);
  };

  // Auto-play: sort items step by step into the correct order.
  useEffect(() => {
    if (!autoPlay) return;
    answeredRef.current = false;

    // Reset state first (deferred to avoid synchronous setState in effect body).
    const resetId = window.setTimeout(() => {
      setLocked(false);
      setSelected(null);
    }, 0);

    // Build the target order: positions sorted by correctPosition.
    // `items` indices sorted so that items[idx].correctPosition is ascending.
    const targetOrder = items
      .map((_, i) => i)
      .sort((a, b) => items[a].correctPosition - items[b].correctPosition);

    let currentOrder = [...order];
    const timers: number[] = [resetId];
    let elapsed = AUTO_PLAY_DELAY_MIN;

    targetOrder.forEach((targetItemIdx, targetPos) => {
      const currentPos = currentOrder.indexOf(targetItemIdx);
      if (currentPos === targetPos) return; // already in place

      // Select current position, then swap with target position.
      timers.push(
        window.setTimeout(() => {
          setSelected(currentPos);
        }, elapsed),
      );
      elapsed += randInt(AUTO_STEP_DELAY_MIN, AUTO_STEP_DELAY_MAX);

      timers.push(
        window.setTimeout(() => {
          setSelected(targetPos);
          // perform swap
          currentOrder = [...currentOrder];
          [currentOrder[currentPos], currentOrder[targetPos]] = [
            currentOrder[targetPos],
            currentOrder[currentPos],
          ];
          setOrder(currentOrder);
          setSelected(null);
        }, elapsed),
      );
      elapsed += randInt(AUTO_STEP_DELAY_MIN, AUTO_STEP_DELAY_MAX);
    });

    // Finally, lock & evaluate.
    timers.push(
      window.setTimeout(() => {
        if (answeredRef.current) return;
        answeredRef.current = true;
        setLocked(true);
        const isCorrect = currentOrder.every((itemIdx, pos) => {
          return items[itemIdx].correctPosition === pos;
        });
        // Auto-play always sorts correctly (for a clean demo).
        window.setTimeout(() => onResult(isCorrect), 700);
      }, elapsed + 300),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, game]);

  const isSorted = order.every(
    (itemIdx, pos) => items[itemIdx].correctPosition === pos,
  );

  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-primary/30 bg-card p-8 shadow-glow">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary">
          <Gamepad2 className="h-4 w-4" /> Urutkan
        </span>
        <span className="text-xs font-bold text-muted">
          {autoPlay ? "Demo otomatis..." : "Tap 2 item untuk tukar posisi"}
        </span>
      </div>

      <p className="mb-3 text-sm font-semibold text-muted">
        Urutkan langkah belajar dari awal sampai akhir:
      </p>

      <div className="flex-1 space-y-2.5">
        {order.map((itemIdx, pos) => {
          const item = items[itemIdx];
          const isSelected = selected === pos;
          const showCorrect = locked && item.correctPosition === pos;
          const showWrong = locked && item.correctPosition !== pos;
          return (
            <motion.button
              key={itemIdx}
              type="button"
              disabled={autoPlay || locked}
              onClick={() => handleTap(pos)}
              layout
              whileHover={!autoPlay && !locked ? { scale: 1.01 } : undefined}
              whileTap={!autoPlay && !locked ? { scale: 0.98 } : undefined}
              className={
                "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition-all " +
                (showCorrect
                  ? "border-success bg-success/10 text-success"
                  : showWrong
                    ? "border-error bg-error/10 text-error"
                    : isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/40")
              }
            >
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold " +
                  (showCorrect
                    ? "bg-success text-white"
                    : showWrong
                      ? "bg-error text-white"
                      : "bg-primary/10 text-primary")
                }
              >
                {pos + 1}
              </span>
              <span className="flex-1">{item.text}</span>
              {isSelected && <Zap className="h-4 w-4 text-primary" />}
            </motion.button>
          );
        })}
      </div>

      <motion.button
        type="button"
        disabled={autoPlay || locked}
        onClick={checkOrder}
        whileHover={!autoPlay && !locked ? { scale: 1.02 } : undefined}
        whileTap={!autoPlay && !locked ? { scale: 0.98 } : undefined}
        className={
          "mt-4 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-all " +
          (isSorted
            ? "bg-gradient-to-r from-success to-primary text-white shadow-glow"
            : "bg-gradient-to-r from-primary to-deep-orange text-white shadow-glow")
        }
      >
        <Check className="h-5 w-5" />
        Cek Jawaban
      </motion.button>
    </div>
  );
}

/* ============================================================ */
/*  Game result                                                   */
/* ============================================================ */

function GameResult({
  game,
  result,
}: {
  game: Game;
  result: "correct" | "wrong" | null;
}) {
  const isCorrect = result === "correct";
  const Icon = game.icon;

  return (
    <div
      className={
        "flex h-full flex-col items-center justify-center rounded-3xl border-2 p-8 text-center " +
        (isCorrect
          ? "border-success bg-success/5"
          : "border-error bg-error/5")
      }
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className={
          "flex h-20 w-20 items-center justify-center rounded-full text-white shadow-glow " +
          (isCorrect ? "bg-success" : "bg-error")
        }
      >
        {isCorrect ? (
          <Check className="h-10 w-10" strokeWidth={3} />
        ) : (
          <X className="h-10 w-10" strokeWidth={3} />
        )}
      </motion.div>

      <h3 className="mt-6 font-display text-2xl font-extrabold">
        {isCorrect ? "Mantap! Benar!" : "Belum tepat!"}
      </h3>
      <p className="mt-2 text-sm font-semibold text-muted">
        {isCorrect
          ? "+1 poin — kamu pintar!"
          : "Tetap semangat, coba game berikutnya!"}
      </p>

      <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold">
        <Icon className="h-4 w-4 text-primary" />
        {game.title}
      </div>
    </div>
  );
}
