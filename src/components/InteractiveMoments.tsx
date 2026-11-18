import { useState, useRef, useEffect, useCallback } from 'react';
import { fireConfetti } from '@/utils/confetti';
import { CONTENT } from '@/data/content';

export default function InteractiveMoments() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Wish star state
  const [wish, setWish] = useState<string | null>(null);
  const [wishIndex, setWishIndex] = useState(0);

  // Letter state
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterChars, setLetterChars] = useState(0);
  const letterTimerRef = useRef<number | null>(null);

  // Coupon flip state
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Typewriter effect for the letter
  useEffect(() => {
    if (!letterOpen) return;
    letterTimerRef.current = window.setInterval(() => {
      setLetterChars((c) => {
        if (c >= CONTENT.letter.length) {
          if (letterTimerRef.current) clearInterval(letterTimerRef.current);
          return c;
        }
        return c + 1;
      });
    }, 20);
    return () => {
      if (letterTimerRef.current) clearInterval(letterTimerRef.current);
    };
  }, [letterOpen]);

  const makeWish = useCallback(() => {
    const idx = wishIndex % CONTENT.wishMessages.length;
    setWish(CONTENT.wishMessages[idx]);
    setWishIndex((i) => i + 1);
    fireConfetti();
  }, [wishIndex]);

  const toggleCoupon = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        fireConfetti();
      }
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      id="moments"
      className="relative py-24 sm:py-32 section-padding"
    >
      {/* Background glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-rose-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-violet-900/15 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section title */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight mb-4 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Royal moments ✨
        </h2>
        <p
          className="text-white/40 text-lg font-light text-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Tap, play, and discover little surprises made for you.
        </p>

        {/* ═══ WISH UPON A STAR ═══ */}
        <div
          className="mb-24"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <h3 className="text-2xl font-serif text-white mb-3 text-center">
            Make a wish 🌠
          </h3>
          <p className="text-white/40 text-sm text-center mb-8">
            Tap the star and let the universe listen.
          </p>

          <div className="flex justify-center">
            <button
              onClick={makeWish}
              className="group relative w-20 h-20 rounded-full glass-card flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Make a wish"
            >
              <span className="text-4xl group-hover:animate-[shimmer_1s_ease-in-out]">🌟</span>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-[pulse-glow_3s_ease-in-out_infinite]" />
            </button>
          </div>

          {wish && (
            <div
              className="mt-8 glass-card p-8 text-center max-w-lg mx-auto"
              style={{ animation: 'fade-in-up 0.6s ease-out' }}
            >
              <p className="text-xl font-serif italic gradient-text-gold leading-relaxed">
                "{wish}"
              </p>
              <p className="text-white/40 text-sm mt-4">
                The sky fills with lanterns for you, Jaaanu. ✨
              </p>
            </div>
          )}
        </div>

        {/* ═══ ROYAL LETTER ═══ */}
        <div
          className="mb-24"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
          }}
        >
          <h3 className="text-2xl font-serif text-white mb-3 text-center">
            The royal letter 💌
          </h3>
          <p className="text-white/40 text-sm text-center mb-8">
            A letter from my heart to yours.
          </p>

          {!letterOpen ? (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setLetterOpen(true);
                  setLetterChars(0);
                }}
                className="group glass-card-hover px-8 py-4 rounded-full font-serif text-lg text-white/80 hover:text-white transition-colors"
              >
                <span className="mr-2">✉️</span> Open the royal letter
              </button>
            </div>
          ) : (
            <div
              className="glass-card p-8 sm:p-10 max-w-xl mx-auto relative"
              style={{ animation: 'scale-in 0.5s ease-out' }}
            >
              {/* Seal */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-sm">💖</span>
              </div>

              {/* Letter body */}
              <div className="font-serif text-white/80 leading-relaxed text-base sm:text-lg whitespace-pre-line mt-4">
                {CONTENT.letter.slice(0, letterChars)}
                {letterChars < CONTENT.letter.length && (
                  <span className="inline-block w-0.5 h-5 bg-white/60 ml-0.5 animate-[typewriter-cursor_0.8s_ease-in-out_infinite]" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* ═══ ROYAL COUPONS ═══ */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          }}
        >
          <h3 className="text-2xl font-serif text-white mb-3 text-center">
            Royal coupons 🎫
          </h3>
          <p className="text-white/40 text-sm text-center mb-8">
            Tap to redeem. Valid forever. Because you deserve it.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTENT.coupons.map((coupon, i) => (
              <button
                key={coupon.id}
                onClick={() => toggleCoupon(coupon.id)}
                className={`glass-card-hover p-6 text-left group transition-all duration-500 ${
                  flipped.has(coupon.id)
                    ? 'border-amber-500/20 bg-amber-500/[0.04]'
                    : ''
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.08}s`,
                }}
              >
                {/* Emoji */}
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {coupon.emoji}
                </div>

                {/* Title */}
                <h4 className="font-serif font-bold text-white text-lg mb-2">
                  {coupon.title}
                </h4>

                {/* Subtitle */}
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {coupon.subtitle}
                </p>

                {/* Redeemed badge */}
                {flipped.has(coupon.id) && (
                  <div
                    className="mt-4 inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300/80 text-xs font-medium"
                    style={{ animation: 'scale-in 0.3s ease-out' }}
                  >
                    ✨ Redeemed with love
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
