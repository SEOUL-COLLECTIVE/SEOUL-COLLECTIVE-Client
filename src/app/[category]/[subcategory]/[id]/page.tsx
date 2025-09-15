import { getArticleById } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Image from 'next/image'

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id)
  console.log(article)
  if (!article) return <p>Not found</p>

  return (
    <article className="prose max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

      {article.thumbnail && (
        <Image
          src={article.thumbnail}
          alt={article.title}
          width={800}
          height={450}
          className="rounded-lg mb-8"
        />
      )}

      {/* Rich Text 렌더링 */}
      <div>
        {documentToReactComponents(article.contentsDetail, {
          renderNode: {
            // ✅ 일반 단락
            [BLOCKS.PARAGRAPH]: (node, children) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),

            // ✅ 이미지 (Asset)
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              const fields = node.data?.target?.fields
              if (!fields) {
                console.warn('No fields for asset', node.data.target.sys.id)
                return null
              }

              const url = fields.file?.url ? `https:${fields.file.url}` : null
              if (!url) return null

              return <Image src={url} alt={fields.title || 'asset'} width={800} height={450} />
            },

            // ✅ VideoEmbed (Entry)
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
              const entry = node.data?.target?.fields
              if (!entry) {
                console.warn('No fields for asset', node.data.target.sys.id)
                return null
              }

              if (entry.url && entry.platform === 'youtube') {
                return (
                  <div className="my-6 aspect-video">
                    <iframe
                      src={entry.url.replace('watch?v=', 'embed/')}
                      title="YouTube video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                )
              }

              return null
            },
          },
        })}
      </div>
    </article>
  )
}
