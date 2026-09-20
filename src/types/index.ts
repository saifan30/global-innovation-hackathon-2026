/**
 * Global Innovation Hackathon 2026 – Build for a Better Future
 * Theme: "Innovate Without Borders"
 * Project: Course & Skill Recommendation Engine
 */

export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'core_technical' | 'frameworks_tools' | 'architecture_cloud' | 'soft_skills' | 'domain_expertise';
  description: string;
  iconName?: string;
  demandScore: number; // 1 to 100 (Calculated Index Score based on 2026 Skills Taxonomy Assessment Model)
  globalTrending: boolean;
  marketIndexRationale?: string;
}

export interface UserSkillAssessment {
  skillId: string;
  skillName: string;
  currentLevel: ProficiencyLevel; // 1: Beginner, 2: Elementary, 3: Intermediate, 4: Advanced, 5: Expert
  targetLevel?: ProficiencyLevel;
  yearsOfExperience?: number;
  lastUpdated: string;
  selfAssessedConfidence: number; // 1 to 100
}

export interface RoleSkillRequirement {
  skillId: string;
  skillName: string;
  category: string;
  requiredLevel: ProficiencyLevel; // Minimum required proficiency level
  importance: 'critical' | 'important' | 'nice_to_have';
  weight: number; // 1 - 10
  rationale: string;
}

export interface RoleSourceInfo {
  benchmarkFramework: string;
  curriculumStandard: string;
  sourceUrl?: string;
  lastAudited: string;
}

export interface CareerRole {
  id: string;
  title: string;
  domain: 'ai_data' | 'cloud_devops' | 'fullstack_web' | 'cybersecurity' | 'product_design' | 'mobile_systems' | 'frontier_tech';
  domainLabel: string;
  summary: string;
  globalMarketDemand: 'Very High' | 'High' | 'Moderate' | 'Emerging';
  averageTimelineMonths: number;
  borderlessRemoteReadiness: number; // Calculated Remote Index %
  requiredSkills: RoleSkillRequirement[];
  certificationsRecommended: string[];
  typicalResponsibilities: string[];
  sourceInfo?: RoleSourceInfo;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  headline: string;
  targetRoleId?: string;
  currentExperienceLevel: 'student' | 'entry_level' | 'mid_level' | 'senior_transitioning' | 'self_taught';
  weeklyLearningHours: number;
  preferredLearningPace: 'intensive' | 'balanced' | 'self_paced';
  preferredLearningFormats: ('video' | 'interactive' | 'documentation' | 'project_based' | 'academic_paper')[];
  primaryLanguage: string;
  borderlessAspirations: string; // e.g. "Work for international open source / remote global engineering teams"
  currentSkills: UserSkillAssessment[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillGapItem {
  skillId: string;
  skillName: string;
  category: string;
  currentLevel: ProficiencyLevel;
  requiredLevel: ProficiencyLevel;
  gapLevel: number; // requiredLevel - currentLevel (0 if current >= required)
  importance: 'critical' | 'important' | 'nice_to_have';
  status: 'mastered' | 'proficient' | 'partial_gap' | 'critical_gap';
  urgencyScore: number; // Calculated urgency score (1 to 100)
  estimatedHoursToClose: number; // Calculated estimated hours based on gap level and competency category
  learningPriority: 'P1 - Immediate' | 'P2 - Core Next' | 'P3 - Specialization' | 'P4 - Polish';
}

export interface SkillGapAnalysisResult {
  roleId: string;
  roleTitle: string;
  overallReadinessScore: number; // Calculated weighted score (0 - 100%)
  criticalSkillsCoverage: number; // Calculated coverage percentage of P1 skills
  totalSkillsEvaluated: number;
  skillsMasteredCount: number;
  skillsPartialCount: number;
  skillsMissingCount: number;
  estimatedTotalWeeks: number;
  gaps: SkillGapItem[];
  prioritizedGaps: SkillGapItem[];
  aiExecutiveSummary?: string;
  calculationMethodology?: string;
  generatedAt: string;
}

export interface ResourceAddressedSkill {
  skillId: string;
  skillName: string;
  currentLevel: ProficiencyLevel;
  requiredLevel: ProficiencyLevel;
  gapLevel: number;
  priority: 'P1 - Immediate' | 'P2 - Core Next' | 'P3 - Specialization' | 'P4 - Polish';
  importance: 'critical' | 'important' | 'nice_to_have';
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string; // e.g., 'Harvard University / edX', 'DeepLearning.AI', 'PyTorch Foundation', 'Microsoft Docs'
  url: string;
  type: 'course' | 'interactive_lab' | 'official_guide' | 'video_series' | 'textbook' | 'sandbox';
  isFree: boolean;
  costDescription?: string;
  estimatedHours: number;
  targetSkillIds: string[];
  targetProficiencyGain: ProficiencyLevel;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number; // e.g. 4.8
  prerequisites: string[];
  keyHighlights: string[];
  sourceReference?: {
    verifiedSource: string;
    curriculumAccreditation: string;
    citationNote: string;
  };
  // Dynamic Recommendation Engine Fields
  addressedSkills?: ResourceAddressedSkill[];
  recommendationRationale?: string;
  estimatedWeeksAtUserPace?: number;
  matchScore?: number;
  formatMatch?: boolean;
  priorityTag?: 'P1 - Immediate' | 'P2 - Core Next' | 'P3 - Specialization' | 'P4 - Polish';
}

export interface ProjectSkillGain {
  skillId: string;
  skillName: string;
  currentLevel: ProficiencyLevel;
  targetLevel: ProficiencyLevel;
  gapLevel: number;
  priority?: string;
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Capstone';
  estimatedHours: number;
  targetRoleIds: string[];
  skillsTaught: string[];
  architectureOverview: string;
  deliverables: string[];
  realWorldImpact: string;
  borderlessCollaborationTip: string;
  githubStarterIdeas: string[];
  // Dynamic Recommendation Engine Fields
  skillsDevelopedDetails?: ProjectSkillGain[];
  matchRationale?: string;
  suggestedTechStack?: string[];
  estimatedWeeksAtUserPace?: number;
  matchScore?: number;
  priorityTag?: 'P1 - Immediate' | 'P2 - Core Next' | 'P3 - Specialization' | 'P4 - Polish';
}

export interface RoadmapMilestone {
  id: string;
  phaseNumber: number;
  phaseName: string;
  title: string;
  durationWeeks: number;
  objective: string;
  targetSkills: {
    skillId: string;
    skillName: string;
    fromLevel: ProficiencyLevel;
    toLevel: ProficiencyLevel;
  }[];
  recommendedCourseIds: string[];
  recommendedProjectIds: string[];
  checkpointAssessment: string;
  isCompleted: boolean;
  progressPercent: number;
}

export interface LearningRoadmap {
  id: string;
  userId: string;
  roleId: string;
  roleTitle: string;
  title: string;
  totalWeeks: number;
  weeklyCommitmentHours: number;
  milestones: RoadmapMilestone[];
  createdAt: string;
  updatedAt: string;
}

export interface ProgressMilestoneLog {
  id: string;
  milestoneId: string;
  skillId?: string;
  type: 'skill_level_up' | 'course_completed' | 'project_shipped' | 'quiz_passed' | 'study_session';
  title: string;
  notes?: string;
  loggedHours: number;
  timestamp: string;
}

export interface AiStrategicInsights {
  summary: string;
  keyStrategicAdvice: string[];
  priorityFocusAreas?: string[];
  weeklyPaceGuidance?: string;
  borderlessInnovationStrategy?: string;
  projectFocusRecommendation?: string;
  isAiGenerated?: boolean;
  source: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

export type ActiveTab =
  | 'dashboard'
  | 'profile'
  | 'career_goal'
  | 'current_skills'
  | 'role_requirements'
  | 'gap_analysis'
  | 'skill_prioritization'
  | 'roadmap'
  | 'courses'
  | 'projects'
  | 'progress_tracker';
