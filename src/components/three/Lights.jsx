import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { SCENE_CONSTANTS, ANIMATION_CONSTANTS } from '@/constants/globalConstants';

const Lights = ({ theme }) => {
  const lightRef = useRef();
  
  const lightColor = useMemo(() => new THREE.Color(theme === 'dark' ? '#ebdaef' : '#ffffff'), [theme]);
  const lightIntensity = theme === 'dark' ? SCENE_CONSTANTS.LIGHTS.DIRECTIONAL.INTENSITY.DARK : SCENE_CONSTANTS.LIGHTS.DIRECTIONAL.INTENSITY.LIGHT;
  const ambientIntensity = theme === 'dark' ? SCENE_CONSTANTS.LIGHTS.AMBIENT.INTENSITY.DARK : SCENE_CONSTANTS.LIGHTS.AMBIENT.INTENSITY.LIGHT;

  useEffect(() => {
    if (!lightRef.current) return;
    const dir = lightRef.current;
    gsap.to(dir.color, { r: lightColor.r, g: lightColor.g, b: lightColor.b, duration: ANIMATION_CONSTANTS.DURATION.MEDIUM });
    gsap.to(dir, { intensity: lightIntensity, duration: ANIMATION_CONSTANTS.DURATION.MEDIUM });
  }, [lightColor.r, lightColor.g, lightColor.b, lightIntensity]);

  return (
    <>
      <directionalLight
        ref={lightRef}
        color={lightColor}
        intensity={lightIntensity}
        position={SCENE_CONSTANTS.LIGHTS.DIRECTIONAL.POSITION}
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
      <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={0} />
      <spotLight position={[9, -1, -5]} angle={12} penumbra={5} intensity={1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <rectAreaLight
        color="#ffffff"
        intensity={1}
        width={0.5}
        height={0.7}
        position={[8, 3, 1]}
      />
    </>
  );
};

export default Lights;
