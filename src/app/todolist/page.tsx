import { auth } from "@/auth";
import ClientTodoPage from "../components/ClientTodoPage";

export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email ?? null;

  return <ClientTodoPage userEmail={userEmail} />;
}
