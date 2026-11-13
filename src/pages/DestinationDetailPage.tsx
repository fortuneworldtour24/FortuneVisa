import { useState } from 'react';
import { ArrowLeft, ArrowRight, Globe2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/EmptyState';
import { useSeo } from '@/hooks/useSeo';
import { buildEnquiryPath, findDestination } from '@/lib/visaData';
import type { Destination, VisaTypeInfo } from '@/lib/visaData';
import { RequirementBadge } from '@/components/visa/RequirementBadge';

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

  const visaTypeList = destination.visaTypes;
  const [selectedVisaType, setSelectedVisaType] = useState<string>(visaTypeList[0]?.type ?? '');
  const selectedVisa = visaTypeList.find((v) => v.type === selectedVisaType) ?? visaTypeList[0];

  const totalAUD = selectedVisa.indicativeFee.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });

  return (
    <>
      {/* Hero with large rounded image */}
      <section className="relative">
        <img
          src={destination.imageUrl}
          alt={t('destinationDetail.heroAlt', { country: destination.country })}
          className="h-64 w-full rounded-3xl object-cover shadow-card sm:h-80 lg:h-96"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 sm:p-8 lg:p-10">
          <h1 className="text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            {destination.country} visa
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {destination.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main content: two-column layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: visa details */}
          <main>
            {destination.visaTypes.length > 0 ? (
              <div className="grid gap-6">
                {destination.visaTypes.map((visa) => (
                  <article
                    key={visa.type}
                    className={`flex flex-col rounded-3xl border p-6 shadow-card sm:p-8 ${
                      visa.type === selectedVisaType
                        ? 'border-primary-300 bg-primary-50/50'
                        : 'border-slate-200/80 bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-xl font-bold text-ink">{t(`visaTypes.${visa.type}`)}</h3>
                      <RequirementBadge required={visa.required} />
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t('destinationDetail.processingTime')}</span>
                        <span className="font-medium">{visa.processingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t('destinationDetail.validity')}</span>
                        <span className="font-medium">{visa.validity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t('destinationDetail.indicativeFee')}</span>
                        <span className="font-medium">{visa.indicativeFee.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        to={buildEnquiryPath({ destination: destination.slug, visaType: visa.type })}
                        className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-base font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lift"
                      >
                        {t('destinationDetail.enquire')}
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Globe2 className="h-7 w-7" aria-hidden="true" />}
                title={t('destinationDetail.noVisaTypes')}
                body={t('checker.empty.body')}
              />
            )}
          </main>
        </div>
      </div>


      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-slate-600">
            {totalAUD} · {t('destinationDetail.travellers')}: 1
          </span>
          <Link
            to={buildEnquiryPath({ destination: destination.slug, visaType: selectedVisaType })}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
          >
            {t('destinationDetail.enquire')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}


