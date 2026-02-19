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
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label
                    htmlFor="task-title"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                >
                    Title
                </label>
                <input
                    id="task-title"
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-zinc-900 border rounded-md text-white placeholder-zinc-500 
            focus:border-zinc-300 focus:outline-none focus:ring-0 transition-colors
            ${errors.title ? "border-red-500/50" : "border-zinc-800"}`}
                />
                {errors.title && (
                    <p className="mt-1.5 text-sm text-red-400">{errors.title}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="task-description"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                >
                    Description
                </label>
                <textarea
                    id="task-description"
                    rows="3"
                    placeholder="Add a short description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-zinc-900 border rounded-md text-white placeholder-zinc-500 
            focus:border-zinc-300 focus:outline-none focus:ring-0 transition-colors resize-none
            ${errors.description ? "border-red-500/50" : "border-zinc-800"}`}
                />
                {errors.description && (
                    <p className="mt-1.5 text-sm text-red-400">{errors.description}</p>
                )}
            </div>

            <div className="flex gap-3 pt-1">
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-white text-black font-semibold rounded-md 
            hover:bg-zinc-200 transition-colors cursor-pointer active:scale-[0.98]"
                >
                    {isEditing ? "Update Task" : "Add Task"}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="px-6 py-2.5 text-zinc-400 hover:text-white font-medium 
              rounded-md transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
