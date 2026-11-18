import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1300;
    let animationFrameId: number;
    let finished = false;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const easedProgress = Math.min(100, Math.round((1 - Math.pow(1 - ratio, 3)) * 100));

      setProgress(easedProgress);

      if (ratio < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else if (!finished) {
        finished = true;
        setFadeOut(true);
        setTimeout(() => {
          onFinish();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#13030b] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={() => {
        setFadeOut(true);
        setTimeout(onFinish, 150);
      }}
    >
      {/* Crown with pink-red glowing aura */}
      <div className="relative mb-10">
        <div className="text-7xl animate-[gentle-float_3s_ease-in-out_infinite]">👑</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-rose-red/30 blur-2xl animate-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <p className="text-lg font-serif text-white/80 tracking-[0.2em] mb-8 text-center px-4">
        Preparing something royal for you,{' '}
        <span className="text-rose-pink font-serif italic text-white/95">Jaaanu</span>…
      </p>

      {/* Progress bar in radiant pink-to-red gradient */}
      <div className="w-64 h-[3.5px] bg-white/10 rounded-full overflow-hidden shadow-[0_0_12px_rgba(255,0,84,0.3)]">
        <div
          className="h-full rounded-full transition-all duration-75 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #ff758f, #ff0054, #c9184a)',
          }}
        />
      </div>

      {/* Progress percentage */}
      <p className="mt-4 text-sm text-rose-pink/70 font-mono tabular-nums">
        {progress}%
      </p>

      <span className="mt-8 text-xs text-white/30 tracking-wider">
        (Tap anywhere to skip)
      </span>
    </div>
  );
}
