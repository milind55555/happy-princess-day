import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function EntranceGate({ onEnter }: { onEnter: () => void }) {
  const [opened, setOpened] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) return;
    const tl = setTimeout(() => {
      lightRef.current?.classList.add('opacity-100', 'scale-110');
    }, 700);
    return () => clearTimeout(tl);
  }, [opened]);

  return (
    <div className="relative w-full min-h-[100vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-t from-twilight/95 via-twilight/60 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight text-shadow mb-6">
          Welcome to the kingdom,<br />
          <span className="text-rose-gold italic font-serif">Jaaanu</span> 👑
        </h1>
        <p className="text-lg text-white/80 max-w-md mx-auto mb-10 font-light">
          Tap the gate to step into a night made just for you.
        </p>
        <div className="relative w-full max-w-xs">
          <div
            ref={gateRef}
            className="relative mx-auto w-full max-w-xs h-64 mt-4 transition-all duration-1000 ease-out"
          >
            {/* Door frame */}
            <div className="absolute inset-0 border-2 border-rose-gold/40 rounded-3xl bg-black/30 backdrop-blur-sm shadow-[0_0_40px_rgba(232,180,184,0.2)]" />
            {/* Left door */}
            <div
              className={`absolute top-0 bottom-0 left-0 w-1/2 border-t-2 border-b-2 border-l-2 border-rose-gold/60 bg-black/40 backdrop-blur rounded-l-3xl transition-transform duration-1000 ease-out origin-left ${
                opened ? '-translate-x-1/2 scale-x-0 opacity-0' : ''
              }`}
            />
            {/* Right door */}
            <div
              className={`absolute top-0 bottom-0 right-0 w-1/2 border-t-2 border-b-2 border-r-2 border-rose-gold/60 bg-black/40 backdrop-blur rounded-r-3xl transition-transform duration-1000 ease-out origin-right ${
                opened ? 'translate-x-1/2 scale-x-0 opacity-0' : ''
              }`}
            />
            {/* Door handle */}
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-champagne shadow-[0_0_8px_#f5d98b]" />
          </div>
          {/* Light flood */}
          <div
            ref={lightRef}
            className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent opacity-0 scale-95 transition-all duration-1000 pointer-events-none"
          />
        </div>
        <button
          onClick={() => {
            setOpened(true);
            setTimeout(onEnter, 1100);
          }}
          disabled={opened}
          className="mt-10 px-8 py-4 rounded-full border border-rose-gold bg-rose-gold text-twilight font-serif font-bold text-xl uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(232,180,184,0.6)]"
          aria-label="Open the royal gate"
        >
          Open <ArrowRight className="w-5 h-5 inline ml-2" /> 👑
        </button>
      </div>
    </div>
  );
}
