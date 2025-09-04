import { useThreeContext } from '@/contexts/ThreeContext';

const Preloader = () => {
  const { preloaderVisible } = useThreeContext();

  if (!preloaderVisible) return null;

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
