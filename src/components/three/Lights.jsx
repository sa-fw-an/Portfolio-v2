import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const Lights = ({ theme }) => {
  const lightRef = useRef();
  
  useFrame((state) => {
    if (lightRef.current) {
      // Subtle light movement
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 2;
    }
  });

  // Theme-based lighting with GSAP tween
  const lightColor = useMemo(() => new THREE.Color(theme === 'dark' ? '#2c3baf' : '#ffffff'), [theme]);
  const lightIntensity = theme === 'dark' ? 0.78 : 3;
  const ambientIntensity = theme === 'dark' ? 0.78 : 1;

  useEffect(() => {
    if (!lightRef.current) return;
    const dir = lightRef.current;
    gsap.to(dir.color, { r: lightColor.r, g: lightColor.g, b: lightColor.b, duration: 0.5 });
    gsap.to(dir, { intensity: lightIntensity, duration: 0.5 });
    // ambient is separate below (we have no ref, so we handle via key change on element)
  }, [lightColor.r, lightColor.g, lightColor.b, lightIntensity]);

  return (
    <>
      {/* Directional Light */}
      <directionalLight
        ref={lightRef}
        color={lightColor}
        intensity={lightIntensity}
        position={[-1.5, 7, 3]}
        castShadow
        shadow-camera-far={20}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-normalBias={0.05}
      />
      
      {/* Ambient Light */}
  <ambientLight key={theme} color={lightColor} intensity={ambientIntensity} />
      
      {/* Rect Area Light for screen glow */}
      <rectAreaLight
        color="#ffffff"
        intensity={1}
        width={0.5}
        height={0.7}
        position={[7.68244, 7, 0.5]}
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
      />
    </>
  );
};

export default Lights;
