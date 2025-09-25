'use client'
import { useEffect, useState } from 'react'
import ContentsCard from '../Cards/ContentsCard'
import { getMainArticles, getSubArticles } from '@/utils/contentful'
import { Article } from '@/types/contentful'

export default function Main() {
  const [loading, setLoading] = useState(true)
  const [mainArticle, setMainArticle] = useState<Article>()
  const [subArticle, setSubArticle] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const mainData = await getMainArticles()
        const subData = await getSubArticles()
        console.log('main articles', mainData[0])
        console.log('sub articles', subData)
        setMainArticle(mainData[0])
        setSubArticle(subData)
      } catch (error) {
        console.error('Failed to fetch main articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-[6.9fr_3.1fr] grid-rows-2 gap-8">
        <div className="row-span-2 animate-pulse">
          <div className="bg-gray-200 h-96 rounded-lg"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[6.9fr_3.1fr] grid-rows-2 gap-8">
      {/* 왼쪽 큰 박스 (2열 차지) */}
      <div className="row-span-2">
        {mainArticle && (
          <ContentsCard
            section={mainArticle.section ?? 'main'}
            title={mainArticle.title}
            category={mainArticle.category?.name ?? 'category'}
            categorySlug={mainArticle.category?.slug ?? 'etc'}
            subcategory={mainArticle.subcategory?.name ?? 'subcategory'}
            subcategorySlug={mainArticle.subcategory?.slug ?? 'general'}
            id={mainArticle.id}
            imageUrl={mainArticle.thumbnail ?? '/test/thumbnail_01.jpg'}
          />
        )}
      </div>

      {/* 오른쪽 두 박스 */}
      {subArticle.map((item) => (
        <div key={item.id}>
          <ContentsCard
            section={item.section ?? 'sub'}
            title={item.title}
            category={item.category?.name ?? 'category'}
            categorySlug={item.category?.slug ?? 'etc'}
            subcategory={item.subcategory?.name ?? 'subcategory'}
            subcategorySlug={item.subcategory?.slug ?? 'general'}
            id={item.id}
            imageUrl={item.thumbnail ?? '/test/thumbnail_01.jpg'}
          />
        </div>
      ))}
    </div>
  )
}
