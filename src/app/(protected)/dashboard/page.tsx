'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'

const DashboardPage = () => {
  const { user } = useUser()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </div>
  );
}

export default DashboardPage
