import { Award, CheckCircle, FileCheck, HeartHandshake, Shield, Sparkles, Target, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHero } from '@/components/PageHero';
import { ConsultationCta } from '@/components/ConsultationCta';
import { useSeo } from '@/hooks/useSeo';

const VALUES = [
  {
    icon: Shield,
    title: 'Integrity & Honesty',
    description:
      'We provide realistic assessments and truthful timelines. If an evidentiary requirement is missing or weak, we explain it clearly without false promises.',
  },
  {
    icon: FileCheck,
    title: 'Meticulous Precision',
    description:
      'Australian visa requirements leave zero room for oversights. Every form, financial statement, and certified copy is scrutinized for accuracy before submission.',
  },
  {
    icon: HeartHandshake,
    title: 'Empathy & Care',
    description:
      'Behind every application is a person’s career, education, or family reunion. We treat every client’s documents with the dedication and respect they deserve.',
  },
  {
    icon: Sparkles,
    title: 'Plain-English Clarity',
    description:
      'Australian migration criteria can be complex. We cut through bureaucratic jargon so you always understand what each document means and why it is required.',
  },
];

const TEAM = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior Visa & Document Lead',
    experience: '8+ years experience',
    bio: 'Specializing in Australian tourist, student, and skilled migration documentation. Experienced in reviewing complex employment and financial evidence.',
    initials: 'SJ',
  },
  {
    name: 'David Chen',
    role: 'Student Pathway Coordinator',
    experience: '6+ years experience',
    bio: 'Assisting international students with Confirmation of Enrolment (CoE) packages, Genuine Student statements, and OSHC documentation.',
    initials: 'DC',
  },
  {
    name: 'Priya Sharma',
    role: 'Client Services & Liaison Manager',
    experience: '5+ years experience',
    bio: 'Ensuring seamless client communication from initial enquiry to document finalization. Multilingual client onboarding and support.',
    initials: 'PS',
  },
  {
    name: 'Marcus Taylor',
    role: 'Compliance & Verification Officer',
    experience: '7+ years experience',
    bio: 'Overseeing document verification, certified translations, and pre-lodgement compliance checks against Australian standards.',
    initials: 'MT',
  },
];

export function AboutPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'About Us',
    description:
      'Learn about Fortune Visa Services in Parramatta, NSW. Our mission, values, and experienced team supporting your Australian visa documentation.',
  });

  return (
    <>
      <PageHero
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        description={t('about.description')}
      />

      {/* Mission Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
                <Target className="h-3.5 w-3.5" aria-hidden="true" />
                {t('about.missionBadge')}
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                {t('about.missionTitle')}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {t('about.missionBody')}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8 sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-extrabold text-primary-700">100%</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Document Focus</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-primary-700">NSW</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Parramatta Based</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-2xl font-extrabold text-primary-700">No Jargon</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Plain English</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-primary-100 bg-primary-50/50 p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-base font-bold text-primary-900">
                  <Award className="h-5 w-5 text-primary-700" aria-hidden="true" />
                  Why applicants choose Fortune
                </h3>
                <ul className="mt-5 space-y-3.5 text-sm text-ink">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
                    <span>Personalized checklist tailored to your passport and visa pathway</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
                    <span>Cross-checked translations and certified document copies</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
                    <span>Transparent fee breakdowns with no hidden post-lodgement costs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
                    <span>Direct phone, email, and WhatsApp access to your coordinator</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent-700">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t('about.valuesBadge')}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {t('about.valuesTitle')}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted">
              {t('about.valuesSubtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Placeholders Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {t('about.teamBadge')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {t('about.teamTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted">
            {t('about.teamSubtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 text-lg font-bold text-white shadow-sm">
                  {member.initials}
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">{member.name}</h3>
                  <p className="text-xs font-semibold text-primary-700">{member.role}</p>
                </div>
              </div>
              <span className="mt-4 inline-flex w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                {member.experience}
              </span>
              <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">{member.bio}</p>
            </article>
          ))}
        </div>

        {/* Regulatory Scope Notice */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Shield className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-base font-bold text-ink">{t('about.disclaimerTitle')}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
                {t('about.disclaimerBody')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}

