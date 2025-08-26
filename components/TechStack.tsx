'use client'

import { motion } from 'framer-motion'

export function TechStack() {
  const technologies = [
    {
      category: 'Mobile Development',
      techs: [
        { name: 'React Native', logo: '⚛️', color: 'from-blue-400 to-blue-600' },
        { name: 'Flutter', logo: '🦋', color: 'from-blue-500 to-cyan-500' },
        { name: 'Swift', logo: '🍎', color: 'from-gray-700 to-gray-900' },
        { name: 'Kotlin', logo: '🤖', color: 'from-green-500 to-green-700' },
      ]
    },
    {
      category: 'Web Development',
      techs: [
        { name: 'Next.js', logo: '▲', color: 'from-black to-gray-800' },
        { name: 'React', logo: '⚛️', color: 'from-blue-400 to-blue-600' },
        { name: 'TypeScript', logo: 'TS', color: 'from-blue-600 to-blue-800' },
        { name: 'Tailwind CSS', logo: '🎨', color: 'from-cyan-400 to-cyan-600' },
      ]
    },
    {
      category: 'Backend & Database',
      techs: [
        { name: 'Node.js', logo: '🟢', color: 'from-green-500 to-green-700' },
        { name: 'Supabase', logo: '⚡', color: 'from-green-400 to-green-600' },
        { name: 'Firebase', logo: '🔥', color: 'from-yellow-400 to-orange-500' },
        { name: 'PostgreSQL', logo: '🐘', color: 'from-blue-600 to-blue-800' },
      ]
    },
    {
      category: 'Cloud & DevOps',
      techs: [
        { name: 'Vercel', logo: '▲', color: 'from-black to-gray-800' },
        { name: 'AWS', logo: '☁️', color: 'from-orange-400 to-orange-600' },
        { name: 'Docker', logo: '🐳', color: 'from-blue-500 to-blue-700' },
        { name: 'GitHub Actions', logo: '⚙️', color: 'from-gray-700 to-gray-900' },
      ]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-800 dark:to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-sora text-gray-900 dark:text-white mb-4">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We use cutting-edge technologies to build scalable, performant, and future-proof applications that stand the test of time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-dark-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-neon-blue to-neon-purple rounded-full mr-3"></span>
                {category.category}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {category.techs.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (techIndex * 0.05) }}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-gradient-to-br ${tech.color} p-4 rounded-xl text-white text-center group cursor-pointer hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {tech.logo}
                    </div>
                    <div className="text-sm font-semibold">{tech.name}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-dark-700">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">95+</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Lighthouse Score</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">PWA performance benchmark</p>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-dark-700">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">AI-Enhanced</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">OpenAI powered prototyping</p>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-dark-700">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">24/7</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Monitoring</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Real-time performance tracking</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
