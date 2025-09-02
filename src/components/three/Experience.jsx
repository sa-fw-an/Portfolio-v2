import { Environment, OrthographicCamera, ContactShadows } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import Room from './Room';
import Floor from './Floor';
import Lights from './Lights';
import Controls from './Controls';
import { useTheme } from '@/contexts/ThemeContext';
import { useThreeContext } from '@/contexts/ThreeContext';
import { setupOrthographicCamera } from '@/utils/cameraUtils';
import { CAMERA_CONSTANTS, WEBGL_CONSTANTS } from '@/constants/globalConstants';
import { getPerformanceProfile, isMobileDevice } from '@/utils/deviceUtils';

const Experience = () => {
  const { theme } = useTheme();
  const roomRef = useRef();
  const floorRef = useRef();
  const { size } = useThree();
  const { roomRef: sharedRoomRef, floorRef: sharedFloorRef, setCamera } = useThreeContext();

  const performanceProfile = getPerformanceProfile();
  
  const getShadowSettings = () => {
    switch (performanceProfile) {
      case 'medium':
        if (isMobileDevice()) {
          return { shadowMapSize: WEBGL_CONSTANTS.SHADOW_MAP_SIZE.MOBILE, enableShadows: true };
        } else {
          return { shadowMapSize: WEBGL_CONSTANTS.SHADOW_MAP_SIZE.LAPTOP, enableShadows: true };
        }
      case 'high':
        return { shadowMapSize: WEBGL_CONSTANTS.SHADOW_MAP_SIZE.DESKTOP, enableShadows: true };
      default:
        return { shadowMapSize: WEBGL_CONSTANTS.SHADOW_MAP_SIZE.LAPTOP, enableShadows: true };
    }
  };
  
  const shadowSettings = getShadowSettings();

  useEffect(() => {
    sharedRoomRef.current = roomRef.current;
    sharedFloorRef.current = floorRef.current;
  }, [sharedRoomRef, sharedFloorRef]);

  const handleCameraUpdate = (camera) => {
    setupOrthographicCamera(camera, size.width, size.height);
    setCamera?.(camera);
  };

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={CAMERA_CONSTANTS.DEFAULT_POSITION}
        rotation={[CAMERA_CONSTANTS.DEFAULT_ROTATION_X, 0, 0]}
        near={CAMERA_CONSTANTS.NEAR}
        far={CAMERA_CONSTANTS.FAR}
        left={(-size.width / size.height * CAMERA_CONSTANTS.FRUSTUM) / 2}
        right={(size.width / size.height * CAMERA_CONSTANTS.FRUSTUM) / 2}
        top={CAMERA_CONSTANTS.FRUSTUM / 2}
        bottom={-CAMERA_CONSTANTS.FRUSTUM / 2}
        zoom={CAMERA_CONSTANTS.ZOOM}
        onUpdate={handleCameraUpdate}
      />

      <Lights theme={theme} />
      <Environment preset="night" />
      <Floor ref={floorRef} />
      <Room ref={roomRef} />
      {shadowSettings.enableShadows && (
        <ContactShadows 
          position={[0, 1, 0]} 
          opacity={0} 
          width={4} 
          height={4} 
          blur={0} 
          far={0} 
        />
      )}
      <Controls roomRef={roomRef} floorRef={floorRef} />
    </>
  );
};

export default Experience;
