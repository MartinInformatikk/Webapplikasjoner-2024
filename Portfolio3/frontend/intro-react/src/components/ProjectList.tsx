import useProjects from "../hooks/useProjects";

function ProjectList() {
    const { projects } = useProjects();

    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.projectName}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;