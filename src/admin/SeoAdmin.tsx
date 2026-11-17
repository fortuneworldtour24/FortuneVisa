import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { getDb } from './db';
import { btnDanger, btnGhost, btnPrimary, Field, ImageUpload, inputCls, Notice } from './ui';
import type { Msg } from './ui';

type Seo = { path: string; title: string | null; description: string | null; og_image: string | null };
const PAGES = ['/', '/destinations', '/checker', '/services', '/checklist', '/about', '/blog', '/contact', '/privacy', '/terms'];

export function SeoAdmin() {
    const db = getDb();
    const [rows, setRows] = useState<Seo[]>([]);
    const [edit, setEdit] = useState<Seo | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [msg, setMsg] = useState<Msg>(null);

    const load = async () => {
        const { data, error } = await db.from('page_seo').select('*').order('path');
        if (error) setMsg({ type: 'err', text: error.message });
        else setRows((data ?? []) as Seo[]);
    };
    useEffect(() => {
        void load();
    }, []);

    const set = (patch: Partial<Seo>) => setEdit((cur) => (cur ? { ...cur, ...patch } : cur));

    const save = async () => {
        if (!edit) return;
        if (!edit.path.startsWith('/')) {
            setMsg({ type: 'err', text: 'Path must start with /, for example /about or /destinations/australia.' });
            return;
        }
        const { error } = await db
            .from('page_seo')
            .upsert({ ...edit, og_image: edit.og_image || null, updated_at: new Date().toISOString() }, { onConflict: 'path' });
        if (error) {
            setMsg({ type: 'err', text: error.message });
            return;
        }
        setMsg({ type: 'ok', text: 'Saved. Changes show on the site after a page reload.' });
        setEdit(null);
        await load();
    };

    const remove = async (r: Seo) => {
        if (!window.confirm(`Remove SEO override for ${r.path}?`)) return;
        const { error } = await db.from('page_seo').delete().eq('path', r.path);
        if (error) setMsg({ type: 'err', text: error.message });
        else await load();
    };

    if (edit) {
        return (
            <div className="space-y-5">
                <h1 className="text-2xl font-bold text-slate-900">SEO for {edit.path || 'a page'}</h1>
                <Notice msg={msg} />
                <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm">
                    <Field label="Page path"><input className={inputCls} disabled={!isNew} value={edit.path} onChange={(e) => set({ path: e.target.value.trim() })} /></Field>
                    <Field label={`Page title (${(edit.title ?? '').length}/60)`} hint="Shown in Google results and the browser tab.">
                        <input className={inputCls} value={edit.title ?? ''} onChange={(e) => set({ title: e.target.value })} />
                    </Field>
                    <Field label={`Description (${(edit.description ?? '').length}/160)`} hint="The summary under the title in Google.">
                        <textarea rows={3} className={inputCls} value={edit.description ?? ''} onChange={(e) => set({ description: e.target.value })} />
                    </Field>
                    <Field label="Share image (optional)"><ImageUpload value={edit.og_image} onChange={(url) => set({ og_image: url })} /></Field>
                </div>
                <div className="flex gap-3">
                    <button className={btnPrimary} onClick={() => void save()}>Save</button>
                    <button className={btnGhost} onClick={() => setEdit(null)}>Cancel</button>
                </div>
            </div>
        );
    }

    const missing = PAGES.filter((p) => !rows.some((r) => r.path === p));
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">SEO</h1>
                <button className={btnPrimary} onClick={() => { setIsNew(true); setMsg(null); setEdit({ path: '/', title: '', description: '', og_image: '' }); }}>
                    <Plus className="h-4 w-4" /> Add page
                </button>
            </div>
            <Notice msg={msg} />
            {missing.length ? (
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="mb-2 text-sm font-medium text-slate-700">Pages without custom SEO:</p>
                    <div className="flex flex-wrap gap-2">
                        {missing.map((p) => (
                            <button key={p} className={btnGhost} onClick={() => { setIsNew(true); setMsg(null); setEdit({ path: p, title: '', description: '', og_image: '' }); }}>{p}</button>
                        ))}
                    </div>
                </div>
            ) : null}
            <div className="divide-y divide-slate-100 rounded-2xl bg-white shadow-sm">
                {rows.map((r) => (
                    <div key={r.path} className="flex flex-wrap items-center gap-3 p-4">
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold text-slate-900">{r.path}</p>
                            <p className="truncate text-xs text-slate-500">{r.title || 'No title'}</p>
                        </div>
                        <button className={btnGhost} onClick={() => { setIsNew(false); setMsg(null); setEdit({ ...r, og_image: r.og_image ?? '' }); }}><Pencil className="h-4 w-4" /> Edit</button>
                        <button className={btnDanger} onClick={() => void remove(r)}><Trash2 className="h-4 w-4" /></button>
                    </div>
                ))}
                {rows.length === 0 ? <p className="p-6 text-center text-slate-500">No custom SEO yet.</p> : null}
            </div>
        </div>
    );
}

export default SeoAdmin;