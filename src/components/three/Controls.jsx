import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThreeContext } from '@/contexts/ThreeContext';
import { sectionAnimations, floorCircleAnimations, sectionBorderConfig } from '@/constants/animations';
import { isMobileDevice, getPerformanceProfile } from '@/utils/deviceUtils';
import { ANIMATION_CONSTANTS } from '@/constants/globalConstants';
import { getAnimationQuality, prefersReducedMotion } from '@/utils/performanceUtils';

gsap.registerPlugin(ScrollTrigger);

const Controls = ({ roomRef, floorRef }) => {
  const { camera, size } = useThree();
  const { controlsEnabled, childrenMap, rectLightRef } = useThreeContext();
  const scrollCleanupRef = useRef(null);
  
  const isMobile = isMobileDevice();
  const performanceProfile = getPerformanceProfile();
  const animationQuality = getAnimationQuality();
  const reduceMotion = prefersReducedMotion();
  
  // Performance-aware animation settings
  const getScrubValue = () => {
    if (reduceMotion) return 0.1;
    if (isMobile) return ANIMATION_CONSTANTS.SCRUB.MOBILE;
    if (performanceProfile === 'medium') return ANIMATION_CONSTANTS.SCRUB.LAPTOP;
    return ANIMATION_CONSTANTS.SCRUB.DESKTOP;
  };
  
  const getProgressScrub = () => {
    if (reduceMotion) return 0.1;
    const profileScrub = ANIMATION_CONSTANTS.PROGRESS_BAR_SCRUB[performanceProfile.toUpperCase()] || 
                        ANIMATION_CONSTANTS.PROGRESS_BAR_SCRUB.DESKTOP;
    return Math.min(0.4, profileScrub);
  };
  
  const scrubVal = getScrubValue();
  const progressScrub = getProgressScrub();
  const shouldSkipComplexAnimations = animationQuality.skipComplexAnimations;

  useGSAP(() => {
    if (!controlsEnabled) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (scrollCleanupRef.current) {
        scrollCleanupRef.current();
        scrollCleanupRef.current = null;
      }
      return;
    }

    const setupScrollTriggers = () => {
      if (!roomRef.current || !floorRef.current) return;

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
      ScrollTrigger.scrollerProxy(null);
      const evaluateExpression = (expr) => {
        if (typeof expr === 'string') {
          let s = expr.replace(/size\.width/g, String(size.width)).replace(/size\.height/g, String(size.height));
          if (!/^[0-9\s.+\-*/]+$/.test(s)) return Number(s) || 0;

          const tokens = s.match(/-?\d+(?:\.\d+)?|[+\-*/]/g);
          if (!tokens) return Number(s) || 0;
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

          let result = values[0];
          for (let i = 0; i < ops.length; i++) {
            if (ops[i] === '+') result += values[i + 1];
            else result -= values[i + 1];
          }
          return result;
        }
        return expr;
      };

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

      const createSimplifiedAnimations = (device) => {
        ScrollTrigger.batch('.section', {
          onEnter: (elements) => {
            elements.forEach((element, index) => {
              gsap.fromTo(element, 
                { opacity: 0, y: 50 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'power2.out'
                }
              );
            });
          },
          once: true
        });

        if (device === 'desktop') {
          gsap.timeline({
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: scrubVal * 1.5,
              onUpdate: (self) => {
                const progress = self.progress;
                roomRef.current.position.x = progress * 1;
                roomRef.current.scale.setScalar(0.11 + progress * 0.29);
              }
            }
          });
        }
      };

      ScrollTrigger.matchMedia({
        '(min-width: 969px)': () => {
          roomRef.current.scale.set(0.11, 0.11, 0.11);
          if (rectLightRef?.current) {
            rectLightRef.current.width = 0.5;
            rectLightRef.current.height = 0.7;
          }
          camera.position.set(0, 6.5, 10);
          roomRef.current.position.set(0, 0, 0);
          if (!shouldSkipComplexAnimations) {
            createSectionAnimations(sectionAnimations, 'desktop');
          } else {
            createSimplifiedAnimations('desktop');
          }
        },

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

        all: () => {
          const sections = document.querySelectorAll('.section');
          sections.forEach((section) => {
            const progressWrapper = section.querySelector('.progress-wrapper');
            const progressBar = section.querySelector('.progress-bar');

            if (section.classList.contains('right')) {
              gsap.to(section, {
                borderTopLeftRadius: sectionBorderConfig.rightSections.borderTopLeftRadius,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: scrubVal,
                    invalidateOnRefresh: true
                  },
              });
              gsap.to(section, {
                borderBottomLeftRadius: sectionBorderConfig.rightSections.borderBottomLeftRadius,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'bottom bottom',
                    end: 'bottom top',
                    scrub: scrubVal,
                    invalidateOnRefresh: true
                  },
              });
            } else {
              gsap.to(section, {
                borderTopRightRadius: sectionBorderConfig.leftSections.borderTopRightRadius,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: scrubVal,
                  invalidateOnRefresh: true
                },
              });
              gsap.to(section, {
                borderBottomRightRadius: sectionBorderConfig.leftSections.borderBottomRightRadius,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'bottom bottom',
                  end: 'bottom top',
                  scrub: scrubVal,
                  invalidateOnRefresh: true
                },
              });
            }

            if (progressBar) {
              gsap.fromTo(
                progressBar,
                { 
                  scaleY: 0,
                  transformOrigin: 'top center'
                },
                {
                  scaleY: 1,
                  transformOrigin: 'top center',
                  ease: 'none',
                  scrollTrigger: {
                      trigger: section,
                      start: 'top top',
                      end: 'bottom bottom',
                      scrub: progressScrub,
                      pin: isMobile ? false : progressWrapper,
                      pinSpacing: false,
                      invalidateOnRefresh: true,
                      refreshPriority: 1
                    },
                }
              );
            }
          });

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
                      invalidateOnRefresh: true
                    },
                });

                timeline.to(circles[config.circleIndex].scale, {
                  ...config.scale,
                  ease: 'none'
                }, 'same');
                
                if (config.roomPosition) {
                  timeline.to(roomRef.current.position, {
                    ...config.roomPosition,
                    ease: 'none'
                  }, 'same');
                }
              }
            });
          }
          if (childrenMap && Object.keys(childrenMap).length) {
            const secondPartTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: '.third-move',
                start: 'center center',
              },
            });

            const parts = childrenMap;
            
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
                  ease: 'back.out(2)',
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
      
      if (scrollCleanupRef.current) {
        scrollCleanupRef.current();
        scrollCleanupRef.current = null;
      }
      
      if (typeof window !== 'undefined') {
        const pageElement = document.querySelector('.page');
        if (pageElement) {
          pageElement.style.overflow = 'hidden';
        }
      }
    };
  }, [camera, roomRef, floorRef, size.width, size.height, controlsEnabled, childrenMap, rectLightRef]);

  return null;
};

export default Controls;