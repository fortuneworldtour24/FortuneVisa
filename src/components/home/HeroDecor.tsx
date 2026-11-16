import visasJson from '@/data/visas.json';

type Item = { slug: string; country: string; iso_code?: string; imageUrl?: string };

const raw = visasJson as unknown as Item[] | { countries: Item[] };
const list: Item[] = Array.isArray(raw) ? raw : raw.countries ?? [];

function Flag({ code, size = 28 }: { code?: string; size?: number }) {
    if (!code) return null;
    return (
        <span
            className="inline-flex shrink-0 overflow-hidden rounded-full ring-2 ring-white/80"
            style={{ width: size, height: size }}
        >
            <span className={`fi fis fi-${code.toLowerCase()}`} style={{ fontSize: size, lineHeight: 1 }} />
        </span>
    );
}

export function HeroBackdrop() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white"
        >
            <div className="anim-blob absolute -left-16 top-10 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl" />
            <div
                className="anim-blob absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-amber-300/40 blur-3xl"
                style={{ animationDelay: '3s' }}
            />
        </div>
    );
}

const slots = [
    { pos: 'left-0 top-8', rot: '-6deg', delay: '0s' },
    { pos: 'right-0 top-0', rot: '4deg', delay: '1s' },
    { pos: 'left-24 bottom-0', rot: '-2deg', delay: '2s' },
];

export function HeroImages() {
    const picks = list.filter((c) => c.imageUrl).slice(0, 3);
    if (picks.length === 0) return null;

    return (
        <>
            {/* Desktop: overlapping floating cards */}
            <div className="relative hidden h-[30rem] lg:block">
                {picks.map((c, i) => (
                    <div
                        key={c.slug}
                        className={`anim-float absolute w-56 overflow-hidden rounded-3xl shadow-2xl ${slots[i].pos}`}
                        style={{ ['--r' as string]: slots[i].rot, animationDelay: slots[i].delay } as React.CSSProperties}
                    >
                        <div className="relative aspect-[3/4] bg-gradient-to-br from-indigo-500 to-indigo-800">
                            <img src={c.imageUrl} alt={c.country} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-bold uppercase text-white">
                                <Flag code={c.iso_code} size={28} />
                                {c.country}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile and tablet: horizontal scroll row */}
            <div className="-mx-4 overflow-x-auto px-4 pb-4 lg:hidden">
                <div className="flex gap-3">
                    {picks.map((c) => (
                        <div key={c.slug} className="relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-2xl shadow-lg sm:w-48">
                            <img src={c.imageUrl} alt={c.country} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-xs font-bold uppercase text-white">
                                <Flag code={c.iso_code} size={22} />
                                {c.country}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export function CountryMarquee() {
    if (list.length === 0) return null;
    const row = [...list, ...list];
    return (
        <div className="overflow-hidden border-y border-slate-200 bg-white py-4" aria-label="Destinations we help with">
            <div className="anim-marquee flex">
                {row.map((c, i) => (
                    <span key={c.slug + i} className="flex items-center gap-2 whitespace-nowrap pr-10 text-sm font-semibold text-slate-600">
                        <Flag code={c.iso_code} size={22} />
                        {c.country}
                    </span>
                ))}
            </div>
        </div>
    );
}