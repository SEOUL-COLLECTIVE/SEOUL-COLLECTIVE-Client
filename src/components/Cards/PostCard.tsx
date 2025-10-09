'use client'

import { Heart, Bookmark } from 'lucide-react'
import Image from 'next/image'

// 더미 데이터
const dummyPosts = [
  {
    id: 1,
    category: 'SKIN',
    title: 'Monthly Favorites: September 2025 Edition!',
    postedDate: '09-23-2025 09:47',
    updatedDate: 'yesterday',
    author: {
      name: 'KhyleyBT',
      avatar: '/test/thumbnail_01.jpg',
      badges: ['ADMIN', 'ROUGE'],
    },
    content:
      "Happy fall—officially—BIC, I hope September has treated you well! I'm in my annual cliché fall girl cycle, hyped about the leaves changing and cozy sweaters. Here are my top picks for this month!",
    imageUrl: '/test/thumbnail_01.jpg',
    tags: ['Community Favorites', 'Trending at Sephora'],
    likes: 25,
    replies: 76,
  },
  {
    id: 2,
    category: 'Skincare',
    title: 'My Holy Grail Products for Dry Skin in Winter',
    postedDate: '09-29-2025 14:22',
    updatedDate: 'today',
    author: {
      name: 'BeautyLover_28',
      avatar: '/test/thumbnail_01.jpg',
      badges: ['VIB'],
    },
    content:
      'Winter is coming and my skin is already feeling it! After years of trial and error, I finally found the perfect routine that keeps my skin hydrated and glowing all season long.',
    imageUrl: '/test/thumbnail_01.jpg',
    tags: ['Skincare', 'Winter Essentials'],
    likes: 142,
    replies: 34,
  },
  {
    id: 3,
    category: 'Makeup',
    title: 'Recreating the Trending Clean Girl Makeup Look',
    postedDate: '09-28-2025 11:05',
    updatedDate: '2 hours ago',
    author: {
      name: 'MakeupMaven',
      avatar: '/test/thumbnail_01.jpg',
      badges: ['ROUGE', 'INFLUENCER'],
    },
    content:
      "The clean girl aesthetic is everywhere right now! I've been perfecting this natural, dewy look and wanted to share my step-by-step process and product recommendations with you all.",
    imageUrl: '/test/thumbnail_01.jpg',
    tags: ['Makeup Tutorial', 'Trending'],
    likes: 389,
    replies: 128,
  },
  {
    id: 4,
    category: 'Haircare',
    title: 'How I Repaired My Heat-Damaged Hair in 3 Months',
    postedDate: '09-27-2025 16:33',
    author: {
      name: 'HairGoals_',
      avatar: '/test/thumbnail_01.jpg',
      badges: ['VIB'],
    },
    content:
      "My hair was completely fried from daily heat styling. I thought I'd have to cut it all off, but these products literally saved my hair! Here's my complete hair repair journey.",
    imageUrl: '/test/thumbnail_01.jpg',
    tags: ['Haircare', 'Hair Repair'],
    likes: 267,
    replies: 91,
  },
]

export default function PostCard() {
  return (
    <div className="min-h-screen">
      {dummyPosts.map((post) => (
        <div key={post.id} className="w-full bg-white rounded-sm shadow-md p-8 mb-8">
          {post.category && <span className="text-[0.75rem] mb-2 font-bold"> {post.category}</span>}

          {/* Title */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-[1.25rem] font-bold cursor-pointer hover:underline">
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
                  <a href="#" className="text-blue-600 hover:underline">
                    ...read more
                  </a>
                </>
              ) : (
                post.content
              )}
            </p>
          </div>

          {/* Image */}
          {post.imageUrl && (
            <div className="mb-6 relative w-[18rem] max-w-md aspect-[4/3]">
              <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {/* Tags */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {post.tags.map((tag, idx) => (
              <button
                key={idx}
                className="bg-black text-white px-2 rounded-md text-[0.75rem] font-bold hover:bg-gray-800"
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
            <span className="cursor-pointer hover:underline">{post.replies} Replies</span>
          </div>
        </div>
      ))}
    </div>
  )
}
