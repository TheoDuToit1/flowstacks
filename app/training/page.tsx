'use client'

import { CTASection } from '@/components/CTASection'

export default function Training() {
  return (
    <div className="overflow-hidden bg-slate-950">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-sora mb-8 leading-tight text-white">
            We Train Teams To <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Multiply Profit</span> With AI
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto font-medium">
            In South Africa's tough economy, smarter systems win. FlowStacks Academy delivers practical AI training that cuts costs, boosts efficiency, and builds in-house capability — POPIA-compliant and industry-ready.
          </p>
          
          <div className="bg-slate-900/60 backdrop-blur-lg rounded-2xl p-8 max-w-3xl mx-auto border border-slate-800 mb-8">
            <p className="text-lg text-slate-300 mb-4">
              <strong className="text-cyan-400">No theory. No fluff.</strong> Hands-on training that your team can apply immediately to save hours and generate revenue.
            </p>
            <p className="text-lg text-slate-300">
              <strong className="text-purple-400">Results:</strong> Teams typically save 15+ hours weekly and automate 60% of repetitive tasks within 30 days.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="#programs" className="bg-slate-800/50 text-slate-300 px-6 py-3 rounded-full font-semibold hover:bg-slate-700/50 transition-all border border-slate-700">
              Explore Programs
            </a>
            <a href="#book-training" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Book a Training Call
            </a>
          </div>

          <p className="text-slate-500 text-sm">
            On-site: Cape Town • Johannesburg • Durban • Virtual nationwide
          </p>
        </div>
      </section>

      {/* Why AI Training Matters Now */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-sora mb-8 text-white">
              Why AI Training <span className="text-red-500">Matters Now</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              South African businesses face rising costs, skills shortages, and global competition. AI isn't a luxury — it's a survival tool.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Automate Repetitive Tasks</h3>
              <p className="text-slate-300">Free up time and focus on high-value work that drives revenue.</p>
            </div>

            <div className="text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Improve Customer Service</h3>
              <p className="text-slate-300">AI-driven tools that respond faster and more accurately than ever.</p>
            </div>

            <div className="text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-teal-400">Create Reports in Minutes</h3>
              <p className="text-slate-300">Generate proposals, insights, and compliance docs instantly.</p>
            </div>

            <div className="text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">Stay POPIA Compliant</h3>
              <p className="text-slate-300">Use the latest tech while maintaining data protection standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="programs" className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-sora mb-8 text-white">
              Our Training <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Programs</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Three clear paths for any organisation: Essentials for literacy, Operations for automation, and Leadership for strategy & risk.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Essentials */}
            <div className="p-8 bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Essentials</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Essentials</h3>
              <p className="text-slate-300 mb-6">Hands-on intro to GPT tools and safe, productive use across roles.</p>
              
              <div className="flex flex-wrap gap-3 text-sm text-slate-400 mb-6">
                <span className="bg-slate-800 px-3 py-1 rounded-full">1 day or 3×2h</span>
                <span className="bg-slate-800 px-3 py-1 rounded-full">On-site • Virtual</span>
                <span className="bg-slate-800 px-3 py-1 rounded-full">From R12k</span>
              </div>

              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Create better, safer prompts (POPIA-aware)
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Draft reports, emails & proposals in minutes
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Summarise docs, meetings & research
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Personal AI toolkit for everyday productivity
                </li>
              </ul>

              <a href="/training/ai-essentials" className="block w-full bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-all text-center">
                View Outline
              </a>
            </div>

            {/* AI for Business Operations */}
            <div className="p-8 bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Operations</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI for Business Operations</h3>
              <p className="text-slate-300 mb-6">Automation playbook for Finance, HR, Sales & Support using no-code workflows.</p>
              
              <div className="flex flex-wrap gap-3 text-sm text-slate-400 mb-6">
                <span className="bg-slate-800 px-3 py-1 rounded-full">2 days</span>
                <span className="bg-slate-800 px-3 py-1 rounded-full">On-site • Virtual</span>
                <span className="bg-slate-800 px-3 py-1 rounded-full">From R35k</span>
              </div>

              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Map repetitive tasks → build AI workflows
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Integrate email, sheets, CRM with GPT
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Customer support assistants & knowledge bases
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Measure ROI: time saved, cost per process
                </li>
              </ul>

              <a href="/training/ai-ops" className="block w-full bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all text-center">
                See Modules
              </a>
            </div>

            {/* AI for Leadership & Strategy */}
            <div className="p-8 bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition-all">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Leadership</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI for Leadership & Strategy</h3>
              <p className="text-slate-300 mb-6">Executive briefing on risk, compliance & competitive advantage in SA.</p>
              
              <div className="flex flex-wrap gap-3 text-sm text-slate-400 mb-6">
                <span className="bg-slate-800 px-3 py-1 rounded-full">Half-day / Full-day</span>
                <span className="bg-slate-800 px-3 py-1 rounded-full">Boardroom • Virtual</span>
                <span className="bg-slate-800 px-3 py-1 rounded-full">From R25k</span>
              </div>

              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  AI strategy aligned to tough SA conditions
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  POPIA, data governance & model risk
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  Capability roadmap & talent upskilling
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  Investment cases & quick-win pilots
                </li>
              </ul>

              <a href="/training/ai-leadership" className="block w-full bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-all text-center">
                Book Briefing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-sora mb-8 text-white">
              Business <span className="text-green-400">Outcomes</span>
            </h2>
          </div>

          <div className="bg-slate-900/60 rounded-2xl p-8 border border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-800/50 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">Automate repetitive admin</h4>
                <p className="text-slate-300">Save hours/week per employee</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">AI-assisted customer support</h4>
                <p className="text-slate-300">Knowledge bases that work 24/7</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">Faster proposals & reports</h4>
                <p className="text-slate-300">POPIA-aware compliance docs</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">Clear ROI tracking</h4>
                <p className="text-slate-300">Time saved, error reduction, throughput</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-sora mb-8 text-white">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-3">Is coding required?</h4>
              <p className="text-slate-300">No. We focus on practical, no-code use of GPT tools and simple integrations your teams can run immediately.</p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-3">How do you handle POPIA?</h4>
              <p className="text-slate-300">We include a safe-use policy, data handling guidelines, and configuration patterns to minimise personal data exposure.</p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-3">Do you tailor by industry?</h4>
              <p className="text-slate-300">Yes. We customise labs for finance/insurance, retail, healthcare, agriculture, energy, and public sector.</p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-3">Can you train nationwide?</h4>
              <p className="text-slate-300">Yes—on-site in Cape Town, Johannesburg & Durban, or virtual across South Africa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="book-training" className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-sora mb-8 text-white">
            Ready to Future-Proof Your <span className="text-green-400">Team</span>?
          </h2>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Pick a program or ask us to tailor a lab for your industry. We'll align outcomes to measurable ROI.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all">
              Book a Training Call
            </a>
            <a href="/portfolio" className="bg-slate-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-600 transition-all">
              See Our Systems in Action
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
