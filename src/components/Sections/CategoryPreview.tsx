'use client'

import CustomCarousel from '../ Carousel/CustomCarousel'

export default function CategoryPreview() {
  return (
    <div className="flex flex-col gap-y-24 mb-24">
      <CustomCarousel category="SKIN" />
      <CustomCarousel category="MAKEUP" />
      <CustomCarousel category="HAIR" />
      <CustomCarousel category="NAIL" />
    </div>
  )
}
