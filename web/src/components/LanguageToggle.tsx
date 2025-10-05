import { useLocale } from '../i18n/useLocale.ts';
import type { Locale } from '../i18n/messages.ts';

const choices: Array<{ code: Locale; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
];

export function LanguageToggle() {
  const { locale, setLocale, bundle } = useLocale();

  return (
    <div className="language-toggle" aria-label="Language toggle">
      <span>{bundle.localeName}</span>
      <div className="options">
        {choices.map((choice) => {
          const active = locale === choice.code;
          return (
            <button
              key={choice.code}
              type="button"
              onClick={() => setLocale(choice.code)}
              className={active ? 'active' : undefined}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
