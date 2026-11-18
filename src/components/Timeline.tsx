import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current!,
        { strokeDasharray: '1000', strokeDashoffset: '1000' },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: lineRef.current!,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="relative min-h-[100vh] bg-twilight text-white px-6 pt-20 pb-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-16 tracking-tight">
          Timeline of us
        </h2>
        <div className="relative">
          {/* vertical line */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
            height="100%"
            width="100%"
          >
            <line
              ref={lineRef}
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="rose-gold"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="transition-all duration-1000 ease-out"
            />
            {/* dots */}
            {CONTENT.timeline.map((e, i) => (
              <circle
                key={e.id}
                cx="50%"
                cy={((i + 1) / (CONTENT.timeline.length + 1)) * 100}
                r="4"
                fill="#ffffff"
              />
            ))}
          </svg>

          {CONTENT.timeline.map((e, i) => {
            const side = i % 2 === 0 ? 'left' : 'right';
            return (
              <div
                key={e.id}
                className={`relative mb-20 ${
                  side === 'left'
                    ? 'pr-10 text-right items-end flex justify-end'
                    : 'pl-10 text-left items-start flex justify-start'
                }`}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-3 rounded-full bg-champagne shadow-[0_0_10px_#f5d98b]"
                />
                <div
                  className={`glass-card w-full max-w-md p-6 ${
                    side === 'left' ? 'ml-4' : 'mr-4'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-rose-gold font-bold text-sm tracking-wider uppercase">{e.year}</span>
                    <span className="text-white/50 text-xs">•</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{e.title}</h3>
                  <p className="text-white/80 font-light leading-relaxed">{e.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
