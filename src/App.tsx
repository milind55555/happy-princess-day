import { useState, useEffect, useRef, useCallback } from 'react';
import { useLenis, scrollToTop } from '@/hooks/useLenis';
import LoadingScreen from '@/components/LoadingScreen';
import EntranceGate from '@/components/EntranceGate';
import HeroScene from '@/components/HeroScene';
import WhyPrincess from '@/components/WhyPrincess';
import Timeline from '@/components/Timeline';
import InteractiveMoments from '@/components/InteractiveMoments';
import Finale from '@/components/Finale';
import NavDots from '@/components/NavDots';
import MusicControl from '@/components/MusicControl';
import CustomCursor from '@/components/CustomCursor';
import { CONTENT } from '@/data/content';

const SECTION_IDS = ['hero', 'why', 'gallery', 'timeline', 'moments', 'finale'];

export default function App() {
  const [stage, setStage] = useState<'loading' | 'gate' | 'open'>('loading');
  const [activeId, setActiveId] = useState('hero');
  const { lenis, scrollTo } = useLenis();
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (stage === 'loading') {
      scrollToTop();
    }
  }, [stage]);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      const y = window.scrollY;
      let active = 'hero';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) active = id;
        }
      }
      setActiveId(active);
    };
    lenis.on('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      lenis.off('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [lenis]);

  const handleEnter = useCallback(() => {
    setStage('gate');
  }, []);

  const handleOpen = useCallback(() => {
    setStage('open');
    setTimeout(() => {
      lenis?.scrollTo(0, { immediate: true });
    }, 100);
  }, [lenis]);

  const crownSparkle = useCallback(() => {
    // handled inside CrownScene + confetti
  }, []);

  return (
    <div className="relative min-h-screen bg-twilight text-white">
      <CustomCursor />
      <MusicControl src="/assets/music/song.mp3" />

      {stage === 'loading' && (
        <LoadingScreen onFinish={handleEnter} />
      )}

      {stage === 'gate' && (
        <EntranceGate onEnter={handleOpen} />
      )}

      {stage === 'open' && (
        <main className="relative z-10 min-h-screen">
          <HeroScene
            herName={CONTENT.her}
            himName={CONTENT.him}
            nickname={CONTENT.nickname}
            onCrownSparkle={crownSparkle}
          />
          <WhyPrincess />
          <Timeline />
          <InteractiveMoments />
          <Finale />
        </main>
      )}

      {stage === 'open' && <NavDots activeId={activeId} />}
    </div>
  );
}
