import confetti from 'canvas-confetti';

export function fireConfetti() {
  if (typeof window === 'undefined') return;
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 100, ticks: 60, zIndex: 50 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#ff0054', '#ff4d6d', '#ff758f', '#c9184a', '#ffe5ec', '#fed7aa', '#ffffff'],
    });
  }, 250);
}
