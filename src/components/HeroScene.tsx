import { useEffect, useState, useRef } from 'react';
import { CONTENT } from '@/data/content';

export default function HeroScene() {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center section-padding overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-rose-red/20 blur-[160px]" />
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-crimson/25 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-rose-bright/20 blur-[130px]" />
      </div>

      {/* Floating romantic particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              background: i % 4 === 0 ? '#ff0054' : i % 4 === 1 ? '#ff758f' : i % 4 === 2 ? '#ff4d6d' : '#ffe5ec',
              boxShadow: '0 0 10px rgba(255, 0, 84, 0.6)',
              animation: `float-up ${Math.random() * 8 + 8}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0.65,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Crown with glowing halo */}
        <div className="relative inline-block mb-8">
          <div
            className="text-6xl sm:text-7xl lg:text-8xl inline-block"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.8)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            👑
          </div>
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-24 h-24 rounded-full bg-rose-red/35 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] tracking-tight mb-4">
          {CONTENT.hero.title.split('').map((ch, i) => (
            <span
              key={i}
              className="inline-block text-white"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.03}s`,
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>

        {/* Subtitle — nickname in radiant pink-red */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic gradient-text mb-8"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
          }}
        >
          {CONTENT.hero.subtitle}
        </h2>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl text-rose-pink/70 max-w-lg mx-auto font-light leading-relaxed"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s',
          }}
        >
          {CONTENT.hero.tagline}
        </p>

        {/* Scroll indicator with rosy glow */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{
            opacity: revealed ? 1 : 0,
            transition: 'opacity 1s ease 2s',
          }}
        >
          <span className="text-rose-pink/50 text-xs font-light tracking-[0.25em] uppercase">Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-rose-bright via-crimson to-transparent animate-pulse shadow-[0_0_8px_#ff0054]" />
        </div>
      </div>
    </section>
  );
}
