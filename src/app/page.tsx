'use client'

import { useState } from 'react'
import Main from '../components/Sections/Main'
import TestDrive from '@/components/Sections/TestDrive'
import SCShopping from '@/components/Sections/SCShopping'
import Latest from '@/components/Sections/Latest'
import CategoryPreview from '@/components/Sections/CategoryPreview'
import { useArticles } from '@/hooks/use-contentful'

export default function Page() {
  const [username, setUsername] = useState<string>('Emma')

  // 🔥 여기서 딱 1번만 전체 아티클 가져오기!
  const { data: articles, isLoading } = useArticles()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="pb-3 text-p20 font-semibold">Hi, {username}</div>
      <div className="flex flex-col gap-y-24">
        <Main />
        <TestDrive />
        <SCShopping />
        <Latest />
        <CategoryPreview />
      </div>
    </div>
  )
}
