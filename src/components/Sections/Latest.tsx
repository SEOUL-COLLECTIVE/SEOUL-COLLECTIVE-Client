'use client'

import { useArticlesByCategory } from '@/hooks/use-contentful'
import ContentsCard from '@/components/Cards/ContentsCard'
import { formatDate } from '@/utils/date-format'

export default function Latest() {
  const { data: beautyArticles, isLoading } = useArticlesByCategory('beauty')

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <div className="text-[30pt] font-mainBold">THE LATEST</div>
        <div className="w-16 h-2 bg-scpurple"></div>
        <div className="text-center py-12">Loading...</div>
      </div>
    )
  }

  // 최신 6개만 표시
  const latestArticles = beautyArticles?.slice(0, 6) || []

  return (
    <div className="flex flex-col">
      <div className="text-[30pt] font-mainBlack">THE LATEST</div>
      <div className="w-16 h-2 bg-scpurple mb-8"></div>
      <div className="grid grid-cols-4 grid-rows-2 gap-8">
        {latestArticles.map((article) => (
          <ContentsCard
            key={article.id}
            section="latest"
            title={article.title}
            date={article.dateTime ? formatDate(article.dateTime) : ''}
            categorySlug={article.category?.slug}
            subcategorySlug={article.subcategory?.slug}
            imageUrl={article.thumbnail || '/placeholder.jpg'}
            id={article.id}
          />
        ))}
      </div>
    </div>
  )
}
