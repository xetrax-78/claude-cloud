import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  // Hors ligne après une première visite (public/sw.js)
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {});
  });
}

// Mesure d'audience sans cookies, activée seulement si VITE_PLAUSIBLE_DOMAIN est défini au build
const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
if (import.meta.env.PROD && plausibleDomain) {
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = plausibleDomain;
  script.src = import.meta.env.VITE_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
}
