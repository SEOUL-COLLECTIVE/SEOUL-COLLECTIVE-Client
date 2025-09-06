'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type ContentsCardProps = {
  imageUrl: string
  brand: string
  product: string
  price: string
  store: string
  link: string
}

export default function ShoppingCard({
  imageUrl,
  brand,
  product,
  price,
  store,
  link,
}: ContentsCardProps) {
  const router = useRouter()
  const onClickCard = (link: string) => {
    router.push(link)
  }
  return (
    <div
      className="flex h-full w-full cursor-pointer flex-col font-semibold gap-y-2"
      onClick={() => onClickCard(link)}
    >
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-[187/254]">
        <Image src={imageUrl} alt="thumbnail" fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1 text-[12px] font-semibold">
        <div className="">{brand}</div>
        <div className="line-clamp-1 whitespace-pre-line break-words">{product}</div>
        <div className="">{price}</div>
        <div className="">{store}</div>
      </div>
    </div>
  )
}
