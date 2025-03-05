"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-blue-600 text-white flex flex-col items-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-6">
        About ChatWave
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg max-w-2xl text-center">
        ChatWave is an innovative messaging platform designed to bring people closer together.
        With seamless real-time communication, enhanced security, and a sleek user interface,
        we make conversations smoother and more enjoyable.
      </motion.p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-20 p-6 rounded-2xl text-center"
        >
          <h2 className="text-2xl font-semibold">Real-Time Messaging</h2>
          <p className="text-sm mt-2">Fast and reliable chat experience with instant message delivery.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-20 p-6 rounded-2xl text-center"
        >
          <h2 className="text-2xl font-semibold">End-to-End Encryption</h2>
          <p className="text-sm mt-2">Your privacy is our priority. All messages are fully encrypted.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-20 p-6 rounded-2xl text-center"
        >
          <h2 className="text-2xl font-semibold">Cross-Platform Support</h2>
          <p className="text-sm mt-2">Available on Web, iOS, and Android for seamless communication.</p>
        </motion.div>
      </div>

      <Link href={"/settings"}>
        <motion.button whileHover={{ scale: 1.1 }} className="mt-10 bg-orange-500 px-6 py-3 rounded-lg text-xl font-bold"> Back to settings </motion.button>
      </Link>
    </div>
  );
}
