import { Article, ArticleFields, Entry, Asset, Category, Subcategory } from '@/types/contentful'

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
      Entry?: (Category | Subcategory)[]
    }
  } = await fetchContent(`entries?content_type=seoulCollective&order=-sys.createdAt&include=2`)

  // includes → Map 변환
  const assets = new Map<string, Asset>(data.includes?.Asset?.map((a) => [a.sys.id, a]) || [])

  const entries = new Map<string, Category | Subcategory>(
    data.includes?.Entry?.map((e) => [e.sys.id, e]) || []
  )

  return data.items.map((item: Entry<ArticleFields>): Article => {
    const { title, dateTime, thumbnail, contentsDetail, editor, section } = item.fields

    // 썸네일 매핑
    const thumbnailUrl = thumbnail
      ? `https:${assets.get(thumbnail.sys.id)?.fields.file.url ?? ''}`
      : null

    // 카테고리 매핑
    const categoryName = item.fields.category
      ? (entries.get(item.fields.category.sys.id)?.fields.name ?? null)
      : null

    // 서브카테고리 매핑
    const subcategoryName = item.fields.subcategory
      ? (entries.get(item.fields.subcategory.sys.id)?.fields.name ?? null)
      : null

    return {
      id: item.sys.id,
      title,
      dateTime,
      thumbnail: thumbnailUrl,
      contentsDetail,
      category: categoryName,
      subcategory: subcategoryName,
      section: section ?? null,
      editor,
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
