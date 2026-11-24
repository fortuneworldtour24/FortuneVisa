import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@/i18n';
import './index.css';
import 'flag-icons/css/flag-icons.min.css';
import { loadRemoteDestinations } from '@/lib/visaData';

(async () => {
  try {
    await loadRemoteDestinations();
  } catch {
    // ignore errors, continue rendering
  }
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();