import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-slate-400 mb-2">
                    No tasks yet
                </h3>
                <p className="text-slate-500">
                    Create your first task to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}
