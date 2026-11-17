import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import type { Destination } from '@/lib/visaData';
import { formatMoney } from '@/lib/money';

export function DestinationCard({ destination }: { destination: Destination }) {
  const { t } = useTranslation();
  const [broken, setBroken] = useState(false);
  const d = destination as Destination & { iso_code?: string };
  const v = d.visaTypes?.[0] as (Destination['visaTypes'][number] & { validityShort?: string }) | undefined;
  const code = (d.iso_code || '').toLowerCase();
  const fee = v && v.indicativeFee > 0 ? formatMoney(v.indicativeFee) : t('destinations.onRequest', 'On request');
  const rows: [string, string][] = [
    [t('destinations.type', 'Type'), v?.type ?? '—'],
    [t('destinations.valid', 'Valid'), v?.validityShort ?? v?.validity ?? '—'],
    [t('destinations.fees', 'Fees (INR)'), fee],
  ];

  return (
    <Link
      to={`/destinations/${d.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-900 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {d.imageUrl && !broken && (
        <img
          src={d.imageUrl}
          alt={d.country}
          loading="lazy"
          onError={() => setBroken(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="flex items-center gap-3">
          {code ? (
            <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/70">
              <span className={`fi fis fi-${code}`} style={{ fontSize: 36, lineHeight: 1 }} />
            </span>
          ) : null}
          <h3 className="min-w-0 text-lg font-bold uppercase leading-tight tracking-wide">{d.country}</h3>
        </div>
        <dl className="mt-3 space-y-1.5 rounded-2xl bg-black/40 p-3 text-xs backdrop-blur-sm">
          {rows.map(([k, val]) => (
            <div key={k} className="flex items-baseline justify-between gap-3">
              <dt className="shrink-0 uppercase tracking-wide text-white/60">{k}</dt>
              <dd className="min-w-0 text-right font-semibold capitalize line-clamp-2">{val}</dd>
            </div>
          ))}
        </dl>
        {v?.processingTime ? (
          <p className="mt-2 flex items-start gap-1.5 text-xs text-white/80">
            <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-2">
              {t('destinations.typicalProcessing', 'Typical processing')}: {v.processingTime}
            </span>
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export default DestinationCard;