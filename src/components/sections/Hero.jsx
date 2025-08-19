import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { personalInfo } from '../../constants/personal';

const Hero = () => {
  const container = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const descriptionRef = useRef();

  // Convert text to animated characters
  const convertToChars = (element) => {
    if (!element) return;
    const text = element.textContent;
    element.innerHTML = text
      .split('')
      .map(char => {
        if (char === ' ') return '<span class="animate-char">&nbsp;</span>';
        return `<span class="animate-char">${char}</span>`;
      })
      .join('');
  };

  useEffect(() => {
    convertToChars(titleRef.current);
    convertToChars(subtitleRef.current);
    convertToChars(descriptionRef.current);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 });

    // Animate title characters
    tl.fromTo('.hero-main .animate-char', 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.02,
        ease: 'back.out(1.7)' 
      }
    );

    // Animate subtitle
    tl.fromTo('.hero-subtitle .animate-char',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.01,
        ease: 'power2.out'
      },
      '-=0.3'
    );

    // Animate description
    tl.fromTo('.hero-description .animate-char',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.005,
        ease: 'power2.out'
      },
      '-=0.2'
    );

    // Animate arrow
    tl.fromTo('.arrow-svg-wrapper',
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'bounce.out'
      },
      '-=0.5'
    );

  }, { scope: container });

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={container} id="home" className="section">
      <div className="hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            {/* Greeting */}
            <div className="hero-greeting">
              <span className="hero-greeting-text">
                {personalInfo.tagline}
              </span>
            </div>

            {/* Main title */}
            <h1 
              ref={titleRef}
              className="hero-title"
              style={{ color: 'var(--color-text)' }}
            >
              {personalInfo.name}
            </h1>

            {/* Subtitle */}
            <h2 
              ref={subtitleRef}
              className="hero-subtitle"
              style={{ color: 'var(--color-muted)' }}
            >
              {personalInfo.title}
            </h2>

            {/* Description */}
            <p 
              ref={descriptionRef}
              className="hero-description"
              style={{ color: 'var(--color-muted)' }}
            >
              {personalInfo.description}
            </p>

            {/* CTA Buttons */}
            <div className="hero-actions">
              <button 
                onClick={scrollToNext}
                className="hero-btn hero-btn-primary"
              >
                View My Work
              </button>
              <a 
                href="#contact"
                className="hero-btn hero-btn-secondary"
              >
                Get In Touch
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
              <button 
                onClick={scrollToNext}
                className="scroll-indicator"
                style={{ color: 'var(--color-primary)' }}
              >
                <div className="scroll-text">Scroll Down</div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="arrow-svg-wrapper">
                  <path d="M12 16l-6-6h12z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Optional: Add a background pattern or decoration */}
          <div className="hero-decoration">
            <div className="hero-pattern"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
