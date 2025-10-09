export const contentfulKeys = {
  // 최상위 키
  all: ['contentful'] as const,

  // articles 관련 키들
  articles: () => ['contentful', 'articles'] as const,

  //   api 최적화로 인해 사용하지 않는 쿼리키들
  //   article: (id: string) => ['contentful', 'articles', id] as const,
  //   mainArticles: () => ['contentful', 'articles', 'main'] as const,
  //   subArticles: () => ['contentful', 'articles', 'sub'] as const,

  // category 관련 키들
  //   categories: () => ['contentful', 'categories'] as const,
  category: (slug: string) => ['contentful', 'categories', slug] as const,
  //   categoryArticles: (slug: string) => ['contentful', 'articles', 'category', slug] as const,
}
