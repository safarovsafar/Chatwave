import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import icon from "@/images/message_icon2.png"
import { usePathname } from 'next/navigation'

const SetAside = () => {
    const path = usePathname()
    return (
        <div className="h-screen w-[500px] p-6 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg text-white overflow-y-auto">
            <Link href={"/chats"}>
                <Image src={icon} alt='This photo' className='cursor-pointer' width={50} height={50} />
            </Link>

            <input className="w-full mt-2 px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Search..." type="text" />
            <hr className="my-4 border-gray-600" />
            <Link href={"/settings/edit"}>
                <div className={`flex items-center gap-4 p-3 rounded-lg ${path == "/settings/edit" && "bg-gray-700"}  hover:bg-gray-700 transition cursor-pointer`}>
                    <span className="p-2 bg-gray-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-pen"> <path d="M11.5 15H7a4 4 0 0 0-4 4v2" /> <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> <circle cx="10" cy="7" r="4" /> </svg>
                    </span>
                    <p className="text-xl font-medium">Edit profile</p>
                </div>
            </Link>

            <Link href={"/settings/privacy"}>
                <div className={`flex mt-2 items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer ${path == "/settings/privacy" && "bg-gray-700"}`}>
                    <span className="p-2 bg-gray-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock-keyhole"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
                    </span>
                    <p className="text-xl font-medium">Privacy and security</p>
                </div>
            </Link>
            <Link href={"/settings/appearence"}>
                <div className={`flex mt-2 items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer ${path == "/settings/appearence" && "bg-gray-700"}`}>
                    <span className="p-2 bg-gray-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pen-line"><path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /></svg>
                    </span>
                    <p className="text-xl font-medium">Appearence</p>
                </div>
            </Link>
            <Link href={"/about"}>
                <div className="flex mt-2 items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                    <span className="p-2 bg-gray-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                    </span>
                    <p className="text-xl font-medium">About</p>
                </div>
            </Link>
        </div>

    )
}

export default SetAside
