import { useRef, useEffect, useState } from 'react';
import { CONTENT } from '@/data/content';

export default function Timeline() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 sm:py-32 section-padding"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-indigo-900/15 blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Our story so far
        </h2>
        <p
          className="text-white/40 text-lg font-light mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Every chapter, a beautiful memory.
        </p>

        {/* Timeline items */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/20 to-white/5" />

          {/* Timeline events */}
          <div className="space-y-12 sm:space-y-16">
            {CONTENT.timeline.map((event, i) => (
              <div
                key={event.id}
                className="relative pl-16 sm:pl-20"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.15}s`,
                }}
              >
                {/* Dot on the line */}
                <div className="absolute left-[18px] sm:left-[26px] top-2 w-4 h-4 rounded-full border-2 border-white/30 bg-[#0f0a1e] z-10">
                  <div className="absolute inset-1 rounded-full bg-white/60" />
                </div>

                {/* Year badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-white/50 tracking-wider uppercase mb-3">
                  {event.emoji} {event.year}
                </div>

                {/* Card */}
                <div className="glass-card p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed text-base">
                    {event.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
