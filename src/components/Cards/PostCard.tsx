'use client'

import { Heart, Bookmark } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

interface Post {
  id: number
  category: string
  title: string
  postedDate: string
  updatedDate?: string
  author: {
    name: string
    avatar: string
  }
  content: string
  imageUrls?: string[]
  tags: string[]
  likes: number
  replies: number
  type?: string
}

interface PostCardProps {
  posts: Post[]
  onTagClick?: (tag: string) => void
}

export default function PostCard({ posts, onTagClick }: PostCardProps) {
  // posts prop이 없으면 빈 배열 사용
  const displayPosts = posts || []
  const router = useRouter()

  // 해당 포스트 상세페이지로 전환
  const handleShowDetail = (id: number) => {
    router.push(ROUTES.beautyTalk.postDetail(id))
  }

  return (
    <div className="min-h-screen">
      {displayPosts.map((post) => (
        <div key={post.id} className="w-full bg-white rounded-sm shadow-md p-8 mb-8">
          {post.category && <span className="text-[0.75rem] mb-2 font-bold"> {post.category}</span>}

          {/* Title */}
          <div className="flex justify-between items-start mb-4">
            <h1
              className="text-[1.25rem] font-bold cursor-pointer hover:underline"
              onClick={() => handleShowDetail(post.id)}
            >
              {post.title}
            </h1>
            <Bookmark className="w-6 h-6 text-gray-400 cursor-pointer hover:fill-current" />
          </div>

          {/* Post Meta */}
          <div className="text-gray-600 text-[0.75rem] mb-4">
            Posted {post.postedDate} {post.updatedDate && `| Updated ${post.updatedDate}`}
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden relative">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-[0.875rem]">{post.author.name}</span>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-[0.875rem] leading-relaxed mb-2">
              {post.content.length > 150 ? (
                <>
                  {post.content.substring(0, 150)}{' '}
                  <span
                    className="text-blue-600 hover:underline"
                    onClick={() => handleShowDetail(post.id)}
                  >
                    ...read more
                  </span>
                </>
              ) : (
                post.content
              )}
            </p>
          </div>

          {/* Images */}
          {post.imageUrls && post.imageUrls.length > 0 && (
            <div className="mb-6 flex gap-2">
              {post.imageUrls.slice(0, 3).map((imageUrl, index) => (
                <div key={index} className="relative aspect-[4/3] w-[18rem] max-w-md">
                  <Image
                    src={imageUrl}
                    alt={`${post.title} - image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {post.tags.map((tag, idx) => (
              <button
                key={idx}
                className="bg-black text-white px-2 rounded-md text-[0.75rem] font-bold hover:bg-gray-800"
                onClick={() => onTagClick && onTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-8">
            {/* Like Btn */}
            <button className="flex items-center gap-2 hover:text-red-500 transition-colors text-[0.875rem]">
              <Heart className="w-6 h-6" />
              <span className="font-semibold">{post.likes}</span>
            </button>

            <div className="h-6 w-[0.0825rem] bg-gray-300"></div>

            {/* Replies */}
            <span
              className="cursor-pointer hover:underline"
              onClick={() => handleShowDetail(post.id)}
            >
              {post.replies} Replies
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
