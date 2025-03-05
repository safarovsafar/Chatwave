"use client"

import Aside from '@/app/components/aside/aside';
import SetAside from '@/app/components/set-aside/setAside';
import Switcher from '@/shared/darkMode/switcher'
import React from 'react'

const Settings = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <div className='flex'>
      <SetAside />
      {children}
    </div>
  )
}

export default Settings
