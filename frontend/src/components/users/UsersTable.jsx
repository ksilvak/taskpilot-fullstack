
import UserRow from "./UserRow";


function UsersTable ({users, onDelete}) {
    return (
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
                    <UserRow
                        key={user.id}
                        user={user}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default UsersTable;
