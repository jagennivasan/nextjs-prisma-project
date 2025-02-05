"use client"
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function RemovePost({ postId }: { postId: string }) {
    const router = useRouter();

  
    const removePost = async () => {
    try {
      const response = await fetch(`/api/delete-post/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { error } = await response.json();
        alert(`Failed to delete todo:${error}`);
        return;
      }else{
        router.refresh()
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("An unexpected error occurred while deleting the data.");
    }
  };

  return (
    <button onClick={removePost} className="flex cursor-pointer hover:text-red-600">
    <MdDelete size={24} /> 
  </button>  

);
}
