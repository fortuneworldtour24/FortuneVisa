import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { siteConfig, whatsappHref } from '@/config/siteConfig';
import { LEGAL_LINKS, NAV_LINKS } from '@/config/navigation';
import { Logo } from '@/components/Logo';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">{t('footer.description')}</p>
            <p className="text-sm font-semibold text-accent-500">{siteConfig.tagline}</p>
          </div>

          <nav aria-label={t('footer.quickLinks')}>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              {t('footer.quickLinks')}
            </h2>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map(({ to, labelKey }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-accent-500">
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              {t('footer.contactDetails')}
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                <a href={siteConfig.phoneHref} className="transition-colors hover:text-accent-500">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="break-all transition-colors hover:text-accent-500">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent-500"
                >
                  {t('footer.whatsapp')}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">{t('footer.legal')}</h2>
              <ul className="space-y-3 text-sm">
                {LEGAL_LINKS.map(({ to, labelKey }) => (
                  <li key={to}>
                    <Link to={to} className="transition-colors hover:text-accent-500">
                      {t(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-500">
                {t('footer.disclaimerTitle')}
              </h3>
              <p className="text-xs leading-relaxed text-slate-400">{t('footer.disclaimer')}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
          {t('footer.copyright', { year, name: siteConfig.name })}
        </div>
      </div>
    </footer>
  );
}
