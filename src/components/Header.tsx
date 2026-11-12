import { useCallback, useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '@/config/navigation';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { MobileDrawer } from '@/components/MobileDrawer';

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-background/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label={t('nav.mainNavigation')} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, labelKey }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-primary-700' : 'text-muted hover:text-ink'
                    }`
                  }
                >
                  {t(labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <NavLink
            to="/contact"
            className="inline-flex items-center rounded-full bg-primary-700 px-4 py-2.5 text-xs font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lift sm:px-5 sm:text-sm"
          >
            {t('nav.freeEnquiry')}
          </NavLink>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-ink transition-colors hover:bg-slate-50 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileDrawer open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
