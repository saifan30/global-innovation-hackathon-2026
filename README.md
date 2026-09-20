# Course & Skill Recommendation Engine

### Global Innovation Hackathon 2026 – Build for a Better Future
**Theme:** *Innovate Without Borders*

---

## 1. Project Title
**Course & Skill Recommendation Engine: Borderless Career Accelerator**

## 2. Hackathon & Theme
* **Hackathon:** Global Innovation Hackathon 2026 – Build for a Better Future
* **Theme:** *Innovate Without Borders*
* **Focus Area:** Borderless workforce readiness, transparent AI career advisory, open educational resources, and objective skill benchmarking for developers and learners worldwide.

## 3. Project Overview
The **Course & Skill Recommendation Engine** is an end-to-end career acceleration platform designed to empower talent regardless of geographic origin, institutional pedigree, or socioeconomic background. By connecting individual competency assessments against standardized industry role benchmarks, the platform calculates transparent skill gaps, prioritizes learning vectors, generates pacing-calibrated multi-phase roadmaps, and recommends vetted open-access coursework and verifiable capstone projects.

## 4. Problem Statement
Global tech talent faces three critical barriers when preparing for borderless, high-demand software engineering careers:
1. **Opaque Industry Benchmarks:** Job descriptions and syllabi often rely on generic buzzwords rather than quantifiable competency levels, leaving learners uncertain about how far their existing skills are from production standards.
2. **Generic, Uncurated Course Overload:** Popular platforms flood learners with hundreds of disconnected tutorials without explaining *why* a particular resource is recommended or how many weeks it will require given their specific weekly study commitment.
3. **Black-Box AI Hallucinations:** Most generative AI career tools fabricate non-existent courses, invent credentials, or provide vague advice with no mathematical grounding or deterministic fallback when API limits or network outages occur.

## 5. Proposed Solution
This application delivers a transparent, dual-engine career acceleration platform:
* **Deterministic Calculation Engine:** A rule-based weighted matrix that evaluates assessed proficiency levels against audited industry benchmarks, producing exact readiness scores, critical gap counts, and weekly study timeline calculations.
* **Server-Side AI Strategic Diagnostic:** A server-side integration with Google Gemini (`gemini-3.8-flash`) that synthesizes the user's background, available weekly study hours, and active competency deficits into tailored strategic advice and open-source portfolio guidance.
* **Explainable Recommendations:** Every course and capstone project recommendation displays a transparent *"Why am I seeing this?"* breakdown detailing targeted competency deficits, required level jumps, format suitability, and estimated completion time.

## 6. Key Innovation
* **Hybrid Deterministic + AI Architecture:** Objective calculations (scores, hours, roadmap durations) are computed deterministically, while strategic narrative synthesis is delegated to Gemini with an automatic, zero-latency rule-based fallback.
* **Continuous Mathematical Reactivity:** Changing weekly study commitment, updating a skill proficiency level, or switching target career roles instantly recalculates all gap metrics, roadmap milestones, and recommendations.
* **Strict Provenance on Verified Learning Resources:** Recommendations cite accredited open-source guides, university open courseware (e.g., Harvard CS50, University of Helsinki Full Stack Open), and official documentation rather than paywalled or unverified links.

## 7. Core 10-Step Workflow
The application implements an intuitive, linear 10-stage career architecture pipeline accessible via the global workflow tracker:

1. **User Profile:** Configure learner background, weekly learning hours (1–80h), learning pace, preferred formats (interactive labs, project-based, video, documentation), and borderless career aspirations.
2. **Career Goal:** Select an audited industry target role (AI Engineer, Cloud/DevOps Reliability Engineer, Application Security Specialist, Data Platform Engineer) and review market demand metrics.
3. **Current Skills Inventory:** Conduct an interactive self-assessment across core technical competencies, frameworks, and architecture patterns with 5-tier proficiency ratings (L1 Novice through L5 Industry Leader).
4. **Target Role Benchmark:** Inspect the audited curriculum benchmark, competency importance ratings (critical vs. important vs. nice-to-have), benchmark weights, and industry standard sources.
5. **AI Skill-Gap Diagnostics:** Review a visual 5-tier proficiency comparison matrix (Current vs. Required) alongside real-time Gemini strategic insights or the deterministic diagnostic engine.
6. **Skill Prioritization:** Examine competency deficits mapped into an urgency and impact matrix (P1 Immediate, P2 Core Next, P3 Specialization, P4 Polish).
7. **Personalized Learning Roadmap:** Follow a multi-phase milestone curriculum (Foundation, Specialization, Capstone) with phase objectives, duration weeks calibrated to weekly hours, and completion checkpoints.
8. **Course & Resource Recommendations:** Access curated, free/open educational resources ranked by match score, complete with detailed explainability cards and syllabus citations.
9. **Capstone Project Recommendations:** Select real-world, portfolio-grade capstones featuring suggested production tech stacks, skill gain mapping, and borderless open-source submission guidance.
10. **Progress Tracking:** Log completed study sessions, record skill level-ups, monitor phase completion percentages, and visualize cumulative hours invested.

## 8. Key Features
* **Interactive 5-Tier Proficiency Matrix:** High-contrast visual comparison blocks ($L1$ through $L5$) indicating acquired competencies, critical deficits, and partial gaps.
* **Dynamic Study Pacing:** Automatically recalculates estimated completion weeks when weekly study commitment is adjusted.
* **Full Data Reactivity:** Updates to user skills or target roles immediately cascade across gap analysis, roadmaps, and course scoring.
* **Structured Rationale Breakdown:** Every recommendation provides explicit reasons for its ranking, including gap coverage, format matching, and pacing metrics.
* **Verified Open Educational Resources:** Curated library linking exclusively to free, open-access, and accredited materials.
* **Developer Persona Switcher:** Built-in test preset switcher to evaluate edge cases across novice, transitioning, and experienced profiles.

## 9. How the Recommendation Engine Works
The recommendation engine uses a deterministic multi-factor scoring model to rank resources and capstone projects:

1. **Deficit Mapping:** Evaluates whether the resource addresses active skill gaps for the selected target role.
2. **Priority Weighting:**
   * P1 (Critical Deficit): +70 base points
   * P2 (Core Next Deficit): +45 base points
   * P3 (Specialization): +25 base points
   * P4 (Mastery Polish): +10 base points
3. **Gap Multipliers:** Adds +20 points per critical gap addressed and +15 points per active gap covered.
4. **Format Alignment:** Awards +20 points if the resource matches the user's preferred learning formats (e.g., interactive labs, project-based work).
5. **Resource Quality Factor:** Factors in resource rating metrics ($+3 \times \text{rating}$).
6. **Pacing Calculation:** Calculates completion duration using:
   $$\text{Estimated Weeks} = \max\left(0.5, \frac{\text{Resource Estimated Hours}}{\text{Weekly Study Hours}}\right)$$

## 10. Skill-Gap Analysis Methodology
All mathematical calculations are performed deterministically on the server via `DataStore.computeSkillGapAnalysis()`:

* **Acquired Level:** $\min(\text{CurrentLevel}, \text{RequiredLevel})$
* **Gap Level:** $\max(0, \text{RequiredLevel} - \text{CurrentLevel})$
* **Weighted Acquired Points:** $\sum (\text{Acquired Level} \times \text{Weight})$
* **Weighted Total Benchmark Points:** $\sum (\text{Required Level} \times \text{Weight})$
* **Overall Readiness Score:**
  $$\text{Readiness Score} = \text{round}\left(\frac{\text{Weighted Acquired Points}}{\text{Weighted Total Benchmark Points}} \times 100\right)$$
* **Critical Skills Coverage:**
  $$\text{Critical Coverage} = \text{round}\left(\frac{\text{Mastered Critical Skills}}{\text{Total Critical Skills}} \times 100\right)$$
* **Estimated Hours to Close:**
  $$\text{Hours} = \sum \left(\text{GapLevel} \times \begin{cases} 25 & \text{if critical} \\ 18 & \text{otherwise} \end{cases}\right)$$

## 11. AI Integration
* **Model:** Google Gemini (`gemini-3.8-flash`) executed exclusively on the Express backend via the `@google/genai` SDK.
* **Context Injected:** The server supplies Gemini with verified user profile data, weekly hours, learning preferences, target role descriptions, readiness score, critical gap lists, and evaluated timeline metrics.
* **Structured JSON Output:** Prompt constraints require Gemini to return structured JSON containing:
  * Executive diagnostic summary
  * Key strategic directives
  * Priority focus areas
  * Weekly pace allocation guidance
  * Borderless innovation and open-source portfolio strategy
  * Capstone project execution guidance
* **Timeout Protection:** AI requests enforce an 8-second timeout guard (`Promise.race`) to prevent network hanging.
* **In-Memory Cache:** Cached insights are stored with a 60-second TTL keyed by profile parameters and invalidated upon skill or preference updates.

## 12. Deterministic Fallback System
If the Gemini API key is missing, API quotas are exhausted, network connectivity fails, or the request exceeds the 8-second threshold:
1. The server automatically activates `generateDeterministicInsights()`.
2. A rule-based diagnostic synthesizes the user's verified metrics into structured guidance.
3. The response is flagged with `isAiGenerated: false` and labeled with the exact source: `"Deterministic Competency Diagnostic Engine (Rule-Based Engine)"`.
4. The user interface reflects the fallback status transparently without errors, crashes, or interrupted workflows.

## 13. Explainability
To combat black-box algorithmic recommendations, every course and capstone recommendation displays an explainable rationale:
* **Target Competency:** Specifies the exact skill and level jump (e.g., Level 1 → Level 4).
* **Format Alignment:** Indicates whether the medium (e.g., interactive lab, video series) matches user profile preferences.
* **Pacing Calibration:** Shows total estimated resource hours and expected weeks at the user's declared weekly pace.
* **Source Provenance:** Details the publisher, accreditation, and verified syllabus URL.

## 14. System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    React 19 Client (SPA)                    │
│      Tailwind CSS 4 • Lucide Icons • Motion Transitions     │
│   AppContext (Synchronized Client State & Toaster System)   │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON REST API
┌──────────────────────────────▼──────────────────────────────┐
│                    Express 4 Node.js Server                 │
│         API Routing • Input Sanitization • Error Guards     │
├──────────────────────────────┬──────────────────────────────┤
│    Deterministic Engine      │      Gemini AI Service       │
│  • Gap Analysis Calculation  │  • @google/genai SDK         │
│  • Recommendation Scoring    │  • gemini-3.8-flash          │
│  • Multi-Phase Roadmap Gen   │  • 8s Timeout & Fallback     │
├──────────────────────────────┴──────────────────────────────┤
│               In-Memory Data Store (store.ts)               │
│      Roles • Skills Taxonomy • Resources • User Profile     │
└─────────────────────────────────────────────────────────────┘
```

## 15. Technology Stack
* **Frontend:** React 19, TypeScript 5+, Tailwind CSS 4, Motion, Lucide React
* **Backend:** Node.js, Express 4, TypeScript runtime via `tsx` (development) and `esbuild` (production bundle)
* **AI SDK:** `@google/genai` (v2.4.0) with Gemini 3.8 Flash
* **Build Tools:** Vite 8, esbuild 0.25

## 16. Data, Resources & Source Provenance
All career benchmarks and open learning resources cite verified, official curricula:
* **Generative AI Engineering:** DeepLearning.AI and Google Cloud AI Education ([deeplearning.ai](https://www.deeplearning.ai/))
* **Cloud & Site Reliability Engineering:** Google SRE Handbook ([sre.google/sre-book](https://sre.google/sre-book/table-of-contents/)) and CNCF Curriculum
* **Application Security:** OWASP Foundation Top 10 ([owasp.org](https://owasp.org/www-project-top-ten/)) and PortSwigger Web Security Academy ([portswigger.net](https://portswigger.net/web-security))
* **Data Platform Engineering:** Google Cloud Professional Data Engineer Guide ([cloud.google.com](https://cloud.google.com/learn/certification/data-engineer))
* **Python Foundations:** Harvard University CS50P ([cs50.harvard.edu/python](https://cs50.harvard.edu/python/))
* **Full-Stack Engineering:** University of Helsinki Full Stack Open ([fullstackopen.com](https://fullstackopen.com/en/))
* **TypeScript:** Microsoft TypeScript Handbook ([typescriptlang.org](https://www.typescriptlang.org/docs/handbook/intro.html))
* **Systems & Concurrency:** The Go Tour ([go.dev/tour](https://go.dev/tour/)) and The Rust Book ([doc.rust-lang.org/book](https://doc.rust-lang.org/book/))
* **Distributed Systems Architecture:** The System Design Primer ([github.com/donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer))

## 17. Security
* **Zero Client-Side Secrets:** `GEMINI_API_KEY` is loaded strictly in server-side code (`server.ts`, `server/gemini.ts`, `server/ai/insightsService.ts`). No API keys or tokens are passed to or bundled in client-side code.
* **Input Sanitization:** All incoming REST payloads (`PUT /api/profile`, `POST /api/profile/skills`, `POST /api/progress/log`) are sanitized, type-validated, and clamped to prevent malformed data injections.
* **Safe External Links:** All outbound resource links use `rel="noreferrer noopener"` and `target="_blank"`.

## 18. Project Structure
```
├── .env.example                     # Environment variable declarations
├── metadata.json                    # Application metadata and permissions
├── package.json                     # Project scripts and dependencies
├── server.ts                        # Express server entry point & Vite middleware
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite configuration with Tailwind CSS plugin
├── server/
│   ├── ai/
│   │   └── insightsService.ts       # Gemini 3.8 Flash client & deterministic fallback
│   ├── db/
│   │   ├── data.ts                  # Audited roles, skills taxonomy, courses & projects
│   │   ├── presets.ts               # Test personas for evaluation
│   │   └── store.ts                 # DataStore: gap calculations, roadmaps & scoring
│   ├── gemini.ts                    # Lazy initialization of @google/genai SDK
│   └── routes/
│       └── api.ts                   # Express REST API route handlers
└── src/
    ├── App.tsx                      # App root component and workflow pipeline view
    ├── main.tsx                     # React client entry point
    ├── index.css                    # Tailwind CSS imports
    ├── context/
    │   └── AppContext.tsx           # Global state manager & API synchronization
    ├── services/
    │   └── api.ts                   # Client-side API fetch client
    ├── types/
    │   └── index.ts                 # Shared TypeScript interfaces and types
    └── components/
        ├── layout/
        │   ├── Header.tsx           # Top navigation bar with persona switcher
        │   ├── WorkflowPipeline.tsx # 10-step progress navigation bar
        │   ├── Footer.tsx           # Hackathon accreditation and source citations
        │   └── NotificationToaster.tsx # Toast alert notifications
        └── views/
            ├── DashboardOverview.tsx    # Summary analytics and readiness dashboard
            ├── UserProfileView.tsx      # Step 1: Profile and learning preferences
            ├── CareerGoalView.tsx       # Step 2: Target role selection
            ├── CurrentSkillsView.tsx    # Step 3: Interactive skill inventory assessment
            ├── RoleBenchmarkView.tsx    # Step 4: Industry benchmark requirements
            ├── SkillGapView.tsx         # Step 5: Visual gap analysis and AI diagnostic
            ├── SkillPrioritizationView.tsx # Step 6: P1-P4 urgency matrix
            ├── RoadmapView.tsx          # Step 7: Multi-phase learning roadmap
            ├── CoursesView.tsx          # Step 8: Course recommendations & rationale
            ├── ProjectsView.tsx         # Step 9: Capstone project recommendations
            └── ProgressTrackerView.tsx  # Step 10: Progress logging and hour tracking
```

## 19. API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Service health status, hackathon metadata, and Gemini configuration status |
| `GET` | `/api/roles` | Retrieve all available industry benchmark roles |
| `GET` | `/api/roles/:id` | Retrieve detailed benchmark requirements for a specific role |
| `GET` | `/api/skills` | Retrieve the global competency and skills taxonomy |
| `GET` | `/api/profile` | Retrieve the active user profile and skill assessments |
| `PUT` | `/api/profile` | Update user profile fields (hours, pace, formats, aspirations) |
| `POST` | `/api/profile/skills` | Batch update or upsert individual skill assessments |
| `POST` | `/api/profile/preset` | Load a test persona preset for evaluation |
| `GET` | `/api/gap-analysis` | Calculate mathematical skill-gap analysis for the target role |
| `POST` | `/api/ai/strategic-insights` | Generate Gemini 3.8 Flash strategic diagnostics with fallback |
| `POST` | `/api/gap-analysis/ai-insights` | Alias endpoint for AI strategic insights |
| `GET` | `/api/roadmap` | Retrieve the pacing-calibrated learning roadmap |
| `POST` | `/api/roadmap/generate` | Regenerate roadmap milestones based on updated profile |
| `PUT` | `/api/roadmap/milestones/:milestoneId` | Update progress percentage and completion status for a milestone |
| `GET` | `/api/progress` | Retrieve logged progress records and study history |
| `POST` | `/api/progress/log` | Create a new study session or milestone completion log |
| `GET` | `/api/recommendations/courses` | Retrieve personalized, scored course recommendations |
| `GET` | `/api/recommendations/projects` | Retrieve personalized capstone project recommendations |

## 20. Local Installation
Clone the repository and install dependencies:

```bash
git clone [Project Repository URL — to be added]
cd [repository-folder]
npm install
```

## 21. Environment Variables
Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Define the following environment variables:
* `GEMINI_API_KEY`: Google Gemini API key (optional; system falls back to the deterministic engine if omitted).
* `APP_URL`: The deployment or preview URL for self-referential links (optional in local development).

*(Never commit actual secrets or `.env` files to version control.)*

## 22. Running the Application
Start the development server (runs full-stack Express server with Vite middleware):

```bash
npm run dev
```

The application will bind to host `0.0.0.0` and port `3000`. Open your browser at:
`http://localhost:3000`

## 23. Production Build
To create an optimized production build:

```bash
npm run build
```

This compiles:
1. Static client assets via Vite into `dist/`
2. Standalone server bundle via esbuild into `dist/server.cjs`

To start the production server:

```bash
npm start
```

## 24. Testing & QA
The application underwent a comprehensive 20-point quality assurance validation:
* **Static Type Checking:** Verified using `npm run lint` (`tsc --noEmit`) with zero errors.
* **Production Compilation:** Verified via `npm run build` with complete asset bundling.
* **End-to-End User Flow:** Validated across all 10 pipeline steps from initial profile setup through progress logging.
* **Reactivity:** Confirmed that updates to skill proficiency or weekly hours immediately update readiness scores and roadmap duration.
* **Deterministic Fallback:** Tested AI failure states to confirm zero-error fallback to rule-based diagnostics.

## 25. Known Limitations
* **In-Memory Persistence:** Current user profile state, roadmaps, and progress logs are managed in server memory (`DataStore`) for session demonstration. Persistent cloud storage (e.g., Firestore or PostgreSQL) would be needed for multi-tenant production deployments.
* **Curated Catalog Scope:** The learning resource library currently contains curated resources for 4 core engineering domains; scaling to additional domains requires expanding the catalog dataset.

## 26. Future Scope
* **Cloud Database Persistence:** Migration from in-memory storage to managed cloud databases with user authentication.
* **Automated Assessment Quizzes:** Interactive coding challenges to verify claimed proficiency levels objectively.
* **Direct GitHub Integration:** Automated analysis of a user's GitHub repositories to detect demonstrated competencies automatically.
* **Global Peer Study Circles:** Connecting borderless learners working on the same roadmap phase for collaborative capstone development.

## 27. Live Demo
[Live Demo URL — to be added]

## 28. Video Demo
[Video Demo URL — to be added]

## 29. Project Repository
[Project Repository URL — to be added]

## 30. License
Apache-2.0 License.
