'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
  errorMessage?: string
}

export default function SignInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  required = false,
  errorMessage = 'This field is required.',
}: InputProps) {
  const [error, setError] = useState(false)

  const handleBlur = () => {
    if (required && !value) {
      setError(true)
    } else {
      setError(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error && e.target.value) {
      setError(false)
    }
    onChange?.(e)
  }

  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn(
          'w-full py-3 px-4 border border-gray-400 rounded-md focus:outline-none focus:border-black text-black placeholder-gray-400',
          error ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-gray-400',
          className
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  )
}
