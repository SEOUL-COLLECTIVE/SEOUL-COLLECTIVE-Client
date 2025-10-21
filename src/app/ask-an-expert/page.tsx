'use client'
import Image from 'next/image'
import { ExpertProfile } from '@/components/Cards/ExpertsProfileCard'
import { ExpertInfo } from '@/components/Cards/ExpertInfo'
import { QuestionCard } from '@/components/Cards/QuestionCard'
import { Button } from '@/components/ui/button'
import { CategoryFilter } from '@/components/Buttons/CategoryFilter'
import { expertsymenu } from '@/constants/experts'
import { experts_thismonth, questions } from '@/dummys/experts-data'

export default function page() {
  return (
    <div className="w-screen container mb-24">
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={'/test/expert/ask-experts-bg.png'}
          alt="community thumbnail"
          fill
          className="object-cover"
          priority
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span className="uppercase"></span>
          </div>

          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32">
              <div className="font-bold uppercase">ASK AN EXPERT</div>
            </div>
          </div>
        </div>
      </div>

      {/* 상단 네비게이션 - 버튼 flex line */}
      <div className="flex justify-between pt-10">
        {/* 서브카테고리 네비게이션 */}
        <div>
          {expertsymenu && (
            <div className="flex gap-8 text-p14">
              {expertsymenu.map((subItem) => (
                <div
                  key={subItem.name}
                  className="font-semibold cursor-pointer hover:underline hover:decoration-purple hover:decoration-[0.125rem] underline-offset-[0.4375rem]"
                >
                  {subItem.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <main className="min-h-screen bg-background">
        <div className="mx-auto py-8">
          {/* Expert Profiles Section */}
          <div className="mb-12 grid gap-6 lg:grid-cols-[2fr_2fr_3fr]">
            <div className="lg:col-span-2">
              <div className="grid gap-6 sm:grid-cols-2">
                {experts_thismonth.map((expert, index) => (
                  <ExpertProfile key={index} {...expert} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <ExpertInfo />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <CategoryFilter />
          </div>

          {/* Questions Grid */}
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {questions.map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
          </div>

          {/* More Answers Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] bg-transparent font-bold border-black shadow-none"
            >
              More Answers
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
