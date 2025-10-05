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
    <div className={`py-4 lg:py-8 px-3 lg:px-4 ${isUser ? 'bg-gpt-bg/30' : 'bg-gpt-ai-msg/30'} border-b border-gpt-border/20 last:border-b-0 backdrop-blur-sm animate-fade-in`}>
      <div className="max-w-3xl mx-auto flex items-start gap-3 lg:gap-4">
        {/* Enhanced Avatar */}
        <div className={`avatar relative ${isUser ? 'bg-gradient-to-r from-gpt-gray-medium to-gpt-button' : 'bg-gradient-to-r from-gpt-button to-gpt-gray-medium'} shadow-xl w-6 h-6 lg:w-8 lg:h-8 text-xs lg:text-sm flex-shrink-0`}>
          {isUser ? (
            <UserIcon size={14} className="lg:w-[18px] lg:h-[18px] text-white" />
          ) : (
            <>
              <SparklesIcon size={14} className="lg:w-[18px] lg:h-[18px] text-white" />
              <div className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 w-2 h-2 lg:w-3 lg:h-3 bg-gpt-accent rounded-full border border-gpt-bg lg:border-2 animate-pulse-soft"></div>
            </>
          )}
        </div>
        
        {/* Message Content */}
        <div className="flex-1 min-w-0 pt-0.5 lg:pt-1">
          {/* Message Header */}
          <div className="flex items-center gap-1.5 lg:gap-2 mb-1.5 lg:mb-2 flex-wrap">
            <span className="text-xs lg:text-sm font-medium text-gpt-text">
              {isUser ? 'You' : 'RahulGPT'}
            </span>
            <div className="flex items-center gap-1 text-xs text-gpt-text-muted">
              <ClockIcon size={10} className="lg:w-3 lg:h-3" />
              <span className="text-xs">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {!isUser && (
              <div className="flex items-center gap-1 px-1.5 lg:px-2 py-0.5 bg-gpt-accent/20 text-gpt-accent rounded-full text-xs">
                <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-gpt-accent rounded-full animate-pulse-soft"></div>
                <span className="text-xs">AI</span>
              </div>
            )}
          </div>
          
          {/* Message Body */}
          <div className="prose prose-invert max-w-none text-sm lg:text-base">
            {isUser ? (
              <div className="text-gpt-text leading-relaxed whitespace-pre-wrap bg-gradient-to-r from-gpt-input/50 to-transparent p-3 lg:p-4 rounded-lg lg:rounded-xl border border-gpt-border/30 text-sm lg:text-base">
                {message.content}
              </div>
            ) : (
              <div className="text-gpt-text text-sm lg:text-base">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 lg:mb-4 last:mb-0 leading-relaxed text-gpt-text text-sm lg:text-base">{children}</p>
                    ),
                    pre: ({ children }) => (
                      <div className="my-3 lg:my-4">
                        <div className="bg-gpt-sidebar/50 border border-gpt-border/50 rounded-t-lg lg:rounded-t-xl px-3 lg:px-4 py-2 text-xs text-gpt-text-muted flex items-center gap-2">
                          <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full"></div>
                          <span className="ml-2 text-xs">Code</span>
                        </div>
                        <pre className="bg-black/30 border border-gpt-border/50 border-t-0 rounded-b-lg lg:rounded-b-xl p-3 lg:p-4 overflow-x-auto text-xs lg:text-sm">
                          {children}
                        </pre>
                      </div>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className
                      return isInline ? (
                        <code className="bg-gpt-input/50 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded text-xs lg:text-sm border border-gpt-border/30 text-gpt-accent">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      )
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 lg:border-l-4 border-gpt-accent/50 pl-3 lg:pl-6 my-3 lg:my-4 italic text-gpt-text-muted bg-gpt-input/20 py-2 rounded-r-lg text-sm lg:text-base">
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-none space-y-1.5 lg:space-y-2 mb-3 lg:mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-3 lg:mb-4 space-y-1.5 lg:space-y-2">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed flex items-start gap-1.5 lg:gap-2 text-sm lg:text-base">
                        <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-gpt-accent rounded-full mt-2 flex-shrink-0"></span>
                        <span className="flex-1">{children}</span>
                      </li>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-lg lg:text-2xl font-bold mb-3 lg:mb-4 mt-4 lg:mt-6 first:mt-0 text-white">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-base lg:text-xl font-semibold mb-2 lg:mb-3 mt-4 lg:mt-5 first:mt-0 text-gpt-text">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-sm lg:text-lg font-medium mb-2 mt-3 lg:mt-4 first:mt-0 text-gpt-text">{children}</h3>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-3 lg:my-4">
                        <div className="glass-effect border border-gpt-border/50 rounded-lg lg:rounded-xl overflow-hidden min-w-max">
                          <table className="w-full text-xs lg:text-sm">
                            {children}
                          </table>
                        </div>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border-b border-gpt-border/50 px-2 lg:px-4 py-2 lg:py-3 bg-gpt-input/30 text-left font-medium text-gpt-text text-xs lg:text-sm">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border-b border-gpt-border/30 px-2 lg:px-4 py-2 lg:py-3 text-gpt-text text-xs lg:text-sm">
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