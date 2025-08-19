import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { sectionsData } from '../../constants/sections';
import { personalInfo } from '../../constants/personal';

const About = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: container.current, start: 'top 80%' } });
  }, { scope: container });

  return (
    <div className="section-margin h-[3000px] w-full">
      <section ref={container} id="about" className="section w-1/2 py-[1000px] px-[4%] bg-[--color-background] overflow-hidden rounded-tr-[700px] ml-auto">
        <div className="progress-bar-wrapper-left absolute top-0 left-0">
          <div className="progress-wrapper h-0 w-3 z-[9999]">
            <div className="progress-bar h-screen w-full bg-[--color-pink] origin-top scale-y-100"></div>
          </div>
        </div>

        <div className="section-intro-wrapper relative py-[20%] px-[5%] border-b-2 border-[--color-pink] pb-[400px]">
          <div className="section-title relative text-[--color-pink]">
            <span className="section-title-text block text-4xl font-medium origin-left skew-y-[25deg] z-[1] uppercase">
              {sectionsData.about.title}
            </span>
            <span className="styleOne absolute top-0 block w-full max-w-[278px] h-[60px] border border-[--color-pink] origin-left skew-y-[-25deg]"></span>
            <span className="styleTwo absolute top-20 block w-full max-w-[278px] h-[60px] border border-[--color-pink] origin-left skew-y-[-25deg]"></span>
            <span className="styleThree absolute top-20 block w-full max-w-[278px] h-[60px] origin-left skew-y-[25deg] bg-[--color-pink]"></span>
          </div>
          <div className="section-number absolute bottom-[15px] right-0 text-[--color-pink] text-2xl">
            {sectionsData.about.number}
          </div>
        </div>

        <div className="section-detail-wrapper relative py-[20%] px-[5%]">
          <div className="section-text leading-8 mt-[18px] text-base text-[--color-text] mb-8">
            {sectionsData.about.content.main}
          </div>

          <div className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[--color-text]">
            Tech Stack
          </div>
          <div className="section-text leading-8 mt-[18px] text-base text-[--color-text] mb-8">
            {sectionsData.about.content.techStack}
          </div>

          <div className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[--color-text]">
            I'm very flexible with time zone communications & locations
          </div>
          <div className="section-text leading-8 mt-[18px] text-base text-[--color-text] mb-8">
            {sectionsData.about.content.location}
          </div>

          <div className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[--color-text]">
            My Passion for Coding
          </div>
          <div className="section-text leading-8 mt-[18px] text-base text-[--color-text]">
            {sectionsData.about.content.passion}
            <br /><br />
            In my free time, I engage in:<br />
            ⦿ Working on personal projects to create impactful applications<br />
            ⦿ Contributing to open-source projects, giving back to the community and collaborating with fellow developers<br />
            ⦿ Competitive coding to sharpen my problem-solving abilities<br />
            ⦿ Ethical hacking to understand security challenges better<br />
            Coding is more than just a job for me - it's a way to learn, grow, and make a difference!
          </div>

          <div className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[--color-text]">
            Contact me
          </div>
          <div className="section-text leading-8 mt-[18px] text-base text-[--color-text]">
            <div className="flex items-center space-x-2">
              <span>📞 {personalInfo.phone}</span>
            </div>
            <div className="mt-2">
              <span>📧 {personalInfo.email}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
