import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useThreeContext } from '../../contexts/ThreeContext';

// Text to span conversion utility (exact original function)
const convertToSpans = (element) => {
  if (!element) return;
  element.style.overflow = "hidden";
  element.innerHTML = element.innerText
    .split("")
    .map((char) => {
      if (char === " ") {
        return `<span>&nbsp;</span>`;
      }
      return `<span class="animatedis">${char}</span>`;
    })
    .join("");
  return element;
};

const PreloaderAnimations = () => {
  const timelineRef = useRef();
  const { roomRef, childrenMap, setControlsEnabled } = useThreeContext();
  const sizes = { width: window.innerWidth, height: window.innerHeight };
  const device = sizes.width < 968 ? 'mobile' : 'desktop';

  useGSAP(() => {
    // Convert text elements to spans for animation
    const convertTextElements = () => {
      convertToSpans(document.querySelector('.intro-text'));
      convertToSpans(document.querySelector('.hero-main-title'));
      convertToSpans(document.querySelector('.hero-main-description'));
      convertToSpans(document.querySelector('.hero-second-subheading'));
      convertToSpans(document.querySelector('.second-sub'));
    };

    // First intro animation
    const firstIntro = () => {
      return new Promise((resolve) => {
        const timeline = gsap.timeline();
        
        // Set initial states
        timeline.set('.animatedis', { y: 0, yPercent: 100 });
        
        // Hide preloader
        timeline.to('.preloader', {
          opacity: 0,
          delay: 1,
          onComplete: () => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
              preloader.classList.add('hidden');
            }
          },
        });

        // Animate cube and room (exact original behavior)
        const room = roomRef.current;
        const cube = childrenMap?.cube;
        
        if (device === 'desktop') {
          if (cube) {
            timeline.to(cube.scale, {
              x: 1.4,
              y: 1.4,
              z: 1.4,
              ease: 'back.out(2.5)',
              duration: 0.7,
            });
          }
          if (room) {
            timeline.to(room.position, {
              x: -1,
              ease: 'power1.out',
              duration: 0.7,
            }, '<');
          }
        } else {
          if (cube) {
            timeline.to(cube.scale, {
              x: 1.4,
              y: 1.4,
              z: 1.4,
              ease: 'back.out(2.5)',
              duration: 0.7,
            });
          }
          if (room) {
            timeline.to(room.position, {
              z: -1,
              ease: 'power1.out',
              duration: 0.7,
            }, '<');
          }
        }

        // Animate intro text
        timeline
          .to('.intro-text .animatedis', {
            yPercent: 0,
            stagger: 0.05,
            ease: 'back.out(1.7)',
          })
          .to('.arrow-svg-wrapper', {
            opacity: 1,
          }, 'same')
          .to('.toggle-bar', {
            opacity: 1,
            onComplete: resolve,
          }, 'same');
      });
    };

    // Second intro animation (exact original sequence)
    const secondIntro = () => {
      return new Promise((resolve) => {
        const secondTimeline = gsap.timeline();

        // Fade out intro elements
        secondTimeline
          .to('.intro-text .animatedis', {
            yPercent: 100,
            stagger: 0.05,
            ease: 'back.in(1.7)',
          }, 'fadeout')
          .to('.arrow-svg-wrapper', {
            opacity: 0,
          }, 'fadeout');

        // Room and cube transformations (exact original)
        const room = roomRef.current;
        const parts = childrenMap || {};

        if (room && parts.cube) {
          secondTimeline
            .to(room.position, {
              x: 0,
              y: 0,
              z: 0,
              ease: 'power1.out',
            }, 'same')
            .to(parts.cube.rotation, {
              y: 2 * Math.PI + Math.PI / 4,
            }, 'same')
            .to(parts.cube.scale, {
              x: 10,
              y: 10,
              z: 10,
            }, 'same')
            .to(parts.cube.position, {
              x: 0.638711,
              y: 8.5618,
              z: 1.3243,
            }, 'same');

          // Set body visible and hide cube
          if (parts.body) {
            secondTimeline.set(parts.body.scale, {
              x: 1,
              y: 1,
              z: 1,
            });
          }

          secondTimeline.to(parts.cube.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
          }, 'introtext');
        }

        // Animate hero text
        secondTimeline
          .to('.hero-main-title .animatedis', {
            yPercent: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          }, 'introtext')
          .to('.hero-main-description .animatedis', {
            yPercent: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          }, 'introtext')
          .to('.first-sub .animatedis', {
            yPercent: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          }, 'introtext')
          .to('.second-sub .animatedis', {
            yPercent: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          }, 'introtext');

        // Sequential room object reveals (exact original sequence)
        const showObject = (obj, delay = '>-0.5') => {
          if (obj) {
            secondTimeline.to(obj.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2.2)',
              duration: 0.5,
            }, delay);
          }
        };

        showObject(parts.aquarium, '>-0.5');
        showObject(parts.clock, '>-0.4');
        showObject(parts.shelves, '>-0.3');
        showObject(parts.floor_items, '>-0.2');
        showObject(parts.desks, '>-0.1');
        showObject(parts.table_stuff, '>-0.1');
        showObject(parts.computer);

        // Mini floor and chair
        if (parts.mini_floor) {
          secondTimeline.set(parts.mini_floor.scale, {
            x: 1,
            y: 1,
            z: 1,
          });
        }

        if (parts.chair) {
          secondTimeline
            .to(parts.chair.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2.2)',
              duration: 0.5,
            }, 'chair')
            .to(parts.chair.rotation, {
              y: 4 * Math.PI + Math.PI / 4,
              ease: 'power2.out',
              duration: 1,
            }, 'chair');
        }

        showObject(parts.fish, 'chair');

        secondTimeline.to('.arrow-svg-wrapper', {
          opacity: 1,
          onComplete: resolve,
        });
      });
    };

    // Main animation sequence
    const playIntro = async () => {
      convertTextElements();
      await firstIntro();
      
      // Set up scroll listeners for second intro
      const handleScroll = (e) => {
        if (e.deltaY > 0) {
          playSecondIntro();
          removeEventListeners();
        }
      };

      const handleTouch = (e) => {
        const initialY = e.touches[0].clientY;
        
        const handleTouchMove = (moveEvent) => {
          const currentY = moveEvent.touches[0].clientY;
          const difference = initialY - currentY;
          if (difference > 0) {
            playSecondIntro();
            removeEventListeners();
          }
        };

        window.addEventListener('touchmove', handleTouchMove, { once: true });
      };

      const removeEventListeners = () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchstart', handleTouch);
      };

      const playSecondIntro = async () => {
        await secondIntro();
        setControlsEnabled(true);
      };

      window.addEventListener('wheel', handleScroll);
      window.addEventListener('touchstart', handleTouch);

      return () => {
        removeEventListeners();
      };
    };

    // Start the intro sequence after a short delay
    const timer = setTimeout(() => {
      playIntro();
    }, 2500);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [roomRef, childrenMap, setControlsEnabled, device]);

  return null;
};

export default PreloaderAnimations;