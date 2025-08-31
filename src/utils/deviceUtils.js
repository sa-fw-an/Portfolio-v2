/**
 * Device detection utilities
 */

export const MOBILE_BREAKPOINT = 968;

/**
 * Detect if the current device is mobile based on screen width and user agent
 * @returns {boolean} True if mobile device
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const isMobileScreen = window.innerWidth < MOBILE_BREAKPOINT;
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return isMobileScreen || isMobileUserAgent;
};

/**
 * Get optimized device pixel ratio for performance
 * @returns {number} Optimized DPR value
 */
export const getOptimizedDPR = () => {
  const isMobile = isMobileDevice();
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  return isMobile 
    ? Math.min(devicePixelRatio, 0.8) 
    : Math.min(devicePixelRatio, 2);
};
