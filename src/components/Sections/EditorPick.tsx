'use client'

import ContentsCard from '../Cards/ContentsCard'
import ShoppingCard from '../Cards/ShoppingCard'
import { shoppingData } from '@/dummies/section-data'
import { useArticles } from '@/hooks/use-contentful'

export default function EditorPick() {
  const { data: articles, isLoading } = useArticles()

  // section이 'editor-pick'인 첫 번째 아티클 찾기
  const editorPickArticle = articles?.find((article) => article.section === 'editor-pick')

  // 디버그: 콘솔에 로그 출력
  if (articles && articles.length > 0) {
    console.log(
      'All articles:',
      articles.map((a) => ({ title: a.title, section: a.section }))
    )
    console.log('Editor pick article found:', editorPickArticle)
  }

  return (
    <div className="flex flex-col">
      <div className="text-[30pt] font-mainBlack">EDITOR PICK</div>
      <div className="w-16 h-2 bg-scpurple"></div>
      <div className="grid grid-cols-[1fr_1fr] gap-8 mt-10">
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center aspect-[770/582] bg-gray-200">
              <span>Loading...</span>
            </div>
          ) : editorPickArticle ? (
            <ContentsCard
              id={editorPickArticle.id}
              section="editor-pick"
              imageUrl={editorPickArticle.thumbnail || '/placeholder.jpg'}
              title={editorPickArticle.title}
              date={editorPickArticle.dateTime || ''}
              categorySlug={editorPickArticle.category?.slug}
              subcategorySlug={editorPickArticle.subcategory?.slug}
            />
          ) : null}
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-5">
          {shoppingData.products.map((item) => (
            <ShoppingCard
              key={item.id}
              imageUrl={item.imageUrl}
              brand={item.brand}
              product={item.name}
              price={item.price}
              store={item.retailer}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
