import { useEffect, useState } from "react";


function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleDeleteUser = async(userId) => {
        const confirmDelete = window.confirm('Opravdu chceš tohoto uživatele smazat?');

        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${token}`},
            });

            if (!response.ok) {
                throw new Error('Nepodařilo se smazat uživatele');
            }

            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch(err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/admin/users',
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!response.ok) {
                    throw new Error('Nepodařilo se načíst uživatele');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, [token]);

    return (
        <div>
            <h1>Users</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role !== 'admin' && (
                                <button onClick={() => handleDeleteUser(user.id)}>
                                    Smazat
                                </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminUsersPage;
