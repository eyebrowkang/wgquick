import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LocaleProvider } from './i18n/LocaleProvider.tsx';
import { initAnalytics } from './lib/analytics.ts';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('#root element not found');
}

initAnalytics();

createRoot(rootElement).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
