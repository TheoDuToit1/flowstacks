'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
// Removed lucide icons for services; using emoji per new copy
import { CTASection } from '@/components/CTASection'

export default function ServicesPage() {
  const services = [
    {
      iconEmoji: '💡',
      title: 'Profit Strategy Partner',
      description:
        'We start by mapping your hidden income streams, optimizing your business model, and designing a growth plan that increases your net profit before a single line of code is written.',
      tags: ['Growth Mapping', 'Revenue Optimization', 'ROI Tracking', 'Business Model Design'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      iconEmoji: '🌐',
      title: 'High-Performance Digital Platforms',
      description:
        'From web platforms to mobile apps, we build performance-driven digital tools designed to capture leads, boost engagement, and directly contribute to your bottom line.',
      tags: ['React', 'Next.js', 'PWA', 'Mobile App Dev', 'Cross-Platform'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      iconEmoji: '🤖',
      title: 'AI-Driven Automation',
      description:
        'We integrate AI workflows that handle repetitive tasks, nurture leads automatically, and give you real-time insights — freeing your time and scaling your revenue without extra overhead.',
      tags: ['Process Automation', 'Lead Nurturing', 'Predictive Analytics', 'AI Integrations'],
      color: 'from-green-500 to-teal-500',
    },
    {
      iconEmoji: '📈',
      title: 'Lead Nurturing Systems',
      description:
        'From the first touch to repeat purchase, our funnels and CRM integrations keep prospects warm, engaged, and primed to buy — on autopilot.',
      tags: ['Funnel Optimization', 'CRM Integration', 'Retention Strategies', 'Email/SMS Campaigns'],
      color: 'from-orange-500 to-red-500',
    },
    {
      iconEmoji: '🎨',
      title: 'UX/UI Design for Conversion',
      description:
        'Our design-first approach turns visitors into loyal customers by creating frictionless, high-conversion experiences that drive action and build trust.',
      tags: ['User Research', 'Prototyping', 'Conversion Optimization', 'Design Systems'],
      color: 'from-indigo-500 to-blue-500',
    },
    {
      iconEmoji: '🔄',
      title: 'Ongoing Profit Optimization',
      description:
        'Once live, we continuously monitor and optimize your systems for better conversions, higher retention, and increased lifetime value per customer.',
      tags: ['A/B Testing', 'Analytics', 'CRO', 'Performance Tracking'],
      color: 'from-pink-500 to-purple-500',
    },
  ]

  return (
    <div className="overflow-hidden bg-slate-950">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sora text-white mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              From strategy to scaling, we build profit-first systems that uncover hidden income, streamline operations, and keep customers coming back — apps are just one part of the bigger growth machine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:shadow-xl hover:border-slate-700 transition-all duration-300"
              >
                {/* Service Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mr-4`}>
                    <span className="text-3xl">{service.iconEmoji}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Removed technologies section per new copy */}

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`inline-flex items-center text-sm font-semibold text-slate-200 hover:underline transition-all duration-300`}
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-sora text-white mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A proven methodology that ensures your project is delivered on time, within budget, and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We dive deep into your business goals and user needs' },
              { step: '02', title: 'Design', description: 'Create wireframes, prototypes, and stunning visual designs' },
              { step: '03', title: 'Develop', description: 'Build your app with cutting-edge technology and best practices' },
              { step: '04', title: 'Deploy', description: 'Launch your app and provide ongoing support and maintenance' },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border border-slate-800 bg-slate-900"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                  <span className="text-slate-200 font-bold text-base">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-slate-300">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (shared) */}
      <CTASection />
    </div>
  )
}
