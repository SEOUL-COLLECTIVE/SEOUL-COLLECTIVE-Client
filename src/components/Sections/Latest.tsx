'use client'

import ContentsCard from '../Cards/ContentsCard'
import { latestData } from '@/data/sectionData'

export default function Latest() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="text-[30pt] border-b-[1.5px] border-black w-[400px] font-semibold">
        THE LATEST
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-8 gap-y-14">
        {latestData.map((item) => (
          <ContentsCard
            key={item.id}
            section={item.section}
            title={item.title}
            category={item.category}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
