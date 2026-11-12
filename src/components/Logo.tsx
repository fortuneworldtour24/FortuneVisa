import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5 rounded-lg" aria-label={siteConfig.name}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/15 transition-transform duration-300 group-hover:rotate-12">
        <Compass className="h-5 w-5 text-accent-600" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight text-ink">{siteConfig.logoPrimary}</span>
        <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {siteConfig.logoSecondary}
        </span>
      </span>
    </Link>
  );
}
