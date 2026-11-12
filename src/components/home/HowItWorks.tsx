import { ClipboardList, FileUp, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/home/SectionHeading';

const STEPS: { key: 'one' | 'two' | 'three'; icon: LucideIcon }[] = [
  { key: 'one', icon: ClipboardList },
  { key: 'two', icon: FileUp },
  { key: 'three', icon: Send },
];

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading title={t('home.steps.title')} subtitle={t('home.steps.subtitle')} align="center" />
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ key, icon: Icon }, index) => (
            <Reveal key={key} delay={index * 120}>
              <li className="relative h-full rounded-3xl border border-slate-200/80 bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500 text-ink shadow-card">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-3xl font-extrabold text-slate-200" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-ink">{t(`home.steps.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`home.steps.${key}.body`)}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
