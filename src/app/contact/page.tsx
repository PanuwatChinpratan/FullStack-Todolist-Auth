'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-900  py-12 px-4 sm:px-8 md:px-24">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Contact Me</h1>
      <p className="text-center text-gray-900 dark:text-gray-100 my-4">หน้านี้ยังไม่ได้ทำไว้ให้ใช้จริงนะครับ</p>
      <Card className="max-w-3xl mx-auto shadow-md rounded-2xl">
        <CardContent className="p-8">
          <form className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Your Name</label>
              <Input placeholder="Enter your name" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Your Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Message</label>
              <Textarea rows={5} placeholder="Say hello 👋 or let’s collaborate!" />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Or reach me on:
            <div className="flex justify-center gap-6 mt-2">
              <a href="https://github.com/PanuwatChinpratan" target="_blank" className="hover:text-black transition underline text-gray-900 dark:text-gray-100">
                GitHub
              </a>
              <a href="https://facebook.com/madeverypersecond" target="_blank" className="hover:text-blue-600 transition underline text-gray-900 dark:text-gray-100">
                Facebook
              </a>
              <a href="mailto:panuwatchinpratan@gmail.com" className="hover:text-rose-600 transition underline text-gray-900 dark:text-gray-100">
                Email
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Page
