'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function SortDropdown() {
  const [selectedSort, setSelectedSort] = useState('MOST RECENT')

  const sortOptions = [
    { value: 'recent', label: 'MOST RECENT' },
    { value: 'popular', label: 'MOST POPULAR' },
  ]

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full max-w-sm focus:outline-none hover:bg-gray-300 data-[state=open]:bg-gray-300 rounded-full cursor-pointer">
          <div className="flex items-center justify-between w-full p-2 transition-colors">
            <span className="text-[0.75rem] font-semibold tracking-wide">{selectedSort}</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-md p-1 shadow-md">
          <DropdownMenuLabel className="text-gray-400 text-[0.625rem] font-normal mb-1">
            Sort by
          </DropdownMenuLabel>
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setSelectedSort(option.label)}
              className="text-[0.75rem] font-normal py-1 cursor-pointer hover:bg-gray-50 rounded-lg"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
