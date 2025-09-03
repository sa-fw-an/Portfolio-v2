import React, { useMemo } from 'react';
import { sectionsData } from '@/constants/sections';
import { projectsData } from '@/constants/projects';

const Projects = React.memo(() => {
  const config = useMemo(() => sectionsData.projects, []);

  const memoizedProjects = useMemo(() => 
    projectsData.map((project, index) => (
      <div key={index} className="project-item">
        <div className="project-header">
          <img 
            src={project.logo} 
            alt={`${project.title} logo`}
            className="project-logo"
          />
          <h4 className="project-title">{project.title}</h4>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tags.map((tag) => (
            <div key={tag.id} className="tech-icon-wrapper" data-tooltip={tag.name}>
              <img 
                src={tag.path} 
                alt={tag.name}
                className="tech-icon"
              />
            </div>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
          Check Out →
        </a>
      </div>
    )), []);

  return (
    <React.Fragment>
      {/* Auto-generated section margin */}
      <div className={`${config.triggerClass} section-margin`}></div>
      
      {/* Auto-configured section with progress bar */}
      <section className={`section ${config.layout} ${config.cssClasses}`}>
        <div className={config.progressBar.wrapperClass}>
          <div className={`progress-bar ${config.progressBar.colorClass}`}></div>
        </div>
        
        <div className="section-intro-wrapper blue-text blue-border">
          <div className="section-title blue-text">
            <span className="section-title-text blue-text">
              {config.title}
            </span>
            <span className="styleOne blue-border"></span>
            <span className="styleTwo blue-border"></span>
            <span className="styleThree blue-background"></span>
          </div>
          <div className="section-number blue-text">
            {config.number}
          </div>
        </div>

        <div className="section-detail-wrapper">
          <h3 className="section-heading">
            My Projects
          </h3>
          <p className="section-text">
            Here's a collection of my projects that showcase my skills in web development, blockchain, mobile applications, and more. Each project demonstrates different aspects of my technical expertise and problem-solving abilities.
          </p>
          
          {memoizedProjects}
        </div>
      </section>
    </React.Fragment>
  );
});

Projects.displayName = 'Projects';

export default Projects;