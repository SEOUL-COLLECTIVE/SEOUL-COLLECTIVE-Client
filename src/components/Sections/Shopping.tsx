'use client'

import Image from 'next/image'
import Link from 'next/link'
import ContentsCard from '@/components/Cards/ContentsCard'
import CustomCarousel from '@/components/Carousel/CustomCarousel'

interface ArticleItem {
  id: string
  thumbnail: string
  title: string
  author: string
}

export default function Shopping() {
  const sideArticles: ArticleItem[] = [
    {
      id: '2',
      thumbnail: '/test/thumbnail_01.jpg',
      title: 'The Best Brunette Bob Hair Inspiration for Fall',
      author: 'MEDINA AZALDIN',
    },
    {
      id: '3',
      thumbnail: '/test/thumbnail_01.jpg',
      title: '14 Viral Korean Beauty Steals You Can Score Today',
      author: 'NYKIA SPRADLEY',
    },
    {
      id: '4',
      thumbnail: '/test/thumbnail_01.jpg',
      title: 'Vicky Tsai Made Tatcha a Success—But at What Cost?',
      author: 'KATHLEEN HOU',
    },
  ]

  return (
    <div className="container mb-16 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 md:grid">
        {/* 왼쪽 메인 이미지 */}
        <div className="">
          <ContentsCard
            id="1"
            section="shopping"
            imageUrl="/test/thumbnail_01.jpg"
            title={'Hailey Bieber’s Staple Fall\nJeans Are On Sale For Under $75'}
          />
        </div>

        {/* 오른쪽 아티클 리스트 */}
        <div className="flex flex-col h-full">
          {sideArticles.map((article, index) => (
            <div key={article.id}>
              <Link href={`/article/${article.id}`} className="group flex gap-4 mb-8 flex-1">
                {/* 썸네일 */}
                <div className="relative flex-shrink-0 aspect-[1/1] w-40">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 텍스트 */}
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="text-lg font-semibold tracking-[0.01em] line-clamp-2 whitespace-pre-line break-words mb-4">
                    {article.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wide">
                    BY {article.author}
                  </p>
                </div>
              </Link>

              {/* 구분선 - 마지막 아이템 제외 */}
              {index !== sideArticles.length - 1 && (
                <div className="border-b border-gray-600 mb-8" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* THE LATEST SECTION */}
      <div className="mt-16">
        <CustomCarousel category="THE LATEST" isshopping={true} />
      </div>
    </div>
  )
}
