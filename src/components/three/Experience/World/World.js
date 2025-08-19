import * as THREE from 'three';
import { EventEmitter } from 'events';
import Room from './Room.js';
import Environment from './Environment.js';

export default class World extends EventEmitter {
  constructor() {
    super();
    // Use useThree() if needed for scene access
    this.room = new Room();
    this.environment = new Environment();
    this.emit('worldready');
  }

  update() {
    this.room.update();
  }
}
