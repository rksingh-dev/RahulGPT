import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'RahulGPT - AI Assistant',
  description: 'RahulGPT - Advanced AI Assistant powered by OpenRouter and xAI Grok. Experience the future of AI conversation.',
  keywords: 'AI, assistant, chatbot, artificial intelligence, OpenAI, GPT',
  authors: [{ name: 'RahulGPT Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" />
      </head>
      <body className="h-full bg-gradient-to-br from-gpt-bg via-gpt-sidebar to-gpt-bg text-gpt-text antialiased overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gpt-accent/5 via-transparent to-gpt-gray-medium/5 pointer-events-none"></div>
        <div className="relative z-10 h-full">
          {children}
        </div>
      </body>
    </html>
  )
}