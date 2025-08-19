import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Room = () => {
  const roomRef = useRef();
  const { scene } = useGLTF('/models/room.glb', true);
  
  // Mouse movement effect
  const mouse = useRef({ x: 0, y: 0 });
  const lerp = useRef({ current: 0, target: 0, ease: 0.1 });

  // Handle mouse movement
  const handleMouseMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    lerp.current.target = mouse.current.x * 0.05;
  };

  // Add mouse event listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (roomRef.current) {
      // Smooth mouse following
      lerp.current.current = THREE.MathUtils.lerp(
        lerp.current.current,
        lerp.current.target,
        lerp.current.ease
      );
      
      roomRef.current.rotation.y = lerp.current.current;

      // Gentle floating animation
      roomRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  // Configure materials
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Configure specific materials
          if (child.name === 'Screen' || child.name === 'Computer') {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x000000,
              // You can add video texture here later
            });
          }
          
          if (child.name === 'Aquarium') {
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0x549dd2,
              transparent: true,
              opacity: 0.8,
              roughness: 0,
              transmission: 1,
              ior: 1.33,
            });
          }
        }
      });
    }
  }, [scene]);

  return (
    <group ref={roomRef} scale={[0.11, 0.11, 0.11]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/models/room.glb');

export default Room;
