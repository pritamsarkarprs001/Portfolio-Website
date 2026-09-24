import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ShowcaseSettingsBridge } from './components/ShowcaseSettingsBridge';
import { useReducedMotionPreference } from './hooks/useReducedMotion';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const PublicationDetailPage = lazy(() => import('./pages/PublicationDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CvSourcePage = lazy(() => import('./pages/CvSourcePage'));
const ShowcasePage = lazy(() => import('./pages/ShowcasePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteProgressReset() {
  const location = useLocation();
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!location.hash || location.hash === '#') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }
    let attempts = 0;
    let timer: number | undefined;
    let targetId = '';
    try {
      targetId = decodeURIComponent(location.hash.slice(1));
    } catch {
      return;
    }
    const scrollToHash = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 30) timer = window.setTimeout(scrollToHash, 80);
    };
    timer = window.setTimeout(scrollToHash, 40);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [location.pathname, location.hash, reduceMotion]);

  return null;
}

function LoadingScreen() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <div className="loading-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotionPreference();

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
      <ErrorBoundary>
        <ShowcaseSettingsBridge />
        <AppShell>
          <RouteProgressReset />
          <Suspense fallback={<LoadingScreen />}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
              >
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                  <Route path="/research" element={<ResearchPage />} />
                  <Route path="/research/:slug" element={<PublicationDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/cv" element={<CvSourcePage />} />
                  <Route path="/showcase" element={<ShowcasePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </AppShell>
      </ErrorBoundary>
    </MotionConfig>
  );
}
