import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Download, ExternalLink, Search, X } from 'lucide-react';
import { cvPath, profile } from '../data/profile';
import { projects } from '../data/projects';
import { publications } from '../data/publications';
import { socials } from '../data/socials';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../hooks/useToast';
import { useReducedMotionControls } from '../hooks/useReducedMotion';
import { Icon } from '../lib/icons';
import { copyText } from '../lib/utils';

type CommandItem = {
  id: string;
  label: string;
  hint: string;
  icon: string;
  group: string;
  action: () => void;
  external?: boolean;
};

export function CommandPalette({
  open,
  onClose,
  onOpenShortcuts,
}: {
  open: boolean;
  onClose: () => void;
  onOpenShortcuts: () => void;
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { reducedMotion, toggleReducedMotion } = useReducedMotionControls();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setSelected(0);
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.clearTimeout(timer);
      };
    }
    previousFocus.current?.focus();
  }, [open]);

  const items = useMemo<CommandItem[]>(() => {
    const sectionItems: CommandItem[] = [
      {
        id: 'home',
        label: 'Go to Home',
        hint: '/',
        icon: 'spark',
        group: 'Navigate',
        action: () => navigate('/'),
      },
      {
        id: 'about',
        label: 'Go to About',
        hint: 'section',
        icon: 'user',
        group: 'Navigate',
        action: () => navigate('/#about'),
      },
      {
        id: 'research',
        label: 'Go to Research',
        hint: 'section',
        icon: 'book',
        group: 'Navigate',
        action: () => navigate('/#research'),
      },
      {
        id: 'projects',
        label: 'Go to Projects',
        hint: 'section',
        icon: 'layers',
        group: 'Navigate',
        action: () => navigate('/#projects'),
      },
      {
        id: 'experience',
        label: 'Go to Experience',
        hint: 'section',
        icon: 'briefcase',
        group: 'Navigate',
        action: () => navigate('/#experience'),
      },
      {
        id: 'contact',
        label: 'Go to Contact',
        hint: 'section',
        icon: 'mail',
        group: 'Navigate',
        action: () => navigate('/#contact'),
      },
      {
        id: 'projects-route',
        label: 'Browse all projects',
        hint: '/projects',
        icon: 'layers',
        group: 'Pages',
        action: () => navigate('/projects'),
      },
      {
        id: 'research-route',
        label: 'Browse research index',
        hint: '/research',
        icon: 'book',
        group: 'Pages',
        action: () => navigate('/research'),
      },
      {
        id: 'about-route',
        label: 'Read full biography',
        hint: '/about',
        icon: 'user',
        group: 'Pages',
        action: () => navigate('/about'),
      },
      {
        id: 'contact-route',
        label: 'Open contact page',
        hint: '/contact',
        icon: 'mail',
        group: 'Pages',
        action: () => navigate('/contact'),
      },
      {
        id: 'cv-route',
        label: 'Open CV source preview',
        hint: '/cv',
        icon: 'file',
        group: 'Pages',
        action: () => navigate('/cv'),
      },
    ];
    const projectItems: CommandItem[] = projects.map((project) => ({
      id: project.slug,
      label: project.name,
      hint: project.year ?? 'date not specified',
      icon: 'layers',
      group: 'Projects',
      action: () => navigate(`/projects/${project.slug}`),
    }));
    const publicationItems: CommandItem[] = publications.map((publication) => ({
      id: publication.slug,
      label: publication.title,
      hint: String(publication.year),
      icon: 'book',
      group: 'Publications',
      action: () => navigate(`/research/${publication.slug}`),
    }));
    const socialItems: CommandItem[] = socials.map((social) => ({
      id: social.label,
      label: `Open ${social.label}`,
      hint: social.handle || 'profile',
      icon: social.icon,
      group: 'External',
      action: () => window.open(social.href, '_blank', 'noopener,noreferrer'),
      external: true,
    }));
    return [
      ...sectionItems,
      ...projectItems,
      ...publicationItems,
      {
        id: 'cv',
        label: profile.cvPdfAvailable ? 'Download CV' : 'Open CV preview',
        hint: profile.cvPdfAvailable ? 'PDF' : 'PDF placeholder / print view',
        icon: 'download',
        group: 'Actions',
        action: () => {
          if (profile.cvPdfAvailable) window.location.href = cvPath;
          else navigate('/cv');
        },
      },
      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: profile.email,
        icon: 'copy',
        group: 'Actions',
        action: () => {
          void copyText(profile.email)
            .then(() => showToast('Email address copied', 'success'))
            .catch(() => showToast('Clipboard access is unavailable.', 'info'));
        },
      },
      {
        id: 'email',
        label: 'Email Pritam',
        hint: 'open mail client',
        icon: 'mail',
        group: 'Actions',
        action: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: 'motion',
        label: reducedMotion ? 'Enable motion effects' : 'Reduce motion effects',
        hint: 'preference',
        icon: reducedMotion ? 'zap' : 'activity',
        group: 'Actions',
        action: toggleReducedMotion,
      },
      {
        id: 'theme',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
        hint: 'theme',
        icon: theme === 'dark' ? 'sun' : 'moon',
        group: 'Actions',
        action: toggleTheme,
      },
      {
        id: 'shortcuts',
        label: 'Show keyboard shortcuts',
        hint: '?',
        icon: 'command',
        group: 'Actions',
        action: onOpenShortcuts,
      },
      ...socialItems,
    ];
  }, [
    navigate,
    onOpenShortcuts,
    reducedMotion,
    showToast,
    theme,
    toggleReducedMotion,
    toggleTheme,
  ]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      `${item.label} ${item.hint} ${item.group}`.toLowerCase().includes(normalized),
    );
  }, [items, query]);

  useEffect(() => setSelected(0), [query]);

  if (!open) return null;

  const run = (item: CommandItem) => {
    onClose();
    item.action();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
    if (event.key === 'Tab') {
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, [href]',
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
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelected((current) => Math.min(current + 1, filteredItems.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelected((current) => Math.max(current - 1, 0));
    }
    if (event.key === 'Enter' && filteredItems[selected]) {
      event.preventDefault();
      run(filteredItems[selected]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="command-overlay"
        role="presentation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <motion.div
          ref={panelRef}
          className="command-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          onKeyDown={onKeyDown}
        >
          <div className="command-search">
            <Search size={17} />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sections, projects, links…"
              aria-label="Search commands"
            />
            <button
              className="icon-button"
              type="button"
              onClick={onClose}
              aria-label="Close command palette"
            >
              <X size={16} />
            </button>
          </div>
          <div className="command-results" role="listbox" aria-label="Available commands">
            {filteredItems.length ? (
              <>
                {(
                  ['Navigate', 'Pages', 'Projects', 'Publications', 'Actions', 'External'] as const
                ).map((group) => {
                  const groupItems = filteredItems.filter((item) => item.group === group);
                  if (!groupItems.length) return null;
                  return (
                    <div key={group}>
                      <div className="command-group-label">{group}</div>
                      {groupItems.map((item) => {
                        const index = filteredItems.indexOf(item);
                        return (
                          <button
                            key={item.id}
                            className={`command-item${index === selected ? ' selected' : ''}`}
                            type="button"
                            role="option"
                            aria-selected={index === selected}
                            onMouseEnter={() => setSelected(index)}
                            onClick={() => run(item)}
                          >
                            <span className="command-item-icon">
                              <Icon name={item.icon} size={14} />
                            </span>
                            <span className="command-item-label">{item.label}</span>
                            {item.external ? (
                              <ExternalLink size={12} />
                            ) : (
                              <span className="command-item-hint">{item.hint}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="px-4 py-8 text-center text-xs text-slate-500">
                No matching command. Try “research”, “project”, or “theme”.
              </div>
            )}
          </div>
          <div className="command-footer">
            <span>↑↓ navigate · ↵ select · esc close</span>
            <span>
              <Download size={10} className="inline" /> CV action available
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
