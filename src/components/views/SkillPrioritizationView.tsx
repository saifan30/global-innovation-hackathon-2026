import React, { useState } from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  ListOrdered,
  AlertTriangle,
  Zap,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2
} from "lucide-react";

export const SkillPrioritizationView: React.FC = () => {
  const { gapAnalysis, setActiveTab, selectedRole } = useApp();
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const gaps = gapAnalysis?.prioritizedGaps || [];

  const filteredGaps = gaps.filter((g) => {
    if (priorityFilter === "all") return true;
    if (priorityFilter === "P1") return g.learningPriority.startsWith("P1");
    if (priorityFilter === "P2") return g.learningPriority.startsWith("P2");
    if (priorityFilter === "P3") return g.learningPriority.startsWith("P3");
    if (priorityFilter === "P4") return g.learningPriority.startsWith("P4");
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <ListOrdered className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2 py-0.5 rounded">
                Step 6 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Skill Prioritization & Urgency Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked action plan for closing critical competency bottlenecks before branching into specialized topics.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("roadmap")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Next: Learning Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Eisenhower Quadrant / Priority Tier Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {[
          { id: "P1", label: "P1: Immediate Critical", desc: "Blockers for entry role", color: "border-rose-300 bg-rose-50/70 text-rose-900" },
          { id: "P2", label: "P2: Core Next", desc: "Key working competencies", color: "border-amber-300 bg-amber-50/70 text-amber-900" },
          { id: "P3", label: "P3: Specialization", desc: "Differentiating toolsets", color: "border-blue-300 bg-blue-50/70 text-blue-900" },
          { id: "P4", label: "P4: Polish & Mastery", desc: "Already met benchmarks", color: "border-emerald-300 bg-emerald-50/70 text-emerald-900" },
        ].map((tier) => {
          const isSelected = priorityFilter === tier.id;
          const count = gaps.filter((g) => g.learningPriority.startsWith(tier.id)).length;

          return (
            <div
              key={tier.id}
              onClick={() => setPriorityFilter(priorityFilter === tier.id ? "all" : tier.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? `ring-2 ring-indigo-600 shadow-sm ${tier.color}`
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{tier.label}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200">
                  {count}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{tier.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Prioritized List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">
            Execution Queue ({filteredGaps.length} Items)
          </h3>
          {priorityFilter !== "all" && (
            <button
              onClick={() => setPriorityFilter("all")}
              className="text-xs text-indigo-600 font-semibold hover:underline"
            >
              Show All Priorities
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredGaps.map((item, index) => {
            const isP1 = item.learningPriority.startsWith("P1");
            const isP2 = item.learningPriority.startsWith("P2");

            return (
              <div
                key={item.skillId}
                className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 bg-slate-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {item.skillName}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isP1
                            ? "bg-rose-100 text-rose-800"
                            : isP2
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.learningPriority}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      Current Proficiency: <strong>Level {item.currentLevel}</strong> → Benchmark Goal: <strong>Level {item.requiredLevel}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 pl-9 sm:pl-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Urgency Score
                    </span>
                    <span className="text-xs font-bold text-indigo-700">
                      {item.urgencyScore}/100
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Effort
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      ~{item.estimatedHoursToClose} hrs
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveTab("courses")}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200 transition-colors cursor-pointer"
                  >
                    View Courses
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGaps.length === 0 && (
          <div className="bg-slate-50 p-8 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
            <ListOrdered className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No skills in this priority tier</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              All prioritized gaps are distributed across other tiers. Switch filter to view the complete execution queue.
            </p>
            <button
              onClick={() => setPriorityFilter("all")}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs inline-flex items-center gap-1.5 cursor-pointer mt-1"
            >
              <span>Show All Priorities</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
