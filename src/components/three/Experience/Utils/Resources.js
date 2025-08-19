import { EventEmitter } from 'events';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();
    this.sources = sources;
    this.items = {};
    this.toLoad = sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader()
    };
  }

  startLoading() {
    this.sources.forEach((source) => {
      if (source.type === 'glbModel') {
        this.loaders.gltfLoader.load(source.path, (file) => this.sourceLoaded(source, file));
      } else if (source.type === 'videoTexture') {
        const video = document.createElement('video');
        video.src = source.path;
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.play();
        const texture = new THREE.VideoTexture(video);
        this.sourceLoaded(source, texture);
      }
    });
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) this.emit('ready');
  }
}
