"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CTASection } from "@/components/CTASection"

export default function AboutPage() {
  const approach = [
    {
      step: "1.",
      title: "Profit Strategy Partner",
      body:
        "Before we write a single line of code, we dig into your business model to uncover where profit leaks and untapped opportunities hide. We’re not here to sell you a website or app — we’re here to engineer predictable growth.",
    },
    {
      step: "2.",
      title: "Hidden Income Streams",
      body:
        "Every business has unclaimed revenue sitting right under the surface. Through data analysis, market positioning, and customer behavior insights, we turn “what you already have” into new streams of profit.",
    },
    {
      step: "3.",
      title: "Brilliant Apps",
      body:
        "We design and build apps that earn their keep. Whether mobile, web, or hybrid, every feature has a purpose:",
      bullets: ["Convert more visitors", "Increase lifetime value", "Lower churn"],
    },
    {
      step: "4.",
      title: "Lead Nurture",
      body:
        "It’s not just about leads — it’s about profitable leads. Our systems keep your pipeline warm with automated touchpoints that feel personal, turning prospects into repeat buyers without extra staff workload.",
    },
    {
      step: "5.",
      title: "AI-Driven Automation",
      body:
        "We plug AI into your workflows so your business works 24/7 without more payroll. From predictive sales triggers to automated customer service, we create systems that scale without the overhead.",
    },
  ]

  const reasons = [
    "We lead with profit strategy, not just design.",
    "We identify income opportunities you didn’t know you had.",
    "We create apps and automation that generate ongoing ROI.",
    "We measure success in net profit, not vanity metrics.",
  ]

  return (
    <div className="overflow-hidden bg-slate-950">
      {/* Hero */}
      <section className="pt-24 pb-16 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sora text-white mb-6">
              About <span className="gradient-text">Us</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              We Build Profit Engines, Not Just Digital Products
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              At flowstacks.dev, we don’t measure success by lines of code or pixels on a screen — we measure it in net profit added to your business. We partner with you from strategy to execution, uncovering hidden income streams, building brilliant apps, automating lead nurture, and deploying AI-driven systems that keep growing your revenue while you sleep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Approach: Profit Strategy Partner → More Net Profit
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approach.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.body}</p>
                    {item.bullets && (
                      <ul className="mt-3 space-y-1">
                        {item.bullets.map((b) => (
                          <li key={b} className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                            <span className="w-1.5 h-1.5 bg-neon-blue rounded-full mr-2 flex-shrink-0"></span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 border-t border-gray-100 dark:border-dark-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 dark:bg-dark-800 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              To transform digital projects from “nice-to-have” into profit centers — giving every client a direct, measurable increase in their bottom line.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Clients Choose Us */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Clients Choose Us
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5"
              >
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-slate-600 mt-2 mr-3"></span>
                  <p className="text-slate-300">{r}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (shared) */}
      <CTASection />
    </div>
  )
}
