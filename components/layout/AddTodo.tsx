"use client";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/lib/action";
import { CreatePost } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";

export default function AddTodo() {

  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreatePost>) => {
    try {
      const response = await createPost(values);
      if (response) {
        form.reset();
        
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[20vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter a new task..."
                      {...field}
                      className="px-4 py-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Add Task
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
