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
          <NavigationMenuList className="flex gap-10 text-p15 font-semibold">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger className="cursor-pointer p-0 underline-offset-4 hover:underline hover:decoration-purple [&>svg]:hidden">
                  {item.name}
                </NavigationMenuTrigger>
                {item.submenu && (
                  <NavigationMenuContent className="absolute left-auto top-full z-50 mt-1 w-[9.375rem] rounded-sm bg-white p-1 text-p13">
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
    </div>
  )
}
