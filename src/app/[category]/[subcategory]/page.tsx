import { getArticles } from '@/lib/contentful'

export default async function SubCategoryPage({
  params,
}: {
  params: { category: string; subcategory: string }
}) {
  const articles = await getArticles()
  const filtered = articles.filter(
    (a) =>
      a.category?.toLowerCase() === params.category.toLowerCase() &&
      a.subcategory?.toLowerCase().replace(/\s+/g, '-') === params.subcategory.toLowerCase()
  )

  return (
    <div>
      <h1 className="text-2xl font-bold">{params.subcategory}</h1>
      <ul>
        {filtered.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  )
}
