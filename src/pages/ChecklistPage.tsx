import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ClipboardCheck, Info, LifeBuoy, Printer } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHero } from '@/components/PageHero';
import { EmptyState } from '@/components/EmptyState';
import { SelectField } from '@/components/forms/SelectField';
import { DESTINATIONS, buildEnquiryPath, findDestination } from '@/lib/visaData';
import type { VisaType } from '@/lib/visaData';
import { findChecklist } from '@/lib/checklistData';
import type { Checklist } from '@/lib/checklistData';
import { useSeo } from '@/hooks/useSeo';

const STORAGE_KEY = 'fortune-checklist-progress';

type ProgressMap = Record<string, Record<string, boolean>>;
type ChecklistSelection = { destinationSlug: string; visaType: string };

function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function storageKeyFor(selection: ChecklistSelection): string {
  return `${selection.destinationSlug}:${selection.visaType}`;
}

export function ChecklistPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Visa Document Checklist',
    description: 'Build your visa document checklist interactively. Tick items off, save progress, and print or save as PDF.',
  });
  const [searchParams] = useSearchParams();
  const [selection, setSelection] = useState<ChecklistSelection>(() => {
    const dest = searchParams.get('destination') ?? '';
    const visa = searchParams.get('visaType') ?? '';
    const destination = findDestination(dest);
    const validVisa = destination && destination.visaTypes.some((v) => v.type === visa) ? visa : '';
    return {
      destinationSlug: destination ? dest : '',
      visaType: validVisa,
    };
  });
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage unavailable or full; silently skip
    }
  }, [progress]);

  const destinationOptions = useMemo(
    () =>
      DESTINATIONS.map((item) => ({
        value: item.slug,
        label: `${item.flag}  ${item.country}`,
      })),
    [],
  );

  const destination = findDestination(selection.destinationSlug);
  const flag = destination?.flag ?? '';
  const visaOptions = useMemo(
    () =>
      (destination?.visaTypes ?? []).map((item) => ({
        value: item.type,
        label: t(`visaTypes.${item.type}`),
      })),
    [destination, t],
  );

  const checklist = useMemo(
    () =>
      selection.destinationSlug && selection.visaType
        ? findChecklist(selection.destinationSlug, selection.visaType)
        : undefined,
    [selection],
  );

  const toggleItem = useCallback(
    (itemId: string) => {
      const key = storageKeyFor(selection);
      setProgress((current) => {
        const section = { ...(current[key] ?? {}) };
        section[itemId] = !section[itemId];
        if (!section[itemId]) delete section[itemId];
        return { ...current, [key]: section };
      });
    },
    [selection],
  );

  const handlePrint = () => window.print();

  return (
    <>
      <PageHero
        eyebrow={t('checklist.eyebrow')}
        title={t('checklist.title')}
        description={t('checklist.description')}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-16 print:block print:p-0">
        <div className="lg:col-span-5 print:hidden">
          <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-28">
            <SelectField
              id="checklist-destination"
              label={t('checklist.destinationLabel')}
              value={selection.destinationSlug}
              onChange={(value) =>
                setSelection({ destinationSlug: value, visaType: '' })
              }
              options={destinationOptions}
              placeholder={t('checklist.destinationPlaceholder')}
            />
            <SelectField
              id="checklist-visa"
              label={t('checklist.visaTypeLabel')}
              value={selection.visaType}
              onChange={(value) => setSelection((current) => ({ ...current, visaType: value }))}
              options={visaOptions}
              placeholder={t('checklist.visaTypePlaceholder')}
              disabled={!destination}
            />
            <div className="flex gap-3 rounded-2xl border border-warning-100 bg-warning-50 p-4 text-sm leading-relaxed text-warning-700">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>{t('checklist.disclaimer')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 print:w-full">
          <ChecklistContent
            selection={selection}
            flag={flag}
            checklist={checklist}
            progress={progress}
            onToggle={toggleItem}
            onPrint={handlePrint}
          />
        </div>
      </section>
    </>
  );
}

type ChecklistContentProps = {
  selection: ChecklistSelection;
  flag: string;
  checklist: Checklist | undefined;
  progress: ProgressMap;
  onToggle: (itemId: string) => void;
  onPrint: () => void;
};

function ChecklistContent({ selection, flag, checklist, progress, onToggle, onPrint }: ChecklistContentProps) {
  const { t } = useTranslation();

  if (!selection.destinationSlug || !selection.visaType) {
    return (
      <EmptyState
        icon={<ClipboardCheck className="h-7 w-7" aria-hidden="true" />}
        title={t('checklist.noCombination')}
        body={t('checklist.description')}
      />
    );
  }

  if (!checklist) {
    return (
      <EmptyState
        icon={<Info className="h-7 w-7" aria-hidden="true" />}
        title={t('checklist.notAvailable')}
        body={t('checklist.notAvailable')}
        action={
          <Link
            to={buildEnquiryPath({ destination: selection.destinationSlug, visaType: selection.visaType })}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
          >
            {t('checklist.notAvailableCta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
    );
  }

  const sectionProgress = progress[storageKeyFor(selection)] ?? {};
  const done = checklist.requirements.filter((req) => sectionProgress[req.id]).length;
  const total = checklist.requirements.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8 print:border-none print:p-0 print:shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700">
            {flag}  {t(`visaTypes.${selection.visaType as VisaType}`)}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{t('checklist.title')}</h2>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
            done === total ? 'bg-success-100 text-success-700' : 'bg-primary-50 text-primary-700'
          }`}
        >
          {done === total && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
          {t('checklist.progressAria', { done, total })}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-semibold text-muted">
          <span>{t('checklist.progressLabel')}</span>
          <span>{percent}%</span>
        </div>
        <div
          className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('checklist.progressAria', { done, total })}
        >
          <div
            className="h-full rounded-full bg-primary-700 transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {checklist.requirements.map((req) => {
          const checked = Boolean(sectionProgress[req.id]);
          return (
            <li key={req.id}>
              <label
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors sm:p-4 ${
                  checked ? 'border-primary-200 bg-primary-50/60' : 'border-slate-200 hover:border-primary-100 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(req.id)}
                  className="h-5 w-5 shrink-0 rounded-md border-slate-300 text-primary-700 focus:ring-primary-500"
                />
                <span className={`text-sm leading-relaxed sm:text-base ${checked ? 'text-muted line-through' : 'text-ink'}`}>
                  {req.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
        <button
          type="button"
          onClick={onPrint}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-base font-semibold text-ink transition-colors hover:bg-slate-50"
        >
          <Printer className="h-5 w-5" aria-hidden="true" />
          {t('checklist.print')}
        </button>
        <Link
          to={buildEnquiryPath({ destination: selection.destinationSlug, visaType: selection.visaType })}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-base font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lift"
        >
          <LifeBuoy className="h-5 w-5" aria-hidden="true" />
          {t('checklist.getHelp')}
        </Link>
      </div>
    </article>
  );
}
