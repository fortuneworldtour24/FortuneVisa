import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FileText, Globe, Inbox, LayoutDashboard, LogOut, Menu, Search, Tag, Type, X } from 'lucide-react';
import { getDb } from './db';
import { useNoIndex } from './useNoIndex';

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/destinations', label: 'Destinations', icon: Globe, end: false },
  { to: '/admin/blog', label: 'Blog', icon: FileText, end: false },
  { to: '/admin/offers', label: 'Offers', icon: Tag, end: false },
  { to: '/admin/content', label: 'Page content', icon: Type, end: false },
  { to: '/admin/seo', label: 'SEO', icon: Search, end: false },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox, end: false },
];

export function AdminLayout() {
  useNoIndex();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    const supabase = getDb();
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ' +
    (isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100');

  const nav = (
    <nav className="space-y-1">
      {LINKS.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={linkClass} onClick={() => setOpen(false)}>
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white p-4 lg:flex">
        <div>
          <p className="mb-6 px-3 text-lg font-bold text-slate-900">Fortune Admin</p>
          {nav}
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </aside>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-bold text-slate-900">Fortune Admin</p>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open ? (
          <div className="space-y-2 border-t border-slate-100 p-4">
            {nav}
            <button
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        ) : null}
      </header>

      <main className="min-w-0 flex-1 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;