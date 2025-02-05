import { z } from "zod"


export const PostSchema = z.object({
    id: z.string(),
    title: z.string().min(1,"todo is required"),

})

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });