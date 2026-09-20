import React from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  Compass,
  Globe,
  Sparkles,
  User,
  Award,
  ChevronRight,
  TrendingUp,
  BookOpen
} from "lucide-react";
import { ActiveTab } from "../../types/index.ts";

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, profile, selectedRole, gapAnalysis } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Hackathon Official Banner Bar */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold tracking-wide bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 px-2 py-0.5 rounded text-[11px]">
              <Globe className="w-3 h-3 text-cyan-400" />
              Global Innovation Hackathon 2026
            </span>
            <span className="hidden sm:inline text-slate-300 font-medium">
              Theme: <span className="text-cyan-300">“Innovate Without Borders”</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Build for a Better Future
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-[11px] text-slate-300">
              Personalized Career & Skill Engine
            </span>
          </div>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand & Logo */}
          <div
            id="brand-logo"
            onClick={() => setActiveTab("dashboard")}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight font-sans">
                  SkillEngine<span className="text-indigo-600">2026</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100">
                  Global
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Course & Skill Recommendation Engine
              </p>
            </div>
          </div>

          {/* Quick Target Role & Readiness Snapshot */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-1.5 px-3">
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                Target Role
              </span>
              <span className="text-xs font-bold text-slate-800">
                {selectedRole?.title || "AI & LLM Solutions Engineer"}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                Readiness Match
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${gapAnalysis?.overallReadinessScore || 0}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-indigo-700">
                  {gapAnalysis?.overallReadinessScore || 0}%
                </span>
              </div>
            </div>
          </div>

          {/* User Profile & Dashboard Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="nav-dashboard-btn"
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === "dashboard"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              id="nav-profile-btn"
              onClick={() => setActiveTab("profile")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border ${
                activeTab === "profile"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">{profile?.fullName || "User Profile"}</span>
              <span className="sm:hidden">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
