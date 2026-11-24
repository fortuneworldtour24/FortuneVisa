import { CalendarCheck, CheckCircle2, ExternalLink, ShieldCheck, XCircle } from 'lucide-react';
import { formatMoney } from '@/lib/money';

type Extras = {
    entryRule?: string;
    govtFee?: number;
    vfsFee?: number;
    serviceFee?: number;
    documents?: string[];
    whoCannotApply?: string[];
    insuranceRequired?: boolean;
    officialSourceUrl?: string;
    lastVerified?: string;
};

const RULE_LABELS: Record<string, string> = {
    'visa-free': 'Visa free',
    'visa-on-arrival': 'Visa on arrival',
    'e-visa': 'e-Visa',
    sticker: 'Sticker visa',
    'arrival-card': 'Arrival card',
    eta: 'ETA',
};

const num = (n: unknown): number => (typeof n === 'number' && Number.isFinite(n) && n > 0 ? n : 0);

export function ExtraVisaInfo({ visa }: { visa: object }) {
    const v = visa as Extras;
    const govt = num(v.govtFee);
    const vfs = num(v.vfsFee);
    const service = num(v.serviceFee);
    const total = govt + vfs + service;
    const docs = Array.isArray(v.documents) ? v.documents.filter(Boolean) : [];
    const blocked = Array.isArray(v.whoCannotApply) ? v.whoCannotApply.filter(Boolean) : [];
    const url = typeof v.officialSourceUrl === 'string' && /^https?:\/\//i.test(v.officialSourceUrl) ? v.officialSourceUrl : '';
    const parsed = v.lastVerified ? new Date(v.lastVerified) : null;
    const verified = parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;
    const ageDays = verified ? Math.floor((Date.now() - verified.getTime()) / 86400000) : 0;
    const rule = v.entryRule ? RULE_LABELS[v.entryRule] ?? v.entryRule : '';

    if (!rule && total === 0 && docs.length === 0 && blocked.length === 0 && !url && !verified && !v.insuranceRequired) {
        return null;
    }

    const rows: [string, number][] = (
        [
            ['Government or embassy fee', govt],
            ['Visa centre or partner fee', vfs],
            ['Our service fee', service],
        ] as [string, number][]
    ).filter(([, n]) => n > 0);

    return (
        <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
                {rule ? (
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
                        {rule}
                    </span>
                ) : null}
                {v.insuranceRequired ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Travel insurance required
                    </span>
                ) : null}
            </div>

            {total > 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                    <h3 className="text-base font-bold text-ink">Fee breakdown (indicative)</h3>
                    <dl className="mt-3 divide-y divide-slate-100 text-sm">
                        {rows.map(([label, n]) => (
                            <div key={label} className="flex justify-between gap-4 py-2">
                                <dt className="text-slate-600">{label}</dt>
                                <dd className="font-semibold text-ink">{formatMoney(n)}</dd>
                            </div>
                        ))}
                        <div className="flex justify-between gap-4 py-2 text-base">
                            <dt className="font-bold text-ink">Total</dt>
                            <dd className="font-extrabold text-primary-700">{formatMoney(total)}</dd>
                        </div>
                    </dl>
                    <p className="mt-2 text-xs text-slate-500">
                        Your written quote confirms the current amounts. Payment is arranged after your consultation.
                    </p>
                </div>
            ) : null}

            {docs.length > 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                    <h3 className="text-base font-bold text-ink">Documents usually needed</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {docs.map((d) => (
                            <li key={d} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {blocked.length > 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                    <h3 className="text-base font-bold text-ink">Who this may not suit</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {blocked.map((d) => (
                            <li key={d} className="flex items-start gap-2">
                                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {verified || url ? (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                    {verified ? (
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                            Last verified{' '}
                            {verified.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    ) : null}
                    {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-primary-700 underline">
                            Official source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                    ) : null}
                    {verified && ageDays > 60 ? (
                        <span className="font-semibold text-amber-700">
                            This may be out of date. We confirm current rules before you apply.
                        </span>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default ExtraVisaInfo;