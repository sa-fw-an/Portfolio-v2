import { useRef, useEffect } from 'react';
import { personalInfo } from '@/constants/personal';

const Hero = () => {
  const containerRef = useRef();
  const mainTitleRef = useRef();
  const mainDescRef = useRef();
  const firstSubRef = useRef();
  const secondSubRef = useRef();

  // Convert text to animated spans
  const convertToSpans = (element) => {
    if (!element) return;
    const text = element.textContent;
    element.innerHTML = text
      .split('')
      .map(char => {
        if (char === ' ') return '<span class="animatedis">&nbsp;</span>';
        return `<span class="animatedis">${char}</span>`;
      })
      .join('');
  };

  useEffect(() => {
    convertToSpans(mainTitleRef.current);
    convertToSpans(mainDescRef.current);
    convertToSpans(firstSubRef.current);
    convertToSpans(secondSubRef.current);
  }, []);

  return (
    <div ref={containerRef} className="hero">
      <div className="hero-wrapper">
        <div className="intro-text">
          Please Scroll Down
        </div>
        <div className="arrow-svg-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"/>
          </svg>
        </div>

        {/* Main content - left side */}
        <div className="hero-main">
          <h1 
            ref={mainTitleRef}
            className="hero-main-title"
          >
            {personalInfo.name}
          </h1>
          <p 
            ref={mainDescRef}
            className="hero-main-description"
          >
            {personalInfo.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
