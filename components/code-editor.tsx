"use client"

import { useEffect, useState } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
}

export function CodeEditor({ value, onChange, language = "javascript", height = "300px" }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Dynamically import Monaco editor
    import("@monaco-editor/react").then()

    return () => {
      setMounted(false)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="border rounded-md p-4 bg-muted" style={{ height }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent resize-none focus:outline-none"
          placeholder="Write your code here..."
        />
      </div>
    )
  }

  // Dynamically import Monaco editor to avoid SSR issues
  const MonacoEditor = require("@monaco-editor/react").default

  return (
    <MonacoEditor
      height={height}
      language={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        tabSize: 2,
        automaticLayout: true,
      }}
    />
  )
}

