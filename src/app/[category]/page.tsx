import { notFound } from 'next/navigation'
import Image from 'next/image'
import ContentsCard from '@/components/Cards/ContentsCard'
import { getCategoryBySlug, getArticlesByCategory } from '@/utils/contentful'
import Shopping from '@/components/Sections/Shopping'
import { navItems } from '@/data/navItem'

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params

  const navItem = navItems.find((item) => item.name === category.toUpperCase())

  // 동적 라우트인 경우에만 Contentful API 호출 (API 호출 최소화)
  const [categoryData, categoryArticles] = await Promise.all([
    getCategoryBySlug(category),
    getArticlesByCategory(category),
  ])

  if (!categoryData) {
    notFound()
  }

  // 동적 라우트 처리 (Contentful에서 관리되는 카테고리)
  return (
    <div className="container mb-24">
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={categoryData.thumbnail || '/test/thumbnail_01.jpg'}
          alt={categoryData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span className="uppercase">{categoryData.name}</span>
          </div>
          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32">
              <div className="font-bold uppercase">{categoryData.name}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 서브카테고리 네비게이션 */}
      {navItem?.submenu && (
        <div className="flex gap-8 text-p14 py-5 pt-10">
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
        {category == 'shopping' ? (
          // shopping 카테고리일 경우 Shopping 컴포넌트 렌더링
          <Shopping />
        ) : (
          // 그 외 카테고리일 경우 일반 아티클 목록 렌더링
          <>
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
                    categorySlug={article.category?.slug || category}
                    subcategorySlug={article.subcategory?.slug || category}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">이 카테고리에는 아직 아티클이 없습니다.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
