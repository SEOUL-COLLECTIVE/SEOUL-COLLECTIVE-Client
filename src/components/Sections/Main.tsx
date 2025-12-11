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
    <div className="grid grid-cols-[3fr_1fr] gap-10">
      <div className="grid grid-cols-[7fr_3fr] grid-rows-2 gap-8">
        {/* 왼쪽 큰 박스 (2열 차지) */}
        <div className="row-span-2">
          {mainArticle && (
            <ContentsCard
              section={mainArticle.section ?? 'main'}
              title={mainArticle.title}
              date={mainArticle.dateTime ?? 'dateTime'}
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
              date={item.dateTime ?? 'date'}
              categorySlug={item.category?.slug ?? 'etc'}
              subcategory={item.subcategory?.name ?? 'subcategory'}
              subcategorySlug={item.subcategory?.slug ?? 'general'}
              id={item.id}
              imageUrl={item.thumbnail ?? '/test/thumbnail_01.jpg'}
            />
          </div>
        ))}
      </div>

      {/* Beauty Talks */}
      <div className="border-l-[1px] border-gray-400 pl-10">
        <div className="text-4xl font-point mb-6">
          Beauty <span className="font-nhItalic">Talk</span>
        </div>

        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col">
            <div className="font-mainBold text-xl mb-3">Editor Asks</div>
            <div className="font-mainMedium text-base mb-1 whitespace-pre-line break-words cursor-pointer">
              What’s your current go-to K-Beauty brand?
            </div>
            <div className="font-mainMedium text-xs text-scgrey mb-4">2025.12.15</div>
          </div>

          <div className="flex flex-col">
            <div className="font-mainBold text-xl mb-3">Popular in My Review</div>
            <div className="font-mainMedium text-base mb-1 whitespace-pre-line break-words cursor-pointer">
              What’s your current go-to K-Beauty brand?
            </div>
            <div className="font-mainMedium text-xs text-scgrey mb-4">2025.12.15</div>
            <div className="font-mainMedium text-base mb-1 whitespace-pre-line break-words cursor-pointer">
              Discounted item on something I just bought
            </div>
            <div className="font-mainMedium text-xs text-scgrey mb-4">2025.12.15</div>
          </div>

          <div className="flex flex-col">
            <div className="font-mainBold text-xl mb-3">Popular in Beauty Q&A</div>
            <div className="font-mainMedium text-base mb-1 whitespace-pre-line break-words cursor-pointer">
              {"What *didn't* you get during Black Friday/Cyber Week 2025?"}
            </div>
            <div className="font-mainMedium text-xs text-scgrey mb-4">2025.12.15</div>
            <div className="font-mainMedium text-base mb-1 whitespace-pre-line break-words cursor-pointer">
              Looking for Recommendations for Very Dry Skin
            </div>
            <div className="font-mainMedium text-xs text-scgrey mb-4">2025.12.15</div>
          </div>
        </div>
      </div>
    </div>
  )
}
