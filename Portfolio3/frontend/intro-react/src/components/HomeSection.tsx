import React from 'react';
import ProjectList from './ProjectList';

const HomeSection: React.FC = () => {
  return (
    <div id="homeSection">
      <h1>Welcome to the Project Manager</h1>
      <p>This is the home section.</p>
      <div>
          <ProjectList />
      </div>
    </div>
    
    
  );
};





export default HomeSection;
