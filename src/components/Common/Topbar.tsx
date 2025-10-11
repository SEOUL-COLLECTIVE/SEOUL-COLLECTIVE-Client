'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa'
import Navbar from './Navbar'
import SurveyModal from '@/components/Modals/SurveyModal'

export default function Topbar() {
  const [showTopbar, setShowTopbar] = useState<boolean>(true)
  const [modalOpen, setModalOpen] = useState(false)

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
        <div className="flex items-center justify-between pt-[1.5625rem] pb-[1rem]">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/logo/sc-logo-black.svg"
              width={180}
              height={36}
              alt="sc-logo-top"
              className="h-auto w-[11.6875rem]"
            />
          </Link>

          <div className="flex flex-col items-end gap-y-4">
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
            </div>
            <div className="flex gap-3">
              <button className="w-[7rem] bg-purple text-p11 font-semibold text-white py-0.5">
                SUBSCRIBE
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="w-[7rem] bg-black text-p11 font-semibold text-white"
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      )}
      <Navbar showTopbar={showTopbar} />

      {/* survey modal */}
      <SurveyModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
