import { notFound } from 'next/navigation'
import Image from 'next/image'
import ContentsCard from '@/components/Cards/ContentsCard'
import { getArticles, getCategoryBySlug } from '@/utils/contentful'

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>
}

export default async function SubCategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params

  // 동적 라우트 API 호출
  const [articles, categoryData] = await Promise.all([getArticles(), getCategoryBySlug(category)])

  if (!categoryData) {
    notFound()
  }

  // 해당 카테고리와 서브카테고리의 아티클 필터링
  const filtered = articles.filter(
    (article) =>
      article.category?.slug.toLowerCase() === category.toLowerCase() &&
      article.subcategory?.slug.toLowerCase() === subcategory.toLowerCase()
  )

  // 서브카테고리 데이터 (첫 번째 아티클에서 추출)
  const subcategoryData = filtered.length > 0 ? filtered[0].subcategory : null
  if (!subcategoryData) {
    notFound()
  }

  return (
    <div className="container mb-24">
      {/* 헤더 섹션 */}
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={categoryData.thumbnail || '/test/thumbnail_01.jpg'}
          alt={`${categoryData.name} - ${subcategoryData.name}`}
          fill
          className="object-cover"
          priority
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span className="uppercase">{categoryData.name}</span>
            <span className="text-gray-300">/</span>
            <span className="uppercase">{subcategoryData.name}</span>
          </div>

          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32">
              <div className="font-bold uppercase">{subcategoryData.name}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 서브카테고리 아티클 목록 */}
      <div className="mt-16">
        <div className="text-p32 font-bold flex justify-center mb-8">
          {subcategoryData.name.toUpperCase()}
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
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
