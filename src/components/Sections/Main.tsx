import ContentsCard from '../Cards/ContentsCard'
import { useMainArticles, useSubArticles } from '@/hooks/use-contentful'

export default function Main() {
  // TanStack Query hooks 사용 - API 호출 최소화
  const { data: mainArticles, isLoading: mainLoading } = useMainArticles()
  const { data: subArticles, isLoading: subLoading } = useSubArticles()

  const mainArticle = mainArticles?.[0]
  const loading = mainLoading || subLoading

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
      {subArticles.map((item) => (
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
