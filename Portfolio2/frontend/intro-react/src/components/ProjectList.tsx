import useProjects from "../hooks/useProjects";

function ProjectList() {
    const { projects, isLoading, error } = useProjects();

    if (isLoading) {
        return <div>Loading projects...</div>;
    }

    if (error) {
        return <div>Error fetching projects: {error}</div>;
    }

    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;