export type Coupon = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'gift' | 'heart' | 'film' | 'hug';
};

export type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  body: string;
};

export type Reason = {
  id: string;
  text: string;
  icon: 'heart' | 'star' | 'rose' | 'moon' | 'key' | 'sparkle';
  color: string;
};

export interface Content {
  her: string;
  him: string;
  nickname: string;
  metStory: string;
  colors: {
    twilight: string;
    roseGold: string;
    champagne: string;
    lavender: string;
    blush: string;
  };
  hero: {
    title: string;
    sub: string;
    crownClick: string;
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
  metStory:
    "We met during an internship in Pune — two strangers in the same office, and somehow you became my favorite part of every day.",
  colors: {
    twilight: '#1a1033',
    roseGold: '#e8b4b8',
    champagne: '#f5d98b',
    lavender: '#c9b6ff',
    blush: '#ffd6e8',
  },
  hero: {
    title: 'Happy Princess Day, Jaaanu 👑',
    sub: 'Because every princess deserves a day made just for her.',
    crownClick: 'Sparkle burst!',
  },
  reasons: [
    {
      id: 'r1',
      text: 'The way your eyes light up when you talk about the moon.',
      icon: 'moon',
      color: '#c9b6ff',
    },
    {
      id: 'r2',
      text: 'You make Pune feel like home, just by being in it.',
      icon: 'heart',
      color: '#e8b4b8',
    },
    {
      id: 'r3',
      text: 'My Jaaanu is a Cutepie — and that\'s a scientifically proven fact.',
      icon: 'sparkle',
      color: '#f5d98b',
    },
    {
      id: 'r4',
      text: 'You turn ordinary moments into royal memories.',
      icon: 'rose',
      color: '#d45087',
    },
    {
      id: 'r5',
      text: 'Your laugh is the crown jewel of my day.',
      icon: 'star',
      color: '#c9a227',
    },
    {
      id: 'r6',
      text: 'Because you are, and always will be, my princess.',
      icon: 'key',
      color: '#ffd6e8',
    },
  ],
  photos: [
    { id: 'p1', src: '/assets/photos/photo1.svg', caption: 'Our Pune internship days' },
    { id: 'p2', src: '/assets/photos/photo2.svg', caption: 'Moonlit conversations' },
    { id: 'p3', src: '/assets/photos/photo3.svg', caption: 'Jaaanu being a Cutepie' },
    { id: 'p4', src: '/assets/photos/photo4.svg', caption: 'First coffee together' },
    { id: 'p5', src: '/assets/photos/photo5.svg', caption: 'Rose-gold sunsets' },
    { id: 'p6', src: '/assets/photos/photo6.svg', caption: 'Lazy Sunday mornings' },
    { id: 'p7', src: '/assets/photos/photo7.svg', caption: 'Stargazing in the city' },
    { id: 'p8', src: '/assets/photos/photo8.svg', caption: 'Us, always' },
  ],
  timeline: [
    { id: 't1', year: '2025', title: 'The day we met', body: 'An internship in Pune. I walked in, and you were already my favorite reason to stay.' },
    { id: 't2', year: '2025', title: 'First coffee', body: 'Nervous smiles, long conversations, and a rose-gold sunset we didn\'t want to end.' },
    { id: 't3', year: '2025', title: 'Inside jokes born', body: '"My Jaaanu is a Cutepie" became our anthem, and the moon became our witness.' },
    { id: 't4', year: '2026', title: 'Today', body: 'Happy Princess Day, Jaaanu. You rule my heart completely.' },
  ],
  wishMessages: [
    'May every wish you whisper to the stars come true.',
    'I wish you endless joy, in every season.',
    'May your days be as soft as rose petals and as bright as the moon.',
    'I wish you always feel as cherished as you make me feel.',
  ],
  letter:
    'My dearest Jaaanu,\n\nThere is no ordinary way to say this, so I made a whole kingdom instead. You are the rose-gold in my twilight, the moon in my night, and the princess who turned my world into a fairytale.\n\nThank you for being my Cutepie, my favorite conversation, and my home in Pune and beyond. Every day with you feels like a royal occasion.\n\nI love you, endlessly.\n\n— Milind',
  coupons: [
    { id: 'c1', title: 'One free dinner date', subtitle: 'Your pick of cuisine, my treat.', icon: 'gift' },
    { id: 'c2', title: 'Unlimited hugs', subtitle: 'Valid forever, no expiry.', icon: 'heart' },
    { id: 'c3', title: 'Movie night, your pick', subtitle: 'Rom-com, thriller, or moon-gazing.', icon: 'film' },
    { id: 'c4', title: 'A handwritten letter', subtitle: 'Whenever you need one.', icon: 'hug' },
  ],
  finale: {
    message: 'I love you, Anjali. Happy Princess Day 💖',
    from: 'Forever yours, Milind',
  },
  contact: {
    whatsapp: 'https://wa.me/919322073055',
    email: 'mailto:hanchatemilind291@gmail.com',
  },
};
