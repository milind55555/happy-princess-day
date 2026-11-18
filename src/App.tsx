import { useState, useEffect, useCallback, useRef } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import EntranceGate from '@/components/EntranceGate';
import HeroScene from '@/components/HeroScene';
import WhyPrincess from '@/components/WhyPrincess';
import PhotoGallery from '@/components/PhotoGallery';
import Timeline from '@/components/Timeline';
import InteractiveMoments from '@/components/InteractiveMoments';
import Finale from '@/components/Finale';
import NavBar from '@/components/NavBar';
import MusicControl from '@/components/MusicControl';
import StarField from '@/components/StarField';

type Stage = 'loading' | 'gate' | 'main';

export default function App() {
  const [stage, setStage] = useState<Stage>('loading');

  const handleLoadingDone = useCallback(() => {
    setStage('gate');
  }, []);

  const handleEnter = useCallback(() => {
    setStage('main');
    // Scroll to top when entering main
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] text-white overflow-x-hidden">
      {/* Global star field — lightweight CSS only */}
      <StarField />

      {/* Music control — always visible after loading */}
      {stage !== 'loading' && <MusicControl src="/assets/music/song.mp3" />}

      {/* Loading screen */}
      {stage === 'loading' && <LoadingScreen onFinish={handleLoadingDone} />}

      {/* Entrance gate */}
      {stage === 'gate' && <EntranceGate onEnter={handleEnter} />}

      {/* Main content */}
      {stage === 'main' && (
        <>
          <NavBar />
          <main>
            <HeroScene />
            <WhyPrincess />
            <PhotoGallery />
            <Timeline />
            <InteractiveMoments />
            <Finale />
          </main>
        </>
      )}
    </div>
  );
}
