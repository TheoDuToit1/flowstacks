'use client'

import { motion } from 'framer-motion'
import { Smartphone, Globe, Palette, Zap, Code, Users } from 'lucide-react'
import Link from 'next/link'

export function ServicesPreview() {
  const services = [
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native iOS & Android apps built with React Native and Flutter for maximum performance and user engagement.',
      features: ['React Native', 'Flutter', 'Native Performance', 'Cross-Platform'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Web Platforms',
      description: 'Scalable web applications and progressive web apps that deliver exceptional user experiences.',
      features: ['Next.js', 'React', 'PWA', 'Responsive Design'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'UX/UI Design',
      description: 'Design-first approach creating intuitive interfaces that convert visitors into loyal customers.',
      features: ['User Research', 'Prototyping', 'Design Systems', 'Conversion Optimization'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'MVP Prototyping',
      description: 'Rapid prototyping and MVP development to validate your ideas and get to market faster.',
      features: ['Rapid Development', 'Market Validation', 'Iterative Design', 'Quick Launch'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Code,
      title: 'API Integrations',
      description: 'Seamless third-party integrations and custom API development for enhanced functionality.',
      features: ['REST APIs', 'GraphQL', 'Third-party Services', 'Custom Backends'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Users,
      title: 'Funnel Builder',
      description: 'Custom funnel-building solutions to optimize your conversion rates and maximize revenue.',
      features: ['Conversion Optimization', 'A/B Testing', 'Analytics', 'Lead Generation'],
      color: 'from-pink-500 to-purple-500'
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
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From uncovering hidden income streams to launching the tools that make them grow, we deliver end-to-end systems that put profit first. Every solution is built to maximise returns, streamline operations, and keep customers coming back — with apps, platforms, and automation working together as one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-slate-900 rounded-2xl p-8 transition-all duration-300 border border-slate-800 hover:border-slate-700 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Learn More Link */}
              <Link
                href="/services"
                className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent hover:underline transition-all duration-300`}
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center bg-flow-blue hover:bg-flow-purple text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
