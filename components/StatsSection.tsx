'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

function Counter({ end, duration = 2, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold gradient-text">
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  const stats = [
    {
      number: 75,
      suffix: '+',
      label: 'Complete Systems Delivered',
      description: 'End-to-end growth systems'
    },
    {
      number: 98,
      suffix: '%',
      label: 'Client Retention Rate',
      description: 'Long-term partnerships built'
    },
    {
      number: 3,
      suffix: 'M+',
      label: 'Leads & Transactions Generated',
      description: 'Across client funnels & apps'
    },
    {
      number: 24,
      suffix: '/7',
      label: 'Dedicated Support',
      description: 'Always available when you need us'
    }
  ]

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-sora text-white mb-4">
            Results That Drive Growth
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Numbers that back our promise to build apps that win customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="bg-slate-900 rounded-2xl p-8 transition-all duration-300 group-hover:scale-105 border border-slate-800">
                <div className="mb-4">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-slate-400 text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-16 pt-12 border-t border-slate-800"
        >
          <div className="flex items-center space-x-3 bg-slate-900 px-6 py-3 rounded-full border border-slate-800">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">95</span>
            </div>
            <span className="text-slate-300 font-medium">Lighthouse Score</span>
          </div>
          
          <div className="flex items-center space-x-3 bg-slate-900 px-6 py-3 rounded-full border border-slate-800">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <span className="text-slate-300 font-medium">AI-Enhanced Development</span>
          </div>
          
          <div className="flex items-center space-x-3 bg-slate-900 px-6 py-3 rounded-full border border-slate-800">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">PWA</span>
            </div>
            <span className="text-slate-300 font-medium">Progressive Web Apps</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
