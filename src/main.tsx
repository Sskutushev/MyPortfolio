import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import './lib/i18n'
import './index.css'
import App from './App.tsx'
import { reportWebVitals, sendToAnalytics, observeLongTasks, observeLayoutShifts } from './lib/performance';

// Axe для development
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

// Мониторинг производительности
if (import.meta.env.PROD) {
  reportWebVitals(sendToAnalytics);
  observeLongTasks();
  observeLayoutShifts();
}
