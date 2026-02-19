import { useState } from "react";

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const isCompleted = task.status === "completed";

    const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div
            className={`group relative bg-slate-800/60 backdrop-blur-sm border rounded-xl p-5 
        transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-0.5
        ${isCompleted ? "border-emerald-500/30" : "border-slate-700/50"}`}
        >
            {/* Status indicator line */}
            <div
                className={`absolute top-0 left-0 w-1 h-full rounded-l-xl transition-colors
          ${isCompleted ? "bg-emerald-500" : "bg-amber-500"}`}
            />

            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 pl-3">
                    {/* Title + Badge */}
                    <div className="flex items-center gap-3 mb-1.5">
                        <h3
                            className={`text-lg font-semibold truncate transition-all
                ${isCompleted ? "text-slate-400 line-through" : "text-slate-100"}`}
                        >
                            {task.title}
                        </h3>
                        <span
                            className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${isCompleted
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                    : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                }`}
                        >
                            {isCompleted ? "✓ Completed" : "● Pending"}
                        </span>
                    </div>

                    {/* Description */}
                    {task.description && (
                        <p
                            className={`text-sm mb-2 leading-relaxed
                ${isCompleted ? "text-slate-500" : "text-slate-400"}`}
                        >
                            {task.description}
                        </p>
                    )}

                    {/* Date */}
                    <p className="text-xs text-slate-500">{formattedDate}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onToggle(task._id)}
                        title={isCompleted ? "Mark as Pending" : "Mark as Completed"}
                        className={`p-2 rounded-lg transition-all duration-200 cursor-pointer
              ${isCompleted
                                ? "hover:bg-amber-500/15 text-amber-400"
                                : "hover:bg-emerald-500/15 text-emerald-400"
                            }`}
                    >
                        {isCompleted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={() => onEdit(task)}
                        title="Edit Task"
                        className="p-2 rounded-lg hover:bg-sky-500/15 text-sky-400 transition-all duration-200 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>

                    {!showConfirm ? (
                        <button
                            onClick={() => setShowConfirm(true)}
                            title="Delete Task"
                            className="p-2 rounded-lg hover:bg-rose-500/15 text-rose-400 transition-all duration-200 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    ) : (
                        <div className="flex gap-1">
                            <button
                                onClick={() => {
                                    onDelete(task._id);
                                    setShowConfirm(false);
                                }}
                                className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-lg transition-all cursor-pointer"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-2.5 py-1.5 bg-slate-600 hover:bg-slate-500 text-slate-200 text-xs font-medium rounded-lg transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
