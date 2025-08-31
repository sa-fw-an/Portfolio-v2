/**
 * Animation optimization utilities for mobile performance
 */

import { isMobileDevice } from './deviceUtils';
import { ANIMATION_CONSTANTS } from '@/constants/appConstants';

/**
 * Get optimized animation settings based on device capability
 * @returns {Object} Animation configuration object
 */
export const getOptimizedAnimationSettings = () => {
  const isMobile = isMobileDevice();
  
  return {
    // Reduce animation complexity on mobile
    enableHeavyAnimations: !isMobile,
    
    // Adjust scroll trigger settings
    scrub: isMobile ? ANIMATION_CONSTANTS.SCRUB.MOBILE : ANIMATION_CONSTANTS.SCRUB.DESKTOP,
    
    // Disable certain features on mobile
    enableSmoothScroll: !isMobile,
    enableParticles: !isMobile,
    enableShadows: !isMobile,
    
    // Reduce animation frames
    animationDuration: isMobile ? ANIMATION_CONSTANTS.DURATION.FAST : ANIMATION_CONSTANTS.DURATION.MEDIUM,
    
    // Optimize scroll events
    scrollEventThrottle: isMobile ? 16 : 8, // 60fps vs 120fps
    
    // Pin spacing for mobile
    pinSpacing: !isMobile
  };
};

/**
 * Create a performance-optimized timeline
 * @param {Object} options - Timeline options
 * @returns {Object} GSAP timeline configuration
 */
export const createOptimizedTimeline = (options = {}) => {
  const settings = getOptimizedAnimationSettings();
  
  return {
    ease: "power2.out",
    duration: settings.animationDuration,
    ...options,
    // Force hardware acceleration
    force3D: true,
    // Optimize for mobile
    ...(isMobileDevice() && {
      transformOrigin: "center center",
      backfaceVisibility: "hidden"
    })
  };
};

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} delay - Throttle delay in ms
 * @returns {Function} Throttled function
 */
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

/**
 * Debounce function for resize events
 * @param {Function} func - Function to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
