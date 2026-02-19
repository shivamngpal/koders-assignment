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
    <div className="min-h-screen bg-black text-white">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium
            border transition-all duration-300
            ${toast.type === "error"
              ? "bg-red-500/10 border-red-500/30 text-red-400"
              : "bg-green-500/10 border-green-500/30 text-green-400"
            }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Task Manager
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Organize your work, one task at a time.
          </p>

          {/* Stats */}
          {tasks.length > 0 && (
            <div className="flex gap-6 mt-6">
              <div className="text-sm text-zinc-500">
                All{" "}
                <span className="text-white font-medium">{tasks.length}</span>
              </div>
              <div className="text-sm text-zinc-500">
                Pending{" "}
                <span className="text-zinc-300 font-medium">
                  {pendingCount}
                </span>
              </div>
              <div className="text-sm text-zinc-500">
                Completed{" "}
                <span className="text-green-400 font-medium">
                  {completedCount}
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Task Form Card */}
        <div className="border border-zinc-800 rounded-lg p-6 mb-10">
          <h2 className="text-sm font-medium text-zinc-300 mb-5 uppercase tracking-wider">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>
          <TaskForm
            onSubmit={editingTask ? handleUpdate : handleCreate}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-sm font-medium text-zinc-300 mb-5 uppercase tracking-wider">
            Tasks
          </h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
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
