import { useState, useCallback, useEffect } from 'react';
import { fireConfetti } from '@/utils/confetti';
import { CONTENT } from '@/data/content';

const STAR_POSITIONS = [
  { x: '10%', y: '10%' },
  { x: '70%', y: '18%' },
  { x: '45%', y: '35%' },
  { x: '85%', y: '55%' },
  { x: '20%', y: '70%' },
];

export default function InteractiveMoments() {
  const [wish, setWish] = useState<string | null>(null);
  const [crowned, setCrowned] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const crownDropZone = useCallback(() => {
    if (!crowned) {
      setCrowned(true);
      fireConfetti();
    }
  }, [crowned]);

  const startDrag = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    setDragX(e.clientX - 60);
    setDragY(e.clientY - 60);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;
      setDragX(e.clientX - 60);
      setDragY(e.clientY - 60);
    },
    [dragging]
  );

  const onMouseUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    // drop zone roughly center-right of section
    if (dragX > 500 && dragX < 900 && dragY > 200 && dragY < 500) {
      crownDropZone();
    }
  }, [dragging, dragX, dragY, crownDropZone]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, onMouseMove, onMouseUp]);

  // typewriter
  const [timer, setTimer] = useState<number>();
  useEffect(() => {
    if (!letterOpen) return;
    setTimer(
      window.setInterval(() => {
        setLetterIndex((i) => (i >= CONTENT.letter.length ? i : i + 1));
      }, 25)
    );
    return () => window.clearInterval(timer!);
  }, [letterOpen, timer]);

  const revealLetter = () => {
    setLetterOpen(true);
    setLetterIndex(0);
  };

  const visibleLetter = CONTENT.letter.slice(0, letterIndex);

  const toggleCoupon = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      id="moments"
      className="relative min-h-[100vh] bg-twilight text-white px-6 pt-20 pb-32"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-14 tracking-tight text-center">
          Royal moments
        </h2>

        {/* Wish star */}
        <div className="mb-20">
          <h3 className="text-2xl font-serif text-white mb-8 text-center">Make a wish 🌠</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {STAR_POSITIONS.map((pos, i) => (
              <button
                key={i}
                onClick={() => {
                  setWish(CONTENT.wishMessages[i % CONTENT.wishMessages.length]);
                  fireConfetti();
                }}
                className="relative w-10 h-10 rounded-full bg-transparent border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all group"
                aria-label="Tap a shooting star"
              >
                <span className="text-xl">🌠</span>
                {!wish && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/80 bg-black/60 px-2 py-1 rounded backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                    Make a wish
                  </div>
                )}
              </button>
            ))}
          </div>
          {wish && (
            <div className="mt-8 glass-card text-center py-8 animate-[whoosh_0.6s_ease-out]">
              <p className="text-xl font-serif italic text-rose-gold">{wish}</p>
              <p className="text-white/70 text-sm mt-2">The sky fills with lanterns for you, Jaaanu.</p>
            </div>
          )}
        </div>

        {/* Crown her */}
        <div className="mb-20 relative min-h-[400px]">
          <h3 className="text-2xl font-serif text-white mb-8 text-center">Crown her 👑</h3>
          <div className="flex flex-col items-center justify-center">
            <div
              className="relative w-32 h-40 bg-black/20 rounded-full flex items-center justify-center border border-white/10 mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="text-3xl">👸</span>
              </div>
              {crowned && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-8 w-12 h-12 text-yellow-400 animate-pulse">
                  👑
                </div>
              )}
            </div>
            <div
              className={`absolute drag-crown z-30 w-14 h-14 bg-rose-gold/90 rounded-full border border-yellow-300 shadow-[0_0_20px_rgba(232,180,184,0.8)] flex items-center justify-center cursor-grabbing active:cursor-grabbing transition-transform`}
              style={{
                left: dragging ? dragX : '40%',
                top: dragging ? dragY : '0%',
                transform: dragging ? '' : 'translate(-50%, -50%) scale(0.9)',
              }}
              onMouseDown={startDrag}
            >
              <span className="text-2xl">👑</span>
            </div>
            <div className="mt-16 text-center">
              <p className="text-white/70 text-sm">Drag the crown onto Jaaanu</p>
            </div>
          </div>
          {crowned && (
            <div className="mt-8 glass-card text-center py-6 text-rose-gold font-serif font-bold text-xl animate-[whoosh_0.6s_ease-out]">
              Officially crowned Queen of My Heart
            </div>
          )}
        </div>

        {/* Royal letter */}
        <div className="mb-20">
          <h3 className="text-2xl font-serif text-white mb-8 text-center">The royal letter ✉</h3>
          <div className="flex justify-center">
            <button
              onClick={revealLetter}
              disabled={letterOpen}
              className="glass-card px-10 py-4 rounded-full text-white font-serif text-lg hover:bg-white/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {letterOpen ? 'Reading…' : 'Open the royal letter'}
            </button>
          </div>
          {letterOpen && (
            <div className="mt-10 glass-card p-8 max-w-md mx-auto relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center text-twilight font-bold text-xs">
                ✉
              </div>
              <div className="font-script text-white leading-relaxed italic text-lg">
                {visibleLetter}
              </div>
              {letterIndex >= CONTENT.letter.length && (
                <p className="mt-4 text-right text-rose-gold font-bold text-sm">— Milind</p>
              )}
            </div>
          )}
        </div>

        {/* Coupons */}
        <div>
          <h3 className="text-2xl font-serif text-white mb-8 text-center">Royal coupons 🎫</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {CONTENT.coupons.map((c) => {
              const base =
                'glass-card p-6 flex flex-col items-center text-center cursor-pointer group relative transition-transform duration-500 preserve-3d';
              const flip = flipped.has(c.id) ? 'rotate-y-180' : '';
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCoupon(c.id)}
                  className={`${base} ${flip}`.trim()}
                  aria-label={c.title}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4 shadow-[0_0_15px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform" style={{ backgroundColor: '#c9a227', color: '#1a1033' }}>
                    {c.icon === 'gift' ? '🎁' : c.icon === 'heart' ? '❤' : c.icon === 'film' ? '🎬' : '🤗'}
                  </div>
                  <h4 className="font-serif font-bold text-white text-lg mb-1">{c.title}</h4>
                  <p className="text-white/70 text-xs font-light">{c.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
