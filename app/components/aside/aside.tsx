"use client"

import React, { useEffect, useState } from 'react'
import user from "@/images/user.webp"
import Link from 'next/link'
import { supabase } from '@/shared/lib/subapse'
import { usePathname } from 'next/navigation'

const Aside = () => {
    const [data, setData] = useState<any>([])
    const [search, setSearch] = useState("")
    const path = usePathname()

    async function getUsers() {
        try {
            const { data } = await supabase.from("next_project").select("*")
            setData(data)
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getUsers()
    }, [])



    return (
        <div className="h-screen w-[500px] p-6 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg text-white overflow-y-auto">
            <div className="flex items-center gap-4">
                <Link href={"/settings"}><span className='cursor-pointer'><svg aria-label="Настройки" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="26" role="img" viewBox="0 0 24 24" width="26"><title>Настройки</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="20" y2="20"></line></svg></span></Link>
            </div>
            <hr className="my-4 border-gray-600" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Search..." type="text" />

            <div className="">
                {data.filter((el: any) => el.userName.toLowerCase().includes(search)).map((e: any) => {
                    return e.id != localStorage.getItem("id") && e.id!=13 ? <Link href={`/chats/${e.id}`}><div className={`mt-4 cursor-pointer ${path == `/chats/${e.id}` ? "bg-gray-700" : ""} hover:bg-gray-700 transition rounded-lg p-2 flex items-center gap-4`}>
                        <img src={e.photo? e.photo :user} alt='This user' width={50} height={50} className='rounded-full' />
                        <p className='text-xl font-semibold'>{e.userName}</p>
                    </div></Link> : null
                })}
            </div>

        </div>
    )
}

export default Aside
