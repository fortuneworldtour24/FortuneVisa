import { useState } from 'react';
import type { ReactNode } from 'react';
import { getDb } from './db';

export const inputCls =
    'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';
export const btnPrimary =
    'inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60';
export const btnGhost =
    'inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60';
export const btnDanger =
    'inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60';

export type Msg = { type: 'ok' | 'err'; text: string } | null;

export function Notice({ msg }: { msg: Msg }) {
    if (!msg) return null;
    const cls = msg.type === 'ok' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700';
    return (
        <p role="status" className={`rounded-xl px-3 py-2 text-sm ${cls}`}>
            {msg.text}
        </p>
    );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
    return (
        <label className="block text-sm font-medium text-slate-700">
            {label}
            <div className="mt-1">{children}</div>
            {hint ? <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span> : null}
        </label>
    );
}

export const slugify = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function ImageUpload({ value, onChange }: { value: string | null; onChange: (url: string) => void }) {
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');

    const onFile = async (file: File | undefined) => {
        if (!file) return;
        setErr('');
        if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) {
            setErr('Use a JPG, PNG, WebP or GIF image.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setErr('Image must be under 5 MB.');
            return;
        }
        setBusy(true);
        const db = getDb();
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await db.storage.from('site-images').upload(path, file, { cacheControl: '31536000' });
        if (error) {
            setErr(error.message);
            setBusy(false);
            return;
        }
        const { data } = db.storage.from('site-images').getPublicUrl(path);
        onChange(data.publicUrl);
        setBusy(false);
    };

    return (
        <div className="space-y-2">
            {value ? <img src={value} alt="" className="h-32 w-full max-w-xs rounded-xl object-cover" /> : null}
            <input
                type="file"
                accept="image/*"
                disabled={busy}
                onChange={(e) => void onFile(e.target.files?.[0])}
                className="block w-full text-sm"
            />
            <input
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="or paste an image URL"
                className={inputCls}
            />
            {busy ? <p className="text-xs text-slate-500">Uploading…</p> : null}
            {err ? <p className="text-xs text-red-600">{err}</p> : null}
        </div>
    );
}