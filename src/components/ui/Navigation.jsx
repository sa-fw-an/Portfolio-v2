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
      <div className="flex flex-col space-y-4">
        {navigationLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.href)}
            className={`text-left px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              activeSection === link.href.slice(1) ? 'bg-[--color-pink] text-white' : 'text-[--color-text] hover:bg-[--color-pink] hover:text-white'
            }`}
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
