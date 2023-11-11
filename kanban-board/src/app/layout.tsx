"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Provider } from 'react-redux';
import {store} from '../store';
import {DndContext} from '@dnd-kit/core';

const inter = Inter({ subsets: ['latin'] });

type ReduxProviderProps = {
  children: React.ReactNode;
};

function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}

const metadata:Metadata = {
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
      <ReduxProvider >
      <body className="min-w-full min-h-screen bg-blue-100">
        <Header />
        <Sidebar />
        <main className='pl-40 pt-24' >
        {children}
        </main>
      </body>
      </ReduxProvider>
    </html>
  )
}
