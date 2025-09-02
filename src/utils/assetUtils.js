/**
 * Progressive asset loading utilities
 */

import { isMobileDevice } from './deviceUtils';
import * as THREE from 'three';

/**
 * Asset loading priorities
 */
export const ASSET_PRIORITIES = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

/**
 * Asset loading states
 */
export const ASSET_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
};

/**
 * Progressive loading configuration
 */
const PROGRESSIVE_CONFIG = {
  [ASSET_PRIORITIES.CRITICAL]: {
    timeout: 5000,
    retries: 3,
    quality: 'high'
  },
  [ASSET_PRIORITIES.HIGH]: {
    timeout: 10000,
    retries: 2,
    quality: 'medium'
  },
  [ASSET_PRIORITIES.MEDIUM]: {
    timeout: 15000,
    retries: 1,
    quality: 'low'
  },
  [ASSET_PRIORITIES.LOW]: {
    timeout: 20000,
    retries: 0,
    quality: 'low'
  }
};

/**
 * Asset loader class for progressive loading
 */
export class ProgressiveAssetLoader {
  constructor() {
    this.assets = new Map();
    this.loadingQueue = [];
    this.isMobile = isMobileDevice();
  }

  /**
   * Register an asset for loading
   * @param {string} id - Asset identifier
   * @param {string} url - Asset URL
   * @param {string} type - Asset type (model, texture, etc.)
   * @param {string} priority - Loading priority
   * @param {Function} loader - Loading function
   */
  registerAsset(id, url, type, priority = ASSET_PRIORITIES.MEDIUM, loader) {
    this.assets.set(id, {
      id,
      url,
      type,
      priority,
      loader,
      state: ASSET_STATES.IDLE,
      data: null,
      error: null,
      config: PROGRESSIVE_CONFIG[priority]
    });
  }

  /**
   * Load assets progressively based on priority
   * @param {Function} onProgress - Progress callback
   * @param {Function} onComplete - Completion callback
   */
  async loadAssets(onProgress, onComplete) {
    const sortedAssets = Array.from(this.assets.values())
      .sort((a, b) => this.getPriorityOrder(a.priority) - this.getPriorityOrder(b.priority));

    const totalAssets = sortedAssets.length;
    let loadedCount = 0;

    for (const asset of sortedAssets) {
      try {
        asset.state = ASSET_STATES.LOADING;
        const data = await this.loadAssetWithRetry(asset);
        asset.data = data;
        asset.state = ASSET_STATES.LOADED;
        loadedCount++;

        if (onProgress) {
          onProgress(loadedCount / totalAssets, asset);
        }
      } catch (error) {
        asset.state = ASSET_STATES.ERROR;
        asset.error = error;
        console.warn(`Failed to load asset ${asset.id}:`, error);
        loadedCount++;

        if (onProgress) {
          onProgress(loadedCount / totalAssets, asset);
        }
      }
    }

    if (onComplete) {
      onComplete(this.assets);
    }
  }

  /**
   * Load asset with retry logic
   * @param {Object} asset - Asset object
   * @returns {Promise} Asset data
   */
  async loadAssetWithRetry(asset) {
    const { config } = asset;
    let lastError;

    for (let attempt = 0; attempt <= config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeout);

        const result = await asset.loader(asset.url, {
          signal: controller.signal,
          quality: this.getQualityForDevice(config.quality)
        });

        clearTimeout(timeoutId);
        return result;
      } catch (error) {
        lastError = error;
        if (attempt < config.retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
    }

    throw lastError;
  }

  /**
   * Get priority order for sorting
   * @param {string} priority - Priority level
   * @returns {number} Sort order
   */
  getPriorityOrder(priority) {
    const order = {
      [ASSET_PRIORITIES.CRITICAL]: 0,
      [ASSET_PRIORITIES.HIGH]: 1,
      [ASSET_PRIORITIES.MEDIUM]: 2,
      [ASSET_PRIORITIES.LOW]: 3
    };
    return order[priority] || 2;
  }

  /**
   * Get quality setting based on device
   * @param {string} baseQuality - Base quality setting
   * @returns {string} Adjusted quality
   */
  getQualityForDevice(baseQuality) {
    if (!this.isMobile) return baseQuality;

    // Reduce quality on mobile
    const qualityMap = {
      high: 'medium',
      medium: 'low',
      low: 'low'
    };

    return qualityMap[baseQuality] || baseQuality;
  }

  /**
   * Get asset by ID
   * @param {string} id - Asset ID
   * @returns {Object} Asset object
   */
  getAsset(id) {
    return this.assets.get(id);
  }

  /**
   * Get all loaded assets
   * @returns {Map} Assets map
   */
  getAllAssets() {
    return this.assets;
  }
}

/**
 * Create optimized GLTF loader
 * @param {string} url - GLTF URL
 * @param {Object} options - Loading options
 * @returns {Promise} GLTF data
 */
export const loadOptimizedGLTF = async (url, options = {}) => {
  const { useDraco = true } = options;

  // Dynamic import to reduce initial bundle size
  const { useGLTF } = await import('@react-three/drei');

  if (useDraco) {
    useGLTF.setDecoderPath('/assets/draco/');
  }

  return new Promise((resolve, reject) => {
    try {
      const gltf = useGLTF(url, true);
      resolve(gltf);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Create optimized texture loader
 * @param {string} url - Texture URL
 * @param {Object} options - Loading options
 * @returns {Promise} Texture data
 */
export const loadOptimizedTexture = async (url, options = {}) => {
  const { quality = 'high' } = options;

  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();

    loader.load(
      url,
      (texture) => {
        // Optimize texture settings based on device and quality
        const isMobile = isMobileDevice();
        const shouldOptimize = isMobile || quality === 'low';

        texture.generateMipmaps = !shouldOptimize;
        texture.minFilter = shouldOptimize ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;

        // Reduce texture size on mobile/low quality
        if (shouldOptimize && texture.image) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxSize = 512;

          canvas.width = Math.min(texture.image.width, maxSize);
          canvas.height = Math.min(texture.image.height, maxSize);

          ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height);
          texture.image = canvas;
        }

        resolve(texture);
      },
      undefined,
      reject
    );
  });
};
