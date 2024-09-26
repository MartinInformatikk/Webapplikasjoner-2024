import React, { useState } from 'react';

interface NewProject {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const NewProjectSection: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [startMonth, setStartMonth] = useState<string>('');
  const [startYear, setStartYear] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [endYear, setEndYear] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProject: NewProject = {
      name: projectName,
      description: projectDescription,
      startDate: `${startYear}-${startMonth}`,
      endDate: `${endYear}-${endMonth}`,
    };

    try {
      await fetch('http://localhost:3000/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      alert('New project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div id="newProjectSection">
      <h2>Add a New Project</h2>
      <form id="newProjectForm" onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </label>
        <label>
          Project Description:
          <input
            type="text"
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Start Month:
          <input
            type="text"
            id="startMonth"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            required
          />
        </label>
        <label>
          Start Year:
          <input
            type="text"
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            required
          />
        </label>
        <label>
          End Month:
          <input
            type="text"
            id="endMonth"
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            required
          />
        </label>
        <label>
          End Year:
          <input
            type="text"
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default NewProjectSection;
