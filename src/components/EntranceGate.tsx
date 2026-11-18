import { useState } from 'react';

export default function EntranceGate({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onEnter, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0a1e]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1e] via-[#1a1033]/80 to-[#0f0a1e]" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-800/20 blur-[150px]" />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-1000 ${
          opening ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
      >
        {/* Crown */}
        <div className="text-6xl mb-8 animate-[gentle-float_4s_ease-in-out_infinite]">👑</div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight tracking-tight mb-4">
          Welcome to your kingdom,
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic gradient-text mb-6">
          Jaaanu
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-white/50 max-w-md mx-auto mb-12 font-light leading-relaxed">
          Behind this door lies a night made entirely for you.
          <br />
          Every word, every sparkle, every heartbeat — it's all yours.
        </p>

        {/* Gate visual */}
        <div className="relative w-72 h-48 mb-10">
          {/* Door frame */}
          <div className="absolute inset-0 rounded-t-[80px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            {/* Left door */}
            <div
              className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-white/[0.03] to-white/[0.06] border-r border-white/[0.06] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left ${
                opening ? '-translate-x-full opacity-0' : ''
              }`}
            >
              {/* Door handle */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400/60 shadow-[0_0_8px_rgba(245,217,139,0.4)]" />
            </div>
            {/* Right door */}
            <div
              className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-white/[0.03] to-white/[0.06] border-l border-white/[0.06] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] origin-right ${
                opening ? 'translate-x-full opacity-0' : ''
              }`}
            >
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400/60 shadow-[0_0_8px_rgba(245,217,139,0.4)]" />
            </div>
          </div>

          {/* Light flood when opening */}
          <div
            className={`absolute inset-0 rounded-t-[80px] bg-gradient-to-t from-white/40 via-white/10 to-transparent transition-all duration-1000 ${
              opening ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
            }`}
          />
        </div>

        {/* Open button */}
        <button
          onClick={handleClick}
          disabled={opening}
          className="group relative px-10 py-4 rounded-full font-serif font-bold text-lg tracking-wider transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e8b4b8, #f5d98b)',
            color: '#0f0a1e',
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10">
            Open the Royal Gate {opening ? '✨' : '→'}
          </span>
        </button>
      </div>
    </div>
  );
}
