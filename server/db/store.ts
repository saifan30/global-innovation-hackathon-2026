import {
  UserProfile,
  CareerRole,
  SkillItem,
  SkillGapAnalysisResult,
  SkillGapItem,
  LearningRoadmap,
  RoadmapMilestone,
  LearningResource,
  ProjectRecommendation,
  ProgressMilestoneLog,
  UserSkillAssessment,
  ProficiencyLevel,
  ResourceAddressedSkill,
  ProjectSkillGain
} from "../../src/types/index.ts";
import {
  INITIAL_CAREER_ROLES,
  INITIAL_SKILLS,
  INITIAL_LEARNING_RESOURCES,
  INITIAL_PROJECTS
} from "./data.ts";
import { TEST_PERSONAS } from "./presets.ts";

export class DataStore {
  private roles: CareerRole[] = [...INITIAL_CAREER_ROLES];
  private skills: SkillItem[] = [...INITIAL_SKILLS];
  private resources: LearningResource[] = [...INITIAL_LEARNING_RESOURCES];
  private projects: ProjectRecommendation[] = [...INITIAL_PROJECTS];
  
  // Clean, unconfigured initial state for production users
  private userProfile: UserProfile = {
    id: "usr_global_innovator_2026",
    fullName: "",
    email: "",
    headline: "",
    targetRoleId: "ai_engineer",
    currentExperienceLevel: "entry_level",
    weeklyLearningHours: 10,
    preferredLearningPace: "balanced",
    preferredLearningFormats: ["project_based", "interactive"],
    primaryLanguage: "English",
    borderlessAspirations: "",
    currentSkills: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  private roadmaps: Map<string, LearningRoadmap> = new Map();
  private progressLogs: ProgressMilestoneLog[] = [];

  constructor() {
    this.generateInitialRoadmap();
  }

  // --- Roles & Skills ---
  public getRoles(): CareerRole[] {
    return this.roles;
  }

  public getRoleById(id: string): CareerRole | undefined {
    return this.roles.find((r) => r.id === id);
  }

  public getSkills(): SkillItem[] {
    return this.skills;
  }

  // --- User Profile ---
  public getUserProfile(): UserProfile {
    return this.userProfile;
  }

  public updateUserProfile(updates: Partial<UserProfile>): UserProfile {
    this.userProfile = {
      ...this.userProfile,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    if (updates.weeklyLearningHours !== undefined || updates.targetRoleId !== undefined || updates.currentSkills !== undefined) {
      this.generateInitialRoadmap();
    }
    return this.userProfile;
  }

  public updateUserSkills(skills: UserSkillAssessment[]): UserProfile {
    this.userProfile.currentSkills = skills;
    this.userProfile.updatedAt = new Date().toISOString();
    this.generateInitialRoadmap();
    return this.userProfile;
  }

  public upsertSingleSkill(assessment: UserSkillAssessment): UserProfile {
    const existingIndex = this.userProfile.currentSkills.findIndex(s => s.skillId === assessment.skillId);
    if (existingIndex >= 0) {
      this.userProfile.currentSkills[existingIndex] = {
        ...this.userProfile.currentSkills[existingIndex],
        ...assessment,
        lastUpdated: new Date().toISOString()
      };
    } else {
      this.userProfile.currentSkills.push({
        ...assessment,
        lastUpdated: new Date().toISOString()
      });
    }
    this.userProfile.updatedAt = new Date().toISOString();
    this.generateInitialRoadmap();
    return this.userProfile;
  }

  // --- Skill-Gap Analysis Engine ---
  public computeSkillGapAnalysis(targetRoleId?: string): SkillGapAnalysisResult {
    const roleId = targetRoleId || this.userProfile.targetRoleId || "ai_engineer";
    const role = this.getRoleById(roleId) || this.roles[0];
    const userSkillsMap = new Map<string, UserSkillAssessment>(
      this.userProfile.currentSkills.map((s) => [s.skillId, s])
    );

    let totalWeight = 0;
    let acquiredWeight = 0;
    let criticalCount = 0;
    let criticalCovered = 0;
    let masteredCount = 0;
    let partialCount = 0;
    let missingCount = 0;

    const gapItems: SkillGapItem[] = [];

    for (const req of role.requiredSkills) {
      const userSkill = userSkillsMap.get(req.skillId);
      const isAssessed = !!userSkill;
      const currentLevel: ProficiencyLevel = userSkill ? userSkill.currentLevel : 1;
      const weight = req.weight || 5;

      totalWeight += weight * req.requiredLevel;

      if (req.importance === 'critical') {
        criticalCount++;
      }

      let gapLevel = 0;
      let status: SkillGapItem['status'] = 'mastered';
      let priority: SkillGapItem['learningPriority'] = 'P4 - Polish';
      let urgency = 20;
      let estimatedHours = 0;

      if (!isAssessed) {
        // Unassessed competency: acquired points = 0, full required level is gap
        gapLevel = req.requiredLevel;
        missingCount++;
        status = req.importance === 'critical' ? 'critical_gap' : 'partial_gap';
        priority = req.importance === 'critical' ? 'P1 - Immediate' : 'P2 - Core Next';
        urgency = req.importance === 'critical' ? 95 : 70;
        estimatedHours = req.requiredLevel * (req.importance === 'critical' ? 25 : 18);
      } else {
        gapLevel = Math.max(0, req.requiredLevel - currentLevel);
        acquiredWeight += weight * Math.min(currentLevel, req.requiredLevel);

        if (gapLevel === 0) {
          masteredCount++;
          status = 'mastered';
          priority = 'P4 - Polish';
          urgency = 10;
          if (req.importance === 'critical') {
            criticalCovered++;
          }
        } else if (currentLevel >= 2) {
          partialCount++;
          status = req.importance === 'critical' ? 'critical_gap' : 'partial_gap';
          priority = req.importance === 'critical' ? 'P1 - Immediate' : 'P2 - Core Next';
          urgency = req.importance === 'critical' ? 85 : 60;
        } else {
          missingCount++;
          status = req.importance === 'critical' ? 'critical_gap' : 'partial_gap';
          priority = req.importance === 'critical' ? 'P1 - Immediate' : 'P3 - Specialization';
          urgency = req.importance === 'critical' ? 95 : 70;
        }
        estimatedHours = gapLevel * (req.importance === 'critical' ? 25 : 18);
      }

      gapItems.push({
        skillId: req.skillId,
        skillName: req.skillName,
        category: req.category,
        currentLevel,
        requiredLevel: req.requiredLevel,
        gapLevel,
        importance: req.importance,
        status,
        urgencyScore: urgency,
        estimatedHoursToClose: estimatedHours,
        learningPriority: priority
      });
    }

    // Sort prioritized gaps deterministically
    const prioritizedGaps = [...gapItems].sort((a, b) => {
      if (a.importance === 'critical' && b.importance !== 'critical') return -1;
      if (b.importance === 'critical' && a.importance !== 'critical') return 1;
      return b.gapLevel - a.gapLevel || b.urgencyScore - a.urgencyScore;
    });

    const overallReadinessScore = totalWeight > 0 ? Math.round((acquiredWeight / totalWeight) * 100) : 0;
    const criticalSkillsCoverage = criticalCount > 0 ? Math.round((criticalCovered / criticalCount) * 100) : 0;

    const totalHoursToClose = gapItems.reduce((acc, g) => acc + g.estimatedHoursToClose, 0);
    const weeklyHours = Math.max(1, this.userProfile.weeklyLearningHours || 10);
    const estimatedTotalWeeks = totalHoursToClose === 0 ? 0 : Math.max(1, Math.ceil(totalHoursToClose / weeklyHours));

    return {
      roleId: role.id,
      roleTitle: role.title,
      overallReadinessScore,
      criticalSkillsCoverage,
      totalSkillsEvaluated: role.requiredSkills.length,
      skillsMasteredCount: masteredCount,
      skillsPartialCount: partialCount,
      skillsMissingCount: missingCount,
      estimatedTotalWeeks,
      gaps: gapItems,
      prioritizedGaps,
      calculationMethodology: "Calculated via weighted proficiency matrix (Acquired Level × Weight / Benchmark Level × Weight) vs role industry benchmark standard.",
      generatedAt: new Date().toISOString()
    };
  }

  // --- Recommendations Engine ---
  public generatePersonalizedCourseRecommendations(targetRoleId?: string): LearningResource[] {
    const roleId = targetRoleId || this.userProfile.targetRoleId || "ai_engineer";
    const gapAnalysis = this.computeSkillGapAnalysis(roleId);
    const gapMap = new Map<string, SkillGapItem>(gapAnalysis.gaps.map((g) => [g.skillId, g]));
    const weeklyHours = this.userProfile.weeklyLearningHours || 12;
    const preferredFormats = this.userProfile.preferredLearningFormats || [];

    const formatMapping: Record<string, string[]> = {
      course: ["video", "interactive"],
      interactive_lab: ["interactive", "project_based"],
      official_guide: ["documentation"],
      video_series: ["video"],
      textbook: ["documentation", "academic_paper"],
      sandbox: ["interactive", "project_based"],
    };

    const enriched = this.resources.map((res) => {
      // Find which skills this resource addresses for the user
      const addressedSkills: ResourceAddressedSkill[] = [];
      let maxPriorityWeight = 0;
      let highestPriorityTag: 'P1 - Immediate' | 'P2 - Core Next' | 'P3 - Specialization' | 'P4 - Polish' = 'P4 - Polish';
      let activeGapsAddressed = 0;
      let criticalGapsAddressed = 0;

      for (const skillId of res.targetSkillIds) {
        const gap = gapMap.get(skillId);
        const skillMeta = this.skills.find(s => s.id === skillId);
        const skillName = gap?.skillName || skillMeta?.name || skillId;

        if (gap) {
          const importance = gap.importance;
          const priority = gap.learningPriority;
          addressedSkills.push({
            skillId,
            skillName,
            currentLevel: gap.currentLevel,
            requiredLevel: gap.requiredLevel,
            gapLevel: gap.gapLevel,
            priority,
            importance
          });

          if (gap.gapLevel > 0) {
            activeGapsAddressed++;
            if (gap.importance === 'critical') criticalGapsAddressed++;

            if (priority.startsWith("P1") && maxPriorityWeight < 4) {
              maxPriorityWeight = 4;
              highestPriorityTag = "P1 - Immediate";
            } else if (priority.startsWith("P2") && maxPriorityWeight < 3) {
              maxPriorityWeight = 3;
              highestPriorityTag = "P2 - Core Next";
            } else if (priority.startsWith("P3") && maxPriorityWeight < 2) {
              maxPriorityWeight = 2;
              highestPriorityTag = "P3 - Specialization";
            }
          }
        } else {
          // Skill not directly in role requirements but in database
          const userSkill = this.userProfile.currentSkills.find(s => s.skillId === skillId);
          addressedSkills.push({
            skillId,
            skillName,
            currentLevel: userSkill ? userSkill.currentLevel : 1,
            requiredLevel: 4,
            gapLevel: userSkill ? Math.max(0, 4 - userSkill.currentLevel) : 3,
            priority: "P3 - Specialization",
            importance: "nice_to_have"
          });
        }
      }

      // Calculate Modality Match
      const supportedFormats = formatMapping[res.type] || ["documentation"];
      const isFormatMatch = preferredFormats.some(f => supportedFormats.includes(f));

      // Calculate Match Score
      let matchScore = 0;
      if (maxPriorityWeight === 4) matchScore += 70;
      else if (maxPriorityWeight === 3) matchScore += 45;
      else if (maxPriorityWeight === 2) matchScore += 25;
      else matchScore += 10;

      matchScore += criticalGapsAddressed * 20;
      matchScore += activeGapsAddressed * 15;
      if (isFormatMatch) matchScore += 20;
      matchScore += Math.round(res.rating * 3);

      // Estimated weeks at user study pace
      const estimatedWeeksAtUserPace = Math.max(0.5, Math.round((res.estimatedHours / weeklyHours) * 10) / 10);

      // Explainable Rationale
      let recommendationRationale = "";
      const skillNamesStr = addressedSkills.map(s => s.skillName).join(", ");
      
      if (activeGapsAddressed > 0) {
        const topGap = addressedSkills.find(s => s.gapLevel > 0);
        recommendationRationale = `Targeted for your ${highestPriorityTag} gap in ${topGap?.skillName || skillNamesStr} (Current: Level ${topGap?.currentLevel || 1} → Required: Level ${topGap?.requiredLevel || 3}). ${
          isFormatMatch ? `Matches your preferred "${preferredFormats.join('/')}" format.` : 'Official verified syllabus.'
        } Estimated ~${res.estimatedHours}h (${estimatedWeeksAtUserPace} wks at ${weeklyHours}h/wk).`;
      } else {
        recommendationRationale = `Recommended for advanced mastery and benchmark reinforcement in ${skillNamesStr}. Est. ~${res.estimatedHours}h (${estimatedWeeksAtUserPace} wks at ${weeklyHours}h/wk).`;
      }

      const enrichedResource: LearningResource = {
        ...res,
        addressedSkills,
        recommendationRationale,
        estimatedWeeksAtUserPace,
        matchScore,
        formatMatch: isFormatMatch,
        priorityTag: highestPriorityTag
      };

      return enrichedResource;
    });

    // Sort: highest match score first
    return enriched.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }

  public generatePersonalizedProjectRecommendations(targetRoleId?: string): ProjectRecommendation[] {
    const roleId = targetRoleId || this.userProfile.targetRoleId || "ai_engineer";
    const role = this.getRoleById(roleId) || this.roles[0];
    const gapAnalysis = this.computeSkillGapAnalysis(roleId);
    const gapMap = new Map<string, SkillGapItem>(gapAnalysis.gaps.map((g) => [g.skillId, g]));
    const weeklyHours = this.userProfile.weeklyLearningHours || 12;

    const techStackByProject: Record<string, string[]> = {
      proj_multimodal_rag_copilot: ["Python 3.12", "Google Gemini SDK (@google/genai)", "pgvector / PostgreSQL", "FastAPI", "Docker"],
      proj_resilient_cloud_platform: ["TypeScript", "Next.js 15 & React", "Terraform HCL", "Kubernetes", "Google Cloud Run", "Tailwind CSS"],
      proj_zero_trust_auth_gateway: ["Go (Golang)", "Redis", "OAuth2 / OIDC", "Docker", "OWASP Security Scanners"],
      proj_streaming_lakehouse: ["Apache Kafka", "Python & PySpark", "dbt", "PostgreSQL", "DuckDB", "Docker Compose"]
    };

    const enriched = this.projects.map((proj) => {
      const isRoleMatch = proj.targetRoleIds.includes(roleId);
      const skillsDevelopedDetails: ProjectSkillGain[] = [];
      let p1GapsCovered = 0;
      let p2GapsCovered = 0;
      let totalGapsCovered = 0;

      for (const sId of proj.skillsTaught) {
        const gap = gapMap.get(sId);
        const skillMeta = this.skills.find(s => s.id === sId);
        const skillName = gap?.skillName || skillMeta?.name || sId;

        if (gap) {
          skillsDevelopedDetails.push({
            skillId: sId,
            skillName,
            currentLevel: gap.currentLevel,
            targetLevel: gap.requiredLevel,
            gapLevel: gap.gapLevel,
            priority: gap.learningPriority
          });

          if (gap.gapLevel > 0) {
            totalGapsCovered++;
            if (gap.learningPriority.startsWith("P1")) p1GapsCovered++;
            else if (gap.learningPriority.startsWith("P2")) p2GapsCovered++;
          }
        } else {
          skillsDevelopedDetails.push({
            skillId: sId,
            skillName,
            currentLevel: 2,
            targetLevel: 4,
            gapLevel: 2,
            priority: "P3 - Specialization"
          });
        }
      }

      let matchScore = isRoleMatch ? 60 : 20;
      matchScore += p1GapsCovered * 30;
      matchScore += p2GapsCovered * 15;
      matchScore += totalGapsCovered * 10;

      const estimatedWeeksAtUserPace = Math.max(1, Math.round((proj.estimatedHours / weeklyHours) * 10) / 10);
      const priorityTag: 'P1 - Immediate' | 'P2 - Core Next' | 'P3 - Specialization' | 'P4 - Polish' = 
        p1GapsCovered > 0 ? "P1 - Immediate" : p2GapsCovered > 0 ? "P2 - Core Next" : "P3 - Specialization";

      const targetedSkillsSummary = skillsDevelopedDetails
        .filter(s => s.gapLevel > 0)
        .slice(0, 3)
        .map(s => s.skillName.split(" ")[0])
        .join(", ");

      const matchRationale = `Architected for your ${role.title} milestone. Synthesizes hands-on production code bridging ${totalGapsCovered} of your active skill gaps (${targetedSkillsSummary || 'Core Technical competencies'}). Requires ~${proj.estimatedHours}h (~${estimatedWeeksAtUserPace} wks at ${weeklyHours}h/wk) to construct an audited, verifiable global GitHub portfolio piece.`;

      const suggestedTechStack = techStackByProject[proj.id] || [
        "TypeScript",
        "React",
        "Docker",
        "REST APIs"
      ];

      const enrichedProject: ProjectRecommendation = {
        ...proj,
        skillsDevelopedDetails,
        matchRationale,
        suggestedTechStack,
        estimatedWeeksAtUserPace,
        matchScore,
        priorityTag
      };

      return enrichedProject;
    });

    return enriched.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }

  public getRecommendationsForSkills(skillIds: string[]): {
    courses: LearningResource[];
    projects: ProjectRecommendation[];
  } {
    return {
      courses: this.generatePersonalizedCourseRecommendations(),
      projects: this.generatePersonalizedProjectRecommendations()
    };
  }

  public getAllResources(): LearningResource[] {
    return this.generatePersonalizedCourseRecommendations();
  }

  public getAllProjects(): ProjectRecommendation[] {
    return this.generatePersonalizedProjectRecommendations();
  }

  // --- Preset Profile Loader (Test Infrastructure) ---
  public loadPresetProfile(presetId: string): UserProfile {
    const presetData = TEST_PERSONAS[presetId] || TEST_PERSONAS["profile_alex_ai"];
    this.userProfile = {
      ...this.userProfile,
      ...presetData,
      updatedAt: new Date().toISOString()
    } as UserProfile;

    // Refresh roadmap for new target role
    this.generateInitialRoadmap();
    return this.userProfile;
  }

  // --- Roadmap Generation ---
  public generateInitialRoadmap(): LearningRoadmap {
    const roleId = this.userProfile.targetRoleId || "ai_engineer";
    const role = this.getRoleById(roleId) || this.roles[0];
    const gapAnalysis = this.computeSkillGapAnalysis(roleId);

    const criticalGaps = gapAnalysis.gaps.filter(g => g.gapLevel > 0 && g.importance === 'critical');
    const otherGaps = gapAnalysis.gaps.filter(g => g.gapLevel > 0 && g.importance !== 'critical');
    const allRoleSkills = role.requiredSkills;

    // Helper to find courses for skill set
    const findCourseIdsForSkills = (skillIds: string[]): string[] => {
      const matching = this.resources.filter(r => r.targetSkillIds.some(s => skillIds.includes(s)));
      return matching.slice(0, 2).map(r => r.id);
    };

    // Helper to find project for role
    const findProjectIdForRole = (roleKey: string): string => {
      const matching = this.projects.find(p => p.targetRoleIds.includes(roleKey));
      return matching ? matching.id : (this.projects[0]?.id || "proj_multimodal_rag_copilot");
    };

    const phase1Skills = criticalGaps.length > 0 
      ? criticalGaps.slice(0, 2) 
      : allRoleSkills.slice(0, 2).map(r => ({
          skillId: r.skillId,
          skillName: r.skillName,
          currentLevel: 3 as ProficiencyLevel,
          requiredLevel: r.requiredLevel,
          gapLevel: 0
        }));

    const phase2Skills = criticalGaps.length > 2 
      ? criticalGaps.slice(2, 4) 
      : otherGaps.length > 0 
      ? otherGaps.slice(0, 2)
      : allRoleSkills.slice(2, 4).map(r => ({
          skillId: r.skillId,
          skillName: r.skillName,
          currentLevel: 3 as ProficiencyLevel,
          requiredLevel: r.requiredLevel,
          gapLevel: 0
        }));

    const phase1SkillIds = phase1Skills.map(s => s.skillId);
    const phase2SkillIds = phase2Skills.map(s => s.skillId);

    const weeklyHours = Math.max(1, this.userProfile.weeklyLearningHours || 10);
    const phase1Weeks = Math.max(1, Math.round((phase1Skills.length * 28) / weeklyHours));
    const phase2Weeks = Math.max(1, Math.round((phase2Skills.length * 32) / weeklyHours));
    const phase3Weeks = Math.max(1, Math.round(45 / weeklyHours));

    const milestones: RoadmapMilestone[] = [
      {
        id: `phase_1_${role.id}`,
        phaseNumber: 1,
        phaseName: "Phase 1: Core Foundation & Language Mastery",
        title: `Master ${phase1Skills.map(s => s.skillName.split(" ")[0]).join(" & ")} Fundamentals`,
        durationWeeks: phase1Weeks,
        objective: `Build core syntax fluency, algorithmic data handling, and essential foundations tailored for ${role.title}.`,
        targetSkills: phase1Skills.map(s => ({
          skillId: s.skillId,
          skillName: s.skillName,
          fromLevel: s.currentLevel,
          toLevel: Math.min(5, s.currentLevel + Math.max(1, s.gapLevel)) as ProficiencyLevel
        })),
        recommendedCourseIds: findCourseIdsForSkills(phase1SkillIds),
        recommendedProjectIds: [findProjectIdForRole(role.id)],
        checkpointAssessment: "Complete core syntax benchmark and build a baseline automated script suite.",
        isCompleted: false,
        progressPercent: 20
      },
      {
        id: `phase_2_${role.id}`,
        phaseNumber: 2,
        phaseName: "Phase 2: Specialized Architecture & Toolchains",
        title: `Implement ${role.domainLabel} Production Toolchains`,
        durationWeeks: phase2Weeks,
        objective: `Bridge intermediate gaps in frameworks, API boundary contracts, containerization, and system orchestration.`,
        targetSkills: phase2Skills.map(s => ({
          skillId: s.skillId,
          skillName: s.skillName,
          fromLevel: s.currentLevel,
          toLevel: Math.min(5, s.requiredLevel) as ProficiencyLevel
        })),
        recommendedCourseIds: findCourseIdsForSkills(phase2SkillIds),
        recommendedProjectIds: [findProjectIdForRole(role.id)],
        checkpointAssessment: "Pass end-to-end integration test of a multi-container service with live API connectivity.",
        isCompleted: false,
        progressPercent: 0
      },
      {
        id: `phase_3_${role.id}`,
        phaseNumber: 3,
        phaseName: "Phase 3: Production Hardening & Global Capstone",
        title: `Deploy Resilient Capstone for ${role.title}`,
        durationWeeks: phase3Weeks,
        objective: `Deliver a production portfolio project demonstrating borderless collaboration, automated CI/CD, and enterprise security.`,
        targetSkills: [
          {
            skillId: "borderless_collaboration",
            skillName: "Borderless Global Collaboration & Open Source",
            fromLevel: 3,
            toLevel: 5
          }
        ],
        recommendedCourseIds: ["res_system_design_primer", "res_owasp_security"],
        recommendedProjectIds: [findProjectIdForRole(role.id)],
        checkpointAssessment: "Publish open source repository with full documentation, CI/CD pipeline, and live Cloud Run deployment.",
        isCompleted: false,
        progressPercent: 0
      }
    ];

    const roadmap: LearningRoadmap = {
      id: `rdm_${role.id}_${Date.now()}`,
      userId: this.userProfile.id,
      roleId: role.id,
      roleTitle: role.title,
      title: `Personalized 2026 Accelerator: ${role.title}`,
      totalWeeks: milestones.reduce((sum, m) => sum + m.durationWeeks, 0),
      weeklyCommitmentHours: this.userProfile.weeklyLearningHours,
      milestones,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.roadmaps.set(role.id, roadmap);
    return roadmap;
  }

  public getRoadmap(roleId?: string): LearningRoadmap {
    const targetRoleId = roleId || this.userProfile.targetRoleId || "ai_engineer";
    if (!this.roadmaps.has(targetRoleId)) {
      this.generateInitialRoadmap();
    }
    return this.roadmaps.get(targetRoleId)!;
  }

  public updateMilestoneProgress(roleId: string, milestoneId: string, progressPercent: number, isCompleted?: boolean): LearningRoadmap {
    const roadmap = this.getRoadmap(roleId);
    const milestone = roadmap.milestones.find(m => m.id === milestoneId);
    if (milestone) {
      milestone.progressPercent = Math.min(100, Math.max(0, progressPercent));
      if (isCompleted !== undefined) {
        milestone.isCompleted = isCompleted;
      } else if (milestone.progressPercent === 100) {
        milestone.isCompleted = true;
      }
      roadmap.updatedAt = new Date().toISOString();
    }
    return roadmap;
  }

  // --- Progress Logs ---
  public getProgressLogs(): ProgressMilestoneLog[] {
    return this.progressLogs;
  }

  public addProgressLog(log: Omit<ProgressMilestoneLog, "id" | "timestamp">): ProgressMilestoneLog {
    const newLog: ProgressMilestoneLog = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };
    this.progressLogs.unshift(newLog);
    return newLog;
  }
}

export const globalDataStore = new DataStore();
