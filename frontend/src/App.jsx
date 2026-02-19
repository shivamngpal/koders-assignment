import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "./api/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasks();
      setTasks(data.data);
    } catch (err) {
      showToast("Failed to fetch tasks", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData) => {
    try {
      await createTask(taskData);
      showToast("Task created successfully!");
      fetchTasks();
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0]?.message || "Failed to create task";
      showToast(msg, "error");
    }
  };

  const handleUpdate = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      showToast("Task updated successfully!");
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0]?.message || "Failed to update task";
      showToast(msg, "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      showToast("Task deleted successfully!");
      if (editingTask?._id === id) setEditingTask(null);
      fetchTasks();
    } catch (err) {
      showToast("Failed to delete task", "error");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTaskStatus(id);
      fetchTasks();
    } catch (err) {
      showToast("Failed to update task status", "error");
    }
  };

  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium
            backdrop-blur-sm border animate-[slideIn_0.3s_ease-out]
            ${toast.type === "error"
              ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
              : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
            }`}
        >
          {toast.type === "error" ? "❌" : "✅"} {toast.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Task Manager
          </h1>
          <p className="text-slate-500">
            Organize your work, one task at a time.
          </p>

          {/* Stats */}
          {tasks.length > 0 && (
            <div className="flex justify-center gap-6 mt-5">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                <span className="text-slate-400">
                  Total: <span className="text-slate-200 font-semibold">{tasks.length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-400">
                  Pending: <span className="text-amber-400 font-semibold">{pendingCount}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-400">
                  Done: <span className="text-emerald-400 font-semibold">{completedCount}</span>
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Task Form Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">
            {editingTask ? "✏️ Edit Task" : "➕ New Task"}
          </h2>
          <TaskForm
            onSubmit={editingTask ? handleUpdate : handleCreate}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-4">
            📋 Your Tasks
          </h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
