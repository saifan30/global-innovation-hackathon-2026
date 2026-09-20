import React from "react";
import { useApp } from "../../context/AppContext.tsx";
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from "lucide-react";

export const NotificationToaster: React.FC = () => {
  const { notifications, dismissNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
          info: <Info className="w-4 h-4 text-blue-600 shrink-0" />,
        };

        const borders = {
          success: "border-emerald-200 bg-emerald-50/95 text-emerald-900",
          error: "border-rose-200 bg-rose-50/95 text-rose-900",
          warning: "border-amber-200 bg-amber-50/95 text-amber-900",
          info: "border-blue-200 bg-blue-50/95 text-blue-900",
        };

        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start justify-between gap-2 p-3 rounded-xl border shadow-lg text-xs font-medium backdrop-blur transition-all ${borders[n.type]}`}
          >
            <div className="flex items-center gap-2">
              {icons[n.type]}
              <span>{n.message}</span>
            </div>
            <button
              onClick={() => dismissNotification(n.id)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
