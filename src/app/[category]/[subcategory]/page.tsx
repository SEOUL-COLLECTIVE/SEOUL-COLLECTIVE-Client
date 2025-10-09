'use client'

import { use } from 'react'
import Image from 'next/image'
import ContentsCard from '@/components/Cards/ContentsCard'
import { useArticlesBySubcategory, useCategory } from '@/hooks/use-contentful'

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>
}

export default function SubCategoryPage({ params }: PageProps) {
  // use()로 params 간단하게 해결
  const { category, subcategory } = use(params)

  // TanStack Query hooks 사용 - API 호출 최소화 (캐시에서 가져옴!)
  const { data: filteredArticles = [], isLoading } = useArticlesBySubcategory(category, subcategory)
  const { data: categoryData } = useCategory(category)

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="container mb-24">
        <div className="flex justify-center items-center h-96">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  // 서브카테고리 데이터 (첫 번째 아티클에서 추출)
  const subcategoryData = filteredArticles.length > 0 ? filteredArticles[0].subcategory : null

  return (
    <div className="container mb-24">
      {/* 헤더 섹션 */}
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={categoryData?.thumbnail || '/test/thumbnail_01.jpg'}
          alt={`${categoryData?.name || category} - ${subcategory}`}
          fill
          className="object-cover"
          priority
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span className="uppercase">{categoryData?.name || category}</span>
            <span className="text-gray-300">/</span>
            <span className="uppercase">{subcategoryData?.name || subcategory}</span>
          </div>

          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32">
              <div className="font-bold uppercase">{subcategoryData?.name || subcategory}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 서브카테고리 아티클 목록 */}
      <div className="mt-16">
        <div className="text-p32 font-bold flex justify-center mb-8">
          {(subcategoryData?.name || subcategory).toUpperCase()}
        </div>
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ContentsCard
                key={article.id}
                section="latest"
                title={article.title}
                category={article.category?.name || 'category'}
                imageUrl={article.thumbnail || '/test/thumbnail_01.jpg'}
                id={article.id}
                categorySlug={article.category?.slug || category}
                subcategorySlug={article.subcategory?.slug || subcategory}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">이 서브카테고리에는 아직 아티클이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
