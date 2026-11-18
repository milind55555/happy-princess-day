import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { fireConfetti } from '@/utils/confetti';
import { CONTENT } from '@/data/content';

const HEART_COUNT = 1500;

function heartParametric(t: number) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: x * 0.14, y: -y * 0.14, z: (Math.random() - 0.5) * 1.2 };
}

function HeartPoints({ formed }: { formed: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const time = useRef(0);

  const positions = new Float32Array(HEART_COUNT * 3);
  const targets = new Float32Array(HEART_COUNT * 3);
  for (let i = 0; i < HEART_COUNT; i++) {
    const p = heartParametric(Math.random() * Math.PI * 2);
    targets[i * 3] = p.x;
    targets[i * 3 + 1] = p.y;
    targets[i * 3 + 2] = p.z;
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  useFrame((_, delta) => {
    if (!meshRef.current || !geoRef.current) return;
    time.current += delta;
    const pos = geoRef.current.attributes.position.array as Float32Array;
    for (let i = 0; i < HEART_COUNT; i++) {
      if (!formed) {
        pos[i * 3] += Math.sin(time.current + i) * 0.01;
        pos[i * 3 + 1] += Math.cos(time.current + i) * 0.01;
      } else {
        pos[i * 3] += (targets[i * 3] - pos[i * 3]) * 0.06;
        pos[i * 3 + 1] += (targets[i * 3 + 1] - pos[i * 3 + 1]) * 0.06;
        pos[i * 3 + 2] += (targets[i * 3 + 2] - pos[i * 3 + 2]) * 0.06;
      }
    }
    geoRef.current.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time.current * 0.05;
    meshRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.2;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geoRef} attach="geometry">
        <bufferAttribute attach="attributes-position" count={HEART_COUNT} itemSize={3} array={positions} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color={0xffd6e8} transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

export default function Finale() {
  const [formed, setFormed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFormed(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <section
      id="finale"
      className="relative min-h-[100vh] w-full bg-twilight text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color={0xffd6e8} />
          <HeartPoints formed={formed} />
        </Canvas>
      </div>

      <div className="relative z-20 px-6 text-center max-w-xl">
        <h1
          className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight text-shadow"
          style={{ opacity: formed ? 1 : 0, transform: formed ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease-out' }}
        >
          {CONTENT.finale.message}
        </h1>
        <p className="text-xl font-script text-rose-gold/90 mb-10 italic text-shadow">
          {CONTENT.finale.from}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setFormed(false);
              fireConfetti();
              setTimeout(() => setFormed(true), 600);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full border border-rose-gold bg-rose-gold text-twilight font-serif font-bold text-lg tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(232,180,184,0.6)]"
          >
            Replay the magic ✨
          </button>
          <button
            onClick={fireConfetti}
            className="px-8 py-4 rounded-full border border-white/20 bg-white/10 text-white font-serif font-bold text-lg tracking-wider hover:bg-white/20 transition-all backdrop-blur-sm"
          >
            Send a hug back 🤗
          </button>
        </div>
        <div className="mt-10 flex gap-4 justify-center">
          <a
            href={CONTENT.contact.whatsapp}
            target="_blank"
            rel="noopener"
            className="px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all"
          >
            WhatsApp Milind
          </a>
          <a
            href={CONTENT.contact.email}
            className="px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all"
          >
            Email Milind
          </a>
        </div>
      </div>
    </section>
  );
}
