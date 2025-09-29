/**
 * ISO 날짜 문자열을 "AUGUST, 04 2025" 형식으로 변환
 * @param isoDateString - ISO 형식 날짜 문자열 (예: "2025-09-07T13:00")
 * @returns 포맷된 날짜 문자열 (예: "SEPTEMBER, 07 2025")
 */

export function formatDate(isoDateString: string): string {
  try {
    const date = new Date(isoDateString)

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }

    const months = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ]

    const month = months[date.getMonth()]
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${month}, ${day} ${year}`
  } catch (error) {
    console.error('Date formatting error:', error)
    return isoDateString // 에러 시 원본 반환
  }
}

/*
 * 여러 날짜 포맷을 지원하는 확장 버전
 */
export function formatDateCustom(
  isoDateString: string,
  options: {
    monthCase?: 'upper' | 'lower' | 'capitalize'
    separator?: string
    dayPadding?: boolean
  } = {}
): string {
  try {
    const date = new Date(isoDateString)

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }

    const { monthCase = 'upper', separator = ', ', dayPadding = true } = options

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    let month = months[date.getMonth()]

    // 월 이름 케이스 적용
    switch (monthCase) {
      case 'upper':
        month = month.toUpperCase()
        break
      case 'lower':
        month = month.toLowerCase()
        break
      case 'capitalize':
        // 기본값 유지
        break
    }

    const day = dayPadding ? date.getDate().toString().padStart(2, '0') : date.getDate().toString()

    const year = date.getFullYear()

    return `${month}${separator}${day} ${year}`
  } catch (error) {
    console.error('Date formatting error:', error)
    return isoDateString
  }
}

// 사용 예시:
// formatDate("2025-09-07T13:00") // "SEPTEMBER, 07 2025"
// formatDateCustom("2025-08-04T13:00", { monthCase: 'capitalize' }) // "August, 04 2025"
