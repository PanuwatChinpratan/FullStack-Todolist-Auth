'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  return (
    <main className="min-h-screen bg-white py-10 px-6 md:px-16 lg:px-32">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About Me</h1>

      <Card className="max-w-4xl mx-auto shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32 ring-4 ring-green-400 shadow">
              <AvatarImage src="/your-profile.jpg" alt="Profile" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">Panuwat Chinpratan</h2>
              <p className="text-gray-600 mb-2">@madeverypersecond</p>
              <Badge variant="outline">Full Stack Developer</Badge>
              <p className="mt-4 text-gray-700 leading-relaxed max-w-md">
                Hey, I’m Milo 👋 I love creating web apps with modern stacks like Next.js, TypeScript, and Tailwind. 
                Currently exploring cool tools like Shadcn, Prisma, and tRPC. Check out my GitHub or say hi on Facebook!
              </p>
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <a href="https://portfolio-milo-final.vercel.app" target="_blank" className="text-blue-500 underline text-sm">
                  🌐 Portfolio
                </a>
                <a href="https://github.com/PanuwatChinpratan" target="_blank" className="text-blue-500 underline text-sm">
                  💻 GitHub
                </a>
                <a href="https://facebook.com/madeverypersecond" target="_blank" className="text-blue-500 underline text-sm">
                  📘 Facebook
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
