import TaskItem from "./TaskItem";
import Table from "../common/Table/Table";
import { Task } from "../../types/task";

type TasksListProps = {
    tasks: Task[],
    onToggle: (task: Task) => void,
    onDelete: (taskId: number) => void,
}

function TasksList ({tasks, onToggle, onDelete}: TasksListProps) {
    return (
        <Table columns={["Stav", "Název", "Smazat"]}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </Table>
    );
}

export default TasksList