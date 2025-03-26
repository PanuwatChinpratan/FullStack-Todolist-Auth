import { auth } from '@/auth'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SignIn, SignOut } from './auth-components'

export default async function UserButton() {
  const session = await auth()
  if (!session?.user) return <SignIn />
  return (
    <div className="flex items-center gap-2 ">
      <span className="hidden text-sm text-muted-foreground sm:inline-flex">{session.user.email}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:ring-2 hover:ring-ring hover:ring-offset-2 transition">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={session.user.image ?? `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 100000) + 1}&randomizeIds=true`} alt={session.user.name ?? ''} />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 rounded-xl shadow-xl border border-border p-4" align="end" forceMount>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-foreground">{session.user.name}</p>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
          <DropdownMenuSeparator className="my-3" />
          <DropdownMenuItem className="p-0">
            <Button variant="outline" className="w-full text-sm font-medium cursor-pointer" asChild>
              <SignOut />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
