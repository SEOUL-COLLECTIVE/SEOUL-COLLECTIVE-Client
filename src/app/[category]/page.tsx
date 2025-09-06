import { notFound } from 'next/navigation'
import { navItems } from '@/data/navItem'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params

  // 카테고리 이름을 대문자로 변환하여 navItems에서 찾기
  const categoryName = category.toUpperCase()
  const navItem = navItems.find((item) => item.name === categoryName)

  if (!navItem) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{navItem.name}</h1>

      {navItem.submenu && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {navItem.submenu.map((subItem) => (
            <div
              key={subItem.name}
              className="rounded-lg border p-4 transition-shadow hover:shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold">{subItem.name}</h2>
              <p className="text-gray-600">{subItem.name}에 대한 상세 정보를 여기에 표시합니다.</p>
            </div>
          ))}
        </div>
      )}

      {!navItem.submenu && (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600">
            {navItem.name} 카테고리의 콘텐츠가 곧 추가될 예정입니다.
          </p>
        </div>
      )}
    </div>
  )
}

// 동적 라우트를 위한 generateStaticParams
export async function generateStaticParams() {
  return navItems.map((item) => ({
    category: item.name.toLowerCase(),
  }))
}
