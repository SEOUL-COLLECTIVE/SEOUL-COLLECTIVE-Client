export const ROUTES = {
  // 홈
  HOME: '/',

  // 정적 페이지
  BRANDS: '/brands',
  SHOPPING: '/shopping',
  COMMUNITY: '/community',

  // 동적 라우팅 헬퍼
  category: (slug: string) => `/${slug}`,
  subcategory: (category: string, subcategory: string) => `/${category}/${subcategory}`,
  article: (category: string, subcategory: string, id: string) =>
    `/${category}/${subcategory}/${id}`,

  // 커뮤니티
  communityCreate: () => '/community/create',
  communityDetail: (id: string) => `/community/${id}`,

  // 쇼핑
  shoppingDetail: (id: string) => `/shopping/${id}`,

  // 브랜드
  brandDetail: (slug: string) => `/brands/${slug}`,
} as const

// 타입 안전한 네비게이션 생성
export function getArticleHref(article: {
  categorySlug?: string
  subcategorySlug?: string
  id: string
}) {
  if (!article.categorySlug || !article.subcategorySlug) {
    throw new Error('Article must have category and subcategory')
  }
  return ROUTES.article(article.categorySlug, article.subcategorySlug, article.id)
}
