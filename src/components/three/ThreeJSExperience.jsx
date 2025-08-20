import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback } from 'react';
import * as THREE from 'three';
import Experience from './Experience.jsx';
import { useThreeContext } from '../../contexts/ThreeContext';

const SceneInner = () => {
  const { setCamera } = useThreeContext();
  const onCreated = useCallback((state) => {
    const { gl, camera } = state;
    gl.useLegacyLights = false; // three >= 0.153
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.CineonToneMapping;
    gl.toneMappingExposure = 1.75;
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    setCamera(camera);
  }, [setCamera]);

  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, position: [0, 6.5, 10], near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      onCreated={onCreated}
    >
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  );
};

const ThreeJSExperience = () => {
  return (
    <div className="experience-canvas">
      <SceneInner />
    </div>
  );
};

export default ThreeJSExperience;
