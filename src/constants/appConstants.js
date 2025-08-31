/**
 * Application constants and magic numbers
 */

// Device and responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: 968,
  TABLET: 1024,
  DESKTOP: 1200
};

// Three.js and WebGL constants
export const WEBGL_CONSTANTS = {
  // Performance settings
  DPR: {
    MOBILE_MAX: 0.8,
    DESKTOP_MAX: 2,
    FALLBACK: 1
  },
  
  // Shadow settings
  SHADOW_MAP_SIZE: {
    MOBILE: 1024,
    DESKTOP: 2048
  },
  
  // Tone mapping
  TONE_MAPPING_EXPOSURE: 0.9
};

// Animation and timing constants
export const ANIMATION_CONSTANTS = {
  // GSAP animation settings
  SCRUB: {
    MOBILE: 0.2,
    DESKTOP: 0.6
  },
  
  PROGRESS_BAR_SCRUB: 0.4,
  
  // Preloader timing
  PRELOADER_DELAY: 2000,
  
  // Animation durations
  DURATION: {
    FAST: 0.3,
    MEDIUM: 0.5,
    SLOW: 0.7,
    THEME_TRANSITION: 0.5
  }
};

// 3D Scene constants
export const SCENE_CONSTANTS = {
  // Room scaling
  ROOM_SCALE: {
    DESKTOP: [0.11, 0.11, 0.11],
    MOBILE: [0.07, 0.07, 0.07]
  },
  
  // Floor circle scaling
  FLOOR_CIRCLE_SCALE: [3, 3, 3],
  
  // Light settings
  LIGHTS: {
    DIRECTIONAL: {
      POSITION: [-4, 9, 5],
      INTENSITY: {
        LIGHT: 3,
        DARK: 0.5
      }
    },
    AMBIENT: {
      INTENSITY: {
        LIGHT: 1,
        DARK: 0.5
      }
    },
    RECT_AREA: {
      POSITION: [7.68244, 7, 0.5],
      SIZE: {
        DESKTOP: { width: 0.5, height: 0.7 },
        MOBILE: { width: 0.3, height: 0.4 }
      }
    }
  }
};

// UI and Layout constants
export const UI_CONSTANTS = {
  // Z-index layers
  Z_INDEX: {
    BACKGROUND: 1,
    CONTENT: 10,
    OVERLAY: 100,
    MODAL: 1000,
    PRELOADER: 99999,
    THEME_TOGGLE: 99999999
  },
  
  // Component spacing
  SPACING: {
    SECTION_MARGIN_HEIGHT: 2800,
    SECTION_PADDING: 300,
    BORDER_RADIUS: 700
  }
};

// Color constants
export const COLOR_CONSTANTS = {
  // Theme colors
  COLORS: {
    PINK: '#db8a95',
    GREEN: '#5fd8a6', 
    BLUE: '#718ad4',
    TAN: '#c8976f',
    LIGHT_BG: '#faf2dd',
    DARK_BG: '#6e83c1'
  }
};

// Asset paths
export const ASSET_PATHS = {
  MODELS: {
    ROOM: '/models/room.glb'
  },
  TEXTURES: {
    VIDEO: '/textures/gitreadme.mp4'
  },
  DRACO: '/assets/draco/',
  FONTS: {
    ASIMOVIAN: '/fonts/Asimovian-Regular.ttf',
    UBUNTU: '/fonts/Ubuntu-Regular.ttf'
  }
};
