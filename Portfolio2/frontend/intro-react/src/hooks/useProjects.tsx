import { useState, useEffect } from 'react';
import { Project } from '../types';
import { endpoints } from '../config/urls';


const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const getProjects = async () => {
    try {
      const repsonse = await fetch(endpoints.projects);
      if(!repsonse.ok){
        throw new Error("Network response was not ok");
      }
      const data = await repsonse.json();
      setProjects(data)
    }catch(error: unknown){
      if(error instanceof Error){
        setError(error);
      }else{
        setError(new Error("An unknown error occured"))
      }
    }
  };

  const setNewProject = async(newProject: Project) => {
    try {
      const sendProject = {
        ...newProject,
        createdAt: newProject.createdAt instanceof Date ? newProject.createdAt.toISOString() : newProject.createdAt,
      };

      const response = await fetch(endpoints.add, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(sendProject),
      });

      if(response.status === 201){
        document.location.href = "/";
      }
    }catch(error: unknown){
      console.log(error)
    }
  }


  const deleteProject = async (projectId: number) => {
    try {
      const repsonse = await fetch(endpoints.delete, {
        method: "DELETE",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({ projectId })
      });

      if(!repsonse.ok) {
        throw new Error("failed to delete project");
      }

      await getProjects();
    }catch(error) {
      console.log(error)
    }
  }

  const updateProject = async ( newProject: Project) => {
    try {
      const repsonse = await fetch(endpoints.edit, {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(newProject)
      })

      if(repsonse.status === 201){
        document.location.href = "/"
      }
    
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getProjects();
  },[]);

  return { projects, error, setNewProject, deleteProject, updateProject };
};

export default useProjects;