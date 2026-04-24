"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState, useCallback, Suspense } from "react";
import * as THREE from "three";

interface BubbleData {
  name: string;
  href: string;
  color: string;
  iconPath: string; // SVG path data
}

const socials: BubbleData[] = [
  {
    name: "GitHub",
    href: "https://github.com",
    color: "#ffffff",
    iconPath: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    color: "#ffffff",
    iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "X",
    href: "https://x.com",
    color: "#ffffff",
    iconPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    color: "#ffffff",
    iconPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    color: "#ffffff",
    iconPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

// Create an icon texture using Canvas2D
function createIconTexture(iconPath: string, bgColor: string): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Transparent background
  ctx.clearRect(0, 0, width, height);

  // Draw the icon centered on the left half (u=0.25)
  ctx.save();
  ctx.translate(128, height / 2);
  ctx.scale(4.5, 4.5);
  ctx.translate(-12, -12); // SVG viewBox is 24x24
  const path2D = new Path2D(iconPath);
  ctx.fillStyle = bgColor;
  ctx.fill(path2D);
  ctx.restore();

  // Draw "PRESS" centered on the right half (u=0.75)
  ctx.save();
  ctx.translate(384, height / 2);
  ctx.fillStyle = bgColor;
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "2px";
  ctx.fillText("PRESS", 0, 0);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Custom iridescent soap bubble shader
const bubbleVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const bubbleFragmentShader = `
  uniform float uTime;
  uniform sampler2D uIconTexture;
  uniform vec3 uBaseColor;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);
    
    // Monochrome glassy reflections — subtle silver shimmer
    float angle = dot(viewDir, vNormal);
    float shimmer = sin(angle * 8.0 + uTime * 0.3) * 0.08 + 0.08;
    vec3 glassColor = vec3(shimmer + 0.05);
    
    // Premium dark glass base with bright edge
    vec3 bubbleColor = mix(vec3(0.02), vec3(0.35), fresnel * 0.9);
    bubbleColor += glassColor;
    
    // Icon texture
    vec4 iconColor = texture2D(uIconTexture, vUv);
    
    // Sharp specular for glass
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float specular = pow(max(dot(vNormal, halfDir), 0.0), 128.0);
    
    // Secondary specular from opposite side
    vec3 lightDir2 = normalize(vec3(-0.5, 0.3, 0.8));
    vec3 halfDir2 = normalize(lightDir2 + viewDir);
    float specular2 = pow(max(dot(vNormal, halfDir2), 0.0), 96.0);
    
    // Combine: dark glass + white icon + sharp highlights
    vec3 finalColor = mix(bubbleColor, iconColor.rgb, iconColor.a * 0.8);
    finalColor += (specular * 0.7 + specular2 * 0.3) * vec3(1.0);
    
    // Opacity: very transparent center, solid glassy edge
    float alpha = mix(0.15, 0.7, fresnel) + specular * 0.25 + iconColor.a * 0.2;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface SoapBubbleProps {
  data: BubbleData;
  index: number;
  total: number;
  onBubbleClick: (href: string) => void;
}

function SoapBubble({ data, index, total, onBubbleClick }: SoapBubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  const iconTexture = useMemo(
    () => createIconTexture(data.iconPath, data.color),
    [data.iconPath, data.color]
  );

  const shaderUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIconTexture: { value: iconTexture },
      uBaseColor: { value: new THREE.Color(data.color) },
    }),
    [iconTexture, data.color]
  );

  // Animation parameters — unique per bubble
  const params = useMemo(() => {
    const seed = index * 137.5; // golden angle offset
    return {
      speedX: 0.12 + (index * 0.04) % 0.12,
      speedY: 0.08 + (index * 0.05) % 0.1,
      phaseX: seed,
      phaseY: seed * 1.3,
      phaseZ: seed * 0.7,
      radiusX: viewport.width * 0.4,
      radiusY: viewport.height * 0.38,
      baseSize: 0.13,
    };
  }, [index, viewport.width, viewport.height]);

  const timeRef = useRef(0);
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    // Update shader time
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t;

    // Smooth Lissajous-style traversal across the viewport
    const x =
      Math.sin(t * params.speedX + params.phaseX) * params.radiusX +
      Math.sin(t * params.speedX * 0.7 + params.phaseX * 1.5) * params.radiusX * 0.3;
    const y =
      Math.cos(t * params.speedY + params.phaseY) * params.radiusY +
      Math.cos(t * params.speedY * 0.6 + params.phaseY * 1.2) * params.radiusY * 0.25;
    const z = Math.sin(t * 0.3 + params.phaseZ) * 0.5;

    meshRef.current.position.set(x, y, z);

    // Gentle rotation
    meshRef.current.rotation.y = t * 0.8 + index;
    meshRef.current.rotation.x = Math.sin(t * 0.2 + index) * 0.15;

    // Breathing scale + hover effect
    const breathe = 1 + Math.sin(t * 1.5 + index) * 0.05;
    const targetScale = hovered ? params.baseSize * 1.3 : params.baseSize;
    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale * breathe, 0.08);
    meshRef.current.scale.setScalar(newScale);
  });

  const handleClick = useCallback(() => {
    window.open(data.href, "_blank", "noopener,noreferrer");
  }, [data.href]);

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={bubbleVertexShader}
        fragmentShader={bubbleFragmentShader}
        uniforms={shaderUniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function SocialBubbles() {
  const handleClick = useCallback((href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-auto" style={{ pointerEvents: "none" }}>
      <Canvas
        style={{ pointerEvents: "auto" }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, 3]} intensity={0.4} color="#00c389" />
        <Suspense fallback={null}>
          {socials.map((social, i) => (
            <SoapBubble
              key={social.name}
              data={social}
              index={i}
              total={socials.length}
              onBubbleClick={handleClick}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
