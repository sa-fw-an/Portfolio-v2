import { useEffect, useState } from 'react';
import { ANIMATION_CONSTANTS } from '@/constants/globalConstants';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optimized loading time from constants
    const timer = setTimeout(() => {
      setLoading(false);
    }, ANIMATION_CONSTANTS.PRELOADER_DELAY);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader">
      <div className="preloader-wrapper">
        <div className="loading">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
