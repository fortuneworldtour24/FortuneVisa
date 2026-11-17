import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { DestinationsPage } from '@/pages/DestinationsPage';
import { DestinationDetailPage } from '@/pages/DestinationDetailPage';
import { CheckerPage } from '@/pages/CheckerPage';
import { ChecklistPage } from '@/pages/ChecklistPage';
import { BlogListPage } from '@/pages/BlogListPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';

// Admin screens load only when someone opens /admin
const AdminLogin = lazy(() => import('@/admin/AdminLogin'));
const AdminGuard = lazy(() => import('@/admin/AdminGuard'));
const AdminLayout = lazy(() => import('@/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/admin/AdminDashboard'));
const DestinationsAdmin = lazy(() => import('@/admin/DestinationsAdmin'));
const PostsAdmin = lazy(() => import('@/admin/PostsAdmin'));
const OffersAdmin = lazy(() => import('@/admin/OffersAdmin'));
const ContentAdmin = lazy(() => import('@/admin/ContentAdmin'));
const SeoAdmin = lazy(() => import('@/admin/SeoAdmin'));
const EnquiriesAdmin = lazy(() => import('@/admin/EnquiriesAdmin'));

const adminFallback = (
  <div className="flex min-h-screen items-center justify-center p-4 text-slate-500">Loading…</div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:country" element={<DestinationDetailPage />} />
          <Route path="checker" element={<CheckerPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="checklist" element={<ChecklistPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>

        {/* Admin: no public header, footer, WhatsApp button or cookie banner */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={adminFallback}>
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={adminFallback}>
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            </Suspense>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="destinations" element={<DestinationsAdmin />} />
          <Route path="blog" element={<PostsAdmin />} />
          <Route path="offers" element={<OffersAdmin />} />
          <Route path="content" element={<ContentAdmin />} />
          <Route path="seo" element={<SeoAdmin />} />
          <Route path="enquiries" element={<EnquiriesAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;