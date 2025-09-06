'use client'

import { useState } from 'react'
import Main from '../components/Sections/Main'
import TestDrive from '@/components/Sections/TestDrive'
import SCShopping from '@/components/Sections/SCShopping'

export default function Page() {
  const [username, setUsername] = useState<string>('Emma')
  return (
    <div>
      <div className="pb-3 text-p20 font-semibold">Hi, {username}</div>
      <div className="flex flex-col gap-y-24">
        <Main />
        <TestDrive />
        <SCShopping />
      </div>
    </div>
  )
}
