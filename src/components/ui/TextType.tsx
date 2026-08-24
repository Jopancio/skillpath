"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
} from "react";
import { gsap } from "gsap";

export interface TextTypeProps {
  /** Text or array of texts to type out (rotates when looping). */
  text: string | string[];
  /** HTML tag to render the component as. */
  as?: ElementType;
  /** Speed of typing in milliseconds. */
  typingSpeed?: number;
  /** Initial delay before typing starts. */
  initialDelay?: number;
  /** Time to wait between typing and deleting. */
  pauseDuration?: number;
  /** Speed of deleting characters. */
  deletingSpeed?: number;
  /** Whether to loop through texts array. */
  loop?: boolean;
  /** Optional class name for styling. */
  className?: string;
  /** Whether to show the cursor. */
  showCursor?: boolean;
  /** Hide cursor while typing. */
  hideCursorWhileTyping?: boolean;
  /** Character or React node to use as cursor. */
  cursorCharacter?: React.ReactNode;
  /** Animation duration for cursor blinking. */
  cursorBlinkDuration?: number;
  /** Optional class name for cursor styling. */
  cursorClassName?: string;
  /** Array of colors for each sentence. */
  textColors?: string[];
  /** Random typing speed within range for human-like feel. */
  variableSpeed?: { min: number; max: number };
  /** Callback fired after each sentence is finished. */
  onSentenceComplete?: (sentence: string, index: number) => void;
  /** Start typing when component is visible in viewport. */
  startOnVisible?: boolean;
  /** Type backwards (right to left). */
  reverseMode?: boolean;
}

/**
 * Typewriter effect that types out, pauses, deletes, and loops through
 * an array of texts (React Bits "TextType", TypeScript adaption).
 */
export default function TextType({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Callback refs (assigned during commit) keep the new react-hooks/refs
  // lint rule happy vs. passing ref objects through createElement props.
  const setCursorRef = useCallback((node: HTMLElement | null) => {
    cursorRef.current = node;
  }, []);
  const setContainerRef = useCallback((node: HTMLElement | null) => {
    containerRef.current = node;
  }, []);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return "inherit";
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout>;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex]
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length >= 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < (textArray[currentTextIndex]?.length ?? 0) ||
      isDeleting);

  return createElement(
    Component,
    { className: `text-type ${className}`.trim(), ...props },
    <span ref={setContainerRef} className="text-type__inner">
      <span
        className="text-type__content"
        style={{ color: getCurrentTextColor() || "inherit" }}
      >
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={setCursorRef}
          className={`text-type__cursor ${cursorClassName} ${
            shouldHideCursor ? "text-type__cursor--hidden" : ""
          }`.trim()}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
