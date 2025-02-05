import { redirect } from "next/navigation";

async function Page() {
  redirect("/login");
}

export default Page;