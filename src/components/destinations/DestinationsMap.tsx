import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight, X } from 'lucide-react';
import { buildEnquiryPath } from '@/lib/visaData';
import type { Destination } from '@/lib/visaData';
import { formatMoney } from '@/lib/money';
import { FlagIcon } from '@/components/FlagSelect';

type D = Destination & { iso_code?: string; lat?: number | null; lng?: number | null };

// Used when a destination has no lat/lng saved
const COORDS: Record<string, [number, number]> = {
    au: [-25.3, 133.8], us: [39.8, -98.6], gb: [54.0, -2.5], ca: [56.1, -106.3], nz: [-41.0, 172.8],
    eu: [48.5, 10.0], ae: [24.3, 54.4], sg: [1.35, 103.82], jp: [36.2, 138.3], in: [22.0, 79.0],
    th: [15.9, 101.0], my: [4.2, 102.0], id: [-2.5, 118.0], vn: [14.1, 108.3], lk: [7.9, 80.8],
    np: [28.4, 84.1], de: [51.2, 10.4], fr: [46.6, 2.4], it: [42.8, 12.6], es: [40.2, -3.7],
    tr: [39.0, 35.2], qa: [25.3, 51.2], sa: [24.0, 45.0], za: [-29.0, 24.0], kr: [36.5, 127.8],
    cn: [35.0, 103.0], hk: [22.3, 114.2], mx: [23.6, -102.5], br: [-10.0, -52.0],
};

const esc = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

function pinIcon(name: string, code: string, active: boolean) {
    const safe = /^[a-z]{2}$/.test(code) ? code : '';
    const flag = safe ? `<span class="fm-flag"><span class="fi fis fi-${safe}"></span></span>` : '';
    return L.divIcon({
        className: 'fm-icon',
        iconSize: [0, 0],
        html: `<div class="fm-pin${active ? ' is-active' : ''}">${flag}<span>${esc(name)}</span></div>`,
    });
}

function FitBounds({ points, signature }: { points: [number, number][]; signature: string }) {
    const map = useMap();
    useEffect(() => {
        if (points.length === 0) return;
        if (points.length === 1) {
            map.setView(points[0], 4);
            return;
        }
        map.fitBounds(L.latLngBounds(points), { padding: [50, 50], maxZoom: 4 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, signature]);
    return null;
}

export function DestinationsMap({ destinations }: { destinations: Destination[] }) {
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

    const items = useMemo(
        () =>
            (destinations as D[])
                .map((d) => {
                    const code = (d.iso_code ?? '').toLowerCase();
                    const pos: [number, number] | null =
                        typeof d.lat === 'number' && typeof d.lng === 'number' ? [d.lat, d.lng] : COORDS[code] ?? null;
                    return pos ? { d, code, pos } : null;
                })
                .filter((x): x is { d: D; code: string; pos: [number, number] } => x !== null),
        [destinations]
    );

    const signature = items.map((i) => i.d.slug).join('|');
    const points = useMemo(() => items.map((i) => i.pos), [signature]); // eslint-disable-line react-hooks/exhaustive-deps
    const sel = items.find((i) => i.d.slug === selectedSlug);
    const visa = sel?.d.visaTypes?.[0];

    if (items.length === 0) {
        return (
            <div className="flex h-[40vh] items-center justify-center rounded-3xl border border-dashed border-slate-300 text-slate-500">
                No destinations to show on the map.
            </div>
        );
    }

    return (
        <div className="relative isolate h-[60vh] min-h-[380px] overflow-hidden rounded-3xl border border-slate-200 lg:h-[70vh]">
            <MapContainer
                center={[20, 40]}
                zoom={2}
                minZoom={2}
                worldCopyJump
                scrollWheelZoom={false}
                className="h-full w-full"
                style={{ background: '#dbeafe' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitBounds points={points} signature={signature} />
                {items.map(({ d, code, pos }) => (
                    <Marker
                        key={d.slug}
                        position={pos}
                        icon={pinIcon(d.country, code, d.slug === selectedSlug)}
                        eventHandlers={{ click: () => setSelectedSlug(d.slug) }}
                        title={d.country}
                    />
                ))}
            </MapContainer>

            {sel ? (
                <div className="absolute inset-x-3 bottom-3 z-[1000] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 sm:inset-x-auto sm:bottom-auto sm:left-4 sm:top-4 sm:w-72">
                    <div className="relative h-32 bg-gradient-to-br from-indigo-600 to-indigo-900">
                        {sel.d.imageUrl ? (
                            <img src={sel.d.imageUrl} alt={sel.d.country} loading="lazy" className="h-full w-full object-cover" />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-2 left-3 flex items-center gap-2 text-white">
                            <FlagIcon code={sel.code} size={26} />
                            <span className="text-lg font-extrabold uppercase tracking-wide">{sel.d.country}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSelectedSlug(null)}
                            aria-label="Close"
                            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="p-4">
                        {visa ? (
                            <dl className="space-y-1.5 text-xs">
                                <div className="flex justify-between gap-3">
                                    <dt className="uppercase tracking-wide text-slate-500">Type</dt>
                                    <dd className="font-semibold capitalize text-ink">{visa.type}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="uppercase tracking-wide text-slate-500">Valid</dt>
                                    <dd className="text-right font-semibold text-ink">{visa.validity}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="uppercase tracking-wide text-slate-500">Fees</dt>
                                    <dd className="font-semibold text-ink">
                                        {visa.indicativeFee > 0 ? formatMoney(visa.indicativeFee) : 'On request'}
                                    </dd>
                                </div>
                            </dl>
                        ) : null}
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <Link
                                to={`/destinations/${sel.d.slug}`}
                                className="flex h-11 items-center justify-center gap-1 rounded-full border border-slate-300 text-sm font-semibold text-slate-800"
                            >
                                Details
                            </Link>
                            <Link
                                to={buildEnquiryPath({ destination: sel.d.slug, visaType: visa?.type ?? '' })}
                                className="flex h-11 items-center justify-center gap-1 rounded-full bg-primary-700 text-sm font-semibold text-white"
                            >
                                Enquire <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default DestinationsMap;