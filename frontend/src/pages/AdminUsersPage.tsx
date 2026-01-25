import styles from '../styles/pages/AdminUsersPage.module.scss';
import UsersTable from '../components/users/UsersTable';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '@/components/common/Button';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { useNavigate } from 'react-router-dom';

function AdminUsersPage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { users, error, loading, deleteUser } = useAdminUsers(token);

  return (
    <div className={styles.wrapper}>
      <Button buttonName="Zpět" onClick={() => navigate('/tasks')} />
      <h1>Users</h1>
      {loading && <Loader text="Načítám úkoly…" />}
      {error && <ErrorMessage message={error} />}
      <UsersTable users={users} onDelete={deleteUser} />
    </div>
  );
}

export default AdminUsersPage;
