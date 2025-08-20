import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

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
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const value = useMemo(() => ({
    // refs
    roomRef,
    floorRef,
    rectLightRef,
    // camera
    camera,
    setCamera,
    // mesh parts
    childrenMap,
    setChildrenMap,
    // flow state
    controlsEnabled,
    setControlsEnabled,
    preloaderComplete,
    setPreloaderComplete,
  }), [camera, childrenMap, controlsEnabled, preloaderComplete]);

  return (
    <ThreeContext.Provider value={value}>{children}</ThreeContext.Provider>
  );
};
