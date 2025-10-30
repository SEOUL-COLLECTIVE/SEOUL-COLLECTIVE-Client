// 전역 라우팅 상수 및 동적 경로 헬퍼
// 앱 전반에서 이 모듈만 참조하여 경로를 생성/관리합니다.

export const ROUTES = {
  // 기본
  HOME: '/',

  // 카테고리 / 서브카테고리 / 아티클 (콘텐츠풀 연동 영역)
  category: (slug: string) => `/${slug}`,
  subcategory: (category: string, subcategory: string) => `/${category}/${subcategory}`,
  article: (category: string, subcategory: string, id: string) =>
    `/${category}/${subcategory}/${id}`,

  // 정적 영역
  BRANDS: '/brands',
  SHOPPING: '/shopping',

  // 쇼핑 상세
  shoppingDetail: (id: string | number) => `/shopping/${id}`,

  // 브랜드 상세
  brandDetail: (slug: string) => `/brands/${slug}`,

  // 멤버
  member: {
    signin: '/member/signin' as const,
    signup: '/member/signup' as const,
  },

  // 뷰티톡 (쿼리 → 세그먼트 점진 전환 고려)
  beautyTalk: {
    root: '/beauty-talk' as const,
    create: '/beauty-talk/create' as const,
    type: (type: string) => `/beauty-talk/${type}`,
    typeCategory: (type: string, category: string) => `/beauty-talk/${type}/${category}`,
  },

  // 뷰티톡 (쿼리 → 세그먼트 점진 전환 고려)
  askExpert: {
    root: '/ask-an-expert' as const,
    create: '/ask-an-expert/create' as const,
    type: (type: string) => `/ask-an-expert/${type}`,
    typeCategory: (type: string, category: string) => `/ask-an-expert/${type}/${category}`,
  },
} as const

// 타입 안전한 아티클 링크 생성기
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

// 뷰티톡 링크 생성기 (세그먼트 기반 사용 권장)
export function getBeautyTalkHref(
  params: {
    type?: string | null
    category?: string | null
  } = {}
) {
  const { type, category } = params
  if (type && category) return ROUTES.beautyTalk.typeCategory(type, category)
  if (type) return ROUTES.beautyTalk.type(type)
  return ROUTES.beautyTalk.root
}
