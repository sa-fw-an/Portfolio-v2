/**
 * Utility functions index - centralized exports
 */

// Device and performance utilities
export {
  isMobileDevice,
  getOptimizedDPR,
  supportsHighPerformanceWebGL,
  MOBILE_BREAKPOINT
} from './deviceUtils';

// Camera utilities
export {
  calculateCameraBounds,
  setupOrthographicCamera,
  getCameraConfig,
  CAMERA_CONSTANTS
} from './cameraUtils';

// Animation optimization utilities
export {
  getOptimizedAnimationSettings,
  createOptimizedTimeline,
  throttle,
  debounce
} from './animationUtils';

// Lazy loading utilities
export {
  createLazyComponent,
  createConditionalLazyComponent
} from './lazyUtils';
