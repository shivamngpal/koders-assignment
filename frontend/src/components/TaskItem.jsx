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
            className="group border border-zinc-800 rounded-lg p-5 
        transition-colors duration-200 hover:border-zinc-700"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    {/* Title + Badge */}
                    <div className="flex items-center gap-3 mb-1.5">
                        <h3
                            className={`text-base font-semibold truncate
                ${isCompleted ? "text-zinc-500 line-through" : "text-white"}`}
                        >
                            {task.title}
                        </h3>
                        <span
                            className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border
                ${isCompleted
                                    ? "text-green-400 border-green-400/30 bg-green-400/10"
                                    : "text-zinc-400 border-zinc-700 bg-transparent"
                                }`}
                        >
                            {isCompleted ? "Completed" : "Pending"}
                        </span>
                    </div>

                    {/* Description */}
                    {task.description && (
                        <p
                            className={`text-sm leading-relaxed mb-2
                ${isCompleted ? "text-zinc-600" : "text-zinc-400"}`}
                        >
                            {task.description}
                        </p>
                    )}

                    {/* Date */}
                    <p className="text-xs text-zinc-600">{formattedDate}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onToggle(task._id)}
                        title={isCompleted ? "Mark as Pending" : "Mark as Completed"}
                        className="p-2 rounded-md text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    >
                        {isCompleted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={() => onEdit(task)}
                        title="Edit Task"
                        className="p-2 rounded-md text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>

                    {!showConfirm ? (
                        <button
                            onClick={() => setShowConfirm(true)}
                            title="Delete Task"
                            className="p-2 rounded-md text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    ) : (
                        <div className="flex gap-1.5">
                            <button
                                onClick={() => {
                                    onDelete(task._id);
                                    setShowConfirm(false);
                                }}
                                className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium rounded-md 
                  hover:bg-red-500/20 transition-colors cursor-pointer"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-3 py-1 text-zinc-400 hover:text-white text-xs font-medium rounded-md 
                  transition-colors cursor-pointer"
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
