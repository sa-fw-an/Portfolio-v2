import React, { useMemo } from 'react';
import { sectionsData } from '@/constants/sections';

const About = React.memo(() => {
  const config = useMemo(() => sectionsData.about, []);

  return (
    <React.Fragment>
      <div className={`${config.triggerClass} section-margin`}></div>
      <section className={`section ${config.layout} ${config.cssClasses}`}>
        <div className={config.progressBar.wrapperClass}>
          <div className={`progress-bar ${config.progressBar.colorClass}`}></div>
        </div>
        
        <div className="section-intro-wrapper">
          <div className="section-title">
            <span className="section-title-text">
              {config.title}
            </span>
            <span className="styleOne"></span>
            <span className="styleTwo"></span>
            <span className="styleThree"></span>
          </div>
          <div className="section-number">
            {config.number}
          </div>
        </div>

        <div className="section-detail-wrapper">
          <h3 className="section-heading">
            About Me
          </h3>
          <p className="section-text">
            {config.content.main}
          </p>

          <h3 className="section-heading">
            Tech Stack
          </h3>
          <p className="section-text">
            {config.content.techStack}
          </p>

          <h3 className="section-heading">
            I'm very flexible with time zone communications & locations
          </h3>
          <p className="section-text">
            {config.content.location}
          </p>

          <h3 className="section-heading">
            My Passion for Coding
          </h3>
          <p className="section-text">
            {config.content.passion}
            <br /><br />
            In my free time, I engage in:<br />
            ⦿ Working on personal projects to create impactful applications<br />
            ⦿ Contributing to open-source projects, giving back to the community and collaborating with fellow developers<br />
            ⦿ Competitive coding to sharpen my problem-solving abilities<br />
            ⦿ Ethical hacking to understand security challenges better<br />
            Coding is more than just a job for me - it's a way to learn, grow, and make a difference!
          </p>
        </div>
      </section>
    </React.Fragment>
  );
});

About.displayName = 'About';

export default About;
