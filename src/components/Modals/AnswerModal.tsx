'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ThumbsUp, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface AnswerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expertImage: string
  expertName: string
  expertTitle: string
  category: string
  question: string
  answer: string
  likes: number
}

export default function AnswerModal({
  open,
  onOpenChange,
  expertImage,
  expertName,
  expertTitle,
  category,
  question,
  answer,
  likes,
}: AnswerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          {/* Expert Info in Modal */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={expertImage || '/thumbnail_01.jpg'}
                alt={expertName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">{expertTitle}</p>
              <p className="text-sm text-muted-foreground">{expertName}</p>
            </div>
          </div>
          <DialogTitle className="text-xl font-bold leading-tight text-balance">
            {question}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Category Tag */}
          <div className="inline-block rounded-full bg-muted px-3 py-1 bg-gray-100">
            <span className="text-xs font-medium text-muted-foreground"># {category}</span>
          </div>

          {/* Full Answer */}
          <div className="prose prose-sm max-w-none">
            <p className="text-base leading-relaxed text-foreground whitespace-pre-line">
              {answer}
            </p>
          </div>

          {/* Actions in Modal */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
