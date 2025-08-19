import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { sectionsData } from '../../constants/sections';
import { experienceData } from '../../constants/experience';

const ExperienceCard = ({ experience }) => {
  return (
    <div className="experience-card mb-12">
      <div className="flex items-center mb-4">
        <div className="w-4 h-4 bg-[--color-blue] rounded-full mr-4"></div>
        <h3 className="text-2xl font-bold text-[--color-text]">{experience.company}</h3>
      </div>
      
      <div className="ml-8">
        <h4 className="text-lg font-semibold text-[--color-blue] mb-2">
          {experience.position}
        </h4>
        <p className="text-sm text-[--color-text] opacity-80 mb-4">
          {experience.duration}
          {experience.current && (
            <span className="ml-2 px-2 py-1 bg-[--color-green] text-white text-xs rounded">
              Current
            </span>
          )}
        </p>
        <p className="text-[--color-text] leading-relaxed">
          {experience.description}
        </p>
      </div>
    </div>
  );
};

const Experience = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: container.current, start: 'top 80%' } });
  }, { scope: container });

  return (
    <div className="section-margin h-[3000px] w-full">
      <section ref={container} id="experience" className="section w-1/2 py-[1000px] px-[4%] bg-[--color-background] overflow-hidden rounded-tr-[700px] ml-auto">
        <div className="progress-bar-wrapper-left absolute top-0 left-0">
          <div className="progress-wrapper h-0 w-3 z-[9999]">
            <div className="progress-bar h-screen w-full bg-[--color-blue] origin-top scale-y-100"></div>
          </div>
        </div>

        <div className="section-intro-wrapper relative py-[20%] px-[5%] border-b-2 border-[--color-blue] pb-[400px]">
          <div className="section-title relative text-[--color-blue]">
            <span className="section-title-text block text-4xl font-medium origin-left skew-y-[25deg] z-[1] uppercase">
              {sectionsData.experience.title}
            </span>
            <span className="styleOne absolute top-0 block w-full max-w-[278px] h-[60px] border border-[--color-blue] origin-left skew-y-[-25deg]"></span>
            <span className="styleTwo absolute top-20 block w-full max-w-[278px] h-[60px] border border-[--color-blue] origin-left skew-y-[-25deg]"></span>
            <span className="styleThree absolute top-20 block w-full max-w-[278px] h-[60px] origin-left skew-y-[25deg] bg-[--color-blue]"></span>
          </div>
          <div className="section-number absolute bottom-[15px] right-0 text-[--color-blue] text-2xl">
            {sectionsData.experience.number}
          </div>
        </div>

        <div className="section-detail-wrapper relative py-[20%] px-[5%]">
          <div className="timeline relative">
            {experienceData.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
