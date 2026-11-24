import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale } from 'lucide-react';

export interface LegalSection {
    id: string;
    title: string;
    body: ReactNode;
}

interface Props {
    title: string;
    intro: string;
    updated: string;
    icon: 'privacy' | 'terms';
    sections: LegalSection[];
}

export function LegalDocument({ title, intro, updated, icon, sections }: Props) {
    const Icon = icon === 'privacy' ? ShieldCheck : Scale;
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <header className="mb-10 max-w-3xl">
                <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{intro}</p>
                <p className="mt-2 text-xs text-slate-500">Last updated: {updated}</p>
            </header>

            <div className="grid gap-8 lg:grid-cols-12">
                <aside className="lg:col-span-4">
                    <nav
                        aria-label="Table of contents"
                        className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card lg:sticky lg:top-28"
                    >
                        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary-700">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            Table of contents
                        </p>
                        <ol className="space-y-2.5 text-sm">
                            {sections.map((s, i) => (
                                <li key={s.id}>
                                    <a href={`#${s.id}`} className="text-slate-600 hover:text-primary-700">
                                        {i + 1}. {s.title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
                            <Link to="/refund-policy" className="font-semibold text-primary-700 hover:underline">Refund policy</Link>
                            {' · '}
                            <Link to="/pricing" className="font-semibold text-primary-700 hover:underline">Pricing</Link>
                        </div>
                    </nav>
                </aside>

                <div className="space-y-6 lg:col-span-8">
                    {sections.map((s, i) => (
                        <section
                            key={s.id}
                            id={s.id}
                            className="scroll-mt-28 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8"
                        >
                            <h2 className="mb-4 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                                {i + 1}. {s.title}
                            </h2>
                            <div className="space-y-3 text-[15px] leading-relaxed text-slate-600 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
                                {s.body}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}