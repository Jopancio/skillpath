"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { id as idDict } from "./dictionaries/id";
import { en as enDict } from "./dictionaries/en";

export type Locale = "id" | "en";
export type Dictionary = typeof idDict;

const dictionaries: Record<Locale, Dictionary> = { id: idDict, en: enDict };

const STORAGE_KEY = "skillpath-locale";

interface I18nContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "id";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "id" ? saved : "id";
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: dictionaries[locale], setLocale }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Pick a localized string from a {id, en} object */
export function pick<T extends { id: string; en: string }>(
  locale: Locale,
  obj: T
): string {
  return obj[locale] ?? obj.id;
}
