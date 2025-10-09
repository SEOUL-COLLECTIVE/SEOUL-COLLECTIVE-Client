'use client'

import { use } from 'react'
import SaveBtn from '@/components/Buttons/SaveBtn'
import { useArticle } from '@/hooks/use-contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Image from 'next/image'
import { formatDate } from '@/utils/dateFormat'

interface PageProps {
  params: Promise<{ category: string; subcategory: string; id: string }>
}

export default function ArticlePage({ params }: PageProps) {
  const { id } = use(params)

  // TanStack Query hook 사용 (캐시에서 가져옴)
  const { data: article, isLoading, error } = useArticle(id)

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="prose max-w-5xl mx-auto p-6">
        <div className="flex justify-center items-center h-96">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  // 에러 또는 아티클이 없는 경우
  if (error || !article) {
    return (
      <div className="prose max-w-5xl mx-auto p-6">
        <p>Not found</p>
      </div>
    )
  }

  const formattedDate = article.dateTime ? formatDate(article.dateTime) : null

  return (
    <article className="prose max-w-5xl mx-auto p-6">
      <h1 className="text-[3rem] font-medium whitespace-pre-line break-words mb-2 leading-tight">
        {article.title.replace(/\\n/g, '\n')}
      </h1>

      <div className="flex gap-8 font-bold text-[0.7rem] uppercase mb-6">
        {article.editor ? <div>BY {article.editor}</div> : null}
        {formattedDate ? <div>PUBLISHED ON {formattedDate}</div> : null}
      </div>

      <div className="mb-8">
        <SaveBtn />
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

            // ✅ 이미지 (Asset)
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              const assetId = node.data?.target?.sys?.id
              if (!assetId) return null

              const asset = article.assets.get(assetId)
              if (!asset) return null

              const url = asset.fields.file?.url ? `https:${asset.fields.file.url}` : null
              if (!url) return null

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
              const entryId = node.data?.target?.sys?.id
              if (!entryId) return null

              const entry = article.entries.get(entryId)
              if (!entry) return null

              const contentTypeId = entry.sys.contentType?.sys.id
              if (contentTypeId === 'videoEmbed' || contentTypeId === 'VideoEmbed') {
                const { platform, url } = entry.fields as { platform: string; url: string }

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

                  return (
                    <div className="my-6 aspect-video">
                      <iframe
                        src={embedUrl}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                        loading="lazy"
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

                  return (
                    <div className="my-6">
                      <iframe
                        src={embedUrl}
                        title="Instagram post"
                        width="400"
                        height="480"
                        frameBorder="0"
                        scrolling="no"
                        className="max-w-full mx-auto rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  )
                } else if (platform === 'tiktok' && url) {
                  let embedUrl = url

                  if (url.includes('/video/')) {
                    const videoId = url.split('/video/')[1].split('?')[0]
                    embedUrl = `https://www.tiktok.com/embed/${videoId}`
                  }

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
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )
                }
              }

              return null
            },
          },
        })}
      </div>
    </article>
  )
}
