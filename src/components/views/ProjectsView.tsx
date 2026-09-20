import React from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  FolderGit2,
  GitBranch,
  Layers,
  Globe,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Target,
  Cpu
} from "lucide-react";

export const ProjectsView: React.FC = () => {
  const { projects, setActiveTab, selectedRole, profile, addProgressRecord } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <FolderGit2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                Step 9 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Practical Capstone Project Recommendations
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Production systems tailored to synthesize your active skill gaps into audited portfolio deliverables for <strong>{selectedRole?.title}</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("progress_tracker")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Next: Progress Tracking</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 hover:border-indigo-300 transition-all"
          >
            {/* Header / Meta */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                    {proj.difficulty} Level
                  </span>
                  {proj.priorityTag && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      proj.priorityTag === 'P1 - Immediate'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : proj.priorityTag === 'P2 - Core Next'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {proj.priorityTag}
                    </span>
                  )}
                  <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{proj.estimatedHours}h Total (~{proj.estimatedWeeksAtUserPace || Math.round(proj.estimatedHours / (profile?.weeklyLearningHours || 12))} wks at {profile?.weeklyLearningHours || 12}h/wk)
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1.5">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {proj.tagline}
                </p>
              </div>

              <button
                onClick={() => {
                  addProgressRecord({
                    milestoneId: "project_build",
                    type: "project_shipped",
                    title: `Initiated build: ${proj.title}`,
                    notes: `Targeting competencies: ${proj.skillsTaught.join(", ")}`,
                    loggedHours: 4
                  });
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Start & Log Project</span>
              </button>
            </div>

            {/* Why am I seeing this? (Explainable Rationale) */}
            <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200/90 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-indigo-900 text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Why am I seeing this capstone recommendation?</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {proj.matchRationale || `Synthesizes hands-on production code bridging your active skill gaps in ${proj.skillsTaught.join(", ")}.`}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1.5 border-t border-indigo-200/60 text-[11px] text-indigo-950">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-indigo-600 shrink-0" />
                  <span><strong>Estimated Commitment:</strong> {proj.estimatedHours}h (~{Math.max(1, Math.round(proj.estimatedHours / (profile?.weeklyLearningHours || 10)))} wks at your pace)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-indigo-600 shrink-0" />
                  <span><strong>Target Competencies:</strong> {proj.skillsTaught.slice(0, 3).join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Skills Developed Breakdown */}
            {proj.skillsDevelopedDetails && proj.skillsDevelopedDetails.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Skills Developed Through This Project:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {proj.skillsDevelopedDetails.map((sk) => (
                    <div
                      key={sk.skillId}
                      className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs flex flex-col justify-between"
                    >
                      <span className="font-semibold text-slate-900 leading-tight">{sk.skillName}</span>
                      <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-500">L{sk.currentLevel} → L{sk.targetLevel}</span>
                        <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                          sk.gapLevel > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {sk.gapLevel > 0 ? `Gap: -${sk.gapLevel}` : 'Mastered'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Tech Stack */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span>Suggested Technology Stack:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(proj.suggestedTechStack || ["Python", "FastAPI", "Docker", "PostgreSQL"]).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-[11px] font-medium shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Overview */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                System Architecture Blueprint:
              </span>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono">
                {proj.architectureOverview}
              </div>
            </div>

            {/* Deliverables & Real-World Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                  Mandatory Key Deliverables:
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  {proj.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>Real-World Borderless Impact</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {proj.realWorldImpact}
                  </p>
                </div>

                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-800 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Borderless Collaboration Tip</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {proj.borderlessCollaborationTip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">
            No recommendations available yet.
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Select a target career role and calibrate your current skills to receive customized hands-on project blueprints for your portfolio.
          </p>
          <button
            onClick={() => setActiveTab("career_goal")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Select Career Goal</span>
          </button>
        </div>
      )}
    </div>
  );
};
