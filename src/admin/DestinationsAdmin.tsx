import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { getDb } from './db';
import { btnDanger, btnGhost, btnPrimary, Field, ImageUpload, inputCls, Notice, slugify } from './ui';
import type { Msg } from './ui';

type VisaTypeRow = {
    type: string;
    required: boolean;
    indicativeFee: number;
    validity: string;
    processingTime: string;
    notes: string;
    [key: string]: unknown;
};
type Faq = { question: string; answer: string };
type Row = {
    slug: string;
    country: string;
    iso_code: string;
    image_url: string | null;
    lat: number | null;
    lng: number | null;
    visa_types: VisaTypeRow[];
    faqs: Faq[];
    related: string[];
    published: boolean;
    sort_order: number;
};

const blank = (order: number): Row => ({
    slug: '', country: '', iso_code: '', image_url: '', lat: null, lng: null,
    visa_types: [], faqs: [], related: [], published: true, sort_order: order,
});
const blankVisa = (): VisaTypeRow => ({
    type: 'tourist', required: true, indicativeFee: 0, validity: '', processingTime: '', notes: '',
});

export function DestinationsAdmin() {
    const db = getDb();
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState('');
    const [edit, setEdit] = useState<Row | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<Msg>(null);

    const load = async () => {
        setLoading(true);
        const { data, error } = await db.from('destinations').select('*').order('sort_order');
        if (error) setMsg({ type: 'err', text: error.message });
        else setRows((data ?? []) as Row[]);
        setLoading(false);
    };
    useEffect(() => {
        void load();
    }, []);

    const set = (patch: Partial<Row>) => setEdit((cur) => (cur ? { ...cur, ...patch } : cur));
    const setVisa = (i: number, patch: Partial<VisaTypeRow>) =>
        setEdit((cur) =>
            cur ? { ...cur, visa_types: cur.visa_types.map((v, idx) => (idx === i ? { ...v, ...patch } : v)) } : cur
        );
    const setFaq = (i: number, patch: Partial<Faq>) =>
        setEdit((cur) => (cur ? { ...cur, faqs: cur.faqs.map((f, idx) => (idx === i ? { ...f, ...patch } : f)) } : cur));

    const save = async () => {
        if (!edit) return;
        if (!edit.country.trim() || !edit.slug.trim()) {
            setMsg({ type: 'err', text: 'Country and slug are required.' });
            return;
        }
        if (!/^[a-z]{2}$/i.test(edit.iso_code.trim())) {
            setMsg({ type: 'err', text: 'ISO code must be 2 letters, for example au.' });
            return;
        }
        if (isNew && rows.some((r) => r.slug === edit.slug)) {
            setMsg({ type: 'err', text: 'That slug already exists.' });
            return;
        }
        setBusy(true);
        const payload = {
            ...edit,
            iso_code: edit.iso_code.trim().toLowerCase(),
            image_url: edit.image_url || null,
            updated_at: new Date().toISOString(),
        };
        const { error } = await db.from('destinations').upsert(payload, { onConflict: 'slug' });
        setBusy(false);
        if (error) {
            setMsg({ type: 'err', text: error.message });
            return;
        }
        setMsg({ type: 'ok', text: 'Saved.' });
        setEdit(null);
        await load();
    };

    const togglePublished = async (r: Row) => {
        const { error } = await db.from('destinations').update({ published: !r.published }).eq('slug', r.slug);
        if (error) setMsg({ type: 'err', text: error.message });
        else await load();
    };

    const remove = async (r: Row) => {
        if (!window.confirm(`Delete ${r.country}? This cannot be undone. (Hide it instead to keep the data.)`)) return;
        const { error } = await db.from('destinations').delete().eq('slug', r.slug);
        if (error) setMsg({ type: 'err', text: error.message });
        else await load();
    };

    const move = async (i: number, dir: -1 | 1) => {
        const j = i + dir;
        if (j < 0 || j >= rows.length) return;
        const next = [...rows];
        [next[i], next[j]] = [next[j], next[i]];
        setRows(next);
        const results = await Promise.all(
            next.map((r, idx) => db.from('destinations').update({ sort_order: idx }).eq('slug', r.slug))
        );
        const failed = results.find((r) => r.error);
        if (failed?.error) setMsg({ type: 'err', text: failed.error.message });
    };

    if (edit) {
        return (
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">{isNew ? 'Add destination' : `Edit ${edit.country}`}</h1>
                    <button className={btnGhost} onClick={() => setEdit(null)}>Cancel</button>
                </div>
                <Notice msg={msg} />

                <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2">
                    <Field label="Country name">
                        <input
                            className={inputCls}
                            value={edit.country}
                            onChange={(e) => set({ country: e.target.value, ...(isNew ? { slug: slugify(e.target.value) } : {}) })}
                        />
                    </Field>
                    <Field label="URL slug" hint={isNew ? 'Used in the page address.' : 'Cannot be changed after creation.'}>
                        <input className={inputCls} value={edit.slug} disabled={!isNew} onChange={(e) => set({ slug: slugify(e.target.value) })} />
                    </Field>
                    <Field label="ISO code (2 letters)" hint="For the flag, e.g. au, us, gb. Schengen uses eu.">
                        <div className="flex items-center gap-3">
                            <input className={inputCls} maxLength={2} value={edit.iso_code} onChange={(e) => set({ iso_code: e.target.value.toLowerCase() })} />
                            {edit.iso_code.length === 2 ? (
                                <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200">
                                    <span className={`fi fis fi-${edit.iso_code}`} style={{ fontSize: 36, lineHeight: 1 }} />
                                </span>
                            ) : null}
                        </div>
                    </Field>
                    <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-slate-700">
                        <input type="checkbox" checked={edit.published} onChange={(e) => set({ published: e.target.checked })} />
                        Visible on the website
                    </label>
                    <Field label="Latitude" hint="For the map, e.g. -25.27">
                        <input type="number" step="any" className={inputCls} value={edit.lat ?? ''} onChange={(e) => set({ lat: e.target.value === '' ? null : Number(e.target.value) })} />
                    </Field>
                    <Field label="Longitude" hint="e.g. 133.77">
                        <input type="number" step="any" className={inputCls} value={edit.lng ?? ''} onChange={(e) => set({ lng: e.target.value === '' ? null : Number(e.target.value) })} />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Photo">
                            <ImageUpload value={edit.image_url} onChange={(url) => set({ image_url: url })} />
                        </Field>
                    </div>
                </div>

                <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Visa types</h2>
                        <button className={btnGhost} onClick={() => set({ visa_types: [...edit.visa_types, blankVisa()] })}>
                            <Plus className="h-4 w-4" /> Add visa type
                        </button>
                    </div>
                    {edit.visa_types.map((v, i) => (
                        <div key={i} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
                            <Field label="Type"><input className={inputCls} value={v.type} onChange={(e) => setVisa(i, { type: e.target.value })} /></Field>
                            <Field label="Indicative fee (INR)"><input type="number" className={inputCls} value={v.indicativeFee} onChange={(e) => setVisa(i, { indicativeFee: Number(e.target.value) })} /></Field>
                            <Field label="Validity"><input className={inputCls} value={v.validity} onChange={(e) => setVisa(i, { validity: e.target.value })} /></Field>
                            <Field label="Typical processing time"><input className={inputCls} value={v.processingTime} onChange={(e) => setVisa(i, { processingTime: e.target.value })} /></Field>
                            <div className="sm:col-span-2">
                                <Field label="Notes"><textarea rows={2} className={inputCls} value={v.notes} onChange={(e) => setVisa(i, { notes: e.target.value })} /></Field>
                            </div>
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={v.required} onChange={(e) => setVisa(i, { required: e.target.checked })} /> Visa required
                            </label>
                            <button className={`${btnDanger} justify-self-end`} onClick={() => set({ visa_types: edit.visa_types.filter((_, idx) => idx !== i) })}>
                                <Trash2 className="h-4 w-4" /> Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">FAQs</h2>
                        <button className={btnGhost} onClick={() => set({ faqs: [...edit.faqs, { question: '', answer: '' }] })}>
                            <Plus className="h-4 w-4" /> Add FAQ
                        </button>
                    </div>
                    {edit.faqs.map((f, i) => (
                        <div key={i} className="space-y-2 rounded-xl border border-slate-200 p-4">
                            <input className={inputCls} placeholder="Question" value={f.question} onChange={(e) => setFaq(i, { question: e.target.value })} />
                            <textarea rows={2} className={inputCls} placeholder="Answer" value={f.answer} onChange={(e) => setFaq(i, { answer: e.target.value })} />
                            <button className={btnDanger} onClick={() => set({ faqs: edit.faqs.filter((_, idx) => idx !== i) })}>
                                <Trash2 className="h-4 w-4" /> Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <h2 className="mb-3 text-lg font-semibold">Related destinations</h2>
                    <div className="grid gap-2 sm:grid-cols-3">
                        {rows.filter((r) => r.slug !== edit.slug).map((r) => (
                            <label key={r.slug} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={edit.related.includes(r.slug)}
                                    onChange={(e) =>
                                        set({ related: e.target.checked ? [...edit.related, r.slug] : edit.related.filter((s) => s !== r.slug) })
                                    }
                                />
                                {r.country}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className={btnPrimary} onClick={() => void save()} disabled={busy}>{busy ? 'Saving…' : 'Save destination'}</button>
                    <button className={btnGhost} onClick={() => setEdit(null)}>Cancel</button>
                </div>
            </div>
        );
    }

    const shown = rows.filter((r) => r.country.toLowerCase().includes(q.toLowerCase()));
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
                <button
                    className={btnPrimary}
                    onClick={() => {
                        setIsNew(true);
                        setMsg(null);
                        setEdit(blank(rows.length));
                    }}
                >
                    <Plus className="h-4 w-4" /> Add destination
                </button>
            </div>
            <Notice msg={msg} />
            <input className={`${inputCls} max-w-xs`} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
            {loading ? <p className="text-slate-500">Loading…</p> : null}
            <div className="divide-y divide-slate-100 rounded-2xl bg-white shadow-sm">
                {shown.map((r) => {
                    const i = rows.findIndex((x) => x.slug === r.slug);
                    return (
                        <div key={r.slug} className="flex flex-wrap items-center gap-3 p-4">
                            <span className="inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200">
                                <span className={`fi fis fi-${r.iso_code}`} style={{ fontSize: 32, lineHeight: 1 }} />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-slate-900">{r.country}</p>
                                <p className="text-xs text-slate-500">/{r.slug} · {r.visa_types?.length ?? 0} visa types</p>
                            </div>
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={r.published} onChange={() => void togglePublished(r)} /> Visible
                            </label>
                            <button className={btnGhost} aria-label="Move up" disabled={i === 0 || !!q} onClick={() => void move(i, -1)}><ArrowUp className="h-4 w-4" /></button>
                            <button className={btnGhost} aria-label="Move down" disabled={i === rows.length - 1 || !!q} onClick={() => void move(i, 1)}><ArrowDown className="h-4 w-4" /></button>
                            <button className={btnGhost} onClick={() => { setIsNew(false); setMsg(null); setEdit({ ...r, image_url: r.image_url ?? '' }); }}>
                                <Pencil className="h-4 w-4" /> Edit
                            </button>
                            <button className={btnDanger} onClick={() => void remove(r)}><Trash2 className="h-4 w-4" /></button>
                        </div>
                    );
                })}
                {!loading && shown.length === 0 ? <p className="p-6 text-center text-slate-500">No destinations.</p> : null}
            </div>
        </div>
    );
}

export default DestinationsAdmin;