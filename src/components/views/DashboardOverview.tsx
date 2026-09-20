import React from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  Target,
  Layers,
  Sparkles,
  MapPin,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Globe,
  AlertTriangle,
  Award,
  Zap,
  HelpCircle,
  Compass,
  FileCheck2,
  ListOrdered,
  Info
} from "lucide-react";

export const DashboardOverview: React.FC = () => {
  const {
    profile,
    selectedRole,
    gapAnalysis,
    roadmap,
    courses,
    projects,
    progressLogs,
    setActiveTab,
    requestAiInsights,
    aiInsights,
    isAiLoading
  } = useApp();

  const criticalGaps = gapAnalysis?.gaps.filter((g) => g.importance === "critical" && g.gapLevel > 0) || [];
  const readySkills = gapAnalysis?.gaps.filter((g) => g.gapLevel === 0) || [];
  const assessedSkillsCount = profile?.currentSkills.length || 0;

  // Determine dynamic next recommended action for the user
  const getDynamicNextAction = () => {
    if (!profile?.fullName || !profile?.email) {
      return {
        step: "profile",
        title: "Step 1: Complete Your Profile",
        desc: "Set your weekly study hours and global learning preferences to calibrate recommendations.",
        btnText: "Configure Profile",
        tab: "profile" as const,
      };
    }
    if (assessedSkillsCount === 0) {
      return {
        step: "current_skills",
        title: "Step 3: Assess Your Baseline Skills",
        desc: "Add your current technical competencies to calculate your benchmark gap.",
        btnText: "Assess Skills",
        tab: "current_skills" as const,
      };
    }
    if (criticalGaps.length > 0 && !aiInsights) {
      return {
        step: "gap_analysis",
        title: "Step 5: Run AI Gap Diagnostic",
        desc: `You have ${criticalGaps.length} critical competency gaps identified. Generate your AI career strategy.`,
        btnText: "Analyze Skill Gaps",
        tab: "gap_analysis" as const,
      };
    }
    if (progressLogs.length === 0) {
      return {
        step: "roadmap",
        title: "Step 7: Initiate Phase 1 Milestone",
        desc: "Begin your structured learning roadmap and start your first hands-on deliverable.",
        btnText: "Start Phase 1",
        tab: "roadmap" as const,
      };
    }
    return {
      step: "projects",
      title: "Step 9: Ship Capstone Deliverable",
      desc: "Work on your recommended portfolio project to demonstrate borderless proof-of-competency.",
      btnText: "View Capstone",
      tab: "projects" as const,
    };
  };

  const nextAction = getDynamicNextAction();

  return (
    <div className="space-y-6">
      {/* Hackathon Welcome Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-md border border-indigo-900/50">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Global Innovation Hackathon 2026 • Innovate Without Borders
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Welcome, {profile?.fullName || "Global Innovator"}!
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Your personalized AI-driven trajectory towards becoming a verified{" "}
              <strong className="text-cyan-300">{selectedRole?.title}</strong>. 
              Track competency gaps against international benchmarks, execute prioritized milestones, and ship borderless capstone projects.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-start-gap-btn"
                onClick={() => setActiveTab("gap_analysis")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>View Skill-Gap Diagnostics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-view-roadmap-btn"
                onClick={() => setActiveTab("roadmap")}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>View Learning Roadmap</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 sm:p-5 flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Benchmark Match Score
              </span>
              <span className="text-xs font-bold text-cyan-400">
                {gapAnalysis?.overallReadinessScore || 0}%
              </span>
            </div>

            <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${gapAnalysis?.overallReadinessScore || 0}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Est. Timeline</span>
                <span className="font-semibold text-white">{gapAnalysis?.estimatedTotalWeeks || 12} Weeks</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Weekly Pacing</span>
                <span className="font-semibold text-white">{profile?.weeklyLearningHours || 10} Hrs/Wk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Part Demonstration Onboarding Guide */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Demonstration Pipeline: How the Recommendation Engine Works
            </h2>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            End-to-End Guided Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">1</span>
              <span>1. What the Platform Does</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synthesizes real career role benchmarks with your self-assessed competencies to map algorithmic and AI-driven growth paths for global technical careers.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">2</span>
              <span>2. Information You Provide</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Target role aspiration, weekly study bandwidth ({profile?.weeklyLearningHours || 10}h), preferred learning format, and proficiency levels (L1 Beginner to L5 Master).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">3</span>
              <span>3. Results You Receive</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mathematical Readiness Score, P1-P4 Urgency Matrix, explainable open-access courses, milestone roadmap, and audited capstone projects.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Recommended Next Action Card */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-2xl border border-indigo-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                Recommended Next Step
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                {nextAction.title}
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              {nextAction.desc}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab(nextAction.tab)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
        >
          <span>{nextAction.btnText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Primary Pipeline Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab("career_goal")}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Target Career Role
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="font-bold text-slate-900 text-sm truncate">
            {selectedRole?.title}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {selectedRole?.domainLabel}
          </p>
        </div>

        <div
          onClick={() => setActiveTab("current_skills")}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Skills Assessed
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="font-bold text-slate-900 text-sm">
            {assessedSkillsCount} Skills Assessed
          </p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">
            {readySkills.length} Fully Benchmark Ready
          </p>
        </div>

        <div
          onClick={() => setActiveTab("gap_analysis")}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Critical Skill Gaps
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="font-bold text-slate-900 text-sm">
            {criticalGaps.length} Priority Focus Items
          </p>
          <p className="text-xs text-amber-700 mt-1">
            {gapAnalysis?.skillsMissingCount || 0} Missing / {gapAnalysis?.skillsPartialCount || 0} Partial
          </p>
        </div>

        <div
          onClick={() => setActiveTab("progress_tracker")}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Roadmap Progress
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="font-bold text-slate-900 text-sm">
            Phase 1 in Progress
          </p>
          <p className="text-xs text-indigo-600 mt-1 font-medium">
            {progressLogs.length} Verified Checkpoints Logged
          </p>
        </div>
      </div>

      {/* Main Grid: AI Strategy + Critical Action Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Insights & Immediate Action Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Career Diagnostic Box */}
          <div className="bg-white rounded-xl border border-indigo-100 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Strategic Career Diagnostic (AI + Deterministic Hybrid)
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Real-time synthesis grounded in 2026 global market requirements
                  </span>
                </div>
              </div>

              <button
                id="refresh-ai-insights-btn"
                onClick={requestAiInsights}
                disabled={isAiLoading}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isAiLoading ? "Analyzing..." : "Generate AI Insights"}</span>
              </button>
            </div>

            {isAiLoading ? (
              <div className="p-6 text-center text-slate-500 text-xs space-y-2">
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent" />
                <p>Synthesizing gap vectors and generating high-impact learning priorities...</p>
              </div>
            ) : aiInsights ? (
              <div className="space-y-3 text-xs bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      aiInsights.isAiGenerated !== false
                        ? "bg-purple-100 text-purple-800 border border-purple-200"
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {aiInsights.isAiGenerated !== false ? (
                      <>
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>Gemini 3.8 Flash AI Model (Real-Time Generation)</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        <span>Deterministic Diagnostic Engine (Rule-Based Fallback)</span>
                      </>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(aiInsights.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <p className="text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                  {aiInsights.summary}
                </p>

                {aiInsights.priorityFocusAreas && aiInsights.priorityFocusAreas.length > 0 && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Priority Focus Competencies:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {aiInsights.priorityFocusAreas.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-md font-medium text-[11px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {aiInsights.keyStrategicAdvice && aiInsights.keyStrategicAdvice.length > 0 && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Key Strategic Directives:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {aiInsights.keyStrategicAdvice.map((advice, i) => (
                        <li key={i}>{advice}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiInsights.borderlessInnovationStrategy && (
                  <div className="pt-2 border-t border-slate-200 text-slate-700">
                    <span className="font-bold text-slate-900 block mb-0.5">Borderless Innovation Strategy:</span>
                    <p className="text-slate-600">{aiInsights.borderlessInnovationStrategy}</p>
                  </div>
                )}

                <div className="text-[10px] text-slate-400 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200/60">
                  <span>Engine: {aiInsights.source}</span>
                  <span className="italic">Note: Advisory guidance grounded in competency benchmarks.</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">
                    Ready to generate tailored career acceleration strategy.
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    Click "Generate AI Insights" above to synthesize your current skills against {selectedRole?.title} industry benchmarks.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Critical Priority Gap Items */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Priority Skill-Gap Matrix
                </h3>
                <span className="text-[11px] text-slate-500">
                  Targeted competencies required to reach full benchmark competency
                </span>
              </div>
              <button
                onClick={() => setActiveTab("skill_prioritization")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Full Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {gapAnalysis?.prioritizedGaps.slice(0, 4).map((item) => (
                <div
                  key={item.skillId}
                  className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-xs">
                        {item.skillName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          item.importance === "critical"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.importance}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Current: <strong>Level {item.currentLevel}</strong> → Required: <strong>Level {item.requiredLevel}</strong> (Gap: -{item.gapLevel})
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded font-medium">
                      ~{item.estimatedHoursToClose} hrs to close
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-1 rounded ${
                        item.learningPriority.startsWith("P1")
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {item.learningPriority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Active Roadmap & Recommended Next Steps */}
        <div className="space-y-6">
          {/* Active Roadmap Milestone Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Active Roadmap Stage
              </h3>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Phase 1 of 3
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                  {roadmap?.milestones[0]?.phaseName || "Phase 1: Core Foundations"}
                </span>
                <p className="font-semibold text-slate-900 mt-1">
                  {roadmap?.milestones[0]?.title || "Master Essential Prerequisite Tools"}
                </p>
                <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                  {roadmap?.milestones[0]?.objective}
                </p>
                
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Duration: {roadmap?.milestones[0]?.durationWeeks || 4} Weeks</span>
                  <button
                    onClick={() => setActiveTab("roadmap")}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    View Timeline →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Curated Resources Spotlight */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Recommended Resources
              </h3>
              <button
                onClick={() => setActiveTab("courses")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                All Courses ({courses.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {courses.slice(0, 2).map((c) => (
                <a
                  key={c.id}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60 transition-all text-xs"
                >
                  <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide">
                    {c.provider}
                  </span>
                  <p className="font-semibold text-slate-900 mt-0.5 line-clamp-1">
                    {c.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span>{c.estimatedHours}h</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">Free Access</span>
                    <span>•</span>
                    <span>★ {c.rating}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Hands-on Capstone Highlight */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-5">
            <div className="flex items-center gap-2 text-indigo-800 mb-2">
              <FolderGit2 className="w-4 h-4" />
              <h4 className="font-bold text-xs uppercase tracking-wider">
                Recommended Capstone Project
              </h4>
            </div>
            <p className="font-bold text-slate-900 text-xs">
              {projects[0]?.title}
            </p>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              {projects[0]?.tagline}
            </p>
            <button
              onClick={() => setActiveTab("projects")}
              className="mt-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg w-full text-center transition-colors cursor-pointer"
            >
              Explore Project Specifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

