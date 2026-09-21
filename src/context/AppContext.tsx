import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
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
  ActiveTab,
  AppNotification,
  ProficiencyLevel,
  AiStrategicInsights
} from "../types/index.ts";
import { api } from "../services/api.ts";

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isLoading: boolean;
  profile: UserProfile | null;
  roles: CareerRole[];
  skills: SkillItem[];
  selectedRole: CareerRole | null;
  gapAnalysis: SkillGapAnalysisResult | null;
  roadmap: LearningRoadmap | null;
  courses: LearningResource[];
  projects: ProjectRecommendation[];
  progressLogs: ProgressMilestoneLog[];
  aiInsights: AiStrategicInsights | null;
  isAiLoading: boolean;
  notifications: AppNotification[];
  theme: "light" | "dark";
  toggleTheme: () => void;
  // Actions
  selectRole: (roleId: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  loadPreset: (presetId: string) => Promise<void>;
  updateSkillLevel: (skillId: string, level: ProficiencyLevel) => Promise<void>;
  addNewSkillAssessment: (skillId: string, level: ProficiencyLevel) => Promise<void>;
  removeSkillAssessment: (skillId: string) => Promise<void>;
  refreshGapAnalysis: (roleId?: string) => Promise<void>;
  requestAiInsights: () => Promise<void>;
  refreshRoadmap: () => Promise<void>;
  refreshRecommendations: (roleId?: string) => Promise<void>;
  updateMilestone: (milestoneId: string, progress: number, completed?: boolean) => Promise<void>;
  addProgressRecord: (log: Omit<ProgressMilestoneLog, "id" | "timestamp">) => Promise<void>;
  addNotification: (type: AppNotification["type"], message: string) => void;
  dismissNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [gapAnalysis, setGapAnalysis] = useState<SkillGapAnalysisResult | null>(null);
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [courses, setCourses] = useState<LearningResource[]>([]);
  const [projects, setProjects] = useState<ProjectRecommendation[]>([]);
  const [progressLogs, setProgressLogs] = useState<ProgressMilestoneLog[]>([]);
  const [aiInsights, setAiInsights] = useState<AiStrategicInsights | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Dark / Light Theme State with LocalStorage Persistence
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("skillengine_theme");
        if (saved === "dark" || saved === "light") return saved;
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        }
      } catch (e) {
        // Fallback for restricted storage environments
      }
    }
    return "light";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      try {
        localStorage.setItem("skillengine_theme", theme);
      } catch (e) {
        // Fallback for restricted environments
      }
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const addNotification = useCallback((type: AppNotification["type"], message: string) => {
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      type,
      message,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 4)]);
    setTimeout(() => {
      dismissNotification(newNotif.id);
    }, 4500);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Initial load
  const initializeData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedRoles, fetchedSkills, fetchedProfile, fetchedCourses, fetchedProjects, fetchedProgress] =
        await Promise.all([
          api.getRoles(),
          api.getSkills(),
          api.getProfile(),
          api.getCourses(),
          api.getProjects(),
          api.getProgressLogs(),
        ]);

      setRoles(fetchedRoles);
      setSkills(fetchedSkills);
      setProfile(fetchedProfile);
      setCourses(fetchedCourses);
      setProjects(fetchedProjects);
      setProgressLogs(fetchedProgress);

      const targetRoleId = fetchedProfile.targetRoleId || fetchedRoles[0]?.id || "ai_engineer";
      const [analysis, fetchedRoadmap] = await Promise.all([
        api.getSkillGapAnalysis(targetRoleId),
        api.getRoadmap(targetRoleId),
      ]);

      setGapAnalysis(analysis);
      setRoadmap(fetchedRoadmap);
    } catch (err: any) {
      console.error("Initialization error:", err);
      addNotification("error", `Failed to load application data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const selectedRole = roles.find((r) => r.id === (profile?.targetRoleId || "ai_engineer")) || roles[0] || null;

  const refreshGapAnalysis = useCallback(async (roleId?: string) => {
    try {
      const targetId = roleId || profile?.targetRoleId || "ai_engineer";
      const result = await api.getSkillGapAnalysis(targetId);
      setGapAnalysis(result);
    } catch (err: any) {
      console.error("Failed to refresh gap analysis:", err);
    }
  }, [profile?.targetRoleId]);

  const refreshRoadmap = useCallback(async () => {
    try {
      const targetId = profile?.targetRoleId || "ai_engineer";
      const result = await api.getRoadmap(targetId);
      setRoadmap(result);
    } catch (err: any) {
      console.error("Failed to refresh roadmap:", err);
    }
  }, [profile?.targetRoleId]);

  const refreshRecommendations = useCallback(async (roleId?: string) => {
    try {
      const targetId = roleId || profile?.targetRoleId || "ai_engineer";
      const [fetchedCourses, fetchedProjects] = await Promise.all([
        api.getCourses(targetId),
        api.getProjects(targetId),
      ]);
      setCourses(fetchedCourses);
      setProjects(fetchedProjects);
    } catch (err: any) {
      console.error("Failed to refresh recommendations:", err);
    }
  }, [profile?.targetRoleId]);

  const selectRole = async (roleId: string) => {
    if (!profile) return;
    try {
      setIsLoading(true);
      const updatedProfile = await api.updateProfile({ targetRoleId: roleId });
      setProfile(updatedProfile);

      const [newAnalysis, newRoadmap, newCourses, newProjects] = await Promise.all([
        api.getSkillGapAnalysis(roleId),
        api.getRoadmap(roleId),
        api.getCourses(roleId),
        api.getProjects(roleId),
      ]);
      setGapAnalysis(newAnalysis);
      setRoadmap(newRoadmap);
      setCourses(newCourses);
      setProjects(newProjects);
      setAiInsights(null); // reset AI cache for new role
      addNotification("success", `Target career goal updated to ${roles.find(r => r.id === roleId)?.title || roleId}`);
    } catch (err: any) {
      addNotification("error", `Could not update career goal: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreset = async (presetId: string) => {
    try {
      setIsLoading(true);
      const updated = await api.loadPresetProfile(presetId);
      setProfile(updated);
      const roleId = updated.targetRoleId || "ai_engineer";

      const [newAnalysis, newRoadmap, newCourses, newProjects] = await Promise.all([
        api.getSkillGapAnalysis(roleId),
        api.getRoadmap(roleId),
        api.getCourses(roleId),
        api.getProjects(roleId),
      ]);
      setGapAnalysis(newAnalysis);
      setRoadmap(newRoadmap);
      setCourses(newCourses);
      setProjects(newProjects);
      setAiInsights(null);
      addNotification("success", `Loaded preset profile: ${updated.fullName} (${updated.headline})`);
    } catch (err: any) {
      addNotification("error", `Failed to switch preset: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updated = await api.updateProfile(updates);
      setProfile(updated);
      const roleId = updated.targetRoleId || "ai_engineer";
      await Promise.all([
        refreshGapAnalysis(roleId),
        refreshRecommendations(roleId),
        refreshRoadmap(),
      ]);
      addNotification("success", "Profile settings saved successfully");
    } catch (err: any) {
      addNotification("error", `Failed to save profile: ${err.message}`);
    }
  };

  const updateSkillLevel = async (skillId: string, level: ProficiencyLevel) => {
    if (!profile) return;
    try {
      const existing = profile.currentSkills.find((s) => s.skillId === skillId);
      const skillMeta = skills.find((s) => s.id === skillId);
      const updatedAssessment: UserSkillAssessment = {
        skillId,
        skillName: skillMeta?.name || existing?.skillName || skillId,
        currentLevel: level,
        selfAssessedConfidence: Math.min(100, level * 20),
        lastUpdated: new Date().toISOString(),
        yearsOfExperience: existing?.yearsOfExperience || 1,
      };

      const updatedProfile = await api.upsertSingleSkill(updatedAssessment);
      setProfile(updatedProfile);
      const roleId = updatedProfile.targetRoleId || "ai_engineer";
      await Promise.all([
        refreshGapAnalysis(roleId),
        refreshRecommendations(roleId),
        refreshRoadmap(),
      ]);
      addNotification("info", `Proficiency updated for ${updatedAssessment.skillName} to Level ${level}`);
    } catch (err: any) {
      addNotification("error", `Failed to update skill: ${err.message}`);
    }
  };

  const addNewSkillAssessment = async (skillId: string, level: ProficiencyLevel) => {
    await updateSkillLevel(skillId, level);
  };

  const removeSkillAssessment = async (skillId: string) => {
    if (!profile) return;
    try {
      const filtered = profile.currentSkills.filter((s) => s.skillId !== skillId);
      const updatedProfile = await api.updateSkills(filtered);
      setProfile(updatedProfile);
      const roleId = updatedProfile.targetRoleId || "ai_engineer";
      await Promise.all([
        refreshGapAnalysis(roleId),
        refreshRecommendations(roleId),
        refreshRoadmap(),
      ]);
      addNotification("info", "Skill removed from your inventory");
    } catch (err: any) {
      addNotification("error", `Failed to remove skill: ${err.message}`);
    }
  };

  const requestAiInsights = async () => {
    setIsAiLoading(true);
    try {
      const data = await api.getAiGapInsights(profile?.targetRoleId);
      setAiInsights(data);
      addNotification("success", "AI Career Diagnostic analysis generated");
    } catch (err: any) {
      addNotification("error", `AI insight generation failed: ${err.message}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  const updateMilestone = async (milestoneId: string, progress: number, completed?: boolean) => {
    const roleId = profile?.targetRoleId || "ai_engineer";
    try {
      const updatedRoadmap = await api.updateMilestoneProgress(milestoneId, roleId, progress, completed);
      setRoadmap(updatedRoadmap);
      addNotification("success", "Milestone progress updated");
    } catch (err: any) {
      addNotification("error", `Failed to update milestone: ${err.message}`);
    }
  };

  const addProgressRecord = async (log: Omit<ProgressMilestoneLog, "id" | "timestamp">) => {
    try {
      const newLog = await api.addProgressLog(log);
      setProgressLogs((prev) => [newLog, ...prev]);
      addNotification("success", `Progress logged: ${newLog.title}`);
    } catch (err: any) {
      addNotification("error", `Failed to log progress: ${err.message}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isLoading,
        profile,
        roles,
        skills,
        selectedRole,
        gapAnalysis,
        roadmap,
        courses,
        projects,
        progressLogs,
        aiInsights,
        isAiLoading,
        notifications,
        theme,
        toggleTheme,
        selectRole,
        updateProfile,
        loadPreset,
        updateSkillLevel,
        addNewSkillAssessment,
        removeSkillAssessment,
        refreshGapAnalysis,
        requestAiInsights,
        refreshRoadmap,
        refreshRecommendations,
        updateMilestone,
        addProgressRecord,
        addNotification,
        dismissNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
