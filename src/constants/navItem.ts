import { ROUTES, getBeautyTalkHref } from '@/constants/routes'

export interface NavItem {
  name: string
  href: string
  submenu?: { name: string; href: string }[]
}

export const navItems: NavItem[] = [
  {
    name: 'BEAUTY',
    href: ROUTES.category('beauty'),
  },
  {
    name: 'INSIGHTS',
    href: ROUTES.category('insights'),
    submenu: [
      { name: 'Expert Interview', href: ROUTES.subcategory('insights', 'expert-interview') },
      { name: 'Brand Interview', href: ROUTES.subcategory('insights', 'brand-interview') },
      { name: 'Street Review', href: ROUTES.subcategory('insights', 'street-review') },
    ],
  },
  {
    name: 'BEAUTY TALK',
    href: ROUTES.beautyTalk.root,
    submenu: [
      {
        name: 'My Review',
        href: getBeautyTalkHref({
          type: 'my-review',
        }),
      },
      {
        name: 'Beauty Q&A',
        href: getBeautyTalkHref({
          type: 'beauty-qna',
        }),
      },
    ],
  },
]

// 필요하다면 메인 네비게이션만 추출
export const mainNavLinks = navItems.map((item) => ({
  name: item.name,
  href: item.href,
}))

// 또는 플랫한 구조로 모든 링크 추출
export const allNavLinks = navItems.reduce(
  (acc, item) => {
    acc.push({ name: item.name, href: item.href })
    if (item.submenu) {
      acc.push(...item.submenu)
    }
    return acc
  },
  [] as { name: string; href: string }[]
)

// 회사 정보 링크들
export const companyLinks = [
  { name: 'ABOUT US', href: '/about' },
  { name: 'CONTACT', href: '/contact' },
]

// 법적 정보 링크들
export const legalLinks = [
  { name: 'PRIVACY POLICY', href: '/privacy' },
  { name: 'TERMS OF SERVICE', href: '/terms' },
]
