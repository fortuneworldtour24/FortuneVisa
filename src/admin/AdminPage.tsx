export function AdminPage({ title }: { title: string }) {
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 text-slate-600">This screen is coming soon.</p>
        </div>
    );
}

export default AdminPage;