import { useTranslation } from 'react-i18next';
import { VISA_TYPES } from '@/lib/visaData';
import type { VisaType } from '@/lib/visaData';

type VisaTypeFilterProps = {
  value: VisaType | 'all';
  onChange: (value: VisaType | 'all') => void;
};

export function VisaTypeFilter({ value, onChange }: VisaTypeFilterProps) {
  const { t } = useTranslation();
  const options: (VisaType | 'all')[] = ['all', ...VISA_TYPES];

  return (
    <div role="group" aria-label={t('destinations.filterLabel')} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors ${
              active
                ? 'border-primary-700 bg-primary-700 text-white shadow-card'
                : 'border-slate-200 bg-white text-ink hover:border-primary-200 hover:bg-primary-50'
            }`}
          >
            {option === 'all' ? t('destinations.filterAll') : t(`visaTypes.${option}`)}
          </button>
        );
      })}
    </div>
  );
}
