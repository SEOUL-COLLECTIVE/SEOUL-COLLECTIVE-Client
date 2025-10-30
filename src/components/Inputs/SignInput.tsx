'use client'

import { cn } from '@/lib/utils'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: string
  onBlur?: () => void
}

export default function SignInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  error,
  onBlur,
}: InputProps) {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          'w-full py-2 px-4 border rounded-md focus:outline-none text-gray-700 placeholder-gray-400',
          error ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-gray-400',
          className
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
