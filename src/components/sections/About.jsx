import React from 'react';
import { sectionsData } from '../../constants/sections';
import { personalInfo } from '../../constants/personal';

const About = () => {
  return (
    <React.Fragment>
      <div className="section-intro-wrapper relative py-[20%] px-[5%] border-b-2 border-[var(--color-pink)] pb-[400px]">
        <div className="section-title relative text-[var(--color-pink)]">
          <span className="section-title-text block text-4xl font-medium origin-left skew-y-[25deg] z-[5] uppercase text-[var(--color-pink)]">
            {sectionsData.about.title}
          </span>
          <span className="styleOne absolute top-0 block w-full max-w-[278px] h-[60px] border border-[var(--color-pink)] origin-left skew-y-[-25deg]"></span>
          <span className="styleTwo absolute top-20 block w-full max-w-[278px] h-[60px] border border-[var(--color-pink)] origin-left skew-y-[-25deg]"></span>
          <span className="styleThree absolute top-20 block w-full max-w-[278px] h-[60px] origin-left skew-y-[25deg] bg-[var(--color-pink)]"></span>
        </div>
        <div className="section-number absolute bottom-[15px] right-0 text-[var(--color-pink)] text-2xl">
          {sectionsData.about.number}
        </div>
      </div>

      <div className="section-detail-wrapper relative py-[20%] px-[5%]">
        <h3 className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[var(--color-text)]">
          About Me
        </h3>
        <div className="section-text leading-8 mt-[18px] text-base text-[var(--color-text)] mb-8">
          {sectionsData.about.content.main}
        </div>

        <h3 className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[var(--color-text)]">
          Tech Stack
        </h3>
        <div className="section-text leading-8 mt-[18px] text-base text-[var(--color-text)] mb-8">
          {sectionsData.about.content.techStack}
        </div>

        <h3 className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[var(--color-text)]">
          I'm very flexible with time zone communications & locations
        </h3>
        <div className="section-text leading-8 mt-[18px] text-base text-[var(--color-text)] mb-8">
          {sectionsData.about.content.location}
        </div>

        <h3 className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[var(--color-text)]">
          My Passion for Coding
        </h3>
        <div className="section-text leading-8 mt-[18px] text-base text-[var(--color-text)]">
          {sectionsData.about.content.passion}
          <br /><br />
          In my free time, I engage in:<br />
          ⦿ Working on personal projects to create impactful applications<br />
          ⦿ Contributing to open-source projects, giving back to the community and collaborating with fellow developers<br />
          ⦿ Competitive coding to sharpen my problem-solving abilities<br />
          ⦿ Ethical hacking to understand security challenges better<br />
          Coding is more than just a job for me - it's a way to learn, grow, and make a difference!
        </div>

        <h3 className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[var(--color-text)]">
          Contact me
        </h3>
        <div className="section-text leading-8 mt-[18px] text-base text-[var(--color-text)]">
          <div className="flex items-center space-x-2">
            <span>📞 {personalInfo.phone}</span>
          </div>
          <div className="mt-2">
            <span>📧 {personalInfo.email}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
