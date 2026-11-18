import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { fireConfetti } from '@/utils/confetti';

const GOLD = 0xc9a227;
const GEM = 0xffd6e8;

function PointerTilt({ setTilt }: { setTilt: (v: { x: number; y: number }) => void }) {
  const { pointer } = useThree();
  useFrame(() => {
    setTilt({ x: pointer.x, y: pointer.y });
  });
  return null;
}

function CrownGroup({ tilt, onClick }: { tilt: { x: number; y: number }; onClick?: () => void }) {
  const ref = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    ref.current.rotation.y = time.current * 0.14;
    ref.current.position.y = 0.35 + Math.sin(time.current * 1.6) * 0.04;
    ref.current.rotation.x += (tilt.y * 0.12 - ref.current.rotation.x) * 0.08;
    ref.current.rotation.z += (-tilt.x * 0.12 - ref.current.rotation.z) * 0.08;
  });

  return (
    <group ref={ref} position={[0, 0.4, 0]} onClick={onClick}>
      {/* band */}
      <mesh>
        <cylinderGeometry args={[0.42, 0.55, 0.3, 32]} />
        <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.14} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      {/* spikes */}
      {[...Array(6)].map((_, i) => {
        const sx = Math.cos((i / 6) * Math.PI * 2) * 0.6;
        const sz = Math.sin((i / 6) * Math.PI * 2) * 0.6;
        return (
          <mesh key={i} position={[sx, 0.45, sz]} rotation={[-0.5, 0, 0]}>
            <coneGeometry args={[0.1, 0.62, 8]} />
            <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.14} clearcoat={1} />
          </mesh>
        );
      })}
      {/* central gem */}
      <mesh position={[0, 0.55, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshPhysicalMaterial
          color={GEM}
          metalness={0.05}
          roughness={0.04}
          transmission={0.72}
          transparent
          opacity={0.92}
          emissive={GEM}
          emissiveIntensity={0.16}
        />
      </mesh>
    </group>
  );
}

function Sparkle({ x, y, z, color = 0xffffff, delay = 0 }: { x: number; y: number; z: number; color?: number; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    ref.current.position.y = y + Math.sin(time.current * 3 + delay) * 0.08;
    ref.current.rotation.z += 0.05;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.4 + 0.6 * Math.sin(time.current * 4 + delay);
  });
  return (
    <mesh ref={ref} position={[x, y, z]}>
      <icosahedronGeometry args={[0.045, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Petal({ x, y, z, delay = 0 }: { x: number; y: number; z: number; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    ref.current.position.y = y + Math.sin(time.current * 1.2 + delay) * 0.12;
    ref.current.rotation.z = time.current * 0.35 + delay;
  });
  return (
    <mesh position={[x, y, z]} rotation={[Math.PI / 4, 0, 0]}>
      <ringGeometry args={[0.12, 0.22, 14]} />
      <meshBasicMaterial color={GEM} transparent opacity={0.45} />
    </mesh>
  );
}

export default function CrownScene({
  onCrownClick,
  pointer,
}: {
  onCrownClick?: () => void;
  pointer: { x: number; y: number };
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTilt(pointer);
  }, [pointer]);

  const sparkles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const r = 1.35 + (i % 3) * 0.25;
    return {
      key: i,
      x: Math.cos(angle) * r,
      y: 0.5 + Math.sin(angle * 1.3) * 0.5,
      z: Math.sin(angle) * r,
      color: i % 2 === 0 ? GEM : GOLD,
      delay: i * 0.3,
    };
  });

  const petals = Array.from({ length: 6 }, (_, i) => ({
    key: i,
    x: Math.cos(i) * 2.1,
    y: Math.sin(i * 0.7) * 0.7,
    z: Math.sin(i) * 2.1,
    delay: i * 0.5,
  }));

  const handleClick = () => {
    fireConfetti();
    onCrownClick?.();
  };

  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 45 }}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Stars radius={130} depth={60} count={350} factor={3} saturation={0} speed={0} />
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 4, 6]} intensity={1.1} color={GEM} />
      <pointLight position={[-5, -2, 5]} intensity={0.7} color={0xc9b6ff} />

      <PointerTilt setTilt={setTilt} />
      <CrownGroup tilt={tilt} onClick={handleClick} />

      {sparkles.map((s) => (
        <Sparkle key={s.key} x={s.x} y={s.y} z={s.z} color={s.color} delay={s.delay} />
      ))}
      {petals.map((p) => (
        <Petal key={p.key} x={p.x} y={p.y} z={p.z} delay={p.delay} />
      ))}
    </Canvas>
  );
}
