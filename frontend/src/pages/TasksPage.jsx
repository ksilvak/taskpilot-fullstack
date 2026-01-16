import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import AddTaskForm from "../components/tasks/AddTaskForm";
import TasksList from "../components/tasks/TasksList";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

function TasksPage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {
    tasks,
    loading,
    error,
    addTask,
    removeTask,
    toggleCompleted,
  } = useTasks(token);
  
  const { user, handleLogout } = useAuth();


  return (
    <div>
      <button onClick={handleLogout}>Odhlásit</button>
      {user?.role === 'admin' && <button onClick={() => navigate('/admin/users')}>Admin - správa uživatelů</button>}
      <h1>Tasks</h1>
      {loading && <Loader text="Načítám úkoly…" />}
      {error && <ErrorMessage message={error} />}
      <AddTaskForm 
        addTask={addTask}
        loading={loading}
      />
      <TasksList 
        tasks={tasks}
        onToggle={toggleCompleted}
        onDelete={removeTask}
      />
    </div>
  );
}

export default TasksPage;
