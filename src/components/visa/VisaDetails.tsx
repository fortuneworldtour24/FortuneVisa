import { useTranslation } from 'react-i18next';
import { Clock, CalendarRange, FileText, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { VisaTypeInfo } from '@/lib/visaData';

type VisaDetailsProps = {
  visa: VisaTypeInfo;
};

export function VisaDetails({ visa }: VisaDetailsProps) {
  const { t } = useTranslation();

  const items: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Wallet, label: t('visaDetails.fee'), value: `A$${visa.indicativeFee.toLocaleString('en-AU')}` },
    { icon: Clock, label: t('visaDetails.processing'), value: visa.processingTime },
    { icon: CalendarRange, label: t('visaDetails.validity'), value: visa.validity },
  ];

  return (
    <div className="space-y-6">
      <dl className="grid gap-4 sm:grid-cols-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl bg-background p-4">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <Icon className="h-4 w-4 text-primary-700" aria-hidden="true" />
              {label}
            </dt>
            <dd className="mt-2 text-base font-bold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="rounded-2xl bg-background p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <FileText className="h-4 w-4 text-primary-700" aria-hidden="true" />
          {t('visaDetails.notes')}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink sm:text-base">{visa.notes}</p>
      </div>
    </div>
  );
}
