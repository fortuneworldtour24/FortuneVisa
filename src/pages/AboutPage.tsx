import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileCheck, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { useContent } from '@/hooks/useContent';
import { MarkdownText } from '@/components/MarkdownText';

type Value = { title?: string; text?: string };
type Member = { name?: string; role?: string; bio?: string };

const DEFAULT_VALUES: Value[] = [
  {
    title: 'Integrity & honesty',
    text: 'We give realistic assessments and honest timelines. If a requirement is missing or weak, we explain it clearly, without false promises.',
  },
  {
    title: 'Careful checking',
    text: 'Visa applications leave little room for mistakes. We check every form, statement and supporting document before you submit.',
  },
  {
    title: 'Empathy & care',
    text: "Behind every application is a trip, a course, a job or a family reunion. We treat every client's documents with the care they deserve.",
  },
  {
    title: 'Plain-English clarity',
    text: 'Visa rules can be complicated. We cut through the jargon so you always know what each document is and why it is needed.',
  },
];

const ICONS = [ShieldCheck, FileCheck, HeartHandshake, Sparkles];

const WHY = [
  'A checklist matched to your passport and destination',
  'A careful review of your documents before you submit',
  'A clear breakdown of fees before you decide to go ahead',
  'Direct phone, email and WhatsApp access to our team',
];

const FACTS = [
  { big: 'New Delhi', small: 'Based in' },
  { big: 'Plain language', small: 'No jargon' },
  { big: 'Direct support', small: 'Phone, email, WhatsApp' },
];

export function AboutPage() {
  useSeo({
    title: 'About Us',
    description:
      'Fortune Visa Services is a New Delhi based visa guidance and document assistance service for Indian travellers.',
  });

  const about = useContent('about', {
    intro:
      'Based in New Delhi, Fortune Visa Services helps Indian travellers understand visa requirements, prepare their documents carefully and apply with confidence.',
    missionTitle: 'Clear, honest help with your visa application',
    missionBody:
      'Visa rules differ from country to country and change often. Our mission is to take the stress and guesswork out of your application with careful document checking, honest guidance on what is required, and responsive human support from your first enquiry to submission.',
    body: '',
  });
  const valuesData = useContent('about.values', { items: DEFAULT_VALUES });
  const teamData = useContent('about.team', { items: [] as Member[] });

  const values = valuesData.items.filter((v) => v.title || v.text);
  const team = teamData.items.filter((m) => m.name);

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-700">About Fortune</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Visas made simple. Journeys made certain.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{about.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-200 sm:p-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-700">Our mission</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{about.missionTitle}</h2>
            <p className="mt-4 leading-relaxed text-slate-600">{about.missionBody}</p>
            <dl className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.big}>
                  <dd className="text-xl font-extrabold text-primary-700">{f.big}</dd>
                  <dt className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{f.small}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl bg-indigo-50/60 p-6 lg:col-span-2">
            <h3 className="flex items-center gap-2 font-bold text-primary-700">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Why applicants choose Fortune
            </h3>
            <ul className="mt-4 space-y-3">
              {WHY.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {about.body ? <MarkdownText text={about.body} className="mt-10 max-w-3xl" /> : null}
      </section>

      {values.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Our core values</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">The principles that guide our work</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={`${v.title}-${i}`} className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-200">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-primary-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {team.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink">Our team</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <div key={`${m.name}-${i}`} className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-700 text-sm font-bold text-white">
                    {(m.name ?? '')
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-ink">{m.name}</p>
                    {m.role ? <p className="text-xs font-semibold text-primary-700">{m.role}</p> : null}
                  </div>
                </div>
                {m.bio ? <p className="mt-4 text-sm leading-relaxed text-slate-600">{m.bio}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
          <div>
            <p className="font-bold text-ink">What we do and don&apos;t do</p>
            <p className="mt-1 text-sm text-slate-600">
              Fortune Visa Services provides visa guidance and document assistance only. We are not affiliated with any
              embassy, consulate or government, and we cannot guarantee a visa outcome. Decisions are made solely by the
              issuing authority.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-extrabold">Book a free consultation</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Talk through your visa options with our team. No obligation, no jargon.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary-700 transition hover:bg-slate-100"
          >
            Book a free consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default AboutPage;