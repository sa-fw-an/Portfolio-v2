import * as THREE from 'three';
import Experience from './Experience.jsx';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.z = 5;
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.width / this.sizes.height;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  update() {
    // Camera animations can be added here
  }
}
