/**
 * Camera setup and management utilities
 */

import { isMobileDevice } from './deviceUtils.js';

// Camera constants
export const CAMERA_CONSTANTS = {
  FRUSTUM: 5,
  NEAR: -50,
  FAR: 50,
  DEFAULT_POSITION: [0, 6.5, 10],
  DEFAULT_ROTATION_X: -Math.PI / 6,
  ZOOM: 1
};

/**
 * Calculate orthographic camera bounds based on aspect ratio
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 * @param {number} frustum - Camera frustum size
 * @returns {Object} Camera bounds object
 */
export const calculateCameraBounds = (width, height, frustum = CAMERA_CONSTANTS.FRUSTUM) => {
  const aspect = width / height;
  
  return {
    left: (-aspect * frustum) / 2,
    right: (aspect * frustum) / 2,
    top: frustum / 2,
    bottom: -frustum / 2
  };
};

/**
 * Setup orthographic camera with responsive bounds
 * @param {Object} camera - Three.js camera instance
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 */
export const setupOrthographicCamera = (camera, width, height) => {
  if (!camera?.isOrthographicCamera) return;
  
  const bounds = calculateCameraBounds(width, height);
  
  Object.assign(camera, {
    ...bounds,
    near: CAMERA_CONSTANTS.NEAR,
    far: CAMERA_CONSTANTS.FAR
  });
  
  // Set default position and rotation
  camera.position.set(...CAMERA_CONSTANTS.DEFAULT_POSITION);
  camera.rotation.x = CAMERA_CONSTANTS.DEFAULT_ROTATION_X;
  
  camera.updateProjectionMatrix();
};

/**
 * Get camera configuration based on device type
 * @returns {Object} Camera configuration object
 */
export const getCameraConfig = () => {
  const isMobile = isMobileDevice();
  
  return {
    orthographic: true,
    zoom: CAMERA_CONSTANTS.ZOOM,
    position: CAMERA_CONSTANTS.DEFAULT_POSITION,
    near: CAMERA_CONSTANTS.NEAR,
    far: CAMERA_CONSTANTS.FAR,
    ...calculateCameraBounds(window.innerWidth, window.innerHeight),
    // Mobile optimizations
    ...(isMobile && {
      // Reduced complexity for mobile
      antialias: false,
      powerPreference: 'low-power'
    })
  };
};
