import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PASSPORT_COUNTRY_CODES, countryFlag } from '@/config/visaOptions';
import type { SelectOption } from '@/components/forms/SelectField';

export function usePassportOptions(): SelectOption[] {
  const { t } = useTranslation();

  return useMemo(
    () =>
      PASSPORT_COUNTRY_CODES.map((code) => ({
        value: code,
        label: `${countryFlag(code)}  ${t(`countries.${code}`)}`,
        name: t(`countries.${code}`),
      }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ value, label }) => ({ value, label })),
    [t],
  );
}
