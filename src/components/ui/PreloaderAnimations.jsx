import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useThreeContext } from '@/contexts/ThreeContext';

const convertToSpans = (element) => {
  if (!element || element.dataset.converted) return;
  element.style.overflow = "hidden";
  element.dataset.converted = 'true';
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
  const { roomRef, childrenMap, setControlsEnabled } = useThreeContext();
  const sizes = { width: window.innerWidth, height: window.innerHeight };
  const device = sizes.width < 968 ? 'mobile' : 'desktop';
  const timelineRef = useRef();

  const checkAssetsReady = useCallback(() => {
    return roomRef.current && childrenMap && Object.keys(childrenMap).length > 0;
  }, [roomRef, childrenMap]);

  const waitForAssets = useCallback(() => {
    return new Promise((resolve) => {
      const check = () => {
        if (checkAssetsReady()) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }, [checkAssetsReady]);

  useGSAP(() => {
    const convertTextElements = () => {
      const elements = [
        '.intro-text',
        '.hero-main-title', 
        '.hero-main-description',
        '.first-sub',
        '.second-sub'
      ];
      
      elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          convertToSpans(element);
        }
      });
    };

    // First intro animation (exact original)
    const firstIntro = () => {
      return new Promise((resolve) => {
        const timeline = gsap.timeline();
        timelineRef.current = timeline;
        
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

        const room = roomRef.current;
        const cube = childrenMap?.cube;
        
        if (!room || !cube) {
          resolve();
          return;
        }

        // Device-specific animations (exact original)
        if (device === 'desktop') {
          timeline
            .to(cube.scale, {
              x: 1.4,
              y: 1.4, 
              z: 1.4,
              ease: 'back.out(2.5)',
              duration: 0.7,
            })
            .to(room.position, {
              x: -1,
              ease: 'power1.out',
              duration: 0.7,
            }, '<');
        } else {
          timeline
            .to(cube.scale, {
              x: 1.4,
              y: 1.4,
              z: 1.4,
              ease: 'back.out(2.5)',
              duration: 0.7,
            })
            .to(room.position, {
              z: -1,
              ease: 'power1.out',
              duration: 0.7,
            }, '<');
        }

        // Animate intro text (exact original)
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

    // Second intro animation (exact original)
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

        const showObject = (obj, delay = '>-0.5') => {
          if (obj?.scale) {
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

    const playIntro = async () => {
      await waitForAssets();
      convertTextElements();
      await firstIntro();
      
      let isCleanedUp = false;
      
      const handleScroll = (e) => {
        if (e.deltaY > 0 && !isCleanedUp) {
          playSecondIntro();
          removeEventListeners();
        }
      };

      let activeTouchMove = null;
      const handleTouch = (e) => {
        if (isCleanedUp) return;
        
        const initialY = e.touches && e.touches[0] ? e.touches[0].clientY : 0;

        activeTouchMove = (moveEvent) => {
          if (isCleanedUp) return;
          
          const currentY =
            moveEvent.touches && moveEvent.touches[0]
              ? moveEvent.touches[0].clientY
              : 0;
          const difference = initialY - currentY;
          if (difference > 0) {
            playSecondIntro();
            removeEventListeners();
          }
        };
        window.addEventListener('touchmove', activeTouchMove, { once: true, passive: true });
      };

      const removeEventListeners = () => {
        if (isCleanedUp) return;
        isCleanedUp = true;
        
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchstart', handleTouch);
        if (activeTouchMove) {
          try {
            window.removeEventListener('touchmove', activeTouchMove);
          } catch {
            // ignore if already removed
          }
          activeTouchMove = null;
        }
      };

      const playSecondIntro = async () => {
        if (isCleanedUp) return;
        await secondIntro();
        setControlsEnabled(true);
      };

      window.addEventListener('wheel', handleScroll, { passive: true });
      window.addEventListener('touchstart', handleTouch, { passive: true });

      return removeEventListeners;
    };

    const timer = setTimeout(() => {
      const cleanup = playIntro();
      // Store cleanup function for useEffect cleanup
      return cleanup;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      // Clean up any remaining event listeners
      window.removeEventListener('wheel', () => {});
      window.removeEventListener('touchstart', () => {});
      window.removeEventListener('touchmove', () => {});
    };
  }, [roomRef, childrenMap, setControlsEnabled, device, checkAssetsReady, waitForAssets]);

  return null;
};

export default PreloaderAnimations;
