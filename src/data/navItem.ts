export interface NavItem {
  name: string
  href: string
  submenu?: { name: string; href: string }[]
}

export const navItems: NavItem[] = [
  {
    name: 'SKIN',
    href: '/skin',
    submenu: [
      { name: 'Skin Concerns', href: '/skin/concerns' },
      { name: 'Skin Type', href: '/skin/type' },
      { name: 'Sun Care', href: '/skin/sun-care' },
      { name: 'Body Care', href: '/skin/body-care' },
    ],
  },
  {
    name: 'MAKEUP',
    href: '/makeup',
    submenu: [
      { name: 'Face', href: '/makeup/face' },
      { name: 'Eyes', href: '/makeup/eyes' },
      { name: 'Lips', href: '/makeup/lips' },
      { name: 'Brushes & tools', href: '/makeup/brushes-tools' },
      { name: 'View all', href: '/makeup/all' },
    ],
  },
  {
    name: 'HAIR',
    href: '/hair',
    submenu: [
      { name: 'Hair care', href: '/hair/care' },
      { name: 'Scalp Health', href: '/hair/scalp-health' },
    ],
  },
  {
    name: 'NAIL',
    href: '/nail',
    submenu: [
      { name: 'Inspiration', href: '/nail/inspiration' },
      { name: 'Product', href: '/nail/product' },
    ],
  },
  {
    name: 'BRANDS',
    href: '/brands',
  },
  {
    name: 'SHOPPING',
    href: '/shopping',
  },
  {
    name: 'COMMUNITY',
    href: '/community',
    submenu: [
      { name: 'Product Q&A', href: '/community/qa' },
      { name: 'My Review', href: '/community/reviews' },
      { name: 'Discussion', href: '/community/discussion' },
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
  { name: 'CAREERS', href: '/careers' },
  { name: 'COMMERCE GUIDELINE', href: '/commerce-guideline' },
]

// 법적 정보 링크들
export const legalLinks = [
  { name: 'PRIVACY POLICY', href: '/privacy' },
  { name: 'TERMS OF SERVICE', href: '/terms' },
  { name: 'ADVERTISE', href: '/advertise' },
]
