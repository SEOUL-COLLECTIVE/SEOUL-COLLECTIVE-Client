'use client'

import type React from 'react'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
import Link from 'next/link'
import { navItems } from '@/constants/navItem'
import { useRouter } from 'next/navigation'

type NavbarProps = {
  showTopbar: boolean
}

export default function Navbar({ showTopbar }: NavbarProps) {
  const router = useRouter()

  const onClickTrigger = (href: string) => {
    router.push(href)
  }

  return (
    <div className="flex items-center justify-between">
      {/* 로고 (Topbar 숨겨졌을 때만 보임) */}
      {!showTopbar && (
        <Link href="/" className="">
          <Image
            src="/logo/sc-logo-black.svg"
            width={0}
            height={0}
            alt="sc-logo-top"
            className="w-[3rem]"
          />
        </Link>
      )}

      {/* Navbar */}
      <nav
        className={`relative flex items-center gap-8 ${showTopbar ? 'py-[0.5rem]' : 'py-[1.25rem]'}`}
      >
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex gap-10">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger
                  onClick={() => onClickTrigger(item.href)}
                  className="font-mainBold leading-tight cursor-pointer p-0 text-p13 underline-offset-[0.4375rem] hover:underline hover:decoration-purple hover:decoration-[0.125rem] data-[state=open]:underline data-[state=open]:decoration-purple data-[state=open]:decoration-[0.125rem] [&>svg]:hidden"
                >
                  {item.name}
                </NavigationMenuTrigger>
                {item.submenu && (
                  <NavigationMenuContent>
                    {item.submenu.map((sub) => (
                      <NavigationMenuLink
                        asChild
                        key={sub.name}
                        className="text-p11 block rounded-md px-4 py-1 font-mainMedium"
                      >
                        <Link href={sub.href}>{sub.name}</Link>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  )
}
