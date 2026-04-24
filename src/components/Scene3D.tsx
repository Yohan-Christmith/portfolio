"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function PortraitPointCloud() {
  const texture = useLoader(THREE.TextureLoader, "/images/portrait.jpg");
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  // Temporary vectors for math - declared outside of loop for performance
  const tempVec = new THREE.Vector3();
  const targetVec = new THREE.Vector3();
  const initialVec = new THREE.Vector3();
  const mouseVec = new THREE.Vector3();
  const pushVec = new THREE.Vector3();

  const { positions, colors, initialPositions } = useMemo(() => {
    const img = texture.image;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Sample resolution
    const res = 120; 
    canvas.width = res;
    canvas.height = res;
    
    if (!ctx) return { positions: new Float32Array(0), colors: new Float32Array(0), initialPositions: new Float32Array(0) };
    
    ctx.drawImage(img, 0, 0, res, res);
    const data = ctx.getImageData(0, 0, res, res).data;
    
    const pos = new Float32Array(res * res * 3);
    const col = new Float32Array(res * res * 3);
    const initialPos = new Float32Array(res * res * 3);
    
    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        const idx = (i * res + j) * 4;
        const vertexIdx = (i * res + j) * 3;
        
        const r = data[idx] / 255;
        const g = data[idx + 1] / 255;
        const b = data[idx + 2] / 255;
        const brightness = (r + g + b) / 3;

        const x = (j - res / 2) * 0.05;
        const y = -(i - res / 2) * 0.05;
        const z = brightness * 0.5;

        pos[vertexIdx] = x;
        pos[vertexIdx + 1] = y;
        pos[vertexIdx + 2] = z;

        initialPos[vertexIdx] = x;
        initialPos[vertexIdx + 1] = y;
        initialPos[vertexIdx + 2] = z;

        col[vertexIdx] = r;
        col[vertexIdx + 1] = g;
        col[vertexIdx + 2] = b;
      }
    }
    
    return { positions: pos, colors: col, initialPositions: initialPos };
  }, [texture]);

  const timeRef = useRef(0);
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    timeRef.current += delta;
    const time = timeRef.current;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    // Check if mouse has moved from center (0,0 is the default initial state in R3F)
    const isMouseActive = mouse.x !== 0 || mouse.y !== 0;
    
    // Map mouse to 3D space. If not active, start at the bottom.
    if (isMouseActive) {
      mouseVec.set(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0);
    } else {
      mouseVec.set(0, -viewport.height / 2, 0);
    }
    
    for (let i = 0; i < posAttr.count; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        initialVec.set(initialPositions[ix], initialPositions[iy], initialPositions[iz]);
        tempVec.set(posAttr.array[ix], posAttr.array[iy], posAttr.array[iz]);
        
        // Target is the initial position by default (Snap back)
        targetVec.copy(initialVec);

        // Calculate distance to mouse
        const dist = tempVec.distanceTo(mouseVec);
        const radius = 1.2; // Interaction radius
        
        if (dist < radius) {
            // Push intensity based on distance
            const force = (radius - dist) / radius;
            pushVec.copy(tempVec).sub(mouseVec).normalize().multiplyScalar(force * 0.5);
            targetVec.add(pushVec);
        }

        // Smoothly move towards target
        tempVec.lerp(targetVec, 0.1);
        
        // Add subtle wave to the "stable" state
        const wave = Math.sin(initialVec.x * 2 + time) * 0.02;
        tempVec.z += wave;

        posAttr.array[ix] = tempVec.x;
        posAttr.array[iy] = tempVec.y;
        posAttr.array[iz] = tempVec.z;
    }
    
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.035} 
        vertexColors 
        transparent 
        opacity={0.9}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full min-h-125 bg-background cursor-grab active:cursor-grabbing">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} />
        <ambientLight intensity={1} />
        
        <Suspense fallback={null}>
          <PortraitPointCloud />
        </Suspense>
        
        <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            minDistance={3} 
            maxDistance={10}
        />
      </Canvas>
    </div>
  );
}


