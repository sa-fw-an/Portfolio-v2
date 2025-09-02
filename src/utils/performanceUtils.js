import { ANIMATION_CONSTANTS } from '@/constants/globalConstants';
import { getPerformanceProfile } from '@/utils/deviceUtils';

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

export const throttle = (func, limit) => {
  const profile = getPerformanceProfile();
  const adaptiveLimit = profile === 'low' ? Math.max(limit, 32) : profile === 'medium' ? Math.max(limit, 20) : limit;

  let lastFunc;
  let lastRan;
  return function(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= adaptiveLimit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, adaptiveLimit - (Date.now() - lastRan));
    }
  };
};


export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getAnimationQuality = () => {
  const profile = getPerformanceProfile();
  return ANIMATION_CONSTANTS.ANIMATION_QUALITY[profile.toUpperCase()] || 
         ANIMATION_CONSTANTS.ANIMATION_QUALITY.MEDIUM;
};
