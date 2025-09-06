'use client'

import ContentsCard from '../Cards/ContentsCard'

interface TestDriveItem {
  id: number
  section: 'testDrive'
  title: string
  category: string
  imageUrl: string
}

const testDriveData: TestDriveItem[] = [
  {
    id: 1,
    section: 'testDrive',
    title: '8 Best Mineral Body Sunscreens\nfor Gentle All-Over Protection',
    category: 'SUNSCREEN',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 2,
    section: 'testDrive',
    title: '9 Best Melasma Concealers to\nEven Out Your Skin Tone in Seconds',
    category: 'MAKEUP',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 3,
    section: 'testDrive',
    title: 'We Tried SkinCeuticals C E Ferulic\n— And We Have Thoughts',
    category: 'SKIN',
    imageUrl: '/test/thumbnail_01.jpg',
  },
]

export default function TestDrive() {
  return (
    <div className="bg-yellow py-[3.543rem] -mx-[5.375rem]">
      <div className="text-center px-[5.375rem] flex flex-col">
        <div className="font-futura-bold text-p26">TEST DRIVE</div>
        <div className="font-futura text-p16 pb-10">{`Browse SC-approved beauty products that we've put to the test ourselves`}</div>
        <div className="grid grid-cols-3 text-start gap-x-10">
          {testDriveData.map((item) => (
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
    </div>
  )
}
