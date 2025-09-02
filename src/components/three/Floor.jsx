import { forwardRef } from 'react';
import * as THREE from 'three';

const Floor = forwardRef((props, ref) => {
  return (
    <group ref={ref} {...props}>
      {/* Colored Circles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.29, 0]} scale={[0,0,0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#eb7f8e" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.28, 0]} scale={[0,0,0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#6176b7" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.27, 0]} scale={[0,0,0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#16ee94" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -0.26, 0]} scale={[0,0,0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#c8976f" />
      </mesh>
    </group>
  );
});

Floor.displayName = 'Floor';

export default Floor;
