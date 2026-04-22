"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles, PerspectiveCamera } from "@react-three/drei";

export default function BackgroundParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Sparkles
          count={100}
          scale={[15, 10, 10]}
          color="#00c389"
          size={4}
          speed={0.5}
          noise={0.2}
          opacity={0.6}
        />
        <Sparkles
          count={50}
          scale={[10, 10, 5]}
          color="#ffffff"
          size={2}
          speed={1}
          noise={1}
          opacity={0.3}
        />
      </Canvas>
    </div>
  );
}
