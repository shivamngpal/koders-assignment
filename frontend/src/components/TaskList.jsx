import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-zinc-500 text-sm">
                    No tasks yet. Create one to get started.
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
