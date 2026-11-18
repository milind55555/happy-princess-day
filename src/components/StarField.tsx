import { useMemo } from 'react';

/**
 * A lightweight, GPU-accelerated romantic pink & red starfield.
 * Deep crimson-wine atmosphere with radiant rose and ruby ambient orbs.
 */
export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 85 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.3,
      color: i % 4 === 0 ? '#ff4d6d' : i % 4 === 1 ? '#ff758f' : i % 4 === 2 ? '#ffb3c1' : '#ffffff',
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Deep romantic wine & midnight crimson backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#13030b] via-[#200412] to-[#13030b]" />

      {/* Radiant romantic glows (Pink & Ruby Red) */}
      <div className="absolute top-[12%] left-[10%] w-[450px] h-[450px] rounded-full bg-rose-red/15 blur-[140px]" />
      <div className="absolute top-[38%] right-[8%] w-[500px] h-[500px] rounded-full bg-crimson/15 blur-[150px]" />
      <div className="absolute top-[65%] left-[25%] w-[400px] h-[400px] rounded-full bg-rose-bright/15 blur-[130px]" />
      <div className="absolute bottom-[5%] right-[20%] w-[450px] h-[450px] rounded-full bg-ruby/15 blur-[140px]" />

      {/* Subtle radial heart light in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-radial from-rose-red/10 via-transparent to-transparent blur-[160px]" />

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
            backgroundColor: star.color,
            boxShadow: `0 0 6px ${star.color}`,
            '--duration': star.duration,
            '--delay': star.delay,
            opacity: star.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
