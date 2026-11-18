import { Howl } from 'howler';
import { useCallback, useEffect, useState } from 'react';

let music: Howl | null = null;
let muted = localStorage.getItem('princess-mute') === '1';

export function useMusic(src: string) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (music) return;
    music = new Howl({
      src: [src],
      loop: true,
      volume: 0.5,
      html5: true,
      preload: true,
    });
    music.on('play', () => setIsPlaying(true));
    music.on('end', () => setIsPlaying(false));
    music.on('loaderror', () => {
      console.warn('Music file not found — add /assets/music/song.mp3');
    });
    if (!muted) {
      try { music.play(); } catch { /* autoplay may fail until user gesture */ }
    }
    return () => {
      music?.stop();
    };
  }, [src]);

  const toggle = useCallback(() => {
    muted = !muted;
    localStorage.setItem('princess-mute', muted ? '1' : '0');
    if (music) {
      if (muted) music.pause();
      else { try { music.play(); } catch { /* noop */ } }
    }
    setIsPlaying(!muted && !!music);
  }, []);

  const playSFX = useCallback((url: string) => {
    if (muted) return;
    try {
      const sfx = new Howl({ src: [url], volume: 0.4 });
      sfx.play();
    } catch { /* noop */ }
  }, [muted]);

  return { isPlaying, muted, toggle, playSFX };
}


