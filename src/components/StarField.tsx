import { useMemo } from 'react';

/**
 * A lightweight, GPU-accelerated star field using pure CSS.
 * No Three.js, no canvas — just positioned divs with CSS animations.
 * Fixed position so it stays behind all content as you scroll.
 */
export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a1e] via-[#1a1033] to-[#0f0a1e]" />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': star.duration,
            '--delay': star.delay,
            opacity: star.opacity,
          } as React.CSSProperties}
        />
      ))}

      {/* Soft ambient glows */}
      <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] rounded-full bg-violet-900/20 blur-[120px]" />
      <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full bg-rose-900/15 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[40%] w-[300px] h-[300px] rounded-full bg-indigo-900/20 blur-[100px]" />
    </div>
  );
}
