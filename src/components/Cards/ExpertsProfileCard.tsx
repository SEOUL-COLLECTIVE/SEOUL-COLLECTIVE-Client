'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface ExpertProfileProps {
  name: string
  title: string
  image: string
  description: string
}

export function ExpertProfile({ name, title, image, description }: ExpertProfileProps) {
  return (
    <Card className="overflow-hidden bg-white border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Expert Header */}
          <div className="flex items-start gap-4 p-6">
            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden">
              <Image src={image || '/thumbnail.01.jpg'} alt={name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{name}</h3>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{title}</p>
            </div>
          </div>

          {/* Expert Description */}
          <div className="p-6">
            <h4 className="mb-2 text-sm font-bold text-foreground">Ask the Expert - {name}</h4>
            <p className="text-sm leading-relaxed text-gray-500 font-semibold">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
