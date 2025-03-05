'use client'

import { supabase } from '@/shared/lib/subapse'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Drawer from '@/app/components/drawer/drawer'
import { useRouter } from "next/navigation";

const Page = () => {
  const [chats, setChats] = useState<any>([])
  const [isChats, setIsChats] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [chatId, setChatId] = useState<any>("")
  const [userId, setUserId] = useState("")
  const [user, setUser] = useState<any>(null)
  const [idx, setIdx] = useState<any>("")
  const { id } = useParams()
  let recieveId = localStorage.getItem("id")
  const router = useRouter()

  async function getChats() {
    try {
      const { data } = await supabase.from("chats").select("*")
      console.log(data);
      for (let el of data) {
        if (el.userid == id && el.recieveId == recieveId || el.userid == recieveId && el.recieveId == id) {
          return (
            setIdx(el.id),
            setChats(el.message),
            setUserId(el.id),
            setIsChats(true)
          )
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getUser() {
    try {
      const { data, error } = await supabase.from("next_project").select("*").eq("id", id).single()
      setUser(data)
      console.log(data);

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getChats()
    getUser()
  }, [])


  async function send(e: any) {
    e.preventDefault();
    const send = e.target["send"].value;
    const file = e.target["send"]

    const newMessage = [
      {
        userId: id,
        messages: [
        ]
      }
    ]
    const { messages } = newMessage[0]
    for (let el of chats[0]?.messages) {
      messages.push(el)
    }
    messages.push({
      id: Date.now(),
      text: send,
      sent: localStorage.getItem("id")
    })

    try {
      const { data, error } = await supabase.from("chats").update({ message: newMessage }).eq("id", userId);
      getChats()
      if (error) throw error;

      console.log("Сообщение отправлено:", data);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
    e.target.reset()
  }

  async function createChat() {
    const userid = localStorage.getItem("id")
    const recieveId = id
    const message: any = [
      {
        "userId": id,
        "messages": [
        ]
      }
    ]
    try {
      const { data } = await supabase.from("chats").insert([{ userid, recieveId, message }])
      getChats()
    } catch (error) {
      console.error(error);
    }
  }

  async function deletChat() {
    let result: any = []
    chats[0].messages.forEach((e: any) => {
      if (e.id != chatId) {
        result.push(e)
      }
    })
    const message: any = [
      {
        "userId": id,
        "messages": result
      }
    ]

    try {
      await supabase.from("chats").update({ message: message }).eq("id", userId)
      getChats()
    } catch (error) {
      console.error(error);
    }
    setIsModal(false)
  }

  async function deletWhole() {
    try {
      await supabase.from("chats").delete().match({ id: idx })
      router.push("/chats")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='w-[100%] h-screen flex flex-col bg-gray-100 dark:bg-black dark:text-black'>

      {isChats ? <div className='flex-1 overflow-y-auto  space-y-4'>
        <div className='rounded-lg bg-white fixed w-full p-2 text-2xl flex gap-4 items-center'>
          <img className='w-[50px] h-[50px] rounded-full' src={user?.photo} alt="" />
          <p className='w-[100px]'>{user?.userName}</p>
          <p className='w-[60%] flex justify-end gap-4'>
            <svg aria-label="Голосовой звонок" className="x1lliihq x1n2onr6 x5n08af cursor-pointer" fill="currentColor" height="30" role="img" viewBox="0 0 24 24" width="30"><title>Голосовой звонок</title><path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path></svg>
            <Drawer>
              <div className='mt-6'>
                <p className='text-4xl font-semibold'>Information</p>
                <hr className='border-black mt-6 w-[100%]' />
                <div className='mt-4 text-xl flex items-center gap-4'>
                  <svg aria-label="Mute icon" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="38" role="img" viewBox="0 0 24 24" width="38"><title>Mute icon</title><path d="m21.306 14.019-.484-.852A6.358 6.358 0 0 1 20 9.997a7.953 7.953 0 0 0-4.745-7.302 3.971 3.971 0 0 0-6.51.002 7.95 7.95 0 0 0-4.74 7.323 6.337 6.337 0 0 1-.83 3.175l-.468.823a4.001 4.001 0 0 0 3.476 5.983h1.96a3.98 3.98 0 0 0 7.716 0h1.964a4.004 4.004 0 0 0 3.482-5.982Zm-9.304 6.983a1.993 1.993 0 0 1-1.722-1.001h3.444a1.993 1.993 0 0 1-1.722 1.001Zm7.554-3.997a1.986 1.986 0 0 1-1.732.996H6.184a2.002 2.002 0 0 1-1.74-2.993l.47-.822a8.337 8.337 0 0 0 1.093-4.174 5.962 5.962 0 0 1 3.781-5.584.996.996 0 0 0 .494-.426 1.976 1.976 0 0 1 3.439 0 1 1 0 0 0 .494.425 5.989 5.989 0 0 1 3.786 5.634 8.303 8.303 0 0 0 1.082 4.094l.483.852a1.984 1.984 0 0 1-.01 1.998Z"></path></svg>
                  Turm off messages for this chat
                  <input type="checkbox" />
                </div>
                <hr className='border-black mt-6 w-[100%]' />
                <p onClick={deletWhole} className='cursor-pointer text-red-500 hover:text-red-600 font-medium mt-[320px]'>Delete chat</p>
                <p className='cursor-pointer text-red-500 hover:text-red-600 font-medium mt-[15px]'>Block user</p>
                <p className='text-red-500 hover:text-red-600 font-medium mt-[15px]'>Complain</p>
              </div>
            </Drawer>
          </p>
        </div>
        {chats[0]?.messages.map((e: any, i: number) => {
          return <div className={`flex gap-4 items-center px-2 py-1 ${e.sent == localStorage.getItem("id") ? 'justify-end' : ''}`}>
            {e.sent == localStorage.getItem("id") && <button onClick={() => {
              setIsModal(true)
              setChatId(e.id)
            }} className={`text-40px cursor-pointer ${i == 0 && "mt-16"}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg></button>
            }

            <div className={`${e.sent == localStorage.getItem("id") ? "bg-blue-500 text-white" : "text-black bg-gray-100"} px-4 py-2 rounded-lg shadow ${i == 0 && "mt-16"}`}>
              <p>{e.text}</p>
            </div>
          </div>
        })}
      </div> : <div>
        <div className='w-full h-[100vh] flex justify-center items-center'>
          <div className="text-center">
            <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af m-auto" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96"><title></title><path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path></svg>
            <button onClick={createChat} className='text-xl px-10 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 hover:scale-105 duration-150 mt-4 text-white'>Send message</button>
          </div>
        </div>
      </div>
      }

      {isChats && <form className="flex items-center p-4 border-t bg-white dark:bg-gray-800" onSubmit={send}>
        <input type="text" name="send" className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a message..." />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          Send
        </button>
      </form>}

      {
        isModal && <motion.div className="bg-white rounded-2xl p-4 absolute top-[200px] text-center left-[800px] max-w-md shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}>
          <button onClick={() => setIsModal(false)} className='absolute top-2 right-2'>&times;</button>
          <button onClick={deletChat} className="px-4 w-20 text-center py-2 m-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">Delete</button>
          <button className="px-4 w-20 text-center py-2 m-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition block">Edit </button>
        </motion.div>
      }
    </div >
  )
}

export default Page
