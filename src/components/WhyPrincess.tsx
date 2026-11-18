import { useRef, useEffect, useState } from 'react';
import { CONTENT } from '@/data/content';

export default function WhyPrincess() {
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
      id="why"
      className="relative py-24 sm:py-32 section-padding"
    >
      {/* Background glow in radiant rose & ruby */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-red/15 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Why you're my princess 🌹
          </h2>
          <p
            className="mt-4 text-rose-pink/70 text-lg font-light"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            Six reasons from the heart, though a lifetime isn't enough to list them all.
          </p>
        </div>

        {/* Reason cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CONTENT.reasons.map((reason, i) => (
            <div
              key={reason.id}
              className="glass-card-hover p-7 sm:p-8 flex flex-col items-start group cursor-default"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.1}s`,
              }}
            >
              {/* Emoji icon with rosy halo */}
              <div className="relative mb-6">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {reason.emoji}
                </div>
                <div className="absolute inset-0 -z-10 rounded-full bg-rose-bright/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Reason text */}
              <p className="text-white/90 font-serif text-lg leading-relaxed font-light">
                {reason.text}
              </p>

              {/* Glowing bottom line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-rose-bright via-rose-red to-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#ff0054]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
