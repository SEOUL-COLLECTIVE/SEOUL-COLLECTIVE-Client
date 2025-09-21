import { notFound } from 'next/navigation'
import { navItems } from '@/data/navItem'
import Image from 'next/image'
import ContentsCard from '@/components/Cards/ContentsCard'
import { latestData } from '@/data/sectionData'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  // 카테고리 이름을 대문자로 변환하여 navItems에서 찾기
  const categoryName = category.toUpperCase()
  const navItem = navItems.find((item) => item.name === categoryName)

  if (!navItem) {
    notFound()
  }

  return (
    <div className="container mb-24">
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src="/test/thumbnail_01.jpg"
          alt={navItem.name}
          fill
          className="object-cover"
          priority
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span className="uppercase">{navItem.name}</span>
          </div>

          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32">
              <div className="font-bold uppercase">{navItem.name}</div>
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

      <div className="flex flex-col w-full mt-10">
        <div className="text-p32 font-bold flex justify-center">THE LATEST</div>
        <div className="grid grid-cols-3 grid-rows-2 gap-8 gap-y-14 mt-6">
          {latestData.map((item) => (
            <ContentsCard
              key={item.id}
              section={item.section}
              title={item.title}
              category={item.category}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 동적 라우트를 위한 generateStaticParams
export async function generateStaticParams() {
  return navItems.map((item) => ({
    category: item.name.toLowerCase(),
  }))
}
