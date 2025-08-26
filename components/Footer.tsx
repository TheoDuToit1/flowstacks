'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Mobile App Development', href: '/services#mobile' },
      { name: 'Web Platforms', href: '/services#web' },
      { name: 'UX/UI Design', href: '/services#design' },
      { name: 'MVP Prototyping', href: '/services#mvp' },
      { name: 'API Integrations', href: '/services#api' },
      { name: 'Funnel Builder', href: '/services#funnel' },
    ],
    industries: [
      { name: 'Startups', href: '/industries#startups' },
      { name: 'Fintech', href: '/industries#fintech' },
      { name: 'HealthTech', href: '/industries#healthtech' },
      { name: 'EdTech', href: '/industries#edtech' },
      { name: 'eCommerce', href: '/industries#ecommerce' },
      { name: 'Marketplaces', href: '/industries#marketplaces' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
    ]
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/flowstacks', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/flowstacksdev', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/flowstacksdev', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/flowstacks.dev', label: 'Instagram' },
  ]

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold font-sora gradient-text">
                flowstacks.dev
              </span>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Helping South African businesses automate operations and implement AI solutions for competitive advantage and measurable profitability.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-neon-blue" />
                <span className="text-gray-300">Cape Town, South Africa</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-neon-blue" />
                <span className="text-gray-300">+27 12 345 6789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-neon-blue" />
                <span className="text-gray-300">hello@flowstacks.dev</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-lg font-bold mb-6">Industries</h3>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-12 border-t border-dark-700"
        >
          <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest insights on mobile app development, design trends, and industry news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-dark-800 border border-dark-600 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
              />
              <button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-dark-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} flowstacks.dev. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-neon-blue hover:to-neon-purple transition-all duration-300 group"
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
