import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

export default function MusicControl({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef<Howl | null>(null);

  useEffect(() => {
    musicRef.current = new Howl({
      src: [src],
      loop: true,
      volume: 0.4,
      html5: true,
      preload: true,
      onloaderror: () => {
        console.warn('Music file not found — add /assets/music/song.mp3');
      },
    });

    return () => {
      musicRef.current?.stop();
      musicRef.current?.unload();
    };
  }, [src]);

  const toggle = useCallback(() => {
    if (!musicRef.current) return;
    if (playing) {
      musicRef.current.pause();
      setPlaying(false);
    } else {
      try {
        musicRef.current.play();
        setPlaying(true);
      } catch {
        // autoplay may fail
      }
    }
  }, [playing]);

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className={`fixed top-4 right-4 z-[60] w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
        playing
          ? 'glass-card border-rose-bright/50 bg-rose-red/25 shadow-[0_0_18px_rgba(255,0,84,0.45)]'
          : 'glass-card border-rose-pink/20 hover:border-rose-bright/40'
      } hover:scale-105 active:scale-95`}
    >
      {playing ? (
        // Sound on icon (3 animated pink bars)
        <div className="flex items-end gap-[3px] h-4">
          <div className="w-[3px] bg-rose-bright rounded-full animate-[shimmer_0.6s_ease-in-out_infinite]" style={{ height: '60%' }} />
          <div className="w-[3px] bg-rose-bright rounded-full animate-[shimmer_0.6s_ease-in-out_infinite_0.15s]" style={{ height: '100%' }} />
          <div className="w-[3px] bg-rose-bright rounded-full animate-[shimmer_0.6s_ease-in-out_infinite_0.3s]" style={{ height: '40%' }} />
        </div>
      ) : (
        // Sound off icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-pink/70">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
