import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/contactInfo';

type Props = {
  open: boolean;
  onClose: () => void;
};

const LINKS = [
  { to: '/destinations', key: 'nav.destinations', label: 'Destinations' },
  { to: '/checker', key: 'nav.checker', label: 'Visa Checker' },
  { to: '/services', key: 'nav.services', label: 'Services' },
  { to: '/checklist', key: 'nav.checklist', label: 'Checklist' },
  { to: '/about', key: 'nav.about', label: 'About' },
  { to: '/blog', key: 'nav.blog', label: 'Blog' },
  { to: '/contact', key: 'nav.contact', label: 'Contact' },
];

export function MobileDrawer({ open, onClose }: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-white lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex min-h-[48px] items-center rounded-xl px-4 text-base font-semibold transition ${isActive ? 'bg-indigo-50 text-primary-700' : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                {t(l.key, l.label)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
          <span className="text-sm font-semibold text-slate-600">{t('nav.language', 'Language')}</span>
          <LanguageSwitcher />
        </div>

        <NavLink
          to="/contact"
          onClick={onClose}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white shadow-card transition hover:bg-primary-800"
        >
          {t('nav.freeEnquiry', 'Free Enquiry')}
        </NavLink>
      </nav>

      <div className="space-y-3 border-t border-slate-200 px-4 py-5 text-sm text-slate-600">
        <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3">
          <Phone className="h-4 w-4" aria-hidden="true" />
          {PHONE_DISPLAY}
        </a>
        <a href="mailto:contact@fortunevisaservices.in" className="flex items-center gap-3">
          <Mail className="h-4 w-4" aria-hidden="true" />
          contact@fortunevisaservices.in
        </a>
      </div>
    </div>,
    document.body
  );
}

export default MobileDrawer;