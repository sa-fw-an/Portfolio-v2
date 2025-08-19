import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export default function Controls() {
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      camera.position.y = -progress * 2;
      camera.position.x = Math.sin(progress * Math.PI * 2) * 2;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera]);

  return null;
}
