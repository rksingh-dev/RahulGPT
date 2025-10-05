'use client'

import { PlusIcon, MessageSquareIcon, MoreHorizontalIcon, SparklesIcon, ZapIcon } from 'lucide-react'

interface SidebarProps {
  onNewChat: () => void
}

export default function Sidebar({ onNewChat }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-gpt-sidebar to-gpt-bg/50 flex flex-col border-r border-gpt-border/50 backdrop-blur-sm">
      {/* Header with Logo */}
      <div className="p-4 border-b border-gpt-border/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-gpt-button to-gpt-gray-medium rounded-lg flex items-center justify-center">
              <SparklesIcon size={18} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              RahulGPT
            </h1>
            <p className="text-xs text-gpt-text-muted">AI Assistant</p>
          </div>
        </div>
      </div>
      
      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gpt-button/20 hover:bg-gpt-button/30 border border-gpt-border/50 hover:border-gpt-accent/50 rounded-xl transition-all duration-300 text-sm group card-hover"
        >
          <PlusIcon size={16} className="text-gpt-accent group-hover:scale-110 transition-transform duration-200" />
          <span className="text-gpt-text font-medium">New conversation</span>
          <ZapIcon size={14} className="text-gpt-gray-medium ml-auto opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
      </div>
      
      {/* Recent Conversations Section */}
      <div className="flex-1 px-3 pb-3">
        <div className="mb-3">
          <h3 className="text-xs font-medium text-gpt-text-muted mb-3 px-3 uppercase tracking-wide">
            Recent
          </h3>
          <div className="space-y-1">
            {/* Placeholder for recent chats */}
            <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-gpt-text-muted/70 rounded-xl hover:bg-gpt-hover/50 transition-all duration-200">
              <MessageSquareIcon size={16} className="opacity-60" />
              <span className="truncate">No conversations yet</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-xs text-gpt-text-muted/50 rounded-lg">
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gpt-text-muted/30 rounded-full animate-pulse-soft"></div>
              </div>
              <span>Start chatting to see history</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Profile Section */}
      <div className="border-t border-gpt-border/30 p-3">
        <div className="glass-effect p-3">
          <div className="flex items-center gap-3 hover:bg-gpt-hover/50 rounded-xl cursor-pointer transition-all duration-200 p-2 -m-2">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-gpt-button to-gpt-gray-medium rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gpt-accent rounded-full border-2 border-gpt-sidebar animate-pulse-soft"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gpt-text font-medium">RahulGPT</div>
              <div className="text-xs text-gpt-text-muted flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gpt-accent rounded-full"></div>
                Free • Unlimited
              </div>
            </div>
            <MoreHorizontalIcon size={16} className="text-gpt-text-muted hover:text-gpt-accent transition-colors duration-200" />
          </div>
        </div>
      </div>
    </div>
  )
}