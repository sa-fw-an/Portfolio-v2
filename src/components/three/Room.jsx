import React, { useRef, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useThreeContext } from '../../contexts/ThreeContext';
import { ROOM_PARTS } from '../../constants/roomParts';

const Room = forwardRef((props, ref) => {
  const internalRef = useRef();
  // Enable DRACO decoding if model is compressed
  useGLTF.setDecoderPath('/draco/');
  const { scene, animations } = useGLTF('/models/room.glb');
  const mixerRef = useRef(null);

  const { setChildrenMap, roomRef: sharedRoomRef } = useThreeContext();

  // Mouse movement effect
  const mouse = useRef({ x: 0, y: 0 });
  const lerp = useRef({ current: 0, target: 0, ease: 0.1 });

  const handleMouseMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    lerp.current.target = mouse.current.x * 0.05;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!scene) return;
    // Build children map from ROOM_PARTS
    const found = {};
    const indexByName = (name) => name?.toLowerCase?.() || '';

  const names = [];
    scene.traverse((child) => {
      if (child.isMesh || child.isGroup) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      const lc = indexByName(child.name);
      if (child.name) names.push(child.name);
      Object.entries(ROOM_PARTS).forEach(([key, candidates]) => {
        if (found[key]) return;
        if (candidates.some((n) => indexByName(n) === lc)) {
          found[key] = child;
        }
      });
    });
  // One-time list to help mapping while integrating names
  console.log('[Room] GLB nodes:', names);

    // Aquarium glass material
    if (found.aquarium) {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x549dd2,
        roughness: 0,
        transmission: 1,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      });
      if (found.aquarium.isGroup && found.aquarium.children[0]?.material) {
        found.aquarium.children[0].material = mat;
      } else if (found.aquarium.material) {
        found.aquarium.material = mat;
      }
    }

    // Video texture on screen
    if (found.computer || found.screen) {
      const video = document.createElement('video');
      video.src = '/textures/coding.mp4';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.play();
      const tex = new THREE.VideoTexture(video);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.MeshBasicMaterial({ map: tex });
      const target = found.screen || (found.computer?.children?.[1]);
      if (target && target.material) target.material = mat;
    }

    // Position tweak for mini floor
    if (found.mini_floor) {
      found.mini_floor.position.x = -0.289521;
      found.mini_floor.position.z = 8.83572;
    }

    // Hide known parts initially (scale 0) for staged reveal; leave others visible
    const hideKeys = [
      'aquarium','clock','shelves','floor_items','desks','table_stuff','computer','mini_floor','chair','fish',
      // mini-platform/pathway pieces
      'mailbox','lamp','floor_first','floor_second','floor_third','dirt','flower1','flower2'
    ];
    hideKeys.forEach((k) => {
      const obj = found[k];
      if (obj && obj.scale && obj.scale.set) obj.scale.set(0,0,0);
    });
    const cube = found.cube;
    if (cube) {
      cube.position.set(0, -1, 0);
      cube.rotation.y = Math.PI / 4;
      // Ensure cube visible to animate in
      if (cube.scale && cube.scale.set) cube.scale.set(1,1,1);
    }

    // Mixer for animations
    if (animations.length) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      const action = mixerRef.current.clipAction(animations[0]);
      action.play();
    }

    // Share map
    setChildrenMap(found);
  }, [scene, animations, setChildrenMap]);

  useFrame((state) => {
    const roomRef = ref?.current || internalRef.current;
    if (roomRef) {
      lerp.current.current = THREE.MathUtils.lerp(
        lerp.current.current,
        lerp.current.target,
        lerp.current.ease
      );
      roomRef.rotation.y = lerp.current.current;
      roomRef.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
    if (mixerRef.current) {
      mixerRef.current.update(state.clock.getDelta() * 0.9);
    }
  });

  return (
    <group
      ref={(node) => {
        if (ref) {
          if (typeof ref === 'function') ref(node);
          else ref.current = node;
        }
        internalRef.current = node;
        sharedRoomRef.current = node;
      }}
      scale={[0.11, 0.11, 0.11]}
      position={[0, 0, 0]}
      {...props}
    >
  {scene && <primitive object={scene} />}
    </group>
  );
});

Room.displayName = 'Room';

export default Room;

// Preload model to avoid jank on first reveal
useGLTF.preload('/models/room.glb');
