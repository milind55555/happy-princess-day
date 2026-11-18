import { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';

type Stage = 'assemble' | 'done';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<Stage>('assemble');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let t = 0;
    const iv = setInterval(() => {
      t += 12;
      setProgress(Math.min(t, 100));
      if (t >= 100) {
        clearInterval(iv);
        setTimeout(() => setStage('done'), 400);
        setTimeout(() => onFinish(), 1100);
      }
    }, 40);
    return () => clearInterval(iv);
  }, [onFinish]);

  const sparkles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    return {
      id: i,
      x: 140 + Math.cos(angle) * 120,
      y: 220 + Math.sin(angle) * 120,
      delay: i * 0.06,
    };
  });

  return (
    <div
      className="fixed inset-0 z-[100] bg-twilight flex flex-col items-center justify-center text-white transition-opacity duration-1000"
      style={{ opacity: stage === 'done' ? 0 : 1 }}
    >
      <div className="relative w-48 h-48 flex items-center justify-center mb-12">
        <Crown className="w-24 h-24 text-rose-gold/20 animate-pulse-soft" />
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]"
            style={{
              left: s.x,
              top: s.y,
              opacity: 0,
              animation: `sparkle 2s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <p className="text-lg font-serif text-white/80 tracking-widest animate-[whoosh_0.6s_ease-out]">
        Preparing something royal for you, <span className="text-rose-gold font-serif italic">Jaaanu</span>…
      </p>
      <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-gold via-champagne to-lavender transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
