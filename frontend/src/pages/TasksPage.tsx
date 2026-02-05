import styles from '../styles/pages/TasksPage.module.scss';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import AddTaskForm from '../components/tasks/AddTaskForm';
import TasksList from '../components/tasks/TasksList';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import UserMenu from '@/components/common/userMenu/UserMenu';

function TasksPage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { tasks, loading, error, addTask, removeTask, toggleCompleted } =
    useTasks(token);

  const { handleLogout } = useAuth();
  const { user } = useUser(token);

  return (
    <div className={styles.tasksWrapper}>
      <UserMenu
        user={user}
        handleLogout={handleLogout}
        onAdminClick={() => navigate('/admin/users')}
        onSettingsClick={() => navigate('/settings')}
      />
      <h1>Tasks</h1>
      {loading && <Loader text="Načítám úkoly…" />}
      {error && <ErrorMessage message={error} />}
      <AddTaskForm addTask={addTask} loading={loading} />
      <TasksList
        tasks={tasks}
        onToggle={toggleCompleted}
        onDelete={removeTask}
      />
    </div>
  );
}

export default TasksPage;
