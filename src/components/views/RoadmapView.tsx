import React from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  FolderGit2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from "lucide-react";

export const RoadmapView: React.FC = () => {
  const { roadmap, updateMilestone, setActiveTab, selectedRole, profile } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                Step 7 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Personalized Learning Roadmap
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured multi-phase acceleration path for <strong>{selectedRole?.title}</strong> ({roadmap?.totalWeeks || 16} Weeks Total).
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("courses")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Next: Course Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Roadmap Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-indigo-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            {roadmap?.title || "2026 Career Accelerator"}
          </span>
          <h3 className="text-xl font-extrabold text-white">
            {selectedRole?.title} Roadmap
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Calibrated for {profile?.weeklyLearningHours || 12} hours/week. Complete each milestone checkpoint and log your projects to build a verifiable global portfolio.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Total Duration</span>
            <span className="text-base font-extrabold text-white">{roadmap?.totalWeeks || 16} Weeks</span>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Phases</span>
            <span className="text-base font-extrabold text-cyan-400">{roadmap?.milestones.length || 3} Stages</span>
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-6">
        {roadmap?.milestones.map((milestone, idx) => {
          const isDone = milestone.isCompleted || milestone.progressPercent === 100;

          return (
            <div
              key={milestone.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs space-y-4 transition-all ${
                isDone ? "border-emerald-300 bg-emerald-50/20" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    0{milestone.phaseNumber}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                      {milestone.phaseName}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {milestone.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {milestone.durationWeeks} Weeks
                  </span>

                  <button
                    onClick={() => updateMilestone(milestone.id, isDone ? 0 : 100, !isDone)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isDone
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isDone ? "Completed" : "Mark as Done"}</span>
                  </button>
                </div>
              </div>

              {/* Objective & Why Positioned */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Phase Intent & Architecture Rationale</span>
                </div>
                <p className="leading-relaxed font-medium text-slate-800">
                  {milestone.objective}
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  Targeted Duration: <strong>{milestone.durationWeeks} weeks</strong> at your calibrated pace of <strong>{profile?.weeklyLearningHours || 10} hours/week</strong> (~{milestone.durationWeeks * (profile?.weeklyLearningHours || 10)} total study hours).
                </div>
              </div>

              {/* Target Skill Transitions */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Targeted Skill Transitions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {milestone.targetSkills.map((sk) => (
                    <div
                      key={sk.skillId}
                      className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-800">{sk.skillName}</span>
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        L{sk.fromLevel} → L{sk.toLevel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkpoint Assessment */}
              <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-2.5 text-xs text-slate-700">
                <Award className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Checkpoint Deliverable: </strong>
                  {milestone.checkpointAssessment}
                </div>
              </div>

              {/* Quick links to courses and projects */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("courses")}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Aligned Courses</span>
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>View Aligned Capstone</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-semibold">Progress:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="25"
                    value={milestone.progressPercent}
                    onChange={(e) => updateMilestone(milestone.id, parseInt(e.target.value))}
                    className="accent-indigo-600 w-24 cursor-pointer"
                  />
                  <span className="text-[11px] font-bold text-slate-800 w-8 text-right">
                    {milestone.progressPercent}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
