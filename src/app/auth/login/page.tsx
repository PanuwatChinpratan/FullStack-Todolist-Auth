import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  SignInGitHubButton,
  SignInGoogleButton,
} from "@/app/components/auth-components";

// ⬇️ สังเกต type: searchParams เป็น Promise<...>
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams; // ✅ await ก่อนใช้
  const session = await auth();

  if (session?.user) {
    // ป้องกัน open redirect: ยอมรับเฉพาะ path ภายในเว็บ
    const to =
      typeof callbackUrl === "string" &&
      callbackUrl.startsWith("/") &&
      !callbackUrl.startsWith("//")
        ? callbackUrl
        : "/";
    redirect(to);
  }

  return (
    <div className="h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SignInGitHubButton className="w-full cursor-pointer" />
          <SignInGoogleButton className="w-full cursor-pointer" />
        </CardContent>
      </Card>
    </div>
  );
}
