import { getPosts } from "@/lib/action";
import RemovePost from "./RemovePost";

export default async function FetchPost() {
  const posts = await getPosts();

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No todos available</p>
      ) : (
        posts.map((post) => (
          <div
            className="p-4 border rounded-xl shadow-sm hover:shadow-md transition duration-300 bg-white dark:bg-gray-800 dark:border-gray-700"
            key={post.id}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[220px]">
                {post.title}
              </h2>
              <RemovePost postId={post.id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
