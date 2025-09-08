// section 공용 card type
export type CardTypes = {
  id: number
  imageUrl: string
  category: 'main' | 'sub' | 'testDrive' | 'shopping' | 'latest'
  title: string
  section: string
}

// section마다 달라지는 card 관련 스타일 type
export type SectionStyle = {
  section: string
  font: {
    category: string
    title: string
  }
  gap: {
    image_category: string
    category_title: string
  }
  image_ratio: string
}
