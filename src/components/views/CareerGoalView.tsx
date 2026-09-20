import React, { useState } from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  Target,
  CheckCircle2,
  Globe,
  Clock,
  Briefcase,
  Award,
  ArrowRight,
  TrendingUp,
  Search
} from "lucide-react";
import { CareerRole } from "../../types/index.ts";

export const CareerGoalView: React.FC = () => {
  const { roles, selectedRole, selectRole, setActiveTab } = useApp();
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const domains = [
    { id: "all", label: "All Career Domains" },
    { id: "ai_data", label: "AI & Data Engineering" },
    { id: "fullstack_web", label: "Full-Stack Web & Cloud" },
    { id: "cloud_devops", label: "Cloud, DevOps & SRE" },
    { id: "cybersecurity", label: "Cybersecurity & Defense" },
  ];

  const filteredRoles = roles.filter((r) => {
    const matchesDomain = domainFilter === "all" || r.domain === domainFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                Step 2 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Target Career Goal Selection
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your aspiration. The recommendation engine automatically calibrates required competencies and benchmarks.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("current_skills")}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Next: Current Skills</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setDomainFilter(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                domainFilter === d.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRoles.map((role) => {
          const isSelected = selectedRole?.id === role.id;

          return (
            <div
              key={role.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                isSelected
                  ? "border-indigo-600 ring-2 ring-indigo-600/20 shadow-md"
                  : "border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {role.domainLabel}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5">
                      {role.title}
                    </h3>
                  </div>

                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Active Target
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {role.summary}
                </p>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Market Demand
                    </span>
                    <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      {role.globalMarketDemand}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Timeline
                    </span>
                    <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      ~{role.averageTimelineMonths} Mos
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Borderless Remote
                    </span>
                    <span className="font-bold text-indigo-700 text-[11px] flex items-center gap-1 mt-0.5">
                      <Globe className="w-3 h-3 text-indigo-500" />
                      {role.borderlessRemoteReadiness}%
                    </span>
                  </div>
                </div>

                {/* Typical Responsibilities preview */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                    Core Technical Deliverables:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {role.typicalResponsibilities.slice(0, 2).map((resp, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-indigo-600 font-bold shrink-0">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {role.requiredSkills.length} Benchmark Competencies
                </span>

                <button
                  id={`select-role-${role.id}`}
                  onClick={() => selectRole(role.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                  }`}
                >
                  <span>{isSelected ? "Currently Selected" : "Set as Target Goal"}</span>
                  {!isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
