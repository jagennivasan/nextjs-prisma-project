import RegisterForm from "@/components/forms/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
export default async function Register(){
  const session = await getServerSession(authOptions);
  if(session) redirect("/todos")
    return(
      <RegisterForm/>
    )
}