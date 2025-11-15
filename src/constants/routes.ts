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

  // 뷰티톡 (쿼리)
  beautyTalk: {
    root: '/beauty-talk' as const,
    create: '/beauty-talk/create' as const,
  },

  // // 뷰티톡 (쿼리)
  // askExpert: {
  //   root: '/ask-an-expert' as const,
  //   create: '/ask-an-expert/create' as const,
  // },

  // 뷰티톡 (쿼리 → 세그먼트 점진 전환 고려)
  askExpert: {
    root: '/ask-an-expert' as const,
    create: '/ask-an-expert/create' as const,
    type: (type: string) => `/ask-an-expert/${type}`,
    typeCategory: (type: string, category: string) => `/ask-an-expert/${type}/${category}`,
  },
} as const

// 타입 안전한 아티클 링크 생성기 (기존 세그먼트 방식 유지)
export function getArticleHref(article: {
  categorySlug?: string
  subcategorySlug?: string
  id: string
}) {
  if (!article.categorySlug || !article.subcategorySlug) {
    throw new Error('Article must have category and subcategory') // 아티클 카테고리와 서브카테고리가 없는 경우
  }
  return ROUTES.article(article.categorySlug, article.subcategorySlug, article.id)
}

/**
 * 뷰티톡 쿼리 파라미터를 기반으로 완전한 URL을 생성합니다.
 * @param params {type: 'my-review', category: 'skincare', sort: 'popular'} 등
 * @param baseRoute 기본 경로 (ROUTES.beautyTalk.root)
 */
export function createQueryHref(
  params: Record<string, string | null | undefined>,
  baseRoute: string
) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    // 값이 'all'이 아니거나, null/undefined가 아닌 유효한 값일 때만 추가
    if (value && value !== 'all') {
      searchParams.set(key, value)
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `${baseRoute}?${queryString}` : baseRoute
}

// 뷰티톡 링크 생성기 (쿼리 기반 사용)
export function getBeautyTalkHref(
  params: {
    type?: string | null
    category?: string | null
    sort?: string | null
  } = {}
) {
  return createQueryHref(params as Record<string, string | undefined>, ROUTES.beautyTalk.root)
}

// 전문가 질문 링크 생성기 (쿼리 기반 사용)
export function getAskExpertHref(
  params: {
    type?: string | null
    category?: string | null
  } = {}
) {
  return createQueryHref(params as Record<string, string | undefined>, ROUTES.askExpert.root)
}
