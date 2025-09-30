'use client'

import Image from 'next/image'
import Link from 'next/link'

type ShoppingCardProps = {
  imageUrl: string
  brand: string
  product: string
  price: string
  store: string
  link: string
  size?: 'default' | 'big' // 사이즈 옵션 추가
}

export default function ShoppingCard({
  imageUrl,
  brand,
  product,
  price,
  store,
  link,
  size = 'default', // 기본값
}: ShoppingCardProps) {
  // 사이즈에 따른 텍스트 크기 결정
  const textSize = size === 'big' ? 'text-[1rem]' : 'text-[0.75rem]'

  return (
    <Link
      rel="noopener noreferrer nofollow"
      className="flex h-full w-full cursor-pointer flex-col font-semibold gap-y-2"
      href={link}
      target="_blank"
      aria-label={`${brand} ${product} - ${price} @ ${store}`}
    >
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-[187/254]">
        <Image src={imageUrl} alt={`${brand} ${product}`} fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className={`flex flex-col gap-1 ${textSize}`}>
        <div className="">{brand}</div>
        <div className="line-clamp-1 whitespace-pre-line break-words">{product}</div>
        <div className="">{price}</div>
        <div className="">{store}</div>
      </div>
    </Link>
  )
}
