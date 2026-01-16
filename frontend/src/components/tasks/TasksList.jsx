import TaskItem from "./TaskItem";


function TasksList ({tasks, onToggle, onDelete}) {
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
      </ul>
    );
}

export default TasksList