import React, { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const container = useRef();

  useGSAP(() => {
    if (!loading) {
      gsap.to(container.current, { 
        opacity: 0, 
        duration: 0.5, 
        onComplete: () => {
          if (container.current) {
            container.current.classList.add('hidden');
          }
        }
      });
    }
  }, [loading]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div ref={container} className="preloader">
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
