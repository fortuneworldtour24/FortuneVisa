import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import visasJson from '@/data/visas.json';
import { FlagSelect } from '@/components/FlagSelect';
import type { FlagOption } from '@/components/FlagSelect';
import { getPassportOptions } from '@/lib/countries';

type Dest = { slug: string; country: string; iso_code?: string; visaTypes?: { type: string }[] };
const raw = visasJson as unknown as Dest[] | { countries: Dest[] };
const DESTINATIONS: Dest[] = Array.isArray(raw) ? raw : raw.countries ?? [];

export function VisaSearchCard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [passport, setPassport] = useState('IN');
  const [destination, setDestination] = useState('');
  const [visaType, setVisaType] = useState('');

  const passportOptions = useMemo(() => getPassportOptions(i18n.language), [i18n.language]);

  const destinationOptions = useMemo<FlagOption[]>(
    () =>
      DESTINATIONS.filter((d) => (d.iso_code ?? '').toLowerCase() !== passport.toLowerCase()).map((d) => ({
        value: d.slug,
        label: d.country,
        code: d.iso_code,
      })),
    [passport]
  );

  const selected = DESTINATIONS.find((d) => d.slug === destination);
  const visaOptions = useMemo<FlagOption[]>(
    () => (selected?.visaTypes ?? []).map((v) => ({ value: v.type, label: t(`visaTypes.${v.type}`, v.type) })),
    [selected, t]
  );

  const onPassport = (code: string) => {
    setPassport(code);
    const cur = DESTINATIONS.find((d) => d.slug === destination);
    if (cur && (cur.iso_code ?? '').toLowerCase() === code.toLowerCase()) {
      setDestination('');
      setVisaType('');
    }
  };

  const onDestination = (slug: string) => {
    setDestination(slug);
    setVisaType(DESTINATIONS.find((d) => d.slug === slug)?.visaTypes?.[0]?.type ?? '');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    const params = new URLSearchParams({ passport, destination });
    if (visaType) params.set('visaType', visaType);
    navigate(`/checker?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-slate-200 sm:p-6">
      <div className="space-y-4">
        <FlagSelect label={t('home.search.passport', 'Passport country')} value={passport} onChange={onPassport} options={passportOptions} />
        <FlagSelect
          label={t('home.search.destination', 'Travelling to')}
          value={destination}
          onChange={onDestination}
          options={destinationOptions}
          placeholder={t('home.search.destinationPlaceholder', 'Select your destination')}
        />
        {visaOptions.length > 0 ? (
          <FlagSelect label={t('home.search.visaType', 'Visa type')} value={visaType} onChange={setVisaType} options={visaOptions} />
        ) : null}

        <button
          type="submit"
          disabled={!destination}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-700 text-sm font-semibold text-white shadow-card transition hover:bg-primary-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          {t('home.search.cta', 'Check visa requirements')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        {!destination ? (
          <p className="text-center text-xs text-slate-500">{t('home.search.hint', 'Choose your destination to continue.')}</p>
        ) : null}
      </div>
    </form>
  );
}

export default VisaSearchCard;