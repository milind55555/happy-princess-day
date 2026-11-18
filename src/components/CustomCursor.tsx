import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [hidden, setHidden] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('ontouchstart' in window) {
      setHidden(true);
      return;
    }
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const handleDown = () => setScale(0.7);
    const handleUp = () => setScale(1);
    const handleEnter = () => setScale(1.6);
    const handleLeave = () => setScale(1);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Fading trail of past positions
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  useEffect(() => {
    if (hidden) return;
    const id = setInterval(() => {
      setTrail((prev) => [...prev.slice(-12), { x: pos.x, y: pos.y }]);
    }, 40);
    return () => clearInterval(id);
  }, [pos, hidden]);

  return (
    <>
      {trail.map((p, i) => (
        <div
          key={i}
          className="fixed pointer-events-none rounded-full bg-rose-gold/40 blur-[4px]"
          style={{
            left: p.x - 4,
            top: p.y - 4,
            width: 8,
            height: 8,
            opacity: (i / trail.length) * 0.6,
          }}
        />
      ))}
      {!hidden && cursorRef && (
        <div
          ref={cursorRef}
          className="fixed pointer-events-none rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(232,180,184,0.5)] z-[9999] transition-transform duration-100"
          style={{
            left: pos.x - 10,
            top: pos.y - 10,
            width: 20,
            height: 20,
            transform: `scale(${scale}) translate(-50%, -50%)`,
          }}
        />
      )}
    </>
  );
}
