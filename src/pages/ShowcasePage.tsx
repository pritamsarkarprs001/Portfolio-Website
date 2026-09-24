import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Eye,
  Grid3X3,
  Monitor,
  Moon,
  Play,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet,
  Sun,
  Waves,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useReducedMotionControls } from '../hooks/useReducedMotion';
import { Seo } from '../components/Seo';
import { Icon } from '../lib/icons';
import { cn } from '../lib/utils';

const devices = [
  { id: 'desktop', label: 'Desktop', width: '100%', icon: Monitor },
  { id: 'laptop', label: 'Laptop', width: '1100px', icon: Monitor },
  { id: 'tablet', label: 'Tablet', width: '768px', icon: Tablet },
  { id: 'mobile', label: 'Mobile', width: '390px', icon: Smartphone },
] as const;
type DeviceId = (typeof devices)[number]['id'];

type ShowcaseSettings = {
  type: 'portfolio-showcase-settings';
  theme: 'dark' | 'light';
  reducedMotion: boolean;
  grid: boolean;
  photoEffects: boolean;
  animations: boolean;
};

export default function ShowcasePage() {
  const { theme, toggleTheme } = useTheme();
  const { reducedMotion: reduceMotion, toggleReducedMotion } = useReducedMotionControls();
  const [device, setDevice] = useState<DeviceId>('desktop');
  const [grid, setGrid] = useState(true);
  const [photoEffects, setPhotoEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [labels, setLabels] = useState(import.meta.env.DEV);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const frameLoaded = useRef(false);
  const enabled = import.meta.env.DEV || import.meta.env.VITE_SHOWCASE_MODE === 'true';
  const active = devices.find((item) => item.id === device) ?? devices[0];

  const sendSettings = useCallback(() => {
    if (!frameLoaded.current || !frameRef.current?.contentWindow) return;
    const settings: ShowcaseSettings = {
      type: 'portfolio-showcase-settings',
      theme,
      reducedMotion: reduceMotion || !animations,
      grid,
      photoEffects,
      animations,
    };
    frameRef.current.contentWindow.postMessage(settings, window.location.origin);
  }, [animations, grid, photoEffects, reduceMotion, theme]);

  useEffect(() => {
    sendSettings();
  }, [sendSettings]);

  const jumpToSection = (id: string) => {
    const target = frameRef.current?.contentDocument?.getElementById(id);
    if (target)
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    else window.location.href = `/#${id}`;
  };

  return (
    <>
      <Seo title="Showcase" description="Portfolio showcase and responsive QA preview." noIndex />
      <div
        className={cn(
          'showcase-page',
          !grid && 'showcase-no-grid',
          !animations && 'showcase-no-animation',
          !photoEffects && 'showcase-no-photo-effects',
        )}
      >
        {enabled ? (
          <div className="showcase-toolbar">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-cyan-300" />
              <strong className="text-xs text-slate-100">Portfolio showcase</strong>
              <span className="tag">inspection mode</span>
            </div>
            <div className="showcase-toolbar-controls">
              <div className="flex items-center gap-1" role="group" aria-label="Preview device">
                {devices.map((item) => {
                  const DeviceIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className={`showcase-control ${device === item.id ? 'active' : ''}`}
                      type="button"
                      onClick={() => setDevice(item.id)}
                      aria-pressed={device === item.id}
                    >
                      <DeviceIcon size={14} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="h-5 w-px bg-slate-700" />
              <button
                className="showcase-control"
                type="button"
                onClick={toggleTheme}
                aria-pressed={theme === 'light'}
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
              <button
                className={`showcase-control ${reduceMotion ? 'active' : ''}`}
                type="button"
                onClick={toggleReducedMotion}
                aria-pressed={reduceMotion}
              >
                <Waves size={14} />
                <span>Motion</span>
              </button>
              <button
                className={`showcase-control ${grid ? 'active' : ''}`}
                type="button"
                onClick={() => setGrid((value) => !value)}
                aria-pressed={grid}
              >
                <Grid3X3 size={14} />
                <span>Grid</span>
              </button>
              <button
                className={`showcase-control ${photoEffects ? 'active' : ''}`}
                type="button"
                onClick={() => setPhotoEffects((value) => !value)}
                aria-pressed={photoEffects}
              >
                <Eye size={14} />
                <span>Photo FX</span>
              </button>
              <button
                className={`showcase-control ${animations ? 'active' : ''}`}
                type="button"
                onClick={() => setAnimations((value) => !value)}
                aria-pressed={animations}
              >
                <Play size={14} />
                <span>Motion FX</span>
              </button>
              <button
                className={`showcase-control ${labels ? 'active' : ''}`}
                type="button"
                onClick={() => setLabels((value) => !value)}
                aria-pressed={labels}
              >
                <Icon name="file" size={14} />
                <span>Labels</span>
              </button>
              <Link className="button button-primary !min-h-8 !px-3 !text-[10px]" to="/">
                Open live page <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        ) : null}
        <div className="showcase-meta">
          <div>
            <span className="section-kicker">Final layout review</span>
            <h1 className="mt-3 text-2xl text-slate-100">Showcase / {active.label}</h1>
            <p className="mt-2 text-xs text-slate-500">
              The preview runs in a same-origin iframe so device controls exercise real responsive
              breakpoints.
            </p>
          </div>
          <div className="showcase-jump">
            <span className="font-mono text-[9px] uppercase tracking-[.1em] text-slate-600">
              Jump to
            </span>
            {[
              'about',
              'research',
              'projects',
              'publications',
              'experience',
              'skills',
              'contact',
            ].map((id) => (
              <button key={id} type="button" onClick={() => jumpToSection(id)}>
                {id}
              </button>
            ))}
            <Link to="/cv">CV source</Link>
            <Link to="/projects/deep-research-ai">Project detail</Link>
          </div>
        </div>
        <div className="showcase-stage">
          <div className="showcase-device" style={{ width: active.width }}>
            <div className="showcase-device-bar">
              <span />
              <span />
              <span />
              <small>pritam.sarkar / {active.label.toLowerCase()} preview</small>
            </div>
            {labels ? (
              <div className="showcase-label showcase-label-hero">
                Live home / responsive iframe
              </div>
            ) : null}
            <iframe
              ref={frameRef}
              className="showcase-iframe"
              src={import.meta.env.BASE_URL}
              title={`${active.label} portfolio preview`}
              onLoad={() => {
                frameLoaded.current = true;
                sendSettings();
              }}
            />
            <div className="showcase-end-label">
              End of showcase preview <RotateCcw size={12} />
            </div>
          </div>
        </div>
        <div className="showcase-footer">
          <span>
            Screenshot-friendly preview · profile effects and motion can be disabled for QA.
          </span>
          <span>
            Routes: <code>/</code> <code>/projects</code> <code>/research</code>{' '}
            <code>/contact</code>
          </span>
        </div>
      </div>
    </>
  );
}
