import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DESTINATION_COUNTRY_CODE,
  PASSPORT_COUNTRY_CODES,
  VISA_TYPE_IDS,
  countryFlag,
} from '@/config/visaOptions';

const selectClass =
  'h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-11 text-base font-medium text-ink shadow-sm transition-colors hover:border-primary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100';

export function VisaSearchCard() {
  const { t } = useTranslation();
  const [passport, setPassport] = useState('');
  const [destination, setDestination] = useState('');

  const passportOptions = useMemo(
    () =>
      PASSPORT_COUNTRY_CODES.map((code) => ({
        code,
        label: `${countryFlag(code)}  ${t(`countries.${code}`)}`,
        name: t(`countries.${code}`),
      })).sort((a, b) => a.name.localeCompare(b.name)),
    [t],
  );

  const destinationCountry = t(`countries.${DESTINATION_COUNTRY_CODE}`);
  const ready = passport !== '' && destination !== '';
  const query = new URLSearchParams({ passport, destination }).toString();

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lift sm:p-8">
      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="passport-country" className="text-sm font-semibold text-ink">
            {t('home.hero.passportLabel')}
          </label>
          <div className="relative">
            <select
              id="passport-country"
              value={passport}
              onChange={(event) => setPassport(event.target.value)}
              className={selectClass}
            >
              <option value="" disabled>
                {t('home.hero.passportPlaceholder')}
              </option>
              {passportOptions.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="destination" className="text-sm font-semibold text-ink">
            {t('home.hero.destinationLabel')}
          </label>
          <div className="relative">
            <select
              id="destination"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className={selectClass}
            >
              <option value="" disabled>
                {t('home.hero.destinationPlaceholder')}
              </option>
              {VISA_TYPE_IDS.map((id) => (
                <option key={id} value={id}>
                  {t('home.hero.destinationOption', {
                    country: destinationCountry,
                    visa: t(`visas.${id}.name`),
                  })}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {ready ? (
          <Link
            to={`/checker?${query}`}
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-base font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lift"
          >
            {t('home.hero.checkCta')}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="flex h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-200 px-6 text-base font-semibold text-slate-500"
          >
            {t('home.hero.checkCta')}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {!ready && <p className="text-center text-sm text-muted">{t('home.hero.checkHint')}</p>}
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
      aria-hidden="true"
    />
  );
}
