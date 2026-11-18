import Lenis from 'lenis';
import { useEffect, useRef, useCallback } from 'react';

let lenis: Lenis | null = null;

export function useLenis(enabled = true) {
  const rafRef = useRef<number>();

  const init = useCallback(() => {
    if (typeof window === 'undefined' || !enabled) return;
    if (!lenis) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)),
        touchMultiplier: 2,
      });
    }
    return lenis;
  }, [enabled]);

  useEffect(() => {
    const instance = init();
    if (!instance) return;

    function raf(time: number) {
      instance!.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);
  }, [init, enabled]);

  return { lenis, scrollTo: useCallback((y: number, opts?: any) => lenis?.scrollTo(y, opts), []) };
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'auto' });
}
