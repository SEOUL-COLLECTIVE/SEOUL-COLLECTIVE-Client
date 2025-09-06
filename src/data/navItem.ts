export interface NavItem {
  name: string
  submenu?: string[]
}

export const navItems: NavItem[] = [
  { name: 'SKIN', submenu: ['Skin Concerns', 'Skin Type', 'Sun Care', 'Body Care'] },
  {
    name: 'MAKEUP',
    submenu: ['Face', 'Eyes', 'Lips', 'Brushes & tools', 'View all'],
  },
  { name: 'HAIR', submenu: ['Hair care', 'Scalp Health'] },
  { name: 'NAIL', submenu: ['Inspiration', 'Product'] },
  { name: 'BRANDS' },
  { name: 'SHOPPING' },
  { name: 'COMMUNITY', submenu: ['Product Q&A', 'My Review', 'Discussion'] },
]

// Footer에서 사용할 네비게이션 링크들
export const footerNavItems = navItems.map((item) => ({
  name: item.name,
  href: `/${item.name.toLowerCase()}`,
}))

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
