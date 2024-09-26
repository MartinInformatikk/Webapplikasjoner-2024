import React, { useEffect, useState } from 'react';
import { ofetch } from 'ofetch';

interface Project {
  id: number;
  name: string;
  description: string;
  started: string;
  finished: string;
  link: string;
}

const ProjectSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response: Project[] = await ofetch('http://localhost:3000/projects');
        setProjects(response);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    loadProjects();
  }, []);

  return (
    <div id="projectSection">
      <h2>All Projects</h2>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        projects.map((project) => (
          <article key={project.id} className="project">
            <h2>{project.name}</h2>
            <p>Beskrivelse: {project.description}</p>
            <p>Startdato: {project.started}</p>
            <p>Sluttdato: {project.finished}</p>
            <a href={project.link}>Se prosjekt</a>
          </article>
        ))
      )}
    </div>
  );
};

export default ProjectSection;
