import { getArticles } from '@/lib/contentful'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const articles = await getArticles()
  const filtered = articles.filter(
    (a) => a.category?.slug.toLowerCase() === params.category.toLowerCase()
  )

  return (
    <div>
      <h1 className="text-2xl font-bold">{params.category.toUpperCase()}</h1>
      <ul>
        {filtered.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  )
}
