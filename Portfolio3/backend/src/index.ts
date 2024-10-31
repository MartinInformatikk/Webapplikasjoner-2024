import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import Database from 'better-sqlite3';
import path from 'path';
import { ProjectSchema, type Project } from '../types';

const app = new Hono();
const dbPath = path.join(__dirname, 'projects.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    projectName TEXT NOT NULL,
    description TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    finishedAt TEXT NOT NULL,
    public INTEGER NOT NULL,
    status TEXT CHECK(status IN ('in-progress', 'finished', 'canceled')) NOT NULL,
    publishedAt TEXT NOT NULL
  )
`);

app.use(
  cors({
    origin: '*',
  })
);

function rowToProject(row: any): Project {
  return {
    ...row,
    public: Boolean(row.public),
    createdAt: new Date(row.createdAt),
    finishedAt: new Date(row.finishedAt),
    publishedAt: new Date(row.publishedAt)
  };
}

app.get('/projects/', (c) => {
  const stmt = db.prepare('SELECT * FROM projects');
  const rows = stmt.all();
  const projects = rows.map(rowToProject);
  return c.json<Project[]>(projects);
});

app.post('/projects/add', async (c) => {
  const addedProject = await c.req.json();

  if (typeof addedProject.createdAt === "string") {
    addedProject.createdAt = new Date(addedProject.createdAt);
  }
  if (typeof addedProject.publishedAt === "string") {
    addedProject.publishedAt = new Date(addedProject.publishedAt);
  }
  if (typeof addedProject.finishedAt === "string") {
    addedProject.finishedAt = new Date(addedProject.finishedAt);
  }

  const project = ProjectSchema.parse(addedProject);
  
  const stmt = db.prepare(`
    INSERT INTO projects (
      id, projectName, description, createdAt, finishedAt, 
      public, status, publishedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  try {
    stmt.run(
      project.id,
      project.projectName,
      project.description,
      project.createdAt.toISOString(),
      project.finishedAt.toISOString(),
      Number(project.public),
      project.status,
      project.publishedAt.toISOString()
    );

    const allProjects = db.prepare('SELECT * FROM projects').all().map(rowToProject);
    return c.json<Project[]>(allProjects, { status: 201 });
  } catch (error) {
    return c.json({ error: "Failed to add project" }, { status: 500 });
  }
});

app.put("/projects/edit", async (c) => {
  try {
    const data = await c.req.json();

    if (typeof data.createdAt === "string") {
      data.createdAt = new Date(data.createdAt);
    }
    if (typeof data.publishedAt === "string") {
      data.publishedAt = new Date(data.publishedAt);
    }
    if (typeof data.finishedAt === "string") {
      data.finishedAt = new Date(data.finishedAt);
    }

    const updatedProject = ProjectSchema.parse(data);

    const stmt = db.prepare(`
      UPDATE projects 
      SET projectName = ?, description = ?, createdAt = ?, 
          finishedAt = ?, public = ?, status = ?, publishedAt = ?
      WHERE id = ?
    `);

    const result = stmt.run(
      updatedProject.projectName,
      updatedProject.description,
      updatedProject.createdAt.toISOString(),
      updatedProject.finishedAt.toISOString(),
      Number(updatedProject.public),
      updatedProject.status,
      updatedProject.publishedAt.toISOString(),
      updatedProject.id
    );

    if (result.changes === 0) {
      return c.json({ error: "Could not find project" }, { status: 404 });
    }

    return c.json({ message: "Successfully updated project" }, { status: 201 });
  } catch (error) {
    return c.json({ error: "Error updating project" }, { status: 500 });
  }
});

app.delete("/projects/delete", async (c) => {
  try {
    const data = await c.req.json();
    const { projectId } = data;

    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const result = stmt.run(projectId);

    if (result.changes === 0) {
      return c.json({ error: "Could not find project" }, { status: 404 });
    }

    return c.json({ message: "Project deleted successfully" }, { status: 201 });
  } catch (error) {
    return c.json({ error: "Failed to delete project" }, { status: 500 });
  }
});

process.on('SIGINT', () => {
  db.close();
  process.exit();
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});