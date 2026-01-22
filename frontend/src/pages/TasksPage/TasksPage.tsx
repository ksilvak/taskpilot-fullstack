import styles from './TasksPage.module.scss';
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AddTaskForm from "../../components/tasks/AddTaskForm";
import TasksList from "../../components/tasks/TasksList";
import Button from '../../components/common/Button';
import { useTasks } from "../../hooks/useTasks";
import { useAuth } from "../../hooks/useAuth";
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
    <div className={styles.tasksWrapper}>
      <div className={styles.buttonsWrapper}>
        <Button 
          onClick={handleLogout}
          buttonName='Odhlásit'
        />
        {user?.role === 'admin' && 
        <Button 
          onClick={() => navigate('/admin/users')}
          buttonName='Admin - spáva uživatelů'
        />}
      </div>
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
