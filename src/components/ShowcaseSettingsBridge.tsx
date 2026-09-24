import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useReducedMotionControls } from '../hooks/useReducedMotion';

type ShowcaseSettings = {
  type: 'portfolio-showcase-settings';
  theme?: 'dark' | 'light';
  reducedMotion?: boolean;
  grid?: boolean;
  photoEffects?: boolean;
  animations?: boolean;
};

export function ShowcaseSettingsBridge() {
  const { setTheme } = useTheme();
  const { setReducedMotion } = useReducedMotionControls();
  useEffect(() => {
    const onMessage = (event: MessageEvent<ShowcaseSettings>) => {
      if (
        event.origin !== window.location.origin ||
        event.data?.type !== 'portfolio-showcase-settings'
      )
        return;
      if (event.data.theme) setTheme(event.data.theme);
      if (typeof event.data.reducedMotion === 'boolean') setReducedMotion(event.data.reducedMotion);
      document.body.classList.toggle('showcase-no-grid', event.data.grid === false);
      document.body.classList.toggle(
        'showcase-no-photo-effects',
        event.data.photoEffects === false,
      );
      document.body.classList.toggle('showcase-no-animation', event.data.animations === false);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [setReducedMotion, setTheme]);
  return null;
}
