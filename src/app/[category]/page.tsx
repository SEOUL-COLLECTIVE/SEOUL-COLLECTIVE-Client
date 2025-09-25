'use client'

import { notFound } from 'next/navigation'
import { navItems } from '@/data/navItem'
import Image from 'next/image'
import ContentsCard from '@/components/Cards/ContentsCard'
import { getCategoryBySlug, getArticlesByCategory } from '@/lib/contentful'
import { useState, useEffect } from 'react'
import { Article } from '@/types/contentful'

interface CategoryData {
  name: string
  slug: string
  thumbnail: string | null
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [categoryArticles, setCategoryArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        setLoading(true)
        const [category, articles] = await Promise.all([
          getCategoryBySlug(params.category),
          getArticlesByCategory(params.category),
        ])

        setCategoryData(category)
        setCategoryArticles(articles)
      } catch (err) {
        console.error('Error fetching category data:', err)
        setError('카테고리 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [params.category]) // params.category가 변경될 때만 재실행

  // 카테고리 이름을 대문자로 변환하여 navItems에서 찾기
  const categoryName = params.category.toUpperCase()
  const navItem = navItems.find((item) => item.name === categoryName)

  if (!navItem) {
    notFound()
  }

  if (loading) {
    return (
      <div className="container mb-24">
        <div className="flex justify-center items-center h-96">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mb-24">
        <div className="flex justify-center items-center h-96">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mb-24">
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={categoryData?.thumbnail || '/test/thumbnail_01.jpg'}
          alt={categoryData?.name || navItem.name}
          fill
          className="object-cover"
          priority
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span className="uppercase">{categoryData?.name || navItem.name}</span>
          </div>

          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32">
              <div className="font-bold uppercase">{categoryData?.name || navItem.name}</div>
            </div>
          </div>
        </div>
      </div>

      {navItem.submenu && (
        <div className="flex gap-8 text-p12 py-5">
          {navItem.submenu.map((subItem) => (
            <div
              key={subItem.name}
              className="font-semibold cursor-pointer hover:underline hover:decoration-purple hover:decoration-[0.125rem] underline-offset-[0.4375rem]"
            >
              {subItem.name}
            </div>
          ))}
        </div>
      )}

      {/* 카테고리별 아티클 목록 */}
      <div className="mt-16">
        <div className="text-p32 font-bold flex justify-center mb-8">THE LATEST</div>
        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ContentsCard
                key={article.id}
                section="latest"
                title={article.title}
                category={article.category?.name || 'category'}
                imageUrl={article.thumbnail || '/test/thumbnail_01.jpg'}
                id={article.id}
                categorySlug={article.category?.slug || params.category}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">이 카테고리에는 아직 아티클이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
