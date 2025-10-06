'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="w-full max-w-[18.125rem]">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="w-3 h-3 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search or ask a question"
          className="w-full pl-8 pr-6 py-1 border-[1px] border-gray-300 rounded-full text-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors text-[0.625rem]"
        />
      </div>
    </div>
  )
}
