import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback } from 'react';
import * as THREE from 'three';
import Experience from './Experience.jsx';
import { useThreeContext } from '@/contexts/ThreeContext';
import { isMobileDevice, getOptimizedDPR, supportsHighPerformanceWebGL } from '@/utils/deviceUtils';
import { setupOrthographicCamera, getCameraConfig } from '@/utils/cameraUtils';
import { WEBGL_CONSTANTS } from '@/constants/appConstants';

const SceneInner = () => {
  const { setCamera } = useThreeContext();

  const isMobile = isMobileDevice();
  const preferredDPR = getOptimizedDPR();
  const supportsHighPerf = supportsHighPerformanceWebGL();

  const onCreated = useCallback((state) => {
    const { gl, camera, size } = state;

    gl.useLegacyLights = false;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = WEBGL_CONSTANTS.TONE_MAPPING_EXPOSURE;
    gl.shadowMap.enabled = !isMobile;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.setPixelRatio(preferredDPR);

    setupOrthographicCamera(camera, size.width, size.height);
    setCamera(camera);
  }, [setCamera, isMobile, preferredDPR]);
  const handleResize = useCallback(() => {
    const camera = setCamera && setCamera.current;
    if (camera && camera.isOrthographicCamera) {
      setupOrthographicCamera(camera, window.innerWidth, window.innerHeight);
    }
  }, [setCamera]);

  const cameraConfig = getCameraConfig();

  return (
    <Canvas
      orthographic
      camera={cameraConfig}
      gl={{ 
        antialias: !isMobile, 
        alpha: true, 
        powerPreference: isMobile ? 'low-power' : 'high-performance'
      }}
      dpr={preferredDPR}
      onCreated={onCreated}
      onResize={handleResize}
      shadows={1}
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
