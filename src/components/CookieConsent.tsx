import { useEffect, useState } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'fortune-cookie-consent';

export function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setVisible(true);
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'essential') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // storage unavailable
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label={t('cookie.title')}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-5 shadow-lift transition-all animate-in fade-in slide-in-from-bottom-5 sm:bottom-6 sm:right-6 sm:left-auto print:hidden"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
          <Cookie className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-bold text-ink">{t('cookie.title')}</h2>
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              aria-label="Close"
              className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
            {t('cookie.description')}{' '}
            <Link to="/privacy" className="font-semibold text-primary-700 underline hover:text-primary-800">
              {t('cookie.privacyLink')}
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => handleChoice('accepted')}
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary-700 px-5 text-xs font-semibold text-white shadow-card transition-all hover:bg-primary-800 sm:text-sm"
            >
              <ShieldCheck className="mr-1.5 h-4 w-4" aria-hidden="true" />
              {t('cookie.acceptAll')}
            </button>
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-ink transition-colors hover:bg-slate-50 sm:text-sm"
            >
              {t('cookie.essentialOnly')}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

