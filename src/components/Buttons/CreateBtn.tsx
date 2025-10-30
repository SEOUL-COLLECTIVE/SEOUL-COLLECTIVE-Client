import React from 'react'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export default function CreateBtn() {
  return (
    <Link href={ROUTES.beautyTalk.create}>
      <div>
        {/* 기본 버튼 */}
        <button className="flex items-center gap-2 px-4 py-2">
          <Plus className="w-5 h-5" />
          <span className="font-medium text-gray-700">Create</span>
        </button>
      </div>
    </Link>
  )
}
