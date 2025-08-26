'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { CTASection } from '@/components/CTASection'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'strategy', name: 'Profit Strategy' },
    { id: 'app', name: 'App Development' },
    { id: 'nurture', name: 'Lead Nurture' },
    { id: 'ai', name: 'AI Automation' },
  ]

  const projects = [
    {
      id: 1,
      title: 'FinanceFlow — From Banking App to Profit Engine',
      category: ['strategy', 'app', 'ai'],
      description: 'We didn’t just build a mobile banking app — we designed a revenue pathway. By combining AI-driven financial insights with customer re-engagement flows, FinanceFlow boosted net profit by 37% in the first year.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Node.js', 'AI/ML', 'Blockchain'],
      client: 'FinanceFlow SA',
      year: '2024',
      duration: '16 weeks',
      profitLevers: [
        'Hidden cross-sell opportunities via app',
        'Automated upsell flows triggered by user actions',
        'AI risk scoring to reduce churn',
      ],
      results: [
        '+37% Net Profit in 12 months',
        '300% increase in engagement',
        '45% drop in support calls',
      ],
    },
    {
      id: 2,
      title: 'HealthPlus — Telemedicine With a Built-in Growth Loop',
      category: ['app', 'nurture'],
      description: 'Instead of a “static” telemedicine app, we built a patient-to-patient referral engine baked right into the platform — converting existing users into a 24/7 acquisition channel.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'WebRTC', 'PostgreSQL', 'Stripe'],
      client: 'HealthPlus Medical',
      year: '2024',
      duration: '12 weeks',
      profitLevers: [
        'In-app referral & rewards',
        'Automated follow-up scheduling',
        'Patient retention sequences via WhatsApp & email',
      ],
      results: [
        '95% patient retention',
        'Acquisition costs cut by 40%',
        '500K+ consultations in first year',
      ],
    },
    {
      id: 3,
      title: 'EduTech — Turning Learning Into Recurring Revenue',
      category: ['strategy', 'app', 'ai'],
      description: 'We designed gamified learning with subscription-based value ladders — each level unlocking new monetization opportunities.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      technologies: ['Flutter', 'React', 'Firebase', 'TensorFlow'],
      client: 'EduInnovate',
      year: '2023',
      duration: '20 weeks',
      profitLevers: [
        'Tiered subscription offers',
        'Gamification driving longer user lifetime',
        'AI-based course recommendations to increase upsells',
      ],
      results: [
        '60% increase in course sales',
        '85% completion rate',
        '3x longer average customer lifespan',
      ],
    },
    {
      id: 4,
      title: 'RetailMax — E-commerce That Pays You Back',
      category: ['app', 'nurture', 'ai'],
      description: 'Our strategy didn’t just make buying easier — it turned every sale into a predictable repeat purchase through automation and smart incentives.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Shopify Plus', 'GraphQL', 'AWS'],
      client: 'RetailMax Group',
      year: '2023',
      duration: '14 weeks',
      profitLevers: [
        'One-click reorders',
        'Abandoned cart recovery',
        'AI-based product bundling',
      ],
      results: [
        '3x mobile sales',
        '+25% average order value',
        '40% repeat purchase rate in 6 months',
      ],
    },
    {
      id: 5,
      title: 'StartupHub — Networking That Fuels Funding',
      category: ['strategy', 'nurture', 'app'],
      description: 'A professional networking platform for startups with investor matching, event management, and collaboration tools — optimized to turn connections into capital.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Next.js', 'Supabase', 'Stripe'],
      client: 'StartupHub Africa',
      year: '2023',
      duration: '18 weeks',
      profitLevers: [
        'Investor-ready profiles that highlight traction',
        'Automated event follow-ups',
        'Warm-intro matchmaking engine',
      ],
      results: [
        '500+ startup connections made',
        'R100M+ in funding facilitated',
        'High-intent deal flow for communities',
      ],
    },
    {
      id: 6,
      title: 'FitTrack — Wellness That Retains',
      category: ['app', 'ai', 'nurture'],
      description: 'A comprehensive fitness app with AI coaching, nutrition tracking, and social challenges — built to maximize retention and lifetime value.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      technologies: ['Flutter', 'Firebase', 'TensorFlow', 'HealthKit'],
      client: 'FitTrack Wellness',
      year: '2023',
      duration: '10 weeks',
      profitLevers: [
        'Habit loops through challenges',
        'Personalized AI coaching upsells',
        'Streak rewards to extend LTV',
      ],
      results: [
        '2M+ workouts completed',
        '90% user retention after 30 days',
        '22% conversion to paid tiers',
      ],
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter))

  return (
    <div className="overflow-hidden bg-slate-950">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sora text-gray-900 dark:text-white mb-6">
              Real Results, <span className="gradient-text">Not Just Pretty Apps</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Every project starts with uncovering hidden income streams and ends with delivering more net profit — powered by brilliant apps, lead nurturing, and AI-driven automation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-dark-700"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Project Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <div className="text-sm opacity-90">{project.client}</div>
                        <div className="text-sm opacity-90">{project.year} • {project.duration}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                          <Github className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Results:</h4>
                    <ul className="space-y-1">
                      {project.results.map((result: string, resultIndex: number) => (
                        <li key={resultIndex} className="text-sm text-slate-300 flex items-center">
                          <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2 flex-shrink-0"></span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Case Study Button */}
                  <button className="w-full bg-slate-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center space-x-2 border border-slate-700">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
