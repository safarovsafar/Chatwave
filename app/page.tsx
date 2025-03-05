"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import { supabase } from '../shared/lib/subapse';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import icon from "../images/message_icon2.png"
export let middleId: any = ""

export default function Page() {
  const [data, setData] = useState<any>([])
  const [error, setError] = useState<string>("")
  const router = useRouter()

  async function getUsers() {
    try {
      const { data, error } = await supabase.from("next_project").select("*");
      setData(data)
      console.log(data);

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

  function loginFunc(e: any) {
    e.preventDefault()
    if (e.target["name"].value == "" || e.target["password"].value == "") {
      return setError("Fill all lines")
    }

    let validation = false
    for (let i = 0; i < data.length; i++) {
      if (e.target["name"].value == data[i].userName && e.target["password"].value == data[i].password) {
        validation = true
        localStorage.setItem("id", data[i].id)
        middleId = data[i].id
      }
    }
    if (validation) {
      localStorage.setItem("userName", e.target["name"].value)
      router.push("/chats")
    } else {
      setError("User name or password is incorrect")
    }
    if (localStorage.getItem("id") == 13) {
      router.push("/admin")
    }
  }

  return (
    <div className='w-[100%] text-white bg-gradient-to-br from-purple-800 to-blue-600  m-auto gap-[50px] h-[100vh] flex justify-center items-center'>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }} className="w-[40%]">
        <form className='p-4 bg-black bg-opacity-50 rounded-xl text-center w-[400px]' onSubmit={loginFunc}>
          <h2 className='text-[40px] font-bold text-center'>Sign in</h2>
          <input name="name" className='block w-full mt-4 text-black h-[40px] rounded-lg p-2' type="text" placeholder="User name" required />
          <input name="password" className='block w-full text-black mt-4 h-[40px] rounded-lg p-2' type="password" placeholder="Пароль" required />
          <p className="mt-2 text-xl font-semibold">Don't have an account <Link className="text-blue-500 cursor-pointe" href={"/register"}>Register</Link></p>
          <p className="mt-2 text-xl font-semibold text-red-600">{error}</p>
          <button className='text-xl p-2 bg-orange-400 mt-8 border-orange-400 rounded-lg' type="submit">Submit</button>
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
