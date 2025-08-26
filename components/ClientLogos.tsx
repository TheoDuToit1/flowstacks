'use client'

import { motion } from 'framer-motion'

export function ClientLogos() {
  const clients = [
    { name: 'TechCorp', logo: '/logos/techcorp.svg' },
    { name: 'StartupHub', logo: '/logos/startuphub.svg' },
    { name: 'FinanceFlow', logo: '/logos/financeflow.svg' },
    { name: 'HealthPlus', logo: '/logos/healthplus.svg' },
    { name: 'EduTech', logo: '/logos/edutech.svg' },
    { name: 'RetailMax', logo: '/logos/retailmax.svg' },
  ]

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-8">
            Trusted by Leading Companies Across South Africa
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -100 * clients.length] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex space-x-16 items-center"
          >
            {[...clients, ...clients].map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-full h-full bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center">
                  <span className="text-slate-300 font-bold text-sm">{client.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-slate-800"
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span className="text-slate-400 text-sm">ISO 27001 Certified</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">★</span>
            </div>
            <span className="text-slate-400 text-sm">5.0 Clutch Rating</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🏆</span>
            </div>
            <span className="text-slate-400 text-sm">Top Developer 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
