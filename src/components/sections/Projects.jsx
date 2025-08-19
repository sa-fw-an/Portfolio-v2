import React from 'react';
import { sectionsData } from '../../constants/sections';
import { projectsData } from '../../constants/projects';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card bg-[var(--color-background)] border border-[var(--color-green)] rounded-lg p-6 mb-8 hover:shadow-lg transition-all duration-300">
      <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">{project.title}</h3>
      <p className="text-[var(--color-text)] mb-4">{project.description}</p>
      {project.fullDescription && (
        <p className="text-[var(--color-text)] text-sm mb-4 opacity-80">{project.fullDescription}</p>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, idx) => (
          <span key={idx} className="px-3 py-1 bg-[var(--color-green)] text-white text-xs rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[var(--color-blue)] text-white px-6 py-2 rounded hover:opacity-80 transition-opacity">
        Check Out
      </a>
    </div>
  );
};

const Projects = () => {
  const featuredProjects = projectsData.filter(p => p.featured);
  const otherProjects = projectsData.filter(p => !p.featured);

  return (
    <React.Fragment>
      <div className="section-intro-wrapper relative py-[20%] px-[5%] border-b-2 border-[var(--color-green)] pb-[400px]">
        <div className="section-title relative text-[var(--color-green)]">
          <span className="section-title-text block text-4xl font-medium origin-left skew-y-[25deg] z-[5] uppercase text-[var(--color-green)]">
            {sectionsData.projects.title}
          </span>
          <span className="styleOne absolute top-0 block w-full max-w-[278px] h-[60px] border border-[var(--color-green)] origin-left skew-y-[-25deg]"></span>
          <span className="styleTwo absolute top-20 block w-full max-w-[278px] h-[60px] border border-[var(--color-green)] origin-left skew-y-[-25deg]"></span>
          <span className="styleThree absolute top-20 block w-full max-w-[278px] h-[60px] origin-left skew-y-[25deg] bg-[var(--color-green)]"></span>
        </div>
        <div className="section-number absolute bottom-[15px] right-0 text-[var(--color-green)] text-2xl">
          {sectionsData.projects.number}
        </div>
      </div>

      <div className="section-detail-wrapper relative py-[20%] px-[5%]">
        <h3 className="section-heading text-lg font-bold leading-[1.8] mb-8 text-[var(--color-text)]">
          Featured Projects
        </h3>
        <p className="section-text leading-8 mt-[18px] text-base text-[var(--color-text)] mb-8">
          Here are some of my recent projects that showcase my skills in web development, blockchain, and mobile applications.
        </p>
        
        {featuredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}

        {otherProjects.length > 0 && (
          <>
            <h3 className="section-heading text-lg font-bold leading-[1.8] mb-8 mt-16 text-[var(--color-text)]">
              Other Projects
            </h3>
            {otherProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Projects;
