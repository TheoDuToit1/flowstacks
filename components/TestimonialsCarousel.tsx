'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO, TechStart SA',
      company: 'TechStart SA',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'flowstacks.dev transformed our vision into a stunning mobile app that exceeded all expectations. Their attention to detail and technical expertise is unmatched in Cape Town.',
      project: 'Mobile Banking App',
      results: '300% increase in user engagement'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, HealthTech Solutions',
      company: 'HealthTech Solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'The team at flowstacks.dev delivered our telemedicine platform ahead of schedule. Their AI-enhanced development process is revolutionary.',
      project: 'Telemedicine Platform',
      results: '500K+ patients served'
    },
    {
      name: 'Lisa Thompson',
      role: 'CTO, EduInnovate',
      company: 'EduInnovate',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Working with flowstacks.dev was a game-changer. They built us a learning platform that our students absolutely love. The conversion rates speak for themselves.',
      project: 'Learning Management System',
      results: '95% student satisfaction rate'
    },
    {
      name: 'David Rodriguez',
      role: 'Managing Director, RetailMax',
      company: 'RetailMax',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'flowstacks.dev created an e-commerce app that tripled our online sales. Their funnel optimization expertise is incredible.',
      project: 'E-commerce Mobile App',
      results: '300% sales increase'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

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
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders say about working with flowstacks.dev.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
            >
              {/* Background Quote Icon */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-300 opacity-50" />
              
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl lg:text-2xl text-slate-400 leading-relaxed mb-8 font-medium">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-slate-800">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-slate-400">
                      {currentTestimonial.role}
                    </p>
                    <p className="text-sm text-flow-blue font-semibold">
                      {currentTestimonial.company}
                    </p>
                  </div>
                </div>

                {/* Project Results */}
                <div className="text-right hidden sm:block">
                  <div className="text-sm text-slate-400 mb-1">
                    {currentTestimonial.project}
                  </div>
                  <div className="text-lg font-bold gradient-text">
                    {currentTestimonial.results}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-full lg:-translate-x-4 w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center transition-all duration-300 border border-slate-800"
          >
            <ChevronLeft className="w-6 h-6 text-slate-300" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-full lg:translate-x-4 w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center transition-all duration-300 border border-slate-800"
          >
            <ChevronRight className="w-6 h-6 text-slate-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-flow-blue to-flow-purple'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-12 border-t border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">5.0</span>
            </div>
            <span className="text-slate-400">Clutch Rating</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">98%</span>
            </div>
            <span className="text-slate-400">Client Retention</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">50+</span>
            </div>
            <span className="text-slate-400">Projects Delivered</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
