import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X, Command } from 'lucide-react';
import { profile } from '../data/profile';
import { useTheme } from '../hooks/useTheme';
import { useReducedMotionPreference } from '../hooks/useReducedMotion';
import { CvDownloadButton } from './CvDownloadButton';

const homeSections = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

function isCurrentPath(pathname: string, target: string) {
  const sectionRoutes: Record<string, string> = {
    '/#about': '/about',
    '/#research': '/research',
    '/#projects': '/projects',
    '/#contact': '/contact',
  };
  const route = sectionRoutes[target];
  if (route)
    return pathname === route || (route === '/projects' && pathname.startsWith('/projects/'));
  return pathname === target || (target !== '/' && pathname.startsWith(`${target}/`));
}

export function Header({ onOpenPalette }: { onOpenPalette: () => void }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotionPreference();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMobileOpen = useRef(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/' || !('IntersectionObserver' in window)) {
      setActiveSection('');
      return;
    }
    let observer: IntersectionObserver | undefined;
    let retryTimer: number | undefined;
    let mutationObserver: MutationObserver | undefined;
    let attempts = 0;
    const setupObserver = () => {
      const sections = homeSections
        .map(({ id }) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));
      if (!sections.length) {
        attempts += 1;
        if (attempts < 30) retryTimer = window.setTimeout(setupObserver, 120);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) setActiveSection(visible[0].target.id);
        },
        { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] },
      );
      sections.forEach((section) => observer?.observe(section));
      mutationObserver?.disconnect();
    };
    retryTimer = window.setTimeout(setupObserver, 80);
    if ('MutationObserver' in window) {
      mutationObserver = new MutationObserver(() => {
        if (!observer) setupObserver();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
    return () => {
      if (retryTimer) window.clearTimeout(retryTimer);
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (wasMobileOpen.current && !mobileOpen) menuButtonRef.current?.focus();
    wasMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    if (!mobileOpen) return;
    const timer = window.setTimeout(() => mobileCloseRef.current?.focus(), 50);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
      if (event.key === 'Tab') {
        const focusable = mobileDrawerRef.current?.querySelectorAll<HTMLElement>(
          'a, button:not([disabled])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const navItems = useMemo(
    () => [
      { to: '/#about', label: 'About', id: 'about' },
      { to: '/#research', label: 'Research', id: 'research' },
      { to: '/#projects', label: 'Projects', id: 'projects' },
      { to: '/#experience', label: 'Experience', id: 'experience' },
      { to: '/#contact', label: 'Contact', id: 'contact' },
    ],
    [],
  );

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container-wide header-inner">
          <Link to="/" className="brand" aria-label="Pritam Sarkar home" onClick={closeMobile}>
            <span className="brand-mark">PS</span>
            <span>
              <span className="brand-name">{profile.name}</span>
              <span className="brand-role">research · engineering · data</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active =
                location.pathname === '/'
                  ? activeSection === item.id
                  : isCurrentPath(location.pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link${active ? ' active' : ''}`}
                  aria-current={active ? 'location' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="header-actions">
            <button
              className="command-trigger"
              type="button"
              onClick={onOpenPalette}
              aria-label="Open command palette"
            >
              <Command size={14} />
              <span>Explore</span>
              <span className="command-key">⌘ K</span>
            </button>
            <CvDownloadButton variant="ghost" className="!min-h-0 !h-9 !w-9 !p-0" label="" />
            <button
              className="icon-button"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              ref={menuButtonRef}
              className="icon-button mobile-menu-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
        <ScrollProgress />
      </header>
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              className="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              aria-hidden="true"
            />
            <motion.aside
              ref={mobileDrawerRef}
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
              aria-label="Mobile navigation"
              role="dialog"
              aria-modal="true"
            >
              <div className="mobile-drawer-top">
                <span className="section-kicker">Navigation</span>
                <button
                  ref={mobileCloseRef}
                  className="icon-button"
                  type="button"
                  onClick={closeMobile}
                  aria-label="Close navigation menu"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="mobile-nav">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMobile}
                    className={
                      location.pathname === '/' && activeSection === item.id ? 'active' : ''
                    }
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/projects"
                  onClick={closeMobile}
                  className={location.pathname === '/projects' ? 'active' : ''}
                >
                  All projects
                </Link>
                <Link
                  to="/research"
                  onClick={closeMobile}
                  className={location.pathname === '/research' ? 'active' : ''}
                >
                  Research index
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobile}
                  className={location.pathname === '/about' ? 'active' : ''}
                >
                  About page
                </Link>
              </nav>
              <div className="mobile-drawer-footer">
                <CvDownloadButton variant="primary" className="w-full" />
                <a
                  className="button button-secondary"
                  href={`mailto:${profile.email}`}
                  onClick={closeMobile}
                >
                  Email Pritam
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
