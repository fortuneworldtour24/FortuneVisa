import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import visasJson from '@/data/visas.json';

type Dest = {
  slug: string;
  country: string;
  iso_code?: string;
  visaTypes?: { type: string }[];
};

const raw = visasJson as unknown as Dest[] | { countries: Dest[] };
const DESTINATIONS: Dest[] = Array.isArray(raw) ? raw : raw.countries ?? [];

// India first, then everyone else alphabetically
const OTHER_PASSPORTS = [
  'AE', 'AF', 'AL', 'AM', 'AR', 'AT', 'AU', 'AZ', 'BD', 'BE', 'BG', 'BH', 'BR', 'BT', 'CA', 'CH', 'CL', 'CN',
  'CO', 'CZ', 'DE', 'DK', 'DZ', 'EG', 'ES', 'ET', 'FI', 'FJ', 'FR', 'GB', 'GE', 'GH', 'GR', 'HK', 'HU', 'ID',
  'IE', 'IL', 'IQ', 'IR', 'IT', 'JO', 'JP', 'KE', 'KG', 'KH', 'KR', 'KW', 'KZ', 'LB', 'LK', 'MA', 'MM', 'MN',
  'MU', 'MV', 'MX', 'MY', 'NG', 'NL', 'NO', 'NP', 'NZ', 'OM', 'PH', 'PK', 'PL', 'PT', 'QA', 'RO', 'RS', 'RU',
  'SA', 'SE', 'SG', 'TH', 'TJ', 'TR', 'TW', 'TZ', 'UA', 'UG', 'US', 'UZ', 'VN', 'ZA', 'ZM', 'ZW',
];

const selectCls =
  'h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pr-10 text-sm text-ink outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100';

function Flag({ code }: { code?: string }) {
  if (!code) return null;
  return (
    <span className="pointer-events-none absolute left-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 overflow-hidden rounded-full ring-1 ring-slate-200">
      <span className={`fi fis fi-${code.toLowerCase()}`} style={{ fontSize: 24, lineHeight: 1 }} />
    </span>
  );
}

export function VisaSearchCard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [passport, setPassport] = useState('IN');
  const [destination, setDestination] = useState('');
  const [visaType, setVisaType] = useState('');

  const passports = useMemo(() => {
    let names: Intl.DisplayNames | null = null;
    try {
      names = new Intl.DisplayNames([i18n.language || 'en'], { type: 'region' });
    } catch {
      names = null;
    }
    const nameOf = (c: string) => names?.of(c) ?? c;
    const rest = OTHER_PASSPORTS.map((code) => ({ code, name: nameOf(code) })).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return [{ code: 'IN', name: nameOf('IN') }, ...rest];
  }, [i18n.language]);

  const destinations = useMemo(
    () => DESTINATIONS.filter((d) => (d.iso_code ?? '').toLowerCase() !== passport.toLowerCase()),
    [passport]
  );
  const selected = DESTINATIONS.find((d) => d.slug === destination);
  const visaTypes = selected?.visaTypes ?? [];

  const onPassportChange = (code: string) => {
    setPassport(code);
    const current = DESTINATIONS.find((d) => d.slug === destination);
    if (current && (current.iso_code ?? '').toLowerCase() === code.toLowerCase()) {
      setDestination('');
      setVisaType('');
    }
  };

  const onDestinationChange = (slug: string) => {
    setDestination(slug);
    const dest = DESTINATIONS.find((d) => d.slug === slug);
    setVisaType(dest?.visaTypes?.[0]?.type ?? '');
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
        <label className="block text-sm font-semibold text-ink">
          {t('home.search.passport', 'Passport country')}
          <div className="relative mt-1.5">
            <Flag code={passport} />
            <select
              className={`${selectCls} pl-12`}
              value={passport}
              onChange={(e) => onPassportChange(e.target.value)}
            >
              {passports.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="block text-sm font-semibold text-ink">
          {t('home.search.destination', 'Travelling to')}
          <div className="relative mt-1.5">
            <Flag code={selected?.iso_code} />
            <select
              className={`${selectCls} ${selected ? 'pl-12' : 'pl-4'}`}
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
            >
              <option value="">{t('home.search.destinationPlaceholder', 'Select your destination')}</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.country}
                </option>
              ))}
            </select>
          </div>
        </label>

        {visaTypes.length > 0 ? (
          <label className="block text-sm font-semibold text-ink">
            {t('home.search.visaType', 'Visa type')}
            <div className="relative mt-1.5">
              <select
                className={`${selectCls} pl-4`}
                value={visaType}
                onChange={(e) => setVisaType(e.target.value)}
              >
                {visaTypes.map((v) => (
                  <option key={v.type} value={v.type}>
                    {t(`visaTypes.${v.type}`, v.type)}
                  </option>
                ))}
              </select>
            </div>
          </label>
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
          <p className="text-center text-xs text-slate-500">
            {t('home.search.hint', 'Choose your destination to continue.')}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default VisaSearchCard;