'use client'

import Image from 'next/image'

interface CommentAuthor {
  name: string
  avatar: string
}

interface Comment {
  id: number
  author: CommentAuthor
  content: string
  postedDate: string
}

interface CommentListProps {
  comments: Comment[]
}

// 댓글 작성 시간과 현재 시간을 비교하여 표시
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      return diffMins <= 1 ? 'now' : `${diffMins}m ago`
    }
    return `${diffHours}h ago`
  }
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
            <Image
              src={comment.author.avatar || '/placeholder.svg'}
              alt={comment.author.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-bold text-sm">{comment.author.name}</span>
              <span className="text-gray-500 text-xs">{formatDate(comment.postedDate)}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
