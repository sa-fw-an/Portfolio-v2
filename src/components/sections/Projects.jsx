import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { sectionsData } from '../../constants/sections';
import { projectsData } from '../../constants/projects';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card bg-[--color-background] border border-[--color-pink] rounded-lg p-6 mb-8 hover:shadow-lg transition-all duration-300">
      <h3 className="text-2xl font-bold text-[--color-text] mb-4">{project.title}</h3>
      <p className="text-[--color-text] mb-4">{project.description}</p>
      {project.fullDescription && (
        <p className="text-[--color-text] text-sm mb-4 opacity-80">{project.fullDescription}</p>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, idx) => (
          <span key={idx} className="px-3 py-1 bg-[--color-pink] text-white text-xs rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[--color-blue] text-white px-6 py-2 rounded hover:opacity-80 transition-opacity">
        Check Out
      </a>
    </div>
  );
};

const Projects = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: container.current, start: 'top 80%' } });
  }, { scope: container });

  const featuredProjects = projectsData.filter(p => p.featured);
  const otherProjects = projectsData.filter(p => !p.featured);

  return (
    <div className="section-margin h-[3000px] w-full">
      <section ref={container} id="projects" className="section w-1/2 py-[1000px] px-[4%] bg-[--color-background] overflow-hidden rounded-tl-[700px] mr-auto">
        <div className="progress-bar-wrapper-right absolute top-0 right-0">
          <div className="progress-wrapper h-0 w-3 z-[9999]">
            <div className="progress-bar h-screen w-full bg-[--color-green] origin-top scale-y-100"></div>
          </div>
        </div>

        <div className="section-intro-wrapper relative py-[20%] px-[5%] border-b-2 border-[--color-green] pb-[400px]">
          <div className="section-title relative text-[--color-green]">
            <span className="section-title-text block text-4xl font-medium origin-left skew-y-[25deg] z-[1] uppercase">
              {sectionsData.projects.title}
            </span>
            <span className="styleOne absolute top-0 block w-full max-w-[278px] h-[60px] border border-[--color-green] origin-left skew-y-[-25deg]"></span>
            <span className="styleTwo absolute top-20 block w-full max-w-[278px] h-[60px] border border-[--color-green] origin-left skew-y-[-25deg]"></span>
            <span className="styleThree absolute top-20 block w-full max-w-[278px] h-[60px] origin-left skew-y-[25deg] bg-[--color-green]"></span>
          </div>
          <div className="section-number absolute bottom-[15px] right-0 text-[--color-green] text-2xl">
            {sectionsData.projects.number}
          </div>
        </div>

        <div className="section-detail-wrapper relative py-[20%] px-[5%]">
          <div className="section-heading text-lg font-bold leading-[1.8] mb-8 text-[--color-text]">
            Featured Projects
          </div>
          
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}

          {otherProjects.length > 0 && (
            <>
              <div className="section-heading text-lg font-bold leading-[1.8] mb-8 mt-16 text-[--color-text]">
                Other Projects
              </div>
              {otherProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
