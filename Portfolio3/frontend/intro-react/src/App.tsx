import React, { useEffect, useState } from 'react';
import HomeSection from './components/HomeSection';
import ProjectSection from './components/ProjectSection';
import NewProjectSection from './components/NewProjectSection';
import useProjects from './hooks/useProjects';
import { Project } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [initialProject, setInitialProject] = useState<Project>()
  const { setNewProject, updateProject } = useProjects();

  const showSection = (section: string) => {
    setActiveSection(section);
  };

  useEffect(() => {
    if(initialProject){
      showSection("update-project")
      console.log(initialProject)
    }
  }, [initialProject])

  return (
    <div>
      <nav>
        <button onClick={() => showSection('home')}>Home</button>
        <button onClick={() => showSection('projects')}>All Projects</button>
        <button onClick={() => showSection('newProject')}>New Project</button>
      </nav>
      {activeSection === 'home' && <HomeSection />}
      {activeSection === 'projects' && <ProjectSection setInitialProject={setInitialProject} init />}
      {activeSection === 'newProject' && <NewProjectSection onSubmit={setNewProject} mode="create" />}
      {activeSection === "update-project" && <NewProjectSection initialProject={initialProject} onSubmit={updateProject} mode="edit" /> }
    </div>
  );
};

export default App;
