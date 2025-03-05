"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import { supabase } from '../../../shared/lib/subapse';
import Link from "next/link";
import { useRouter } from "next/navigation";
import icon from "../../../images/message_icon2.png"
import Image from "next/image";

export default function Register() {
    const [error, seterror] = useState<any>(null);
    const [data, setData] = useState<any>([])
    let router = useRouter()

    async function getUsers() {
        try {
            const { data, error } = await supabase.from("next_project").select("*");
            setData(data)
            if (error) {
                console.error("Ошибка при получении:", error.message);
            } else {
                console.log("Данные получены:", data);
                return data;
            }
        } catch (error: any) {
            console.error("Ошибка при запросе:", error.message);
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    async function addUser(event: any) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const userName = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        const confirm = formData.get("confirm")

        for (let i = 0; i < data.length; i++) {
            if (data[i].userName == userName) {
                seterror("User with this userName already exists")
                return null
            }
        }

        if (password == confirm) {
            try {
                const res = await supabase.from("next_project").insert([{ userName, email, password }])
                if (res.status == 201) {
                    router.push("/")
                }

            } catch (error: any) {
                console.error("Ошибка при добавлении:", error.message);
            }
        } else {
            seterror("Password doesn't match")
        }
    }


    return (
        <div className='w-[100%] text-white bg-gradient-to-br from-purple-800 to-blue-600 m-auto gap-[50px] h-[100vh] flex justify-center items-center'>
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }} className="w-[40%]">
                <form className='p-4 bg-black bg-opacity-50 rounded-xl text-center w-[400px]' onSubmit={addUser}>
                    <h2 className='text-[40px] font-bold text-center'>Sign in</h2>
                    <input name='name' className='block w-full text-black mt-4 h-[40px] rounded-lg p-2' type="text" placeholder="User name" required />
                    <input name='email' className='block w-full mt-4 text-black h-[40px] rounded-lg p-2' type="email" placeholder="Email" required />
                    <input name='password' className='block w-full text-black mt-4 h-[40px] rounded-lg p-2' type="password" placeholder="Password" required />
                    <input name='confirm' className='block w-full text-black mt-4 h-[40px] rounded-lg p-2' type="password" placeholder="Confirm password" required />
                    <p className="mt-2 text-xl font-semibold">Already have an account <Link className="text-blue-500 cursor-pointe" href={"/"}>Log in?</Link></p>
                    <p className="mt-2 text-xl font-semibold text-red-500">{error}</p>
                    <button className='text-xl p-2 bg-orange-400 mt-8 hover:bg-orange-600 border-orange-400 rounded-lg' type="submit">Submit</button>
                </form>
            </motion.div>

            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }} className="w-[40%]">
                <h2 className='text-[50px] font-bold text-blue-500'>Register</h2>
                <p className='text-xl font-semibold'>Sign in to continue</p>
                <Image className="mt-[30px] rounded-2xl" src={icon} width={170} height={170} alt="This picture" />
                <p className='mt-[30px]'>This massenger was built by Safar This massenger is for those who want to <br /> feel unreal feelings end experience unrepeatable moments </p>
                <button className='text-xl p-2 bg-orange-400 mt-[30px] border-orange-400 rounded-lg'>Learn more</button>
            </motion.div>

        </div>
    );
}
