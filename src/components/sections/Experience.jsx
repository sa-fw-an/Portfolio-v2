import React, { useMemo } from 'react';
import { sectionsData } from '@/constants/sections';
import { experienceData } from '@/constants/experience';

const Experience = React.memo(() => {
  const config = useMemo(() => sectionsData.experience, []);

  const memoizedExperience = useMemo(() => 
    experienceData.map((exp, index) => (
      <div key={index} className="experience-item">
        <div className="experience-company-header">
          <img 
            src={exp.logo} 
            alt={`${exp.company} logo`}
            className="company-logo"
          />
          <h5 className="experience-company">{exp.company}</h5>
        </div>
        <h4 className="experience-title">{exp.position}</h4>
        <p className="experience-duration">{exp.duration}</p>
        <p className="experience-description">{exp.description}</p>
        {exp.current && <span className="current-badge">Current</span>}
      </div>
    )), []);

  return (
    <React.Fragment>
      <div className={`${config.triggerClass} section-margin`}></div>
      
      {/* Auto-configured section with progress bar */}
      <section className={`section ${config.layout} ${config.cssClasses}`}>
        <div className={config.progressBar.wrapperClass}>
          <div className={`progress-bar ${config.progressBar.colorClass}`}></div>
        </div>
        
        <div className="section-intro-wrapper green-text green-border">
          <div className="section-title green-text">
            <span className="section-title-text green-text">
              {config.title}
            </span>
            <span className="styleOne green-border"></span>
            <span className="styleTwo green-border"></span>
            <span className="styleThree green-background"></span>
          </div>
          <div className="section-number green-text">
            {config.number}
          </div>
        </div>

        <div className="section-detail-wrapper">
          <h3 className="section-heading">
            Work Experience
          </h3>
          <p className="section-text">
            My professional journey includes various projects and collaborations that have shaped my expertise in modern web technologies.
          </p>

          {memoizedExperience}
        </div>
      </section>
    </React.Fragment>
  );
});

Experience.displayName = 'Experience';

export default Experience;