'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Message } from '@/app/page'
import { UserIcon, SparklesIcon, ClockIcon } from 'lucide-react'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={`py-8 px-4 ${isUser ? 'bg-gpt-bg/30' : 'bg-gpt-ai-msg/30'} border-b border-gpt-border/20 last:border-b-0 backdrop-blur-sm animate-fade-in`}>
      <div className="max-w-3xl mx-auto flex items-start gap-4">
        {/* Enhanced Avatar */}
        <div className={`avatar relative ${isUser ? 'bg-gradient-to-r from-gpt-gray-medium to-gpt-button' : 'bg-gradient-to-r from-gpt-button to-gpt-gray-medium'} shadow-xl`}>
          {isUser ? (
            <UserIcon size={18} className="text-white" />
          ) : (
            <>
              <SparklesIcon size={18} className="text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gpt-accent rounded-full border-2 border-gpt-bg animate-pulse-soft"></div>
            </>
          )}
        </div>
        
        {/* Message Content */}
        <div className="flex-1 min-w-0 pt-1">
          {/* Message Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gpt-text">
              {isUser ? 'You' : 'RahulGPT'}
            </span>
            <div className="flex items-center gap-1 text-xs text-gpt-text-muted">
              <ClockIcon size={12} />
              <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {!isUser && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-gpt-accent/20 text-gpt-accent rounded-full text-xs">
                <div className="w-1.5 h-1.5 bg-gpt-accent rounded-full animate-pulse-soft"></div>
                AI
              </div>
            )}
          </div>
          
          {/* Message Body */}
          <div className="prose prose-invert max-w-none">
            {isUser ? (
              <div className="text-gpt-text leading-relaxed whitespace-pre-wrap bg-gradient-to-r from-gpt-input/50 to-transparent p-4 rounded-xl border border-gpt-border/30">
                {message.content}
              </div>
            ) : (
              <div className="text-gpt-text">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-4 last:mb-0 leading-relaxed text-gpt-text">{children}</p>
                    ),
                    pre: ({ children }) => (
                      <div className="my-4">
                        <div className="bg-gpt-sidebar/50 border border-gpt-border/50 rounded-t-xl px-4 py-2 text-xs text-gpt-text-muted flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="ml-2">Code</span>
                        </div>
                        <pre className="bg-black/30 border border-gpt-border/50 border-t-0 rounded-b-xl p-4 overflow-x-auto text-sm">
                          {children}
                        </pre>
                      </div>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className
                      return isInline ? (
                        <code className="bg-gpt-input/50 px-2 py-1 rounded-md text-sm border border-gpt-border/30 text-gpt-accent">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      )
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gpt-accent/50 pl-6 my-4 italic text-gpt-text-muted bg-gpt-input/20 py-2 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-none space-y-2 mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gpt-accent rounded-full mt-2 flex-shrink-0"></span>
                        <span className="flex-1">{children}</span>
                      </li>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0 text-white">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mb-3 mt-5 first:mt-0 text-gpt-text">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium mb-2 mt-4 first:mt-0 text-gpt-text">{children}</h3>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <div className="glass-effect border border-gpt-border/50 rounded-xl overflow-hidden">
                          <table className="w-full">
                            {children}
                          </table>
                        </div>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border-b border-gpt-border/50 px-4 py-3 bg-gpt-input/30 text-left font-medium text-gpt-text">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border-b border-gpt-border/30 px-4 py-3 text-gpt-text">
                        {children}
                      </td>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gpt-accent">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gpt-text-muted">{children}</em>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}