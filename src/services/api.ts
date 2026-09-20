import {
  UserProfile,
  CareerRole,
  SkillItem,
  SkillGapAnalysisResult,
  LearningRoadmap,
  LearningResource,
  ProjectRecommendation,
  ProgressMilestoneLog,
  UserSkillAssessment,
  AiStrategicInsights
} from "../types/index.ts";

export const api = {
  async getHealth(): Promise<any> {
    const res = await fetch("/api/health");
    if (!res.ok) throw new Error("Health check failed");
    return res.json();
  },

  async getRoles(): Promise<CareerRole[]> {
    const res = await fetch("/api/roles");
    if (!res.ok) throw new Error("Failed to fetch career roles");
    return res.json();
  },

  async getRoleById(id: string): Promise<CareerRole> {
    const res = await fetch(`/api/roles/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch role ${id}`);
    return res.json();
  },

  async getSkills(): Promise<SkillItem[]> {
    const res = await fetch("/api/skills");
    if (!res.ok) throw new Error("Failed to fetch skills taxonomy");
    return res.json();
  },

  async getProfile(): Promise<UserProfile> {
    const res = await fetch("/api/profile");
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update user profile");
    return res.json();
  },

  async updateSkills(skills: UserSkillAssessment[]): Promise<UserProfile> {
    const res = await fetch("/api/profile/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills }),
    });
    if (!res.ok) throw new Error("Failed to update skills inventory");
    return res.json();
  },

  async upsertSingleSkill(assessment: UserSkillAssessment): Promise<UserProfile> {
    const res = await fetch("/api/profile/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assessment),
    });
    if (!res.ok) throw new Error("Failed to save skill assessment");
    return res.json();
  },

  async getSkillGapAnalysis(roleId?: string): Promise<SkillGapAnalysisResult> {
    const url = roleId ? `/api/gap-analysis?roleId=${encodeURIComponent(roleId)}` : "/api/gap-analysis";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch skill gap analysis");
    return res.json();
  },

  async getAiGapInsights(roleId?: string): Promise<AiStrategicInsights> {
    try {
      const res = await fetch("/api/ai/strategic-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId }),
      });
      if (!res.ok) {
        // Attempt secondary endpoint alias
        const backupRes = await fetch("/api/gap-analysis/ai-insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roleId }),
        });
        if (!backupRes.ok) throw new Error("Failed to generate strategic insights");
        return backupRes.json();
      }
      return res.json();
    } catch (err: any) {
      console.warn("Client fallback for AI insights:", err);
      // Client-side emergency fallback
      return {
        summary: "Strategic Gap Diagnostic: Focus immediately on your prioritized Phase 1 core competencies to accelerate benchmark readiness.",
        keyStrategicAdvice: [
          "Prioritize high-friction critical skills before progressing to specialized tools.",
          "Dedicate at least 50% of your study hours to active coding exercises.",
          "Document and publish all project milestones as open-source code."
        ],
        isAiGenerated: false,
        source: "Deterministic Competency Engine (Client Fallback)",
        timestamp: new Date().toISOString()
      };
    }
  },

  async getRoadmap(roleId?: string): Promise<LearningRoadmap> {
    const url = roleId ? `/api/roadmap?roleId=${encodeURIComponent(roleId)}` : "/api/roadmap";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch learning roadmap");
    return res.json();
  },

  async generateRoadmap(): Promise<LearningRoadmap> {
    const res = await fetch("/api/roadmap/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to generate roadmap");
    return res.json();
  },

  async updateMilestoneProgress(milestoneId: string, roleId: string, progressPercent: number, isCompleted?: boolean): Promise<LearningRoadmap> {
    const res = await fetch(`/api/roadmap/milestones/${milestoneId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleId, progressPercent, isCompleted }),
    });
    if (!res.ok) throw new Error("Failed to update milestone progress");
    return res.json();
  },

  async getCourses(roleId?: string): Promise<LearningResource[]> {
    const url = roleId ? `/api/recommendations/courses?roleId=${encodeURIComponent(roleId)}` : "/api/recommendations/courses";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
  },

  async getProjects(roleId?: string): Promise<ProjectRecommendation[]> {
    const url = roleId ? `/api/recommendations/projects?roleId=${encodeURIComponent(roleId)}` : "/api/recommendations/projects";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },

  async loadPresetProfile(presetId: string): Promise<UserProfile> {
    const res = await fetch("/api/profile/preset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ presetId }),
    });
    if (!res.ok) throw new Error("Failed to load preset profile");
    return res.json();
  },

  async getProgressLogs(): Promise<ProgressMilestoneLog[]> {
    const res = await fetch("/api/progress");
    if (!res.ok) throw new Error("Failed to fetch progress logs");
    return res.json();
  },

  async addProgressLog(log: Omit<ProgressMilestoneLog, "id" | "timestamp">): Promise<ProgressMilestoneLog> {
    const res = await fetch("/api/progress/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    });
    if (!res.ok) throw new Error("Failed to record progress log");
    return res.json();
  }
};
