import { useRef, useEffect, useState, useCallback } from 'react';
import CrownScene from '@/scenes/CrownScene';

interface HeroSceneProps {
  herName: string;
  himName: string;
  nickname: string;
  onCrownSparkle?: () => void;
}

export default function HeroScene({ herName, himName, nickname, onCrownSparkle }: HeroSceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);

  const handleMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer({ x, y });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      const rect = el.getBoundingClientRect();
      const x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((t.clientY - rect.top) / rect.height) * 2 - 1;
      setPointer({ x, y });
    }, { passive: true });
    setTimeout(() => setRevealed(true), 300);
    return () => {
      el.removeEventListener('mousemove', handleMove);
    };
  }, [handleMove]);

  const title = `Happy Princess Day, ${nickname} 👑`;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-center bg-twilight text-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <CrownScene onCrownClick={() => onCrownSparkle?.()} pointer={pointer} />
      </div>

      <div className="relative z-20 px-6 text-center max-w-2xl">
        <h1
          className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 tracking-tight text-shadow"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)' }}
        >
          {title.split('').map((ch, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'none' : 'translateY(16px)',
                transition: `all 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * 0.04}s`,
              }}
            >
              {ch}
            </span>
          ))}
        </h1>
        <p className="text-xl md:text-2xl font-script text-rose-gold/90 mb-10 tracking-wider italic text-shadow">
          {herName}, because every princess deserves a day made just for her.
        </p>
        <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
          Step through the gate and into a night built just for you.
        </p>
      </div>
    </section>
  );
}
