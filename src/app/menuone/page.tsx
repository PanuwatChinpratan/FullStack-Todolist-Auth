import { auth } from "@/auth";
import ClientPostsPage from "../components/ClientPostsPage";


const ALLOWED = (process.env.ALLOWED_POSTER_EMAIL ?? "panuwatchinpratan@gmail.com").toLowerCase();

export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email ?? null;
  const canPost = !!userEmail && userEmail.toLowerCase() === ALLOWED;

  return <ClientPostsPage userEmail={userEmail} canPost={canPost} />;
}