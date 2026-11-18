import { useState, useRef, useEffect } from 'react';
import { fireConfetti } from '@/utils/confetti';
import { CONTENT } from '@/data/content';

export default function Finale() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          fireConfetti();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="relative min-h-screen w-full flex flex-col items-center justify-center section-padding py-24 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-900/15 blur-[160px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-violet-900/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-amber-900/10 blur-[100px]" />
      </div>

      {/* Floating hearts (CSS only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute text-lg sm:text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `float-up ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.15,
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '✨' : '💖'}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Heart emoji */}
        <div
          className="text-7xl sm:text-8xl mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.7)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          💖
        </div>

        {/* Main message */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold gradient-text leading-tight tracking-tight mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {CONTENT.finale.message}
        </h1>

        {/* From */}
        <p
          className="text-xl sm:text-2xl font-serif italic text-white/60 mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          {CONTENT.finale.from}
        </p>

        {/* P.S. */}
        <p
          className="text-base text-white/40 font-light mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
          }}
        >
          {CONTENT.finale.ps}
        </p>

        {/* Action buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 1s',
          }}
        >
          <button
            onClick={() => {
              fireConfetti();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 rounded-full font-serif font-bold text-lg tracking-wider transition-all duration-300 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #e8b4b8, #f5d98b)',
              color: '#0f0a1e',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Replay the magic ✨</span>
          </button>

          <button
            onClick={fireConfetti}
            className="px-8 py-4 rounded-full glass-card font-serif font-bold text-lg text-white/80 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
          >
            Send a hug back 🤗
          </button>
        </div>

        {/* Contact links */}
        <div
          className="flex gap-4 justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 1.2s',
          }}
        >
          <a
            href={CONTENT.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full glass-card text-white/60 text-sm font-medium hover:text-white hover:bg-white/[0.06] transition-all duration-300"
          >
            💬 WhatsApp
          </a>
          <a
            href={CONTENT.contact.email}
            className="px-6 py-3 rounded-full glass-card text-white/60 text-sm font-medium hover:text-white hover:bg-white/[0.06] transition-all duration-300"
          >
            ✉️ Email
          </a>
        </div>
      </div>
    </section>
  );
}
