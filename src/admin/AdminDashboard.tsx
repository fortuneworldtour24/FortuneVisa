import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDb } from './db';

type Stat = { label: string; to: string; value: number };

export function AdminDashboard() {
    const [stats, setStats] = useState<Stat[]>([]);

    useEffect(() => {
        const db = getDb();
        const count = async (table: string, status?: string) => {
            let q = db.from(table).select('*', { count: 'exact', head: true });
            if (status) q = q.eq('status', status);
            const { count: c } = await q;
            return c ?? 0;
        };
        void (async () => {
            const [newEnq, enq, dest, posts, offers] = await Promise.all([
                count('enquiries', 'new'),
                count('enquiries'),
                count('destinations'),
                count('posts'),
                count('offers'),
            ]);
            setStats([
                { label: 'New enquiries', to: '/admin/enquiries', value: newEnq },
                { label: 'All enquiries', to: '/admin/enquiries', value: enq },
                { label: 'Destinations', to: '/admin/destinations', value: dest },
                { label: 'Blog posts', to: '/admin/blog', value: posts },
                { label: 'Offers', to: '/admin/offers', value: offers },
            ]);
        })();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((s) => (
                    <Link key={s.label} to={s.to} className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                        <p className="text-sm text-slate-500">{s.label}</p>
                        <p className="mt-1 text-3xl font-bold text-slate-900">{s.value}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;