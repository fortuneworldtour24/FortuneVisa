import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/home/SectionHeading';
import { DESTINATION_COUNTRY_CODE, VISA_TYPE_IDS, countryFlag } from '@/config/visaOptions';

export function PopularDestinations() {
  const { t } = useTranslation();
  const flag = countryFlag(DESTINATION_COUNTRY_CODE);

  return (
    <section className="mx-auto max-w-7xl py-16 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading title={t('home.destinations.title')} subtitle={t('home.destinations.subtitle')} />
        </Reveal>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:px-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-8 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {VISA_TYPE_IDS.map((id, index) => (
          <Reveal key={id} delay={(index % 3) * 80} className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
            <article className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl" aria-hidden="true">
                  {flag}
                </span>
                <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-700">
                  {t(`visas.${id}.subclass`)}
                </span>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {t(`countries.${DESTINATION_COUNTRY_CODE}`)}
              </p>
              <h3 className="mt-1.5 text-xl font-bold leading-snug text-ink">{t(`visas.${id}.name`)}</h3>
              <div className="mt-auto pt-6">
                <Link
                  to={`/checker?destination=${id}`}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full px-1 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
                >
                  {t('home.destinations.viewDetails')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
