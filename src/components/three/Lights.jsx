import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const Lights = ({ theme }) => {
  const lightRef = useRef();
  

  const lightColor = useMemo(() => new THREE.Color(theme === 'dark' ? '#2c3baf' : '#ffffff'), [theme]);
  const lightIntensity = theme === 'dark' ? 0.5 : 3;
  const ambientIntensity = theme === 'dark' ? 0.5 : 1;

  useEffect(() => {
    if (!lightRef.current) return;
    const dir = lightRef.current;
    gsap.to(dir.color, { r: lightColor.r, g: lightColor.g, b: lightColor.b, duration: 0.5 });
    gsap.to(dir, { intensity: lightIntensity, duration: 0.5 });
  }, [lightColor.r, lightColor.g, lightColor.b, lightIntensity]);

  return (
    <>
      <directionalLight
        ref={lightRef}
        color={lightColor}
        intensity={lightIntensity}
        position={[-1.5, 7, 3]}
        castShadow
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-normalBias={0.05}
      />
  <ambientLight key={theme} color={lightColor} intensity={ambientIntensity} />
      <rectAreaLight
        color="#ffffff"
        intensity={1}
        width={0.5}
        height={0.7}
        position={[7.68244, 7, 0.5]}
      />
    </>
  );
};

export default Lights;
