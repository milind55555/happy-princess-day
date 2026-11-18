import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let frame = 0;
    const target = 100;
    const speed = 1.8;
    let raf: number;

    const animate = () => {
      frame++;
      // Ease-out progress curve for a natural feel
      const next = Math.min(target, progress + speed * (1 - progress / target) + 0.5);
      setProgress((p) => {
        const val = Math.min(target, p + speed * (1 - p / target) + 0.5);
        if (val >= target) {
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onFinish(), 1000);
          return target;
        }
        return val;
      });
      if (frame < 80) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0f0a1e] transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Crown emoji with pulse */}
      <div className="relative mb-10">
        <div className="text-7xl animate-[gentle-float_3s_ease-in-out_infinite]">👑</div>
        {/* Glow behind crown */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-amber-500/20 blur-2xl animate-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <p className="text-lg font-serif text-white/70 tracking-[0.2em] mb-8">
        Preparing something royal for you,{' '}
        <span className="text-rose-gold font-serif italic text-white/90">Jaaanu</span>…
      </p>

      {/* Progress bar */}
      <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-200 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #e8b4b8, #f5d98b, #c9b6ff)',
          }}
        />
      </div>

      {/* Progress percentage */}
      <p className="mt-4 text-sm text-white/30 font-mono tabular-nums">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
