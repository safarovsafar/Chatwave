"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { supabase } from '@/shared/lib/subapse';
import user from "@/images/user.webp"
import { useRouter } from 'next/router';

const Page = () => {

  const id = localStorage.getItem("id")
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<any>("")
  const [loading, setLoading] = useState(false);

  async function getUserProfile() {
    try {
      const { data, error } = await supabase.from("next_project").select("*").eq("id", id)
      setName(data[0]?.userName)
      setEmail(data[0]?.email)
      setImage(data[0].photo)
    } catch (error: any) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getUserProfile();
  }, []);


  async function editUser(e: any) {
    e.preventDefault()
    const file = e.target["photo"].files[0]
    if (file) {
      await supabase.storage.from("userPhotos").remove([`${localStorage.getItem("id")}`])
      await supabase.storage.from("userPhotos").upload(`${localStorage.getItem("id")}`, file)
      const { data } = await supabase.storage.from("userPhotos").getPublicUrl(`${localStorage.getItem("id")}`)
      setImage(data.publicUrl)
      await supabase.from("next_project").update({ photo: image }).eq("id", id)
    }

    try {
      const result = await supabase.from("next_project").update({ userName: name, email: email }).eq("id", id)
      getUserProfile()
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <motion.div
      className="w-[99%] p-10 mx-auto bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <h2 className="text-2xl font-semibold mb-4">Edit profile</h2>

      <form onSubmit={editUser}>
        <div className="mb-4">
          <label className="block text-gray-600">User name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            name='password'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Reset password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            name='reset' />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Photo</label>
          {<img src={image ? image : user} alt='this photo' className="w-24 h-24 rounded-full mb-2" />}
          <input name='photo' type="file" />
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </motion.div>

  )
}

export default Page
