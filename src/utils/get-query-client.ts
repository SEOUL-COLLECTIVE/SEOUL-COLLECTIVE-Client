import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 데이터가 "신선"하다고 간주되는 시간
        // 이 시간 동안은 API를 다시 호출하지 않음
        staleTime: 60 * 1000 * 5, // 5분 = 60초 * 1000밀리초 * 5

        // gcTime: 사용하지 않는 캐시를 메모리에 보관하는 시간
        // 이 시간이 지나면 캐시 삭제
        gcTime: 5 * 60 * 1000, // 5분

        // refetchOnWindowFocus: 브라우저 탭을 다시 클릭했을 때 데이터 새로고침 여부
        refetchOnWindowFocus: false, // 끄기 (Contentful은 자주 안 바뀌니까)

        // retry: API 호출 실패 시 재시도 횟수
        retry: 1,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // 서버 환경: 매번 새로운 QueryClient 생성
    return makeQueryClient()
  } else {
    // 클라이언트 환경: 하나의 QueryClient 재사용
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
