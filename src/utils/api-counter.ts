// lib/api-counter.ts
let count = 0

export function logApiCall(query: string) {
  count++
  console.log(`🔵 API 호출 [${count}회] ${query}`)
}

export function getCount() {
  return count
}

export function resetCount() {
  count = 0
  console.log('✨ API 카운터 리셋')
}
