import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGE_CODES = ['en', 'hi', 'zh', 'pa'] as const;

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLanguage = LANGUAGE_CODES.find((code) => code === i18n.language) ?? 'en';

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-ink transition-colors hover:border-primary-200 hover:bg-primary-50"
      >
        <Globe className="h-4 w-4 text-primary-700" aria-hidden="true" />
        <span className="uppercase">{currentLanguage}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('nav.language')}
          className="absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lift"
        >
          {LANGUAGE_CODES.map((code) => (
            <li key={code} role="option" aria-selected={code === currentLanguage}>
              <button
                type="button"
                onClick={() => {
                  void i18n.changeLanguage(code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-primary-50"
              >
                {t(`languages.${code}`)}
                {code === currentLanguage && <Check className="h-4 w-4 text-primary-700" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
