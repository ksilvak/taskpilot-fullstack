function TaskItem ({task, onToggle, onDelete}) {
    return (
        <li>
            <input
                type="checkbox"
                checked={task.status === 'done'}
                onChange={() => onToggle(task)}
            />
            {task.title}
            <button onClick={() => onDelete(task.id)}>Smazat</button>
        </li>
    );
}

export default TaskItem