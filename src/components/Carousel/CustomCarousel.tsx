'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ShoppingCard from '../Cards/ShoppingCard'
import { shoppingData } from '@/dummies/section-data'

type CarouselProps = {
  category: string
  isshopping?: boolean
}

const data = [
  {
    id: 1,
    title: 'MAC’s Viral Alone Time Lipstick Is the Perfect ‘90s Mude',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 2,
    title: 'Fall 2025’s Biggest Nail Trends Include Chocolate Shades and Retro Prints',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 3,
    title: 'These 12 fall-Ready Nail Polish Colors Will Upgrade Your September Mani',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 4,
    title: 'MAC’s Viral Alone Time Lipstick Is the Perfect ‘90s Mude',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 5,
    title: 'Another Skincare Hit Product for 2025',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 6,
    title: 'New Concealer That Everyone Is Talking About',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 7,
    title: 'Dermatologists Love This Sunscreen',
    imageUrl: '/test/thumbnail_01.jpg',
  },
  {
    id: 8,
    title: 'Top Serum Picks for Fall 2025',
    imageUrl: '/test/thumbnail_01.jpg',
  },
]

export default function CustomCarousel({ category, isshopping }: CarouselProps) {
  return (
    <div className="space-y-6">
      {/* Carousel */}
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        {/* Header */}
        <div className="relative flex items-center justify-center border-b-[1.5px] border-black mb-6">
          <h2 className="text-p28 font-semibold">{category || 'CATEGORY'}</h2>
          <div className="absolute right-0 flex">
            <CarouselPrevious className="border-none shadow-none static transform-none relative left-auto top-auto right-auto bottom-auto translate-x-0 translate-y-0" />
            <CarouselNext className="border-none shadow-none static transform-none relative left-auto top-auto right-auto bottom-auto translate-x-0 translate-y-0" />
          </div>
        </div>

        <CarouselContent>
          {isshopping ? (
            <>
              {shoppingData.products.map((item) => (
                <CarouselItem key={item.id} className="basis-1/4">
                  <ShoppingCard
                    imageUrl={item.imageUrl}
                    brand={item.brand}
                    product={item.name}
                    price={item.price}
                    store={item.retailer}
                    link={item.link}
                    size="big"
                  />
                </CarouselItem>
              ))}
            </>
          ) : (
            <>
              {data.map((item) => (
                <CarouselItem key={item.id} className="basis-1/4">
                  <div className="flex flex-col space-y-4">
                    <div className="relative w-full aspect-[273/203]">
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    </div>
                    <p className="text-base font-semibold whitespace-pre-line text-p15 leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
