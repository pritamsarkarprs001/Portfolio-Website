import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, ChevronDown, Code2, Expand, FlaskConical, X } from 'lucide-react';
import { profile } from '../data/profile';
import { useReducedMotionPreference } from '../hooks/useReducedMotion';
import { Icon } from '../lib/icons';
import { ProfileImage } from './ProfileImage';
import { cn } from '../lib/utils';

type PhotoMode = 'standard' | 'researcher' | 'technical' | 'formal';

const modeLabels: Record<PhotoMode, string> = {
  standard: profile.photoLabels.standard,
  researcher: profile.photoLabels.researcher,
  technical: profile.photoLabels.technical,
  formal: profile.photoLabels.formal,
};

export function PhotoExperience() {
  const [mode, setMode] = useState<PhotoMode>('standard');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 50, py: 50, active: false });
  const reduceMotion = useReducedMotionPreference();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'Tab') {
        const dialog = document.getElementById('profile-lightbox');
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
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
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 4, y: y * -4, px: (x + 0.5) * 100, py: (y + 0.5) * 100, active: true });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0, px: 50, py: 50, active: false });

  return (
    <>
      <div
        className={cn(
          'photo-experience',
          `photo-mode-${mode}`,
          tilt.active && 'photo-pointer-active',
        )}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div
          className="photo-card-glow"
          style={{ '--pointer-x': `${tilt.px}%`, '--pointer-y': `${tilt.py}%` } as CSSProperties}
        />
        <div
          className="photo-card"
          style={{
            transform: reduceMotion
              ? undefined
              : `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >
          <div className="photo-card-top">
            <span className="photo-overline">
              <Camera size={12} /> profile / {modeLabels[mode]}
            </span>
            <span className="photo-coordinates">23.8103° N · 90.4125° E</span>
          </div>
          <button
            ref={imageTriggerRef}
            className="photo-image-button"
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Open profile image in larger view"
          >
            <ProfileImage
              className="photo-image"
              variant={mode === 'formal' ? 'secondary' : 'primary'}
              eager
              sizes="(max-width: 820px) 70vw, 360px"
            />
            <span className="photo-expand">
              <Expand size={15} />
            </span>
            <span className="photo-scanline" aria-hidden="true" />
          </button>
          <div className="photo-card-copy">
            <div className="photo-status">
              <span className="status-dot" /> {profile.photoLabels.openTo}
            </div>
            <h2>{profile.name}</h2>
            <p>
              {mode === 'researcher'
                ? profile.photoLabels.researcherDescription
                : mode === 'technical'
                  ? profile.photoLabels.technicalDescription
                  : mode === 'formal'
                    ? profile.photoLabels.formalDescription
                    : profile.role}
            </p>
            <div className="photo-meta">
              <span>
                <FlaskConical size={12} /> research focus
              </span>
              <span>
                <Code2 size={12} /> {profile.photoLabels.currentBuilding}
              </span>
            </div>
          </div>
          <div className="photo-network" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="photo-mode-switcher" role="group" aria-label="Profile presentation mode">
          {(Object.keys(modeLabels) as PhotoMode[]).map((item) => (
            <button
              key={item}
              type="button"
              className={mode === item ? 'active' : ''}
              onClick={() => setMode(item)}
              aria-pressed={mode === item}
            >
              {modeLabels[item]}
            </button>
          ))}
          <ChevronDown size={13} aria-hidden="true" />
        </div>
      </div>
      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div
            className="lightbox-overlay"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setLightboxOpen(false);
            }}
          >
            <motion.div
              id="profile-lightbox"
              className="lightbox-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
            >
              <button
                ref={closeButtonRef}
                className="icon-button lightbox-close"
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close expanded profile image"
              >
                <X size={18} />
              </button>
              <ProfileImage
                className="lightbox-image"
                variant={mode === 'formal' ? 'secondary' : 'primary'}
                eager
                sizes="min(70vw, 520px)"
              />
              <div className="lightbox-copy">
                <span className="section-kicker">Profile view / {modeLabels[mode]}</span>
                <h2 id="lightbox-title">{profile.name}</h2>
                <p>{profile.role}</p>
                <span className="photo-location">
                  <Icon name="map" size={14} /> {profile.location}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
