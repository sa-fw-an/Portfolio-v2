import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Experience from './Experience.jsx';

const ThreeJSExperience = () => {
  return (
    <div className="experience-canvas">
      <Canvas
        camera={{ 
          fov: 35, 
          position: [0, 6.5, 10],
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeJSExperience;
