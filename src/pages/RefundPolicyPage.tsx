import { Link } from 'react-router-dom';
import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useSeo } from '@/hooks/useSeo';
import { siteConfig } from '@/config/siteConfig';
import {
    KEEP_SERVICE_FEE_BEFORE_SUBMISSION,
    POLICY_LAST_UPDATED,
    REFUND_WINDOW_WORKING_DAYS,
} from '@/config/refundPolicy';

type Row = { stage: string; when: string; outcome: string; refund: 'full' | 'partial' | 'none' };

const beforeSubmission = KEEP_SERVICE_FEE_BEFORE_SUBMISSION
    ? `Refund of everything you paid except our service fee, within ${REFUND_WINDOW_WORKING_DAYS} working days.`
    : `Full refund of everything you paid, within ${REFUND_WINDOW_WORKING_DAYS} working days.`;

const ROWS: Row[] = [
    {
        stage: 'Consultation',
        when: 'Before you pay anything.',
        outcome: 'Free. You are under no obligation to continue.',
        refund: 'full',
    },
    {
        stage: 'Paid, not yet submitted',
        when: 'We are collecting or checking your documents. Nothing has gone to the government, embassy or visa centre.',
        outcome: beforeSubmission,
        refund: KEEP_SERVICE_FEE_BEFORE_SUBMISSION ? 'partial' : 'full',
    },
    {
        stage: 'Submitted',
        when: 'Your application has been filed with the government, embassy or visa centre.',
        outcome:
            'No refund of the government fee, partner fees or our service fee. A filed application cannot be withdrawn, and the work has been done.',
        refund: 'none',
    },
];

const ICONS = {
    full: <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-hidden="true" />,
    partial: <Info className="h-6 w-6 text-amber-600" aria-hidden="true" />,
    none: <XCircle className="h-6 w-6 text-slate-500" aria-hidden="true" />,
};

export function RefundPolicyPage() {
    useSeo({
        title: 'Refund and Cancellation Policy',
        description: 'A simple stage-by-stage refund policy from Fortune Visa Services, so you know where you stand before you pay.',
    });

    return (
        <>
            <PageHero
                eyebrow="Policy"
                title="Refund and cancellation policy"
                description="A simple, stage-by-stage policy, so you know where you stand before you pay."
            />

            <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    This policy is a draft pending legal review. Last updated {POLICY_LAST_UPDATED}.
                </p>

                <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">What you get back, and when</h2>
                <p className="mt-3 text-slate-600">
                    What matters is one moment: the day we submit your application. We always tell you the date in writing
                    (email or WhatsApp), so you know which stage you are in.
                </p>

                <ul className="mt-6 space-y-4">
                    {ROWS.map((r) => (
                        <li key={r.stage} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
                            <span className="mt-0.5 shrink-0">{ICONS[r.refund]}</span>
                            <div className="min-w-0">
                                <h3 className="text-lg font-bold text-ink">{r.stage}</h3>
                                <p className="mt-1 text-sm text-slate-500">{r.when}</p>
                                <p className="mt-3 text-base font-semibold text-slate-800">{r.outcome}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-ink">In every case</h2>
                <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-600">
                    <li>
                        <strong>If we cannot submit because of our own error, or we decide not to take your case further,</strong>{' '}
                        you get a full refund.
                    </li>
                    <li>
                        <strong>We cannot guarantee a visa or a timeline.</strong> Decisions and processing times are set by the
                        issuing authority. A refusal, a delay or a rule change after submission is not a reason for a refund.
                    </li>
                    <li>
                        <strong>Optional add-ons</strong> that have already been issued to you (for example travel insurance or
                        airport services) follow the provider&apos;s own cancellation terms. We will tell you these before you
                        agree to buy.
                    </li>
                    <li>
                        <strong>Incomplete or wrong information.</strong> If documents are missing or incorrect, or we cannot reach
                        you for the period stated in your quote, we may pause or close your case. The stage rules above still
                        apply.
                    </li>
                    <li>
                        <strong>Government fees</strong> are set by the authority and passed on at cost. Once paid to the
                        authority, they cannot be recovered.
                    </li>
                </ul>

                <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-ink">How to ask for a refund</h2>
                <p className="mt-3 text-slate-600">
                    Email{' '}
                    <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary-700 underline">
                        {siteConfig.email}
                    </a>{' '}
                    or message us on WhatsApp with your name and payment reference. We will confirm in writing, and refund to the
                    same account or method you paid from.
                </p>

                <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-ink">Changes to this policy</h2>
                <p className="mt-3 text-slate-600">
                    The policy that applies to you is the version in force when you paid, as confirmed in your written quote.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                    <Link
                        to="/pricing"
                        className="inline-flex h-12 items-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800"
                    >
                        How our pricing works
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex h-12 items-center rounded-full bg-primary-700 px-6 text-sm font-semibold text-white"
                    >
                        Book a free consultation
                    </Link>
                </div>
            </section>
        </>
    );
}

export default RefundPolicyPage;