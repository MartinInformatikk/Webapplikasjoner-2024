import { useState, useEffect } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
}

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/projects');
        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Kunne ikke hente prosjekter. Prøv igjen senere.');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, isLoading, error };
};

export default useProjects;