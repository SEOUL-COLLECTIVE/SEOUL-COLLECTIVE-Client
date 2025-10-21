'use client'

import ContentsCard from '../Cards/ContentsCard'
import ShoppingCard from '../Cards/ShoppingCard'
import { shoppingData } from '@/dummys/section-data'

export default function SCShopping() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="text-[30pt] border-b-[1.5px] border-black w-[400px] font-semibold">
        SC SHOPPING
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-8">
        <div>
          <ContentsCard
            id="1"
            section="shopping"
            imageUrl="/test/thumbnail_01.jpg"
            title={'Hailey Bieber’s Staple Fall\nJeans Are On Sale For Under $75'}
            category="LIPS"
          />
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-5">
          {shoppingData.products.map((item) => (
            <ShoppingCard
              key={item.id}
              imageUrl={item.imageUrl}
              brand={item.brand}
              product={item.name}
              price={item.price}
              store={item.retailer}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
