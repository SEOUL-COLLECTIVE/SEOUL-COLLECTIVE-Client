import CreateBtn from '@/components/Buttons/CreateBtn'
import PostCard from '@/components/Cards/PostCard'
import Image from 'next/image'
import React from 'react'

const communitymenu = [
  {
    name: 'My Review',
  },
  {
    name: 'Product Q&A',
  },
]

export default function CommunityPage() {
  return (
    <div className="container mb-24">
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={'/test/thumbnail_01.jpg'}
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
      <div className="flex justify-between py-5 pt-10">
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

      <div>
        <PostCard />
      </div>
    </div>
  )
}
