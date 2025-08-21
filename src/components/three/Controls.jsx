import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useThreeContext } from '../../contexts/ThreeContext';

gsap.registerPlugin(ScrollTrigger);

const Controls = ({ roomRef, floorRef }) => {
  const { camera, size } = useThree();
  const { controlsEnabled, childrenMap, rectLightRef } = useThreeContext();
  const lenisRef = useRef(null);

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

      // Smooth scroll with Lenis (exact original)
      if (!lenisRef.current) {
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
      }

      // Responsive animations (exact original)
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

          // First section
          gsap.timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }).fromTo(
            roomRef.current.position,
            { x: 0, y: 0, z: 0 },
            {
              x: () => size.width * 0.0014,
            }
          );

          // Second section
          gsap.timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(
            roomRef.current.position,
            {
              x: () => 1,
              z: () => size.height * 0.0032,
            },
            'same'
          )
          .to(
            roomRef.current.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            'same'
          )
          .to(
            rectLightRef?.current || {},
            {
              width: 0.5 * 4,
              height: 0.7 * 4,
            },
            'same'
          );

          // Third section
          gsap.timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }).to(camera.position, {
            y: 1.5,
            x: -4.1,
          });
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

          // First section
          gsap.timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          }).to(roomRef.current.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
          });

          // Second section
          gsap.timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(
            roomRef.current.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            'same'
          )
          .to(
            rectLightRef?.current || {},
            {
              width: 0.3 * 3.4,
              height: 0.4 * 3.4,
            },
            'same'
          )
          .to(
            roomRef.current.position,
            {
              x: 1.5,
            },
            'same'
          );

          // Third section
          gsap.timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }).to(roomRef.current.position, {
            z: -4.5,
          });
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
                borderTopLeftRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: 0.6,
                },
              });
              gsap.to(section, {
                borderBottomLeftRadius: 700,
                scrollTrigger: {
                  trigger: section,
                  start: 'bottom bottom',
                  end: 'bottom top',
                  scrub: 0.6,
                },
              });
            } else {
              gsap.to(section, {
                borderTopRightRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: 0.6,
                },
              });
              gsap.to(section, {
                borderBottomRightRadius: 700,
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
                    scrub: 0.4,
                    pin: progressWrapper,
                    pinSpacing: false,
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

            if (circles.length >= 3) {
              const [first, second, third] = circles;
              
              // First circle
              gsap.timeline({
                scrollTrigger: {
                  trigger: '.first-move',
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.6,
                },
              }).to(first.scale, {
                x: 3,
                y: 3,
                z: 3,
              });

              // Second circle
              gsap.timeline({
                scrollTrigger: {
                  trigger: '.second-move',
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.6,
                },
              })
              .to(second.scale, {
                x: 3,
                y: 3,
                z: 3,
              }, 'same')
              .to(roomRef.current.position, {
                y: 0.7,
              }, 'same');

              // Third circle
              gsap.timeline({
                scrollTrigger: {
                  trigger: '.third-move',
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.6,
                },
              }).to(third.scale, {
                x: 3,
                y: 3,
                z: 3,
              });
            }
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
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [camera, roomRef, floorRef, size.width, size.height, controlsEnabled, childrenMap, rectLightRef]);

  return null;
};

export default Controls;
