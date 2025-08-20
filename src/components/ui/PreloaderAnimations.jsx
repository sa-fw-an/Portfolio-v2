import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useThreeContext } from '../../contexts/ThreeContext';

const PreloaderAnimations = () => {
  const timelineRef = useRef();

  const { roomRef, childrenMap, setControlsEnabled } = useThreeContext();

  useEffect(() => {
    // Convert intro text to spans for animation
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

    // Convert text elements
    const introText = document.querySelector('.intro-text span');
    convertToSpans(introText);

  // Create timeline for preloader animations
  timelineRef.current = gsap.timeline({ delay: 2.5 });
    
    // Hide preloader
    timelineRef.current.to('.preloader', {
      opacity: 0,
      delay: 1,
      onComplete: () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
          preloader.classList.add('hidden');
        }
      }
    });

    // Animate intro text
    timelineRef.current.to('.intro-text .animatedis', {
      yPercent: 0,
      stagger: 0.05,
      ease: 'back.out(1.7)',
    })
    .to('.arrow-svg-wrapper', {
      opacity: 1,
    }, 'same')
    .to('.toggle-bar', {
      opacity: 1,
    }, 'same');

    // First intro also nudge cube/room if available
    timelineRef.current.add(() => {
      const room = roomRef.current;
      const cube = childrenMap?.cube;
      if (room && cube) {
        gsap.to(cube.scale, { x: 1, y: 1, z: 1, duration: 0.7, ease: 'back.out(1.7)' });
        gsap.to(room.position, { x: 0.2, y: 0.05, duration: 0.7, ease: 'power2.out' });
      }
    }, 'same');

    // Add scroll event listener for second intro
  const handleScroll = (e) => {
      if (e.deltaY > 0) {
        playSecondIntro();
        window.removeEventListener('wheel', handleScroll);
      }
    };

    const handleTouch = (e) => {
      const initialY = e.touches[0].clientY;
      
      const handleTouchMove = (moveEvent) => {
        const currentY = moveEvent.touches[0].clientY;
        const difference = initialY - currentY;
        if (difference > 0) {
          playSecondIntro();
          window.removeEventListener('touchstart', handleTouch);
          window.removeEventListener('touchmove', handleTouchMove);
        }
      };

      window.addEventListener('touchmove', handleTouchMove, { once: true });
    };

  const playSecondIntro = () => {
      const secondTimeline = gsap.timeline();
      
      secondTimeline.to('.intro-text .animatedis', {
        yPercent: -100,
        stagger: 0.05,
        ease: 'back.in(1.7)',
      })
      .to('.arrow-svg-wrapper', {
        opacity: 0,
      }, 'same');

      // 3D reveal sequence
  const room = roomRef.current;
  const parts = childrenMap || {};
      if (room) {
        // spin/stretch cube and move camera-like effect via room
        if (parts.cube) {
          secondTimeline
            .to(parts.cube.rotation, { y: `+=${Math.PI * 2 + Math.PI / 4}`, duration: 1.2, ease: 'power3.out' }, 'same')
            .to(parts.cube.scale, { x: 1.1, y: 1.1, z: 10, duration: 0.9, ease: 'power2.out' }, 'same')
            .to(parts.cube.position, { z: 1.35, duration: 0.9, ease: 'power2.out' }, 'same')
            .to(parts.cube.scale, { x: 1, y: 1, z: 1, duration: 0.35, ease: 'back.out(2)' });
        }

        // reveal major parts in sequence
        const show = (obj, label) => obj && secondTimeline.to(obj.scale, { x: 1, y: 1, z: 1, duration: 0.5 }, label);
        show(parts.aquarium, '>-0.5');
        show(parts.clock, '>-0.4');
        show(parts.shelves, '>-0.3');
        show(parts.floor_items, '>-0.2');
        show(parts.desks, '>-0.1');
        show(parts.table_stuff, '>-0.1');
        if (parts.computer) secondTimeline.to(parts.computer.scale, { x: 1, y: 1, z: 1, ease: 'back.out(2.2)', duration: 0.5 });
  if (parts.mini_floor) secondTimeline.set(parts.mini_floor.scale, { x: 1, y: 1, z: 1 });
        if (parts.chair) {
          secondTimeline.to(parts.chair.scale, { x: 1, y: 1, z: 1, duration: 0.5 }, 'chair');
          secondTimeline.to(parts.chair.rotation, { y: `+=${Math.PI / 2}`, duration: 1.0 }, 'chair');
        }
        if (parts.fish) secondTimeline.to(parts.fish.scale, { x: 1, y: 1, z: 1, duration: 0.5 }, 'chair');
      }

  secondTimeline.to('.arrow-svg-wrapper', { opacity: 1, onComplete: () => setControlsEnabled(true) });
    };

    setTimeout(() => {
      window.addEventListener('wheel', handleScroll);
      window.addEventListener('touchstart', handleTouch);
    }, 2200);

    // Hide arrow once hero leaves view
    const onWindowScroll = () => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroBelowTop = rect.bottom <= 0 || rect.top <= -rect.height * 0.3;
      if (heroBelowTop) {
        gsap.to('.arrow-svg-wrapper', { opacity: 0, duration: 0.3, overwrite: true });
        window.removeEventListener('scroll', onWindowScroll);
      }
    };
    window.addEventListener('scroll', onWindowScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouch);
  if (timelineRef.current) {
        timelineRef.current.kill();
      }
  window.removeEventListener('scroll', onWindowScroll);
    };
  }, [roomRef, childrenMap, setControlsEnabled]);

  return null;
};

export default PreloaderAnimations;
