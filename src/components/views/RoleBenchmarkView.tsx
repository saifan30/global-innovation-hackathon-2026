import React from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  FileCheck2,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Globe
} from "lucide-react";

export const RoleBenchmarkView: React.FC = () => {
  const { selectedRole, setActiveTab, profile } = useApp();

  const userSkillMap = new Map(profile?.currentSkills.map((s) => [s.skillId, s.currentLevel]) || []);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                Step 4 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Target Role Benchmark & Industry Standards
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Official competency matrix for <strong>{selectedRole?.title}</strong> in the 2026 global technology landscape.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("gap_analysis")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Next: Gap Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

        {/* Role Summary Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {selectedRole?.domainLabel}
                </span>
                {selectedRole?.sourceInfo && (
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    Audited: {selectedRole.sourceInfo.lastAudited}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {selectedRole?.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {selectedRole?.summary}
              </p>

              {selectedRole?.sourceInfo && (
                <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 inline-flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-700">Curriculum Benchmark:</span>
                  <span>{selectedRole.sourceInfo.benchmarkFramework}</span>
                  {selectedRole.sourceInfo.sourceUrl && (
                    <a
                      href={selectedRole.sourceInfo.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-semibold underline ml-1"
                    >
                      Official Source Guide ↗
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center min-w-[100px]">
                <span className="text-[10px] font-semibold text-slate-400 block uppercase">Demand</span>
                <span className="text-xs font-bold text-emerald-600">{selectedRole?.globalMarketDemand}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center min-w-[100px]">
                <span className="text-[10px] font-semibold text-slate-400 block uppercase">Remote Index</span>
                <span className="text-xs font-bold text-indigo-700">{selectedRole?.borderlessRemoteReadiness}%</span>
              </div>
            </div>
          </div>

        {/* Required Competencies Table / Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Required Technical & Professional Competencies ({selectedRole?.requiredSkills.length})
            </h4>
            <span className="text-[11px] text-slate-400">
              Compared with your current assessed levels
            </span>
          </div>

          <div className="space-y-3">
            {selectedRole?.requiredSkills.map((req) => {
              const userLevel = userSkillMap.get(req.skillId) || 0;
              const hasMet = userLevel >= req.requiredLevel;
              const isPartial = userLevel > 0 && userLevel < req.requiredLevel;

              return (
                <div
                  key={req.skillId}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {req.skillName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            req.importance === "critical"
                              ? "bg-rose-100 text-rose-700 border border-rose-200"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {req.importance} (Weight: {req.weight}/10)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {req.rationale}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                          Target Required
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          Level {req.requiredLevel}
                        </span>
                      </div>

                      <div className="h-6 w-px bg-slate-200" />

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                          Your Level
                        </span>
                        <span className={`text-xs font-bold ${hasMet ? "text-emerald-600" : isPartial ? "text-amber-600" : "text-slate-400"}`}>
                          {userLevel > 0 ? `Level ${userLevel}` : "Not Assessed"}
                        </span>
                      </div>

                      <div className="pl-2">
                        {hasMet ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ready
                          </span>
                        ) : isPartial ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded">
                            <AlertCircle className="w-3 h-3 text-amber-600" /> Partial (-{req.requiredLevel - userLevel})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-1 rounded">
                            <AlertCircle className="w-3 h-3 text-rose-600" /> Missing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industry Certifications & Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
              <Award className="w-4 h-4" />
              <span>Recommended Industry Certifications</span>
            </div>
            <ul className="space-y-1 text-slate-600">
              {selectedRole?.certificationsRecommended.map((cert, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>Typical Daily Responsibilities</span>
            </div>
            <ul className="space-y-1 text-slate-600">
              {selectedRole?.typicalResponsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-slate-500 font-bold">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
