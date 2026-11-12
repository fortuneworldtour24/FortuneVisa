import { CircleCheck, CircleSlash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type RequirementBadgeProps = {
  required: boolean;
};

export function RequirementBadge({ required }: RequirementBadgeProps) {
  const { t } = useTranslation();

  return required ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-100 px-3 py-1 text-xs font-bold text-warning-700">
      <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" />
      {t('destinationDetail.visaRequired')}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-xs font-bold text-success-700">
      <CircleSlash className="h-3.5 w-3.5" aria-hidden="true" />
      {t('destinationDetail.visaNotRequired')}
    </span>
  );
}
