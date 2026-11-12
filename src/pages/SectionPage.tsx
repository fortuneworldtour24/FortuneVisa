import { useTranslation } from 'react-i18next';
import { PlaceholderPage } from '@/components/PlaceholderPage';
import { useSeo } from '@/hooks/useSeo';

type SectionKey = 'destinations' | 'checker' | 'services' | 'blog' | 'privacy' | 'terms';

export function SectionPage({ section }: { section: SectionKey }) {
  const { t } = useTranslation();

  useSeo({
    title: t(`pages.${section}.title`),
    description: t(`pages.${section}.description`),
  });

  return (
    <PlaceholderPage
      eyebrow={t(`pages.${section}.eyebrow`)}
      title={t(`pages.${section}.title`)}
      description={t(`pages.${section}.description`)}
    />
  );
}
