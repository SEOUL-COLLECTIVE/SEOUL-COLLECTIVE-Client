'use client'

import Main from '../components/Sections/Main'
import WatchThis from '@/components/Sections/WatchThis'
import Latest from '@/components/Sections/Latest'
import CategoryPreview from '@/components/Sections/CategoryPreview'
import { useArticles } from '@/hooks/use-contentful'
import EditorPick from '@/components/Sections/EditorPick'

export default function Page() {
  // 여기서 딱 1번만 전체 아티클 가져오기!
  const { data: articles, isLoading } = useArticles()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex flex-col gap-y-24">
        <Main />
        <WatchThis />
        <EditorPick />
        <Latest />
      </div>
    </div>
  )
}
