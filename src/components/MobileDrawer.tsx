import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Mail, Phone, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/config/siteConfig';
import { NAV_LINKS } from '@/config/navigation';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <aside
        id="mobile-navigation"
        aria-label={t('nav.mobileNavigation')}
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-lift transition-[transform,visibility] duration-300 ease-out ${open ? 'visible translate-x-0' : 'invisible translate-x-full'}`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.closeMenu')}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-slate-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ to, labelKey, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors ${
                      isActive ? 'bg-primary-50 text-primary-700' : 'text-ink hover:bg-slate-50'
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary-700" aria-hidden="true" />
                    {t(labelKey)}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 border-t border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted">{t('nav.language')}</span>
            <LanguageSwitcher />
          </div>
          <NavLink
            to="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-full bg-primary-700 px-5 py-3.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
          >
            {t('nav.freeEnquiry')}
          </NavLink>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-primary-700">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-primary-700">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
