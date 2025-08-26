'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Zap, Rocket } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    // Add AOS initialization or other scroll animations here
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
    >

      {/* Main Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold font-sora mb-6 leading-tight"
        >
          <span className="block text-white">We Build Systems</span>
          <span className="block gradient-text">That Multiply Profit</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          From hidden income streams to lead nurture and automation, we design complete growth systems that free you from the grind and give you more net profit. Our apps are just one part of the machine — the rest is where the magic (and money) happens.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Link
            href="/contact"
            className="group bg-flow-blue hover:bg-flow-purple text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-[0_0_40px_rgba(59,130,246,0.35)]"
          >
            <span>Book Your Free Strategy Call</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <Link
            href="/portfolio"
            className="group bg-transparent border border-slate-700 text-slate-200 px-8 py-4 rounded-full font-semibold text-lg hover:border-slate-500 transition-all duration-300 flex items-center space-x-3"
          >
            <Play className="w-5 h-5" />
            <span>See Our Systems in Action</span>
          </Link>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '75+', label: 'Complete Systems Delivered' },
            { number: '98%', label: 'Client Retention Rate' },
            { number: '3M+', label: 'Leads & Transactions Generated' },
            { number: '24/7', label: 'Dedicated Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-flow-blue to-flow-purple rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
