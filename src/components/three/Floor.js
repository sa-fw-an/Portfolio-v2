import * as THREE from 'three';

const Floor = () => {
  return (
    <group>
      {/* Main Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffe6a2" side={THREE.BackSide} />
      </mesh>
      
      {/* Colored Circles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.29, 0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#e5a1aa" />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.28, 0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#8395cd" />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.27, 0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#7ad0ac" />
      </mesh>
    </group>
  );
};

export default Floor;
