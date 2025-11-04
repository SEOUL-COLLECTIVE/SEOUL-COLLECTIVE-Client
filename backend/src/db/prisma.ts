import { PrismaClient } from '@prisma/client'

// PrismaClient 인스턴스를 전역 변수로 선언
declare global {
  var prisma: PrismaClient | undefined
}

// globalThis.prisma가 없으면 새 인스턴스 생성, 있으면 기존 인스턴스 사용
// 개발 환경에서 Next.js의 hot reload 시 인스턴스가 여러 개 생기는 것을 방지
export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma