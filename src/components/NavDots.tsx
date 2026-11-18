import { useEffect, useState } from 'react';
const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'why', label: 'Why' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'moments', label: 'Moments' },
  { id: 'finale', label: 'Finale' },
];

export default function NavDots({ activeId }: { activeId: string }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const progress = Math.min(Math.max(scrollY / 2200, 0), 1);

  return (
    <nav
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pointer-events-none"
      aria-label="Scroll progress"
    >
      <div
        className="w-1 h-[200px] bg-white/10 rounded-full absolute left-1/2 -translate-x-1/2 top-0"
      />
      <div
        className="w-1 bg-gradient-to-b from-rose-gold to-champagne rounded-full absolute left-1/2 -translate-x-1/2 top-0"
        style={{ height: `${progress * 200}px` }}
      />
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => {
            const el = document.getElementById(s.id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label={`Go to ${s.label} section`}
          className={`pointer-events-auto w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            activeId === s.id
              ? 'bg-rose-gold w-3 h-3 shadow-[0_0_12px_rgba(232,180,184,0.8)]'
              : 'bg-white/20 hover:bg-white/40'
          }`}
        />
      ))}
    </nav>
  );
}
