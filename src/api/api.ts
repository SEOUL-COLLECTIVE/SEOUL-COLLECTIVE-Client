/**
 * 아티클 부분을 제외한 회원관리 및 커뮤니티(beauty-talk, ask-an-expert) 관련 API 호출
 */

import axios from 'axios'

// 백엔드 API 주소
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 세션/쿠키 유지 시 필요
  headers: {
    'Content-Type': 'application/json',
  },
})
