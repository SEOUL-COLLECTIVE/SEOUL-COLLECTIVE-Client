'use client'

import Image from 'next/image'
import { SectionStyle } from '@/types/card'
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

type ContentsCardProps = {
  section: string
  title: string
  category?: string
  categorySlug?: string
  subcategory?: string
  subcategorySlug?: string
  imageUrl: string
  id: string
}

const sectionType: SectionStyle[] = [
  {
    section: 'main',
    font: {
      category: 'text-p13',
      title: 'text-p28',
    },
    gap: {
      image_category: 'pt-3',
      category_title: 'pt-1',
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
      image_category: 'pt-3',
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
      image_category: 'pt-2',
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
      image_category: 'pt-3',
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
      image_category: 'pt-4',
      category_title: 'pt-1',
    },
    image_ratio: 'aspect-[340/255]',
  },
]

export default function ContentsCard({
  section,
  title,
  category,
  categorySlug,
  subcategory,
  subcategorySlug,
  imageUrl,
  id,
}: ContentsCardProps) {
  // // routes.ts의 getArticleHref를 통해 라우트 생성
  // const href = getArticleHref({ categorySlug, subcategorySlug, id })

  // 🔥 안전한 href 생성
  const href =
    categorySlug && subcategorySlug ? ROUTES.article(categorySlug, subcategorySlug, id) : '#' // fallback

  // sectionType에 맞는 style 지정
  const style = sectionType.find((s) => s.section === section)
  if (!style) return null

  return (
    <Link href={href}>
      <div className="flex h-full w-full cursor-pointer flex-col font-semibold">
        {/* 이미지 영역 */}
        <div className={`relative w-full ${style.image_ratio}`}>
          <Image src={imageUrl} alt="thumbnail" fill className="object-cover" />
        </div>

        {/* 텍스트 영역 */}
        <div className={`flex flex-col gap-1 ${style.gap.image_category}`}>
          <span className={`${style.font.category} text-[#464647] font-medium`}>{category}</span>
          <div
            className={`${style.font.title} ${style.gap.category_title} tracking-[0.01em] line-clamp-2 whitespace-pre-line break-words leading-tight`}
          >
            {title.replace(/\\n/g, '\n')}
          </div>
        </div>
      </div>
    </Link>
  )
}
