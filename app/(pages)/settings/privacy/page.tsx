"use client"

import React from 'react'
import { motion } from "framer-motion"

const Page = () => {


  return (
    <motion.div initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7}} className="h-screen overflow-scroll w-full mx-auto px-28 p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>Welcome to ChatWave! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our chat platform.</p>

      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <ul className="list-disc pl-6">
        <li><h1 className='font-bold'>Account Information:</h1> Username, email, and profile details.</li>
        <li><h1 className='font-bold'>Messages:</h1> Securely stored and accessible only by intended recipients.</li>
        <li><h1 className='font-bold'>Device & Usage Data:</h1> IP address, device type, and browser information.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
      <p>We use your information to provide and improve our chat service, personalize your experience, ensure security, and comply with legal obligations.</p>

      <h2 className="text-2xl font-semibold mt-6">3. Data Sharing & Security</h2>
      <ul className="list-disc pl-6">
        <li>We <h1 className='font-bold'>do not sell</h1> your data to third parties.</li>
        <li>Messages are <h1 className='font-bold'>end-to-end encrypted</h1> where applicable.</li>
        <li>We implement security measures to protect your data.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">4. Your Rights</h2>
      <p>You have the right to access, update, or delete your data, request a copy of stored data, and withdraw consent for data processing.</p>

      <h2 className="text-2xl font-semibold mt-6">5. Changes to This Policy</h2>
      <p>We may update this Privacy Policy periodically. Significant changes will be communicated to users.</p>

      <h2 className="text-2xl font-semibold mt-6">6. Contact Us</h2>
      <p>If you have any questions, contact us at <h1 className='font-bold'>chatwawe@email.com</h1>.</p>

    </motion.div>
  )
}

export default Page
