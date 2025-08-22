import { Environment, OrthographicCamera } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import Room from './Room';
import Floor from './Floor';
import Lights from './Lights';
import Controls from './Controls';
import { useTheme } from '../../contexts/ThemeContext';
import { useThreeContext } from '../../contexts/ThreeContext';

const Experience = () => {
  const { theme } = useTheme();
  const roomRef = useRef();
  const floorRef = useRef();
  const { size } = useThree();
  const { roomRef: sharedRoomRef, floorRef: sharedFloorRef, setCamera } = useThreeContext();

  useEffect(() => {
    sharedRoomRef.current = roomRef.current;
    sharedFloorRef.current = floorRef.current;
  }, [sharedRoomRef, sharedFloorRef]);

  const handleCameraUpdate = (camera) => {
    if (camera && camera.isOrthographicCamera) {
      const aspect = size.width / size.height;
      const frustum = 5;
      camera.left = (-aspect * frustum) / 2;
      camera.right = (aspect * frustum) / 2;
      camera.top = frustum / 2;
      camera.bottom = -frustum / 2;
      camera.updateProjectionMatrix();
    }
    setCamera?.(camera);
  };

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 6.5, 10]}
        rotation={[-Math.PI / 6, 0, 0]}
        near={-50}
        far={50}
        left={(-size.width / size.height * 5) / 2}
        right={(size.width / size.height * 5) / 2}
        top={5 / 2}
        bottom={-5 / 2}
        zoom={1}
        onUpdate={handleCameraUpdate}
      />

      {/* Lighting */}
      <Lights theme={theme} />
      
      {/* Environment preset maintained as requested */}
      <Environment preset="night" />

      {/* 3D Objects */}
      <Floor ref={floorRef} />
      <Room ref={roomRef} />
      
      {/* Controls for scroll animations */}
      <Controls roomRef={roomRef} floorRef={floorRef} />
    </>
  );
};

export default Experience;
