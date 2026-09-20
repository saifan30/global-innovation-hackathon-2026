import React, { useState } from "react";
import { useApp } from "../../context/AppContext.tsx";
import {
  CheckCircle2,
  Plus,
  Clock,
  Award,
  BookOpen,
  FolderGit2,
  Calendar,
  Sparkles,
  TrendingUp,
  Activity
} from "lucide-react";
import { ProgressMilestoneLog } from "../../types/index.ts";

export const ProgressTrackerView: React.FC = () => {
  const { progressLogs, addProgressRecord, roadmap, profile, selectedRole } = useApp();

  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [logType, setLogType] = useState<ProgressMilestoneLog["type"]>("study_session");
  const [logTitle, setLogTitle] = useState<string>("");
  const [logHours, setLogHours] = useState<number>(2);
  const [logNotes, setLogNotes] = useState<string>("");

  const totalHoursLogged = progressLogs.reduce((acc, l) => acc + (l.loggedHours || 0), 0);
  const completedMilestones = roadmap?.milestones.filter((m) => m.isCompleted).length || 0;

  const handleSubmitLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logTitle) return;

    await addProgressRecord({
      milestoneId: roadmap?.milestones[0]?.id || "general",
      type: logType,
      title: logTitle,
      notes: logNotes,
      loggedHours: logHours,
    });

    setLogTitle("");
    setLogNotes("");
    setLogHours(2);
    setShowLogModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                Step 10 of 10
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Progress Tracking & Verifiable Velocity Log
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Keep an accountable log of study hours, passed checkpoints, and codebase achievements for <strong>{selectedRole?.title}</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Learning Milestone</span>
        </button>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Hours Logged
          </span>
          <p className="text-2xl font-extrabold text-indigo-700">
            {totalHoursLogged} Hours
          </p>
          <p className="text-[11px] text-slate-500">
            Target commitment: {profile?.weeklyLearningHours || 12} hrs/week
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Completed Phases
          </span>
          <p className="text-2xl font-extrabold text-slate-900">
            {completedMilestones} of {roadmap?.milestones.length || 3}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium">
            Active in Phase 1: Core Foundations
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Logged Checkpoints
          </span>
          <p className="text-2xl font-extrabold text-slate-900">
            {progressLogs.length} Entries
          </p>
          <p className="text-[11px] text-slate-500">
            Verified study and project logs
          </p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Activity History & Milestone Journal
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Chronological
          </span>
        </div>

        <div className="space-y-3">
          {progressLogs.map((log) => {
            const icons = {
              skill_level_up: <TrendingUp className="w-4 h-4 text-indigo-600" />,
              course_completed: <BookOpen className="w-4 h-4 text-teal-600" />,
              project_shipped: <FolderGit2 className="w-4 h-4 text-purple-600" />,
              quiz_passed: <Award className="w-4 h-4 text-emerald-600" />,
              study_session: <Clock className="w-4 h-4 text-blue-600" />,
            };

            return (
              <div
                key={log.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {icons[log.type] || <Activity className="w-4 h-4 text-slate-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {log.title}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {log.type.replace("_", " ")}
                      </span>
                    </div>
                    {log.notes && (
                      <p className="text-slate-600 mt-1">{log.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 pl-11 sm:pl-0 text-slate-400">
                  <span className="font-bold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">
                    +{log.loggedHours} hrs
                  </span>
                  <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}

          {progressLogs.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-xs space-y-2">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No progress recorded yet.</p>
              <p className="text-slate-500">Record your first study session or project milestone to track your learning velocity.</p>
              <button
                onClick={() => setShowLogModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs shadow-sm inline-flex items-center gap-1.5 cursor-pointer mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Log First Study Milestone</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Record Learning Activity
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2 py-1"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmitLog} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Activity Type
                </label>
                <select
                  value={logType}
                  onChange={(e) => setLogType(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="study_session">Dedicated Study / Lab Session</option>
                  <option value="course_completed">Course / Module Completed</option>
                  <option value="project_shipped">Project Code Shipped / Committed</option>
                  <option value="quiz_passed">Assessment Passed</option>
                  <option value="skill_level_up">Skill Level-Up Milestone</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Title / Milestone Description
                </label>
                <input
                  type="text"
                  value={logTitle}
                  onChange={(e) => setLogTitle(e.target.value)}
                  placeholder="e.g. Built vector search embedding pipeline in Python"
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-medium focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hours Spent ({logHours} hrs)
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={logHours}
                  onChange={(e) => setLogHours(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Notes & Key Learnings
                </label>
                <textarea
                  rows={2}
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="e.g. Learned reciprocal rank fusion and vector indexing strategies."
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-sm"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
