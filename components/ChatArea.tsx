'use client'

import { useState, useRef, useEffect } from 'react'
import { SendIcon, ArrowUpIcon, SparklesIcon, ZapIcon } from 'lucide-react'
import { Message } from '@/app/page'
import MessageBubble from './MessageBubble'

interface ChatAreaProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatArea({ messages, onSendMessage, isLoading }: ChatAreaProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }

  return (
    <div className="flex-1 flex flex-col relative bg-gradient-to-br from-gpt-bg to-gpt-ai-msg">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full animate-fade-in">
            <div className="text-center max-w-4xl mx-auto px-6 py-8">
              {/* Hero Section */}
              <div className="mb-12 mt-8">
                <h1 className="text-5xl font-bold text-white mb-4">
                  Welcome to RahulGPT
                </h1>
                <p className="text-xl text-gpt-text-muted max-w-2xl mx-auto leading-relaxed">
                  Your intelligent AI companion powered by cutting-edge technology. 
                  Ask anything, explore ideas, and unlock your creativity.
                </p>
              </div>
              
              {/* Additional Info */}
              <div className="text-sm text-gpt-text-muted/70">
                <p className="flex items-center justify-center gap-2">
                  <ZapIcon size={16} className="text-gpt-gray-medium" />
                  Powered by xAI Grok • Unlimited conversations • No login required
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {messages.map((message, index) => (
              <div key={message.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <MessageBubble message={message} />
              </div>
            ))}
            {isLoading && (
              <div className="py-6 px-4 animate-slide-up">
                <div className="max-w-3xl mx-auto flex items-start gap-4">
                  <div className="avatar bg-gradient-to-r from-gpt-button to-gpt-gray-medium animate-pulse-soft">
                    R
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <SparklesIcon size={16} className="text-gpt-accent animate-spin" />
                      <span className="text-sm text-gpt-text-muted">Thinking...</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gpt-accent rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gpt-gray-medium rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gpt-button rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Enhanced Input Area */}
      <div className="border-t border-gpt-border/30 bg-gradient-to-r from-gpt-bg/80 to-gpt-sidebar/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end glass-effect border border-gpt-border/50 focus-within:border-gpt-accent/50 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-gpt-accent/20">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Message RahulGPT..."
                className="flex-1 p-4 bg-transparent text-gpt-text placeholder-gpt-text-muted resize-none focus:outline-none max-h-[200px] min-h-[24px]"
                disabled={isLoading}
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 m-2 bg-gradient-to-r from-gpt-button to-gpt-gray-medium hover:from-gpt-button-hover hover:to-gpt-gray-medium/90 disabled:from-gpt-text-muted disabled:to-gpt-text-muted disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <ArrowUpIcon size={18} />
              </button>
            </div>
          </form>
          <div className="text-xs text-gpt-text-muted/70 text-center mt-3 flex items-center justify-center gap-2">
            <SparklesIcon size={12} className="text-gpt-accent" />
            RahulGPT can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>
    </div>
  )
}