import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type ReducedMotionContextValue = {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  toggleReducedMotion: () => void;
};

const ReducedMotionContext = createContext<ReducedMotionContextValue | null>(null);
const STORAGE_KEY = 'pritam-reduced-motion';

function getInitialPreference() {
  if (typeof window === 'undefined') return false;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'true') return true;
  if (stored === 'false') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotionState] = useState(getInitialPreference);
  const explicitPreference = useRef(
    typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) !== null,
  );
  const setPreference = useCallback((value: boolean) => {
    explicitPreference.current = true;
    setReducedMotionState(value);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reducedMotion);
    window.localStorage.setItem(STORAGE_KEY, String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!explicitPreference.current) setReducedMotionState(event.matches);
    };
    mediaQuery.addEventListener?.('change', onChange);
    return () => mediaQuery.removeEventListener?.('change', onChange);
  }, []);

  const toggleReducedMotion = useCallback(
    () => setPreference(!reducedMotion),
    [reducedMotion, setPreference],
  );
  const value = useMemo<ReducedMotionContextValue>(
    () => ({ reducedMotion, setReducedMotion: setPreference, toggleReducedMotion }),
    [reducedMotion, setPreference, toggleReducedMotion],
  );

  return <ReducedMotionContext.Provider value={value}>{children}</ReducedMotionContext.Provider>;
}

export function useReducedMotionPreference() {
  const context = useContext(ReducedMotionContext);
  if (!context) return false;
  return context.reducedMotion;
}

export function useReducedMotionControls() {
  const context = useContext(ReducedMotionContext);
  if (!context)
    throw new Error('useReducedMotionControls must be used inside ReducedMotionProvider');
  return context;
}
