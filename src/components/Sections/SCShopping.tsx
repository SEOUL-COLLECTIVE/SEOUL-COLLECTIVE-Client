'use client'

import ContentsCard from '../Cards/ContentsCard'
import ShoppingCard from '../Cards/ShoppingCard'

const shoppingData = {
  products: [
    {
      id: 1,
      brand: 'SUMMER FRIDAYS',
      name: 'Lip Butter Balm',
      price: '$24',
      retailer: 'SEPHORA',
      imageUrl: '/test/thumbnail_01.jpg',
      link: 'https://www.amazon.com/%ED%99%94%EC%9E%A5%ED%92%88/s?k=%ED%99%94%EC%9E%A5%ED%92%88',
    },
    {
      id: 2,
      brand: 'FARMACY',
      name: 'Lip Smoothie Peptide Lip Balm',
      price: '$22',
      retailer: 'AMAZON',
      imageUrl: '/test/thumbnail_01.jpg',
      link: 'https://www.amazon.com/%ED%99%94%EC%9E%A5%ED%92%88/s?k=%ED%99%94%EC%9E%A5%ED%92%88',
    },
    {
      id: 3,
      brand: 'NATURIUM',
      name: 'Phyto-Glow Lip Balm',
      price: '$10',
      retailer: 'AMAZON',
      imageUrl: '/test/thumbnail_01.jpg',
      link: 'https://www.amazon.com/%ED%99%94%EC%9E%A5%ED%92%88/s?k=%ED%99%94%EC%9E%A5%ED%92%88',
    },
    {
      id: 4,
      brand: 'SUMMER FRIDAYS',
      name: 'Lip Butter Balm',
      price: '$24',
      retailer: 'SEPHORA',
      imageUrl: '/test/thumbnail_01.jpg',
      link: 'https://www.amazon.com/%ED%99%94%EC%9E%A5%ED%92%88/s?k=%ED%99%94%EC%9E%A5%ED%92%88',
    },
    {
      id: 5,
      brand: 'FARMACY',
      name: 'Lip Smoothie Peptide Lip Balm',
      price: '$22',
      retailer: 'AMAZON',
      imageUrl: '/test/thumbnail_01.jpg',
      link: 'https://www.amazon.com/%ED%99%94%EC%9E%A5%ED%92%88/s?k=%ED%99%94%EC%9E%A5%ED%92%88',
    },
    {
      id: 6,
      brand: 'NATURIUM',
      name: 'Phyto-Glow Lip Balm',
      price: '$10',
      retailer: 'AMAZON',
      imageUrl: '/test/thumbnail_01.jpg',
      link: 'https://www.amazon.com/%ED%99%94%EC%9E%A5%ED%92%88/s?k=%ED%99%94%EC%9E%A5%ED%92%88',
    },
  ],
}

export default function SCShopping() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="text-[30pt] border-b-[1.5px] border-black w-[400px] font-semibold">
        SC SHOPPING
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-8">
        <div>
          <ContentsCard
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
