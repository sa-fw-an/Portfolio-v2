import { createContext, useContext, useMemo, useRef, useState } from 'react';

const ThreeContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useThreeContext = () => {
  const ctx = useContext(ThreeContext);
  if (!ctx) throw new Error('useThreeContext must be used within ThreeProvider');
  return ctx;
};

export const ThreeProvider = ({ children }) => {
  const roomRef = useRef(null);
  const floorRef = useRef(null);
  const rectLightRef = useRef(null);
  
  const [camera, setCamera] = useState(null);
  const [childrenMap, setChildrenMap] = useState({});
  const [controlsEnabled, setControlsEnabled] = useState(false);

  const value = useMemo(() => ({
    // Three.js refs
    roomRef,
    floorRef,
    rectLightRef,
    
    // Camera
    camera,
    setCamera,
    
    // Room object parts
    childrenMap,
    setChildrenMap,
    
    // Animation flow control
    controlsEnabled,
    setControlsEnabled,
  }), [camera, childrenMap, controlsEnabled]);

  return (
    <ThreeContext.Provider value={value}>
      {children}
    </ThreeContext.Provider>
  );
};