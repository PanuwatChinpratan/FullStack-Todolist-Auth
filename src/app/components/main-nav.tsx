'use client'

import Image from 'next/image'
import NextLink from 'next/link' // ใช้ชื่อ NextLink เพื่ออ้าง type
import { cn } from '@/lib/utils'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import React from 'react'
import { Button } from '@/components/ui/button'
import CustomLink from './custom-link'

// ใช้ชนิด href เดียวกับ next/link
type NextHref = React.ComponentProps<typeof NextLink>['href']

type ListItemProps =
  Omit<React.ComponentPropsWithoutRef<typeof NavigationMenuLink>, 'href'> & {
    title: string
    href: NextHref // ← บังคับให้เป็น required และชนิดตรงกับ Link
  }

const ListItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuLink>,
  ListItemProps
>(({ className, title, children, href, ...props }, ref) => (
  <li>
    <NextLink href={href} passHref legacyBehavior>
      <NavigationMenuLink
        ref={ref}
        className={cn(
          'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </NavigationMenuLink>
    </NextLink>
  </li>
))
ListItem.displayName = 'ListItem'

export function MainNav() {
  return (
    <div className="flex items-center gap-4">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0 cursor-pointer">
          <Image src="/globe.svg" alt="Home" width={32} height={32} priority className="min-w-8" />
        </Button>
      </CustomLink>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-2 cursor-pointer">MENU</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/stats" title="สถิติความสำเร็จ">
                  ดูจำนวนงานที่ทำเสร็จแล้วของคุณ
                </ListItem>
                <ListItem href="/blog" title="บล็อก">
                  อ่านโพสต์บทความต่างๆ
                </ListItem>
                <ListItem href="/" title="Haven’t figured it out yet, but I’ll update when I do!">
                  ไว้ทำจะมาอัพเดทครับ ตอนนี้ยังคิดไม่ออก
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/todolist" className={navigationMenuTriggerStyle()}>
              <span>TODO LIST</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
