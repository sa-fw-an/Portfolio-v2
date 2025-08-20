import { useRef, useEffect } from 'react';
import { personalInfo } from '../../constants/personal';

const Hero = () => {
  const container = useRef();
  const mainTitleRef = useRef();
  const mainDescRef = useRef();
  const secondSubRef = useRef();

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
    convertToSpans(mainTitleRef.current);
    convertToSpans(mainDescRef.current);
    convertToSpans(secondSubRef.current);
  }, []);

  return (
    <div ref={container} className="hero">
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
          <h2 className="hero-second-subheading">
            <span className="first-sub">
              <span className="animatedis">{personalInfo.title}</span>
            </span>
          </h2>
          <p 
            ref={secondSubRef}
            className="second-sub"
          >
            {personalInfo.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
