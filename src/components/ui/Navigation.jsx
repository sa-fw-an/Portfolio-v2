import React, { useState, useEffect, useRef } from 'react';
import { navigationLinks } from '../../constants/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 2.5, ease: 'power2.out' });
  }, { scope: container });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      navigationLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section && scrollY >= section.offsetTop - 100 && scrollY < section.offsetTop + section.offsetHeight) {
          setActiveSection(link.href.slice(1));
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={container} className="fixed top-8 left-8 z-50 opacity-0">
      <ul className="flex flex-col space-y-2">
        {navigationLinks.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollToSection(link.href)}
              className={`text-left text-sm tracking-wide transition-colors duration-200 font-medium border-b ${
                activeSection === link.href.slice(1)
                  ? 'border-[--color-pink] text-[--color-text]'
                  : 'border-transparent text-[--color-text] hover:border-[--color-pink]'
              }`}
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
