import { Router, Request, Response } from "express";
import { globalDataStore } from "../db/store.ts";
import { generateStrategicInsights, invalidateAiCache } from "../ai/insightsService.ts";
import { ProficiencyLevel } from "../../src/types/index.ts";

export const apiRouter = Router();

// Input sanitization helpers
function sanitizeString(val: any, maxLength: number = 255): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLength);
}

function clampNumber(val: any, min: number, max: number, defaultVal: number): number {
  const num = Number(val);
  if (isNaN(num)) return defaultVal;
  return Math.min(max, Math.max(min, num));
}

function isValidProficiencyLevel(level: any): level is ProficiencyLevel {
  const num = Number(level);
  return Number.isInteger(num) && num >= 1 && num <= 5;
}

// 1. Health & Status
apiRouter.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    hackathon: "Global Innovation Hackathon 2026 – Build for a Better Future",
    theme: "Innovate Without Borders",
    service: "Course & Skill Recommendation Engine API",
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// 2. Roles
apiRouter.get("/roles", (req: Request, res: Response) => {
  try {
    const roles = globalDataStore.getRoles();
    res.status(200).json(roles);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve career roles", details: err.message });
  }
});

apiRouter.get("/roles/:id", (req: Request, res: Response) => {
  try {
    const roleId = sanitizeString(req.params.id, 100);
    if (!roleId) {
      return res.status(400).json({ error: "Role ID must be specified" });
    }
    const role = globalDataStore.getRoleById(roleId);
    if (!role) {
      return res.status(404).json({ error: `Career role '${roleId}' not found` });
    }
    res.status(200).json(role);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve role", details: err.message });
  }
});

// 3. Skills Taxonomy
apiRouter.get("/skills", (req: Request, res: Response) => {
  try {
    const skills = globalDataStore.getSkills();
    res.status(200).json(skills);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve skill taxonomy", details: err.message });
  }
});

// 4. Profile Management
apiRouter.get("/profile", (req: Request, res: Response) => {
  try {
    const profile = globalDataStore.getUserProfile();
    res.status(200).json(profile);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve user profile", details: err.message });
  }
});

apiRouter.put("/profile", (req: Request, res: Response) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Request body must be a valid JSON object" });
    }

    const updates: Record<string, any> = {};

    if (req.body.fullName !== undefined) {
      updates.fullName = sanitizeString(req.body.fullName, 120);
    }
    if (req.body.email !== undefined) {
      updates.email = sanitizeString(req.body.email, 120);
    }
    if (req.body.headline !== undefined) {
      updates.headline = sanitizeString(req.body.headline, 250);
    }
    if (req.body.targetRoleId !== undefined) {
      const targetRoleId = sanitizeString(req.body.targetRoleId, 100);
      const roleExists = globalDataStore.getRoleById(targetRoleId);
      if (!roleExists) {
        return res.status(400).json({ error: `Invalid targetRoleId: '${targetRoleId}' does not exist` });
      }
      updates.targetRoleId = targetRoleId;
    }
    if (req.body.currentExperienceLevel !== undefined) {
      const validLevels = ["student", "entry_level", "mid_level", "senior_transitioning", "self_taught"];
      if (!validLevels.includes(req.body.currentExperienceLevel)) {
        return res.status(400).json({ error: `Invalid currentExperienceLevel. Must be one of: ${validLevels.join(", ")}` });
      }
      updates.currentExperienceLevel = req.body.currentExperienceLevel;
    }
    if (req.body.weeklyLearningHours !== undefined) {
      updates.weeklyLearningHours = clampNumber(req.body.weeklyLearningHours, 1, 80, 10);
    }
    if (req.body.preferredLearningPace !== undefined) {
      const validPaces = ["intensive", "balanced", "self_paced"];
      if (validPaces.includes(req.body.preferredLearningPace)) {
        updates.preferredLearningPace = req.body.preferredLearningPace;
      }
    }
    if (Array.isArray(req.body.preferredLearningFormats)) {
      const validFormats = ["video", "interactive", "documentation", "project_based", "academic_paper"];
      updates.preferredLearningFormats = req.body.preferredLearningFormats.filter((f: any) => validFormats.includes(f));
    }
    if (req.body.borderlessAspirations !== undefined) {
      updates.borderlessAspirations = sanitizeString(req.body.borderlessAspirations, 1000);
    }
    if (req.body.primaryLanguage !== undefined) {
      updates.primaryLanguage = sanitizeString(req.body.primaryLanguage, 50);
    }

    const updated = globalDataStore.updateUserProfile(updates);
    
    // Invalidate AI cache when profile preferences change
    invalidateAiCache();

    if (updates.targetRoleId || updates.weeklyLearningHours) {
      globalDataStore.generateInitialRoadmap();
    }

    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update user profile", details: err.message });
  }
});

// Skills inventory updates
apiRouter.post("/profile/skills", (req: Request, res: Response) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Request body is required" });
    }

    invalidateAiCache();

    if (Array.isArray(req.body.skills)) {
      const sanitizedSkills = req.body.skills.map((s: any) => {
        const skillId = sanitizeString(s.skillId, 100);
        const level = isValidProficiencyLevel(s.currentLevel) ? Number(s.currentLevel) : 1;
        const skillMeta = globalDataStore.getSkills().find(sk => sk.id === skillId);
        return {
          skillId,
          skillName: sanitizeString(s.skillName || skillMeta?.name || skillId, 150),
          currentLevel: level as ProficiencyLevel,
          selfAssessedConfidence: clampNumber(s.selfAssessedConfidence, 1, 100, level * 20),
          lastUpdated: new Date().toISOString(),
          yearsOfExperience: clampNumber(s.yearsOfExperience, 0, 40, 1),
        };
      });

      const updated = globalDataStore.updateUserSkills(sanitizedSkills);
      return res.status(200).json(updated);
    } else if (req.body.skillId && req.body.currentLevel !== undefined) {
      const skillId = sanitizeString(req.body.skillId, 100);
      if (!isValidProficiencyLevel(req.body.currentLevel)) {
        return res.status(400).json({ error: "currentLevel must be an integer between 1 and 5" });
      }
      const level = Number(req.body.currentLevel) as ProficiencyLevel;
      const skillMeta = globalDataStore.getSkills().find(sk => sk.id === skillId);

      const updated = globalDataStore.upsertSingleSkill({
        skillId,
        skillName: sanitizeString(req.body.skillName || skillMeta?.name || skillId, 150),
        currentLevel: level,
        selfAssessedConfidence: clampNumber(req.body.selfAssessedConfidence, 1, 100, level * 20),
        lastUpdated: new Date().toISOString(),
        yearsOfExperience: clampNumber(req.body.yearsOfExperience, 0, 40, 1),
      });
      return res.status(200).json(updated);
    }

    res.status(400).json({ error: "Invalid skill update payload. Must provide 'skills' array or 'skillId' and 'currentLevel'." });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update user skills", details: err.message });
  }
});

// 5. Skill-Gap Analysis
apiRouter.get("/gap-analysis", (req: Request, res: Response) => {
  try {
    const roleId = req.query.roleId ? sanitizeString(req.query.roleId, 100) : undefined;
    const analysis = globalDataStore.computeSkillGapAnalysis(roleId);
    res.status(200).json(analysis);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to compute skill gap analysis", details: err.message });
  }
});

// 6. AI Strategic Insights & Gap Diagnostic (Gemini 3.8 Flash + Deterministic Fallback)
// Expose both /api/ai/strategic-insights and /api/gap-analysis/ai-insights
const handleAiInsights = async (req: Request, res: Response) => {
  try {
    const roleId = req.body?.roleId ? sanitizeString(req.body.roleId, 100) : undefined;
    const insights = await generateStrategicInsights(roleId);
    res.status(200).json(insights);
  } catch (err: any) {
    console.error("AI Insights route error:", err);
    res.status(500).json({ error: "Failed to generate strategic insights", details: err.message });
  }
};

apiRouter.post("/ai/strategic-insights", handleAiInsights);
apiRouter.post("/gap-analysis/ai-insights", handleAiInsights);

// 7. Roadmap Management
apiRouter.get("/roadmap", (req: Request, res: Response) => {
  try {
    const roleId = req.query.roleId ? sanitizeString(req.query.roleId, 100) : undefined;
    const roadmap = globalDataStore.getRoadmap(roleId);
    res.status(200).json(roadmap);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve learning roadmap", details: err.message });
  }
});

apiRouter.post("/roadmap/generate", (req: Request, res: Response) => {
  try {
    const roadmap = globalDataStore.generateInitialRoadmap();
    res.status(200).json(roadmap);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to generate roadmap", details: err.message });
  }
});

apiRouter.put("/roadmap/milestones/:milestoneId", (req: Request, res: Response) => {
  try {
    const milestoneId = sanitizeString(req.params.milestoneId, 100);
    if (!milestoneId) {
      return res.status(400).json({ error: "milestoneId is required" });
    }

    const roleId = req.body?.roleId ? sanitizeString(req.body.roleId, 100) : "ai_engineer";
    const progressPercent = clampNumber(req.body?.progressPercent, 0, 100, 0);
    const isCompleted = typeof req.body?.isCompleted === "boolean" ? req.body.isCompleted : undefined;

    const updated = globalDataStore.updateMilestoneProgress(roleId, milestoneId, progressPercent, isCompleted);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update milestone", details: err.message });
  }
});

// 8. Progress Logs
apiRouter.get("/progress", (req: Request, res: Response) => {
  try {
    const logs = globalDataStore.getProgressLogs();
    res.status(200).json(logs);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve progress logs", details: err.message });
  }
});

apiRouter.post("/progress/log", (req: Request, res: Response) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Request body is required" });
    }

    const title = sanitizeString(req.body.title, 200);
    const type = sanitizeString(req.body.type, 50);

    if (!title) {
      return res.status(400).json({ error: "Field 'title' is required" });
    }
    if (!type) {
      return res.status(400).json({ error: "Field 'type' is required" });
    }

    const validTypes = ["skill_level_up", "course_completed", "project_shipped", "quiz_passed", "study_session"];
    const effectiveType = validTypes.includes(type) ? type : "study_session";

    const log = globalDataStore.addProgressLog({
      milestoneId: sanitizeString(req.body.milestoneId || "general", 100),
      skillId: req.body.skillId ? sanitizeString(req.body.skillId, 100) : undefined,
      type: effectiveType as any,
      title,
      notes: sanitizeString(req.body.notes || "", 2000),
      loggedHours: clampNumber(req.body.loggedHours, 0.1, 100, 1),
    });

    res.status(201).json(log);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to add progress log", details: err.message });
  }
});

// 9. Recommendations (Courses & Projects)
apiRouter.get("/recommendations/courses", (req: Request, res: Response) => {
  try {
    const roleId = req.query.roleId ? sanitizeString(req.query.roleId, 100) : undefined;
    const courses = globalDataStore.generatePersonalizedCourseRecommendations(roleId);
    res.status(200).json(courses);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve courses", details: err.message });
  }
});

apiRouter.get("/recommendations/projects", (req: Request, res: Response) => {
  try {
    const roleId = req.query.roleId ? sanitizeString(req.query.roleId, 100) : undefined;
    const projects = globalDataStore.generatePersonalizedProjectRecommendations(roleId);
    res.status(200).json(projects);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve projects", details: err.message });
  }
});

// 10. Test Preset Switcher
apiRouter.post("/profile/preset", (req: Request, res: Response) => {
  try {
    const presetId = req.body?.presetId ? sanitizeString(req.body.presetId, 100) : "";
    if (!presetId) {
      return res.status(400).json({ error: "presetId is required" });
    }
    invalidateAiCache();
    const updated = globalDataStore.loadPresetProfile(presetId);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to load preset profile", details: err.message });
  }
});
