import { z } from "zod"

export const ProjectSchema = z.object({
    id: z.number(),
    projectName: z.string(),
    description: z.string(),
    createdAt: z.date(),
    finishedAt: z.date(),
    public: z.boolean(),
    status: z.enum(["in-progress", "finished", "canceled"]),
    publishedAt: z.date()

});

export type Project = z.infer<typeof ProjectSchema>