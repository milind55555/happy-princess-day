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
      {/* Background glow in radiant rose & wine */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-crimson/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-rose-red/15 blur-[140px] pointer-events-none" />

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
          Our story so far 📖
        </h2>
        <p
          className="text-rose-pink/70 text-lg font-light mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Every chapter with you is my favorite love story.
        </p>

        {/* Timeline items */}
        <div className="relative">
          {/* Vertical glowing rose-red line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-bright via-rose-red to-ruby shadow-[0_0_12px_rgba(255,0,84,0.4)]" />

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
                {/* Glowing ruby dot on the line */}
                <div className="absolute left-[17px] sm:left-[25px] top-2 w-5 h-5 rounded-full border-2 border-rose-bright bg-[#13030b] z-10 shadow-[0_0_12px_#ff0054] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-rose-red animate-pulse" />
                </div>

                {/* Year badge */}
                <div className="inline-block px-3.5 py-1 rounded-full bg-rose-red/15 border border-rose-pink/30 text-xs font-mono text-rose-pink tracking-wider uppercase mb-3 shadow-[0_0_10px_rgba(255,0,84,0.15)]">
                  {event.emoji} {event.year}
                </div>

                {/* Card */}
                <div className="glass-card-hover p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-white/80 font-light leading-relaxed text-base">
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
