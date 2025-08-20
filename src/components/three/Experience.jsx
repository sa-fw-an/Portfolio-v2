import { Environment, OrthographicCamera } from '@react-three/drei';
import { useRef, useEffect } from 'react';
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
  const { roomRef: sharedRoomRef, floorRef: sharedFloorRef, setCamera } = useThreeContext();

  useEffect(() => {
    sharedRoomRef.current = roomRef.current;
    sharedFloorRef.current = floorRef.current;
  }, [sharedRoomRef, sharedFloorRef]);

  return (
    <>
      {/* Orthographic camera matching original setup */}
      <OrthographicCamera
        makeDefault
        position={[0, 6.5, 10]}
        rotation={[-Math.PI / 6, 0, 0]}
        near={-50}
        far={50}
        left={-5}
        right={5}
        top={5}
        bottom={-5}
        zoom={1}
        onUpdate={(camera) => setCamera?.(camera)}
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
