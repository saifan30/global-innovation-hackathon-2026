import React from "react";
import { Globe, Shield, Sparkles, Code2, Compass } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-sm">
                Course & Skill Recommendation Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              A high-precision career acceleration platform engineered specifically for the{" "}
              <strong>Global Innovation Hackathon 2026 – Build for a Better Future</strong> under the theme{" "}
              <strong>“Innovate Without Borders.”</strong> Helping global talent map skills, close gaps, and build impactful capstones.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50/70 border border-indigo-100 rounded-lg p-2 max-w-md">
              <Globe className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Dedicated to universal access to high-demand technical upskilling worldwide.</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Core Architecture
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                Live Skill-Gap Diagnostic
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                P1-P4 Urgency Matrix
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                Dynamic Roadmap Generation
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                Verified Open-Access Courses
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Hackathon Track
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="font-medium text-slate-800">
                Global Innovation Hackathon 2026
              </p>
              <p className="text-slate-500 text-[11px]">
                Theme: <em>Innovate Without Borders</em>
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                  <Shield className="w-3 h-3 text-emerald-600" /> Production-Ready Architecture
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 Course & Skill Recommendation Engine. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Clean Architecture</span>
            <span>•</span>
            <span>Real Industry Taxonomy</span>
            <span>•</span>
            <span>Server-Side Gemini Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
