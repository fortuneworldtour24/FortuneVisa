import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { getDb } from './db';
import { btnDanger, btnGhost, btnPrimary, Field, inputCls, Notice } from './ui';
import type { Msg } from './ui';

type Offer = {
    id?: string;
    title: string;
    body: string | null;
    link_url: string | null;
    badge: string | null;
    starts_at: string | null;
    ends_at: string | null;
    active: boolean;
};

const toLocal = (iso: string | null) => {
    if (!iso) return '';
    const d = new Date(iso);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};
const fromLocal = (v: string) => (v ? new Date(v).toISOString() : null);
const blank = (): Offer => ({ title: '', body: '', link_url: '', badge: '', starts_at: null, ends_at: null, active: true });

export function OffersAdmin() {
    const db = getDb();
    const [rows, setRows] = useState<Offer[]>([]);
    const [edit, setEdit] = useState<Offer | null>(null);
    const [msg, setMsg] = useState<Msg>(null);

    const load = async () => {
        const { data, error } = await db.from('offers').select('*').order('created_at', { ascending: false });
        if (error) setMsg({ type: 'err', text: error.message });
        else setRows((data ?? []) as Offer[]);
    };
    useEffect(() => {
        void load();
    }, []);

    const set = (patch: Partial<Offer>) => setEdit((cur) => (cur ? { ...cur, ...patch } : cur));

    const save = async () => {
        if (!edit) return;
        if (!edit.title.trim()) {
            setMsg({ type: 'err', text: 'Title is required.' });
            return;
        }
        const payload = {
            title: edit.title.trim(),
            body: edit.body || null,
            link_url: edit.link_url || null,
            badge: edit.badge || null,
            starts_at: edit.starts_at,
            ends_at: edit.ends_at,
            active: edit.active,
        };
        const { error } = edit.id
            ? await db.from('offers').update(payload).eq('id', edit.id)
            : await db.from('offers').insert(payload);
        if (error) {
            setMsg({ type: 'err', text: error.message });
            return;
        }
        setMsg({ type: 'ok', text: 'Saved.' });
        setEdit(null);
        await load();
    };

    const remove = async (o: Offer) => {
        if (!o.id || !window.confirm(`Delete "${o.title}"?`)) return;
        const { error } = await db.from('offers').delete().eq('id', o.id);
        if (error) setMsg({ type: 'err', text: error.message });
        else await load();
    };

    if (edit) {
        return (
            <div className="space-y-5">
                <h1 className="text-2xl font-bold text-slate-900">{edit.id ? 'Edit offer' : 'New offer'}</h1>
                <Notice msg={msg} />
                <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2">
                    <div className="sm:col-span-2"><Field label="Headline"><input className={inputCls} value={edit.title} onChange={(e) => set({ title: e.target.value })} /></Field></div>
                    <div className="sm:col-span-2"><Field label="Details (optional)"><textarea rows={2} className={inputCls} value={edit.body ?? ''} onChange={(e) => set({ body: e.target.value })} /></Field></div>
                    <Field label="Badge (optional)" hint="e.g. New, Limited time"><input className={inputCls} value={edit.badge ?? ''} onChange={(e) => set({ badge: e.target.value })} /></Field>
                    <Field label="Link (optional)" hint="/contact or https://…"><input className={inputCls} value={edit.link_url ?? ''} onChange={(e) => set({ link_url: e.target.value })} /></Field>
                    <Field label="Starts (optional)"><input type="datetime-local" className={inputCls} value={toLocal(edit.starts_at)} onChange={(e) => set({ starts_at: fromLocal(e.target.value) })} /></Field>
                    <Field label="Ends (optional)"><input type="datetime-local" className={inputCls} value={toLocal(edit.ends_at)} onChange={(e) => set({ ends_at: fromLocal(e.target.value) })} /></Field>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <input type="checkbox" checked={edit.active} onChange={(e) => set({ active: e.target.checked })} /> Active
                    </label>
                </div>
                <div className="flex gap-3">
                    <button className={btnPrimary} onClick={() => void save()}>Save offer</button>
                    <button className={btnGhost} onClick={() => setEdit(null)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Offers</h1>
                <button className={btnPrimary} onClick={() => { setMsg(null); setEdit(blank()); }}><Plus className="h-4 w-4" /> New offer</button>
            </div>
            <p className="text-sm text-slate-600">The newest active offer inside its date range shows as a banner at the top of every public page.</p>
            <Notice msg={msg} />
            <div className="divide-y divide-slate-100 rounded-2xl bg-white shadow-sm">
                {rows.map((o) => (
                    <div key={o.id} className="flex flex-wrap items-center gap-3 p-4">
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold text-slate-900">{o.title}</p>
                            <p className="text-xs text-slate-500">
                                {o.starts_at ? o.starts_at.slice(0, 10) : 'No start'} → {o.ends_at ? o.ends_at.slice(0, 10) : 'No end'}
                            </p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${o.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{o.active ? 'Active' : 'Off'}</span>
                        <button className={btnGhost} onClick={() => { setMsg(null); setEdit(o); }}><Pencil className="h-4 w-4" /> Edit</button>
                        <button className={btnDanger} onClick={() => void remove(o)}><Trash2 className="h-4 w-4" /></button>
                    </div>
                ))}
                {rows.length === 0 ? <p className="p-6 text-center text-slate-500">No offers yet.</p> : null}
            </div>
        </div>
    );
}

export default OffersAdmin;