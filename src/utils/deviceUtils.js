export const MOBILE_BREAKPOINT = 968;

export const isMobileDevice = () => {
  if (typeof window === "undefined") return false;

  const isMobileScreen = window.innerWidth < MOBILE_BREAKPOINT;
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  return isMobileScreen || isMobileUserAgent;
};

export const isLaptopDevice = () => {
  if (typeof window === "undefined") return false;

  const screenWidth = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 4;

  // Heuristics for laptop detection
  const isLaptopScreen = screenWidth >= 1024 && screenWidth <= 1920;
  const isLowDPR = dpr <= 1.5;
  const isLimitedCores = cores <= 8;

  return isLaptopScreen && (isLowDPR || isLimitedCores);
};

export const getPerformanceProfile = () => {
  if (isMobileDevice()) {
    return "medium";
  }
  if (isLaptopDevice()) return "medium";
  return "high";
};

export const getOptimizedDPR = () => {
  const profile = getPerformanceProfile();
  const devicePixelRatio = window.devicePixelRatio || 1;

  switch (profile) {
    case "medium":
      if (isMobileDevice()) {
        return Math.min(devicePixelRatio, 0.8);
      } else {
        return Math.min(devicePixelRatio, 1.0);
      }
    case "high":
      return Math.min(devicePixelRatio, 1.5);
    default:
      return Math.min(devicePixelRatio, 1.0);
  }
};
