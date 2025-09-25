'use client'

import SaveBtn from '@/components/Buttons/SaveBtn'
import { getArticleById } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Article } from '@/types/contentful'

export default function ArticlePage({
  params,
}: {
  params: { category: string; subcategory: string; id: string }
}) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const fetchedArticle = await getArticleById(params.id)
        setArticle(fetchedArticle)
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (!article) return <p>Not found</p>

  const handleSave = () => {
    alert('저장되었습니다.')
  }

  return (
    <article className="prose max-w-5xl mx-auto p-6">
      <h1 className="text-[3rem] font-medium whitespace-pre-line break-words mb-2">
        {article.title.replace(/\\n/g, '\n')}
      </h1>

      <div className="flex gap-8 font-bold text-[0.7rem] uppercase mb-6">
        <div>BY {article.editor}</div>
        <div>PUBLISHED ON {article.dateTime}</div>
      </div>

      <div className="mb-8">
        <SaveBtn onClick={handleSave} />
      </div>

      {/* 썸네일 */}
      {article.thumbnail && (
        <Image
          src={article.thumbnail}
          alt={article.title}
          width={800}
          height={450}
          className="mb-8 w-[80%]"
        />
      )}

      {/* Rich Text 렌더링 */}
      <div>
        {documentToReactComponents(article.contentsDetail, {
          renderNode: {
            // ✅ 일반 단락
            [BLOCKS.PARAGRAPH]: (_node, children) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),

            // ✅ 이미지 (Asset) - 수정된 부분
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              const assetId = node.data?.target?.sys?.id
              if (!assetId) {
                console.warn('No asset ID found', node.data)
                return null
              }

              // article에서 전달받은 assets Map에서 해당 asset 찾기
              const asset = article.assets.get(assetId)
              if (!asset) {
                console.warn('Asset not found for ID:', assetId)
                return null
              }

              const url = asset.fields.file?.url ? `https:${asset.fields.file.url}` : null
              if (!url) {
                console.warn('No URL found for asset:', assetId)
                return null
              }

              return (
                <div className="my-6">
                  <Image
                    src={url}
                    alt={asset.fields.title || 'Embedded image'}
                    width={600}
                    height={450}
                    className="w-[60%] h-auto"
                  />
                </div>
              )
            },

            // ✅ VideoEmbed (Entry) - URL 변환 로직 개선
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
              console.log('EMBEDDED_ENTRY node:', node)

              const entryId = node.data?.target?.sys?.id
              if (!entryId) {
                console.warn('No entry ID found', node.data)
                return null
              }

              console.log('Looking for entry ID:', entryId)

              // article에서 전달받은 entries Map에서 해당 entry 찾기
              const entry = article.entries.get(entryId)
              if (!entry) {
                console.warn('Entry not found for ID:', entryId)
                return null
              }

              console.log('Found entry:', entry)
              console.log('Entry content type:', entry.sys.contentType?.sys.id)

              // VideoEmbed 타입인지 확인 (대소문자 모두 체크)
              const contentTypeId = entry.sys.contentType?.sys.id
              if (contentTypeId === 'videoEmbed' || contentTypeId === 'VideoEmbed') {
                const { platform, url } = entry.fields as { platform: string; url: string }

                console.log('VideoEmbed found - platform:', platform, 'url:', url)

                if (platform === 'youtube' && url) {
                  // YouTube URL을 embed URL로 변환 (다양한 형식 지원)
                  let embedUrl = url

                  if (url.includes('youtu.be/')) {
                    // https://youtu.be/mCgrsOuIjo?si=IRSGvA88_oLJdUKd 형식
                    const videoId = url.split('youtu.be/')[1].split('?')[0]
                    embedUrl = `https://www.youtube.com/embed/${videoId}`
                  } else if (url.includes('watch?v=')) {
                    // https://www.youtube.com/watch?v=mCgrsOuIjo 형식
                    embedUrl = url.replace('watch?v=', 'embed/')
                  } else if (url.includes('youtube.com/v/')) {
                    // https://www.youtube.com/v/mCgrsOuIjo 형식
                    embedUrl = url.replace('/v/', '/embed/')
                  }

                  console.log('Original URL:', url)
                  console.log('Converted embed URL:', embedUrl)

                  return (
                    <div className="my-6 aspect-video">
                      <iframe
                        src={embedUrl}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                  )
                }
              }

              console.log('Not a VideoEmbed or conditions not met')
              return null
            },
          },
        })}
      </div>
    </article>
  )
}
