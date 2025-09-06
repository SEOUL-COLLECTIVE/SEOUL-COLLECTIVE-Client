import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-footerBlack py-20 text-white">
      <div className="mx-auto px-[5.375rem]">
        <div className="grid w-full grid-cols-1 justify-between md:grid-cols-[0.7fr_auto]">
          {/* Left Column - Logo, Social, Newsletter */}
          <div className="space-y-8">
            <div>
              <Link href="/" className="text-2xl font-bold">
                <Image
                  src="/logo/sc-logo-white.svg"
                  width={0}
                  height={0}
                  alt="sc-logo-top"
                  className="h-auto w-[11.25rem]"
                />
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-3">
              <a href="https://www.instagram.com/seoulcollective_official/" aria-label="Instagram">
                <FaInstagram size={27} />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF size={27} />
              </a>
              <a href="#" aria-label="Pinterest">
                <FaPinterestP size={27} />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="flex">
              {/* Input + Icon */}
              <div className="flex flex-1 items-center border border-white bg-transparent">
                <span className="px-3 text-white">
                  <AiOutlineMail size={20} />
                </span>
                <input
                  type="email"
                  className="flex-1 bg-transparent py-1 text-white placeholder-white focus:outline-none"
                />
              </div>

              {/* Button */}
              <button className="border border-l-0 border-white px-6 py-2 text-p10 transition-colors hover:bg-white hover:text-footerBlack">
                SUBSCRIBE
              </button>
            </div>
          </div>

          <div className="grid w-full justify-between text-p13 lg:grid-cols-[auto_auto_auto] lg:gap-x-20">
            <div className="w-fit text-p13">
              <nav className="flex flex-col space-y-3">
                <a href="#" className="transition-colors hover:text-gray-300">
                  SKIN
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  MAKEUP
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  HAIR
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  NAIL
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  BRANDS
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  SHOPPING
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  COMMUNITY
                </a>
              </nav>
            </div>

            {/* Right Columns - Company Links */}
            <div className="w-fit text-p13">
              <nav className="flex flex-col gap-y-3">
                <a href="#" className="transition-colors hover:text-gray-300">
                  ABOUT US
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  CAREERS
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  COMMERCE GUIDELINE
                </a>
              </nav>
            </div>

            <div className="w-fit text-p13">
              <nav className="flex flex-col gap-y-3">
                <a href="#" className="transition-colors hover:text-gray-300">
                  PRIVACY POLICY
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  TERMS OF SERVICE
                </a>
                <a href="#" className="transition-colors hover:text-gray-300">
                  ADVERTISE
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
