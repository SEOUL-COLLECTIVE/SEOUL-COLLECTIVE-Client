'use client'

import type React from 'react'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'

interface CommentInputProps {
  onSubmit: (comment: string) => void
  isLoading?: boolean
}

export default function CommentInput({ onSubmit, isLoading = false }: CommentInputProps) {
  const [comment, setComment] = useState('')

  // 댓글 제출 이벤트
  const handleSubmit = () => {
    if (comment.trim()) {
      /** 댓글 제출 api 연동 */
      onSubmit(comment)
      setComment('')
    }
  }

  // 엔터키로도 제출 가능
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-center gap-3 mb-8">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Please enter your comment."
        className="flex-1 bg-white rounded-full px-6 py-4 text-sm border border-1 border-[#D5D5D5] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all"
      />
      <button
        onClick={handleSubmit}
        disabled={!comment.trim() || isLoading}
        className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
        aria-label="Submit comment"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  )
}
