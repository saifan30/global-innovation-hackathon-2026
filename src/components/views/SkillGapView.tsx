import React from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  ArrowRight,
  TrendingUp,
  BarChart2
} from "lucide-react";

export const SkillGapView: React.FC = () => {
  const {
    gapAnalysis,
    selectedRole,
    profile,
    setActiveTab,
    requestAiInsights,
    aiInsights,
    isAiLoading
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                Step 5 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                AI Skill-Gap Analysis & Readiness Diagnostic
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative analysis of your current inventory versus <strong>{selectedRole?.title}</strong> requirements.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("skill_prioritization")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Next: Prioritization</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* High-Level Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Overall Readiness (Calculated)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-indigo-700">
              {gapAnalysis?.overallReadinessScore || 0}%
            </span>
            <span className="text-xs text-slate-500">Benchmark Match</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${gapAnalysis?.overallReadinessScore || 0}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Critical Skills Covered
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {gapAnalysis?.criticalSkillsCoverage || 0}%
            </span>
            <span className="text-xs text-slate-500">P1 Competencies</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${gapAnalysis?.criticalSkillsCoverage || 0}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Estimated Timeline
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {gapAnalysis?.estimatedTotalWeeks || 12}
            </span>
            <span className="text-xs text-slate-500">Weeks to Target</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Based on {profile?.weeklyLearningHours || 12} hrs/week commitment
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Gap Breakdown
          </span>
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              {gapAnalysis?.skillsMasteredCount || 0} Ready
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
              {gapAnalysis?.skillsPartialCount || 0} Partial
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
              {gapAnalysis?.skillsMissingCount || 0} Missing
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Total {gapAnalysis?.totalSkillsEvaluated || 0} core role benchmarks
          </p>
        </div>
      </div>

      {/* Transparent Calculation Methodology Note */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <BarChart2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-900 block">
              Transparent Calculation Formula & Weighting Engine:
            </span>
            <p className="text-[11px] text-slate-600 font-mono">
              Readiness Score = ( ∑ min(CurrentLevel, RequiredLevel) × Weight ) / ( ∑ RequiredLevel × Weight ) × 100%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] shrink-0 font-medium">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Mastered (Gap = 0)</span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">Partial (Gap &gt; 0)</span>
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800">Critical Deficit</span>
        </div>
      </div>

      {/* AI Strategy Synthesis Panel */}
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Gap Strategy & Acceleration Synthesis (Gemini 3.8 Flash)
              </h3>
              <p className="text-[11px] text-slate-500">
                Provides contextual reasoning on closing high-friction gaps first.
              </p>
            </div>
          </div>

          <button
            onClick={requestAiInsights}
            disabled={isAiLoading}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAiLoading ? "Synthesizing..." : "Recalculate AI Strategy"}</span>
          </button>
        </div>

        {isAiLoading ? (
          <div className="p-8 text-center text-slate-500 text-xs space-y-2 bg-slate-50 rounded-xl">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent" />
            <p>Evaluating multi-dimensional gap vectors for {selectedRole?.title}...</p>
          </div>
        ) : aiInsights ? (
          <div className="space-y-3 text-xs bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  aiInsights.isAiGenerated !== false
                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
              >
                {aiInsights.isAiGenerated !== false ? (
                  <>
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>Gemini 3.8 Flash AI Model</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                    <span>Deterministic Competency Engine</span>
                  </>
                )}
              </span>
              <span className="text-[10px] text-slate-400">
                {new Date(aiInsights.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line">
              {aiInsights.summary}
            </p>

            {aiInsights.priorityFocusAreas && aiInsights.priorityFocusAreas.length > 0 && (
              <div className="pt-3 border-t border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Priority Focus Competencies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {aiInsights.priorityFocusAreas.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-md font-medium text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {aiInsights.keyStrategicAdvice && aiInsights.keyStrategicAdvice.length > 0 && (
              <div className="pt-3 border-t border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Strategic Directives:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {aiInsights.keyStrategicAdvice.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>
            )}

            {aiInsights.borderlessInnovationStrategy && (
              <div className="pt-3 border-t border-slate-200 text-slate-700">
                <span className="font-bold text-slate-900 block mb-0.5">Borderless Innovation Strategy:</span>
                <p className="text-slate-600">{aiInsights.borderlessInnovationStrategy}</p>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-200/60">
              <span>Source: {aiInsights.source}</span>
              <span>Global Innovation Hackathon 2026 Engine</span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Click "Recalculate AI Strategy" to run the server-side Gemini 3.8 Flash diagnostic.</span>
            <button
              onClick={requestAiInsights}
              className="text-indigo-600 font-bold hover:underline"
            >
              Run Diagnostic →
            </button>
          </div>
        )}
      </div>

      {/* Detailed Gap Comparison Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Detailed Gap Analysis Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Side-by-side assessment of current proficiency vs target requirement.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Sorted by Gap Severity
          </span>
        </div>

        <div className="space-y-3">
          {gapAnalysis?.gaps.map((item) => {
            const progressPercent = Math.min(100, Math.round((item.currentLevel / item.requiredLevel) * 100));
            const isCritical = item.importance === "critical" && item.gapLevel > 0;
            const isMastered = item.gapLevel === 0;
            const isPartial = item.gapLevel > 0 && item.currentLevel > 1;
            const isBaseline = item.gapLevel > 0 && item.currentLevel === 1;

            return (
              <div
                key={item.skillId}
                className={`p-4 rounded-xl border transition-all space-y-3 ${
                  isCritical
                    ? "border-rose-200 bg-rose-50/20 hover:border-rose-300"
                    : isMastered
                    ? "border-emerald-200 bg-emerald-50/20 hover:border-emerald-300"
                    : "border-slate-200 bg-slate-50/40 hover:bg-white hover:border-indigo-200"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {item.skillName}
                      </span>
                      
                      {/* Importance Pill */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.importance === "critical"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.importance}
                      </span>

                      {/* Status Classification Badge */}
                      {isMastered && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Strong / Mastered</span>
                        </span>
                      )}
                      {isCritical && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>Critical Gap</span>
                        </span>
                      )}
                      {isPartial && !isCritical && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Partial Gap
                        </span>
                      )}
                      {isBaseline && !isCritical && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          Baseline Gap (L1)
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <span>Current Level: <strong>L{item.currentLevel}</strong></span>
                      <span>Required Benchmark: <strong>L{item.requiredLevel}</strong></span>
                      <span>
                        Competency Deficit:{" "}
                        <strong className={item.gapLevel > 0 ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}>
                          {item.gapLevel > 0 ? `-${item.gapLevel} Level${item.gapLevel > 1 ? "s" : ""}` : "None (Aligned)"}
                        </strong>
                      </span>
                      <span>Est. Effort: ~<strong>{item.estimatedHoursToClose} hrs</strong></span>
                    </div>
                  </div>

                  {/* 5-Tier Visual Discrete Blocks Indicator */}
                  <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Level Visualizer (L1 - L5)
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => {
                        const isAcquired = lvl <= item.currentLevel;
                        const isRequired = lvl <= item.requiredLevel;
                        const isGapBlock = lvl > item.currentLevel && lvl <= item.requiredLevel;

                        let blockClass = "bg-slate-100 text-slate-400 border-slate-200";
                        if (isAcquired) {
                          blockClass = "bg-emerald-600 text-white font-bold border-emerald-700 shadow-2xs";
                        } else if (isGapBlock) {
                          blockClass = isCritical
                            ? "bg-rose-100 text-rose-700 border-rose-300 font-bold border-dashed"
                            : "bg-amber-100 text-amber-700 border-amber-300 font-bold border-dashed";
                        }

                        return (
                          <div
                            key={lvl}
                            title={
                              isAcquired
                                ? `Level ${lvl}: Acquired`
                                : isGapBlock
                                ? `Level ${lvl}: Required Gap to close`
                                : `Level ${lvl}: Beyond current role requirement`
                            }
                            className={`w-7 h-6 rounded flex items-center justify-center text-[10px] border transition-all ${blockClass}`}
                          >
                            L{lvl}
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {progressPercent}% of benchmark fulfilled
                    </span>
                  </div>
                </div>

                {/* Micro Progress Track */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMastered
                        ? "bg-emerald-500"
                        : isCritical
                        ? "bg-rose-500"
                        : "bg-indigo-600"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
