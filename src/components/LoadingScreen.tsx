import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400; // 1.4 seconds total loading time
    let animationFrameId: number;
    let finished = false;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      // easeOutCubic curve
      const easedProgress = Math.min(100, Math.round((1 - Math.pow(1 - ratio, 3)) * 100));

      setProgress(easedProgress);

      if (ratio < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else if (!finished) {
        finished = true;
        setFadeOut(true);
        setTimeout(() => {
          onFinish();
        }, 500);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0f0a1e] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={() => {
        setFadeOut(true);
        setTimeout(onFinish, 200);
      }}
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
      <p className="text-lg font-serif text-white/70 tracking-[0.2em] mb-8 text-center px-4">
        Preparing something royal for you,{' '}
        <span className="text-rose-gold font-serif italic text-white/90">Jaaanu</span>…
      </p>

      {/* Progress bar */}
      <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-75 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #e8b4b8, #f5d98b, #c9b6ff)',
          }}
        />
      </div>

      {/* Progress percentage */}
      <p className="mt-4 text-sm text-white/40 font-mono tabular-nums">
        {progress}%
      </p>

      <span className="mt-8 text-xs text-white/20 tracking-wider">
        (Tap anywhere to skip)
      </span>
    </div>
  );
}
