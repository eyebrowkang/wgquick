import { useCallback, useEffect, useMemo, useState } from 'react';
import { LocaleContext } from './context';
import { LOCALE_STORAGE_KEY, messages } from './messages';
import type { Locale } from './messages';

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'en' || stored === 'zh') {
    return stored;
  }

  const browser = window.navigator.language || window.navigator.languages?.[0] || 'en';
  return browser.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((value: Locale) => {
    setLocaleState(value);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      bundle: messages[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
