'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const categories = ['Skincare', 'Makeup', 'Hair']

export function CategoryFilter() {
  const [selected, setSelected] = useState('Skincare')

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          onClick={() => setSelected(category)}
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
