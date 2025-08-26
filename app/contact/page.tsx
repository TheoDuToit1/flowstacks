'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Calendar } from 'lucide-react'
import { CTASection } from '@/components/CTASection'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+27 12 345 6789',
      description: 'Mon-Fri from 8am to 6pm SAST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@flowstacks.dev',
      description: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Cape Town, South Africa',
      description: 'V&A Waterfront area'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 8am-6pm SAST',
      description: 'Weekend support available'
    }
  ]

  // Brief helper descriptions for project types
  const projectTypeHelp: Record<string, string> = {
    'profit-strategy': 'Uncover hidden income streams and map the path to higher net profit.',
    'custom-app': 'Profit-driven mobile or web apps to improve retention and sales.',
    'lead-nurture': 'Automated lead-to-customer journeys that increase conversions.',
    'ai-automation': '24/7 systems that reduce manual work and scale revenue.',
    'mvp-poc': 'Rapid prototype to validate your profit opportunity before investing.',
    'full-ecosystem': 'Strategy to launch: apps, funnels, automation, optimisation.'
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Thank You!
          </h2>
          <p className="text-slate-300 mb-8">
            We've received your message and will get back to you within 24 hours. 
            In the meantime, feel free to check out our portfolio or follow us on social media.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                projectType: '',
                budget: '',
                timeline: '',
                message: ''
              })
            }}
            className="bg-slate-800 text-white px-6 py-3 rounded-full font-semibold border border-slate-700 hover:bg-slate-700 transition-colors duration-200"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sora text-gray-900 dark:text-white mb-6">
              Let’s Unlock Your <span className="gradient-text">Hidden Profit Potential</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From strategy to automation, we build systems that uncover income streams, nurture leads, and boost net profit. Let’s start your profit-first transformation today.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Start Your Project
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="+27 12 345 6789"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select Project Type</option>
                        <option value="profit-strategy">Profit Strategy & Growth Blueprint</option>
                        <option value="custom-app">Custom App Development</option>
                        <option value="lead-nurture">Lead Nurture & Funnel Systems</option>
                        <option value="ai-automation">AI & Automation Integration</option>
                        <option value="mvp-poc">MVP / Proof of Concept</option>
                        <option value="full-ecosystem">Full Digital Ecosystem Build</option>
                      </select>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {formData.projectType ? projectTypeHelp[formData.projectType] : 'Choose the closest match — add details below.'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select Budget</option>
                        <option value="under-50k">Under R50,000</option>
                        <option value="50k-100k">R50,000 - R100,000</option>
                        <option value="100k-250k">R100,000 - R250,000</option>
                        <option value="250k-500k">R250,000 - R500,000</option>
                        <option value="over-500k">Over R500,000</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Ready to discuss your next profit engine?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  We're passionate about helping South African businesses unlock their full potential through intelligent automation and cutting-edge AI solutions. Let's work together to transform your operations, boost competitive advantage, and drive measurable profitability that makes a real difference to your bottom line.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-slate-900 rounded-xl p-6 border border-slate-800"
                  >
                    <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-slate-200" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{info.title}</h3>
                    <p className="text-slate-200 font-semibold mb-1">{info.details}</p>
                    <p className="text-slate-400 text-sm">{info.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                
                <a
                  href="tel:+27123456789"
                  className="flex items-center space-x-3 bg-slate-900 hover:bg-slate-800 p-4 rounded-xl transition-colors duration-200 border border-slate-800"
                >
                  <Phone className="w-5 h-5 text-slate-200" />
                  <div>
                    <div className="font-semibold text-slate-200">Call Now</div>
                    <div className="text-sm text-slate-400">Speak directly with our team</div>
                  </div>
                </a>

                <a
                  href="https://calendly.com/funnelworks/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-slate-900 hover:bg-slate-800 p-4 rounded-xl transition-colors duration-200 border border-slate-800"
                >
                  <Calendar className="w-5 h-5 text-slate-200" />
                  <div>
                    <div className="font-semibold text-slate-200">Book Discovery Call</div>
                    <div className="text-sm text-slate-400">Free 30-minute consultation</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/27123456789?text=${encodeURIComponent("Hi! I'm interested in discussing a mobile app project with flowstacks.dev.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-slate-900 hover:bg-slate-800 p-4 rounded-xl transition-colors duration-200 border border-slate-800"
                >
                  <div className="w-5 h-5 text-slate-200">💬</div>
                  <div>
                    <div className="font-semibold text-slate-200">WhatsApp</div>
                    <div className="text-sm text-slate-400">Quick chat on WhatsApp</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA (shared) */}
      <CTASection />
    </div>
  )
}
