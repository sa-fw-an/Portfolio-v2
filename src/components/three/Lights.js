import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Lights = ({ theme }) => {
  const lightRef = useRef();
  
  useFrame((state) => {
    if (lightRef.current) {
      // Subtle light movement
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 2;
    }
  });

  // Theme-based lighting
  const lightColor = theme === 'dark' ? '#2c3baf' : '#ffffff';
  const lightIntensity = theme === 'dark' ? 0.8 : 3;
  const ambientIntensity = theme === 'dark' ? 0.3 : 1;

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
      <ambientLight color={lightColor} intensity={ambientIntensity} />
      
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
