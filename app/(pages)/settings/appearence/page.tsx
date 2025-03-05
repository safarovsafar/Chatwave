import Switcher from '@/shared/darkMode/switcher'
import React from 'react'

const Page = () => {
  return (
    <div className={`w-full m-auto h-screen overflow-scroll p-6 rounded-xl shadow-lg`}>
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Appearance Settings</h1>
      <p className="text-lg text-center">Customize the look and feel of ChatWave to match your preferences.</p>

      <div className="mt-8 space-y-6">
        <div className={`p-4 rounded-lg shadow-md `}>
          <h2 className="text-2xl font-semibold text-blue-300">Theme Selection</h2>
          <p className="text-gray-400">Choose between light and dark mode.</p>
          <div className="flex items-center gap-10 mt-4">
            <span className="text-gray-400">Light</span>
            <Switcher />
            <span className="text-gray-400 ml-3">Dark</span>
          </div>
        </div>

        <div className={`p-4 rounded-lg shadow-md`}>
          <h2 className="text-2xl font-semibold text-blue-300">Font & Text Size</h2>
          <p className="text-gray-400">Adjust the font size to improve readability and match your comfort level.</p>
        </div>

        <div className={`p-4 rounded-lg shadow-md`}>
          <h2 className="text-2xl font-semibold text-blue-300">Custom Colors</h2>
          <p className="text-gray-400">Personalize your chat experience by selecting custom accent colors.</p>
        </div>

        <div className={`p-4 rounded-lg shadow-md`}>
          <h2 className="text-2xl font-semibold text-blue-300">Layout Preferences</h2>
          <p className="text-gray-400">Modify the layout of the chat window to optimize usability.</p>
        </div>

        <div className={`p-4 rounded-lg shadow-md`}>
          <h2 className="text-2xl font-semibold text-red-400">Reset to Default</h2>
          <p className="text-gray-400">Revert all appearance settings back to default if needed.</p>
        </div>
      </div>
    </div>
  )
}

export default Page
