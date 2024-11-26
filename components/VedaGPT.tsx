'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaOm, FaPaperPlane, FaHome, FaHistory, FaSun, FaMoon } from 'react-icons/fa'

interface VedaGPTProps {
  onNavigate: (section: string) => void
}

export default function VedaGPT({ onNavigate }: VedaGPTProps) {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    {
      text: `🌟 Namaste, seeker! Welcome to **VedaGPT**, your **spiritual guide** and **knowledge companion**. 🙏\n\n🔮 With VedaGPT, you can:\n- Explore the **wisdom of ancient scriptures**.\n- Gain insights into **spiritual growth** and **mindfulness**.\n- Learn about **Indian history, culture**, and **traditions**.\n\n🕉️ How can I assist you on your spiritual journey today?`,
      isUser: false,
    },
  ])
  const [input, setInput] = useState('')
  const [theme, setTheme] = useState<'daylight' | 'divine'>('divine')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "🌈 Thank you for reaching out! Let me share some wisdom with you. What topic interests you today?", isUser: false },
        ])
      }, 1000)
      setInput('')
    }
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'daylight' ? 'divine' : 'daylight'))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen p-8 transition-colors duration-500 ${
        theme === 'daylight'
          ? 'bg-amber-100 text-amber-900'
          : 'bg-gradient-to-b from-indigo-900 to-purple-900 text-amber-100'
      }`}
    >
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-8 space-x-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-lg font-semibold transition duration-300 space-x-2"
          onClick={toggleTheme}
        >
          {theme === 'daylight' ? (
            <><FaMoon className="text-amber-900" /><span>Switch to Night</span></>
          ) : (
            <><FaSun className="text-amber-100" /><span>Switch to Day</span></>
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-lg font-semibold transition duration-300 space-x-2"
          onClick={() => onNavigate('vedabase')}
        >
          <FaHome />
          <span>VedaBase</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-lg font-semibold transition duration-300 space-x-2"
          onClick={() => onNavigate('history')}
        >
          <FaHistory />
          <span>Indian History</span>
        </motion.button>
      </nav>

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center mb-12">VedaGPT</h1>

      {/* Chat Box */}
      <div
        className={`max-w-2xl mx-auto mb-12 rounded-xl p-6 space-y-4 ${
          theme === 'daylight' ? 'bg-white shadow-lg' : 'bg-gray-800 bg-opacity-80'
        }`}
        style={{ maxHeight: '60vh', overflowY: 'auto' }}
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block px-6 py-4 rounded-lg shadow ${
                message.isUser
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                  : theme === 'daylight'
                  ? 'bg-amber-200 text-amber-900'
                  : 'bg-purple-700 text-amber-100'
              }`}
            >
              {message.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your spiritual question..."
            className={`w-full py-4 px-5 rounded-full focus:outline-none shadow-lg transition duration-300 ${
              theme === 'daylight'
                ? 'bg-amber-100 text-amber-900 placeholder-amber-600 focus:ring-2 focus:ring-amber-500'
                : 'bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500'
            }`}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600"
          >
            <FaPaperPlane size={22} />
          </button>
        </div>
      </form>

      {/* Footer Icon */}
      <motion.div
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed bottom-4 right-4 text-6xl text-orange-500 animate-pulse"
      >
        <FaOm />
      </motion.div>
    </motion.div>
  )
}
