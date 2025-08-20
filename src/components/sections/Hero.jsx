import { useRef, useEffect } from 'react';
import { personalInfo } from '../../constants/personal';

const Hero = () => {
  const containerRef = useRef();
  const mainTitleRef = useRef();
  const mainDescRef = useRef();
  const secondSubRef = useRef();
  const firstSubRef = useRef();

  // Convert text to animated spans (exact original function)
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
    // Convert all text elements to spans for GSAP animation
    convertToSpans(mainTitleRef.current);
    convertToSpans(mainDescRef.current);
    convertToSpans(secondSubRef.current);
    convertToSpans(firstSubRef.current);
  }, []);

  return (
    <div ref={containerRef} className="hero">
      <div className="hero-wrapper">
        {/* Main content - left side (exact original positioning) */}
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

        {/* Secondary content - right side (exact original structure) */}
        <div className="hero-second">
          <p 
            ref={firstSubRef}
            className="hero-second-subheading first-sub"
          >
            {personalInfo.name}
          </p>
          <p 
            ref={secondSubRef}
            className="hero-second-subheading second-sub"
          >
            {personalInfo.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
