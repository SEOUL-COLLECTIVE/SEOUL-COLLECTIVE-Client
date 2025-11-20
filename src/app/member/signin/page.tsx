'use client'

import { useState, useEffect } from 'react'
import SignInput from '@/components/Inputs/SignInput'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { api } from '@/api/api'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    saveId: false,
    keepSignedIn: false,
  })

  // saveId 체크되어 있을 경우 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail')
    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
        saveId: true,
      }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      alert('Please enter your email and password.')
      return
    }

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        saveId: formData.saveId,
        keepSignedIn: formData.keepSignedIn,
      }

      const res = await api.post('/auth/signin', payload)

    if (res.status === 200) {
        // 로그인 성공 시 'Save ID' 체크 여부에 따라 로컬 스토리지 처리
        if (formData.saveId) {
          localStorage.setItem('savedEmail', formData.email)
        } else {
          localStorage.removeItem('savedEmail')
        }

        alert('Sign in successful! Welcome.')
        console.log('JWT Token:', res.data.token)
        
        // 토큰 저장
        localStorage.setItem('token', res.data.token) 

        router.push('/')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      alert(error.response?.data?.message || 'Sign in failed. Check your credentials.')
    }
  }

  return (
    <div className="w-screen bg-white overflow-auto -mx-[5.375rem] min-h-screen">
      <div className="max-w-[400px] mx-auto p-8 pt-12">
        <h1 className="text-[24px] font-bold text-center mb-8">Sign In</h1>

        <form className="space-y-3 text-[14px]" onSubmit={handleSubmit}>
          <SignInput
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border-[#C9CDD2]"
          />

          <SignInput
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border-[#C9CDD2]"
          />

          {/* check button */}
          <div className="flex items-center gap-8 pt-2 pb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.saveId}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, saveId: checked as boolean })
                }
              />
              <span className="text-gray-700 text-[14px]">Save ID</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.keepSignedIn}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, keepSignedIn: checked as boolean })
                }
              />
              <span className="text-gray-700 text-[14px]">Keep me signed in</span>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* signup button & forgot password */}
        <div className="flex justify-between mt-6 text-gray-600 text-[14px]">
          <Link href="/member/signup" className="hover:text-gray-800">
            Sign up with email
          </Link>
          <Link href="/" className="hover:text-gray-800">
            Forgot password?
          </Link>
        </div>

        {/* or 구분선 */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Continue with Google Button */}
        <button className="w-full flex items-center justify-center gap-3 py-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-700 font-medium text-[14px]">Continue with Google</span>
        </button>
      </div>
    </div>
  )
}
