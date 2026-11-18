import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Home', emoji: '👑' },
  { id: 'why', label: 'Why', emoji: '💜' },
  { id: 'gallery', label: 'Gallery', emoji: '📸' },
  { id: 'timeline', label: 'Story', emoji: '📖' },
  { id: 'moments', label: 'Moments', emoji: '✨' },
  { id: 'finale', label: 'Finale', emoji: '💖' },
];

export default function NavBar() {
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = 'hero';
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            current = s.id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-[#0f0a1e]/80 backdrop-blur-xl border-b border-white/[0.05]'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center">
        <div className="flex items-center gap-1 sm:gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`relative px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeId === s.id
                  ? 'text-white bg-white/[0.1]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
              }`}
              aria-label={`Go to ${s.label}`}
            >
              <span className="sm:hidden">{s.emoji}</span>
              <span className="hidden sm:inline">{s.label}</span>

              {/* Active indicator */}
              {activeId === s.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
