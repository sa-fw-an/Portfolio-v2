import React, { createContext, useContext, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider = ({ children }) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    timelineRef.current = gsap.timeline();
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const animateSection = (element, options = {}) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power2.out",
        ...options,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...options.scrollTrigger
        }
      }
    );
  };

  const animateText = (element, options = {}) => {
    return gsap.fromTo(element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        ...options
      }
    );
  };

  const fadeIn = (element, options = {}) => {
    return gsap.fromTo(element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        ...options
      }
    );
  };

  return (
    <AnimationContext.Provider value={{
      timeline: timelineRef.current,
      animateSection,
      animateText,
      fadeIn
    }}>
      {children}
    </AnimationContext.Provider>
  );
};
