import { Environment, OrbitControls } from '@react-three/drei';
import Room from './Room';
import Floor from './Floor';
import Lights from './Lights';
import { useTheme } from '../../contexts/ThemeContext';

const Experience = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Lighting */}
      <Lights theme={theme} />
      
      {/* Environment */}
      <Environment preset="city" />
      
      {/* Controls - disabled for smooth experience */}
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      
      {/* 3D Objects */}
      <Floor />
      <Room />
    </>
  );
};

export default Experience;
