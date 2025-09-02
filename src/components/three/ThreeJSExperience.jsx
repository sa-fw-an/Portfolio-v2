import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import Experience from './Experience.jsx';
import { useThreeContext } from '@/contexts/ThreeContext';
import { isMobileDevice, getOptimizedDPR } from '@/utils/deviceUtils';
import { setupOrthographicCamera, getCameraConfig } from '@/utils/cameraUtils';
import { WEBGL_CONSTANTS } from '@/constants/globalConstants';

const SceneInner = () => {
  const { setCamera } = useThreeContext();
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef();

  const isMobile = isMobileDevice();
  const preferredDPR = getOptimizedDPR();

  // Intersection Observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const onCreated = useCallback((state) => {
    const { gl, camera, size } = state;

    gl.useLegacyLights = false;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = WEBGL_CONSTANTS.TONE_MAPPING_EXPOSURE;
    gl.shadowMap.enabled = !isMobile;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.setPixelRatio(Math.min(preferredDPR, WEBGL_CONSTANTS.DPR.DESKTOP_MAX));
    gl.setClearColor(0x000000, 0);

    setupOrthographicCamera(camera, size.width, size.height);
    setCamera(camera);
  }, [setCamera, isMobile, preferredDPR]);

  const cameraConfig = getCameraConfig();

  return (
    <div ref={containerRef} className="experience-canvas">
      <Canvas
        orthographic
        camera={cameraConfig}
        gl={{ 
          antialias: !isMobile, 
          alpha: true, 
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        dpr={isVisible ? preferredDPR : 0.5} // Reduce DPR when not visible
        frameloop={isVisible ? 'always' : 'demand'} // Pause rendering when not visible
        onCreated={onCreated}
        shadows={1}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
};

const ThreeJSExperience = () => {
  return <SceneInner />;
};

export default ThreeJSExperience;
