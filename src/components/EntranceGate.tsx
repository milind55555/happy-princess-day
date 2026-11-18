import { useState } from 'react';

export default function EntranceGate({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onEnter, 1100);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#13030b]">
      {/* Background gradient with deep velvet crimson */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#13030b] via-[#240616]/90 to-[#13030b]" />

      {/* Radiant romantic glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose-red/20 blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-ruby/25 blur-[120px]" />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-1000 ${
          opening ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
      >
        {/* Crown with soft red glow */}
        <div className="relative mb-6">
          <div className="text-6xl sm:text-7xl animate-[gentle-float_4s_ease-in-out_infinite]">👑</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-rose-bright/30 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight tracking-tight mb-3">
          Welcome to your kingdom,
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic gradient-text mb-6">
          Jaaanu 🌹
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-rose-pink/70 max-w-md mx-auto mb-10 font-light leading-relaxed">
          Behind this gate lies a night painted in rose petals and starlight.
          <br />
          Every word, every sparkle, every heartbeat — it's all for you.
        </p>

        {/* Gate visual */}
        <div className="relative w-72 h-48 mb-10">
          {/* Door frame in ruby & rose-gold outline */}
          <div className="absolute inset-0 rounded-t-[80px] border border-rose-pink/30 bg-wine-dark/40 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(255,0,84,0.15)]">
            {/* Left door */}
            <div
              className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-ruby-deep/40 to-crimson/20 border-r border-rose-pink/20 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left ${
                opening ? '-translate-x-full opacity-0' : ''
              }`}
            >
              {/* Door handle - glowing ruby */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-rose-bright shadow-[0_0_10px_#ff0054]" />
            </div>
            {/* Right door */}
            <div
              className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-ruby-deep/40 to-crimson/20 border-l border-rose-pink/20 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] origin-right ${
                opening ? 'translate-x-full opacity-0' : ''
              }`}
            >
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-rose-bright shadow-[0_0_10px_#ff0054]" />
            </div>
          </div>

          {/* Light flood when opening */}
          <div
            className={`absolute inset-0 rounded-t-[80px] bg-gradient-to-t from-rose-pink/50 via-rose-red/20 to-transparent transition-all duration-1000 ${
              opening ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
            }`}
          />
        </div>

        {/* Open button */}
        <button
          onClick={handleClick}
          disabled={opening}
          className="btn-royal text-lg px-10 py-4 shadow-[0_0_30px_rgba(255,0,84,0.4)] hover:shadow-[0_0_45px_rgba(255,0,84,0.65)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Open the Royal Gate {opening ? '✨' : '🌹'}
          </span>
        </button>
      </div>
    </div>
  );
}
