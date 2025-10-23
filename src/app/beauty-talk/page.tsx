import { Suspense } from 'react'
import BeautyTalkPage from './BeautyTalkPage'

// 로딩 컴포넌트
function CommunityPageLoading() {
  return (
    <div className="container mb-24 w-screen">
      <div className="relative h-80 -mx-[5.375rem] bg-gray-200 animate-pulse">
        {/* 헤더 스켈레톤 */}
      </div>
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-500">Loading...</div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<CommunityPageLoading />}>
      <BeautyTalkPage />
    </Suspense>
  )
}
