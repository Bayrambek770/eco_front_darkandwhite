import { useTranslation } from 'react-i18next';

const langs = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'uz', label: 'UZ' },
] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language || 'ru';

  return (
    <div className="flex gap-1">
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => i18n.changeLanguage(l.code)}
          className={`px-2 py-1 text-xs rounded border ${current.startsWith(l.code) ? 'bg-primary text-primary-foreground' : ''}`}
          aria-pressed={current.startsWith(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
