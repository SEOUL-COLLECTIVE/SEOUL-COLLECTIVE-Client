import {
  Article,
  ArticleFields,
  Entry,
  Asset,
  Category,
  Subcategory,
  IncludeEntry,
} from '@/types/contentful'

// Contentful API fetch 유틸
export async function fetchContent(query: string) {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master/${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_API_KEY}`,
      },
      cache: 'no-store', // Next.js 13 이상에서 SSR 용도로 사용
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`)
  }

  return res.json()
}

// Article 가져오기
export async function getArticles(): Promise<Article[]> {
  const data: {
    items: Entry<ArticleFields>[]
    includes?: {
      Asset?: Asset[]
      Entry?: IncludeEntry[]
    }
  } = await fetchContent(`entries?content_type=seoulCollective&order=-sys.createdAt&include=2`)

  // includes → Map 변환
  const assets = new Map<string, Asset>(data.includes?.Asset?.map((a) => [a.sys.id, a]) || [])

  const entries = new Map<string, IncludeEntry>(
    data.includes?.Entry?.map((e) => [e.sys.id, e]) || []
  )

  return data.items.map((item: Entry<ArticleFields>): Article => {
    const { title, dateTime, thumbnail, contentsDetail, editor, section } = item.fields

    // 썸네일 매핑
    const thumbnailUrl = thumbnail
      ? `https:${assets.get(thumbnail.sys.id)?.fields.file.url ?? ''}`
      : null

    // 카테고리 매핑
    const categoryEntry = item.fields.category ? entries.get(item.fields.category.sys.id) : null
    const category =
      categoryEntry && categoryEntry.sys.contentType?.sys.id === 'category'
        ? {
            name: (categoryEntry as Category).fields.name,
            slug: (categoryEntry as Category).fields.slug ?? '',
            thumbnail: (categoryEntry as Category).fields.thumbnail
              ? `https:${assets.get((categoryEntry as Category).fields.thumbnail!.sys.id)?.fields.file.url ?? ''}`
              : null,
          }
        : null

    // 서브카테고리 매핑
    const subcategoryEntry = item.fields.subcategory
      ? entries.get(item.fields.subcategory.sys.id)
      : null
    const subcategory =
      subcategoryEntry && subcategoryEntry.sys.contentType?.sys.id === 'subcategory'
        ? {
            name: (subcategoryEntry as Subcategory).fields.name,
            slug: (subcategoryEntry as Subcategory).fields.slug ?? '',
          }
        : null

    return {
      id: item.sys.id,
      title,
      dateTime,
      thumbnail: thumbnailUrl,
      contentsDetail,
      category,
      subcategory,
      section: section ?? null,
      editor,
      // includes 데이터도 함께 전달
      assets,
      entries,
    }
  })
}

// section이 main인 것만 가져오기
export async function getMainArticles(): Promise<Article[]> {
  const articles = await getArticles()
  return articles.filter((a) => a.section === 'main')
}

// section이 sub인 것만 가져오기
export async function getSubArticles(): Promise<Article[]> {
  const articles = await getArticles()
  return articles.filter((a) => a.section === 'sub')
}

// id로 단일 아티클 정보 가져오기
export async function getArticleById(id: string): Promise<Article | null> {
  const data: {
    items: Entry<ArticleFields>[]
    includes?: {
      Asset?: Asset[]
      Entry?: IncludeEntry[]
    }
  } = await fetchContent(`entries?sys.id=${id}&include=2`)

  if (!data.items || data.items.length === 0) return null

  const item = data.items[0]
  const { title, dateTime, thumbnail, contentsDetail, editor, section } = item.fields

  // includes → Map 변환
  const assets = new Map<string, Asset>(data.includes?.Asset?.map((a) => [a.sys.id, a]) || [])
  const entries = new Map<string, IncludeEntry>(
    data.includes?.Entry?.map((e) => [e.sys.id, e]) || []
  )

  // 썸네일 매핑
  const thumbnailUrl = thumbnail
    ? `https:${assets.get(thumbnail.sys.id)?.fields.file.url ?? ''}`
    : null

  // 카테고리 매핑
  const categoryEntry = item.fields.category ? entries.get(item.fields.category.sys.id) : null
  const subcategoryEntry = item.fields.subcategory
    ? entries.get(item.fields.subcategory.sys.id)
    : null

  return {
    id: item.sys.id,
    title,
    dateTime,
    thumbnail: thumbnailUrl,
    contentsDetail,
    category:
      categoryEntry && categoryEntry.sys.contentType?.sys.id === 'category'
        ? {
            name: (categoryEntry as Category).fields.name,
            slug: (categoryEntry as Category).fields.slug ?? '',
            thumbnail: (categoryEntry as Category).fields.thumbnail
              ? `https:${assets.get((categoryEntry as Category).fields.thumbnail!.sys.id)?.fields.file.url ?? ''}`
              : null,
          }
        : null,
    subcategory:
      subcategoryEntry && subcategoryEntry.sys.contentType?.sys.id === 'subcategory'
        ? {
            name: (subcategoryEntry as Subcategory).fields.name,
            slug: (subcategoryEntry as Subcategory).fields.slug ?? '',
          }
        : null,
    section: section ?? null,
    editor,
    // includes 데이터도 함께 전달
    assets,
    entries,
  }
}

// 카테고리 정보 직접 가져오기
export async function getCategoryBySlug(slug: string): Promise<{
  name: string
  slug: string
  thumbnail: string | null
} | null> {
  const data: {
    items: Category[]
    includes?: {
      Asset?: Asset[]
    }
  } = await fetchContent(`entries?content_type=category&fields.slug=${slug}&include=1`)

  if (!data.items || data.items.length === 0) return null

  const item = data.items[0]
  const { name, slug: categorySlug, thumbnail } = item.fields

  // includes → Map 변환
  const assets = new Map<string, Asset>(data.includes?.Asset?.map((a) => [a.sys.id, a]) || [])

  // 썸네일 URL 생성
  const thumbnailUrl = thumbnail
    ? `https:${assets.get(thumbnail.sys.id)?.fields.file.url ?? ''}`
    : null

  return {
    name,
    slug: categorySlug ?? slug,
    thumbnail: thumbnailUrl,
  }
}

// 카테고리별 아티클 가져오기 (Reference 관계용)
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  // 1. 먼저 해당 slug를 가진 카테고리의 ID를 찾기
  const categoryData = await fetchContent(
    `entries?content_type=category&fields.slug=${categorySlug}&select=sys.id`
  )

  if (!categoryData.items || categoryData.items.length === 0) {
    return []
  }

  const categoryId = categoryData.items[0].sys.id

  // 2. 그 카테고리 ID를 참조하는 아티클들 가져오기
  const data: {
    items: Entry<ArticleFields>[]
    includes?: {
      Asset?: Asset[]
      Entry?: IncludeEntry[]
    }
  } = await fetchContent(
    `entries?content_type=seoulCollective&fields.category.sys.id=${categoryId}&order=-sys.createdAt&include=2`
  )

  // includes → Map 변환
  const assets = new Map<string, Asset>(data.includes?.Asset?.map((a) => [a.sys.id, a]) || [])
  const entries = new Map<string, IncludeEntry>(
    data.includes?.Entry?.map((e) => [e.sys.id, e]) || []
  )

  return data.items.map((item: Entry<ArticleFields>): Article => {
    const { title, dateTime, thumbnail, contentsDetail, editor, section } = item.fields

    // 썸네일 매핑
    const thumbnailUrl = thumbnail
      ? `https:${assets.get(thumbnail.sys.id)?.fields.file.url ?? ''}`
      : null

    // 카테고리 매핑
    const categoryEntry = item.fields.category ? entries.get(item.fields.category.sys.id) : null
    const category =
      categoryEntry && categoryEntry.sys.contentType?.sys.id === 'category'
        ? {
            name: (categoryEntry as Category).fields.name,
            slug: (categoryEntry as Category).fields.slug ?? '',
            thumbnail: (categoryEntry as Category).fields.thumbnail
              ? `https:${assets.get((categoryEntry as Category).fields.thumbnail!.sys.id)?.fields.file.url ?? ''}`
              : null,
          }
        : null

    // 서브카테고리 매핑
    const subcategoryEntry = item.fields.subcategory
      ? entries.get(item.fields.subcategory.sys.id)
      : null
    const subcategory =
      subcategoryEntry && subcategoryEntry.sys.contentType?.sys.id === 'subcategory'
        ? {
            name: (subcategoryEntry as Subcategory).fields.name,
            slug: (subcategoryEntry as Subcategory).fields.slug ?? '',
          }
        : null

    return {
      id: item.sys.id,
      title,
      dateTime,
      thumbnail: thumbnailUrl,
      contentsDetail,
      category,
      subcategory,
      section: section ?? null,
      editor,
      // includes 데이터도 함께 전달
      assets,
      entries,
    }
  })
}
