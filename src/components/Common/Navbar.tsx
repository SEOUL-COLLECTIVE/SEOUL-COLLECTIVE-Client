'use client'

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
import { Search } from 'lucide-react'

const navItems = [
  { name: 'SKIN', submenu: ['Skin Concerns', 'Skin Type', 'Sun Care', 'Body Care'] },
  {
    name: 'MAKEUP',
    submenu: ['Face', 'Eyes', 'Lips', 'Brushes & tools', 'View all'],
  },
  { name: 'HAIR', submenu: ['Hair care', 'Scalp Health'] },
  { name: 'NAIL', submenu: ['Inspiration', 'Product'] },
  { name: 'BRANDS' },
  { name: 'SHOPPING' },
  { name: 'COMMUNITY', submenu: ['Product Q&A', 'My Review', 'Discussion'] },
]

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
    <div className="flex justify-between">
      {/* Navbar */}
      <nav className="relative flex items-start gap-8 py-2">
        {/* 로고 (Topbar 숨겨졌을 때만 보임) */}
        {!showTopbar && (
          <Link href="/" className="">
            <Image
              src="/logo/sc-logo-black.svg"
              width={0}
              height={0}
              alt="sc-logo-top"
              className="h-auto w-[1.875rem]"
            />
          </Link>
        )}

        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex gap-10 text-p15">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger className="cursor-pointer p-0 font-semibold underline-offset-4 hover:underline hover:decoration-purple hover:decoration-[0.0938rem] data-[state=open]:underline data-[state=open]:decoration-purple data-[state=open]:decoration-[0.0938rem] [&>svg]:hidden">
                  {item.name}
                </NavigationMenuTrigger>
                {item.submenu && (
                  <NavigationMenuContent className="absolute left-auto top-full z-50 mt-1 w-[9.375rem] rounded-sm bg-white p-1 text-p13 font-normal">
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
              <Search size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-black transition-colors hover:text-purple"
          >
            <Search size={20} />
          </button>
        )}
      </div>
    </div>
  )
}
