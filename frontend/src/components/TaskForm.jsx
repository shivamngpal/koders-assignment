import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || "");
        } else {
            setTitle("");
            setDescription("");
        }
        setErrors({});
    }, [editingTask]);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        else if (title.trim().length > 100)
            newErrors.title = "Title cannot exceed 100 characters";
        if (description.length > 500)
            newErrors.description = "Description cannot exceed 500 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({ title: title.trim(), description: description.trim() });
        if (!editingTask) {
            setTitle("");
            setDescription("");
        }
    };

    const isEditing = !!editingTask;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="task-title"
                    className="block text-sm font-medium text-slate-300 mb-1.5"
                >
                    Task Title <span className="text-rose-400">*</span>
                </label>
                <input
                    id="task-title"
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-slate-700/50 border rounded-lg text-slate-100 placeholder-slate-500 
            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all
            ${errors.title ? "border-rose-500" : "border-slate-600"}`}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-rose-400">{errors.title}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="task-description"
                    className="block text-sm font-medium text-slate-300 mb-1.5"
                >
                    Description
                </label>
                <textarea
                    id="task-description"
                    rows="3"
                    placeholder="Add a short description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-slate-700/50 border rounded-lg text-slate-100 placeholder-slate-500 
            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all resize-none
            ${errors.description ? "border-rose-500" : "border-slate-600"}`}
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-rose-400">{errors.description}</p>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="flex-1 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 
            text-white font-medium rounded-lg shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 
            transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                    {isEditing ? "✏️ Update Task" : "➕ Add Task"}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium 
              rounded-lg transition-all duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
