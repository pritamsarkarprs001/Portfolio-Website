import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { Header } from '../components/Header';
import { CommandPalette } from '../components/CommandPalette';
import { ShortcutDialog } from '../components/ShortcutDialog';
import { Icon } from '../lib/icons';

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      className="back-top"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUpRight size={17} />
    </button>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-top">
          <div>
            <Link to="/" className="brand" aria-label="Pritam Sarkar home">
              <span className="brand-mark">PS</span>
              <span>
                <span className="brand-name">{profile.name}</span>
                <span className="brand-role">research · engineering · data</span>
              </span>
            </Link>
            <p className="footer-note">
              A research-driven portfolio for computer vision, geospatial machine learning,
              multimodal systems, and practical AI engineering.
            </p>
          </div>
          <div>
            <p className="section-kicker">Stay connected</p>
            <div className="footer-socials" style={{ marginTop: 14 }}>
              {socials.map((social) => (
                <a
                  className="icon-button"
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${social.label} profile`}
                >
                  {social.icon === 'linkedin' ? (
                    <Linkedin size={16} />
                  ) : social.icon === 'github' ? (
                    <Github size={16} />
                  ) : (
                    <Icon name={social.icon === 'scholar' ? 'book' : 'orcid'} size={16} />
                  )}
                </a>
              ))}
              <a
                className="icon-button"
                href={`mailto:${profile.email}`}
                aria-label="Email Pritam Sarkar"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}. Built with care.
          </span>
          <span>Dhaka, Bangladesh · {profile.availability}</span>
        </div>
      </div>
    </footer>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeShortcuts = useCallback(() => setShortcutsOpen(false), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
      if (
        event.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement)?.tagName)
      ) {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false);
        setShortcutsOpen(false);
      }
      if (
        event.key === '?' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement)?.tagName)
      ) {
        event.preventDefault();
        setShortcutsOpen((current) => !current);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setPaletteOpen(false);
    setShortcutsOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <div className={`page-shell${location.pathname === '/showcase' ? ' app-shell-showcase' : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="app-background" aria-hidden="true" />
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
      <CommandPalette
        open={paletteOpen}
        onClose={closePalette}
        onOpenShortcuts={() => {
          closePalette();
          setShortcutsOpen(true);
        }}
      />
      <ShortcutDialog open={shortcutsOpen} onClose={closeShortcuts} />
    </div>
  );
}
