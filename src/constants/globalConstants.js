// Device and responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: 968,
  TABLET: 1024,
  DESKTOP: 1200,
};

// Three.js and WebGL constants
export const WEBGL_CONSTANTS = {
  DPR: {
    MOBILE_MAX: 0.8,
    LAPTOP_MAX: 1.0,
    DESKTOP_MAX: 1.5,
  },

  // Shadow settings - Optimized for performance with mobile shadows
  SHADOW_MAP_SIZE: {
    MOBILE: 512,
    LAPTOP: 1024,
    DESKTOP: 1024,
  },

  // Tone mapping
  TONE_MAPPING_EXPOSURE: 0.9,
};

// Animation and timing constants
export const ANIMATION_CONSTANTS = {
  // GSAP animation settings - Optimized for performance by device type
  SCRUB: {
    MOBILE: 0.2,
    LAPTOP: 0.4,
    DESKTOP: 0.6,
  },

  PROGRESS_BAR_SCRUB: {
    MOBILE: 0.2,
    LAPTOP: 0.3,
    DESKTOP: 0.4,
  },

  // Preloader timing
  PRELOADER_DELAY: 1800,

  // Animation durations
  DURATION: {
    FAST: 0.2,
    MEDIUM: 0.4,
    SLOW: 0.6,
    THEME_TRANSITION: 0.4,
  },

  // Performance settings
  WILL_CHANGE: true,
  FORCE_3D: true,

  // Device-specific animation quality
  ANIMATION_QUALITY: {
    LOW: {
      reduceMotion: true,
      skipComplexAnimations: true,
      limitParticles: true,
    },
    MEDIUM: {
      reduceMotion: false,
      skipComplexAnimations: false,
      limitParticles: true,
    },
    HIGH: {
      reduceMotion: false,
      skipComplexAnimations: false,
      limitParticles: false,
    },
  },
};

// 3D Scene constants
export const SCENE_CONSTANTS = {
  // Room scaling
  ROOM_SCALE: {
    DESKTOP: [0.11, 0.11, 0.11],
    MOBILE: [0.07, 0.07, 0.07],
  },

  // Cube scaling for preloader animations
  CUBE_SCALE: {
    PRELOADER: {
      DESKTOP: [1.7, 1.7, 1.7],
      MOBILE: [2.5, 2.5, 2.5],
    },
    FINAL: {
      DESKTOP: [10, 10, 10],
      MOBILE: [12, 12, 12],
    },
  },

  // Floor circle scaling
  FLOOR_CIRCLE_SCALE: [3, 3, 3],

  // Light settings
  LIGHTS: {
    DIRECTIONAL: {
      POSITION: [-4, 9, 5],
      INTENSITY: {
        LIGHT: 3,
        DARK: 0.5,
      },
    },
    AMBIENT: {
      INTENSITY: {
        LIGHT: 1,
        DARK: 0.5,
      },
    },
    RECT_AREA: {
      POSITION: [7.68244, 7, 0.5],
      SIZE: {
        DESKTOP: { width: 0.5, height: 0.7 },
        MOBILE: { width: 0.3, height: 0.4 },
      },
    },
  },
};

// Camera constants
export const CAMERA_CONSTANTS = {
  FRUSTUM: 5,
  NEAR: -50,
  FAR: 50,
  DEFAULT_POSITION: [0, 6.5, 10],
  DEFAULT_ROTATION_X: -Math.PI / 6,
  ZOOM: 1,
};

// Asset paths
export const ASSET_PATHS = {
  MODELS: {
    ROOM: "/models/room.glb",
  },
  TEXTURES: {
    VIDEO: "/textures/gitreadme.mp4",
  },
  DRACO: "/assets/draco/",
  FONTS: {
    ASIMOVIAN: "/fonts/Asimovian-Regular.ttf",
    UBUNTU: "/fonts/Ubuntu-Regular.ttf",
  },
  SOCIAL: {
    GITHUB: "./assets/social/github.svg",
    LINKEDIN: "./assets/social/linkedin.svg",
    X: "./assets/social/x.svg",
    INSTAGRAM: "./assets/social/instagram.svg",
    REDDIT: "./assets/social/reddit.svg",
    GMAIL: "./assets/social/gmail.svg",
  },
};
