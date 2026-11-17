import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getDb } from './db';
import { btnDanger, btnGhost, btnPrimary, Field, inputCls, Notice } from './ui';
import type { Msg } from './ui';

type FieldDef = { name: string; label: string; area?: boolean; hint?: string };
type Section = { key: string; label: string; fields?: FieldDef[]; list?: { noun: string; item: FieldDef[] } };

const SECTIONS: Section[] = [
    {
        key: 'about', label: 'About page', fields: [
            { name: 'intro', label: 'Intro under the heading', area: true },
            { name: 'missionTitle', label: 'Mission heading' },
            { name: 'missionBody', label: 'Mission text', area: true },
            { name: 'body', label: 'Extra section (optional)', area: true, hint: 'Markdown supported: ## heading, **bold**, - list.' },
        ]
    },
    {
        key: 'about.values', label: 'About: values', list: {
            noun: 'value', item: [
                { name: 'title', label: 'Title' },
                { name: 'text', label: 'Text', area: true },
            ]
        }
    },
    {
        key: 'about.team', label: 'About: team', list: {
            noun: 'team member', item: [
                { name: 'name', label: 'Name' },
                { name: 'role', label: 'Role' },
                { name: 'bio', label: 'Short bio', area: true },
            ]
        }
    },
    {
        key: 'footer', label: 'Footer', fields: [
            { name: 'tagline', label: 'Tagline' },
            { name: 'disclaimer', label: 'Disclaimer', area: true },
        ]
    },
    { key: 'about', label: 'About page', fields: [{ name: 'body', label: 'Page text', area: true, hint: 'Markdown supported.' }] },
    { key: 'privacy', label: 'Privacy page', fields: [{ name: 'body', label: 'Page text', area: true, hint: 'Markdown supported.' }] },
    { key: 'terms', label: 'Terms page', fields: [{ name: 'body', label: 'Page text', area: true, hint: 'Markdown supported.' }] },
];

type Item = Record<string, string>;

export function ContentAdmin() {
    const db = getDb();
    const [key, setKey] = useState(SECTIONS[0].key);
    const [data, setData] = useState<Record<string, unknown>>({});
    const [msg, setMsg] = useState<Msg>(null);
    const section = SECTIONS.find((s) => s.key === key) as Section;
    const items = (Array.isArray(data.items) ? data.items : []) as Item[];

    useEffect(() => {
        setMsg(null);
        void (async () => {
            const { data: row, error } = await db.from('site_content').select('data').eq('key', key).maybeSingle();
            if (error) setMsg({ type: 'err', text: error.message });
            setData((row?.data as Record<string, unknown>) ?? {});
        })();
    }, [key]);

    const save = async () => {
        const { error } = await db.from('site_content').upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: 'key' });
        setMsg(error ? { type: 'err', text: error.message } : { type: 'ok', text: 'Saved. Changes show on the site after a page reload.' });
    };

    const control = (def: FieldDef, value: string, onChange: (v: string) => void) =>
        def.area ? (
            <textarea rows={def.name === 'body' ? 18 : 3} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
        ) : (
            <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
        );

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-bold text-slate-900">Page content</h1>
            <p className="text-sm text-slate-600">Leave a field empty to keep the text that is built into the website.</p>
            <div className="flex flex-wrap gap-2">
                {SECTIONS.map((s) => (
                    <button key={s.key} className={s.key === key ? btnPrimary : btnGhost} onClick={() => setKey(s.key)}>{s.label}</button>
                ))}
            </div>
            <Notice msg={msg} />

            <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm">
                {section.fields?.map((f) => (
                    <Field key={f.name} label={f.label} hint={f.hint}>
                        {control(f, String(data[f.name] ?? ''), (v) => setData({ ...data, [f.name]: v }))}
                    </Field>
                ))}

                {section.list ? (
                    <>
                        {items.map((it, i) => (
                            <div key={i} className="space-y-3 rounded-xl border border-slate-200 p-4">
                                {section.list!.item.map((f) => (
                                    <Field key={f.name} label={f.label}>
                                        {control(f, it[f.name] ?? '', (v) =>
                                            setData({ ...data, items: items.map((x, idx) => (idx === i ? { ...x, [f.name]: v } : x)) })
                                        )}
                                    </Field>
                                ))}
                                <button className={btnDanger} onClick={() => setData({ ...data, items: items.filter((_, idx) => idx !== i) })}>
                                    <Trash2 className="h-4 w-4" /> Remove
                                </button>
                            </div>
                        ))}
                        <button className={btnGhost} onClick={() => setData({ ...data, items: [...items, {}] })}>
                            <Plus className="h-4 w-4" /> Add {section.list.noun}
                        </button>
                    </>
                ) : null}
            </div>
            <button className={btnPrimary} onClick={() => void save()}>Save changes</button>
        </div>
    );
}

export default ContentAdmin;