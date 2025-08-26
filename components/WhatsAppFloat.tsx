'use client'

import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const whatsappNumber = '+27123456789'
  const defaultMessage = 'Hi! I\'m interested in discussing a mobile app project with flowstacks.dev.'

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* WhatsApp Float Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white transition-colors duration-300"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.div>
        </motion.button>

        {/* Pulse Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-green-500 rounded-full -z-10"
        />
      </motion.div>

      {/* WhatsApp Chat Popup */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 20,
          scale: isOpen ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-24 right-6 z-40 w-80 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 overflow-hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-green-500 p-4 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">👋</span>
            </div>
            <div>
              <h3 className="font-semibold">flowstacks.dev Support</h3>
              <p className="text-sm opacity-90">Typically replies instantly</p>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="p-4">
          <div className="bg-gray-100 dark:bg-dark-700 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Hi there! 👋 Ready to build something amazing? Let's chat about your project!
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleWhatsAppClick}
              className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200 border border-green-200 dark:border-green-800"
            >
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                💬 Start a conversation
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                Get a free consultation
              </div>
            </button>

            <button
              onClick={() => {
                const encodedMessage = encodeURIComponent('I\'d like to schedule a discovery call to discuss my project.')
                const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`
                window.open(whatsappUrl, '_blank')
              }}
              className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 border border-blue-200 dark:border-blue-800"
            >
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                📅 Book Discovery Call
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Free 30-minute consultation
              </div>
            </button>

            <button
              onClick={() => {
                const encodedMessage = encodeURIComponent('Can you send me your portfolio and pricing information?')
                const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`
                window.open(whatsappUrl, '_blank')
              }}
              className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200 border border-purple-200 dark:border-purple-800"
            >
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                📁 View Portfolio & Pricing
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                See our work and get a quote
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            We'll respond within minutes during business hours
          </div>
        </div>
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
        />
      )}
    </>
  )
}
