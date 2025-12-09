'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa'
import Navbar from './Navbar'
import { IoSearch } from 'react-icons/io5'

export default function Topbar() {
  const [showTopbar, setShowTopbar] = useState<boolean>(true)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowTopbar(window.scrollY < 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-bgColor px-[5.375rem]">
      {showTopbar && (
        <div className="grid grid-cols-3 items-center pt-[1.5625rem] pb-[1rem]">
          <div />
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logo/sc-logo-black.svg"
                width={100}
                height={20}
                alt="sc-logo-top"
                className="h-auto w-[9rem]"
              />
            </Link>
          </div>

          <div className="flex flex-col items-end gap-y-4 justify-self-end">
            <div className="flex gap-3">
              <a href="https://www.instagram.com/seoulcollective_official/" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href="#" aria-label="Pinterest">
                <FaPinterestP size={20} />
              </a>
              <Link href="/member/signin">
                <button className="text-p11 font-semibold text-black">SIGN IN</button>
              </Link>
            </div>
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
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-black hover:text-purple"
                  >
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
        </div>
      )}
      <Navbar showTopbar={showTopbar} />
    </div>
  )
}
