'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import CustomLink from './custom-link'

export function MainNav() {
  return (
    <div className="flex items-center gap-4">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0 cursor-pointer">
          <Image src="globe.svg" alt="Home" width="32" height="32" priority className="min-w-8" />
        </Button>
      </CustomLink>
      <ul className="flex gap-4">
        <li>
          <CustomLink href="/marketplace" className="hover:underline">
            Marketplace
          </CustomLink>
        </li>
        <li>
          <CustomLink href="/profile" className="hover:underline">
            Profile
          </CustomLink>
        </li>
        <li>
          <CustomLink href="/forum" className="hover:underline">
            Forum
          </CustomLink>
        </li>
        <li>
          <CustomLink href="/events" className="hover:underline">
            Events
          </CustomLink>
        </li>
        <li>
          <CustomLink href="/leaderboard" className="hover:underline">
            Leaderboard
          </CustomLink>
        </li>
        <li>
          <CustomLink href="/mods" className="hover:underline">
            Mod Library
          </CustomLink>
        </li>
      </ul>
    </div>
  )
}