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
import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { navItems } from '@/data/navItem'

type NavbarProps = {
  showTopbar: boolean
}

export default function Navbar({ showTopbar }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
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
                <NavigationMenuTrigger className="cursor-pointer p-0 text-p15 font-semibold underline-offset-[0.4375rem] hover:underline hover:decoration-purple hover:decoration-[0.1rem] data-[state=open]:underline data-[state=open]:decoration-purple data-[state=open]:decoration-[0.1rem] [&>svg]:hidden">
                  {item.name}
                </NavigationMenuTrigger>
                {item.submenu && (
                  <NavigationMenuContent>
                    {item.submenu.map((sub) => (
                      <NavigationMenuLink
                        asChild
                        key={sub}
                        className="block rounded-md px-4 py-2 hover:text-purple"
                      >
                        <Link href="#">{sub}</Link>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="flex items-center">
        {isSearchOpen ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 border-b border-black bg-none px-3 py-1 text-sm focus:border-black focus:outline-none"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
              value={searchKeyword}
              onChange={onChangeSearchKeyword}
            />
            <button onClick={() => setIsSearchOpen(false)} className="text-black hover:text-purple">
              <IoSearch size={22} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-black transition-colors hover:text-purple"
          >
            <IoSearch size={22} />
          </button>
        )}
      </div>
    </div>
  )
}
