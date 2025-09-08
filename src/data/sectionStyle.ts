// 각 section마다의 스타일(폰트 크기, 간격, 이미지 비율)을 관리

import { SectionStyle } from '@/types/card'

export const sectionType: SectionStyle[] = [
  {
    section: 'main',
    font: {
      category: 'text-p13',
      title: 'text-p28',
    },
    gap: {
      image_categroy: 'pt-6',
      category_title: 'pt-3',
    },
    image_ratio: 'aspect-[770/582]',
  },
  {
    section: 'sub',
    font: {
      category: 'text-p11',
      title: 'text-p20',
    },
    gap: {
      image_categroy: 'pt-3',
      category_title: 'pt-1',
    },
    image_ratio: 'aspect-[334/235]',
  },
  {
    section: 'testDrive',
    font: {
      category: 'text-p10',
      title: 'text-p16',
    },
    gap: {
      image_categroy: 'pt-2',
      category_title: 'pt-1',
    },
    image_ratio: 'aspect-[371/290]',
  },
  {
    section: 'shopping',
    font: {
      category: 'text-p13',
      title: 'text-p26',
    },
    gap: {
      image_categroy: 'pt-3',
      category_title: 'pt-1',
    },
    image_ratio: 'aspect-[514/508]',
  },
  {
    section: 'latest',
    font: {
      category: 'text-p10',
      title: 'text-p16',
    },
    gap: {
      image_categroy: 'pt-4',
      category_title: 'pt-1',
    },
    image_ratio: 'aspect-[340/255]',
  },
]
