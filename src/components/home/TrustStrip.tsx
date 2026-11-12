import { ClipboardCheck, FileSearch, HeartHandshake, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const ITEMS: { key: 'expert' | 'documents' | 'application' | 'friendly'; icon: LucideIcon }[] = [
  { key: 'expert', icon: UserCheck },
  { key: 'documents', icon: FileSearch },
  { key: 'application', icon: ClipboardCheck },
  { key: 'friendly', icon: HeartHandshake },
];

export function TrustStrip() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-slate-200/70 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {ITEMS.map(({ key, icon: Icon }, index) => (
          <Reveal key={key} delay={index * 80}>
            <div className="flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-primary-50/60">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-bold text-ink">{t(`home.trust.${key}.title`)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t(`home.trust.${key}.body`)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
