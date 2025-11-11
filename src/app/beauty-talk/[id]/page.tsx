'use client'

import { useState } from 'react'
import { Heart, Bookmark } from 'lucide-react'
import Image from 'next/image'
import type { JSONContent } from '@tiptap/core'
import TiptapViewer from '@/components/Viewer/TiptapViewer'
import CommentInput from '@/components/Inputs/CommentInput'
import CommentList from '@/components/Lists/CommentList'
import { useRouter } from 'next/navigation'
import { getBeautyTalkHref } from '@/constants/routes'

export interface Post {
  id: number
  category: string
  title: string
  postedDate: string
  updatedDate?: string
  author: { name: string; avatar: string }
  contents: JSONContent // TipTap 문서(JSON)
  tags: string[]
  likes: number
  isLiked: boolean
  imageUrls?: string[]
  replies: {
    id: number
    author: { name: string; avatar: string }
    content: string
    postedDate: string
  }[]
}

const dummyPostWithBlocks: Post = {
  id: 1,
  category: 'Skincare',
  title: 'My 10-Step Korean Skincare Routine',
  postedDate: '2025-09-23T19:45:00Z',
  author: { name: 'KBeautyFan', avatar: '/test/community_profile01.jpg' },

  // TipTap JSON (doc)
  contents: {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'My 10-Step Korean Skincare Routine' }],
      },
      { type: 'horizontalRule' },

      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Skincare',
            marks: [
              { type: 'underline' },
              { type: 'link', attrs: { href: '#', target: null, rel: null, class: null } },
            ],
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          {
            type: 'text',
            text: 'Dr. Dennis Gross Alpha Beta® Universal Daily Peel Pads (30 + 5 bonus)',
            marks: [{ type: 'bold' }],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'I want to incorporate ' },
          { type: 'text', text: 'exfoliation', marks: [{ type: 'italic' }] },
          {
            type: 'text',
            text: ' more to help with texture, pores, fine lines, discoloration. Tried samples and was impressed.',
          },
        ],
      },

      {
        type: 'image',
        attrs: {
          src: '/test/community_img03.jpg',
          alt: 'Skincare flatlay',
          title: 'Recent pickups & favorites',
        },
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Makeup', marks: [{ type: 'bold' }] }],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Fenty Beauty Lined + Luminized 2-Piece Lip Set',
                    marks: [{ type: 'bold' }],
                  },
                  { type: 'text', text: ' — favorite glosses; great value.' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Natasha Denona Hy-Glam Foundation (P1)',
                    marks: [{ type: 'bold' }],
                  },
                  { type: 'text', text: ' — excited to try a new full-coverage base.' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Pat McGrath Labs Gilded Nirvana Mega Eyeshadow Palette',
                    marks: [{ type: 'bold' }],
                  },
                  { type: 'text', text: ' — shimmering jewel tones are calling me.' },
                ],
              },
            ],
          },
        ],
      },

      {
        type: 'image',
        attrs: {
          src: '/test/community_img02.jpg',
          alt: 'Eye look collage',
          title: 'Soft shimmer look with neutral browns',
        },
      },

      {
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Do you have similar K-beauty routines or product recs? Drop them below!',
              },
            ],
          },
        ],
      },
    ],
  },

  tags: ['K-Beauty', 'Skincare Routine'],
  likes: 567,
  isLiked: false,
  imageUrls: ['/images/skincare_flatlay.jpg', '/images/eyeshadow_collage.jpg'],
  replies: [
    {
      id: 1,
      author: { name: 'CookieGirl1', avatar: '/test/community_profile02.jpg' },
      content:
        'Honestly, this behavior (the aftermath not his decision to leave) is a big red flag. It signals that in a marriage he would assume your needs took a backseat to his.',
      postedDate: '2025-09-23T20:10:00Z',
    },
  ],
}

export default function BTDetailPage() {
  const posts: Post[] = [dummyPostWithBlocks]
  const [post, setPost] = useState(posts[0])
  const router = useRouter()

  // 댓글 추가 이벤트 (임의로 프론트에서 뜨도록 설정해둠)
  const handleAddComment = (commentText: string) => {
    const newComment = {
      id: post.replies.length + 1,
      author: { name: 'You', avatar: '/test/community_profile01.jpg' },
      content: commentText,
      postedDate: new Date().toISOString(),
    }
    setPost({
      ...post,
      replies: [...post.replies, newComment],
    })
  }

  return (
    <div className="min-h-screen">
      {posts.map((post) => (
        <div key={post.id} className="w-[900px] bg-white rounded-sm shadow-md p-8 mb-8">
          {post.category && <span className="text-[0.75rem] mb-2 font-bold">{post.category}</span>}

          <div className="flex justify-between items-start mb-4">
            <h1 className="text-[1.25rem] font-bold cursor-pointer hover:underline">
              {post.title}
            </h1>
            <Bookmark className="w-6 h-6 text-gray-400 cursor-pointer" />
          </div>

          <div className="text-gray-600 text-[0.75rem] mb-4">
            Posted {new Date(post.postedDate).toLocaleString()}
            {post.updatedDate && ` | Updated ${new Date(post.updatedDate).toLocaleString()}`}
          </div>

          <div className="flex items-center gap-3 mb-6">
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

          <div className="mb-6">
            <TiptapViewer json={post.contents} />
          </div>

          <div className="flex gap-3 mb-6 flex-wrap">
            {post.tags.map((tag) => (
              <button
                key={tag}
                className="bg-black text-white px-2 rounded-md text-[0.75rem] font-bold hover:bg-gray-800"
                onClick={() => router.push(getBeautyTalkHref({ tag }))}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 hover:text-red-500 transition-colors text-[0.875rem]">
              <Heart className="w-6 h-6" />
              <span className="font-semibold">{post.likes}</span>
            </button>

            <div className="h-6 w-px bg-gray-300" />

            <span className="cursor-pointer hover:underline">{post.replies.length} Replies</span>
          </div>

          {/* Comment Section */}
          <div className="my-12">
            <CommentInput onSubmit={handleAddComment} />
            <CommentList comments={post.replies} />
          </div>
        </div>
      ))}
    </div>
  )
}
