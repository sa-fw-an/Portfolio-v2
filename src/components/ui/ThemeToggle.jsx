import React, { useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 3, ease: 'power2.out' });
  }, { scope: container });

  return (
    <div ref={container} className="fixed top-12 right-12 z-50 flex items-center opacity-0">
      <div className="sun-wrapper flex items-center text-[var(--color-text)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        </svg>
      </div>
      
      <button
        onClick={toggleTheme}
        className="cursor-pointer relative w-14 h-7 flex items-center justify-center rounded-full mx-4 border-none shadow-md hover:scale-95 transition-transform"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <div 
          className={`absolute w-5 h-5 rounded-full transition-all duration-200 ${theme === 'dark' ? 'left-8' : 'left-1.5'}`}
          style={{ backgroundColor: 'var(--color-background)' }}
        ></div>
      </button>
      
      <div className="moon-wrapper flex items-center text-[var(--color-text)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96z"/>
        </svg>
      </div>
    </div>
  );
};

export default ThemeToggle;
