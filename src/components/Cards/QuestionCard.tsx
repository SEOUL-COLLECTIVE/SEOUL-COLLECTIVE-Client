'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ThumbsUp, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import AnswerModal from '@/components/Modals/AnswerModal'

interface QuestionCardProps {
  expertName: string
  expertTitle: string
  expertImage: string
  question: string
  answer: string
  category: string
  likes: number
}

export function QuestionCard({
  expertName,
  expertTitle,
  expertImage,
  question,
  answer,
  category,
  likes,
}: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const truncatedAnswer = answer.length > 200 ? answer.slice(0, 200) + '...' : answer

  return (
    <>
      <Card className="flex h-full flex-col shadow-none bg-white">
        <CardContent className="flex flex-1 flex-col p-6">
          {/* Expert Info */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={expertImage || '/thumbnail_01.jpg'}
                alt={expertName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{expertTitle}</p>
              <p className="text-sm text-muted-foreground">{expertName}</p>
            </div>
          </div>

          {/* Question */}
          <h3 className="mb-3 text-base font-semibold leading-snug text-foreground">{question}</h3>

          {/* Answer Preview - Show only 200 characters */}
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {truncatedAnswer}
          </p>

          {/* Footer */}
          <div className="flex items-center w-full justify-between border-b border-border pb-4">
            <span className="text-xs text-muted-foreground"># {category}</span>
            <button
              onClick={() => setIsOpen(true)}
              className="text-xs font-medium text-foreground hover:text-primary"
            >
              Read more
            </button>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-sm">{likes}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Answer Modal */}
      <AnswerModal
        open={isOpen}
        onOpenChange={setIsOpen}
        expertImage={expertImage}
        expertName={expertName}
        expertTitle={expertTitle}
        question={question}
        answer={answer}
        category={category}
        likes={likes}
      />
    </>
  )
}
