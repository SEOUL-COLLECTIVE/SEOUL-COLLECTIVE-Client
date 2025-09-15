import { Document } from '@contentful/rich-text-types'

// 기본 sys 정보
export type Sys = {
  id: string
  contentType?: {
    sys: {
      id: string
    }
  }
}

// 제네릭 Entry 타입
export type Entry<T> = {
  sys: Sys
  fields: T
}

// Asset (이미지, 미디어)
export type Asset = {
  sys: Sys
  fields: {
    file: { url: string }
    title?: string
  }
}

// 카테고리
export type Category = {
  sys: Sys
  fields: {
    name: string
    slug?: string
  }
}

// 서브카테고리
export type Subcategory = {
  sys: Sys
  fields: {
    name: string
    slug?: string
  }
}

// Article 원본 필드
export type ArticleFields = {
  title: string
  dateTime?: string
  thumbnail?: Asset
  contentsDetail: Document
  category?: Entry<Category>
  subcategory?: Entry<Subcategory>
  section?: string
  editor?: string
}

// Article 최종 리턴 타입 (프론트에서 사용하는 형태)
// Article 최종 리턴 타입 (프론트에서 사용하는 형태)
export type Article = {
  id: string
  title: string
  dateTime?: string
  thumbnail: string | null
  contentsDetail: Document
  category: { name: string; slug: string } | null
  subcategory: { name: string; slug: string } | null
  section: string | null
  editor?: string
}
