import { Link } from 'react-router-dom';
import { Building2, FileText, Landmark, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useSeo } from '@/hooks/useSeo';

const PARTS = [
    {
        icon: Landmark,
        title: 'Government or embassy fee',
        text: 'Set by the authority and passed on at cost. Each destination page shows the latest amount we have verified, and your written quote confirms it again.',
    },
    {
        icon: Building2,
        title: 'Visa centre or partner fee',
        text: 'Some countries use an outsourced visa application centre. This line only appears where the process uses one.',
    },
    {
        icon: FileText,
        title: 'Our service fee',
        text: 'What we charge for checking your documents, preparing the application, submitting it and keeping you updated. It is shown separately, so you can see exactly what you pay us.',
    },
    {
        icon: Sparkles,
        title: 'Optional add-ons',
        text: 'For example travel insurance through a partner. Only included if you ask, and never added without your say-so.',
    },
];

const STEPS = [
    'Free consultation by call, WhatsApp or video.',
    'We send an itemised written quote: government fee, partner fees, our service fee and any add-ons.',
    'You read the quote and our refund policy, and confirm in writing by email or WhatsApp.',
    'Only then do you pay us directly. We share payment details in writing from our official email or WhatsApp number. We do not take payments on this website.',
    'We submit your application and tell you the date in writing.',
    'We keep you updated until your result arrives.',
];

export function PricingPage() {
    useSeo({
        title: 'How Our Pricing Works',
        description: 'What a Fortune Visa Services quote includes, how payment works, and what to expect before you pay.',
    });

    return (
        <>
            <PageHero
                eyebrow="Pricing"
                title="How our pricing works"
                description="No surprises: here is what a quote includes and how paying works."
            />

            <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">What a quote is made of</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {PARTS.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-primary-700">
                                <Icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                        </div>
                    ))}
                </div>

                <h2 className="mt-14 text-2xl font-extrabold tracking-tight text-ink">How paying works</h2>
                <ol className="mt-6 space-y-3">
                    {STEPS.map((s, i) => (
                        <li key={s} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
                                {i + 1}
                            </span>
                            <p className="pt-1 text-sm text-slate-700">{s}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-12 rounded-3xl bg-indigo-50/70 p-6 text-sm leading-relaxed text-slate-700">
                    <p>
                        <strong>Fees shown on this website are indicative.</strong> Authorities change fees and rules often. Your
                        written quote has the current amounts, and shows any applicable taxes.
                    </p>
                    <p className="mt-3">
                        Our refund rules are on the{' '}
                        <Link to="/refund-policy" className="font-semibold text-primary-700 underline">
                            refund policy page
                        </Link>
                        . In short: full refund before we submit, none after.
                    </p>
                </div>

                <Link
                    to="/contact"
                    className="mt-8 inline-flex h-12 items-center rounded-full bg-primary-700 px-6 text-sm font-semibold text-white"
                >
                    Book a free consultation
                </Link>
            </section>
        </>
    );
}

export default PricingPage;