import { z } from "zod";

export const addProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
});

export type AddProductInput = z.infer<typeof addProductSchema>;
