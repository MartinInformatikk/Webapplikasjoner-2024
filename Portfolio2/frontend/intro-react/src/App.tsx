import React, { useState } from 'react';
import HomeSection from './components/HomeSection';
import ProjectSection from './components/ProjectSection';
import NewProjectSection from './components/NewProjectSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const showSection = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div>
      <nav>
        <button onClick={() => showSection('home')}>Home</button>
        <button onClick={() => showSection('projects')}>All Projects</button>
        <button onClick={() => showSection('newProject')}>New Project</button>
      </nav>
      {activeSection === 'home' && <HomeSection />}
      {activeSection === 'projects' && <ProjectSection />}
      {activeSection === 'newProject' && <NewProjectSection />}
    </div>
  );
};

export default App;
