import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata:Metadata = {
  title: 'Kanban-board',
  description: 'kanban-board app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-w-full min-h-screen bg-blue-100">
        <Header />
        <Sidebar />
        <main className='pl-40 pt-24' >
        {children}
        </main>
      </body>
    </html>
  )
}
