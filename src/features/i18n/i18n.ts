import {
  translations,
  type TranslationKey,
} from "@/features/i18n/translations";

export type Locale = keyof typeof translations;
export type TranslationParams = Record<string, string | number>;

export const LOCALE_STORAGE_KEY = "pixel-office-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "th";
}

export function resolveInitialLocale(
  storedLocale: string | null,
  browserLanguage: string | undefined,
): Locale {
  if (isLocale(storedLocale)) {
    return storedLocale;
  }

  return browserLanguage?.toLowerCase().startsWith("th") ? "th" : "en";
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  params: TranslationParams = {},
): string {
  let message: string = translations[locale][key];

  for (const [name, value] of Object.entries(params)) {
    message = message.replaceAll(`{${name}}`, String(value));
  }

  return message;
}

export type { TranslationKey };
