/**
 * Performance optimization utilities
 */

import { ANIMATION_CONSTANTS } from '@/constants/globalConstants';

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

/**
 * Enable hardware acceleration for an element
 */
export const enableHardwareAcceleration = (element) => {
  if (element && ANIMATION_CONSTANTS.FORCE_3D) {
    element.style.transform = element.style.transform || 'translateZ(0)';
    element.style.willChange = element.style.willChange || 'transform';
    element.style.backfaceVisibility = 'hidden';
  }
};

/**
 * Disable hardware acceleration (cleanup)
 */
export const disableHardwareAcceleration = (element) => {
  if (element) {
    element.style.willChange = 'auto';
    element.style.transform = element.style.transform.replace('translateZ(0)', '');
  }
};

/**
 * Performance-optimized RAF helper
 */
export const performanceRAF = (callback) => {
  let rafId;
  let lastTime = 0;
  const minInterval = 16; // 60fps max

  const loop = (currentTime) => {
    if (currentTime - lastTime >= minInterval) {
      callback(currentTime);
      lastTime = currentTime;
    }
    rafId = requestAnimationFrame(loop);
  };

  rafId = requestAnimationFrame(loop);
  
  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  };
};
