import { getRequestConfig } from 'next-intl/server';

// Supported locales
export const locales = ['en', 'fil'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  try {
    return {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default,
    };
  } catch {
    // Fallback to default locale if translation file is missing
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
    };
  }
});
