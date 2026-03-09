import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export type CreateTodoDTO = z.infer<typeof createTodoSchema>;
export type UpdateTodoDTO = z.infer<typeof updateTodoSchema>;
