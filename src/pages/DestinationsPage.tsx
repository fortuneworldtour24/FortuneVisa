import { useMemo, useState } from 'react';
import { Globe2, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHero } from '@/components/PageHero';
import { EmptyState } from '@/components/EmptyState';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { VisaTypeFilter } from '@/components/destinations/VisaTypeFilter';
import { ConsultationCta } from '@/components/ConsultationCta';
import { useSeo } from '@/hooks/useSeo';
import { DESTINATIONS } from '@/lib/visaData';
import type { VisaType } from '@/lib/visaData';

export function DestinationsPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Explore Visa Destinations',
    description: 'Browse indicative visa information for popular destinations including Australia, the USA, UK, Canada and more.',
  });
  const [query, setQuery] = useState('');
  const [visaFilter, setVisaFilter] = useState<VisaType | 'all'>('all');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return DESTINATIONS.filter((destination) => {
      const matchesQuery = term === '' || destination.country.toLowerCase().includes(term);
      const matchesVisa =
        visaFilter === 'all' || destination.visaTypes.some((visa) => visa.type === visaFilter);
      return matchesQuery && matchesVisa;
    });
  }, [query, visaFilter]);

  const clearAll = () => {
    setQuery('');
    setVisaFilter('all');
  };

  return (
    <>
      <PageHero
        eyebrow={t('destinations.eyebrow')}
        title={t('destinations.title')}
        description={t('destinations.description')}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <label htmlFor="destination-search" className="sr-only">
              {t('destinations.searchLabel')}
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="destination-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('destinations.searchPlaceholder')}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-background pl-12 pr-4 text-base text-ink placeholder:text-slate-400 transition-colors hover:border-primary-200 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-100"
            />
          </div>
          <VisaTypeFilter value={visaFilter} onChange={setVisaFilter} />
        </div>

        <p className="mt-6 text-sm font-semibold text-muted" aria-live="polite">
          {t('destinations.resultsCount', { count: filtered.length })}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
