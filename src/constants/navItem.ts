import { ROUTES } from '@/constants/routes'

export interface NavItem {
  name: string
  href: string
  submenu?: { name: string; href: string }[]
}

export const navItems: NavItem[] = [
  {
    name: 'SKIN',
    href: ROUTES.category('skin'),
    submenu: [
      { name: 'Skin Concerns', href: ROUTES.subcategory('skin', 'skin-concerns') },
      { name: 'Skin Type', href: ROUTES.subcategory('skin', 'skin-type') },
      { name: 'Sun Care', href: ROUTES.subcategory('skin', 'sun-care') },
      { name: 'Body Care', href: ROUTES.subcategory('skin', 'body-care') },
    ],
  },
  {
    name: 'MAKEUP',
    href: ROUTES.category('makeup'),
    submenu: [
      { name: 'Face', href: ROUTES.subcategory('makeup', 'face') },
      { name: 'Eyes', href: ROUTES.subcategory('makeup', 'eyes') },
      { name: 'Lips', href: ROUTES.subcategory('makeup', 'lips') },
      { name: 'Brushes & tools', href: ROUTES.subcategory('makeup', 'brushes-tools') },
    ],
  },
  {
    name: 'HAIR',
    href: ROUTES.category('hair'),
    submenu: [
      { name: 'Hair care', href: ROUTES.subcategory('hair', 'hair-care') },
      { name: 'Scalp Health', href: ROUTES.subcategory('hair', 'scalp-health') },
    ],
  },
  {
    name: 'BRANDS',
    href: ROUTES.BRANDS,
  },
  {
    name: 'SHOPPING',
    href: ROUTES.SHOPPING,
  },
  {
    name: 'ASK AN EXPERT',
    href: ROUTES.askExpert.root,
  },
  {
    name: 'BEAUTY TALK',
    href: ROUTES.beautyTalk.root,
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
  { name: 'CAREERS', href: '/careers' },
  { name: 'COMMERCE GUIDELINE', href: '/commerce-guideline' },
]

// 법적 정보 링크들
export const legalLinks = [
  { name: 'PRIVACY POLICY', href: '/privacy' },
  { name: 'TERMS OF SERVICE', href: '/terms' },
  { name: 'ADVERTISE', href: '/advertise' },
]
