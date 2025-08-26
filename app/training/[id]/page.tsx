import React from "react";
import { courseDetails } from "@/data/courseDetails";
import RoiCalculator from "@/components/training/RoiCalculator";

// If you're on Next 13/14 App Router:
export async function generateStaticParams() {
  return Object.keys(courseDetails).map((id) => ({ id }));
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courseDetails[params.id];

  if (!course) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-4xl px-6 py-24">
          <h1 className="text-3xl font-bold">Course not found</h1>
          <p className="mt-2 text-slate-300">Please check the URL or browse all programs on the Training page.</p>
          <a href="/training" className="mt-6 inline-block rounded-xl bg-slate-800 px-5 py-3 hover:bg-slate-700 transition-all">Back to Training</a>
        </section>
      </main>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.summary,
    "provider": {
      "@type": "Organization",
      "name": "FlowStacks Academy",
      "sameAs": "https://flowstacks.dev"
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-24">
        <div className="max-w-3xl">
          <a href="/training" className="text-slate-400 hover:text-slate-300 transition-colors">← All Programs</a>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight font-sora">
            {course.title}
          </h1>
          <p className="mt-4 text-slate-300 text-lg">{course.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full bg-slate-800 px-3 py-1">{course.duration}</span>
            <span className="rounded-full bg-slate-800 px-3 py-1">{course.format}</span>
            {course.priceHint && <span className="rounded-full bg-slate-800 px-3 py-1">{course.priceHint}</span>}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/contact" className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-3 font-medium hover:shadow-lg transition-all">Book This Course</a>
            <a href="/contact" className="rounded-xl bg-slate-800 px-5 py-3 hover:bg-slate-700 transition-all">Ask About Customisation</a>
          </div>
          {course.lastUpdated && (
            <div className="mt-3 text-xs text-slate-500">Last updated: {course.lastUpdated}</div>
          )}
        </div>
      </section>

      {/* Quick facts */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold text-white">Who Should Attend</h3>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              {course.targetAudience.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold text-white">Prerequisites</h3>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              {course.prerequisites.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold text-white">Outcomes</h3>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              {course.outcomes.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="mx-auto max-w-6xl px-6 py-6">
        <h2 className="text-2xl font-bold text-white font-sora">Course Outline</h2>
        <div className="mt-4 grid gap-4">
          {course.modules.map((m) => (
            <div key={m.title} className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">{m.title}</h4>
                <span className="text-slate-400 text-sm">{m.time}</span>
              </div>
              <div className="mt-2">
                <div className="text-sm uppercase tracking-wide text-slate-400">Objectives</div>
                <ul className="mt-1 list-disc pl-5 text-slate-300 space-y-1">
                  {m.objectives.map((o) => <li key={o}>{o}</li>)}
                </ul>
              </div>
              {m.exercises && (
                <div className="mt-3">
                  <div className="text-sm uppercase tracking-wide text-slate-400">Exercises</div>
                  <ul className="mt-1 list-disc pl-5 text-slate-300 space-y-1">
                    {m.exercises.map((e) => <li key={e}>{e}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Capstone & Assessment */}
      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {course.capstone && (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <h3 className="text-xl font-semibold text-white">{course.capstone.title}</h3>
              <p className="mt-2 text-slate-300">{course.capstone.description}</p>
              <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
                {course.capstone.deliverables.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          )}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="text-xl font-semibold text-white">Assessment</h3>
            <p className="mt-2 text-slate-300">{course.assessment.format}</p>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              {course.assessment.criteria.map((c) => <li key={c}>{c}</li>)}
            </ul>
            {course.assessment.certificate && (
              <div className="mt-3 rounded-lg bg-slate-800/50 p-3 text-sm text-slate-300">
                {course.assessment.certificate}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enablement Kit + ROI */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="text-xl font-semibold text-white">Enablement Kit</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm uppercase tracking-wide text-slate-400">Policies</div>
                <ul className="mt-2 list-disc pl-5 text-slate-300 space-y-1">
                  {course.enablementKit.policies.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wide text-slate-400">Prompt Library</div>
                <ul className="mt-2 list-disc pl-5 text-slate-300 space-y-1">
                  {course.enablementKit.promptLibrary.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm uppercase tracking-wide text-slate-400">Artifacts</div>
              <ul className="mt-2 list-disc pl-5 text-slate-300 space-y-1">
                {course.enablementKit.artifacts.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>

          <RoiCalculator defaultTrainingCost={20000} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h4 className="text-2xl font-bold text-white font-sora">Ready to Train Your Team?</h4>
          <p className="mt-2 text-slate-300">
            We can tailor the modules to your industry and compliance needs.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/contact" className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-medium hover:shadow-lg transition-all">
              Book This Course
            </a>
            <a href="/training" className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700 transition-all">
              Back to All Programs
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
