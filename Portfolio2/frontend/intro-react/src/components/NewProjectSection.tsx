import React, { useState, useEffect } from 'react';
import useProjects from '../hooks/useProjects';
import { Project } from '../types';
import { formatDate } from '../util/dateService';

interface NewProjectSectionProps  {
  initialProject?: Project;
  onSubmit: (project: Project) => Promise<void>;
  mode: "create" | "edit";
}

export default function NewProjectSection({initialProject, onSubmit, mode}: NewProjectSectionProps){
  const { projects } = useProjects();

  const [projectData, setProjectData] = useState<Project>({
    id: -1,
    projectName: "",
    description: "",
    createdAt: new Date(),
    finishedAt: new Date(),
    public: false,
    status: "finished",
    publishedAt: new Date(),
  })

  useEffect(() => {
    if (mode == "edit" && initialProject){
      setProjectData(initialProject);
    }else if( mode === "create"){
      let lastIndexId = 0;
      if(projects.length > 0){
        lastIndexId = projects[projects.length-1].id + 1;
      }
      setProjectData(prev => ({...prev, id: lastIndexId}));
    }
  }, [mode, initialProject, projects])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;

    if(type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setProjectData(prev => ({ ...prev, [name]: checked}))
    }else{
      setProjectData(prev => ({...prev, [name]: value}))
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(projectData)
    await onSubmit(projectData);
    if(mode === "create"){
      setProjectData({
        id: -1,
        projectName: "",
        description: "",
        createdAt: new Date(),
        finishedAt: new Date(),
        public: false,
        status: "finished",
        publishedAt: new Date(),
      })
    }else{
      window.location.href = "/";
    }
  }

  if ( mode === "create" && projectData.id === -1){
    return <div>Loading data...</div>
  }

  return (
    <div id="newProjectSection">
      <h2>{mode === "create" ? "Create a new Project" : "Edit the exisiting Project"}</h2>
      <form id="newProjectForm" onSubmit={handleSubmit}>
        <label htmlFor='projectName'>Project name:</label>
        <input name='projectName' type="text" id="projectName" value={projectData.projectName} onChange={handleChange} required/>

        <label htmlFor='description'>Project Description:</label>
        <textarea name="description" id="description" rows={8} value={projectData.description} onChange={handleChange}/>

        <label htmlFor='createdAt'>Create date:</label>
        <input name="createdAt" id="createdAt" type="date"  value={formatDate(projectData.createdAt, "yyyy-MM-dd")} onChange={handleChange} required />

        <label htmlFor='finishedAt'>Finish date:</label>
        <input name="finishedAt" id="finishedAt" type="date"  value={formatDate(projectData.finishedAt, "yyyy-MM-dd")} onChange={handleChange} required />

        <label htmlFor='public'>Public?</label>
        <input name="public" id="public" type="checkbox" checked={projectData.public} onChange={handleChange}/>

        <button type="submit">{mode === "create" ? "Add Project" : "Edit Project"}</button>
      </form>
    </div>
  );
};
