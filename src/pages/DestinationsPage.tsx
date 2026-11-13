import { useMemo, useState } from 'react';
import { Globe2, Grid3x3, Map, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHero } from '@/components/PageHero';
import { EmptyState } from '@/components/EmptyState';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { ConsultationCta } from '@/components/ConsultationCta';
import { useSeo } from '@/hooks/useSeo';
import { DESTINATIONS, VISA_TYPES } from '@/lib/visaData';
import type { VisaType } from '@/lib/visaData';

const PROCESSING_OPTIONS = [
  { value: 'all', labelKey: 'destinations.filters.anyProcessing' },
  { value: 'fast', labelKey: 'destinations.filters.under4weeks' },
  { value: 'medium', labelKey: 'destinations.filters.1to3months' },
  { value: 'slow', labelKey: 'destinations.filters.over3months' },
] as const;

type ProcessingSpeed = (typeof PROCESSING_OPTIONS)[number]['value'];
type ViewMode = 'grid' | 'map';

function matchesProcessing(time: string, speed: ProcessingSpeed): boolean {
  if (speed === 'all') return true;
  const lower = time.toLowerCase();
  const hasDays = /\d+\s*(day|working day)/i.test(lower);
  const weekMatch = lower.match(/(\d+)\s*(?:to\s*(\d+)\s*)?week/i);
  const monthMatch = lower.match(/(\d+)\s*(?:to\s*(\d+)\s*)?month/i);
  const maxWeeks = weekMatch ? Number(weekMatch[2] ?? weekMatch[1]) : null;
  const maxMonths = monthMatch ? Number(monthMatch[2] ?? monthMatch[1]) : null;
  if (speed === 'fast') return hasDays || (maxWeeks !== null && maxWeeks <= 4 && !monthMatch);
  if (speed === 'medium') return (maxMonths !== null && maxMonths <= 3) || (maxWeeks !== null && maxWeeks <= 12);
  /* slow */ return (maxMonths !== null && maxMonths > 3) || (maxWeeks !== null && maxWeeks > 12);
}

export function DestinationsPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Explore Visa Destinations',
    description: 'Browse indicative visa information for popular destinations including Australia, the USA, UK, Canada and more.',
  });

  const [query, setQuery] = useState('');
  const [visaFilter, setVisaFilter] = useState<VisaType | 'all'>('all');
  const [processingFilter, setProcessingFilter] = useState<ProcessingSpeed>('all');
  const [view, setView] = useState<ViewMode>('grid');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return DESTINATIONS.filter((d) => {
      if (term && !d.country.toLowerCase().includes(term)) return false;
      if (visaFilter !== 'all' && !d.visaTypes.some((v) => v.type === visaFilter)) return false;
      if (processingFilter !== 'all') {
        const matchesAny = d.visaTypes.some((v) => matchesProcessing(v.processingTime, processingFilter));
        if (!matchesAny) return false;
      }
      return true;
    });
  }, [query, visaFilter, processingFilter]);

  const clearAll = () => {
    setQuery('');
    setVisaFilter('all');
    setProcessingFilter('all');
  };

  return (
    <>
      <PageHero
        eyebrow={t('destinations.eyebrow')}
        title={t('destinations.title')}
        description={t('destinations.description')}
      />

      {/* Sticky filter bar */}
      <div className="sticky top-20 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative w-full sm:w-56">
            <label htmlFor="dest-search" className="sr-only">{t('destinations.searchLabel')}</label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="dest-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('destinations.searchPlaceholder')}
              className="h-11 w-full rounded-xl border border-slate-200 bg-background pl-10 pr-3 text-sm text-ink placeholder:text-slate-400 transition-colors hover:border-primary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
            />
          </div>

          {/* Visa type dropdown */}
          <select
            value={visaFilter}
            onChange={(e) => setVisaFilter(e.target.value as VisaType | 'all')}
            aria-label={t('destinations.filterLabel')}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-ink transition-colors hover:border-primary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
          >
            <option value="all">{t('destinations.filterAll')}</option>
            {VISA_TYPES.map((vt) => (
              <option key={vt} value={vt}>{t(`visaTypes.${vt}`)}</option>
            ))}
          </select>

          {/* Processing time dropdown */}
          <select
            value={processingFilter}
            onChange={(e) => setProcessingFilter(e.target.value as ProcessingSpeed)}
            aria-label={t('destinations.filters.processingLabel')}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-ink transition-colors hover:border-primary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
          >
            {PROCESSING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
            ))}
          </select>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Grid / Map toggle — wraps on narrow screens */}
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-0.5 sm:gap-0" role="group" aria-label={t('destinations.viewToggle')}>
            <button
              type="button"
              onClick={() => setView('grid')}
              aria-pressed={view === 'grid'}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors ${view === 'grid' ? 'bg-primary-700 text-white shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              <Grid3x3 className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{t('destinations.gridView')}</span>
            </button>
            <button
              type="button"
              onClick={() => setView('map')}
              aria-pressed={view === 'map'}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors ${view === 'map' ? 'bg-primary-700 text-white shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              <Map className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{t('destinations.mapView')}</span>
            </button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-sm font-semibold text-muted" aria-live="polite">
          {t('destinations.resultsCount', { count: filtered.length })}
        </p>

        {view === 'map' ? (
          <div className="mt-6 flex h-96 items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 text-center">
            <div>
              <Map className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-muted">{t('destinations.mapPlaceholder')}</p>
            </div>
          </div>
        ) : filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              icon={<Globe2 className="h-7 w-7" aria-hidden="true" />}
              title={t('destinations.empty.title')}
              body={t('destinations.empty.body')}
              action={
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  {t('destinations.empty.clear')}
                </button>
              }
            />
          </div>
        )}
      </section>

      <ConsultationCta />
    </>
  );
}
