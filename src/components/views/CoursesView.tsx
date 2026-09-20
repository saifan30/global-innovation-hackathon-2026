import React, { useState } from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  GraduationCap,
  ExternalLink,
  Star,
  Clock,
  BookOpen,
  Filter,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Target
} from "lucide-react";

export const CoursesView: React.FC = () => {
  const { courses, setActiveTab, selectedRole, profile } = useApp();
  const [formatFilter, setFormatFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filteredCourses = courses.filter((c) => {
    const matchesFormat = formatFilter === "all" || c.type === formatFilter;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.provider.toLowerCase().includes(search.toLowerCase()) ||
      (c.addressedSkills && c.addressedSkills.some(s => s.skillName.toLowerCase().includes(search.toLowerCase()))) ||
      c.keyHighlights.some((h) => h.toLowerCase().includes(search.toLowerCase()));
    return matchesFormat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 px-2 py-0.5 rounded">
                Step 8 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Personalized Course & Resource Recommendations
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked dynamically by your active skill gaps, proficiency deficits, and {profile?.weeklyLearningHours || 12} hrs/week study pace for <strong>{selectedRole?.title}</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("projects")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Next: Project Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Formats" },
            { id: "course", label: "University Courses" },
            { id: "interactive_lab", label: "Interactive Labs" },
            { id: "official_guide", label: "Official Handbooks" },
            { id: "video_series", label: "Video Masterclasses" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFormatFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                formatFilter === f.id
                  ? "bg-teal-600 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by skill or provider..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
          />
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-teal-300 p-6 shadow-xs flex flex-col justify-between space-y-4 transition-all"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {item.provider}
                  </span>
                  {item.priorityTag && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.priorityTag === 'P1 - Immediate'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : item.priorityTag === 'P2 - Core Next'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {item.priorityTag}
                    </span>
                  )}
                  {item.formatMatch && (
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      Matches Format Pref
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {item.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.estimatedHours}h Total (~{item.estimatedWeeksAtUserPace || Math.round(item.estimatedHours / (profile?.weeklyLearningHours || 12))} wks at {profile?.weeklyLearningHours || 12}h/wk)
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {item.isFree ? "Free & Open Access" : "Paid Track"}
                </span>
                <span>•</span>
                <span className="capitalize">{item.difficulty} Level</span>
              </div>

              {/* Addressed Skills Pill Bar */}
              {item.addressedSkills && item.addressedSkills.length > 0 && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5 text-teal-600" />
                    <span>Skills Addressed:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.addressedSkills.map((sk) => (
                      <span
                        key={sk.skillId}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                          sk.gapLevel > 0
                            ? 'bg-amber-50/80 text-amber-900 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <span>{sk.skillName}</span>
                        <span className="text-[10px] opacity-75 font-mono">
                          (L{sk.currentLevel} → L{sk.requiredLevel})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Why It Was Recommended (Explainable Engine) */}
              <div className="bg-teal-50/70 p-3.5 rounded-xl border border-teal-200/90 text-xs text-teal-950 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-teal-900 text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Why am I seeing this recommendation?</span>
                </div>
                
                <div className="space-y-1.5 text-xs text-slate-700">
                  <p className="font-medium text-slate-800">
                    {item.recommendationRationale || `Targeted curriculum to directly close your competency deficit in ${item.targetSkillIds.join(", ")}.`}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1.5 border-t border-teal-200/60 text-[11px]">
                    <div className="flex items-center gap-1.5 text-teal-900">
                      <Clock className="w-3 h-3 text-teal-600 shrink-0" />
                      <span><strong>Pacing:</strong> {item.estimatedHours}h total (~{Math.max(1, Math.round(item.estimatedHours / (profile?.weeklyLearningHours || 10)))} wks at your {profile?.weeklyLearningHours || 10}h/wk)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-teal-900">
                      <Zap className="w-3 h-3 text-teal-600 shrink-0" />
                      <span><strong>Format:</strong> {item.type.replace('_', ' ')} (Matches preference)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Curriculum Highlights */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Curriculum Highlights:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {item.keyHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-teal-600 font-bold shrink-0">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Provenance & Citation Note */}
              {item.sourceReference && (
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{item.sourceReference.curriculumAccreditation}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Source: {item.sourceReference.citationNote}
                  </p>
                </div>
              )}
            </div>

            {/* Link button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500">
                Prerequisites: {item.prerequisites.length > 0 ? item.prerequisites.join(", ") : "None required"}
              </span>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Access Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">
            No recommendations available yet.
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Adjust your search query or format filters to explore available learning resources for {selectedRole?.title || "your target role"}.
          </p>
          <button
            onClick={() => {
              setFormatFilter("all");
              setSearch("");
            }}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
