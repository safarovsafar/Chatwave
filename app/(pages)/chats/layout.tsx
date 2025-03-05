import Aside from '@/app/components/aside/aside';
import React from 'react'

const Chats = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {

  return (
    <div>
      <div className="flex">
        <Aside />
        {children}
      </div>

    </div>
  )
}

export default Chats
