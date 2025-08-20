import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useThreeContext } from '../../contexts/ThreeContext';

gsap.registerPlugin(ScrollTrigger);

const Controls = ({ roomRef, floorRef }) => {
  const { camera, size } = useThree();
  const { controlsEnabled, childrenMap } = useThreeContext();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!controlsEnabled) {
      // If controls aren't enabled yet, ensure no active triggers/lenis remain
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const setupScrollTriggers = () => {
      if (!roomRef.current || !floorRef.current) return;

      // Initialize camera frustum if orthographic
      const setOrthoFrustum = () => {
        if (camera.isOrthographicCamera) {
          const aspect = size.width / size.height;
          const frustum = 5;
          camera.left = (-aspect * frustum) / 2;
          camera.right = (aspect * frustum) / 2;
          camera.top = frustum / 2;
          camera.bottom = -frustum / 2;
          camera.updateProjectionMatrix();
        }
      };
      setOrthoFrustum();

      // Set initial camera and room positions
      if (camera && roomRef.current) {
        camera.position.set(0, 6.5, 10);
        if (camera.isOrthographicCamera) camera.rotation.x = -Math.PI / 6;
        if (camera.isOrthographicCamera) {
          camera.zoom = 1;
          camera.updateProjectionMatrix();
        }
        roomRef.current.scale.set(0.11, 0.11, 0.11);
        roomRef.current.position.set(0, 0, 0);
      }

      // Set page overflow to visible for scroll triggers
      const pageElement = document.querySelector('.page');
      if (pageElement) {
        pageElement.style.overflow = 'visible';
      }

      // Smooth scroll via Lenis and proxy to ScrollTrigger
      if (!lenisRef.current) {
        const lenis = new Lenis({
          smoothWheel: true,
          lerp: 0.1,
        });
        lenisRef.current = lenis;
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        const scroller = document.documentElement;
        ScrollTrigger.scrollerProxy(scroller, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.scrollTo(value, { immediate: true });
            }
            // Lenis v1 stores scroll in lenis.scroll; fallback to window scrollY
            return lenis.scroll || window.scrollY || 0;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
        });
        lenis.on('scroll', ScrollTrigger.update);
        ScrollTrigger.defaults({ scroller });
      }

          // Helper: create a zoom tween step within timelines (reversible)
          const zoomStep = (tl, value, label = '<', duration = 0.6) => {
            if (!camera.isOrthographicCamera) return tl;
            return tl.to(
              camera,
              {
                zoom: value,
                duration,
                overwrite: 'auto',
                onUpdate: () => camera.updateProjectionMatrix(),
              },
              label
            );
          };

      // MatchMedia to split Desktop/Mobile
      ScrollTrigger.matchMedia({
        '(min-width: 969px)': () => {
          // Desktop initial
          roomRef.current.scale.set(0.11, 0.11, 0.11);
          camera.position.set(0, 6.5, 10);

          // 1) First section (content left => move room to right)
          let tl1 = gsap.timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top 70%',
              end: 'top 15%',
              scrub: 0.6,
            }
          })
            .to(roomRef.current.position, { x: 1.8, y: 0, z: 0 })
            .to(camera.position, { y: 6.2, x: 0.25 }, '<');
          zoomStep(tl1, 1.3, '<', 0.6);

          // 2) Second section (content right => move room to left)
          let tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top 85%',
              end: 'top 25%',
              scrub: 0.6,
            }
          })
            .to(roomRef.current.scale, { x: 0.13, y: 0.13, z: 0.13 }, 'same')
            .to(roomRef.current.position, { x: -0.9, y: 0.2 }, 'same')
            .to(camera.position, { x: 0.2, y: 5.9 }, 'same');
          zoomStep(tl2, 1.25, 'same', 0.8);

          // 3) Third section (content left => move room to right and push in, but keep framed)
          let tl3 = gsap.timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top 95%',
              end: 'top 35%',
              scrub: 0.6,
            }
          })
            .to(roomRef.current.position, { x: 0.5, z: -2.2 })
            .to(camera.position, { x: 0.1, y: 5.6 }, '<')
            .to(camera.rotation, { x: -Math.PI / 6.1 }, '<');
          zoomStep(tl3, 1.28, '<', 0.8);

          // 4) Fourth section (content right => move room to left again)
          let tl4 = gsap.timeline({
            scrollTrigger: {
              trigger: '.fourth-move',
              start: 'top 95%',
              end: 'top 35%',
              scrub: 0.6,
            }
          })
            .to(roomRef.current.position, { x: -0.8, z: -3.2 })
            .to(camera.position, { x: 0.2, y: 5.4 }, '<');
          zoomStep(tl4, 1.32, '<', 0.8);
        },

        '(max-width: 968px)': () => {
          // Mobile initial
          roomRef.current.scale.set(0.07, 0.07, 0.07);
          camera.position.set(0, 6.5, 10);

          // 1) First section (content left => move room to right)
          let mtl1 = gsap.timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top 75%',
              end: 'top 25%',
              scrub: 0.6,
            }
          })
            .to(roomRef.current.scale, { x: 1.7, y: 0.1, z: 0.1 })
            .to(roomRef.current.position, { x: 0.4 }, '<');
          zoomStep(mtl1, 2, '<', 0.6);

          // 2) Second section (content right => move room to left)
          let mtl2 = gsap.timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top 85%',
              end: 'top 35%',
              scrub: 0.6,
            }
          })
            .to(roomRef.current.position, { x: -0.6, y: 0.3 }, 'same')
            .to(roomRef.current.scale, { x: 0.12, y: 0.12, z: 0.12 }, 'same');
          zoomStep(mtl2, 1.22, 'same', 0.6);

          // 3) Third section (content left => move room to right and push in)
          let mtl3 = gsap.timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top 95%',
              end: 'top 45%',
              scrub: 0.6,
            }
          })
            .to(roomRef.current.position, { x: 0.4, z: -3.8 });
          zoomStep(mtl3, 1.25, '<', 0.6);

          // 4) Fourth section (content right => move room to left again)
          let mtl4 = gsap.timeline({
            scrollTrigger: {
              trigger: '.fourth-move',
              start: 'top 95%',
              end: 'top 45%',
              scrub: 0.6,
            }
          })
            .to(roomRef.current.position, { x: -0.5, z: -4.2 });
          zoomStep(mtl4, 1.28, '<', 0.6);
        },

        'all': () => {
          // Reset zoom to original when scrolling back to hero (reversible and strong)
          if (camera.isOrthographicCamera) {
            const resetTl = gsap.timeline({
              scrollTrigger: {
                trigger: '.hero',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 0.3,
                onUpdate: (self) => {
                  // Ensure camera resets properly when scrolling back up
                  if (self.direction === -1) {
                    camera.zoom = 1;
                    camera.updateProjectionMatrix();
                  }
                }
              }
            });
            resetTl.to(camera, {
              zoom: 1,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
              onUpdate: () => camera.updateProjectionMatrix(),
            });
            
            // Additional reset for room position when back in hero
            const roomResetTl = gsap.timeline({
              scrollTrigger: {
                trigger: '.hero',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 0.3,
              }
            });
            roomResetTl.to(roomRef.current.position, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
          }
          // Floor circles with proper indexing
          if (floorRef.current) {
            const circles = [];
            floorRef.current.traverse((child) => {
              if (child.geometry?.type === 'CircleGeometry') {
                circles.push(child);
              }
            });
            
            if (circles.length >= 3) {
              const [first, second, third] = circles;
              if (first) gsap.timeline({ scrollTrigger: { trigger: '.first-move', start: 'top top', end: 'bottom bottom', scrub: 0.6 } }).to(first.scale, { x: 3, y: 3, z: 3 });
              if (second) gsap.timeline({ scrollTrigger: { trigger: '.second-move', start: 'top top', end: 'bottom bottom', scrub: 0.6 } }).to(second.scale, { x: 3, y: 3, z: 3 });
              if (third) gsap.timeline({ scrollTrigger: { trigger: '.third-move', start: 'top top', end: 'bottom bottom', scrub: 0.6 } }).to(third.scale, { x: 3, y: 3, z: 3 });
            }
          }

          // Sections progress bars & radii
          const sections = document.querySelectorAll('.section');
          sections.forEach((section) => {
            const progressBar = section.querySelector('.progress-bar');
            const progressWrapper = section.querySelector('.progress-wrapper');
            if (progressBar) {
              gsap.fromTo(progressBar, { scaleY: 0 }, { scaleY: 1, scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.4, pin: progressWrapper, pinSpacing: false } });
            }
            if (section.classList.contains('right')) {
              gsap.to(section, { borderTopLeftRadius: 10, scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: 0.6 } });
              gsap.to(section, { borderBottomLeftRadius: 700, scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: 0.6 } });
            } else {
              gsap.to(section, { borderTopRightRadius: 10, scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: 0.6 } });
              gsap.to(section, { borderBottomRightRadius: 700, scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: 0.6 } });
            }
          });

            // Mini-platform / pathway pieces reveal on second section center
            if (childrenMap && Object.keys(childrenMap).length) {
              const tl = gsap.timeline({
                scrollTrigger: { trigger: '.second-move', start: 'center center' }
              });
              const parts = childrenMap;
              const show = (obj, shift='>-0.15') => obj && tl.to(obj.scale, { x: 1, y: 1, z: 1, duration: 0.35 }, shift);
              show(parts.mailbox, '+=0');
              show(parts.lamp);
              show(parts.floor_first);
              show(parts.floor_second);
              show(parts.floor_third);
              show(parts.dirt);
              show(parts.flower1);
              show(parts.flower2);
            }
        }
      });

    };

    // Setup scroll triggers
    setupScrollTriggers();

    // Update ortho frustum on resize
    const onResize = () => {
      if (camera.isOrthographicCamera) {
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
  }, [camera, roomRef, floorRef, size.width, size.height, controlsEnabled, childrenMap]);

  return null;
};

export default Controls;
