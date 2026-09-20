import React, { useState } from "react";
import { useApp } from "../../context/AppContext.tsx";
import { UserCheck, Save, Globe, Clock, BookOpen, Sparkles, ArrowRight, CheckCircle2, User } from "lucide-react";
import { UserProfile } from "../../types/index.ts";

export const UserProfileView: React.FC = () => {
  const { profile, updateProfile, setActiveTab } = useApp();

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    fullName: profile?.fullName || "",
    email: profile?.email || "",
    headline: profile?.headline || "",
    currentExperienceLevel: profile?.currentExperienceLevel || "entry_level",
    weeklyLearningHours: profile?.weeklyLearningHours || 10,
    preferredLearningPace: profile?.preferredLearningPace || "balanced",
    preferredLearningFormats: profile?.preferredLearningFormats || ["project_based", "interactive"],
    primaryLanguage: profile?.primaryLanguage || "English",
    borderlessAspirations: profile?.borderlessAspirations || "",
  });

  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Keep local form in sync when profile updates
  React.useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        headline: profile.headline || "",
        currentExperienceLevel: profile.currentExperienceLevel || "entry_level",
        weeklyLearningHours: profile.weeklyLearningHours || 10,
        preferredLearningPace: profile.preferredLearningPace || "balanced",
        preferredLearningFormats: profile.preferredLearningFormats || ["project_based", "interactive"],
        primaryLanguage: profile.primaryLanguage || "English",
        borderlessAspirations: profile.borderlessAspirations || "",
      });
    }
  }, [profile]);

  const handleFormatToggle = (format: 'video' | 'interactive' | 'documentation' | 'project_based' | 'academic_paper') => {
    const current = formData.preferredLearningFormats || [];
    const exists = current.includes(format);
    const updated = exists ? current.filter(f => f !== format) : [...current, format];
    setFormData({ ...formData, preferredLearningFormats: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile(formData);
    setIsSaving(false);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 3000);
  };

  const isProfileConfigured = Boolean(profile?.fullName && profile?.email);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                  Step 1 of 10
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  User Profile & Learning Parameters
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure your personal learning profile, weekly study bandwidth, and global innovation aspirations.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("career_goal")}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Next: Career Goal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Empty State / Quick Configuration Callout if not fully configured */}
      {!isProfileConfigured && (
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-3">
          <User className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-indigo-950">
              No profile configured yet.
            </p>
            <p className="text-indigo-800/80 mt-0.5">
              Fill in your details below to begin your personalized skill diagnostic and curriculum calibration for the Global Innovation Hackathon 2026.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName || ""}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
              placeholder="e.g. Maya Chen"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Contact Email *
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
              placeholder="maya.chen@innovate.org"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Professional Headline / Background
          </label>
          <input
            type="text"
            value={formData.headline || ""}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
            placeholder="e.g. Junior Software Engineer aspiring to specialize in AI & Distributed Systems"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Current Experience Tier
            </label>
            <select
              value={formData.currentExperienceLevel}
              onChange={(e) => setFormData({ ...formData, currentExperienceLevel: e.target.value as any })}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
            >
              <option value="student">Student / Recent Graduate</option>
              <option value="entry_level">Entry-Level Engineer (0-2 Yrs)</option>
              <option value="mid_level">Mid-Level Professional (2-5 Yrs)</option>
              <option value="senior_transitioning">Senior Transitioning into AI/Cloud</option>
              <option value="self_taught">Self-Taught / Career Changer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Weekly Learning Commitment ({formData.weeklyLearningHours || 10} hrs/week)
            </label>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                min="4"
                max="40"
                step="2"
                value={formData.weeklyLearningHours || 10}
                onChange={(e) => setFormData({ ...formData, weeklyLearningHours: parseInt(e.target.value) })}
                className="w-full accent-indigo-600"
              />
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100 shrink-0">
                {formData.weeklyLearningHours || 10} hrs
              </span>
            </div>
          </div>
        </div>

        {/* Preferred Formats */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Preferred Learning Modalities
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "project_based", label: "Project-Based Builds" },
              { id: "interactive", label: "Interactive Code Labs" },
              { id: "video", label: "Structured Video Series" },
              { id: "documentation", label: "Official Docs & Handbooks" },
              { id: "academic_paper", label: "Research Papers & Whitepapers" },
            ].map((f) => {
              const selected = formData.preferredLearningFormats?.includes(f.id as any);
              return (
                <button
                  type="button"
                  key={f.id}
                  onClick={() => handleFormatToggle(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                    selected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme Alignment: Innovate Without Borders */}
        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Borderless Career Vision (Hackathon 2026 Focus)
            </label>
          </div>
          <textarea
            rows={2}
            value={formData.borderlessAspirations || ""}
            onChange={(e) => setFormData({ ...formData, borderlessAspirations: e.target.value })}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
            placeholder="e.g. Building open-source AI tools and collaborating with global cross-border engineering teams."
          />
          <p className="text-[11px] text-slate-500">
            This vision tailors the project scope and capstone architectures recommended across your personalized roadmap.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            {isSavedSuccess && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Profile & Update Trajectory"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
