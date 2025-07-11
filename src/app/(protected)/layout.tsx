import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { AppSidebar } from './app-sidebar'

type Props = {
  children: React.ReactNode 
}

const sidebarLayout = ({ children }: Props) => {
  return (
  <div className="flex min-h-screen">
    <AppSidebar />
    <main className="flex-1 m-2">
      <div className='flex items-center gap-2 border-sidebar-border bg-sidebar border shadow rounded-md p-2 px-4'>
        {/* < SearchBar /> */}
        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
      <div className="h-4"></div>
      {/* <main content> */}
      <div className='border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4'>
        {children}
      </div>
    </main>
  </div>

  )
}

export default sidebarLayout
