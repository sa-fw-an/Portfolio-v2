import { useRef, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useThreeContext } from '../../contexts/ThreeContext';

const Room = forwardRef((props, ref) => {
  const internalRef = useRef();
  const mixerRef = useRef(null);
  
  // Enable DRACO decoding if model is compressed
  useGLTF.setDecoderPath('/draco/');
  
  let scene, animations;
  const gltf = useGLTF('/models/room.glb', true);
  scene = gltf.scene;
  animations = gltf.animations || [];

  const { setChildrenMap, roomRef: sharedRoomRef, rectLightRef } = useThreeContext();

  const lerp = useRef({ current: 0, target: 0, ease: 0.1 });

  const handleMouseMove = (event) => {
    const rotation = ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
    lerp.current.target = rotation * 0.05;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create fallback objects if model doesn't exist
  useEffect(() => {
    let roomGroup;
    let found = {};

    if (scene) {
      // Use loaded model
      roomGroup = scene;
      
      // Build children map with exact original naming
      const roomPartMap = {
        cube: ['Cube', 'cube'],
        aquarium: ['Aquarium', 'aquarium', 'FishTank', 'fish_tank'],
        computer: ['Computer', 'computer', 'PC', 'pc'],
        screen: ['Screen', 'screen', 'Monitor_Screen'],
        clock: ['Clock', 'clock'],
        shelves: ['Shelves', 'shelves', 'Shelf', 'shelf'],
        floor_items: ['Floor_Items', 'floor_items', 'FloorItems'],
        desks: ['Desks', 'desks', 'Desk', 'desk', 'Table', 'table'],
        table_stuff: ['Table_Stuff', 'table_stuff', 'TableStuff'],
        mini_floor: ['Mini_Floor', 'mini_floor'],
        chair: ['Chair', 'chair'],
        fish: ['Fish', 'fish'],
        body: ['Body', 'body', 'Room', 'room'],
        mailbox: ['Mailbox', 'mailbox'],
        lamp: ['Lamp', 'lamp'],
        floor_first: ['FloorFirst', 'floorfirst', 'Floor_First', 'floor_first'],
        floor_second: ['FloorSecond', 'floorsecond', 'Floor_Second', 'floor_second'],
        floor_third: ['FloorThird', 'floorthird', 'Floor_Third', 'floor_third'],
        dirt: ['Dirt', 'dirt'],
        flower1: ['Flower1', 'flower1', 'Flower_1'],
        flower2: ['Flower2', 'flower2', 'Flower_2'],
      };

      const indexByName = (name) => name?.toLowerCase?.() || '';

      scene.traverse((child) => {
        if (child.isMesh || child.isGroup) {
          child.castShadow = true;
          child.receiveShadow = true;
        }

        const lc = indexByName(child.name);
        Object.entries(roomPartMap).forEach(([key, candidates]) => {
          if (found[key]) return;
          if (candidates.some((n) => indexByName(n) === lc)) {
            found[key] = child;
          }
        });
      });

      // Aquarium glass material (exact original)
      if (found.aquarium) {
        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x549dd2,
          roughness: 0,
          transmission: 1,
          ior: 3,
          opacity: 1,
          depthWrite: false,
          depthTest: false,
        });
        
        if (found.aquarium.children?.[0]?.material) {
          found.aquarium.children[0].material = glassMaterial;
        } else if (found.aquarium.material) {
          found.aquarium.material = glassMaterial;
        }
      }

      // Computer screen video texture (exact original)
      if (found.computer || found.screen) {
        const video = document.createElement('video');
        video.src = '/textures/coding.mp4';
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        
        video.play().catch(console.warn);
        
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.NearestFilter;
        videoTexture.magFilter = THREE.NearestFilter;
        videoTexture.generateMipmaps = false;
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        
        const screenMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
        
        const target = found.screen || found.computer?.children?.[1];
        if (target?.material) {
          target.material = screenMaterial;
        }
      }

      // Mini floor positioning (exact original)
      if (found.mini_floor) {
        found.mini_floor.position.x = -0.289521;
        found.mini_floor.position.z = 8.83572;
      }

    } else {
      // Create fallback cube if no model exists
      roomGroup = new THREE.Group();
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x606060 });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.name = 'Cube';
      roomGroup.add(cube);
      found.cube = cube;
    }

    // FIXED: Proper cube positioning and scaling
    if (found.cube) {
      // Position the cube properly in the scene
      found.cube.position.set(0, -1, 0); // Moved down from 2 to -1 to match original
      found.cube.rotation.y = Math.PI / 4;
      found.cube.scale.set(0, 0, 0); // Start hidden for animation
    }

    // Hide all objects initially for staged reveal (exact original behavior)
    const hideObjects = [
      'aquarium', 'clock', 'shelves', 'floor_items', 'desks', 'table_stuff', 
      'computer', 'mini_floor', 'chair', 'fish',
      'mailbox', 'lamp', 'floor_first', 'floor_second', 'floor_third', 
      'dirt', 'flower1', 'flower2', 'body'
    ];

    hideObjects.forEach((key) => {
      const obj = found[key];
      if (obj?.scale?.set) {
        obj.scale.set(0, 0, 0);
      }
    });

    // Animation mixer setup (exact original)
    if (animations.length && roomGroup) {
      mixerRef.current = new THREE.AnimationMixer(roomGroup);
      const action = mixerRef.current.clipAction(animations[0]);
      action.play();
    }

    // Add RectAreaLight (exact original setup)
    const rectLight = new THREE.RectAreaLight(0xffffff, 1, 0.5, 0.7);
    rectLight.position.set(7.68244, 7, 0.5);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    roomGroup.add(rectLight);
    found.rectLight = rectLight;

    // Store rectLight ref for external access
    if (rectLightRef) {
      rectLightRef.current = rectLight;
    }

    // Share the children map
    setChildrenMap(found);

  }, [scene, animations, setChildrenMap, rectLightRef]);

  // Animation loop (exact original)
  useFrame((state) => {
    const roomRef = ref?.current || internalRef.current;
    
    if (roomRef) {
      // Mouse lerp rotation (exact original)
      lerp.current.current = THREE.MathUtils.lerp(
        lerp.current.current,
        lerp.current.target,
        lerp.current.ease
      );
      roomRef.rotation.y = lerp.current.current;
    }

    // Animation mixer update (exact original)
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
      position={[0, 1, 0]}
      {...props}
    >
      {scene && <primitive object={scene} />}
    </group>
  );
});

Room.displayName = 'Room';

// Preload model to avoid jank on first reveal
useGLTF.preload('/models/room.glb');

export default Room;