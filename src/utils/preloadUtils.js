/**
 * Preload functions for better performance
 */

export const preloadThreeComponents = () => {
  if (typeof window !== 'undefined') {
    // Preload components during idle time
    import('../components/three/ThreeJSExperience');
    import('../components/three/Room');
    import('../components/ui/PreloaderAnimations');
  }
};
