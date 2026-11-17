import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { getDb } from './db';
import { btnDanger, btnGhost, btnPrimary, Field, ImageUpload, inputCls, Notice, slugify } from './ui';
import type { Msg } from './ui';

type Post = {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string | null;
    category: string | null;
    published_at: string;
    featured: boolean;
    published: boolean;
};

const today = () => new Date().toISOString().slice(0, 10);
const blank = (): Post => ({
    title: '', slug: '', excerpt: '', content: '', cover_image: '', category: '',
    published_at: today(), featured: false, published: true,
});

export function PostsAdmin() {
    const db = getDb();
    const [rows, setRows] = useState<Post[]>([]);
    const [edit, setEdit] = useState<Post | null>(null);
    const [slugTouched, setSlugTouched] = useState(false);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<Msg>(null);

    const load = async () => {
        const { data, error } = await db.from('posts').select('*').order('published_at', { ascending: false });
        if (error) setMsg({ type: 'err', text: error.message });
        else setRows((data ?? []) as Post[]);
    };
    useEffect(() => {
        void load();
    }, []);

    const set = (patch: Partial<Post>) => setEdit((cur) => (cur ? { ...cur, ...patch } : cur));

    const save = async () => {
        if (!edit) return;
        if (!edit.title.trim() || !edit.slug.trim() || !edit.excerpt.trim() || !edit.content.trim()) {
            setMsg({ type: 'err', text: 'Title, slug, excerpt and content are required.' });
            return;
        }
        if (edit.title.length > 200 || edit.slug.length > 120 || edit.excerpt.length > 300) {
            setMsg({ type: 'err', text: 'Title max 200, slug max 120, excerpt max 300 characters.' });
            return;
        }
        setBusy(true);
        const payload = {
            title: edit.title.trim(),
            slug: edit.slug.trim(),
            excerpt: edit.excerpt.trim(),
            content: edit.content,
            cover_image: edit.cover_image || null,
            category: edit.category || null,
            published_at: edit.published_at,
            featured: edit.featured,
            published: edit.published,
        };
        const { error } = edit.id
            ? await db.from('posts').update(payload).eq('id', edit.id)
            : await db.from('posts').insert(payload);
        setBusy(false);
        if (error) {
            setMsg({ type: 'err', text: error.message });
            return;
        }
        setMsg({ type: 'ok', text: 'Saved.' });
        setEdit(null);
        await load();
    };

    const remove = async (p: Post) => {
        if (!p.id || !window.confirm(`Delete "${p.title}"?`)) return;
        const { error } = await db.from('posts').delete().eq('id', p.id);
        if (error) setMsg({ type: 'err', text: error.message });
        else await load();
    };

    if (edit) {
        return (
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">{edit.id ? 'Edit post' : 'New post'}</h1>
                    <button className={btnGhost} onClick={() => setEdit(null)}>Cancel</button>
                </div>
                <Notice msg={msg} />
                <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <Field label="Title">
                            <input
                                className={inputCls}
                                value={edit.title}
                                onChange={(e) => set({ title: e.target.value, ...(!edit.id && !slugTouched ? { slug: slugify(e.target.value) } : {}) })}
                            />
                        </Field>
                    </div>
                    <Field label="URL slug">
                        <input className={inputCls} value={edit.slug} onChange={(e) => { setSlugTouched(true); set({ slug: slugify(e.target.value) }); }} />
                    </Field>
                    <Field label="Category">
                        <input className={inputCls} value={edit.category ?? ''} onChange={(e) => set({ category: e.target.value })} />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label={`Excerpt (${edit.excerpt.length}/300)`}>
                            <textarea rows={2} maxLength={300} className={inputCls} value={edit.excerpt} onChange={(e) => set({ excerpt: e.target.value })} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Content" hint="Markdown: ## Heading, **bold**, - list items, [link](https://…)">
                            <textarea rows={16} className={`${inputCls} font-mono`} value={edit.content} onChange={(e) => set({ content: e.target.value })} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Cover image"><ImageUpload value={edit.cover_image} onChange={(url) => set({ cover_image: url })} /></Field>
                    </div>
                    <Field label="Publish date" hint="Future dates stay hidden until that day.">
                        <input type="date" className={inputCls} value={String(edit.published_at).slice(0, 10)} onChange={(e) => set({ published_at: e.target.value })} />
                    </Field>
                    <div className="flex flex-col justify-end gap-2 pb-1 text-sm font-medium text-slate-700">
                        <label className="flex items-center gap-2"><input type="checkbox" checked={edit.published} onChange={(e) => set({ published: e.target.checked })} /> Published (untick for a draft)</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked={edit.featured} onChange={(e) => set({ featured: e.target.checked })} /> Featured post</label>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className={btnPrimary} disabled={busy} onClick={() => void save()}>{busy ? 'Saving…' : 'Save post'}</button>
                    <button className={btnGhost} onClick={() => setEdit(null)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Blog</h1>
                <button className={btnPrimary} onClick={() => { setSlugTouched(false); setMsg(null); setEdit(blank()); }}>
                    <Plus className="h-4 w-4" /> New post
                </button>
            </div>
            <Notice msg={msg} />
            <div className="divide-y divide-slate-100 rounded-2xl bg-white shadow-sm">
                {rows.map((p) => (
                    <div key={p.id} className="flex flex-wrap items-center gap-3 p-4">
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold text-slate-900">{p.title}</p>
                            <p className="text-xs text-slate-500">
                                {String(p.published_at).slice(0, 10)} · {p.category || 'No category'} · /blog/{p.slug}
                            </p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {p.published ? 'Published' : 'Draft'}
                        </span>
                        <button className={btnGhost} onClick={() => { setSlugTouched(true); setMsg(null); setEdit({ ...p, cover_image: p.cover_image ?? '', category: p.category ?? '', excerpt: p.excerpt ?? '', content: p.content ?? '' }); }}>
                            <Pencil className="h-4 w-4" /> Edit
                        </button>
                        <button className={btnDanger} onClick={() => void remove(p)}><Trash2 className="h-4 w-4" /></button>
                    </div>
                ))}
                {rows.length === 0 ? <p className="p-6 text-center text-slate-500">No posts yet.</p> : null}
            </div>
        </div>
    );
}

export default PostsAdmin;