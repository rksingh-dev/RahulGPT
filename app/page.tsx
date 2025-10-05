'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatArea from '@/components/ChatArea'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const startNewChat = () => {
    setMessages([])
  }

  return (
    <div className="flex h-screen bg-gpt-bg text-gpt-text">
      {/* Sidebar - Hidden on mobile, overlay on tablet */}
      <div className="hidden lg:block">
        <Sidebar onNewChat={startNewChat} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed inset-0 z-50 hidden" id="mobile-sidebar">
        <div className="absolute inset-0 bg-black/50" onClick={() => {
          document.getElementById('mobile-sidebar')?.classList.add('hidden')
        }}></div>
        <div className="relative w-64">
          <Sidebar onNewChat={startNewChat} />
        </div>
      </div>
      
      <ChatArea 
        messages={messages} 
        onSendMessage={sendMessage} 
        isLoading={isLoading}
      />
    </div>
  )
}