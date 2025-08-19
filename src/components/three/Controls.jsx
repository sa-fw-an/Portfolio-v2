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

      // MatchMedia to split Desktop/Mobile
      ScrollTrigger.matchMedia({
        '(min-width: 969px)': () => {
          // Desktop initial
          roomRef.current.scale.set(0.11, 0.11, 0.11);
          camera.position.set(0, 6.5, 10);

          // 1) First section
      gsap.timeline({
            scrollTrigger: {
        trigger: '.first-move',
        start: 'top 70%',
        end: 'top 15%',
              scrub: 0.6,
            }
          })
      .to(roomRef.current.position, { x: 0.4, y: 0.1, z: 0 })
      .to(camera.position, { y: 6.2, x: 0.2 }, '<');

          // 2) Second section
          gsap.timeline({
            scrollTrigger: {
        trigger: '.second-move',
        start: 'top 85%',
        end: 'top 25%',
              scrub: 0.6,
            }
          })
      .to(roomRef.current.scale, { x: 0.13, y: 0.13, z: 0.13 }, 'same')
      .to(roomRef.current.position, { x: 1.0, y: 0.2 }, 'same')
      .to(camera.position, { x: -0.6, y: 5.9 }, 'same');

          // 3) Third section
          gsap.timeline({
            scrollTrigger: {
        trigger: '.third-move',
        start: 'top 95%',
        end: 'top 35%',
              scrub: 0.6,
            }
          })
      .to(roomRef.current.position, { z: -3.0 })
      .to(camera.position, { x: -2.0, y: 3.0 }, '<');
        },

        '(max-width: 968px)': () => {
          // Mobile initial
          roomRef.current.scale.set(0.07, 0.07, 0.07);
          camera.position.set(0, 6.5, 10);

          // 1) First section
      gsap.timeline({
            scrollTrigger: {
        trigger: '.first-move',
        start: 'top 75%',
        end: 'top 25%',
              scrub: 0.6,
            }
          }).to(roomRef.current.scale, { x: 0.1, y: 0.1, z: 0.1 });

          // 2) Second section
      gsap.timeline({
            scrollTrigger: {
        trigger: '.second-move',
        start: 'top 85%',
        end: 'top 35%',
              scrub: 0.6,
            }
          })
          .to(roomRef.current.position, { x: 0.8, y: 0.4 }, 'same')
          .to(roomRef.current.scale, { x: 0.12, y: 0.12, z: 0.12 }, 'same');

          // 3) Third section
      gsap.timeline({
            scrollTrigger: {
        trigger: '.third-move',
        start: 'top 95%',
        end: 'top 45%',
              scrub: 0.6,
            }
          }).to(roomRef.current.position, { z: -4.5 });
        },

        'all': () => {
          // Floor circles
          if (floorRef.current) {
            const circles = floorRef.current.children?.filter?.(c => c.geometry?.type === 'CircleGeometry') || [];
            const [first, second, third] = circles;
            if (first) gsap.timeline({ scrollTrigger: { trigger: '.first-move', start: 'top top', end: 'bottom bottom', scrub: 0.6 } }).to(first.scale, { x: 3, y: 3, z: 3 });
            if (second) gsap.timeline({ scrollTrigger: { trigger: '.second-move', start: 'top top', end: 'bottom bottom', scrub: 0.6 } }).to(second.scale, { x: 3, y: 3, z: 3 });
            if (third) gsap.timeline({ scrollTrigger: { trigger: '.third-move', start: 'top top', end: 'bottom bottom', scrub: 0.6 } }).to(third.scale, { x: 3, y: 3, z: 3 });
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
