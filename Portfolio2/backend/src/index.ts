import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import fs from 'fs/promises';
import path from 'path';

const app = new Hono();

app.use(
  cors({
    origin: '*',
  })
);

const projectsFilePath = path.join(__dirname, 'projects.json');

app.get('/projects', async (c) => {
  try {
    const data = await fs.readFile(projectsFilePath, 'utf8');
    const projects = JSON.parse(data);
    return c.json(projects);
  } catch (error) {
    console.error('Error reading project data:', error);
    return c.json({ error: 'Error reading project data' }, 500);
  }
});

app.post('/projects/add', async (c) => {
  try {
    const body = await c.req.json();
    const data = await fs.readFile(projectsFilePath, 'utf8');
    const projects = JSON.parse(data);


    const project = {
      id: projects.length + 1, 
      name: body.name,
      description: body.description,
      started: body.startDate,
      finished: body.endDate,
    };

    projects.push(project);

    await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2));

    return c.json({ message: 'Project submitted successfully!' });
  } catch (error) {
    console.error('Error processing request:', error);
    return c.json({ error: 'Error processing request' }, 500);
  }
});

const port = 3000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
