import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Destination } from '@/lib/visaData';

type DestinationCardProps = {
  destination: Destination;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  const { t } = useTranslation();
  const { slug, country, flag, visaTypes } = destination;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl" aria-hidden="true">
          {flag}
        </span>
        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
          {t('destinations.visaCount', { count: visaTypes.length })}
        </span>
      </div>

      <h2 className="mt-6 text-xl font-bold leading-snug text-ink">{country}</h2>

      <ul className="mt-4 flex flex-wrap gap-2">
        {visaTypes.map((visa) => (
          <li
            key={visa.type}
            className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-muted"
          >
            {t(`visaTypes.${visa.type}`)}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          to={`/destinations/${slug}`}
          className="inline-flex min-h-12 items-center gap-2 rounded-full text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
        >
          {t('destinations.viewDetails')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
