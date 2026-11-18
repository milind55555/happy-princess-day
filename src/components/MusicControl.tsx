import { Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '@/hooks/useMusic';

interface MusicControlProps {
  src: string;
}

export default function MusicControl({ src }: MusicControlProps) {
  const { isPlaying, muted, toggle } = useMusic(src);

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-gold"
    >
      {muted || !isPlaying ? (
        <VolumeX className="w-5 h-5 text-white/80" />
      ) : (
        <Volume2 className="w-5 h-5 text-white/90" />
      )}
      <span className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-rose-gold animate-pulse" aria-hidden="true" />
    </button>
  );
}
