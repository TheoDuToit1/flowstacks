// Types for strong DX
export type Module = {
  title: string;
  time: string;
  objectives: string[];
  exercises?: string[];
};

export type Assessment = {
  format: string;       // e.g. "Practical + quiz"
  criteria: string[];   // how you grade success
  certificate?: string; // optional cert text
};

export type EnablementKit = {
  policies: string[];      // safe-use, POPIA, data handling
  promptLibrary: string[]; // ready-to-use prompts
  artifacts: string[];     // templates/workbooks delivered
};

export type CourseDetail = {
  id: string;
  title: string;
  summary: string;
  targetAudience: string[];
  prerequisites: string[];
  duration: string;
  format: string;
  outcomes: string[];
  modules: Module[];
  capstone?: {
    title: string;
    description: string;
    deliverables: string[];
  };
  assessment: Assessment;
  enablementKit: EnablementKit;
  priceHint?: string;
  lastUpdated?: string;
};

// ===== Course Library =====
export const courseDetails: Record<string, CourseDetail> = {
  "ai-essentials": {
    id: "ai-essentials",
    title: "AI Essentials",
    summary:
      "Hands-on intro to GPT tools and safe, productive use across roles. Teams leave with a practical toolkit they can apply the same day.",
    targetAudience: [
      "Managers & professionals",
      "SMEs & operations teams",
      "Anyone new to AI (no coding required)"
    ],
    prerequisites: ["Basic computer literacy", "Company Google/Microsoft account"],
    duration: "1 day or 3×2h",
    format: "On-site • Virtual",
    outcomes: [
      "Create better, safer prompts (POPIA-aware)",
      "Draft reports, emails & proposals in minutes",
      "Summarise docs, meetings & research",
      "Build a personal AI toolkit for daily productivity"
    ],
    modules: [
      {
        title: "Module 1 — What AI Can & Can't Do",
        time: "40 min",
        objectives: [
          "Understand LLM capabilities & limitations",
          "Differentiate automation vs augmentation",
          "Identify 3 high-value use cases per role"
        ],
        exercises: ["Role mapping: 'replace/assist/ignore' matrix for your team"]
      },
      {
        title: "Module 2 — Prompt Craft & Guardrails",
        time: "70 min",
        objectives: [
          "Use structures: task → context → constraints → output style",
          "Chain prompts for iterative improvement",
          "Mitigate hallucinations with retrieval & verification"
        ],
        exercises: [
          "Rewrite a messy prompt into a reliable one",
          "Create a reusable 'Prompt Frame' for your daily task"
        ]
      },
      {
        title: "Module 3 — POPIA-Safe AI Use",
        time: "40 min",
        objectives: [
          "Know what personal info is risky and how to mask it",
          "Adopt safe copy/paste patterns & storage hygiene",
          "Set an internal 'Green/Amber/Red' data policy"
        ],
        exercises: ["Red-team drill: fix 3 unsafe prompts to pass compliance"]
      },
      {
        title: "Module 4 — Productivity Power-Ups",
        time: "70 min",
        objectives: [
          "Generate first-draft reports, proposals & emails",
          "Summarise long docs & meetings into action plans",
          "Use checklists & style guides for consistent outputs"
        ],
        exercises: [
          "Turn a PDF + meeting notes into a 1-page brief",
          "Draft a client reply in your brand tone"
        ]
      },
      {
        title: "Module 5 — Your Personal AI Toolkit",
        time: "40 min",
        objectives: [
          "Assemble a role-specific prompt library",
          "Pick tools for notes, docs, sheets & tickets",
          "Measure time saved with a simple baseline"
        ],
        exercises: ["Create a 5-prompt starter pack + 2 quick macros"]
      }
    ],
    capstone: {
      title: "Capstone — 'From Complexity to Clarity'",
      description:
        "Participants take a messy real-world input (emails, doc, meeting notes) and ship a polished deliverable aligned to company style & compliance.",
      deliverables: [
        "One 1-page brief or proposal",
        "Prompt pack (5+) in your brand tone",
        "Before/After time-saved estimate"
      ]
    },
    assessment: {
      format: "Practical deliverable + short quiz",
      criteria: [
        "Accuracy & relevance of output",
        "Compliance alignment (POPIA guardrails)",
        "Clarity & structure of prompts",
        "Time-saved self-report vs baseline"
      ],
      certificate: "FlowStacks Academy: AI Essentials — Certificate of Completion"
    },
    enablementKit: {
      policies: [
        "POPIA-aware safe-use checklist",
        "Green/Amber/Red data classification guide",
        "Prompt & output retention policy"
      ],
      promptLibrary: [
        "Executive summary in 7 bullets (tone: board-ready)",
        "Turn call notes into a client follow-up email",
        "Extract action items & owners from transcript",
        "Draft proposal section with constraints + style guide",
        "Create a 10-step SOP from a messy process"
      ],
      artifacts: [
        "Capstone template (Google Doc)",
        "Meeting-to-Action worksheet",
        "Prompt Frame cards (printable)"
      ]
    },
    priceHint: "Team packs from R12k",
    lastUpdated: new Date().toISOString().slice(0, 10)
  },

  "ai-ops": {
    id: "ai-ops",
    title: "AI for Business Operations",
    summary:
      "Automation playbook for Finance, HR, Sales & Support using no-code AI workflows. Teams design and implement automations that free up hours per week.",
    targetAudience: [
      "Operations managers",
      "HR, Finance, and Customer Service teams",
      "SMEs looking to cut costs and scale without extra hires"
    ],
    prerequisites: ["Basic digital literacy", "Comfort with Excel/Sheets"],
    duration: "2 days",
    format: "On-site • Virtual",
    outcomes: [
      "Map repetitive processes to automation flows",
      "Integrate email, spreadsheets, and CRMs with GPT",
      "Deploy customer support assistants and knowledge bases",
      "Track ROI: time saved, cost per process, error reduction"
    ],
    modules: [
      {
        title: "Module 1 — Process Discovery",
        time: "90 min",
        objectives: [
          "Identify repetitive tasks across functions",
          "Map workflows: trigger → action → outcome",
          "Select 3 pilot processes per team"
        ],
        exercises: ["Team workflow audit (sticky notes → Miro map)"]
      },
      {
        title: "Module 2 — No-Code Automation Tools",
        time: "120 min",
        objectives: [
          "Connect GPT with Zapier / Make",
          "Set up triggers from email, forms, and spreadsheets",
          "Design fail-safe fallbacks"
        ],
        exercises: ["Build a 3-step Zap: email → GPT draft → Google Doc"]
      },
      {
        title: "Module 3 — AI-Powered Customer Service",
        time: "90 min",
        objectives: [
          "Train a chatbot on your knowledge base",
          "Configure escalation to humans",
          "Track resolution time improvements"
        ],
        exercises: ["Set up a simple FAQ bot with escalation logic"]
      },
      {
        title: "Module 4 — Finance & HR Automations",
        time: "2 hrs",
        objectives: [
          "AI-assisted invoice coding & approvals",
          "Automated leave request handling",
          "Create compliance checklists with GPT"
        ],
        exercises: ["Build an 'expense report → approval summary' flow"]
      },
      {
        title: "Module 5 — Measure ROI & Scale",
        time: "60 min",
        objectives: [
          "Quantify time/cost saved per workflow",
          "Build an ROI dashboard",
          "Decide scale vs pilot projects"
        ],
        exercises: ["Use the ROI calculator with your team data"]
      }
    ],
    capstone: {
      title: "Capstone — AI Workflow Pilot",
      description:
        "Each team builds and demos one working AI-powered workflow that saves measurable hours.",
      deliverables: [
        "One functional no-code automation",
        "Process documentation",
        "ROI estimate vs baseline"
      ]
    },
    assessment: {
      format: "Live demo + short reflective write-up",
      criteria: [
        "Functionality of automation",
        "Accuracy / error handling",
        "Clarity of documentation",
        "ROI justification"
      ],
      certificate: "FlowStacks Academy: AI for Business Operations — Certificate of Completion"
    },
    enablementKit: {
      policies: [
        "Automation change-control checklist",
        "Error handling & escalation guide",
        "Data flow diagram template"
      ],
      promptLibrary: [
        "Summarise customer complaint into CRM ticket",
        "Turn expense entries into approval summary",
        "Draft onboarding email from HR template"
      ],
      artifacts: [
        "Workflow audit template",
        "ROI dashboard (Sheets)",
        "Zapier/Make starter pack"
      ]
    },
    priceHint: "From R35k",
    lastUpdated: new Date().toISOString().slice(0, 10)
  },

  "ai-leadership": {
    id: "ai-leadership",
    title: "AI for Leadership & Strategy",
    summary:
      "Executive-level course on AI disruption, risk management, and competitive advantage in South Africa's economy. Tailored for boards and senior leadership.",
    targetAudience: [
      "CEOs and board members",
      "Strategy & innovation leads",
      "Public sector directors & policymakers"
    ],
    prerequisites: ["None — executive-level awareness"],
    duration: "Half-day / Full-day",
    format: "Boardroom • Virtual",
    outcomes: [
      "Understand AI's impact on South African industries",
      "Balance opportunity with regulatory risk (POPIA, ESG)",
      "Set strategic AI adoption roadmaps",
      "Evaluate ROI and competitive positioning"
    ],
    modules: [
      {
        title: "Module 1 — The AI Landscape",
        time: "60 min",
        objectives: [
          "Global vs South African adoption trends",
          "Identify disruption signals in your sector",
          "Spot immediate vs long-term opportunities"
        ]
      },
      {
        title: "Module 2 — Risk & Compliance",
        time: "60 min",
        objectives: [
          "Data privacy & POPIA obligations",
          "Ethical AI frameworks",
          "Case studies: misuse & regulatory penalties"
        ]
      },
      {
        title: "Module 3 — Competitive Advantage with AI",
        time: "90 min",
        objectives: [
          "Map AI adoption to Porter's Five Forces",
          "Evaluate AI as cost-lever vs differentiation tool",
          "Case studies: SA banking, insurance, retail"
        ]
      },
      {
        title: "Module 4 — Building the Roadmap",
        time: "90 min",
        objectives: [
          "Set 12–24 month AI maturity milestones",
          "Choose 'quick wins' vs long bets",
          "Align AI initiatives with ESG & B-BBEE goals"
        ],
        exercises: ["Draft an AI roadmap with 3 quick wins + 2 strategic bets"]
      }
    ],
    capstone: {
      title: "Capstone — Board Strategy Session",
      description:
        "Leaders draft a mini-AI strategy for their org, including quick wins, risk safeguards, and long-term bets.",
      deliverables: [
        "AI readiness scorecard",
        "Draft 12-month roadmap",
        "Risk & compliance action plan"
      ]
    },
    assessment: {
      format: "Presentation + facilitated discussion",
      criteria: [
        "Clarity of roadmap",
        "Risk awareness & mitigation",
        "Alignment to company objectives",
        "Board engagement & buy-in"
      ],
      certificate: "FlowStacks Academy: AI Leadership — Certificate of Participation"
    },
    enablementKit: {
      policies: [
        "AI governance charter (board-level)",
        "POPIA & data governance overview",
        "Ethics & responsible use checklist"
      ],
      promptLibrary: [
        "Draft board briefing note from industry report",
        "Summarise competitor AI initiatives",
        "Generate 3 disruption scenarios & mitigation plans"
      ],
      artifacts: [
        "AI readiness scorecard template",
        "Board presentation deck (editable)",
        "Risk/ROI evaluation matrix"
      ]
    },
    priceHint: "From R25k",
    lastUpdated: new Date().toISOString().slice(0, 10)
  }
};
