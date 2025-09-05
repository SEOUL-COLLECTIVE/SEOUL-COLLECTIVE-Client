'use client'
import ContentsCard from '../Cards/ContentsCard'

export default function Main() {
  return (
    <div className="grid grid-cols-[6.9fr_3.1fr] grid-rows-2 gap-8">
      {/* 왼쪽 큰 박스 (2열 차지) */}
      <div className="row-span-2">
        <ContentsCard
          section="main"
          title={`Lazy Girl Night Care:\nSimple Skincare for Overnight Beauty`}
          category="SKIN"
          imageUrl="/test/thumbnail_01.jpg"
        />
      </div>

      {/* 오른쪽 두 박스 */}
      <div>
        <ContentsCard
          section="sub"
          title={'The Best New Products \nSC Editors tried in August'}
          category="SKIN"
          imageUrl="/test/thumbnail_01.jpg"
        />
      </div>
      <div>
        <ContentsCard
          section="sub"
          title={'How to Spot Authentic vs\n Fake K-Beauty Products'}
          category="SKIN"
          imageUrl="/test/thumbnail_01.jpg"
        />
      </div>
    </div>
  )
}
