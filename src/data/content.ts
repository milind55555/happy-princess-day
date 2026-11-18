export type Coupon = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
};

export type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  body: string;
  emoji: string;
};

export type Reason = {
  id: string;
  text: string;
  emoji: string;
  gradient: string;
};

export interface Content {
  her: string;
  him: string;
  nickname: string;
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  reasons: Reason[];
  photos: {
    id: string;
    src: string;
    caption: string;
  }[];
  timeline: TimelineEvent[];
  wishMessages: string[];
  letter: string;
  coupons: Coupon[];
  finale: {
    message: string;
    from: string;
    ps: string;
  };
  contact: {
    whatsapp: string;
    email: string;
  };
}

export const CONTENT: Content = {
  her: 'Anjali',
  him: 'Milind',
  nickname: 'Jaaanu',
  hero: {
    title: 'Happy Princess Day',
    subtitle: 'Jaaanu 👑',
    tagline: 'A little kingdom I built, just for the queen of my heart.',
  },
  reasons: [
    {
      id: 'r1',
      text: 'The way your eyes light up when you talk about the moon — like you carry starlight inside you.',
      emoji: '🌙',
      gradient: 'from-violet-500/20 to-indigo-500/20',
    },
    {
      id: 'r2',
      text: 'You make Pune feel like home, just by being in it. Every street becomes our story.',
      emoji: '🏡',
      gradient: 'from-rose-500/20 to-pink-500/20',
    },
    {
      id: 'r3',
      text: 'My Jaaanu is a Cutepie — and that\'s a scientifically proven, universally acknowledged fact.',
      emoji: '✨',
      gradient: 'from-amber-500/20 to-yellow-500/20',
    },
    {
      id: 'r4',
      text: 'You turn ordinary chai breaks into royal memories. Every moment with you becomes golden.',
      emoji: '🌹',
      gradient: 'from-red-500/20 to-rose-500/20',
    },
    {
      id: 'r5',
      text: 'Your laugh is the crown jewel of my day. I\'d do anything just to hear it one more time.',
      emoji: '💎',
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      id: 'r6',
      text: 'Because you are, and always will be, my princess. My Jaaanu. My forever.',
      emoji: '👑',
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
  ],
  photos: [
    { id: 'p1', src: '/assets/photos/couple1.jpg', caption: 'Us, together 💕' },
    { id: 'p2', src: '/assets/photos/couple2.jpg', caption: 'My favorite place — next to you' },
    { id: 'p3', src: '/assets/photos/couple3.jpg', caption: 'You & me, always ❤️' },
    { id: 'p4', src: '/assets/photos/photo1.svg', caption: 'Our Pune internship days' },
    { id: 'p5', src: '/assets/photos/photo2.svg', caption: 'Moonlit conversations' },
    { id: 'p6', src: '/assets/photos/photo3.svg', caption: 'Jaaanu being a Cutepie' },
    { id: 'p7', src: '/assets/photos/photo4.svg', caption: 'First coffee together' },
    { id: 'p8', src: '/assets/photos/photo5.svg', caption: 'Rose-gold sunsets' },
  ],
  timeline: [
    {
      id: 't1',
      year: '2025',
      title: 'The Day Everything Changed',
      body: 'An internship in Pune. I walked through that office door, and there you were — my favorite reason to show up every single morning.',
      emoji: '💫',
    },
    {
      id: 't2',
      year: '2025',
      title: 'First Coffee, First Butterflies',
      body: 'Nervous smiles across the table, your laugh filling the café, and a rose-gold sunset we watched together — neither of us wanted that evening to end.',
      emoji: '☕',
    },
    {
      id: 't3',
      year: '2025',
      title: 'When "Us" Became Official',
      body: '"My Jaaanu is a Cutepie" became our anthem. The moon became our witness. Inside jokes became our secret language.',
      emoji: '🌙',
    },
    {
      id: 't4',
      year: '2026',
      title: 'Today — Your Kingdom Awaits',
      body: 'Happy Princess Day, Jaaanu. From strangers in Pune to the most beautiful story I know. You rule my heart, completely and forever.',
      emoji: '👑',
    },
  ],
  wishMessages: [
    'May every wish you whisper to the stars come true, one by one, like petals falling softly.',
    'I wish you endless joy — in every season, every sunrise, every quiet moment.',
    'May your days be as soft as rose petals and as bright as the full moon on a clear night.',
    'I wish you always feel as cherished and adored as you make me feel every single day.',
    'May the universe conspire to give you everything your heart desires — you deserve all of it.',
  ],
  letter:
    'My dearest Jaaanu,\n\nThere is no ordinary way to say what you mean to me, so I built you a whole kingdom instead.\n\nYou are the rose-gold in my twilight sky, the moon that lights up my darkest nights, and the princess who turned my ordinary world into the most beautiful fairytale.\n\nRemember our first days in Pune? Two strangers who somehow knew they\'d become each other\'s favorite person. Every coffee, every sunset, every late-night conversation — they all led to this. To us.\n\nThank you for being my Cutepie, my favorite person to call, my home in Pune and everywhere beyond. Every single day with you feels like a royal occasion.\n\nYou make me want to be better, dream bigger, and love harder. And I promise — I will spend every day making you feel like the princess you truly are.\n\nI love you, Jaaanu. Endlessly. Completely. Forever.\n\n— Your Milind 💖',
  coupons: [
    { id: 'c1', title: 'Royal Dinner Date', subtitle: 'Your pick of cuisine, your pick of place. My treat, always.', emoji: '🍽️' },
    { id: 'c2', title: 'Unlimited Hugs Pass', subtitle: 'Valid forever. No expiry date. Redeemable anywhere, anytime.', emoji: '🤗' },
    { id: 'c3', title: 'Movie Night Coupon', subtitle: 'Rom-com, thriller, or just moon-gazing on the terrace. Your call.', emoji: '🎬' },
    { id: 'c4', title: 'Handwritten Love Letter', subtitle: 'Whenever your heart needs one. Just say the word.', emoji: '💌' },
    { id: 'c5', title: 'Surprise Adventure Day', subtitle: 'A whole day planned by me, just for you. No questions asked.', emoji: '🗺️' },
    { id: 'c6', title: 'Midnight Ice Cream Run', subtitle: 'Because sometimes all you need is ice cream at 2 AM. I\'ll drive.', emoji: '🍦' },
  ],
  finale: {
    message: 'I love you, Anjali',
    from: 'Forever & always yours, Milind',
    ps: 'P.S. — You\'re not just my princess. You\'re my entire kingdom. 💖',
  },
  contact: {
    whatsapp: 'https://wa.me/919322073055',
    email: 'mailto:hanchatemilind291@gmail.com',
  },
};
