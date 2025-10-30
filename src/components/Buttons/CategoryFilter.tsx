'use client'

import { Button } from '@/components/ui/button'

const categories = ['Skincare', 'Makeup', 'Hair']

interface CategoryFilterProps {
  selected: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selected, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          onClick={() => onCategoryChange(category)}
          className={`rounded-full shadow-none border border-black ${
            selected === category ? 'bg-gray-200 ' : 'bg-transparent hover:bg-gray-200'
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
