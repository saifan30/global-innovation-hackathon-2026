import { globalDataStore } from "../db/store.ts";
import { getGeminiClient } from "../gemini.ts";
import { AiStrategicInsights } from "../../src/types/index.ts";

interface CachedInsight {
  data: AiStrategicInsights;
  cachedAt: number;
}

// In-memory cache with 60s TTL
const insightsCache = new Map<string, CachedInsight>();
const CACHE_TTL_MS = 60 * 1000;

export function invalidateAiCache(): void {
  insightsCache.clear();
}

function getCacheKey(roleId: string, profile: any): string {
  const skillsHash = (profile.currentSkills || [])
    .map((s: any) => `${s.skillId}:${s.currentLevel}`)
    .sort()
    .join("|");
  return `${roleId}_${profile.weeklyLearningHours}_${profile.currentExperienceLevel}_${skillsHash}`;
}

export function generateDeterministicInsights(roleId?: string): AiStrategicInsights {
  const analysis = globalDataStore.computeSkillGapAnalysis(roleId);
  const profile = globalDataStore.getUserProfile();
  const role = globalDataStore.getRoleById(analysis.roleId);

  const roleTitle = role?.title || "Target Role";
  const criticalGaps = analysis.gaps.filter((g) => g.importance === "critical" && g.gapLevel > 0);
  const nonCriticalGaps = analysis.gaps.filter((g) => g.importance !== "critical" && g.gapLevel > 0);
  const topGaps = criticalGaps.length > 0 ? criticalGaps : nonCriticalGaps;
  const topSkillNames = topGaps.slice(0, 3).map((g) => g.skillName);

  const weeklyHours = profile.weeklyLearningHours || 10;
  const estimatedWeeks = analysis.estimatedTotalWeeks;

  const summary = `Deterministic Competency Benchmark for ${roleTitle}: Your current readiness index is calculated at ${analysis.overallReadinessScore}%, with ${analysis.criticalSkillsCoverage}% coverage across essential core competencies. To achieve full professional benchmark proficiency over the estimated ${estimatedWeeks} weeks (${weeklyHours} hours/week), target your ${analysis.skillsMissingCount} missing competencies and ${analysis.skillsPartialCount} partial gaps in prioritized phases.`;

  const keyStrategicAdvice: string[] = [
    topSkillNames.length > 0
      ? `Prioritize closing Level-1 gaps in ${topSkillNames.join(", ")} before progressing to advanced distributed orchestration.`
      : `Continue reinforcing foundational competencies through hands-on benchmark implementations.`,
    `Dedicate at least 50% of your ${weeklyHours} weekly hours to practical repository deliverables and test-driven development.`,
    `Structure your capstone project with public Git pull requests, automated CI/CD testing, and Dockerized deployments to provide verifiable borderless proof of skill.`
  ];

  const priorityFocusAreas = topSkillNames.length > 0
    ? topSkillNames
    : ["Core Language Foundations", "System Architecture", "Open Source Collaboration"];

  const weeklyPaceGuidance = `At ${weeklyHours} hours per week, allocate ${Math.round(weeklyHours * 0.4)} hours for conceptual deep-dives and ${Math.round(weeklyHours * 0.6)} hours for hands-on repository builds.`;

  const borderlessInnovationStrategy = `Publish all milestones as open-source repositories with clean English documentation, architectural decision records (ADRs), and containerized demo environments for cross-border team visibility.`;

  const projectFocusRecommendation = `Execute the recommended capstone project milestone step-by-step, integrating automated testing and cloud deployment to demonstrate end-to-end technical execution.`;

  return {
    summary,
    keyStrategicAdvice,
    priorityFocusAreas,
    weeklyPaceGuidance,
    borderlessInnovationStrategy,
    projectFocusRecommendation,
    isAiGenerated: false,
    source: "Deterministic Competency Diagnostic Engine (Rule-Based Engine)",
    timestamp: new Date().toISOString(),
  };
}

export async function generateStrategicInsights(roleId?: string): Promise<AiStrategicInsights> {
  const profile = globalDataStore.getUserProfile();
  const effectiveRoleId = roleId || profile.targetRoleId || "ai_engineer";
  const role = globalDataStore.getRoleById(effectiveRoleId);
  const analysis = globalDataStore.computeSkillGapAnalysis(effectiveRoleId);

  // Check cache
  const cacheKey = getCacheKey(effectiveRoleId, profile);
  const cached = insightsCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  const ai = getGeminiClient();
  if (!ai || !process.env.GEMINI_API_KEY) {
    const fallback = generateDeterministicInsights(effectiveRoleId);
    insightsCache.set(cacheKey, { data: fallback, cachedAt: Date.now() });
    return fallback;
  }

  const criticalGapsList = analysis.gaps
    .filter((g) => g.importance === "critical" && g.gapLevel > 0)
    .map((g) => `${g.skillName} (Current: L${g.currentLevel} -> Benchmark: L${g.requiredLevel}, Gap: -${g.gapLevel}, Priority: ${g.learningPriority})`)
    .join("; ");

  const otherGapsList = analysis.gaps
    .filter((g) => g.importance !== "critical" && g.gapLevel > 0)
    .map((g) => `${g.skillName} (Current: L${g.currentLevel} -> Benchmark: L${g.requiredLevel}, Gap: -${g.gapLevel}, Priority: ${g.learningPriority})`)
    .join("; ");

  const masteredList = analysis.gaps
    .filter((g) => g.gapLevel === 0)
    .map((g) => `${g.skillName} (Level ${g.currentLevel})`)
    .join(", ");

  const prompt = `You are the lead AI Career Strategist for the Global Innovation Hackathon 2026 under the theme "Innovate Without Borders".
Analyze this user's verified profile, competency inventory, and benchmark gap analysis:

- Target Role: ${role?.title} (${role?.domainLabel})
- Role Description: ${role?.summary}
- User Headline & Background: ${profile.headline || "Aspiring Engineer"} (Experience: ${profile.currentExperienceLevel.replace("_", " ")})
- Weekly Learning Commitment: ${profile.weeklyLearningHours} hours/week (Pace: ${profile.preferredLearningPace})
- Preferred Formats: ${profile.preferredLearningFormats.join(", ")}
- Borderless Aspirations: ${profile.borderlessAspirations || "Contribute to global engineering teams and open source"}
- Overall Readiness Score: ${analysis.overallReadinessScore}%
- Critical Skills Coverage: ${analysis.criticalSkillsCoverage}%
- Total Evaluated Role Skills: ${analysis.totalSkillsEvaluated}
- Skills Mastered: ${masteredList || "None recorded yet"}
- Critical Gaps (P1): ${criticalGapsList || "None"}
- Secondary Gaps: ${otherGapsList || "None"}
- Estimated Timeline: ${analysis.estimatedTotalWeeks} weeks at current pace

INSTRUCTIONS:
1. Provide realistic, actionable strategic advice strictly based on the real profile and gap metrics above.
2. DO NOT invent fake statistics, fake certifications, fake companies, or non-existent URLs.
3. Return a valid JSON object matching this structure:
{
  "executiveSummary": "A direct, 2-3 sentence strategic diagnostic assessing their readiness score (${analysis.overallReadinessScore}%) and specific gap vectors.",
  "keyStrategicAdvice": [
    "Directive 1: Specific advice for closing their highest priority gap",
    "Directive 2: Hands-on study allocation and repository building advice tailored to their ${profile.weeklyLearningHours} weekly hours",
    "Directive 3: Strategy for borderless collaboration, code review, and verifiable portfolio shipping"
  ],
  "priorityFocusAreas": ["Top Skill 1", "Top Skill 2", "Top Skill 3"],
  "weeklyPaceGuidance": "Pacing recommendation for ${profile.weeklyLearningHours} hours/week",
  "borderlessInnovationStrategy": "Recommendation for open-source impact and international engineering readiness",
  "projectFocusRecommendation": "Guidance on shipping a production-grade portfolio project"
}`;

  try {
    // 8-second timeout for AI generation
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Gemini API call timed out after 8000ms")), 8000);
    });

    const aiCall = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite technical career advisor for the Global Innovation Hackathon 2026. Deliver concise, high-value, factual guidance in structured JSON.",
        responseMimeType: "application/json",
      },
    });

    const response = await Promise.race([aiCall, timeoutPromise]);
    const responseText = response.text || "";
    
    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // If parsing fails, extract fields cleanly
      parsed = {
        executiveSummary: responseText,
        keyStrategicAdvice: [
          `Prioritize closing critical gaps in ${analysis.gaps.filter(g => g.importance === 'critical' && g.gapLevel > 0).map(g => g.skillName).slice(0, 2).join(" and ") || "core fundamentals"}.`,
          `Dedicate ${profile.weeklyLearningHours} hours/week to hands-on repository milestones.`,
          `Demonstrate cross-border engineering capability with audited open source contributions.`
        ]
      };
    }

    const result: AiStrategicInsights = {
      summary: parsed.executiveSummary || parsed.summary || responseText,
      keyStrategicAdvice: Array.isArray(parsed.keyStrategicAdvice) ? parsed.keyStrategicAdvice : [
        "Focus on Phase 1 foundational requirements before progressing to complex architectures.",
        `Allocate your ${profile.weeklyLearningHours} weekly hours between conceptual study and code shipping.`,
        "Build a verifiable public portfolio for borderless engineering collaboration."
      ],
      priorityFocusAreas: Array.isArray(parsed.priorityFocusAreas) ? parsed.priorityFocusAreas : analysis.prioritizedGaps.slice(0, 3).map(g => g.skillName),
      weeklyPaceGuidance: parsed.weeklyPaceGuidance || `Study pace calibrated for ${profile.weeklyLearningHours} hours/week.`,
      borderlessInnovationStrategy: parsed.borderlessInnovationStrategy || "Publish tested open source repositories to prove global readiness.",
      projectFocusRecommendation: parsed.projectFocusRecommendation || "Build end-to-end projects featuring CI/CD and containerization.",
      isAiGenerated: true,
      source: "gemini-3.8-flash (Real-Time AI Diagnostic)",
      timestamp: new Date().toISOString(),
    };

    insightsCache.set(cacheKey, { data: result, cachedAt: Date.now() });
    return result;
  } catch (err: any) {
    console.warn("Gemini AI generation failed or timed out, activating deterministic fallback:", err.message);
    const fallback = generateDeterministicInsights(effectiveRoleId);
    insightsCache.set(cacheKey, { data: fallback, cachedAt: Date.now() });
    return fallback;
  }
}
