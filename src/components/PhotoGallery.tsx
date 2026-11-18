import { useRef, useEffect, useState } from 'react';
import { CONTENT } from '@/data/content';

export default function PhotoGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
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
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Section header */}
      <div className="section-padding mb-12">
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
          className="mt-4 text-white/40 text-lg font-light max-w-md"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          Swipe through our favorite memories together.
        </p>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar px-6 sm:px-8 md:px-12 lg:px-16 pb-6 snap-x snap-mandatory"
        style={{ scrollPaddingLeft: '1.5rem' }}
      >
        {CONTENT.photos.map((photo, i) => (
          <div
            key={photo.id}
            className="flex-none w-[280px] sm:w-[320px] md:w-[360px] snap-center group"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s`,
            }}
          >
            <div className="glass-card-hover overflow-hidden">
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-3xl">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              {/* Caption */}
              <div className="p-5">
                <p className="text-white/80 font-serif text-base font-light leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint on mobile */}
      <div className="flex justify-center mt-6 sm:hidden">
        <div className="flex gap-1">
          {CONTENT.photos.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
    </section>
  );
}
