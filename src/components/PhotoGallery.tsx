import { useRef, useEffect, useState } from 'react';
import { CONTENT } from '@/data/content';

export default function PhotoGallery() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
    >
      {/* Background ambient glow in deep ruby & magenta */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-crimson/15 blur-[160px] pointer-events-none" />

      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-14 text-center sm:text-left">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Our moments 📸
        </h2>
        <p
          className="mt-4 text-rose-pink/70 text-lg font-light max-w-md"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          Every glance, every smile, every heartbeat captured with you.
        </p>
      </div>

      {/* 3 Photos Grid with pink-red glowing borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {CONTENT.photos.map((photo, i) => (
          <div
            key={photo.id}
            className="group"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.15}s`,
            }}
          >
            <div className="glass-card-hover overflow-hidden h-full flex flex-col border-rose-pink/20 hover:border-rose-bright/50">
              {/* Photo container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-3xl bg-wine-dark/30">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#13030b]/90 via-[#220514]/40 to-transparent" />
                <div className="absolute inset-0 bg-rose-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              {/* Caption */}
              <div className="p-5 flex-1 flex items-center justify-center text-center">
                <p className="text-white/95 font-serif text-lg font-light leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
