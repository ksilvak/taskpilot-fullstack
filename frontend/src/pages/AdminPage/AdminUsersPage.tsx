import UsersTable from "../../components/users/UsersTable";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { useAdminUsers } from "../../hooks/useAdminUsers";
import { useNavigate } from 'react-router-dom';


function AdminUsersPage() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const {
        users,
        error,
        loading,
        deleteUser,
    } = useAdminUsers(token);
   

    return (
        <div>
            <h1>Users</h1>
            {loading && <Loader text="Načítám úkoly…" />}
            {error && <ErrorMessage message={error} />}
            <button onClick={() => navigate('/tasks')}> Zpět </button>
            <UsersTable 
                users={users}
                onDelete={deleteUser}
            />
        </div>
    );
}

export default AdminUsersPage;
