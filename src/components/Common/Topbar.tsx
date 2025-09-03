'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa'

export default function Topbar() {
  const [showTopbar, setShowTopbar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopbar(window.scrollY < 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-bgColor px-[5.375rem] py-[1.5625rem]">
      {showTopbar && (
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/logo/sc-logo-black.svg"
              width={0}
              height={0}
              alt="sc-logo-top"
              className="h-auto w-[11.6875rem]"
            />
          </Link>

          <div className="flex flex-col items-end gap-y-2">
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Pinterest">
                <FaPinterestP />
              </a>
            </div>
            <div className="flex gap-3">
              <button className="w-[5rem] bg-purple text-p11 font-semibold text-white">
                SUBSCRIBE
              </button>
              <button className="w-[5rem] bg-black text-p11 font-semibold text-white">
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
