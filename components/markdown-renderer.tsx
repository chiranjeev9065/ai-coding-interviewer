"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert max-w-none ${className || ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="my-3" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-3" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-3" {...props} />,
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            return inline ? (
              <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            ) : (
              // Don't wrap in <pre> here - we'll handle it separately
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          // Handle pre tags separately to avoid nesting inside paragraphs
          pre: ({ node, ...props }) => <pre className="bg-muted p-4 rounded-md overflow-x-auto my-4" {...props} />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-700" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props} />
          ),
          td: ({ node, ...props }) => <td className="px-4 py-3 text-sm" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

