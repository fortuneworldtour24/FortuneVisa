import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Destination } from '@/lib/visaData';

type DestinationCardProps = {
  destination: Destination;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  const { t } = useTranslation();
  const { slug, country, flag, imageUrl, visaTypes } = destination;
  const primary = visaTypes[0];

  return (
    <Link
      to={`/destinations/${slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
      style={{ minHeight: '26rem' }}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={t('destinationCard.imageAlt', { country })}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-6">
        {/* Flag + Country name */}
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl backdrop-blur-sm"
            aria-hidden="true"
          >
            {flag}
          </span>
          <h2 className="text-base font-extrabold uppercase tracking-wide text-white sm:text-lg">
            {country}
          </h2>
        </div>

        {/* Stats row */}
        {primary && (
          <div className="mt-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wider text-white/90 sm:text-xs">
            <div className="min-w-0">
              <span className="block text-[10px] text-white/60">{t('destinationCard.type')}</span>
              <span className="truncate">{t(`visaTypes.${primary.type}`)}</span>
            </div>
            <span className="h-6 w-px shrink-0 bg-white/25" aria-hidden="true" />
            <div className="min-w-0">
              <span className="block text-[10px] text-white/60">{t('destinationCard.valid')}</span>
              <span className="truncate">{primary.validity}</span>
            </div>
            <span className="h-6 w-px shrink-0 bg-white/25" aria-hidden="true" />
            <div className="min-w-0">
              <span className="block text-[10px] text-white/60">{t('destinationCard.fees')}</span>
              <span>${primary.indicativeFee.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Processing time */}
        {primary && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-white/70 sm:text-xs">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              {t('destinationCard.processing')}: {primary.processingTime}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
