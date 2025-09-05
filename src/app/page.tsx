'use client'

import { useState } from 'react'
import Main from '../components/Sections/Main'

export default function Page() {
  const [username, setUsername] = useState<string>('Emma')
  return (
    <div>
      <div className="text-p20 pb-3 font-semibold">Hi, {username}</div>
      <Main />
    </div>
  )
}
