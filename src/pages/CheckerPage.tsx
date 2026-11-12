import { useMemo, useState } from 'react';
import { ArrowRight, Info, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHero } from '@/components/PageHero';
import { EmptyState } from '@/components/EmptyState';
import { SelectField } from '@/components/forms/SelectField';
import { RequirementBadge } from '@/components/visa/RequirementBadge';
import { VisaDetails } from '@/components/visa/VisaDetails';
import { PASSPORT_COUNTRY_CODES } from '@/config/visaOptions';
import { usePassportOptions } from '@/hooks/usePassportOptions';
import { DESTINATIONS, buildEnquiryPath, findDestination, findVisaTypeInfo, isVisaType } from '@/lib/visaData';
import { useSeo } from '@/hooks/useSeo';
import type { Destination, VisaTypeInfo } from '@/lib/visaData';

type CheckerSelection = {
  passport: string;
  destinationSlug: string;
  visaType: string;
};

function readSelection(searchParams: URLSearchParams): CheckerSelection {
  const passport = searchParams.get('passport') ?? '';
  const destinationSlug = searchParams.get('destination') ?? '';
  const visaType = searchParams.get('visaType') ?? '';
  const destination = findDestination(destinationSlug);
  const validVisa =
    destination && isVisaType(visaType) && findVisaTypeInfo(destination, visaType) ? visaType : '';

  return {
    passport: (PASSPORT_COUNTRY_CODES as readonly string[]).includes(passport) ? passport : '',
    destinationSlug: destination ? destinationSlug : '',
    visaType: validVisa,
  };
}

export function CheckerPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Visa Checker — Check if You Need a Visa',
    description: 'Select your passport, destination and visa type to see an indicative visa requirement result.',
  });
  const [searchParams] = useSearchParams();
  const passportOptions = usePassportOptions();
  const [selection, setSelection] = useState<CheckerSelection>(() => readSelection(searchParams));

  const destination = findDestination(selection.destinationSlug);
  const visa = destination && selection.visaType ? findVisaTypeInfo(destination, selection.visaType) : undefined;

  const destinationOptions = DESTINATIONS.map((item) => ({
    value: item.slug,
    label: `${item.flag}  ${item.country}`,
  }));

  const visaOptions = useMemo(
    () =>
      (destination?.visaTypes ?? []).map((item) => ({
        value: item.type,
        label: t(`visaTypes.${item.type}`),
      })),
    [destination, t],
  );


  return (
    <>
      <PageHero
        eyebrow={t('checker.eyebrow')}
        title={t('checker.title')}
        description={t('checker.description')}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-16">
        <div className="lg:col-span-5">
          <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-28">
            <SelectField
              id="checker-passport"
              label={t('checker.passportLabel')}
              value={selection.passport}
              onChange={(value) => setSelection((current) => ({ ...current, passport: value }))}
              options={passportOptions}
              placeholder={t('checker.passportPlaceholder')}
            />
            <SelectField
              id="checker-destination"
              label={t('checker.destinationLabel')}
              value={selection.destinationSlug}
              onChange={(value) =>
                setSelection((current) => ({ ...current, destinationSlug: value, visaType: '' }))
              }
              options={destinationOptions}
              placeholder={t('checker.destinationPlaceholder')}
            />
            <SelectField
              id="checker-visa"
              label={t('checker.visaTypeLabel')}
              value={selection.visaType}
              onChange={(value) => setSelection((current) => ({ ...current, visaType: value }))}
              options={visaOptions}
              placeholder={t('checker.visaTypePlaceholder')}
              disabled={!destination}
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <CheckerResult destination={destination} visa={visa} passport={selection.passport} />
        </div>
      </section>
    </>
  );
}

type CheckerResultProps = {
  destination: Destination | undefined;
  visa: VisaTypeInfo | undefined;
  passport: string;
};

function CheckerResult({ destination, visa, passport }: CheckerResultProps) {
  const { t } = useTranslation();

  if (!destination) {
    return (
      <EmptyState
        icon={<Search className="h-7 w-7" aria-hidden="true" />}
        title={t('checker.incomplete')}
        body={t('checker.description')}
      />
    );
  }

  if (destination.visaTypes.length === 0) {
    return (
      <EmptyState
        icon={<Info className="h-7 w-7" aria-hidden="true" />}
        title={t('checker.noVisaTypes')}
        body={t('checker.empty.body')}
        action={
          <Link
            to={buildEnquiryPath({ passport, destination: destination.slug })}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
          >
            {t('checker.empty.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
    );
  }

  if (!visa || !passport) {
    return (
      <EmptyState
        icon={<Search className="h-7 w-7" aria-hidden="true" />}
        title={t('checker.incomplete')}
        body={t('checker.description')}
      />
    );
  }

  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lift sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700">
        {destination.flag}  {destination.country}
      </p>
      <header className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">{t(`visaTypes.${visa.type}`)}</h2>
        <RequirementBadge required={visa.required} />
      </header>
      <p className="mt-2 text-sm font-semibold text-muted">{t('checker.resultTitle')}</p>

      <div className="mt-6">
        <VisaDetails visa={visa} />
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-warning-100 bg-warning-50 p-4 text-sm leading-relaxed text-warning-700">
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p>{t('checker.disclaimer')}</p>
      </div>

      <Link
        to={buildEnquiryPath({ passport, destination: destination.slug, visaType: visa.type })}
        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-base font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lift"
      >
        {t('checker.enquireNow')}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </article>
  );
}
