// components/Viewer/TiptapViewer.tsx
'use client'

import * as React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import type { JSONContent, Extensions } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

type Props = {
  json: JSONContent | null | undefined
  className?: string
  extensions?: Extensions
}

export default function TiptapViewer({ json, className, extensions }: Props) {
  const exts = React.useMemo<Extensions>(
    () =>
      extensions ?? [
        StarterKit,
        Underline,
        Link.configure({
          autolink: true,
          openOnClick: true,
          HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
        }),
        Image,
      ],
    [extensions]
  )

  const editor = useEditor({
    editable: false,
    /** 핵심: SSR 하이드레이션 불일치 방지 */
    immediatelyRender: false,
    /** SSR 시엔 빈 문서로 두고, 클라 마운트 후에 setContent */
    content: { type: 'doc', content: [] },
    extensions: exts,
    editorProps: {
      attributes: {
        class: [
          'prose prose-sm max-w-none leading-relaxed selection:bg-black/10',
          '[&_img]:rounded-md [&_img]:my-3 [&_img]:w-80', // 이미지 크기 고정해놓음
          '[&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:text-gray-600',
          '[&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-5',
          '[&_hr]:my-6',
          className ?? '',
        ].join(' '),
      },
    },
  })

  // 클라이언트 마운트 후에 실제 콘텐츠 주입
  React.useEffect(() => {
    if (!editor) return
    if (json) editor.commands.setContent(json)
  }, [editor, json])

  if (!editor) return null
  return <EditorContent editor={editor} />
}
