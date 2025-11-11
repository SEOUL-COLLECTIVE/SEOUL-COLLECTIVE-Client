'use client'

import CreateBtn from '@/components/Buttons/CreateBtn'
import PostCard from '@/components/Cards/PostCard'
import SortDropdown from '@/components/DropDown/SortDropDown'
import SearchBar from '@/components/Inputs/SearchBar'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ROUTES, getBeautyTalkHref } from '@/constants/routes'
import { useRouter, useSearchParams } from 'next/navigation'
import { dummyPosts } from '@/dummies/beautytalk-data'
import { btcategory, btmenu, sortOptions } from '@/constants/beautytalk'

export default function BeautyTalkPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filteredPosts, setFilteredPosts] = useState(dummyPosts)
  const [loading, setLoading] = useState(false)

  // URL 파라미터에서 현재 상태 읽기
  const currentType = searchParams.get('type') || 'all'
  const currentCategory = searchParams.get('category') || 'all'
  const currentTag = searchParams.get('tag') || 'all'
  const currentSort = searchParams.get('sort') || 'recent'

  // 기본 뷰인지 확인 (type이 없으면 기본 뷰)
  const isDefaultView = currentType === 'all'

  // URL 파라미터 업데이트 헬퍼 함수
  const updateParams = (newParams: Record<string, string>) => {
    // 1. 현재 모든 파라미터를 객체 형태로 가져옵니다.
    const currentParams = Object.fromEntries(searchParams.entries())

    // 2. 현재 파라미터와 새로운 파라미터를 병합합니다.
    const mergedParams: Record<string, string | null> = { ...currentParams, ...newParams }

    // 3. getBeautyTalkHref 헬퍼 함수를 사용하여 쿼리 기반 URL을 생성합니다.
    const { type, category, sort, tag } = mergedParams as Record<string, string | null>
    const newHref = getBeautyTalkHref({
      type: type ?? null,
      category: category ?? null,
      sort: sort ?? null,
      tag: tag ?? null,
    })

    router.push(newHref)
  }

  // 메뉴 클릭 핸들러
  const handleMenuClick = (slug: string | null) => {
    if (!slug) {
      // All 클릭 시 - 모든 파라미터 제거
      router.push(ROUTES.beautyTalk.root)
    } else {
      // 특정 메뉴 클릭 시 - category는 초기화
      // 태그가 있으면 해제되도록 tag를 'all'로 초기화
      updateParams({ type: slug, category: 'all', tag: 'all' })
    }
  }

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (slug: string) => {
    // 카테고리 선택 시 태그 필터는 초기화
    updateParams({ category: slug, tag: 'all' })
  }

  // 정렬 옵션 클릭 핸들러 (기본 뷰에서만)
  const handleSortClick = (value: string) => {
    updateParams({ sort: value })
  }

  // 더미 데이터 필터링 - 파라미터가 변경될 때마다 실행 (추후 백엔드 로직으로 변경)
  useEffect(() => {
    const filterPosts = () => {
      setLoading(true)

      // 시뮬레이션을 위한 딜레이
      setTimeout(() => {
        let filtered = [...dummyPosts]

        // type 필터링
        if (currentType !== 'all') {
          filtered = filtered.filter((post) => post.type === currentType)
        }

        // category 필터링 - 카테고리명을 소문자로 변환하여 비교
        if (currentCategory !== 'all') {
          filtered = filtered.filter(
            (post) => post.category.toLowerCase() === currentCategory.toLowerCase()
          )
        }

        // tag 필터링 - 태그가 포함된 포스트만 남김
        if (currentTag !== 'all') {
          filtered = filtered.filter((post) =>
            post.tags.some((t) => t.toLowerCase() === currentTag.toLowerCase())
          )
        }

        // 정렬
        if (currentSort === 'popular') {
          filtered.sort((a, b) => b.likes - a.likes)
        } else {
          // recent (날짜 기준 정렬)
          filtered.sort((a, b) => {
            const dateA = new Date(a.postedDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$1-$2'))
            const dateB = new Date(b.postedDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$1-$2'))
            return dateB.getTime() - dateA.getTime()
          })
        }

        setFilteredPosts(filtered)
        setLoading(false)
      }, 300) // 로딩 시뮬레이션
    }

    filterPosts()
  }, [currentType, currentCategory, currentSort, currentTag])

  // 포스트 제목 결정
  const getPostTitle = () => {
    let title = 'ALL POSTS'
    // 태그가 선택된 경우 태그 이름을 우선적으로 표시
    if (currentTag !== 'all') {
      return '# ' + currentTag.toUpperCase()
    }

    if (currentCategory !== 'all') {
      title = currentCategory.toUpperCase()
    } else if (currentType !== 'all') {
      const menu = btmenu.find((m) => m.slug === currentType)
      title = menu ? menu.name.toUpperCase() : 'ALL POSTS'
    } else if (currentSort === 'popular') {
      title = 'ALL POSTS'
    } else {
      title = 'ALL POSTS'
    }

    // ${filteredPosts.length} : 현재 필터링된 포스트 개수

    return `${title}`
  }

  return (
    <div className="container mb-24 w-screen">
      <div className="relative h-80 -mx-[5.375rem]">
        <Image
          src={'/test/community.png'}
          alt="community thumbnail"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-between py-8 left-[5.375rem]">
          <div className="flex items-center gap-2 text-white text-sm font-light tracking-wide">
            <span
              className="uppercase cursor-pointer hover:underline"
              onClick={() => router.push(ROUTES.beautyTalk.root)}
            >
              Beauty Talk
            </span>
            {currentType !== 'all' && (
              <>
                <span>/</span>
                <span className="uppercase">
                  {btmenu.find((m) => m.slug === currentType)?.name}
                </span>
              </>
            )}
            {currentCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="uppercase">{currentCategory}</span>
              </>
            )}
          </div>

          <div className="mb-2">
            <div className="text-white inline-block tracking-wide text-p32 font-bold">
              BEAUTY TALK
            </div>
          </div>
        </div>
      </div>

      {/* 상단 네비게이션 */}
      <div className="flex justify-between pt-10">
        <div>
          <div className="flex gap-8 text-p14">
            {btmenu.map((subItem) => (
              <div
                key={subItem.name}
                className={`font-semibold cursor-pointer hover:underline hover:decoration-purple hover:decoration-[0.125rem] underline-offset-[0.4375rem] ${
                  currentType === subItem.slug
                    ? 'underline decoration-purple decoration-[0.125rem]'
                    : ''
                }`}
                onClick={() => handleMenuClick(subItem.slug)}
              >
                {subItem.name}
              </div>
            ))}
          </div>
        </div>
        <CreateBtn />
      </div>

      <div className="flex justify-end pb-5">
        <SearchBar />
      </div>

      <div className="grid grid-cols-[150px_900px]">
        {/* 왼쪽 사이드바 - 조건부 렌더링 */}
        <div className="flex flex-col gap-y-2 text-[0.9rem] mt-16">
          {isDefaultView ? (
            // 기본 뷰: 정렬 옵션 표시
            <>
              <div className="text-[1rem] font-semibold text-gray-500 mb-2 px-2">{/*SORT BY*/}</div>
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors ${
                    currentSort === option.value ? 'bg-purple-50 text-purple font-semibold' : ''
                  }`}
                  onClick={() => handleSortClick(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </>
          ) : (
            // 서브메뉴 선택 시: 카테고리 표시
            <>
              <div className="text-[0.75rem] font-semibold text-gray-500 mb-2 px-2">
                {/*CATEGORY*/}
              </div>
              {btcategory.map((item) => (
                <div
                  key={item.category}
                  className={`p-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors ${
                    currentCategory === item.slug ? 'bg-purple-50 text-purple font-semibold' : ''
                  }`}
                  onClick={() => handleCategoryClick(item.slug)}
                >
                  {item.category}
                </div>
              ))}
            </>
          )}
        </div>

        {/* 포스트 영역 */}
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <div className="text-[1.25rem] font-bold px-2">{getPostTitle()}</div>
            {/* SortDropdown은 서브메뉴가 선택된 경우에만 표시 */}
            {!isDefaultView && (
              <SortDropdown
                value={currentSort}
                onChange={(value) => updateParams({ sort: value })}
              />
            )}
          </div>

          {loading ? (
            // 스켈레톤 로더 - PostCard와 완전히 동일한 구조
            <div className="min-h-screen">
              {[1, 2, 3].map((index) => (
                <div key={index} className="w-full bg-white rounded-sm shadow-md p-8 mb-8">
                  {/* Category skeleton - PostCard와 동일한 높이 */}
                  <span className="inline-block h-[0.75rem] bg-gray-200 rounded w-16 mb-2 animate-pulse"></span>

                  {/* Title skeleton - PostCard와 동일한 mb-4 */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-[1.25rem] bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Meta skeleton - text-[0.75rem] 높이 */}
                  <div className="h-[0.75rem] bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>

                  {/* Author skeleton */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-[0.875rem] bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>

                  {/* Content skeleton - text-[0.875rem] leading-relaxed */}
                  <div className="mb-6">
                    <div className="h-[0.875rem] bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-[0.875rem] bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>

                  {/* Image skeleton - 정확한 w-[18rem] */}
                  <div className="mb-6 flex gap-2">
                    <div className="relative aspect-[4/3] w-[18rem] max-w-md bg-gray-200 animate-pulse"></div>
                    <div className="relative aspect-[4/3] w-[18rem] max-w-md bg-gray-200 animate-pulse"></div>
                  </div>

                  {/* Tags skeleton - text-[0.75rem] 높이에 padding */}
                  <div className="flex gap-3 mb-6 flex-wrap">
                    <div className="h-[1.5rem] bg-gray-200 rounded-md w-20 animate-pulse"></div>
                    <div className="h-[1.5rem] bg-gray-200 rounded-md w-24 animate-pulse"></div>
                  </div>

                  {/* Actions skeleton */}
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-[0.875rem] bg-gray-200 rounded w-8 animate-pulse"></div>
                    </div>
                    <div className="h-6 w-[0.0825rem] bg-gray-300"></div>
                    <div className="h-[0.875rem] bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <PostCard posts={filteredPosts} onTagClick={(tag) => updateParams({ tag })} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <div className="text-lg mb-2">No posts found</div>
              <div className="text-sm">Try adjusting your filters</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
