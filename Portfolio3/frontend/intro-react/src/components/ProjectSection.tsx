import useProjects from '../hooks/useProjects';
import { formatDate } from '../util/dateService';
import { Project } from '../types';

export default function ProjectSection({setInitialProject}: any) {
  const { projects, deleteProject } = useProjects();


  const handleDelete = async (project: Project) => {
    try {
      await deleteProject(project.id);
      console.log(`Project ${project.projectName} was deleted successfully`);
    }catch(error){
      console.error("Error deleting project: ", error);
    }
  }
  const handleUpdate = (project: Project) => {
    setInitialProject(project)
  }
  return (
    <div id="projectSection">
      <h2 id="projectSectionHeading">All Projects</h2>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        projects.map((project) => (
          <article key={project.id} className="project">
            <h2>{project.projectName}</h2>
            <p>Description: {project.description}</p>
            <p>Started: {formatDate(project.createdAt, "dd-MM-yyyy")}</p>
            <p>Finished: {formatDate(project.finishedAt, "dd-MM-yyyy")}</p>
            <p>Public: {project.public ? "Yes" : "No"}</p>


            <button onClick={()=>handleUpdate(project)}>Edit</button>
            <button onClick={()=>handleDelete(project)}>Delete</button>
          </article>
        ))
      )}
    </div>
  );
};
