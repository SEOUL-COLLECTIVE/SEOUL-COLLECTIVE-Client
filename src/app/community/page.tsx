import CreateBtn from '@/components/Buttons/CreateBtn'
import PostCard from '@/components/Cards/PostCard'
import SortDropdown from '@/components/DropDown/SortDropDown'
import SearchBar from '@/components/Inputs/SearchBar'
import Image from 'next/image'
import React from 'react'

const communitymenu = [
  {
    name: 'My Review',
    slug: 'my-review',
  },
  {
    name: 'Product Q&A',
    slug: 'product-q&a',
  },
]

const communitycategory = [
  {
    category: 'SKINCARE',
  },
  {
    category: 'MAKEUP',
  },
  {
    category: 'HAIR',
  },
]

export default function CommunityPage() {
  return (
    <div className="container mb-24">
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={'/test/community.jpg'}
          alt="community thumbnail"
          fill
          className="object-cover"
          priority
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span className="uppercase">community</span>
          </div>

          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32">
              <div className="font-bold uppercase">community</div>
            </div>
          </div>
        </div>
      </div>

      {/* 상단 네비게이션 - 버튼 flex line */}
      <div className="flex justify-between pt-10">
        {/* 서브카테고리 네비게이션 */}
        <div>
          {communitymenu && (
            <div className="flex gap-8 text-p14">
              {communitymenu.map((subItem) => (
                <div
                  key={subItem.name}
                  className="font-semibold cursor-pointer hover:underline hover:decoration-purple hover:decoration-[0.125rem] underline-offset-[0.4375rem]"
                >
                  {subItem.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* post create btn */}
        <CreateBtn />
      </div>

      <div className="flex justify-end pb-5">
        <SearchBar />
      </div>

      <div className="grid grid-cols-[200px_1fr]">
        {/* post category */}
        <div className="flex flex-col gap-y-2 text-[0.9rem] mt-16">
          {communitycategory?.map((item) => (
            <div key={item.category} className="p-2 cursor-pointer">
              {item.category}
            </div>
          ))}
        </div>

        {/* post card scroll area */}
        <div className="">
          <div className="flex justify-between">
            <div className="text-[1.25rem] font-bold mb-4 px-2">ALL POST</div>
            <SortDropdown />
          </div>
          <PostCard />
        </div>
      </div>
    </div>
  )
}
