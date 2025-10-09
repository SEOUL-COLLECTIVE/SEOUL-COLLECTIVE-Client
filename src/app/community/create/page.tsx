'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [postType, setPostType] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState<Record<string, unknown> | null>(null)
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagInput] = useState('')

  const handleHashtagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault()
      if (!hashtags.includes(hashtagInput.trim())) {
        setHashtags([...hashtags, hashtagInput.trim()])
      }
      setHashtagInput('')
    }
  }

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    const postData = {
      title,
      postType,
      category,
      content: content, // JSON 형식의 에디터 내용
      hashtags,
    }

    console.log('POST 데이터:', postData)
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-400 text-center pb-4 border-b-2 border-gray-300">
          New Post
        </h1>
      </div>

      {/* Title Input */}
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a subject"
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
        />
      </div>

      {/* Post Type & Category Selects */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Choose Post Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="my-review" className="hover:bg-gray-300 cursor-pointer">
              My Review
            </SelectItem>
            <SelectItem value="product-qa" className="hover:bg-gray-300 cursor-pointer">
              Product Q&A
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Choose Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="skincare" className="hover:bg-gray-300 cursor-pointer">
              Skincare
            </SelectItem>
            <SelectItem value="makeup" className="hover:bg-gray-300 cursor-pointer">
              Makeup
            </SelectItem>
            <SelectItem value="hair" className="hover:bg-gray-300 cursor-pointer">
              Hair
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rich Text Editor Placeholder */}
      {/* <div className="mb-2">
        <div className="border border-gray-300 rounded"> */}
      {/* Toolbar */}
      {/* <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-300 bg-gray-50">
            <button className="px-2 py-1 hover:bg-gray-200 rounded font-bold">B</button>
            <button className="px-2 py-1 hover:bg-gray-200 rounded italic">I</button>
            <button className="px-2 py-1 hover:bg-gray-200 rounded underline">U</button>
            <button className="px-2 py-1 hover:bg-gray-200 rounded line-through">S</button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button className="px-2 py-1 hover:bg-gray-200 rounded">≡</button>
            <button className="px-2 py-1 hover:bg-gray-200 rounded">⋮</button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button className="px-2 py-1 hover:bg-gray-200 rounded">☺</button>
            <button className="px-2 py-1 hover:bg-gray-200 rounded">A</button>
            <button className="px-2 py-1 hover:bg-gray-200 rounded">📷</button>
            <button className="px-2 py-1 hover:bg-gray-200 rounded">🎥</button>
          </div> */}

      {/* Content Area */}
      {/* <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Body"
            className="w-full px-4 py-3 min-h-[300px] focus:outline-none resize-none"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Hint: <span className="font-semibold">#</span> links to products,{' '}
          <span className="font-semibold">@</span> links to members and content
        </p>
      </div> */}

      <SimpleEditor
        onChange={setContent}
        initialContent={undefined} // 빈 에디터로 시작
      />

      {/* Hashtags */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">#hashtag</label>
        <div className="border border-gray-300 rounded p-3">
          {/* Display Tags */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {hashtags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-1 bg-black text-white px-2 rounded-md text-[0.75rem] font-bold rounded-md"
                >
                  {tag}
                  <button onClick={() => removeHashtag(tag)} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* Input */}
          <input
            type="text"
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyDown={handleHashtagKeyDown}
            placeholder="Type hashtag and press Enter"
            className="w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
          Cancel
        </button>
        <button
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
  )
}
