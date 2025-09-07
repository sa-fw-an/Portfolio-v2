// Animation configurations for all sections
export const sectionAnimations = {
  desktop: {
    "first-move": {
      trigger: ".first-move",
      roomAnimation: {
        scale: { x: 0.11, y: 0.11, z: 0.11 },
        position: { x: "size.width * 0.0014" },
      },
    },
    "second-move": {
      trigger: ".second-move",
      roomAnimation: {
        position: { x: 1, z: "size.height * 0.0032" },
        scale: { x: 0.4, y: 0.4, z: 0.4 },
      },
      rectLightAnimation: {
        width: "0.5 * 4",
        height: "0.7 * 4",
      },
    },
    "third-move": {
      trigger: ".third-move",
      cameraAnimation: {
        position: { y: 1.5, x: -4.1 },
      },
    },
    "fourth-move": {
      trigger: ".fourth-move",
      roomAnimation: {
        scale: { x: 0.11, y: 0.11, z: 0.11 },
        position: { x: "size.width * -0.0014", y: -0.1 },
      },
      cameraAnimation: {
        position: { x: -0.3, y: -0.8, z: 1 },
      },
    },
  },
  mobile: {
    "first-move": {
      trigger: ".first-move",
      roomAnimation: {
        scale: { x: 0.1, y: 0.1, z: 0.1 },
      },
    },
    "second-move": {
      trigger: ".second-move",
      roomAnimation: {
        scale: { x: 0.25, y: 0.25, z: 0.25 },
        position: { x: 1.5 },
      },
      rectLightAnimation: {
        width: "0.3 * 3.4",
        height: "0.4 * 3.4",
      },
    },
    "third-move": {
      trigger: ".third-move",
      roomAnimation: {
        position: { z: -4.5 },
      },
    },
    "fourth-move": {
      trigger: ".fourth-move",
      roomAnimation: {
        scale: { x: 0.1, y: 0.1, z: 0.1 },
        position: { x: 0, y: -0.1, z: -2 },
      },
    },
  },
};

// Floor circle animations configuration
export const floorCircleAnimations = [
  {
    trigger: ".first-move",
    circleIndex: 0,
    scale: { x: 3, y: 3, z: 3 },
  },
  {
    trigger: ".second-move",
    circleIndex: 1,
    scale: { x: 3, y: 3, z: 3 },
    roomPosition: { y: 0.7 },
  },
  {
    trigger: ".third-move",
    circleIndex: 2,
    scale: { x: 3, y: 3, z: 3 },
  },
  {
    trigger: ".fourth-move",
    circleIndex: 3,
    scale: { x: 3, y: 3, z: 3 },
  },
];

// Section border animation configuration
export const sectionBorderConfig = {
  leftSections: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 700,
  },
  rightSections: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 700,
  },
};
