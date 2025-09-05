'use client'
import ContentsCard from '../Cards/ContentsCard'

export default function Main() {
  return (
    <div className="grid grid-cols-[7fr_3fr] grid-rows-2 gap-4">
      {/* 왼쪽 큰 박스 (2열 차지) */}
      <div className="row-span-2 bg-red-600">
        <ContentsCard
          section="main"
          title="Lazy Girl Night Care:
          Simple Skincare for Overnight Beauty"
          category="SKIN"
          imageUrl="/test/thumbnail_01.jpg"
        />
      </div>

      {/* 오른쪽 두 박스 */}
      <div className="bg-red-600">
        <ContentsCard
          section="sub"
          title="Lazy Girl Night Care: Simple Skincare for Overnight Beauty"
          category="SKIN"
          imageUrl="/test/thumbnail_01.jpg"
        />
      </div>
      <div className="bg-red-600">
        <ContentsCard
          section="sub"
          title="Lazy Girl Night Care: Simple Skincare for Overnight Beauty"
          category="SKIN"
          imageUrl="/test/thumbnail_01.jpg"
        />
      </div>
    </div>
  )
}
