'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function ExpertInfo() {
  return (
    <Card className="h-full border-none shadow-none">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Expert This Month</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Questions for this month&apos;s experts are accepted all month. Each expert will select
            6 questions to answer, and answers will be posted on the 1st of next month.
          </p>
        </div>
        <Button className="mt-6 w-full rounded-full bg-purple text-white font-bold" size="lg">
          Ask a Question
        </Button>
      </CardContent>
    </Card>
  )
}
