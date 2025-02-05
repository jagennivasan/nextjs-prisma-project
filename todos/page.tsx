import AddTodo from "@/components/layout/AddTodo";
import FetchPost from "@/components/layout/FetchPost";
import Navbar from "@/components/layout/Navbar";

export default function Todos() {
  return (
    <>
      <Navbar />
      <AddTodo />
      <FetchPost />
    </>
  );
}
