import React from "react";
import { useApp } from "../../context/AppContext.tsx";
import { ActiveTab } from "../../types/index.ts";
import {
  UserCheck,
  Target,
  Layers,
  FileCheck2,
  Sparkles,
  ListOrdered,
  MapPin,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface PipelineStep {
  id: ActiveTab;
  number: number;
  label: string;
  icon: React.ElementType;
  description: string;
}

const STEPS: PipelineStep[] = [
  { id: "profile", number: 1, label: "User Profile", icon: UserCheck, description: "Learning preferences & background" },
  { id: "career_goal", number: 2, label: "Career Goal", icon: Target, description: "Target role & market demand" },
  { id: "current_skills", number: 3, label: "Current Skills", icon: Layers, description: "Interactive skill inventory" },
  { id: "role_requirements", number: 4, label: "Role Benchmark", icon: FileCheck2, description: "Industry competency requirements" },
  { id: "gap_analysis", number: 5, label: "Skill-Gap Analysis", icon: Sparkles, description: "Algorithmic & AI diagnostic" },
  { id: "skill_prioritization", number: 6, label: "Skill Prioritization", icon: ListOrdered, description: "P1-P4 urgency & impact matrix" },
  { id: "roadmap", number: 7, label: "Learning Roadmap", icon: MapPin, description: "Phase-by-phase acceleration path" },
  { id: "courses", number: 8, label: "Course Recommendations", icon: GraduationCap, description: "Curated open resources & labs" },
  { id: "projects", number: 9, label: "Project Recommendations", icon: FolderGit2, description: "Real-world portfolio capstones" },
  { id: "progress_tracker", number: 10, label: "Progress Tracking", icon: CheckCircle2, description: "Milestones, hours & mastery log" },
];

export const WorkflowPipeline: React.FC = () => {
  const { activeTab, setActiveTab, gapAnalysis, profile } = useApp();

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between pb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            End-to-End Career Architecture Pipeline (10 Steps)
          </span>
          <span className="text-xs text-indigo-600 font-medium">
            Active: {STEPS.find((s) => s.id === activeTab)?.label || "Dashboard Overview"}
          </span>
        </div>

        {/* Scrollable Horizontal Pipeline on mobile/desktop */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 pb-1 pt-1 -mx-2 px-2">
          <div className="flex items-center space-x-1.5 min-w-max">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeTab === step.id;
              
              // Calculate status indicators based on user data
              let isStepDone = false;
              if (step.id === "profile" && profile?.fullName) isStepDone = true;
              if (step.id === "career_goal" && profile?.targetRoleId) isStepDone = true;
              if (step.id === "current_skills" && (profile?.currentSkills.length || 0) > 0) isStepDone = true;
              if (step.id === "role_requirements" && profile?.targetRoleId) isStepDone = true;
              if (step.id === "gap_analysis" && gapAnalysis) isStepDone = true;
              if (step.id === "skill_prioritization" && (gapAnalysis?.gaps.length || 0) > 0) isStepDone = true;

              return (
                <React.Fragment key={step.id}>
                  <button
                    id={`pipeline-step-${step.id}`}
                    onClick={() => setActiveTab(step.id)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs font-semibold"
                        : isStepDone
                        ? "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                        : "bg-slate-50/60 text-slate-500 hover:bg-slate-100/80 border border-transparent"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? "bg-white text-indigo-700"
                          : isStepDone
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {step.number}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-800"}`} />
                    <span className="whitespace-nowrap">{step.label}</span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
