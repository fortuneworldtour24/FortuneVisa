import { useEffect, useMemo, useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { getDb } from './db';
import { btnDanger, btnGhost, inputCls, Notice } from './ui';
import type { Msg } from './ui';

type Row = Record<string, unknown> & { id: string; created_at: string; status?: string };
const STATUSES = ['new', 'contacted', 'closed'];

const toCsv = (rows: Row[]) => {
    const keys = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
    const esc = (v: unknown) => {
        let s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
        if (/^[=+\-@]/.test(s)) s = "'" + s;
        return '"' + s.replace(/"/g, '""') + '"';
    };
    return [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n');
};

export function EnquiriesAdmin() {
    const db = getDb();
    const [rows, setRows] = useState<Row[]>([]);
    const [filter, setFilter] = useState('all');
    const [q, setQ] = useState('');
    const [open, setOpen] = useState<Row | null>(null);
    const [msg, setMsg] = useState<Msg>(null);

    const load = async () => {
        const { data, error } = await db.from('enquiries').select('*').order('created_at', { ascending: false });
        if (error) setMsg({ type: 'err', text: error.message });
        else setRows((data ?? []) as Row[]);
    };
    useEffect(() => {
        void load();
    }, []);

    const shown = useMemo(
        () =>
            rows.filter(
                (r) =>
                    (filter === 'all' || (r.status ?? 'new') === filter) &&
                    (!q || JSON.stringify(r).toLowerCase().includes(q.toLowerCase()))
            ),
        [rows, filter, q]
    );

    const setStatus = async (id: string, status: string) => {
        const { error } = await db.from('enquiries').update({ status }).eq('id', id);
        if (error) setMsg({ type: 'err', text: error.message });
        else {
            setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
            setOpen((o) => (o && o.id === id ? { ...o, status } : o));
        }
    };

    const remove = async (id: string) => {
        if (!window.confirm('Delete this enquiry permanently?')) return;
        const { error } = await db.from('enquiries').delete().eq('id', id);
        if (error) setMsg({ type: 'err', text: error.message });
        else {
            setOpen(null);
            await load();
        }
    };

    const exportCsv = () => {
        const blob = new Blob([toCsv(shown)], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
                <button className={btnGhost} onClick={exportCsv} disabled={shown.length === 0}>
                    <Download className="h-4 w-4" /> Export CSV
                </button>
            </div>
            <Notice msg={msg} />
            <div className="flex flex-wrap gap-3">
                <input className={`${inputCls} max-w-xs`} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
                <select className={`${inputCls} max-w-[10rem]`} value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All statuses</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shown.map((r) => (
                            <tr key={r.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50" onClick={() => setOpen(r)}>
                                <td className="whitespace-nowrap px-4 py-3">{String(r.created_at).slice(0, 10)}</td>
                                <td className="px-4 py-3 font-medium">{String(r.full_name ?? '')}</td>
                                <td className="px-4 py-3">{String(r.email ?? '')}</td>
                                <td className="px-4 py-3">{String(r.phone ?? '')}</td>
                                <td className="px-4 py-3">{r.status ?? 'new'}</td>
                            </tr>
                        ))}
                        {shown.length === 0 ? (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No enquiries.</td></tr>
                        ) : null}
                    </tbody>
                </table>
            </div>

            {open ? (
                <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold">Enquiry details</h2>
                        <div className="flex gap-2">
                            <select className={inputCls} value={open.status ?? 'new'} onChange={(e) => void setStatus(open.id, e.target.value)}>
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <button className={btnDanger} onClick={() => void remove(open.id)}>
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                            <button className={btnGhost} onClick={() => setOpen(null)}>Close</button>
                        </div>
                    </div>
                    <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                        {Object.entries(open)
                            .filter(([k]) => k !== 'id')
                            .map(([k, v]) => (
                                <div key={k}>
                                    <dt className="text-xs uppercase text-slate-500">{k.replace(/_/g, ' ')}</dt>
                                    <dd className="break-words">{v == null || v === '' ? '—' : typeof v === 'object' ? JSON.stringify(v) : String(v)}</dd>
                                </div>
                            ))}
                    </dl>
                </div>
            ) : null}
        </div>
    );
}

export default EnquiriesAdmin;