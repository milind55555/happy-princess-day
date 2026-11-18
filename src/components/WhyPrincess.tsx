import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const ICON_COLORS: Record<string, string> = {
  heart: '#e8b4b8',
  star: '#f5d98b',
  rose: '#d45087',
  moon: '#c9b6ff',
  key: '#c9a227',
  sparkle: '#ffd6e8',
};

const ICONS: Record<string, string> = {
  heart: '❤',
  star: '✦',
  rose: '🌹',
  moon: '🌙',
  key: '🗝',
  sparkle: '✨',
};

export default function WhyPrincess() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.reason-card');
      cards?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="relative min-h-[100vh] bg-twilight text-white px-6 pt-20 pb-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-10 tracking-tight">
          Why you're my princess
        </h2>
        <div className="grid md:grid-cols-3 gap-6" ref={containerRef}>
          {CONTENT.reasons.map((r) => (
            <div
              key={r.id}
              className="glass-card flex flex-col items-center justify-center h-64 min-h-[260px] group cursor-default"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300`}
                style={{ backgroundColor: ICON_COLORS[r.icon], color: '#1a1033' }}
              >
                {ICONS[r.icon]}
              </div>
              <p className="text-center text-white/90 font-light leading-relaxed text-lg font-serif">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
