"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useState } from "react";

function BlueprintGlobe() {
  return (
    <group>
      {/* 1. THE PULSING CORE */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#064e3b" 
          emissive="#065f46" 
          emissiveIntensity={2} 
          metalness={1} 
          roughness={0} 
        />
      </mesh>

      {/* 2. THE HEXAGONAL SHIELD (The "NASA" Look) */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1.5, 20, 20]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.4} />
      </mesh>

      {/* 3. LATITUDE/LONGITUDE SCAN LINES */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1.5, 4, 32]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function Globe() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="h-screen w-full bg-[#020617] relative">
      {/* HUD ELEMENTS */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 z-20 font-mono space-y-4">
        <div className="border-l-2 border-emerald-500 pl-4 py-2 bg-emerald-500/5">
          <h2 className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Global Feed</h2>
          <p className="text-emerald-700 text-[10px]">UPLINK_STABLE // 88.4%</p>
        </div>
        <div className="border-l-2 border-emerald-900 pl-4 py-2">
          <h2 className="text-emerald-900 text-xs uppercase">Sectors</h2>
          <p className="text-emerald-900 text-[10px]">AS_01 | EU_04 | NA_02</p>
        </div>
      </div>

      <Suspense fallback={null}>
        <Canvas gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={5} color="#10b981" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <BlueprintGlobe />
          </Float>

          <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}