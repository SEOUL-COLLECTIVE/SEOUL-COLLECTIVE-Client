'use client'

import ContentsCard from '../Cards/ContentsCard'
import { testDriveData } from '@/constants/sectionData'

export default function TestDrive() {
  return (
    <div className="bg-yellow py-[3.543rem] -mx-[5.375rem]">
      <div className="text-center px-[3.375rem] flex flex-col">
        <div className="font-futura-bold text-p50">TEST DRIVE</div>
        <div className="font-bold text-p17 pb-10">{`Browse SC-approved beauty products that we've put to the test ourselves`}</div>
        <div className="grid grid-cols-3 text-start gap-x-10">
          {testDriveData.map((item) => (
            <ContentsCard
              key={item.id}
              id={item.id}
              section={item.section}
              title={item.title}
              category={item.category}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
