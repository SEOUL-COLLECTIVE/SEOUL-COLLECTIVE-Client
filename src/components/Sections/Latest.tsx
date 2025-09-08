'use client'

import ContentsCard from '../Cards/ContentsCard'

interface LatestItem {
  id: number
  section: string
  title: string
  category: string
  imageUrl: string
}

const latestData: LatestItem[] = [
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
  {
    id: 4,
    section: 'testDrive',
    title: '8 Best Mineral Body Sunscreens\nfor Gentle All-Over Protection',
    category: 'SUNSCREEN',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 5,
    section: 'testDrive',
    title: '9 Best Melasma Concealers to\nEven Out Your Skin Tone in Seconds',
    category: 'MAKEUP',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 6,
    section: 'testDrive',
    title: 'We Tried SkinCeuticals C E Ferulic\n— And We Have Thoughts',
    category: 'SKIN',
    imageUrl: '/test/thumbnail_01.jpg',
  },
]

export default function Latest() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="text-[30pt] border-b-[1.5px] border-black w-[400px] font-semibold">
        THE LATEST
      </div>
      <div className="grid grid-cols-3 grid-raws-2 gap-8 gap-y-14">
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
