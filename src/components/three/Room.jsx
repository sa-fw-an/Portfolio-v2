import { useRef, useEffect, forwardRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useThreeContext } from '@/contexts/ThreeContext';
import { ASSET_PATHS } from '@/constants/globalConstants';
import { isMobileDevice } from '@/utils/deviceUtils';

const Room = forwardRef((props, ref) => {
  const internalRef = useRef();
  const mixerRef = useRef(null);
  useGLTF.setDecoderPath(ASSET_PATHS.DRACO);
  
  let scene, animations;
  const gltf = useGLTF(ASSET_PATHS.MODELS.ROOM, true);
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

  useEffect(() => {
    let roomGroup;
    let found = {};

    if (scene) {
      roomGroup = scene;
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

      if (found.computer || found.screen) {
        const video = document.createElement('video');
        video.src = ASSET_PATHS.TEXTURES.VIDEO;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        
        video.play();
        
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
      if (found.mini_floor) {
        found.mini_floor.position.x = -0.289521;
        found.mini_floor.position.z = 8.83572;
      }

    }

    if (found.cube) {
      found.cube.position.set(0, -1, 0);
      found.cube.rotation.y = Math.PI / 4;
      const isMobile = isMobileDevice();
      if (isMobile) {
        found.cube.scale.set(0, 0, 0);
      } else {
        found.cube.scale.set(0.001, 0.001, 0.001);
      }
    }

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

    if (animations.length && roomGroup) {
      mixerRef.current = new THREE.AnimationMixer(roomGroup);
      const action = mixerRef.current.clipAction(animations[0]);
      action.play();
    }

    const rectLight = new THREE.RectAreaLight(0xffffff, 1, 0.5, 0.7);
    rectLight.position.set(7.68244, 7, 0.5);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    roomGroup.add(rectLight);
    found.rectLight = rectLight;

    if (rectLightRef) {
      rectLightRef.current = rectLight;
    }

    setChildrenMap(found);

  }, [scene, animations, setChildrenMap, rectLightRef]);

  useFrame((state) => {
    const roomRef = ref?.current || internalRef.current;
    
    if (roomRef) {
      lerp.current.current = THREE.MathUtils.lerp(
        lerp.current.current,
        lerp.current.target,
        lerp.current.ease
      );
      roomRef.rotation.y = lerp.current.current;
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
      position={[0, 0.7, 0]}
      {...props}
    >
      {scene && <primitive object={scene} />}
    </group>
  );
});

Room.displayName = 'Room';

useGLTF.preload(ASSET_PATHS.MODELS.ROOM);

export default memo(Room);
