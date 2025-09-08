'use client'

import Image from 'next/image'
import { sectionType } from '@/data/sectionStyle'

type ContentsCardProps = {
  imageUrl: string
  category: string
  title: string
  section: string
}

export default function ContentsCard({ imageUrl, category, title, section }: ContentsCardProps) {
  const style = sectionType.find((s) => s.section === section)
  if (!style) return null

  return (
    <div className="flex h-full w-full cursor-pointer flex-col font-semibold">
      {/* 이미지 영역 */}
      <div className={`relative w-full ${style.image_ratio}`}>
        <Image src={imageUrl} alt="thumbnail" fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className={`flex flex-col gap-1 ${style.gap.image_categroy}`}>
        <span className={`${style.font.category} `}>{category}</span>
        <div
          className={`${style.font.title} ${style.gap.category_title} line-clamp-2 whitespace-pre-line break-words`}
        >
          {title}
        </div>
      </div>
    </div>
  )
}
