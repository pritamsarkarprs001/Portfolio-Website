import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';
import { ReducedMotionProvider } from './hooks/useReducedMotion';
import { ToastProvider } from './hooks/useToast';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <ReducedMotionProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ReducedMotionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
