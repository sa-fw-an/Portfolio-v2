import React, { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const container = useRef();

  useGSAP(() => {
    if (!loading) {
      gsap.to(container.current, { opacity: 0, duration: 0.5, onComplete: () => container.current.style.display = 'none' });
    }
  }, [loading]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          setLoading(false);
          return 100;
        }
        return Math.min(old + Math.random() * 20, 100);
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div ref={container} className="fixed inset-0 bg-[--color-background] z-[99999] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex mb-8">
          <div className="w-2.5 h-2.5 rounded-full mx-1.5 bg-[--color-pink] animate-[bounce_1s_infinite]" />
          <div className="w-2.5 h-2.5 rounded-full mx-1.5 bg-[--color-pink] animate-[bounce_1s_infinite_0.2s]" />
          <div className="w-2.5 h-2.5 rounded-full mx-1.5 bg-[--color-pink] animate-[bounce_1s_infinite_0.4s]" />
        </div>
        <p className="text-[--color-text]">Loading... {Math.floor(progress)}%</p>
      </div>
    </div>
  );
};

export default Preloader;
