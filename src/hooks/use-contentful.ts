import { useQuery } from '@tanstack/react-query'
import { getArticles, getCategoryBySlug } from '@/api/contentful'
import { logApiCall } from '@/utils/api-counter'
import { contentfulKeys } from '@/utils/contentful-keys'

/**
 * 모든 아티클 목록을 가져오는 hook (기본)
 * 이 hook만 실제로 API를 호출하고, 나머지는 여기서 필터링
 */
export function useArticles() {
  return useQuery({
    queryKey: contentfulKeys.articles(),
    queryFn: async () => {
      logApiCall('getArticles()')
      return getArticles()
    },
  })
}

/**
 * 메인 아티클 (필터링, API 호출 없음)
 */
export function useMainArticles() {
  const { data: articles, ...rest } = useArticles()

  const mainArticles = articles?.filter((article) => article.section === 'main') || []

  return {
    data: mainArticles,
    ...rest,
  }
}

/**
 * 서브 아티클 (필터링, API 호출 없음)
 */
export function useSubArticles() {
  const { data: articles, ...rest } = useArticles()

  const subArticles = articles?.filter((article) => article.section === 'sub') || []

  return {
    data: subArticles,
    ...rest,
  }
}

/**
 * 특정 아티클 (필터링, API 호출 없음!)
 */
export function useArticle(id: string) {
  const { data: articles, ...rest } = useArticles()

  const article = articles?.find((article) => article.id === id) || null

  return {
    data: article,
    ...rest,
  }
}

/**
 * 카테고리별 아티클 (필터링, API 호출 없음!)
 */
export function useArticlesByCategory(categorySlug: string) {
  const { data: articles, ...rest } = useArticles()

  const filteredArticles =
    articles?.filter(
      (article) => (article.category?.slug.toLowerCase() ?? '') === categorySlug.toLowerCase()
    ) || []

  return {
    data: filteredArticles,
    ...rest,
  }
}

/**
 * 서브카테고리별 아티클 (필터링, API 호출 없음!)
 */
export function useArticlesBySubcategory(categorySlug: string, subcategorySlug: string) {
  const { data: articles, ...rest } = useArticles()

  const filteredArticles =
    articles?.filter(
      (article) =>
        (article.category?.slug.toLowerCase() ?? '') === categorySlug.toLowerCase() &&
        (article.subcategory?.slug.toLowerCase() ?? '') === subcategorySlug.toLowerCase()
    ) || []

  return {
    data: filteredArticles,
    ...rest,
  }
}

/**
 * 카테고리 정보 (여전히 별도 API 필요 - 아티클에 전체 정보가 없을 수 있음)
 */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: contentfulKeys.category(slug),
    queryFn: async () => {
      logApiCall(`getCategoryBySlug(${slug})`)
      return getCategoryBySlug(slug)
    },
    enabled: !!slug,
  })
}
