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
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-800/15 blur-[150px]" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-rose-800/10 blur-[100px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#e8b4b8' : i % 3 === 1 ? '#f5d98b' : '#c9b6ff',
              animation: `float-up ${Math.random() * 8 + 8}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Crown */}
        <div
          className="text-6xl sm:text-7xl mb-8 inline-block"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.8)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          👑
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

        {/* Subtitle — nickname */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic gradient-text-gold mb-8"
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
          className="text-lg sm:text-xl text-white/50 max-w-lg mx-auto font-light leading-relaxed"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s',
          }}
        >
          {CONTENT.hero.tagline}
        </p>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{
            opacity: revealed ? 1 : 0,
            transition: 'opacity 1s ease 2s',
          }}
        >
          <span className="text-white/30 text-sm font-light tracking-widest uppercase">Scroll down</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
