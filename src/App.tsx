import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { ContactPage } from '@/pages/ContactPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { DestinationsPage } from '@/pages/DestinationsPage';
import { DestinationDetailPage } from '@/pages/DestinationDetailPage';
import { CheckerPage } from '@/pages/CheckerPage';
import { ChecklistPage } from '@/pages/ChecklistPage';
import { BlogListPage } from '@/pages/BlogListPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { SectionPage } from '@/pages/SectionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:country" element={<DestinationDetailPage />} />
          <Route path="checker" element={<CheckerPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="checklist" element={<ChecklistPage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<SectionPage section="privacy" />} />
          <Route path="terms" element={<SectionPage section="terms" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
