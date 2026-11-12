import { ArrowLeft, ArrowRight, Globe2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/EmptyState';
import { PageHero } from '@/components/PageHero';
import { RequirementBadge } from '@/components/visa/RequirementBadge';
import { VisaDetails } from '@/components/visa/VisaDetails';
import { useSeo } from '@/hooks/useSeo';
import { buildEnquiryPath, findDestination } from '@/lib/visaData';
import type { Destination, VisaTypeInfo } from '@/lib/visaData';

export function DestinationDetailPage() {
  const { t } = useTranslation();
  const { country } = useParams<{ country: string }>();
  const destination = country ? findDestination(country) : undefined;

  useSeo({
    title: destination ? `${destination.country} Visa Guide` : 'Destination Not Found',
    description: destination
      ? `Indicative visa requirements, fees, processing times and validity for ${destination.country} from Fortune Visa Services.`
      : undefined,
  });

  if (!destination) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <EmptyState
          icon={<Globe2 className="h-7 w-7" aria-hidden="true" />}
          title={t('destinationDetail.notFoundTitle')}
          body={t('destinationDetail.notFoundBody')}
          action={
            <Link
              to="/destinations"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
            >
              {t('destinationDetail.notFoundCta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={t('destinations.eyebrow')}
        title={`${destination.flag}  ${destination.country}`}
        description={t('destinations.description')}
      />
      <DestinationVisaList destination={destination} />
    </>
  );
}

function DestinationVisaList({ destination }: { destination: Destination }) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        to="/destinations"
        className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('destinationDetail.back')}
      </Link>

      <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.visaTypesHeading')}</h2>

      {destination.visaTypes.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {destination.visaTypes.map((visa) => (
            <VisaTypeCard key={visa.type} destination={destination} visa={visa} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Globe2 className="h-7 w-7" aria-hidden="true" />}
          title={t('destinationDetail.noVisaTypes')}
          body={t('checker.empty.body')}
        />
      )}
    </section>
  );
}

function VisaTypeCard({ destination, visa }: { destination: Destination; visa: VisaTypeInfo }) {
  const { t } = useTranslation();

  return (
    <article className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-ink">{t(`visaTypes.${visa.type}`)}</h3>
        <RequirementBadge required={visa.required} />
      </header>

      <div className="mt-6">
        <VisaDetails visa={visa} />
      </div>

      <div className="mt-8">
        <Link
          to={buildEnquiryPath({ destination: destination.slug, visaType: visa.type })}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-base font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lift"
        >
          {t('destinationDetail.enquire')}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
