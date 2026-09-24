import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

export function ShortcutDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])',
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
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previous?.focus();
    };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="modal-overlay"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcut-title"
            aria-describedby="shortcut-description"
            tabIndex={-1}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="section-kicker">
                <Keyboard size={14} /> Keyboard
              </div>
              <button
                ref={closeRef}
                className="icon-button"
                type="button"
                onClick={onClose}
                aria-label="Close keyboard shortcuts"
              >
                <X size={16} />
              </button>
            </div>
            <h2 id="shortcut-title" className="modal-title">
              Shortcuts for faster exploration
            </h2>
            <p id="shortcut-description" className="modal-copy">
              The portfolio is designed to work with a keyboard, a screen reader, and reduced-motion
              preferences.
            </p>
            <div className="shortcut-list">
              <div className="shortcut-row">
                <span>Open command palette</span>
                <span className="shortcut-key">Ctrl / ⌘ + K</span>
              </div>
              <div className="shortcut-row">
                <span>Quick-open command palette</span>
                <span className="shortcut-key">/</span>
              </div>
              <div className="shortcut-row">
                <span>Move through commands</span>
                <span className="shortcut-key">↑ ↓</span>
              </div>
              <div className="shortcut-row">
                <span>Select command</span>
                <span className="shortcut-key">Enter</span>
              </div>
              <div className="shortcut-row">
                <span>Close dialogs</span>
                <span className="shortcut-key">Esc</span>
              </div>
              <div className="shortcut-row">
                <span>Show this help</span>
                <span className="shortcut-key">?</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
