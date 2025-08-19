import { Environment } from '@react-three/drei';
import { useRef } from 'react';
import Room from './Room';
import Floor from './Floor';
import Lights from './Lights';
import Controls from './Controls';
import { useTheme } from '../../contexts/ThemeContext';

const Experience = () => {
  const { theme } = useTheme();
  const roomRef = useRef();
  const floorRef = useRef();

  return (
    <>
      {/* Lighting */}
      <Lights theme={theme} />
      
      {/* Environment */}
      <Environment preset="city" />
      
      {/* 3D Objects */}
      <Floor ref={floorRef} />
      <Room ref={roomRef} />
      
      {/* Controls for scroll animations */}
      <Controls roomRef={roomRef} floorRef={floorRef} />
    </>
  );
};

export default Experience;
