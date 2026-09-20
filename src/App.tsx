/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AppProvider, useApp } from "./context/AppContext.tsx";
import { Header } from "./components/layout/Header.tsx";
import { WorkflowPipeline } from "./components/layout/WorkflowPipeline.tsx";
import { Footer } from "./components/layout/Footer.tsx";
import { NotificationToaster } from "./components/layout/NotificationToaster.tsx";

import { DashboardOverview } from "./components/views/DashboardOverview.tsx";
import { UserProfileView } from "./components/views/UserProfileView.tsx";
import { CareerGoalView } from "./components/views/CareerGoalView.tsx";
import { CurrentSkillsView } from "./components/views/CurrentSkillsView.tsx";
import { RoleBenchmarkView } from "./components/views/RoleBenchmarkView.tsx";
import { SkillGapView } from "./components/views/SkillGapView.tsx";
import { SkillPrioritizationView } from "./components/views/SkillPrioritizationView.tsx";
import { RoadmapView } from "./components/views/RoadmapView.tsx";
import { CoursesView } from "./components/views/CoursesView.tsx";
import { ProjectsView } from "./components/views/ProjectsView.tsx";
import { ProgressTrackerView } from "./components/views/ProgressTrackerView.tsx";

const MainContent: React.FC = () => {
  const { activeTab, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-500">
          Loading Course & Skill Recommendation Engine...
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {activeTab === "dashboard" && <DashboardOverview />}
      {activeTab === "profile" && <UserProfileView />}
      {activeTab === "career_goal" && <CareerGoalView />}
      {activeTab === "current_skills" && <CurrentSkillsView />}
      {activeTab === "role_requirements" && <RoleBenchmarkView />}
      {activeTab === "gap_analysis" && <SkillGapView />}
      {activeTab === "skill_prioritization" && <SkillPrioritizationView />}
      {activeTab === "roadmap" && <RoadmapView />}
      {activeTab === "courses" && <CoursesView />}
      {activeTab === "projects" && <ProjectsView />}
      {activeTab === "progress_tracker" && <ProgressTrackerView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        <Header />
        <WorkflowPipeline />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />
        <NotificationToaster />
      </div>
    </AppProvider>
  );
}
