'use client'

import Image from 'next/image'

type ContentsCardProps = {
  imageUrl: string
  category: string
  title: string
  section: string
}

type SectionStyle = {
  section: string
  font: {
    category: string
    title: string
  }
  gap: {
    image_categroy: string
    category_title: string
  }
  image_ratio: string
}

const sectionType: SectionStyle[] = [
  {
    section: 'main',
    font: {
      category: 'text-p13',
      title: 'text-p28',
    },
    gap: {
      image_categroy: 'pt-6',
      category_title: 'pt-3',
    },
    image_ratio: 'aspect-[770/582]',
  },
  {
    section: 'sub',
    font: {
      category: 'text-p11',
      title: 'text-p20',
    },
    gap: {
      image_categroy: 'pt-3',
      category_title: 'pt-1',
    },
    image_ratio: 'aspect-[334/235]',
  },
  {
    section: 'testDrive',
    font: {
      category: 'text-p10',
      title: 'text-p16',
    },
    gap: {
      image_categroy: 'pt-2',
      category_title: 'pt-1',
    },
    image_ratio: 'aspect-[371/290]',
  },
  {
    section: 'shopping',
    font: {
      category: 'text-p13',
      title: 'text-p26',
    },
    gap: {
      image_categroy: 'pt-3',
      category_title: 'pt-1',
    },
    image_ratio: 'aspect-[514/508]',
  },
  {
    section: 'latest',
    font: {
      category: 'text-p10',
      title: 'text-p16',
    },
    gap: {
      image_categroy: 'pt-2',
      category_title: 'pt-3',
    },
    image_ratio: 'aspect-[334/235]',
  },
]

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
