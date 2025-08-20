import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback } from 'react';
import * as THREE from 'three';
import Experience from './Experience.jsx';
import { useThreeContext } from '../../contexts/ThreeContext';

const SceneInner = () => {
  const { setCamera } = useThreeContext();
  
  const onCreated = useCallback((state) => {
    const { gl, camera } = state;
    
    // Configure renderer (exact original settings)
    gl.useLegacyLights = false;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.CineonToneMapping;
    gl.toneMappingExposure = 1.75;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Configure camera (exact original)
    if (camera.isOrthographicCamera) {
      const aspect = window.innerWidth / window.innerHeight;
      const frustum = 5;
      camera.left = (-aspect * frustum) / 2;
      camera.right = (aspect * frustum) / 2;
      camera.top = frustum / 2;
      camera.bottom = -frustum / 2;
      camera.near = -50;
      camera.far = 50;
      camera.position.set(0, 6.5, 10);
      camera.rotation.x = -Math.PI / 6;
      camera.updateProjectionMatrix();
    }
    
    setCamera(camera);
  }, [setCamera]);

  return (
    <Canvas
      orthographic
      camera={{ 
        zoom: 1, 
        position: [0, 6.5, 10], 
        near: -50, 
        far: 50,
        left: -5,
        right: 5,
        top: 5,
        bottom: -5
      }}
      gl={{ 
        antialias: true, 
        alpha: true, 
        powerPreference: 'high-performance'
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      onCreated={onCreated}
      shadows
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
