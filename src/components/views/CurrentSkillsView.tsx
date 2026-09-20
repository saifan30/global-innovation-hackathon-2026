import React, { useState } from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  Layers,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Search,
  HelpCircle
} from "lucide-react";
import { ProficiencyLevel } from "../../types/index.ts";

const PROFICIENCY_LABELS: Record<ProficiencyLevel, { label: string; desc: string; color: string }> = {
  1: { label: "Level 1: Beginner / Exposure", desc: "Basic syntax awareness, can follow tutorials with guidance.", color: "bg-slate-100 text-slate-700" },
  2: { label: "Level 2: Elementary", desc: "Can write simple modules, understands core patterns.", color: "bg-blue-100 text-blue-800" },
  3: { label: "Level 3: Intermediate / Working", desc: "Independently designs features, debugs edge cases in production.", color: "bg-indigo-100 text-indigo-800" },
  4: { label: "Level 4: Advanced / Professional", desc: "Architects robust systems, optimizes performance, mentors others.", color: "bg-purple-100 text-purple-800" },
  5: { label: "Level 5: Expert / Master", desc: "Author of core libraries, defines company-wide standards, deep internals.", color: "bg-emerald-100 text-emerald-800" }
};

export const CurrentSkillsView: React.FC = () => {
  const {
    profile,
    skills,
    updateSkillLevel,
    addNewSkillAssessment,
    removeSkillAssessment,
    setActiveTab,
    selectedRole
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [skillSearch, setSkillSearch] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const userSkillIds = new Set(profile?.currentSkills.map((s) => s.skillId) || []);

  const unassessedSkills = skills.filter((s) => !userSkillIds.has(s.id));

  const filteredUserSkills = (profile?.currentSkills || []).filter((s) => {
    const meta = skills.find((m) => m.id === s.skillId);
    const matchesCat = selectedCategory === "all" || meta?.category === selectedCategory;
    const matchesSearch = s.skillName.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                Step 3 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Current Skills & Proficiency Inventory
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Accurately self-assess your baseline. Slide proficiency from Level 1 (Beginner) to Level 5 (Master).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>

          <button
            onClick={() => setActiveTab("role_requirements")}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <span>Next: Benchmark</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Skills" },
            { id: "core_technical", label: "Core Technical" },
            { id: "frameworks_tools", label: "Frameworks & Tools" },
            { id: "architecture_cloud", label: "Cloud & Systems" },
            { id: "domain_expertise", label: "Domain Expertise" },
            { id: "soft_skills", label: "Global Collaboration" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            placeholder="Filter your skills..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>
      </div>

      {/* Skills Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUserSkills.map((userSkill) => {
          const meta = skills.find((s) => s.id === userSkill.skillId);
          const currentLevel = userSkill.currentLevel;
          const levelInfo = PROFICIENCY_LABELS[currentLevel] || PROFICIENCY_LABELS[1];

          return (
            <div
              key={userSkill.skillId}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {meta?.category?.replace("_", " ") || "Technical"}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">
                    {userSkill.skillName}
                  </h4>
                </div>

                <button
                  onClick={() => removeSkillAssessment(userSkill.skillId)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                  title="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {meta?.description && (
                <p className="text-xs text-slate-500 leading-relaxed">
                  {meta.description}
                </p>
              )}

              {/* Slider & Level Visualizer */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Proficiency Level:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${levelInfo.color}`}>
                    {levelInfo.label}
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={currentLevel}
                  onChange={(e) =>
                    updateSkillLevel(userSkill.skillId, parseInt(e.target.value) as ProficiencyLevel)
                  }
                  className="w-full accent-indigo-600 cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-slate-400 px-1 font-semibold">
                  <span>L1: Beginner</span>
                  <span>L2: Elem</span>
                  <span>L3: Interm</span>
                  <span>L4: Adv</span>
                  <span>L5: Master</span>
                </div>

                <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {levelInfo.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUserSkills.length === 0 && (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">
            {profile?.currentSkills.length === 0 ? "No skills added yet." : "No skills match this filter."}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {profile?.currentSkills.length === 0
              ? `Add your current competencies to establish your baseline against the ${selectedRole?.title || "target role"} benchmark standard.`
              : "Try adjusting your category filter or search query to find specific competencies."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Browse Skill Catalog</span>
            </button>
            {profile?.currentSkills.length === 0 && selectedRole && (
              <button
                onClick={() => {
                  selectedRole.requiredSkills.forEach((req) => {
                    addNewSkillAssessment(req.skillId, 1);
                  });
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Add {selectedRole.title} Required Skills (L1 Baseline)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quick Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Add Competencies to Inventory
                </h3>
                <p className="text-xs text-slate-500">
                  Select available skills from the Global 2026 taxonomy.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2 py-1"
              >
                Close
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {unassessedSkills.map((s) => (
                <div
                  key={s.id}
                  className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{s.name}</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{s.description}</span>
                  </div>
                  <button
                    onClick={() => {
                      addNewSkillAssessment(s.id, 1);
                      setShowAddModal(false);
                    }}
                    className="px-3 py-1 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-semibold rounded-lg border border-indigo-200 transition-colors shrink-0 cursor-pointer"
                  >
                    + Add (L1)
                  </button>
                </div>
              ))}

              {unassessedSkills.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-6">
                  You have assessed all available skills in the catalog!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
