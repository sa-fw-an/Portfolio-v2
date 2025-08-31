/**
 * Lazy-loaded Three.js components for better performance
 */

import { createLazyComponent, createConditionalLazyComponent } from '@/utils/lazyUtils';

// Lazy load the main Three.js experience
export const LazyThreeJSExperience = createLazyComponent(
  () => import('./ThreeJSExperience'),
  {
    fallback: (
      <div className="experience-canvas bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading 3D Scene...</div>
      </div>
    ),
    loadOnMobile: true
  }
);

// Conditionally load heavy animations only on desktop
export const LazyPreloaderAnimations = createConditionalLazyComponent(
  () => import('../ui/PreloaderAnimations'),
  {
    className: "hidden"
  }
);

// Lazy load the room model with error boundary
export const LazyRoom = createLazyComponent(
  () => import('./Room'),
  {
    fallback: null,
    errorBoundary: true,
    loadOnMobile: true
  }
);
