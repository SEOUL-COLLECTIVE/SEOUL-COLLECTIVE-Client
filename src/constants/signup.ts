/**
 * signup 시 사용되는 상수 데이터
 */

import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'

// 전체 국가 코드 (영문)
countries.registerLocale(en)
export const COUNTRIES = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  code,
  name,
}))

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not', label: 'Prefer not to answer' },
] as const

export const AGE_GROUPS = [
  { value: '16-24', label: '16-24' },
  { value: '25-34', label: '25-34' },
  { value: '35-44', label: '35-44' },
  { value: '45+', label: '45+' },
] as const

export const TERMS_CONTENT = {
  termsOfUse: {
    title: 'Terms of Use',
    content: `Terms of Use content goes here...
      
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  personalInfoRequired: {
    title: 'Collection and use of personal information (Required)',
    content: `1. Personal Information to Be Collected:
  Password, Email Address, Age Group, Name
  
  2. Purpose of Collection and Use of Personal Information:
  We collect personal information to provide better services and user experience.`,
  },
  personalInfoOptional: {
    title: 'Collection and use of personal information (Optional)',
    content: 'Optional personal information collection details...',
  },
  marketingOptional: {
    title: 'Marketing usage and notification about offers and new products',
    content: 'Marketing and promotional communications details...',
  },
} as const
