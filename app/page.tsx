'use client'

import { HeroSection } from '@/components/HeroSection'
import { ServicesPreview } from '@/components/ServicesPreview'
import { ClientLogos } from '@/components/ClientLogos'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { PortfolioPreview } from '@/components/PortfolioPreview'
import { CTASection } from '@/components/CTASection'
import { StatsSection } from '@/components/StatsSection'

export default function Home() {
  return (
    <div className="overflow-hidden bg-slate-950">
      <HeroSection />
      <ClientLogos />
      <StatsSection />
      {/* Section 2 – The Real Problem */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-4xl md:text-5xl font-bold font-sora text-white">You’re Running on Effort — Not a System That Pays Off</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center text-lg md:text-xl text-slate-300 space-y-4">
            <p>Stop hoping tomorrow will fix itself. Let’s build something that finally delivers the clarity, income, and relief you deserve.</p>
            <p>Without the right system, you’re always working harder than you need to — and leaving money on the table.</p>
          </div>
        </div>
      </section>

      {/* Section 3 – Our Growth System Flow */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-sora text-white">How We Turn Complex Operations into Predictable Profit</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
              <p className="font-semibold text-white">Step 1 – Profit Strategy Partner</p>
              <p className="text-slate-300 mt-2">We start by finding the money leaks and hidden income streams you’ve been missing.</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
              <p className="font-semibold text-white">Step 2 – Hidden Income Streams</p>
              <p className="text-slate-300 mt-2">We restructure your offers, pricing, and client journey so you earn more from the same audience.</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
              <p className="font-semibold text-white">Step 3 – Brilliant Apps</p>
              <p className="text-slate-300 mt-2">Custom-built mobile or web apps to capture leads, deliver value, and keep customers coming back.</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
              <p className="font-semibold text-white">Step 4 – Lead Nurture</p>
              <p className="text-slate-300 mt-2">Automated sequences that warm up prospects and turn them into buyers — without you lifting a finger.</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
              <p className="font-semibold text-white">Step 5 – AI-Driven Automation</p>
              <p className="text-slate-300 mt-2">Smart processes that handle repetitive work, speed up sales, and free up your time.</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
              <p className="font-semibold text-white">Step 6 – More Net Profit</p>
              <p className="text-slate-300 mt-2">You walk away with a system that compounds your income month after month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 – Transformation Story */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-sora text-white">From Overworked & Uncertain → Calm, Clear, & Profitable</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
              <p className="text-slate-300"><strong className="text-white">Left Column (Before):</strong> Running your business without a system feels like juggling in a storm. Every sale is a push, every lead a chase.</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
              <p className="text-slate-300"><strong className="text-white">Right Column (After):</strong> With the right system in place, sales arrive while you sleep, clients feel looked after, and you get time (and profits) back.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 – Proof & Social Trust */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold font-sora text-white">Systems That Deliver — Every Time</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-slate-300">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 text-center">Clients doubled revenue within 90 days</div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 text-center">5x ROI from automation rollouts</div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 text-center">Consistent 30–50% higher lead-to-sale conversion rates</div>
          </div>
        </div>
      </section>

      

      <ServicesPreview />
      <PortfolioPreview />
      <TestimonialsCarousel />
      <CTASection />
    </div>
  )
}
