"use server"
import { z } from "zod";

import { CreatePost, } from "./schema";
import prisma from "./prisma";
import { revalidatePath, } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createPost(values: z.infer<typeof CreatePost>) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    const userId = session.user.id;

    const validatedFields = CreatePost.safeParse(values);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Post.",
        };
    }
    const { title } = validatedFields.data;

  

    try {
        await prisma.post.create({
            data: {
                title, userId
            }
        })
        revalidatePath("/");
        return {
            success: true,
            message: "Post created successfully!",
        }

    } catch (error) {
        console.error("Database Error:", error); // Log error for debugging

        return {
            success: false,
            message: "Database Error: Failed to Create Post.",
        };
    }

}




// Fetch all posts
export async function getPosts() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    try {
        const posts = await prisma.post.findMany({
            where: { userId: session.user.id },
            orderBy: {

                createdAt: "desc",
            },
        });
        return posts;
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}



