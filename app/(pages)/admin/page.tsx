"use client"

import { supabase } from '@/shared/lib/subapse'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [data, setData] = useState<any>()
    const router = useRouter()
    const id: any = localStorage.getItem("id")


    async function getUsers() {
        if (id !== "13") {
            router.push("/");
            return;
        }

        try {
            const { data } = await supabase.from("next_project").select("*");
            setData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    async function deleteFunc(id: string | number) {
        try {
            await supabase.from("next_project").delete().eq("id", id)
            getUsers()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">User Management</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">ID</th>
                            <th className="p-2 text-left">Username</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((user: any, i: number) => {
                            return user.id != 13 ? <tr key={user.id} className="border-b" >
                                <td className="p-2">{i + 1}</td>
                                <td className="p-2">{user.userName}</td>
                                <td className="p-2">
                                    <button onClick={() => deleteFunc(user.id)}>Delete user</button>
                                </td>
                            </tr> : null
                        })}
                    </tbody>
                </table>
            </div>

        </div >
    )
}

export default Page
