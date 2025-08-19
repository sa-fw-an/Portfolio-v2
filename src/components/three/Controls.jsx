import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Controls = ({ roomRef, floorRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    const setupScrollTriggers = () => {
      if (!roomRef.current || !floorRef.current) return;

      // Set initial camera and room positions
      if (camera && roomRef.current) {
        camera.position.set(0, 6.5, 10);
        roomRef.current.scale.set(0.11, 0.11, 0.11);
        roomRef.current.position.set(0, 0, 0);
      }

      // Set page overflow to visible for scroll triggers
      const pageElement = document.querySelector('.page');
      if (pageElement) {
        pageElement.style.overflow = 'visible';
      }

      // First section - Scale up room
      const firstMoveTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.first-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        }
      });

      firstMoveTimeline.to(roomRef.current.scale, {
        x: 0.1,
        y: 0.1,
        z: 0.1,
      });

      // Second section - Move room and scale
      const secondMoveTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        }
      });

      secondMoveTimeline
        .to(roomRef.current.scale, {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        }, 'same')
        .to(roomRef.current.position, {
          x: 1.5,
        }, 'same')
        .to(roomRef.current.position, {
          y: 0.7,
        }, 'same');

      // Third section - Move room back
      const thirdMoveTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        }
      });

      thirdMoveTimeline.to(roomRef.current.position, {
        z: -4.5,
      });

      // Floor circles animations
      if (floorRef.current) {
        const circles = floorRef.current.children;
        
        // First circle
        gsap.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          }
        }).to(circles[0]?.scale || {}, {
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
          }
        }).to(circles[1]?.scale || {}, {
          x: 3,
          y: 3,
          z: 3,
        });

        // Third circle
        gsap.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          }
        }).to(circles[2]?.scale || {}, {
          x: 3,
          y: 3,
          z: 3,
        });
      }

      // Progress bars animations
      const sections = document.querySelectorAll('.section');
      sections.forEach((section) => {
        const progressBar = section.querySelector('.progress-bar');
        const progressWrapper = section.querySelector('.progress-wrapper');

        if (progressBar) {
          gsap.fromTo(progressBar, {
            scaleY: 0,
          }, {
            scaleY: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.4,
              pin: progressWrapper,
              pinSpacing: false,
            }
          });
        }

        // Section border radius animations
        if (section.classList.contains('right')) {
          gsap.to(section, {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6,
            }
          });
          gsap.to(section, {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: 0.6,
            }
          });
        } else {
          gsap.to(section, {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6,
            }
          });
          gsap.to(section, {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: 0.6,
            }
          });
        }
      });
    };

    // Setup scroll triggers
    setupScrollTriggers();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [camera, roomRef, floorRef]);

  return null;
};

export default Controls;
