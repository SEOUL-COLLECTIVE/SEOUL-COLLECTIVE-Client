'use client'

import SaveBtn from '@/components/Buttons/SaveBtn'
import { getArticleById } from '@/utils/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Article } from '@/types/contentful'
import { formatDate } from '@/utils/dateFormat'

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

  const formattedDate = formatDate(article?.dateTime || 'month, date year')

  if (loading) return <div>Loading...</div>
  if (!article) return <p>Not found</p>

  const handleSave = () => {
    alert('저장되었습니다.')
  }

  return (
    <article className="prose max-w-5xl mx-auto p-6">
      <h1 className="text-[3rem] font-medium whitespace-pre-line break-words mb-2 leading-tight">
        {article.title.replace(/\\n/g, '\n')}
      </h1>

      <div className="flex gap-8 font-bold text-[0.7rem] uppercase mb-6">
        <div>BY {article.editor}</div>
        <div>PUBLISHED ON {formattedDate}</div>
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

            // ✅ VideoEmbed (Entry) - YouTube, Instagram, TikTok 지원
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
                  // YouTube URL을 embed URL로 변환
                  let embedUrl = url

                  if (url.includes('youtu.be/')) {
                    const videoId = url.split('youtu.be/')[1].split('?')[0]
                    embedUrl = `https://www.youtube.com/embed/${videoId}`
                  } else if (url.includes('watch?v=')) {
                    embedUrl = url.replace('watch?v=', 'embed/')
                  } else if (url.includes('youtube.com/v/')) {
                    embedUrl = url.replace('/v/', '/embed/')
                  }

                  console.log('YouTube - Original URL:', url)
                  console.log('YouTube - Converted embed URL:', embedUrl)

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
                } else if (platform === 'instagram' && url) {
                  // Instagram URL을 embed URL로 변환
                  let embedUrl = url

                  // Instagram embed URL 형식: https://www.instagram.com/reel/ID/embed/
                  if (url.includes('/reel/')) {
                    // https://www.instagram.com/reel/DOyxprEkrPF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==
                    // -> https://www.instagram.com/reel/DOyxprEkrPF/embed/
                    embedUrl = url.split('?')[0] + (url.endsWith('/') ? 'embed/' : '/embed/')
                  } else if (url.includes('/p/')) {
                    // 일반 포스트도 지원
                    embedUrl = url.split('?')[0] + (url.endsWith('/') ? 'embed/' : '/embed/')
                  }

                  console.log('Instagram - Original URL:', url)
                  console.log('Instagram - Converted embed URL:', embedUrl)

                  return (
                    <div className="my-6">
                      <iframe
                        src={embedUrl}
                        title="Instagram post"
                        width="400"
                        height="480"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency={true}
                        className="max-w-full mx-auto rounded-lg"
                      />
                    </div>
                  )
                } else if (platform === 'tiktok' && url) {
                  // TikTok URL을 embed URL로 변환
                  let embedUrl = url

                  // TikTok embed URL 형식: https://www.tiktok.com/embed/videoId
                  if (url.includes('/video/')) {
                    const videoId = url.split('/video/')[1].split('?')[0]
                    embedUrl = `https://www.tiktok.com/embed/${videoId}`
                  }

                  console.log('TikTok - Original URL:', url)
                  console.log('TikTok - Converted embed URL:', embedUrl)

                  return (
                    <div className="my-6 flex justify-center">
                      <div className="w-full max-w-sm">
                        <iframe
                          src={embedUrl}
                          title="TikTok video"
                          width="325"
                          height="580"
                          frameBorder="0"
                          scrolling="no"
                          allow="encrypted-media"
                          className="rounded-lg mx-auto"
                        />
                      </div>
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
