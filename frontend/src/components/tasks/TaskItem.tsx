import { Task } from "../../types/task";
import FormCheckbox from "../common/Form/FormCheckboxInput";
import Button from "../common/Button";

type TaskItemProps = {
    task: Task,
    onToggle: (task: Task) => void,
    onDelete: (taskId: number) => void,
};

function TaskItem ({task, onToggle, onDelete}: TaskItemProps) {
    return (
        <tr>
            <td>
                <FormCheckbox
                    checked={task.status === 'done'}
                    onChange={() => onToggle(task)}
                />
            </td>
            <td> {task.title}</td>
            <td>
                <Button 
                    buttonName="Smazat"
                    onClick={() => onDelete(task.id)}
                />
            </td>
        </tr>
    );
}

export default TaskItem