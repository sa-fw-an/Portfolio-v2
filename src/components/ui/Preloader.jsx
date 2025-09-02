import { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (!loading) {
      gsap.to('.preloader', { 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        onComplete: () => {
          const preloader = document.querySelector('.preloader');
          if (preloader) {
            preloader.classList.add('hidden');
          }
        }
      });
    }
  }, [loading]);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader">
      <div className="preloader-wrapper">
        <div className="loading-progress">
          <div 
            className="loading-bar" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
          <span className="loading-text">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
