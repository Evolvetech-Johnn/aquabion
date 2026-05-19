'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, TorusKnot, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AquabionCore = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.3;
      sphereRef.current.rotation.x += delta * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.y -= delta * 0.5;
      torusRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      <TorusKnot ref={torusRef} args={[2.2, 0.3, 128, 32]}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </TorusKnot>

      <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3b82f6" />
      <ambientLight intensity={0.5} />
    </group>
  );
};

export default function Aquabion3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#071B34']} />
        <AquabionCore />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
