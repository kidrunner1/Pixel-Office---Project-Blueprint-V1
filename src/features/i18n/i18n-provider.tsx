"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

import {
  LOCALE_STORAGE_KEY,
  resolveInitialLocale,
  translate,
  type Locale,
  type TranslationKey,
  type TranslationParams,
} from "@/features/i18n/i18n";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

export const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  children: ReactNode;
};

function readStoredLocale(): string | null {
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // The language still changes when storage is unavailable.
  }
}

const localeListeners = new Set<() => void>();

function getClientLocale(): Locale {
  return resolveInitialLocale(readStoredLocale(), window.navigator.language);
}

function getServerLocale(): Locale {
  return "en";
}

function subscribeToLocale(onStoreChange: () => void) {
  localeListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    localeListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function notifyLocaleListeners() {
  localeListeners.forEach((listener) => listener());
}

export function I18nProvider({ children }: I18nProviderProps) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getClientLocale,
    getServerLocale,
  );

  const setLocale = useCallback((nextLocale: Locale) => {
    persistLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    notifyLocaleListeners();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    persistLocale(locale);
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => translate(locale, key, params),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
