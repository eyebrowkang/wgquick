import { createContext } from 'react';
import type { Locale, MessageBundle } from './messages';

export interface LocaleContextValue {
  locale: Locale;
  bundle: MessageBundle;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
