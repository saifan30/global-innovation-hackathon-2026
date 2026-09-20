import { UserProfile, UserSkillAssessment } from "../../src/types/index.ts";

/**
 * Test Personas & Synthetic Evaluation Fixtures
 * For development & test validation of recommendation divergence.
 * These are test infrastructure fixtures and are NOT shown as active production user data.
 */
export const TEST_PERSONAS: Record<string, Partial<UserProfile>> = {
  profile_alex_ai: {
    fullName: "Alex Rivera",
    email: "alex.rivera@globalinnovate.org",
    headline: "Junior Python Developer aiming for AI & GenAI Systems Engineering",
    targetRoleId: "ai_engineer",
    currentExperienceLevel: "entry_level",
    weeklyLearningHours: 12,
    preferredLearningPace: "balanced",
    preferredLearningFormats: ["interactive", "project_based"],
    primaryLanguage: "English",
    borderlessAspirations: "Building multilingual healthcare AI agents for underserved communities worldwide",
    currentSkills: [
      { skillId: "python", skillName: "Python 3 & Data Structures", currentLevel: 3, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 70, yearsOfExperience: 1.5 },
      { skillId: "sql", skillName: "Relational Database Design & SQL", currentLevel: 2, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 50, yearsOfExperience: 1 },
      { skillId: "machine_learning", skillName: "Applied Machine Learning & Scikit-Learn", currentLevel: 2, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 45, yearsOfExperience: 0.5 },
      { skillId: "typescript", skillName: "TypeScript & Modern JavaScript", currentLevel: 2, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 60, yearsOfExperience: 1 },
      { skillId: "backend_api_design", skillName: "REST, GraphQL & gRPC API Design", currentLevel: 1, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 40, yearsOfExperience: 0.5 },
      { skillId: "borderless_collaboration", skillName: "Borderless Global Collaboration & Open Source", currentLevel: 3, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 75, yearsOfExperience: 2 }
    ]
  },
  profile_elena_cloud: {
    fullName: "Elena Rostova",
    email: "elena.rostova@globalcloud.dev",
    headline: "Senior Frontend Engineer transitioning to Full-Stack Cloud Architecture",
    targetRoleId: "fullstack_cloud_architect",
    currentExperienceLevel: "mid_level",
    weeklyLearningHours: 8,
    preferredLearningPace: "self_paced",
    preferredLearningFormats: ["documentation", "project_based"],
    primaryLanguage: "English",
    borderlessAspirations: "Designing multi-region cloud infrastructures for borderless social good initiatives",
    currentSkills: [
      { skillId: "typescript", skillName: "TypeScript & Modern JavaScript", currentLevel: 4, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 90, yearsOfExperience: 4 },
      { skillId: "react_nextjs", skillName: "React & Next.js Ecosystem", currentLevel: 4, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 90, yearsOfExperience: 3 },
      { skillId: "backend_api_design", skillName: "REST, GraphQL & gRPC API Design", currentLevel: 3, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 70, yearsOfExperience: 2 },
      { skillId: "sql", skillName: "Relational Database Design & SQL", currentLevel: 3, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 75, yearsOfExperience: 2 },
      { skillId: "docker_kubernetes", skillName: "Containerization (Docker & Kubernetes)", currentLevel: 1, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 25, yearsOfExperience: 0.2 },
      { skillId: "cloud_platforms", skillName: "Cloud Infrastructure (GCP / AWS / Azure)", currentLevel: 2, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 45, yearsOfExperience: 1 },
      { skillId: "borderless_collaboration", skillName: "Borderless Global Collaboration & Open Source", currentLevel: 4, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 85, yearsOfExperience: 3 }
    ]
  },
  profile_marcus_security: {
    fullName: "Marcus Thorne",
    email: "marcus.thorne@cyberborderless.io",
    headline: "Systems Administrator transitioning to Application Security & Zero-Trust Defense",
    targetRoleId: "cyber_defense_specialist",
    currentExperienceLevel: "senior_transitioning",
    weeklyLearningHours: 20,
    preferredLearningPace: "intensive",
    preferredLearningFormats: ["interactive", "video"],
    primaryLanguage: "English",
    borderlessAspirations: "Securing humanitarian data flows and defending open cross-border communications",
    currentSkills: [
      { skillId: "python", skillName: "Python 3 & Data Structures", currentLevel: 3, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 75, yearsOfExperience: 3 },
      { skillId: "cloud_platforms", skillName: "Cloud Infrastructure (GCP / AWS / Azure)", currentLevel: 3, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 70, yearsOfExperience: 2 },
      { skillId: "docker_kubernetes", skillName: "Containerization (Docker & Kubernetes)", currentLevel: 3, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 65, yearsOfExperience: 2 },
      { skillId: "app_security_owasp", skillName: "Application Security & OWASP Top 10", currentLevel: 1, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 20, yearsOfExperience: 0 },
      { skillId: "cloud_security_zero_trust", skillName: "Cloud Security & Zero-Trust Architecture", currentLevel: 1, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 20, yearsOfExperience: 0 },
      { skillId: "borderless_collaboration", skillName: "Borderless Global Collaboration & Open Source", currentLevel: 3, lastUpdated: new Date().toISOString(), selfAssessedConfidence: 70, yearsOfExperience: 2 }
    ]
  }
};
