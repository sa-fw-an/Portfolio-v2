/**
 * Camera setup and management utilities
 */

import { isMobileDevice } from "./deviceUtils.js";
import { CAMERA_CONSTANTS } from "@/constants/globalConstants";

/**
 * Setup orthographic camera with responsive bounds
 * @param {Object} camera - Three.js camera instance
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 */
export const setupOrthographicCamera = (camera, width, height) => {
  if (!camera?.isOrthographicCamera) return;

  const aspect = width / height;
  const frustum = CAMERA_CONSTANTS.FRUSTUM;

  Object.assign(camera, {
    left: (-aspect * frustum) / 2,
    right: (aspect * frustum) / 2,
    top: frustum / 2,
    bottom: -frustum / 2,
    near: CAMERA_CONSTANTS.NEAR,
    far: CAMERA_CONSTANTS.FAR,
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

  const aspect = window.innerWidth / window.innerHeight;
  const frustum = CAMERA_CONSTANTS.FRUSTUM;

  return {
    orthographic: true,
    zoom: CAMERA_CONSTANTS.ZOOM,
    position: CAMERA_CONSTANTS.DEFAULT_POSITION,
    near: CAMERA_CONSTANTS.NEAR,
    far: CAMERA_CONSTANTS.FAR,
    left: (-aspect * frustum) / 2,
    right: (aspect * frustum) / 2,
    top: frustum / 2,
    bottom: -frustum / 2,
    // Mobile optimizations
    ...(isMobile && {
      // Reduced complexity for mobile
      antialias: false,
      powerPreference: "low-power",
    }),
  };
};
