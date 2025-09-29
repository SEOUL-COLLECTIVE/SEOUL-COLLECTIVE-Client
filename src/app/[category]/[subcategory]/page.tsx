import { getArticles } from '@/utils/contentful'

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>
}

export default async function SubCategoryPage({ params }: PageProps) {
  // params를 직접 await
  const resolvedParams = await params

  const articles = await getArticles()
  const filtered = articles.filter(
    (a) =>
      a.category?.slug.toLowerCase() === resolvedParams.category.toLowerCase() &&
      a.subcategory?.slug.toLowerCase() === resolvedParams.subcategory.toLowerCase()
  )

  return (
    <div>
      <h1 className="text-2xl font-bold">{resolvedParams.subcategory}</h1>
      <ul>
        {filtered.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  )
}
