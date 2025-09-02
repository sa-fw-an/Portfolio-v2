import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThreeContext } from '@/contexts/ThreeContext';
import { sectionAnimations, floorCircleAnimations, sectionBorderConfig, progressBarConfig } from '@/constants/animations';
import { isMobileDevice } from '@/utils/deviceUtils';
import { ANIMATION_CONSTANTS } from '@/constants/globalConstants';

gsap.registerPlugin(ScrollTrigger);

const Controls = ({ roomRef, floorRef }) => {
  const { camera, size } = useThree();
  const { controlsEnabled, childrenMap, rectLightRef } = useThreeContext();
  const lenisRef = useRef(null);

  const isMobile = isMobileDevice();

  // Reduce scrub and heavy pinning on mobile for smoother animations
  const scrubVal = isMobile ? ANIMATION_CONSTANTS.SCRUB.MOBILE : ANIMATION_CONSTANTS.SCRUB.DESKTOP;
  const progressScrub = isMobile ? Math.min(progressBarConfig.scrub || ANIMATION_CONSTANTS.SCRUB.DESKTOP, ANIMATION_CONSTANTS.SCRUB.MOBILE) : progressBarConfig.scrub || ANIMATION_CONSTANTS.SCRUB.DESKTOP;

  // GSAP optimization settings
  const gsapConfig = {
    force3D: true,
    transformOrigin: '0px 0px 0px'
  };

  useGSAP(() => {
    if (!controlsEnabled) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const setupScrollTriggers = () => {
      if (!roomRef.current || !floorRef.current) return;

      // Set initial positions
      if (camera && roomRef.current) {
        camera.position.set(0, 6.5, 10);
        if (camera.isOrthographicCamera) {
          camera.rotation.x = -Math.PI / 6;
          const aspect = size.width / size.height;
          const frustum = 5;
          camera.left = (-aspect * frustum) / 2;
          camera.right = (aspect * frustum) / 2;
          camera.top = frustum / 2;
          camera.bottom = -frustum / 2;
          camera.updateProjectionMatrix();
        }
        roomRef.current.scale.set(0.11, 0.11, 0.11);
        roomRef.current.position.set(0, 0, 0);
      }

      // Set page overflow
      const pageElement = document.querySelector('.page');
      if (pageElement) {
        pageElement.style.overflow = 'visible';
      }

      // Smooth scroll with Lenis on desktop only (can be expensive on mobile)
      if (!isMobile && !lenisRef.current) {
        (async () => {
          const { default: Lenis } = await import('lenis');
          const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
          });

          lenisRef.current = lenis;

          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);

          // ScrollTrigger proxy
          ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
              if (arguments.length) {
                lenis.scrollTo(value, { immediate: true });
              }
              return lenis.scroll || document.documentElement.scrollTop || document.body.scrollTop || 0;
            },
            getBoundingClientRect() {
              return { 
                top: 0, 
                left: 0, 
                width: window.innerWidth, 
                height: window.innerHeight 
              };
            },
          });

          lenis.on('scroll', ScrollTrigger.update);
        })();
      }

      // Helper function to evaluate simple arithmetic expressions safely (no eval)
      const evaluateExpression = (expr) => {
        if (typeof expr === 'string') {
          // Substitute tokens
          let s = expr.replace(/size\.width/g, String(size.width)).replace(/size\.height/g, String(size.height));
          // Allow only numbers, operators and whitespace
          if (!/^[0-9\s.+\-*/]+$/.test(s)) return Number(s) || 0;

          const tokens = s.match(/-?\d+(?:\.\d+)?|[+\-*/]/g);
          if (!tokens) return Number(s) || 0;

          // Handle * and / first
          let values = [];
          let ops = [];
          let current = parseFloat(tokens[0]);
          for (let i = 1; i < tokens.length; i += 2) {
            const op = tokens[i];
            const next = parseFloat(tokens[i + 1]);
            if (op === '*' || op === '/') {
              current = op === '*' ? current * next : current / next;
            } else {
              values.push(current);
              ops.push(op);
              current = next;
            }
          }
          values.push(current);

          // Then + and -
          let result = values[0];
          for (let i = 0; i < ops.length; i++) {
            if (ops[i] === '+') result += values[i + 1];
            else result -= values[i + 1];
          }
          return result;
        }
        return expr;
      };

      // Create animations from configuration
      const createSectionAnimations = (animationConfig, device) => {
          Object.values(animationConfig[device] || {}).forEach((config) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: config.trigger,
              start: 'top top',
              end: 'bottom bottom',
              scrub: scrubVal,
              invalidateOnRefresh: true,
            },
          });

          // Apply GSAP optimizations
          gsap.set(timeline, gsapConfig);

          // Room animations
          if (config.roomAnimation) {
            const { position, scale, rotation } = config.roomAnimation;
            
            if (position) {
              const targetPosition = {};
              Object.entries(position).forEach(([axis, value]) => {
                targetPosition[axis] = evaluateExpression(value);
              });
              timeline.to(roomRef.current.position, targetPosition, 'same');
            }

            if (scale) {
              timeline.to(roomRef.current.scale, scale, 'same');
            }

            if (rotation) {
              timeline.to(roomRef.current.rotation, rotation, 'same');
            }
          }

          // Camera animations
          if (config.cameraAnimation) {
            const { position, rotation } = config.cameraAnimation;
            
            if (position) {
              timeline.to(camera.position, position, 'same');
            }

            if (rotation) {
              timeline.to(camera.rotation, rotation, 'same');
            }
          }

          // Rect light animations
          if (config.rectLightAnimation && rectLightRef?.current) {
            const lightAnimation = {};
            Object.entries(config.rectLightAnimation).forEach(([prop, value]) => {
              lightAnimation[prop] = evaluateExpression(value);
            });
            timeline.to(rectLightRef.current, lightAnimation, 'same');
          }
        });
      };

      // Responsive animations
      ScrollTrigger.matchMedia({
        // Desktop
        '(min-width: 969px)': () => {
          roomRef.current.scale.set(0.11, 0.11, 0.11);
          if (rectLightRef?.current) {
            rectLightRef.current.width = 0.5;
            rectLightRef.current.height = 0.7;
          }
          camera.position.set(0, 6.5, 10);
          roomRef.current.position.set(0, 0, 0);

          createSectionAnimations(sectionAnimations, 'desktop');
        },

        // Mobile
        '(max-width: 968px)': () => {
          roomRef.current.scale.set(0.07, 0.07, 0.07);
          roomRef.current.position.set(0, 0, 0);
          if (rectLightRef?.current) {
            rectLightRef.current.width = 0.3;
            rectLightRef.current.height = 0.4;
          }
          camera.position.set(0, 6.5, 10);

          createSectionAnimations(sectionAnimations, 'mobile');
        },

        // All devices
        all: () => {
          // Section borders and progress bars
          const sections = document.querySelectorAll('.section');
          sections.forEach((section) => {
            const progressWrapper = section.querySelector('.progress-wrapper');
            const progressBar = section.querySelector('.progress-bar');

            if (section.classList.contains('right')) {
              gsap.to(section, {
                borderTopLeftRadius: sectionBorderConfig.rightSections.borderTopLeftRadius,
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: scrubVal,
                  },
              });
              gsap.to(section, {
                borderBottomLeftRadius: sectionBorderConfig.rightSections.borderBottomLeftRadius,
                scrollTrigger: {
                    trigger: section,
                    start: 'bottom bottom',
                    end: 'bottom top',
                    scrub: scrubVal,
                  },
              });
            } else {
              gsap.to(section, {
                borderTopRightRadius: sectionBorderConfig.leftSections.borderTopRightRadius,
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: 0.6,
                },
              });
              gsap.to(section, {
                borderBottomRightRadius: sectionBorderConfig.leftSections.borderBottomRightRadius,
                scrollTrigger: {
                  trigger: section,
                  start: 'bottom bottom',
                  end: 'bottom top',
                  scrub: 0.6,
                },
              });
            }

            if (progressBar) {
              gsap.fromTo(
                progressBar,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  scrollTrigger: {
                      trigger: section,
                      start: 'top top',
                      end: 'bottom bottom',
                      scrub: progressScrub,
                      pin: isMobile ? false : progressWrapper,
                      pinSpacing: isMobile ? false : progressBarConfig.pinSpacing,
                    },
                }
              );
            }
          });

          // Floor circles animation
          if (floorRef.current) {
            const circles = [];
            floorRef.current.traverse((child) => {
              if (child.geometry?.type === 'CircleGeometry') {
                circles.push(child);
              }
            });

            floorCircleAnimations.forEach((config) => {
              if (circles[config.circleIndex]) {
                const timeline = gsap.timeline({
                  scrollTrigger: {
                      trigger: config.trigger,
                      start: 'top top',
                      end: 'bottom bottom',
                      scrub: scrubVal,
                    },
                });

                timeline.to(circles[config.circleIndex].scale, {
                  ...config.scale,
                  ease: 'power2.out',
                  force3D: true
                }, 'same');
                
                if (config.roomPosition) {
                  timeline.to(roomRef.current.position, config.roomPosition, 'same');
                }
              }
            });
          }

          // Mini platform animations (exact original)
          if (childrenMap && Object.keys(childrenMap).length) {
            const secondPartTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: '.third-move',
                start: 'center center',
              },
            });

            const parts = childrenMap;
            
            // Sequential reveals
            if (parts.mini_floor) {
              secondPartTimeline.to(parts.mini_floor.position, {
                x: -5.44055,
                z: 13.6135,
                duration: 0.3,
              });
            }

            const animateObject = (obj, delay = '+=0') => {
              if (obj?.scale) {
                secondPartTimeline.to(obj.scale, {
                  x: 1,
                  y: 1,
                  z: 1,
                  duration: 0.3,
                  ease: 'back.out(2.2)',
                  force3D: true
                }, delay);
              }
            };

            animateObject(parts.mailbox, '+=0');
            animateObject(parts.lamp, '+=0');
            animateObject(parts.floor_first, '-=0.2');
            animateObject(parts.floor_second, '-=0.2');
            animateObject(parts.floor_third, '-=0.2');
            animateObject(parts.dirt, '-=0.2');
            animateObject(parts.flower1, '+=0');
            animateObject(parts.flower2, '-=0.1');
          }
        },
      });
    };

    setupScrollTriggers();

    // Update on resize
    const onResize = () => {
      if (camera?.isOrthographicCamera) {
        const aspect = size.width / size.height;
        const frustum = 5;
        camera.left = (-aspect * frustum) / 2;
        camera.right = (aspect * frustum) / 2;
        camera.top = frustum / 2;
        camera.bottom = -frustum / 2;
        camera.updateProjectionMatrix();
      }
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [camera, roomRef, floorRef, size.width, size.height, controlsEnabled, childrenMap, rectLightRef]);

  return null;
};

export default Controls;