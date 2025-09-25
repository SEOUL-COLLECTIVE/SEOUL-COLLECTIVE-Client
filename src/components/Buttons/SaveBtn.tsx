'use client'

import { Bookmark } from 'lucide-react'

type SaveBtnProps = {
  onClick?: () => void
}

export default function SaveBtn({ onClick }: SaveBtnProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 border-[0.1rem] border-black px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-wider hover:bg-[#e0e0e0] transition-colors"
    >
      <Bookmark size={20} strokeWidth={2} />
      SAVE ARTICLE
    </button>
  )
}
