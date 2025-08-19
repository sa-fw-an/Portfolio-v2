import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';

export default function Environment() {
  const { scene } = useThree();
  const { theme } = useTheme();

  useEffect(() => {
    const sunLight = new THREE.DirectionalLight('#ffffff', 3);
    sunLight.position.set(-1.5, 7, 3);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight('#ffffff', 1);
    scene.add(ambientLight);

    const switchTheme = (newTheme) => {
      const color = newTheme === 'dark' ? 0x8395CD : 0xffffff;
      sunLight.color.set(color);
      ambientLight.color.set(color);
    };
    switchTheme(theme);

    return () => {
      scene.remove(sunLight, ambientLight);
    };
  }, [scene, theme]);

  return null;
}
