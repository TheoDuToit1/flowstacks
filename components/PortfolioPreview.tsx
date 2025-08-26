'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function PortfolioPreview() {
  const projects = [
    {
      title: 'FinanceFlow Mobile',
      category: 'Fintech',
      description: 'A comprehensive mobile banking app with AI-powered insights and seamless UX.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      tags: ['React Native', 'AI Integration', 'Banking'],
      stats: { downloads: '500K+', rating: '4.8', users: '50K+' },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'HealthPlus Platform',
      category: 'HealthTech',
      description: 'Telemedicine platform connecting patients with healthcare providers seamlessly.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      tags: ['Next.js', 'Telemedicine', 'PWA'],
      stats: { downloads: '200K+', rating: '4.9', users: '25K+' },
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'EduTech Learning',
      category: 'EdTech',
      description: 'Interactive learning platform with gamification and progress tracking.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      tags: ['Flutter', 'Gamification', 'Analytics'],
      stats: { downloads: '1M+', rating: '4.7', users: '100K+' },
      color: 'from-purple-500 to-pink-500'
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
            Featured <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover how we've helped businesses across various industries achieve their digital transformation goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-slate-900 rounded-2xl overflow-hidden transition-all duration-300 border border-slate-800"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Category Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${project.color} text-white text-sm font-semibold rounded-full`}>
                  {project.category}
                </div>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-slate-900/90 border border-slate-700 rounded-full hover:bg-slate-900 transition-colors duration-200">
                    <ExternalLink className="w-4 h-4 text-slate-300" />
                  </button>
                  <button className="p-2 bg-slate-900/90 border border-slate-700 rounded-full hover:bg-slate-900 transition-colors duration-200">
                    <Github className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-slate-800">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {project.stats.downloads}
                    </div>
                    <div className="text-xs text-slate-400">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {project.stats.rating}★
                    </div>
                    <div className="text-xs text-slate-400">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {project.stats.users}
                    </div>
                    <div className="text-xs text-slate-400">Users</div>
                  </div>
                </div>

                {/* View Case Study Link */}
                <Link
                  href={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent hover:underline transition-all duration-300`}
                >
                  View Case Study
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center bg-flow-blue hover:bg-flow-purple text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
          >
            View Full Portfolio
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
